import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Check,
  Plus,
  SlidersHorizontal,
  BarChart3,
  Globe2,
  ShieldCheck,
  Workflow,
  ArrowDown,
} from "lucide-react";
import { AuctionScene, MetricTrace } from "./Illustrations";
import { PlacementLens, FormatPreview } from "./PlacementStudio";
import { MediaPhoto } from "./MediaHero";
import { SignalHero } from "./SignalHero";
import { CampaignAtlas } from "./CampaignAtlas";
import { DimensionalAdCutaway } from "./DimensionalAdCutaway";
import { YieldRevenueCopilot } from "./YieldRevenueCopilot";
import { ServiceArtwork } from "./ServiceArtwork";
import { ContactPage } from "./Contact";
import { platforms } from "./platforms";
import { normalizePath, routes } from "./routes";
import { revenue } from "./revenue";

const contact = (role = "publisher", platform?: string) =>
  `/contact?role=${role}${platform ? `&platform=${encodeURIComponent(platform)}` : ""}`;
const introSteps = [
  [
    "Review your property",
    "We discuss your content, audience, existing tools and the opportunities in your ad setup.",
  ],
  [
    "Agree the right setup",
    "Review integration, buyer eligibility and commercial scope before making changes.",
  ],
  [
    "Launch with clarity",
    "Coordinate the agreed setup, testing and required approvals for your property.",
  ],
  [
    "Review and improve",
    "Understand delivery and revenue, then discuss what to adjust next.",
  ],
];
const publisherFAQ = [
  {
    q: "Who is Biddigi for?",
    a: "Publishers running websites, mobile apps, video content or connected TV services can discuss their ad setup with us. Advertisers and demand partners have separate enquiry paths.",
  },
  {
    q: "Can you work with my existing ad setup?",
    a: "We start with your current ad server, integrations and commercial arrangements. The proposed setup depends on your property, technical requirements and buyer eligibility.",
  },
  {
    q: "How much can my property earn?",
    a: "Revenue depends on audience, geography, demand, formats, viewability and agreed fees. We review your property rather than promise a fixed uplift or universal eCPM.",
  },
  {
    q: "What do I need to get started?",
    a: "A website or app-store link and a short explanation of your current setup are a useful start. If your property is not live or you do not know the technical details, choose Need guidance in the enquiry.",
  },
];

function LinkButton({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <a href={href} className={`button ${secondary ? "button-secondary" : ""}`}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const nav = [
    ["Publishers", "/publishers"],
    ["Advertisers", "/advertisers"],
    ["OTT Ads", "/ott-ads"],
    ["About", "/about"],
  ];
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <div className="bg-[#05080F] border-b border-[#131F37] text-[11px] font-mono text-[#94A3B8] py-1.5 px-4 hidden md:block">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#00E5FF] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse" />
              COMMAND v4.2 // PROD-US-EAST
            </span>
            <span>QPS: <strong className="text-white">842.6k</strong> (+4.2%)</span>
            <span>p99: <strong className="text-[#00E676]">18.4ms</strong></span>
            <span>Win Rate: <strong className="text-white">64.8%</strong></span>
            <span>Pipe: <strong className="text-[#00E5FF]">$14.2M/day</strong></span>
            <span>SLA: <strong className="text-[#00E676]">99.994%</strong></span>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <a href="/ott-ads#ctv-cutaway-lab" className="text-[#00E5FF] hover:underline">CTV Cutaway Lab</a>
            <span className="text-[#64748B]">•</span>
            <a href="/publishers#yield-copilot" className="text-[#00E676] hover:underline">Yield Copilot</a>
          </div>
        </div>
      </div>
      <div className="container nav-inner">
        <a href="/" className="brand" aria-label="Biddigi home">
          <img
            src="/brand-wordmark.svg"
            alt="Biddigi.io"
            width="146"
            height="51"
          />
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle icon-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          aria-label="Main navigation"
          className={open ? "nav-links is-open" : "nav-links"}
          id="main-navigation"
        >
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={
                path === href ||
                (href === "/ott-ads" && platforms.some((p) => p.slug === path))
                  ? "page"
                  : undefined
              }
            >
              {label}
            </a>
          ))}
          <a className="mobile-contact" href="/contact">
            Discuss your project <ArrowUpRight size={17} />
          </a>
        </nav>
        <a className="nav-cta" href="/contact">
          Discuss your project <ArrowUpRight size={17} />
        </a>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="/" aria-label="Biddigi home">
              <img
                src="/brand-wordmark.svg"
                alt="Biddigi.io"
                width="160"
                height="56"
              />
            </a>
            <p>Content. Connected to opportunity.</p>
            <span>A product by Expoworld.</span>
          </div>
          <div>
            <h3>Monetize</h3>
            <a href="/publishers">Publisher solutions</a>
            <a href="/publishers#how-it-works">How it works</a>
            <a href="/publishers#calculator">Revenue calculator</a>
          </div>
          <div>
            <h3>Advertise</h3>
            <a href="/advertisers">Campaign services</a>
            <a href="/ott-ads">OTT & video advertising</a>
            <a href={contact("demand-partner")}>Demand partners</a>
          </div>
          <div>
            <h3>Connect</h3>
            <a href="/about">About Biddigi</a>
            <a href="/contact">Discuss your project</a>
            <a href="https://expoworld.co/" target="_blank" rel="noreferrer">
              Expoworld <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="footer-platforms">
          {platforms.map((p) => (
            <a href={p.slug} key={p.id}>
              {p.name}
            </a>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {__BUILD_YEAR__} Biddigi. A product by Expoworld.</span>
          <div>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Website terms</a>
            <span>Web · App · Video · CTV</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
function FAQ({ items = publisherFAQ }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.q}>
          <summary>
            {item.q}
            <Plus size={19} aria-hidden="true" />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
function Responsibilities() {
  return (
    <div className="responsibilities">
      <div>
        <span>01 / YOU BRING</span>
        <p>Your content. Your audience. Your ambition.</p>
      </div>
      <div>
        <span>02 / WE SUPPORT</span>
        <p>Buyer connections. A considered ad setup. Performance clarity.</p>
      </div>
      <div>
        <span>03 / WE AGREE</span>
        <p>The integration. The commercial scope. The next steps.</p>
      </div>
    </div>
  );
}
function Process({ campaign = false }: { campaign?: boolean }) {
  const steps = campaign
    ? [
        [
          "Start with your brief",
          "Share your objective, audience, locations and timing. A finished creative is not required to start.",
        ],
        [
          "Shape the plan",
          "Discuss suitable platforms, placements, creative requirements and the scope of support.",
        ],
        [
          "Prepare for launch",
          "Coordinate assets and campaign setup, subject to inventory and platform approval.",
        ],
        [
          "Review the delivery",
          "Understand the available reporting against the agreed objective and discuss what comes next.",
        ],
      ]
    : introSteps;
  return (
    <ol className="process-grid">
      {steps.map(([title, text], i) => (
        <li key={title}>
          <span className="process-number">0{i + 1}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </li>
      ))}
    </ol>
  );
}
function CTA({ campaign = false }: { campaign?: boolean }) {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <span className="eyebrow">A GOOD NEXT STEP</span>
          <h2>
            {campaign
              ? "Your next campaign\nstarts with a conversation."
              : "Make more of\nwhat you create."}
          </h2>
          <p>
            {campaign
              ? "Bring your objective. We’ll discuss the platforms, creative and media options around it."
              : "Tell us about your property. Let’s discuss the ad setup that belongs alongside your content."}
          </p>
        </div>
        <LinkButton href={contact(campaign ? "advertiser" : "publisher")}>
          {campaign ? "Request a media plan" : "Discuss my ad setup"}
        </LinkButton>
        <svg viewBox="0 0 400 220" className="cta-ribbon" aria-hidden="true">
          <path
            d="M30 240C-10 60 330-30 350 75S110 250 160 95"
            fill="none"
            stroke="currentColor"
            strokeWidth="42"
          />
        </svg>
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <SignalHero />
      <div className="property-bar">
        <div className="container">
          <span>ONE CONNECTION. FOUR ENVIRONMENTS.</span>
          <div>
            <span>Websites</span>
            <i />
            <span>Mobile apps</span>
            <i />
            <span>Video</span>
            <i />
            <span>Connected TV</span>
          </div>
        </div>
      </div>
      <section className="section container signal-intro" id="solutions">
        <div className="split-heading">
          <span className="eyebrow">01 / THE PUBLISHER CONNECTION</span>
          <div>
            <h2>
              Good content.
              <br />
              Considered monetization.
            </h2>
            <p>
              You build the audience. We help connect buyer demand, improve the
              ad setup and make sense of performance.
            </p>
          </div>
        </div>
        <Responsibilities />
        <a className="text-link" href="/publishers">
          Inside publisher monetization <ArrowUpRight size={18} />
        </a>
      </section>
      <section className="section section-tinted signal-placement-chapter">
        <div className="container">
          <PlacementLens />
        </div>
      </section>
      <section className="section section-dark signal-reporting" id="reporting">
        <div className="container">
          <MetricTrace />
          <a className="text-link" href="/publishers#reporting">
            Explore reporting <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <section className="section process-section signal-process" id="metrics">
        <div className="container">
          <SectionHeading
            eyebrow="04 / FROM FIRST CONVERSATION TO FIRST IMPRESSION"
            title="A clear path to your next setup."
            text="Review the property. Agree the scope. Connect, launch and keep learning."
          />
          <Process />
          <div className="company-strip">
            <span>
              <Globe2 size={19} /> A product by Expoworld
            </span>
            <p>
              Advertising technology and ad operations, connected.
              <br />
              <span>London, UK · Mumbai, India</span>
            </p>
            <a href="/about" className="text-link">
              Meet Biddigi <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <CampaignAtlas />
      <section className="section container faq-section" id="faq">
        <div>
          <span className="eyebrow">06 / BEFORE WE CONNECT</span>
          <h2>
            A little clarity.
            <br />A better start.
          </h2>
          <p>You don’t need to speak ad tech to get started.</p>
        </div>
        <FAQ />
      </section>
      <CTA />
    </>
  );
}
function PageHero({
  eyebrow,
  title,
  text,
  campaign = false,
  company = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  campaign?: boolean;
  company?: boolean;
}) {
  return (
    <section className="page-hero container service-page-hero">
      <div className="service-page-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        <LinkButton href={company ? "/contact" : contact(campaign ? "advertiser" : "publisher")}>
          {company ? "Discuss your project" : campaign ? "Request a media plan" : "Discuss my ad setup"}
        </LinkButton>
      </div>
      <ServiceArtwork
        kind={company ? "company" : campaign ? "advertiser" : "publisher"}
      />
    </section>
  );
}
function Calculator() {
  const [impressions, setImpressions] = useState("100000");
  const [ecpm, setEcpm] = useState("2.5");
  const [compare, setCompare] = useState(false);
  const [other, setOther] = useState("2.5");
  const current = revenue(impressions, ecpm);
  const alternative = revenue(impressions, other);
  const currency = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(n);
  return (
    <section id="calculator" className="section calculator-section">
      <div className="container calculator-grid">
        <div>
          <span className="eyebrow">EXPLORE THE ARITHMETIC</span>
          <h2>
            See what goes
            <br />
            into ad revenue.
          </h2>
          <p>
            Change the assumptions to understand the relationship between
            impressions and eCPM. This is a scenario, not a forecast.
          </p>
          <p className="small-note">
            USD · gross monthly revenue before any fee or cost changes. No
            automatic uplift is applied.
          </p>
        </div>
        <div className="calculator-panel">
          <label htmlFor="impressions">Monthly served ad impressions</label>
          <input
            id="impressions"
            type="number"
            min="0"
            max="1000000000000"
            step="1"
            value={impressions}
            onChange={(e) => setImpressions(e.target.value)}
          />
          <label htmlFor="ecpm">Average eCPM (USD)</label>
          <input
            id="ecpm"
            type="number"
            min="0"
            max="10000"
            step="0.01"
            value={ecpm}
            onChange={(e) => setEcpm(e.target.value)}
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={compare}
              onChange={(e) => {
                setCompare(e.target.checked);
                if (e.target.checked) setOther(ecpm);
              }}
            />
            Compare another eCPM assumption
          </label>
          {compare && (
            <>
              <label htmlFor="scenario-ecpm">Comparison eCPM (USD)</label>
              <input
                id="scenario-ecpm"
                type="number"
                min="0"
                max="10000"
                step="0.01"
                value={other}
                onChange={(e) => setOther(e.target.value)}
              />
            </>
          )}
          <div className="calculator-result" aria-live="polite">
            <span>ILLUSTRATIVE MONTHLY REVENUE</span>
            <strong>
              {current === null ? "Check your inputs" : currency(current)}
            </strong>
            {compare && (
              <p>
                Comparison:{" "}
                {alternative === null
                  ? "Check your inputs"
                  : currency(alternative)}
              </p>
            )}
          </div>
          <p className="small-note">
            Impressions ÷ 1,000 × eCPM. Enter valid, non-negative values;
            impressions must be whole numbers.
          </p>
        </div>
      </div>
      <div className="container mt-8">
        <YieldRevenueCopilot />
      </div>
    </section>
  );
}
function Publishers() {
  return (
    <>
      <PageHero
        eyebrow="FOR PUBLISHERS"
        title="Your content deserves a considered ad setup."
        text="Web, app, video or connected TV. We help connect your available ad space with eligible buyers and bring clarity to integration, placements and performance."
      />
      <section className="section container">
        <PlacementLens />
      </section>
      <section id="how-it-works" className="section section-tinted">
        <div className="container detail-split">
          <div>
            <span className="eyebrow">ONE IMPRESSION, EXPLAINED</span>
            <h2>
              From a space in
              <br />
              your content to
              <br />
              an ad on screen.
            </h2>
            <p>
              Your property supplies the opportunity. Eligible buyers respond.
              The configured auction selects an eligible ad. Biddigi supports
              connections, configuration and performance review.
            </p>
            <details className="technical-detail">
              <summary>What is header bidding?</summary>
              <p>
                Header bidding invites multiple demand sources to respond to an
                available impression. A compatible integration and auction setup
                are agreed for your property. Eligibility, pricing and other
                rules affect selection.
              </p>
            </details>
          </div>
          <AuctionScene />
        </div>
      </section>
      <section id="solutions" className="section container">
        <SectionHeading
          eyebrow="WORKING WITH YOUR SETUP"
          title="Connect. Review. Refine."
        />
        <div className="service-grid">
          <article>
            <Workflow />
            <h3>Integration review</h3>
            <p>
              Discuss your ad server, existing tools and technical requirements.
              Review client-side or server-side integrations and the
              authorization information needed for your setup.
            </p>
          </article>
          <article>
            <SlidersHorizontal />
            <h3>Placement & pricing</h3>
            <p>
              Explore display, native, video and optional rewarded placements.
              Review minimum prices alongside fill and the experience of your
              audience.
            </p>
          </article>
          <article>
            <ShieldCheck />
            <h3>Property readiness</h3>
            <p>
              Review traffic sources, ads.txt or app-ads.txt, seller information
              and relevant consent signals. Buyer approval and eligibility
              remain subject to the buyer's requirements.
            </p>
          </article>
        </div>
        <Responsibilities />
      </section>
      <section id="reporting" className="section section-dark">
        <div className="container">
          <MetricTrace />
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="GETTING STARTED"
          title="A clear path from here."
        />
        <Process />
        <p className="small-note">
          Integration and commercial scope are agreed together. Inventory, buyer
          eligibility and any platform approvals remain subject to the relevant
          requirements.
        </p>
      </section>
      <Calculator />
      <section className="section container faq-section" id="faq">
        <div>
          <span className="eyebrow">PUBLISHER QUESTIONS</span>
          <h2>
            Clarity before
            <br />
            commitment.
          </h2>
        </div>
        <FAQ />
      </section>
      <CTA />
    </>
  );
}
function Advertisers() {
  return (
    <>
      <PageHero
        eyebrow="FOR BRANDS, AGENCIES & DEMAND PARTNERS"
        title="A stronger connection between your brief and the screen."
        text="Bring your audience, objective and creative idea. Biddigi helps shape the media plan, coordinate campaign requirements and review the delivery."
        campaign
      />
      <section className="section section-tinted">
        <div className="container detail-split">
          <FormatPreview />
          <div>
            <span className="eyebrow">A CAMPAIGN WITH CONTEXT</span>
            <h2>
              Start with the audience.
              <br />
              Build the plan around it.
            </h2>
            <p>
              Discuss locations, languages, viewing context and timing. We help
              clarify suitable platforms and creative requirements before you
              commit to a booking.
            </p>
            <a href="/ott-ads" className="text-link">
              Explore OTT & video advertising <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="BIDDIGI CAMPAIGN SUPPORT"
          title="From your first brief to the delivery review."
        />
        <Process campaign />
      </section>
      <section className="section section-dark">
        <div className="container demand-section">
          <div>
            <span className="eyebrow">FOR DSPS & DEMAND PARTNERS</span>
            <h2>
              Looking for
              <br />
              inventory access?
            </h2>
          </div>
          <div>
            <p>
              Tell us the inventory types, audience requirements, buying
              approach and technical setup you want to discuss. We review the
              fit and the next steps rather than promise universal access.
            </p>
            <LinkButton href={contact("demand-partner")}>
              Discuss demand requirements
            </LinkButton>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="BEFORE YOU ENQUIRE"
          title="Your objective comes first."
        />
        <FAQ
          items={[
            {
              q: "Can you help if we have not chosen a platform?",
              a: "Yes. Share the objective, intended audience and any timing or budget guidance. A platform selection is not required to begin.",
            },
            {
              q: "Are media rates fixed?",
              a: "No universal rate is published here. The proposal depends on platform, placement, audience, timing and the agreed support.",
            },
            {
              q: "Can you guarantee a specific placement or result?",
              a: "No. Bookings depend on inventory, eligibility and platform approval. The plan clarifies the scope and available measurement.",
            },
          ]}
        />
      </section>
      <CTA campaign />
    </>
  );
}
function PlatformList() {
  return (
    <div className="platform-list">
      {platforms.map((p, i) => (
        <article key={p.id}>
          <div className="platform-image">
            <MediaPhoto
              name={
                p.id === "jiohotstar" || p.id === "sonyliv"
                  ? "sports"
                  : p.id === "zee5"
                    ? "culture"
                    : p.id === "youtube"
                      ? "app-editorial"
                      : "entertainment"
              }
              alt={`Original illustrative viewing context for ${p.name} campaign planning`}
              sizes="(max-width:680px) 88vw, 260px"
            />
            <span className="platform-index">0{i + 1}</span>
          </div>
          <div>
            <span className="eyebrow">{p.category}</span>
            <h3>
              <a href={p.slug}>{p.name}</a>
            </h3>
            <p>{p.description}</p>
          </div>
          <div className="platform-formats">
            <span>EXPLORE PLACEMENTS</span>
            <p>{p.formats.map((f) => f.name).join(" · ")}</p>
            <a href={p.slug} className="text-link">
              Explore {p.name} <ArrowUpRight size={17} />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
function OttHub() {
  return (
    <>
      <section className="page-hero container ott-hero">
        <span className="eyebrow">BIDDIGI FOR ADVERTISERS</span>
        <h1>
          Your brand.
          <br />
          Their next
          <br />
          <span>viewing moment.</span>
        </h1>
        <div>
          <p>
            OTT and video advertising, planned around your audience. Explore
            five platforms, understand the placements and start with a clear
            campaign brief.
          </p>
          <LinkButton href={contact("advertiser")}>
            Request a media plan
          </LinkButton>
          <a href="#platforms" className="text-link">
            Find your platform <ArrowDown size={16} />
          </a>
        </div>
      </section>
      <section className="section section-tinted">
        <div className="container detail-split">
          <FormatPreview />
          <div>
            <span className="eyebrow">OTT AND VIDEO ADVERTISING</span>
            <h2>
              Different platforms.
              <br />A plan that fits.
            </h2>
            <p>
              Streaming entertainment, sports and online video offer different
              contexts for your message. Choose a familiar platform below, or
              bring the objective and we’ll discuss your options.
            </p>
            <p className="small-note">
              YouTube is an online-video service included alongside our OTT
              offering. Formats and inventory vary by platform, device and
              market.
            </p>
          </div>
        </div>
      </section>
      <CampaignAtlas />
      <div className="container">
        <DimensionalAdCutaway />
      </div>
      <section className="section container" id="platforms">
        <SectionHeading
          eyebrow="FIND YOUR VIEWING CONTEXT"
          title="Where could your next story appear?"
        />
        <PlatformList />
        <div className="guidance-strip">
          <div>
            <h3>Not sure which platform fits?</h3>
            <p>You can start with your audience and objective.</p>
          </div>
          <LinkButton href={contact("advertiser")} secondary>
            Discuss a campaign
          </LinkButton>
        </div>
      </section>
      <section className="section process-section">
        <div className="container">
          <SectionHeading
            eyebrow="THE CAMPAIGN JOURNEY"
            title="A considered plan before the first impression."
          />
          <Process campaign />
          <p className="small-note">
            Biddigi provides campaign support. Platform availability,
            eligibility and creative approval are confirmed before booking.
          </p>
        </div>
      </section>
      <CTA campaign />
    </>
  );
}
function PlatformPage({ slug }: { slug: string }) {
  const p = platforms.find((item) => item.slug === slug)!;
  return (
    <>
      <section className="page-hero container platform-hero">
        <div className="service-page-copy">
          <a className="breadcrumb" href="/ott-ads">
            OTT & video ads / {p.name}
          </a>
          <span className="eyebrow">
            {p.name.toUpperCase()} ADVERTISING WITH BIDDIGI
          </span>
          <h1>{p.tagline}</h1>
          <p>{p.description}</p>
          <LinkButton href={contact("advertiser", p.name)}>
            Request a {p.name} media plan
          </LinkButton>
          <div className="objective-tags">
            {p.objectives.map((o) => (
              <span key={o}>{o}</span>
            ))}
          </div>
        </div>
        <ServiceArtwork kind={p.id} name={p.name} />
      </section>
      <section className="section section-tinted" id="ad-formats">
        <div className="container detail-split">
          <div>
            <span className="eyebrow">A MESSAGE IN CONTEXT</span>
            <h2>
              Explore the
              <br />
              placement options.
            </h2>
            <p>
              Choose the creative around the viewing experience. The exact
              booking, format and technical requirements are confirmed for your
              campaign.
            </p>
            <p className="small-note">
              Conceptual placement illustration, not a live {p.name} interface.
            </p>
          </div>
          <FormatPreview kind={p.id} />
        </div>
        <div className="container format-cards">
          {p.formats.map((f, i) => (
            <article key={f.name}>
              <span>0{i + 1}</span>
              <h3>{f.name}</h3>
              <p>{f.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section container planning-grid">
        <div>
          <span className="eyebrow">BUILDING YOUR BRIEF</span>
          <h2>
            Plan the context.
            <br />
            Prepare the creative.
          </h2>
          <p>{p.audience}</p>
          <p>{p.geographic}</p>
          <a
            href={p.source.url}
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            {p.source.label} <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="creative-checklist">
          <h3>Your creative starting point</h3>
          {p.creative.map((item) => (
            <p key={item}>
              <Check size={17} />
              {item}
            </p>
          ))}
          <div className="quote-note">
            <span className="eyebrow">PRICING & SCOPE</span>
            <p>{p.pricing}</p>
          </div>
        </div>
      </section>
      <section className="section process-section">
        <div className="container">
          <SectionHeading
            eyebrow="WHAT BIDDIGI SUPPORTS"
            title="A practical campaign journey."
          />
          <Process campaign />
          <p className="small-note">
            Availability, eligibility, creative acceptance and placement remain
            subject to {p.name}'s requirements. Service scope and commercial
            terms are agreed before launch.
          </p>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <span className="eyebrow">BEFORE YOU PLAN</span>
          <h2>
            {p.name},<br />a little clearer.
          </h2>
        </div>
        <FAQ items={p.faqs} />
      </section>
      <section className="section container platform-enquiry">
        <div>
          <span className="eyebrow">LET’S START WITH YOUR OBJECTIVE</span>
          <h2>Bring your {p.name} brief.</h2>
          <p>
            A goal, audience or early creative idea is enough to start the
            conversation.
          </p>
        </div>
        <LinkButton href={contact("advertiser", p.name)}>
          Request a media plan
        </LinkButton>
      </section>
    </>
  );
}
function About() {
  return (
    <>
      <PageHero
        eyebrow="A PRODUCT BY EXPOWORLD"
        company
        title="Advertising technology. People who make sense of it."
        text="Biddigi brings buyer connections and ad operations together. We help publishers understand their monetization setup and advertisers turn a brief into a practical campaign discussion."
      />
      <section className="section section-tinted">
        <div className="container about-grid">
          <div>
            <span className="eyebrow">HOW WE WORK</span>
            <h2>
              Clarity is part
              <br />
              of the service.
            </h2>
            <p>
              We begin with the property, audience or campaign objective in
              front of us. Then we discuss the integration, requirements and
              commercial scope that fit.
            </p>
            <p>
              Our website uses labeled illustrations to explain concepts. Your
              actual setup and results depend on the inventory, demand and
              agreements involved.
            </p>
          </div>
          <div className="entity-list">
            <article>
              <Globe2 />
              <span>UNITED KINGDOM</span>
              <h3>Expoworld Biddigi Ltd</h3>
              <p>London, UK</p>
            </article>
            <article>
              <Globe2 />
              <span>INDIA</span>
              <h3>Expoworld Biddigi Private Limited</h3>
              <p>Mumbai, India</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="THE WORK BEHIND THE CONNECTION"
          title="A considered setup starts with the right questions."
        />
        <Responsibilities />
        <div className="service-grid">
          <article>
            <ShieldCheck />
            <h3>Property & demand fit</h3>
            <p>
              Traffic sources, inventory suitability, buyer eligibility and
              integration requirements.
            </p>
          </article>
          <article>
            <Workflow />
            <h3>Defined responsibilities</h3>
            <p>
              Clear service scope, setup responsibilities and commercial terms
              before changes or bookings.
            </p>
          </article>
          <article>
            <BarChart3 />
            <h3>Useful reporting</h3>
            <p>
              Understand available delivery and performance information in the
              context of your objective.
            </p>
          </article>
        </div>
      </section>
      <CTA />
    </>
  );
}
function Legal({ privacy }: { privacy: boolean }) {
  return (
    <section className="container legal-page">
      <span className="eyebrow">BIDDIGI WEBSITE INFORMATION</span>
      <h1>{privacy ? "Privacy notice" : "Website terms"}</h1>
      {privacy ? (
        <>
          <p>
            This notice describes the website enquiry flow. Biddigi is a product
            by Expoworld.
          </p>
          <h2>Information you submit</h2>
          <p>
            The enquiry form asks for contact details and information about your
            property or campaign. Optional details help us understand the brief.
            Do not include passwords, financial account information or sensitive
            personal records.
          </p>
          <h2>How the enquiry is used</h2>
          <p>
            Submitted details are used to review your request and contact you
            about it. The website sends the enquiry through a transactional
            email service to the Biddigi team. The mail service and receiving
            inbox process the message as part of delivery.
          </p>
          <h2>Website operation</h2>
          <p>
            The enquiry endpoint uses validation, abuse controls and submission
            identifiers to process requests. This website does not require an
            account. Form contents are not included in website analytics events.
            Operational hosting services may process request information needed
            to serve and protect the website.
          </p>
          <h2>Your questions</h2>
          <p>
            Use the <a href="/contact">contact form</a> to ask about handling,
            access, correction or deletion of information you submitted. Any
            further service engagement and its data requirements are discussed
            separately.
          </p>
        </>
      ) : (
        <>
          <p>
            This website introduces Biddigi publisher and advertising services.
            Sending an enquiry starts a discussion; it does not confirm a
            booking or service agreement.
          </p>
          <h2>Illustrations and calculations</h2>
          <p>
            Sample advertisements, auction bids, reporting figures and
            calculator results explain concepts. They are not live customer
            results, guaranteed outcomes or a forecast for your property.
          </p>
          <h2>Service arrangements</h2>
          <p>
            Integration, fees, support responsibilities and campaign terms are
            agreed separately. Inventory, eligibility and creative approvals
            depend on the relevant buyers or platforms. Website descriptions do
            not guarantee availability for a particular booking.
          </p>
          <h2>References and brands</h2>
          <p>
            Platform names and trademarks belong to their respective owners.
            Biddigi's service descriptions do not by themselves claim official
            partnership or authorization. External links provide further
            information from the relevant provider.
          </p>
          <h2>Questions</h2>
          <p>
            Please <a href="/contact">contact Biddigi</a> to discuss a property,
            service requirement or campaign before making a commitment.
          </p>
        </>
      )}
    </section>
  );
}
function NotFound() {
  return (
    <section className="container page-hero">
      <span className="eyebrow">404 / A DIFFERENT DIRECTION</span>
      <h1>
        This page isn’t
        <br />
        in the picture.
      </h1>
      <p>Head back to Biddigi or tell us what you were looking for.</p>
      <LinkButton href="/">Back to the homepage</LinkButton>
    </section>
  );
}

export function App({ pathname = "/" }: { pathname?: string }) {
  const path = normalizePath(pathname);
  useEffect(() => {
    const route = routes.find((r) => r.path === path);
    document.title = `${route?.title ?? "Page not found"} | Biddigi`;
    if (path === "/" && window.location.hash === "#calculator")
      window.location.replace("/publishers#calculator");
    const emit = (event: MouseEvent) => {
      const link = (event.target as Element)?.closest?.("a");
      if (link?.getAttribute("href")?.startsWith("/contact"))
        window.dispatchEvent(
          new CustomEvent("biddigi:analytics", {
            detail: { event: "cta_click", page: path },
          }),
        );
    };
    document.addEventListener("click", emit);
    return () => document.removeEventListener("click", emit);
  }, [path]);
  let page: ReactNode;
  if (path === "/") page = <Home />;
  else if (path === "/publishers") page = <Publishers />;
  else if (path === "/advertisers") page = <Advertisers />;
  else if (path === "/ott-ads") page = <OttHub />;
  else if (platforms.some((p) => p.slug === path))
    page = <PlatformPage slug={path} />;
  else if (path === "/about") page = <About />;
  else if (path === "/contact") page = <ContactPage />;
  else if (path === "/privacy" || path === "/terms")
    page = <Legal privacy={path === "/privacy"} />;
  else page = <NotFound />;
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header path={path} />
      <main id="main-content">{page}</main>
      <Footer />
    </>
  );
}
export default App;
