import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { onRequest as enquiry } from "../functions/api/enquiries.js";
import { onRequest as events } from "../functions/api/events.js";
import { onRequestGet } from "../functions/api/config.js";
function setup() {
  const db = new DatabaseSync(":memory:");
  db.exec(
    readFileSync(
      new URL("../migrations/0001_enquiries.sql", import.meta.url),
      "utf8",
    ),
  );
  const wrap = (sql, args = []) => ({
    bind: (...values) => wrap(sql, values),
    first: async () => db.prepare(sql).get(...args) || null,
    run: async () => db.prepare(sql).run(...args),
  });
  return {
    db,
    env: {
      DB: {
        prepare: (sql) => wrap(sql),
        batch: async (list) => {
          db.exec("BEGIN");
          try {
            const out = [];
            for (const p of list) out.push(await p.run());
            db.exec("COMMIT");
            return out;
          } catch (e) {
            db.exec("ROLLBACK");
            throw e;
          }
        },
      },
      SITE_ORIGIN: "https://biddigi.io",
      RATE_LIMIT_SECRET: "test-only",
      RESEND_API_KEY: "test",
      EMAIL_FROM: "sender@example.com",
      ENQUIRY_TO: "recipient@example.com",
      TURNSTILE_SECRET_KEY: "test",
      TURNSTILE_SITE_KEY: "public",
    },
  };
}
const payload = () => ({
  submissionId: crypto.randomUUID(),
  role: "advertiser",
  name: "Test User",
  email: "test@example.com",
  company: "Test",
  brief: "A campaign enquiry for testing.",
  turnstileToken: "fresh",
});
const req = (body, headers = {}) =>
  new Request("https://biddigi.io/api/enquiries", {
    method: "POST",
    headers: {
      origin: "https://biddigi.io",
      "content-type": "application/json",
      "CF-Connecting-IP": "192.0.2.1",
      ...headers,
    },
    body: JSON.stringify(body),
  });
test("Cloudflare enquiries share receipts across instances, reject changed data and count acceptance once", async () => {
  const { env, db } = setup();
  const original = globalThis.fetch;
  let deliveries = 0;
  globalThis.fetch = async (url) =>
    String(url).includes("siteverify")
      ? Response.json({
          success: true,
          hostname: "biddigi.io",
          action: "enquiry",
        })
      : (deliveries++, Response.json({ id: "provider-id" }));
  try {
    const body = payload();
    assert.equal((await enquiry({ request: req(body), env })).status, 200);
    assert.equal(
      (
        await enquiry({
          request: req({ ...body, turnstileToken: "another" }),
          env: { ...env },
        })
      ).status,
      200,
    );
    assert.equal(deliveries, 1);
    assert.equal(
      (
        await enquiry({
          request: req({ ...body, brief: "Different campaign details" }),
          env,
        })
      ).status,
      409,
    );
    assert.equal(db.prepare("SELECT count FROM events").get().count, 1);
    const row = db.prepare("SELECT * FROM receipts").get();
    assert.equal(row.status, "accepted");
    assert.equal(JSON.stringify(row).includes("test@example.com"), false);
  } finally {
    globalThis.fetch = original;
    db.close();
  }
});
test("Cloudflare rejects invalid proof, enforces origin, size, rate and configuration; failed mail retries honestly", async () => {
  const { env, db } = setup();
  const original = globalThis.fetch;
  let valid = false,
    accepted = false;
  globalThis.fetch = async (url) =>
    String(url).includes("siteverify")
      ? Response.json({
          success: valid,
          hostname: "biddigi.io",
          action: "enquiry",
        })
      : Response.json(accepted ? { id: "yes" } : { error: "no" }, {
          status: accepted ? 200 : 500,
        });
  try {
    assert.equal(
      (
        await enquiry({
          request: req(payload(), { origin: "https://evil.example" }),
          env,
        })
      ).status,
      403,
    );
    assert.equal(
      (
        await enquiry({
          request: req({ ...payload(), brief: "x".repeat(17000) }),
          env,
        })
      ).status,
      413,
    );
    assert.equal(
      (
        await enquiry({
          request: req(payload()),
          env: { ...env, RESEND_API_KEY: "" },
        })
      ).status,
      503,
    );
    assert.equal((await enquiry({ request: req(payload()), env })).status, 422);
    valid = true;
    const body = payload();
    assert.equal((await enquiry({ request: req(body), env })).status, 502);
    accepted = true;
    assert.equal((await enquiry({ request: req(body), env })).status, 200);
    for (let i = 0; i < 5; i++) await enquiry({ request: req(payload()), env });
    assert.equal((await enquiry({ request: req(payload()), env })).status, 429);
  } finally {
    globalThis.fetch = original;
    db.close();
  }
});
test("events accept aggregate allowlisted fields only and never accept client success; config exposes no secrets", async () => {
  const { env, db } = setup();
  try {
    assert.equal(
      (
        await events({
          request: req({ event: "platform_selection", platform: "youtube" }),
          env,
        })
      ).status,
      200,
    );
    for (const body of [
      { event: "enquiry_accepted" },
      { event: "enquiry_start", email: "private@example.com" },
      { event: "platform_selection", platform: "invented" },
    ])
      assert.equal((await events({ request: req(body), env })).status, 422);
    assert.equal(db.prepare("SELECT count(*) n FROM events").get().n, 1);
    const config = await onRequestGet({ env }).json();
    assert.equal(config.enquiriesReady, true);
    assert.equal(config.RESEND_API_KEY, undefined);
  } finally {
    db.close();
  }
});
