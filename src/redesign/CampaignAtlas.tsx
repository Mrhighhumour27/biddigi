import { useId, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, MoveRight } from "lucide-react";
import { platforms } from "./platforms";

const contexts: Record<
  string,
  { photo: string; title: string; scene: string; alt: string }
> = {
  jiohotstar: {
    photo: "sports",
    title: "The moments\npeople gather for.",
    scene: "SPORTS / ENTERTAINMENT",
    alt: "Original illustrative sports scene in a floodlit stadium",
  },
  "prime-video": {
    photo: "entertainment",
    title: "A story worth\nstaying in for.",
    scene: "FILM / ENTERTAINMENT",
    alt: "Original fictional entertainment scene on a city rooftop at dusk",
  },
  sonyliv: {
    photo: "sports",
    title: "In the middle\nof the conversation.",
    scene: "SPORTS / STORIES",
    alt: "Original illustrative stadium photograph representing sports viewing",
  },
  youtube: {
    photo: "app-editorial",
    title: "Where curiosity\nfinds its next watch.",
    scene: "CREATORS / ONLINE VIDEO",
    alt: "Original coastal cafe photograph representing a lifestyle video context",
  },
  zee5: {
    photo: "culture",
    title: "Stories that\nfeel close to home.",
    scene: "ENTERTAINMENT / CULTURE",
    alt: "Original food and culture photograph representing an entertainment context",
  },
};

function AtlasPhoto({
  photo,
  alt,
  onLoad,
  onError,
  loading = "lazy",
}: {
  photo: string;
  alt: string;
  onLoad?: () => void;
  onError?: () => void;
  loading?: "lazy" | "eager";
}) {
  const portrait = photo === "app-editorial";
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`/images/v3/${photo}-640.avif 640w, /images/v3/${photo}-1280.avif ${portrait ? 1024 : 1280}w`}
        sizes="(max-width: 760px) 100vw, 70vw"
      />
      <img
        src={`/images/v3/${photo}-640.webp`}
        srcSet={`/images/v3/${photo}-640.webp 640w, /images/v3/${photo}-1280.webp ${portrait ? 1024 : 1280}w`}
        sizes="(max-width: 760px) 100vw, 70vw"
        width={portrait ? 1024 : 1280}
        height={portrait ? 1536 : photo === "culture" ? 853 : 720}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={onLoad}
        onError={onError}
      />
    </picture>
  );
}

/** A manual viewing-context explorer; the photographs are original illustrations. */
export function CampaignAtlas({ compact = false }: { compact?: boolean }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(0);
  const [revision, setRevision] = useState(0);
  const [imageReady, setImageReady] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);
  const displayed = useRef<number | null>(0);
  const request = useRef(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const platform = platforms[active];
  const context = contexts[platform.id];
  const lastContext =
    previous === null ? null : contexts[platforms[previous].id];

  function select(index: number) {
    if (index === active) return;
    setPrevious(displayed.current);
    setImageReady(false);
    setImageFailed(false);
    setActive(index);
    setRevision(++request.current);
  }

  function retryImage() {
    setPrevious(null);
    setImageReady(false);
    setImageFailed(false);
    setRevision(++request.current);
    // The retry control leaves the tree while loading; retain keyboard context.
    buttons.current[active]?.focus();
  }

  return (
    <section
      className={`campaign-atlas${compact ? " campaign-atlas-compact" : ""}`}
      aria-labelledby={`${uid}-heading`}
    >
      <div className="atlas-intro">
        <div className="atlas-overline">
          <span>
            <i aria-hidden="true" /> CAMPAIGN ATLAS
          </span>
          <span>OTT + ONLINE VIDEO / 05 CONTEXTS</span>
        </div>
        <div className="atlas-heading">
          <h2 id={`${uid}-heading`}>
            {compact ? (
              <>
                Find your
                <br />
                <em>viewing context.</em>
              </>
            ) : (
              <>
                Be part of
                <br />
                <em>the next moment.</em>
              </>
            )}
          </h2>
          <div>
            <ArrowDownRight size={28} strokeWidth={1.2} aria-hidden="true" />
            <p>
              Different screens. Different stories. Explore where your campaign
              could belong, then build a brief around your audience.
            </p>
          </div>
        </div>
      </div>

      <div
        className="atlas-selector"
        role="tablist"
        aria-label="Campaign viewing platforms"
      >
        {platforms.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${index}`}
            aria-controls={`${uid}-panel`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight")
                next = (index + 1) % platforms.length;
              else if (event.key === "ArrowLeft")
                next = (index + platforms.length - 1) % platforms.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = platforms.length - 1;
              else return;
              event.preventDefault();
              select(next);
              buttons.current[next]?.focus();
            }}
          >
            <span className="atlas-index">0{index + 1}</span>
            <span>{item.name}</span>
            <ArrowUpRight size={17} strokeWidth={1.3} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div
        className="atlas-panel"
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${active}`}
        aria-busy={!imageReady && !imageFailed}
        tabIndex={0}
      >
        <div className={`atlas-screen atlas-screen-${platform.id}`}>
          {lastContext && !imageFailed && (
            <div
              className="atlas-image atlas-image-previous"
              aria-hidden="true"
            >
              <AtlasPhoto photo={lastContext.photo} alt="" />
            </div>
          )}
          {!imageFailed && (
            <div
              className="atlas-image atlas-image-current"
              key={revision}
              data-enter={revision > 0 && imageReady}
              data-ready={imageReady}
            >
              <AtlasPhoto
                photo={context.photo}
                alt={context.alt}
                loading={revision > 0 ? "eager" : "lazy"}
                onLoad={() => {
                  if (revision !== request.current) return;
                  displayed.current = active;
                  setImageReady(true);
                }}
                onError={() => {
                  if (revision !== request.current) return;
                  displayed.current = null;
                  setPrevious(null);
                  setImageReady(false);
                  setImageFailed(true);
                }}
              />
            </div>
          )}
          {revision > 0 && imageReady && (
            <div
              className="atlas-shutter"
              key={`shutter-${revision}`}
              aria-hidden="true"
            />
          )}
          <div className="atlas-screen-shade" aria-hidden="true" />
          <div className="atlas-screen-top">
            <span>
              0{active + 1} / {context.scene}
            </span>
            <span className="atlas-frame-mark" aria-hidden="true">
              ↗
            </span>
          </div>
          {imageFailed && (
            <div className="atlas-image-failure" role="status">
              <span>{platform.name} / VIEWING CONTEXT</span>
              <strong>Illustration unavailable.</strong>
              <p>{context.alt} could not be displayed.</p>
              <button type="button" onClick={retryImage}>
                Retry {platform.name} illustration{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
          {!imageFailed && (
            <div className="atlas-screen-copy">
              <span>{platform.category}</span>
              <p>{context.title}</p>
            </div>
          )}
          <div className="atlas-screen-bottom">
            <span>
              {imageFailed
                ? "VIEWING CONTEXT / IMAGE UNAVAILABLE"
                : "ORIGINAL ARTWORK / ILLUSTRATIVE VIEWING CONTEXT"}
            </span>
            <span aria-hidden="true">0{active + 1} — 05</span>
          </div>
        </div>

        <div className="atlas-details">
          <span className="atlas-details-category">{platform.category}</span>
          <h3>{platform.name}</h3>
          <p className="atlas-proposition">{platform.tagline}</p>
          <p>{platform.description}</p>
          <div className="atlas-planning-note">
            <span>START WITH THE BRIEF</span>
            <p>
              Your objective, audience and locations shape the plan. Inventory
              and creative requirements are confirmed before booking.
            </p>
          </div>
          <div className="atlas-actions">
            <a
              className="atlas-enquire"
              href={`/contact?role=advertiser&platform=${encodeURIComponent(platform.id)}`}
            >
              Discuss a campaign <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a className="atlas-explore" href={platform.slug}>
              Explore {platform.name} <MoveRight size={19} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <p className="atlas-footnote">
        Biddigi provides campaign planning and coordination. Platform names
        identify the requested advertising service; the scenes above illustrate
        viewing contexts.
      </p>
    </section>
  );
}
