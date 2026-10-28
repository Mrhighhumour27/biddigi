import { useState } from "react";
import { MediaPhoto } from "./MediaHero";
import { ArrowLeft, ArrowRight, Check, BarChart3 } from "lucide-react";

const auctionSteps = [
  {
    label: "Ad space",
    title: "Your content creates an opportunity.",
    text: "A placement on Fieldnotes is available for an ad. The publisher supplies the content, audience and property.",
  },
  {
    label: "Buyer bids",
    title: "Eligible buyers respond.",
    text: "Connected buyers can bid for an available impression. These fictional amounts explain the process; they are not live prices.",
  },
  {
    label: "Selection",
    title: "The configured auction selects an eligible ad.",
    text: "Auction rules, valid responses and eligibility matter. A higher number alone does not guarantee that an ad can be served.",
  },
  {
    label: "Ad served",
    title: "An ad appears. An impression can be measured.",
    text: "Biddigi supports connection, setup and performance review. Reporting helps you understand the placement after the ad is shown.",
  },
];

function Landscape({ label = "FIELDNOTES" }: { label?: string }) {
  return (
    <div className="article-photo">
      <MediaPhoto name="editorial" alt="Original alpine editorial photograph" />
      <span>{label}</span>
      <b>
        A little more
        <br />
        outside.
      </b>
    </div>
  );
}
function SampleAd({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <MediaPhoto
        name="product"
        alt="Trail Supply blue and orange footwear campaign"
      />
      <span>TRAIL SUPPLY</span>
      <b>
        {compact ? (
          "Take the scenic route."
        ) : (
          <>
            Find your
            <br />
            next trail.
          </>
        )}
      </b>
      <small>Sample advertisement</small>
    </>
  );
}

export function AuctionScene() {
  const [step, setStep] = useState(0);
  return (
    <div className="auction-scene">
      <div className="scene-top">
        <span className="eyebrow">ONE IMPRESSION, EXPLAINED</span>
        <span className="scene-count">0{step + 1} / 04</span>
      </div>
      <div className="auction-art" data-stage={step}>
        <svg
          className="ribbon"
          viewBox="0 0 600 360"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path
            d="M70 250C60 50 334 4 466 121S550 329 360 299 242 153 550 214"
            fill="none"
            stroke="#ff6500"
            strokeWidth="44"
          />
          <path
            d="M70 250C60 50 334 4 466 121S550 329 360 299 242 153 550 214"
            fill="none"
            stroke="#fff"
            strokeWidth="1.3"
            strokeDasharray="3 9"
          />
        </svg>
        <div className="mini-article">
          <div className="browser-dots">
            <i />
            <i />
            <i />
            <span>your publication</span>
          </div>
          <Landscape />
          <div className="article-lines">
            <i />
            <i />
            <i />
          </div>
          <div className={`ad-slot ${step === 3 ? "filled" : ""}`}>
            {step === 3 ? (
              <SampleAd />
            ) : (
              <>
                <span className="slot-cross">+</span>
                <span>Your ad placement</span>
                <small>FIELDNOTES / PLACEMENT 01</small>
              </>
            )}
          </div>
          <span className="paper-caption">
            PUBLISHER / CONTENT &amp; PLACEMENT
          </span>
        </div>
        <div className="bid-stack">
          <span className="eyebrow">BUYERS / FICTIONAL RESPONSES</span>
          {[
            { value: "2.10", status: "Eligible response" },
            { value: "2.80", status: "Not eligible in this example" },
            { value: "2.45", status: "Eligible response" },
          ].map((bid, index) => (
            <div
              key={bid.value}
              className={`bid ${index === 2 && step >= 2 ? "selected" : ""} ${index === 1 && step >= 2 ? "ineligible" : ""}`}
            >
              <span className="bid-icon">
                {String.fromCharCode(65 + index)}
              </span>
              <span>
                Buyer {String.fromCharCode(65 + index)}
                <small>
                  {index === 2 && step >= 2
                    ? "Eligible selection"
                    : step >= 2
                      ? bid.status
                      : "Illustrative bid"}
                </small>
              </span>
              <b>${bid.value}</b>
              {index === 2 && step >= 2 && (
                <Check size={15} aria-label="Selected" />
              )}
            </div>
          ))}
          <div className="auction-note">
            <span className="signal-dot" />
            <span>
              Configured auction selects
              <br />
              <small>Biddigi supports connection &amp; setup</small>
            </span>
          </div>
        </div>
        <div className="served-note">
          <Check size={14} aria-hidden="true" />
          <span>
            {step === 3
              ? "Ad displayed · ready to measure"
              : "Placement → bids → selection → ad"}
          </span>
        </div>
      </div>
      <div className="step-tabs" aria-label="Auction stages">
        {auctionSteps.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={step === index}
            onClick={() => setStep(index)}
          >
            <span>0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div className="scene-description" aria-live="polite" aria-atomic="true">
        <b>{auctionSteps[step].title}</b>
        <p>{auctionSteps[step].text}</p>
      </div>
      <div className="scene-controls">
        <span>Illustration · not a live auction</span>
        <div>
          <button
            type="button"
            className="icon-button"
            aria-label="Previous auction stage"
            disabled={step === 0}
            onClick={() => setStep((value) => Math.max(0, value - 1))}
          >
            <ArrowLeft size={17} />
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label="Next auction stage"
            disabled={step === 3}
            onClick={() => setStep((value) => Math.min(3, value + 1))}
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

const metrics = [
  {
    name: "Revenue",
    value: "$250",
    explanation:
      "This fictional placement generated $250 in gross ad revenue. Actual reporting and net earnings depend on your setup and agreed fees.",
  },
  {
    name: "Impressions",
    value: "100,000",
    explanation:
      "An impression counts an ad being shown. This example uses 100,000 served impressions, not page views or individual people.",
  },
  {
    name: "eCPM",
    value: "$2.50",
    explanation:
      "Revenue ÷ impressions × 1,000. Here, $250 ÷ 100,000 × 1,000 = $2.50. It describes earnings per thousand impressions.",
  },
  {
    name: "Fill rate",
    value: "80%",
    explanation:
      "Filled requests ÷ total ad requests × 100. For example, 100,000 filled requests from 125,000 requests gives 80%.",
  },
];

export function MetricTrace() {
  const [active, setActive] = useState(0);
  return (
    <div className="metric-section" id="platform">
      <div>
        <span className="eyebrow">MAKE SENSE OF PERFORMANCE</span>
        <h2>
          Numbers with
          <br />a clear meaning.
        </h2>
        <p>
          Know what you’re measuring before deciding what to improve. Explore
          the building blocks of ad reporting.
        </p>
        <span className="data-label">
          Illustrative data · not customer results
        </span>
      </div>
      <div className="metric-panel">
        <div className="metric-heading">
          <BarChart3 size={20} aria-hidden="true" />
          <span>Fieldnotes / Placement 01</span>
          <span>EXAMPLE</span>
        </div>
        <div className="metric-grid">
          {metrics.map((metric, index) => (
            <button
              type="button"
              key={metric.name}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <span>{metric.name}</span>
              <b>{metric.value}</b>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
        <p className="metric-explanation" aria-live="polite" aria-atomic="true">
          {metrics[active].explanation}
        </p>
        <small className="metric-footnote">
          A conceptual explanation, not a product screenshot or forecast.
        </small>
      </div>
    </div>
  );
}
