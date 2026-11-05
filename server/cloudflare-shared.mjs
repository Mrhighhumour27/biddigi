export const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
export async function hash(value) {
  return [
    ...new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)),
    ),
  ]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("");
}
export async function input(request, max) {
  if (request.method !== "POST") throw { status: 405, error: "Use POST." };
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json")
    throw { status: 415, error: "Send JSON." };
  const reader = request.body?.getReader();
  let size = 0,
    chunks = [];
  if (!reader) throw { status: 400, error: "Missing request." };
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > max) {
      await reader.cancel();
      throw { status: 413, error: "Request too large." };
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const c of chunks) {
    bytes.set(c, offset);
    offset += c.length;
  }
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw { status: 400, error: "Invalid JSON." };
  }
}
export function sameOrigin(request, env) {
  return request.headers.get("origin") === env.SITE_ORIGIN;
}
export async function rate(request, env, kind, max) {
  if (!env.DB || !env.RATE_LIMIT_SECRET)
    throw { status: 503, error: "Service unavailable." };
  const ip = request.headers.get("CF-Connecting-IP");
  if (!ip) throw { status: 503, error: "Client identity unavailable." };
  const now = Date.now(),
    window = Math.floor(now / 900000);
  const key = await hash(`${env.RATE_LIMIT_SECRET}:${kind}:${window}:${ip}`);
  const row = await env.DB.prepare(
    "INSERT INTO limits(key,count,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count",
  )
    .bind(key, (window + 1) * 900000)
    .first();
  if (row.count > max)
    throw { status: 429, error: "Too many attempts. Try again later." };
  await env.DB.batch([
    env.DB.prepare("DELETE FROM limits WHERE expires<?").bind(now),
    env.DB.prepare("DELETE FROM receipts WHERE expires<?").bind(now),
    env.DB.prepare("DELETE FROM events WHERE day<?").bind(
      new Date(now - 90 * 86400000).toISOString().slice(0, 10),
    ),
  ]);
}
export async function count(env, event, role = "", platform = "") {
  await env.DB.prepare(
    "INSERT INTO events(day,event,role,platform,count) VALUES(?,?,?,?,1) ON CONFLICT(day,event,role,platform) DO UPDATE SET count=count+1",
  )
    .bind(new Date().toISOString().slice(0, 10), event, role, platform)
    .run();
}
