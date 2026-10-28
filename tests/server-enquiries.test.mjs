import test from "node:test";
import assert from "node:assert/strict";
import { Readable } from "node:stream";
import { createEnquiryHandler, validateEnquiry } from "../server/enquiries.mjs";

const good = {
  submissionId: "72e02fc4-e9ba-4f45-8498-62cbfd925a81",
  role: "publisher",
  name: "Sample Publisher",
  email: "publisher@example.com",
  company: "Example",
  brief: "Please review our existing ad setup.",
  propertyUrl: "https://example.com",
  propertyType: "Website",
  website: "",
};
const env = {
  SITE_ORIGIN: "https://biddigi.io",
  RESEND_API_KEY: "test-only",
  EMAIL_FROM: "Biddigi <enquiries@example.com>",
  ENQUIRY_TO: "approved@example.com",
};
function makeRequest(body = good, overrides = {}) {
  const req = Readable.from([
    Buffer.from(typeof body === "string" ? body : JSON.stringify(body)),
  ]);
  Object.assign(
    req,
    {
      url: "/api/enquiries",
      method: "POST",
      headers: {
        origin: env.SITE_ORIGIN,
        host: "biddigi.io",
        "content-type": "application/json",
      },
      socket: { remoteAddress: "127.0.0.1" },
    },
    overrides,
  );
  return req;
}
function makeResponse() {
  return {
    headers: {},
    setHeader(k, v) {
      this.headers[k] = v;
    },
    writeHead(status, headers) {
      this.status = status;
      Object.assign(this.headers, headers);
    },
    end(body) {
      this.body = body ? JSON.parse(body) : undefined;
    },
  };
}
async function submit(handler, body, overrides) {
  const res = makeResponse();
  await handler(makeRequest(body, overrides), res);
  return res;
}

test("validates required publisher and campaign details", () => {
  assert.ok(validateEnquiry(good).data);
  assert.match(
    validateEnquiry({ ...good, propertyUrl: "javascript:alert(1)" }).fields
      .propertyUrl,
    /URL/,
  );
  assert.match(
    validateEnquiry({ ...good, email: "bad" }).fields.email,
    /valid email/,
  );
  assert.match(validateEnquiry({ ...good, role: "unknown" }).error, /type/);
  assert.equal(
    validateEnquiry({ ...good, role: "advertiser" }).data.objective,
    "Need guidance",
  );
  assert.ok(
    validateEnquiry({
      ...good,
      role: "advertiser",
      objective: "Need guidance",
      geography: "India",
    }).data,
  );
  assert.ok(validateEnquiry({ ...good, role: "demand-partner" }).data);
  assert.equal(validateEnquiry(null).data, undefined);
  assert.equal(validateEnquiry({ ...good, submissionId: "" }).data, undefined);
  assert.ok(
    validateEnquiry({
      ...good,
      propertyStatus: "not-public",
      propertyUrl: "",
      propertyType: "",
    }).data,
  );
  assert.ok(
    validateEnquiry({
      ...good,
      propertyUrl: "https://apps.apple.com/in/app/example/id12345",
      propertyType: "",
    }).data,
  );
  assert.match(
    validateEnquiry({ ...good, propertyUrl: "" }).fields.propertyUrl,
    /Not live yet/,
  );
});

test("returns honest unavailable state without mail setup", async () => {
  let calls = 0;
  const handle = createEnquiryHandler({
    env: { SITE_ORIGIN: env.SITE_ORIGIN },
    fetchImpl: () => {
      calls++;
    },
  });
  const res = await submit(handle);
  assert.equal(res.status, 503);
  assert.equal(calls, 0);
  assert.equal(res.body.ok, undefined);
});

test("provider acknowledgement precedes success and duplicate submissions reuse acknowledgement", async () => {
  let calls = 0;
  const handle = createEnquiryHandler({
    env,
    fetchImpl: async (url, request) => {
      calls++;
      assert.equal(url, "https://api.resend.com/emails");
      const sent = JSON.parse(request.body);
      assert.deepEqual(sent.to, ["approved@example.com"]);
      assert.equal(sent.reply_to, good.email);
      assert.match(sent.text, /Please review/);
      assert.match(request.headers["Idempotency-Key"], /^biddigi-/);
      return { ok: true, json: async () => ({ id: "provider-receipt" }) };
    },
  });
  const first = await submit(handle);
  const duplicate = await submit(handle);
  assert.equal(first.status, 200);
  assert.equal(first.body.ok, true);
  assert.equal(duplicate.body.reference, first.body.reference);
  assert.equal(calls, 1);
});

test("provider rejection and invalid acknowledgement never show success", async () => {
  for (const provider of [
    async () => ({ ok: false, json: async () => ({}) }),
    async () => ({ ok: true, json: async () => ({}) }),
    async () => {
      throw new Error("offline");
    },
  ]) {
    const res = await submit(
      createEnquiryHandler({ env, fetchImpl: provider }),
    );
    assert.equal(res.status, 502);
    assert.equal(res.body.ok, undefined);
  }
});

test("blocks cross-origin requests, wrong methods, invalid data and honeypot", async () => {
  const handle = createEnquiryHandler({
    env,
    fetchImpl: async () => {
      throw new Error("Should not call");
    },
  });
  assert.equal((await submit(handle, good, { method: "GET" })).status, 405);
  assert.equal(
    (
      await submit(handle, good, {
        headers: {
          origin: "https://other.example",
          "content-type": "application/json",
        },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await submit(handle, good, {
        headers: { "content-type": "application/json" },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await submit(handle, good, {
        headers: { origin: env.SITE_ORIGIN, "content-type": "text/plain" },
      })
    ).status,
    415,
  );
  assert.equal((await submit(handle, "{bad")).status, 400);
  assert.equal((await submit(handle, { ...good, brief: "" })).status, 422);
  assert.equal(
    (await submit(handle, { ...good, website: "spam" })).status,
    400,
  );
});

test("limits body size and attempts", async () => {
  const handle = createEnquiryHandler({
    env: { SITE_ORIGIN: env.SITE_ORIGIN },
  });
  assert.equal((await submit(handle, "x".repeat(17000))).status, 413);
  for (let i = 1; i < 8; i++) await submit(handle);
  const res = await submit(handle);
  assert.equal(res.status, 429);
  assert.ok(Number(res.headers["Retry-After"]) > 0);
});

test("concurrent duplicate is rejected before a second mail is sent", async () => {
  let release;
  let accepted;
  const started = new Promise((resolve) => {
    accepted = resolve;
  });
  const handle = createEnquiryHandler({
    env,
    fetchImpl: async () => {
      accepted();
      await new Promise((resolve) => {
        release = resolve;
      });
      return { ok: true, json: async () => ({ id: "accepted" }) };
    },
  });
  const first = submit(handle);
  await started;
  assert.equal((await submit(handle)).status, 409);
  release();
  assert.equal((await first).status, 200);
});

test("ignores other routes", async () => {
  assert.equal(
    await createEnquiryHandler()(
      makeRequest(good, { url: "/other" }),
      makeResponse(),
    ),
    false,
  );
});

test("new intentional same-content enquiry has a new provider key; changed payload cannot reuse an identifier", async () => {
  const keys = [];
  const handle = createEnquiryHandler({
    env,
    fetchImpl: async (_url, request) => {
      keys.push(request.headers["Idempotency-Key"]);
      return { ok: true, json: async () => ({ id: "accepted" }) };
    },
  });
  assert.equal((await submit(handle)).status, 200);
  assert.equal(
    (
      await submit(handle, {
        ...good,
        brief: "A different enquiry using the same identifier.",
      })
    ).status,
    409,
  );
  assert.equal(
    (
      await submit(handle, {
        ...good,
        submissionId: "9ff8475d-a646-47ac-87f2-d060a13f85b2",
      })
    ).status,
    200,
  );
  assert.equal(new Set(keys).size, 2);
});

test("provider-accepted timeout and retry through a fresh instance preserve the exact provider payload and key", async () => {
  let accepted;
  let tries = 0;
  const fetchImpl = async (_url, request) => {
    tries++;
    const actual = {
      key: request.headers["Idempotency-Key"],
      body: request.body,
    };
    if (!accepted) {
      accepted = actual;
      throw new DOMException(
        "Response timed out after provider acceptance.",
        "TimeoutError",
      );
    }
    assert.deepEqual(actual, accepted);
    return { ok: true, json: async () => ({ id: "same-provider-receipt" }) };
  };
  const first = await submit(createEnquiryHandler({ env, fetchImpl }));
  assert.equal(first.status, 502);
  const retry = await submit(createEnquiryHandler({ env, fetchImpl }));
  assert.equal(retry.status, 200);
  assert.equal(retry.body.reference, good.submissionId);
  assert.equal(tries, 2);
});

test("trusted proxy visitors have independent limits and arbitrary forwarded addresses are rejected", async () => {
  const proxyEnv = {
    ...env,
    ENQUIRY_RATE_LIMIT_MODE: "trusted-header",
    ENQUIRY_TRUSTED_PROXY_IPS: "127.0.0.1",
    ENQUIRY_CLIENT_IP_HEADER: "x-verified-client-ip",
  };
  const handle = createEnquiryHandler({
    env: proxyEnv,
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({ id: "accepted" }),
    }),
  });
  const requestHeaders = (ip) => ({
    origin: env.SITE_ORIGIN,
    host: "biddigi.io",
    "content-type": "application/json",
    "x-verified-client-ip": ip,
  });
  for (let i = 0; i < 8; i++)
    assert.equal(
      (await submit(handle, good, { headers: requestHeaders("203.0.113.10") }))
        .status,
      200,
    );
  assert.equal(
    (await submit(handle, good, { headers: requestHeaders("203.0.113.10") }))
      .status,
    429,
  );
  assert.equal(
    (await submit(handle, good, { headers: requestHeaders("203.0.113.11") }))
      .status,
    200,
  );
  assert.equal(
    (
      await submit(handle, good, {
        headers: requestHeaders("203.0.113.12"),
        socket: { remoteAddress: "198.51.100.4" },
      })
    ).status,
    503,
  );
  assert.equal(
    (
      await submit(handle, good, {
        headers: { ...requestHeaders(""), "x-forwarded-for": "203.0.113.13" },
      })
    ).status,
    503,
  );
});

test("production refuses unselected proxy strategy and unconfirmed edge protection", async () => {
  for (const configuration of [
    { NODE_ENV: "production" },
    { ENQUIRY_RATE_LIMIT_MODE: "edge" },
  ]) {
    const res = await submit(
      createEnquiryHandler({ env: { ...env, ...configuration } }),
    );
    assert.equal(res.status, 503);
    assert.equal(res.body.ok, undefined);
  }
  const handle = createEnquiryHandler({
    env: {
      ...env,
      ENQUIRY_RATE_LIMIT_MODE: "edge",
      ENQUIRY_EDGE_RATE_LIMIT_CONFIRMED: "true",
    },
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({ id: "accepted" }),
    }),
  });
  for (let i = 0; i < 10; i++) assert.equal((await submit(handle)).status, 200);
});
