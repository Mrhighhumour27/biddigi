const ROLES = new Set(["publisher", "advertiser", "demand-partner"]);
const PLATFORMS = new Set([
  "JioHotstar",
  "Prime Video",
  "Sony LIV",
  "YouTube",
  "ZEE5",
]);
const text = (value, limit = 2000) =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const submissionPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateEnquiry(input) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { error: "Please provide your enquiry details." };
  const role = text(input.role, 40);
  const data = {
    submissionId: text(input.submissionId, 100).toLowerCase(),
    role,
    name: text(input.name, 100),
    email: text(input.email, 254),
    company: text(input.company, 200),
    brief: text(input.brief, 4000),
    propertyUrl: text(input.propertyUrl, 500),
    propertyType: text(input.propertyType, 60),
    propertyStatus:
      input.propertyStatus === "not-public" ? "not-public" : "public",
    traffic: text(input.traffic, 100),
    currentSetup: text(input.currentSetup, 1000),
    objective: text(input.objective, 500) || "Need guidance",
    geography: text(input.geography, 200) || "Need guidance",
    budget: text(input.budget, 100),
    timing: text(input.timing, 200),
    platforms: Array.isArray(input.platforms)
      ? [...new Set(input.platforms.filter((x) => PLATFORMS.has(x)))]
      : [],
  };
  if (!submissionPattern.test(data.submissionId))
    return {
      error: "Please refresh the page and try your enquiry again.",
      fields: { submissionId: "A valid submission identifier is required." },
    };
  if (!ROLES.has(role)) return { error: "Please choose your enquiry type." };
  const fields = {};
  if (data.name.length < 2)
    fields.name = "Please enter your name (at least two characters).";
  if (!emailPattern.test(data.email) || /[\r\n]/.test(data.email))
    fields.email = "Please enter a valid email address.";
  if (!data.company)
    fields.company = "Please enter your property, brand or organization name.";
  if (data.brief.length < 10)
    fields.brief = "Please describe your project in at least 10 characters.";
  if (
    role === "publisher" &&
    data.propertyStatus !== "not-public" &&
    !data.propertyUrl
  )
    fields.propertyUrl =
      "Enter a website or app-store URL, or choose Not live yet / need guidance.";
  if (role === "publisher" && data.propertyUrl) {
    try {
      const url = new URL(data.propertyUrl);
      if (
        !["https:", "http:"].includes(url.protocol) ||
        !url.hostname ||
        url.username ||
        url.password
      )
        throw new Error();
    } catch {
      fields.propertyUrl =
        "Please enter a complete website or app-store URL beginning with https:// or http://.";
    }
  }
  if (Object.keys(fields).length)
    return { error: "Please check the highlighted enquiry details.", fields };
  return { data };
}

export function buildMail(payload, env) {
  const label =
    payload.role === "publisher"
      ? "Publisher"
      : payload.role === "demand-partner"
        ? "Demand partner"
        : "Advertiser / OTT";
  const content = Object.entries(payload)
    .map(
      ([key, value]) =>
        `${key}: ${Array.isArray(value) ? value.join(", ") || "Need guidance" : value || "Not provided"}`,
    )
    .join("\n\n");
  return {
    from: env.EMAIL_FROM,
    to: [env.ENQUIRY_TO || "mrhighhumour@gmail.com"],
    reply_to: payload.email,
    subject: `Biddigi ${label} enquiry`,
    text: `Website enquiry reference: ${payload.submissionId}\n\n${content}`,
  };
}
