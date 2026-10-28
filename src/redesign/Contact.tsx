import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AlertCircle, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { platforms } from "./platforms";

type Role = "publisher" | "advertiser" | "demand-partner";
type Fields = {
  role: Role;
  name: string;
  email: string;
  company: string;
  brief: string;
  propertyUrl: string;
  propertyStatus: "public" | "not-public";
  propertyType: string;
  platforms: string[];
  objective: string;
  geography: string;
  traffic: string;
  currentSetup: string;
  budget: string;
  timing: string;
  website: string;
};
type FieldErrors = Partial<Record<keyof Fields, string>>;
const initialFields: Fields = {
  role: "publisher",
  name: "",
  email: "",
  company: "",
  brief: "",
  propertyUrl: "",
  propertyStatus: "public",
  propertyType: "",
  platforms: [],
  objective: "Need guidance",
  geography: "Need guidance",
  traffic: "",
  currentSetup: "",
  budget: "",
  timing: "",
  website: "",
};
const roles: { value: Role; label: string }[] = [
  { value: "publisher", label: "Publisher" },
  { value: "advertiser", label: "Advertiser" },
  { value: "demand-partner", label: "Demand partner" },
];

function track(event: string, role: Role) {
  window.dispatchEvent(
    new CustomEvent("biddigi:analytics", { detail: { event, role } }),
  );
}

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (fields.name.trim().length < 2)
    errors.name = "Enter your name (at least two characters).";
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!fields.company.trim())
    errors.company =
      fields.role === "publisher"
        ? "Enter your publication or app name."
        : "Enter your brand or company name.";
  if (fields.brief.trim().length < 10)
    errors.brief =
      "Tell us a little about your project (at least 10 characters).";
  if (fields.role === "publisher" && fields.propertyStatus === "public") {
    try {
      const url = new URL(fields.propertyUrl.trim());
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch {
      errors.propertyUrl =
        "Enter a website or app-store URL starting with https://, or choose Not live yet.";
    }
  }
  return errors;
}

function newSubmissionId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function ContactPage() {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [reference, setReference] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const logicalSubmission = useRef<{ id: string; fingerprint: string } | null>(
    null,
  );
  const requestRef = useRef<AbortController | null>(null);
  const isSubmitting = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selected = params
      .getAll("platform")
      .flatMap((value) => value.split(","));
    const matched = platforms
      .filter((platform) =>
        selected.some((value) =>
          [platform.id, platform.name].some(
            (name) => name.toLowerCase() === value.toLowerCase(),
          ),
        ),
      )
      .map((platform) => platform.name);
    const roleParam = params.get("role");
    const role: Role = roles.some((item) => item.value === roleParam)
      ? (roleParam as Role)
      : matched.length
        ? "advertiser"
        : "publisher";
    // Static HTML cannot know query context. Apply it only after hydration so the initial renders match.
    // oxlint-disable-next-line react/set-state-in-effect
    setFields((previous) => ({ ...previous, role, platforms: matched }));
    return () => requestRef.current?.abort();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    if (!started.current) {
      started.current = true;
      track("enquiry_start", fields.role);
    }
    setFields((previous) => ({ ...previous, [key]: value }));
    if (key === "role") setErrors({});
    else
      setErrors((previous) => ({
        ...previous,
        [key]: undefined,
        ...(key === "propertyStatus" ? { propertyUrl: undefined } : {}),
      }));
    setServerError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting.current) return;
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    setServerError("");
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }
    const payload = {
      ...fields,
      propertyUrl:
        fields.role === "publisher" && fields.propertyStatus === "public"
          ? fields.propertyUrl.trim()
          : "",
      propertyStatus:
        fields.role === "publisher" ? fields.propertyStatus : "not-public",
      propertyType: fields.role === "publisher" ? fields.propertyType : "",
      platforms: fields.role === "advertiser" ? fields.platforms : [],
      objective:
        fields.role === "advertiser"
          ? fields.objective.trim() || "Need guidance"
          : "",
      geography:
        fields.role === "advertiser"
          ? fields.geography.trim() || "Need guidance"
          : "",
      traffic: fields.role === "publisher" ? fields.traffic : "",
      currentSetup: fields.role === "publisher" ? fields.currentSetup : "",
      budget: fields.role === "advertiser" ? fields.budget : "",
      timing: fields.role === "advertiser" ? fields.timing : "",
    };
    const fingerprint = JSON.stringify(payload);
    if (
      !logicalSubmission.current ||
      logicalSubmission.current.fingerprint !== fingerprint
    ) {
      logicalSubmission.current = { id: newSubmissionId(), fingerprint };
    }
    isSubmitting.current = true;
    setStatus("submitting");
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          submissionId: logicalSubmission.current.id,
        }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));
      if (
        !response.ok ||
        result.ok !== true ||
        typeof result.reference !== "string"
      ) {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "Your enquiry could not be accepted. Your details are still here; please try again.",
        );
      }
      setReference(result.reference);
      setStatus("success");
      track("enquiry_accepted", fields.role);
    } catch (error) {
      const message =
        error instanceof Error && error.name === "AbortError"
          ? "We could not confirm receipt in time. Your details are still here. Retry to check the same enquiry safely."
          : error instanceof Error
            ? error.message
            : "We could not connect. Your details are still here; please try again.";
      setServerError(message);
      setStatus("idle");
      track("enquiry_error", fields.role);
      requestAnimationFrame(() => errorRef.current?.focus());
    } finally {
      window.clearTimeout(timeout);
      isSubmitting.current = false;
      requestRef.current = null;
    }
  }

  function resetForm() {
    setFields((previous) => ({
      ...initialFields,
      role: previous.role,
      platforms: previous.platforms,
    }));
    setReference("");
    setStatus("idle");
    setErrors({});
    setServerError("");
    logicalSubmission.current = null;
    started.current = false;
    requestAnimationFrame(() =>
      document.getElementById("enquiry-name")?.focus(),
    );
  }

  const label =
    fields.role === "publisher"
      ? "Publication or app name"
      : fields.role === "advertiser"
        ? "Brand or company"
        : "Organization";
  const hasError = Boolean(serverError || Object.values(errors).some(Boolean));
  const inputProps = (key: keyof Fields) => ({
    id: `enquiry-${key}`,
    name: key,
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `error-${key}` : undefined,
  });
  const error = (key: keyof Fields) =>
    errors[key] ? (
      <span className="field-error" id={`error-${key}`}>
        {errors[key]}
      </span>
    ) : null;

  return (
    <section className="contact-page section-pad">
      <div className="container">
        <div className="contact-intro">
          <span className="eyebrow">LET’S FIND THE RIGHT NEXT STEP</span>
          <h1>
            Bring your project.
            <br />
            We’ll bring the perspective.
          </h1>
          <p>
            Tell us what you publish or what you want to promote. We’ll review
            your brief and discuss where Biddigi can help.
          </p>
        </div>
        <div className="contact-layout">
          <div className="contact-form">
            {status === "success" ? (
              <div
                className="form-success"
                ref={successRef}
                tabIndex={-1}
                role="status"
              >
                <span className="form-success-icon">
                  <Check size={28} />
                </span>
                <span className="eyebrow">ENQUIRY ACCEPTED</span>
                <h2>Thank you for the introduction.</h2>
                <p>
                  Your enquiry has been accepted for sending to our team. We’ll
                  review your brief and contact you to discuss the next steps.
                </p>
                <p className="form-reference">
                  Reference: <strong>{reference}</strong>
                </p>
                <button
                  className="button button-dark"
                  type="button"
                  onClick={resetForm}
                >
                  Start a new enquiry <ArrowRight size={17} />
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Project enquiry"
                aria-busy={status === "submitting"}
              >
                <div className="form-heading">
                  <span className="eyebrow">YOUR PROJECT</span>
                  <p>
                    Required fields are marked <span aria-hidden="true">*</span>
                    . Everything else can wait.
                  </p>
                </div>
                <fieldset
                  className="form-fields"
                  disabled={status === "submitting"}
                  style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}
                >
                  <legend className="sr-only">Your enquiry details</legend>
                  <fieldset className="form-role-options">
                    <legend>
                      I’m enquiring as a <span aria-hidden="true">*</span>
                    </legend>
                    {roles.map((role) => (
                      <label
                        key={role.value}
                        className={
                          fields.role === role.value ? "is-selected" : ""
                        }
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role.value}
                          checked={fields.role === role.value}
                          onChange={() => update("role", role.value)}
                          disabled={status === "submitting"}
                        />
                        <span>{role.label}</span>
                      </label>
                    ))}
                  </fieldset>
                  {hasError && (
                    <div
                      className="form-error-summary"
                      ref={errorRef}
                      tabIndex={-1}
                      role="alert"
                    >
                      <AlertCircle size={20} />
                      <div>
                        <strong>
                          {serverError
                            ? "Your enquiry hasn’t been confirmed."
                            : "Please check these details."}
                        </strong>
                        {serverError ? (
                          <p>{serverError}</p>
                        ) : (
                          <ul>
                            {Object.entries(errors)
                              .filter(([, value]) => value)
                              .map(([key, value]) => (
                                <li key={key}>
                                  <a href={`#enquiry-${key}`}>{value}</a>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="form-grid">
                    <div className="field">
                      <label htmlFor="enquiry-name">
                        Your name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        {...inputProps("name")}
                        autoComplete="name"
                        maxLength={100}
                        value={fields.name}
                        onChange={(event) => update("name", event.target.value)}
                        required
                      />
                      {error("name")}
                    </div>
                    <div className="field">
                      <label htmlFor="enquiry-email">
                        Email address <span aria-hidden="true">*</span>
                      </label>
                      <input
                        {...inputProps("email")}
                        type="email"
                        autoComplete="email"
                        maxLength={254}
                        value={fields.email}
                        onChange={(event) =>
                          update("email", event.target.value)
                        }
                        required
                      />
                      {error("email")}
                    </div>
                    <div className="field field-full">
                      <label htmlFor="enquiry-company">
                        {label} <span aria-hidden="true">*</span>
                      </label>
                      <input
                        {...inputProps("company")}
                        autoComplete="organization"
                        maxLength={200}
                        value={fields.company}
                        onChange={(event) =>
                          update("company", event.target.value)
                        }
                        required
                      />
                      {error("company")}
                    </div>
                    {fields.role === "publisher" && (
                      <>
                        <div className="field field-full">
                          <label className="form-checkbox">
                            <input
                              type="checkbox"
                              checked={fields.propertyStatus === "not-public"}
                              onChange={(event) =>
                                update(
                                  "propertyStatus",
                                  event.target.checked
                                    ? "not-public"
                                    : "public",
                                )
                              }
                            />
                            <span>Not live yet / I need guidance</span>
                          </label>
                        </div>
                        {fields.propertyStatus === "public" && (
                          <div className="field field-full">
                            <label htmlFor="enquiry-propertyUrl">
                              Website or app-store URL{" "}
                              <span aria-hidden="true">*</span>
                            </label>
                            <input
                              {...inputProps("propertyUrl")}
                              type="url"
                              autoComplete="url"
                              maxLength={500}
                              placeholder="https://"
                              value={fields.propertyUrl}
                              onChange={(event) =>
                                update("propertyUrl", event.target.value)
                              }
                              required
                            />
                            {error("propertyUrl")}
                          </div>
                        )}
                      </>
                    )}
                    {fields.role === "advertiser" && (
                      <fieldset className="form-platform-options field-full">
                        <legend>
                          Platforms you’re interested in{" "}
                          <span className="optional-label">(optional)</span>
                        </legend>
                        <p className="field-hint">
                          Leave these unselected if you’d like guidance.
                        </p>
                        {platforms.map((platform) => (
                          <label key={platform.id}>
                            <input
                              type="checkbox"
                              name="platforms"
                              value={platform.name}
                              checked={fields.platforms.includes(platform.name)}
                              onChange={(event) =>
                                update(
                                  "platforms",
                                  event.target.checked
                                    ? [...fields.platforms, platform.name]
                                    : fields.platforms.filter(
                                        (name) => name !== platform.name,
                                      ),
                                )
                              }
                            />
                            <span>{platform.name}</span>
                          </label>
                        ))}
                      </fieldset>
                    )}
                    <div className="field field-full">
                      <label htmlFor="enquiry-brief">
                        {fields.role === "publisher"
                          ? "Tell us about your property and ad setup"
                          : fields.role === "demand-partner"
                            ? "What inventory or integration are you looking for?"
                            : "What would you like your campaign to achieve?"}{" "}
                        <span aria-hidden="true">*</span>
                      </label>
                      <textarea
                        {...inputProps("brief")}
                        rows={4}
                        minLength={10}
                        maxLength={4000}
                        value={fields.brief}
                        onChange={(event) =>
                          update("brief", event.target.value)
                        }
                        required
                      />
                      <span className="field-hint">
                        A few sentences are enough. Please don’t include
                        passwords or other sensitive information.
                      </span>
                      {error("brief")}
                    </div>
                  </div>
                  <details className="form-details">
                    <summary>
                      Add details <span>(optional)</span>
                    </summary>
                    <div className="form-grid">
                      {fields.role === "publisher" && (
                        <>
                          <div className="field">
                            <label htmlFor="enquiry-propertyType">
                              Property type
                            </label>
                            <select
                              {...inputProps("propertyType")}
                              value={fields.propertyType}
                              onChange={(event) =>
                                update("propertyType", event.target.value)
                              }
                            >
                              <option value="">Not sure</option>
                              <option>Website</option>
                              <option>Mobile app</option>
                              <option>Video</option>
                              <option>Connected TV / streaming</option>
                              <option>Multiple properties</option>
                            </select>
                          </div>
                          <div className="field">
                            <label htmlFor="enquiry-traffic">
                              Monthly ad impressions
                            </label>
                            <input
                              {...inputProps("traffic")}
                              maxLength={100}
                              placeholder="An estimate, or leave blank"
                              value={fields.traffic}
                              onChange={(event) =>
                                update("traffic", event.target.value)
                              }
                            />
                            <span className="field-hint">
                              Ad impressions, rather than page views or
                              visitors.
                            </span>
                          </div>
                          <div className="field field-full">
                            <label htmlFor="enquiry-currentSetup">
                              Current ad setup
                            </label>
                            <input
                              {...inputProps("currentSetup")}
                              maxLength={1000}
                              placeholder="Ad server, tools, or anything useful to know"
                              value={fields.currentSetup}
                              onChange={(event) =>
                                update("currentSetup", event.target.value)
                              }
                            />
                          </div>
                        </>
                      )}
                      {fields.role === "advertiser" && (
                        <>
                          <div className="field">
                            <label htmlFor="enquiry-objective">
                              Campaign objective
                            </label>
                            <select
                              {...inputProps("objective")}
                              value={fields.objective}
                              onChange={(event) =>
                                update("objective", event.target.value)
                              }
                            >
                              <option>Need guidance</option>
                              <option>Brand awareness</option>
                              <option>Product launch</option>
                              <option>Video views and consideration</option>
                              <option>Website enquiries or actions</option>
                            </select>
                          </div>
                          <div className="field">
                            <label htmlFor="enquiry-geography">
                              Target locations / languages
                            </label>
                            <input
                              {...inputProps("geography")}
                              maxLength={200}
                              value={fields.geography}
                              onChange={(event) =>
                                update("geography", event.target.value)
                              }
                            />
                          </div>
                          <div className="field">
                            <label htmlFor="enquiry-budget">
                              Indicative media budget
                            </label>
                            <input
                              {...inputProps("budget")}
                              maxLength={100}
                              placeholder="Amount and currency, or Need guidance"
                              value={fields.budget}
                              onChange={(event) =>
                                update("budget", event.target.value)
                              }
                            />
                            <span className="field-hint">
                              A planning input, not a published minimum spend.
                            </span>
                          </div>
                          <div className="field">
                            <label htmlFor="enquiry-timing">
                              Preferred timing
                            </label>
                            <input
                              {...inputProps("timing")}
                              maxLength={200}
                              placeholder="Dates or an approximate timeframe"
                              value={fields.timing}
                              onChange={(event) =>
                                update("timing", event.target.value)
                              }
                            />
                          </div>
                        </>
                      )}
                      {fields.role === "demand-partner" && (
                        <p className="field-hint field-full">
                          Include preferred formats, markets and integration
                          requirements in your brief. Our team can discuss the
                          technical detail with you.
                        </p>
                      )}
                    </div>
                  </details>
                  <div
                    className="form-honeypot"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-10000px",
                      width: 1,
                      height: 1,
                      overflow: "hidden",
                    }}
                  >
                    <label htmlFor="enquiry-website">
                      Leave this field empty
                    </label>
                    <input
                      id="enquiry-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={fields.website}
                      onChange={(event) =>
                        setFields((previous) => ({
                          ...previous,
                          website: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-submit">
                    <p>
                      We use these details to respond to your enquiry. See our{" "}
                      <a href="/privacy">privacy notice</a>.
                    </p>
                    <button
                      className="button button-primary"
                      type="submit"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting"
                        ? "Sending your enquiry…"
                        : fields.role === "publisher"
                          ? "Discuss my ad setup"
                          : fields.role === "advertiser"
                            ? "Request a media plan"
                            : "Discuss inventory access"}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </fieldset>
              </form>
            )}
          </div>
          <aside className="contact-aside">
            <span className="eyebrow">A CLEAR NEXT STEP</span>
            <h2>A conversation around your business.</h2>
            <ol className="form-next-step">
              <li>
                <span>01</span>
                <div>
                  <h3>We review your brief.</h3>
                  <p>
                    Your property, campaign or inventory requirements give us a
                    starting point.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>We discuss suitable options.</h3>
                  <p>
                    We’ll contact you to understand your setup, goals and the
                    support you need.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>We agree the scope together.</h3>
                  <p>
                    Integration, commercial terms and responsibilities are
                    discussed before proceeding.
                  </p>
                </div>
              </li>
            </ol>
            <div className="form-trust">
              <ShieldCheck size={22} />
              <p>
                No need to know every technical detail. Share what you know; we
                can discuss the rest.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
