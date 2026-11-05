import { BrandLogo } from "./BrandLogo";
import { platforms, platformComparison } from "./platforms";
export function JourneyChoice({ enquiry = false }: { enquiry?: boolean }) {
  return (
    <div className="journey-grid">
      {[
        [
          "Publishers",
          "Integration, placements and reporting for your inventory.",
          "Monetize your inventory",
          "publisher",
          "/publishers",
        ],
        [
          "Advertisers",
          "Media planning and campaign execution across five platforms.",
          "Plan an advertising campaign",
          "advertiser",
          "/advertisers",
        ],
      ].map(([h, t, label, role, path]) => (
        <article key={role}>
          <h2>{h}</h2>
          <p>{t}</p>
          <a
            className="text-link"
            href={enquiry ? `/contact?role=${role}` : path}
          >
            {label} →
          </a>
        </article>
      ))}
    </div>
  );
}
export function PlatformComparison() {
  return (
    <div className="platform-comparison">
      <span className="eyebrow">MATCH YOUR BRIEF TO THE VIEWING CONTEXT</span>
      <h2>Compare your campaign options.</h2>
      <p>
        Formats, targeting and measurement are confirmed for your market before
        booking.
      </p>
      <div
        className="comparison-scroll"
        role="region"
        aria-label="Advertising platform comparison"
        tabIndex={0}
      >
        <table>
          <caption>Platform context, objectives and formats</caption>
          <thead>
            <tr>
              {["Platform", "Viewing context", "Campaign fit", "Formats"].map(
                (t) => (
                  <th scope="col" key={t}>
                    {t}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {platforms.map((p) => (
              <tr key={p.id}>
                <th scope="row">
                  <a href={p.slug}>
                    <BrandLogo brand={p.id} label={p.name} />
                  </a>
                </th>
                <td>{platformComparison[p.id].context}</td>
                <td>{platformComparison[p.id].objective}</td>
                <td>{p.formats.map((f) => f.name).join(" · ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export function CampaignDeliverables({ platform }: { platform?: string }) {
  const p = platforms.find((p) => p.name === platform);
  return (
    <div className="campaign-deliverables">
      <span className="eyebrow">YOUR BIDDIGI MEDIA PLAN</span>
      <h2>Agree the details before launch.</h2>
      <div className="deliverable-grid">
        {[
          [
            "Media plan",
            "Audience, locations, languages, formats, budget and dates.",
          ],
          [
            "Creative preparation",
            "Confirm specifications, review assets and coordinate creative approval.",
          ],
          [
            "Execution",
            "Coordinate agreed setup, inventory, approvals and launch checks.",
          ],
          [
            "Delivery review",
            p
              ? platformComparison[p.id].measurement
              : "Review available impressions, video delivery and engagement metrics. Conversion tracking is agreed separately.",
          ],
        ].map(([h, t]) => (
          <article key={h}>
            <h3>{h}</h3>
            <p>{t}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
