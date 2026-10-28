import { useId, useRef, useState } from "react";
import {
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Circle,
  Expand,
  Layers3,
  Plus,
  Radio,
} from "lucide-react";

type PhotoName =
  | "editorial"
  | "product"
  | "lifestyle"
  | "app-editorial"
  | "entertainment"
  | "ctv-room"
  | "sports"
  | "culture";

function Photo({
  name,
  alt,
  className = "",
}: {
  name: PhotoName;
  alt: string;
  className?: string;
}) {
  const portrait = name === "lifestyle" || name === "app-editorial";
  const width = portrait ? 1024 : 1280;
  const height = portrait
    ? 1536
    : ["sports", "ctv-room", "entertainment"].includes(name)
      ? 720
      : 853;
  return (
    <picture className={`studio-photo ${className}`}>
      <source
        type="image/avif"
        srcSet={`/images/v3/${name}-640.avif 640w, /images/v3/${name}-1280.avif ${width}w`}
        sizes="(max-width: 680px) 90vw, 600px"
      />
      <img
        src={`/images/v3/${name}-640.webp`}
        srcSet={`/images/v3/${name}-640.webp 640w, /images/v3/${name}-1280.webp ${width}w`}
        sizes="(max-width: 680px) 90vw, 600px"
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

function Campaign({
  portrait = false,
  small = false,
  shared = false,
}: {
  portrait?: boolean;
  small?: boolean;
  shared?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      layoutId={shared ? "placement-campaign" : undefined}
      layout={shared}
      initial={false}
      transition={{
        layout: { duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] },
      }}
      className={`campaign-creative ${shared ? "v4-shared-aperture" : ""} ${portrait ? "campaign-portrait" : ""} ${small ? "campaign-small" : ""}`}
    >
      <Photo
        name={portrait ? "lifestyle" : "product"}
        alt={
          portrait
            ? "Fictional Trail Supply outdoor footwear campaign in action"
            : "Cobalt and orange trail shoe photographed on warm sandstone"
        }
        className="campaign-art"
      />
      <motion.div
        layout={shared ? "position" : false}
        transition={{
          layout: {
            duration: reduceMotion ? 0 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        className="campaign-copy"
      >
        <span className="campaign-wordmark">TRAIL SUPPLY</span>
        <strong>
          Leave the
          <br />
          ordinary.
        </strong>
        <span className="campaign-action">
          Explore the collection <ArrowUpRight size={12} aria-hidden="true" />
        </span>
      </motion.div>
      <span className="campaign-disclosure">Illustrative advertisement</span>
      <span className="campaign-aperture-corners" aria-hidden="true" />
    </motion.div>
  );
}

function Chrome({ label }: { label: string }) {
  return (
    <div className="studio-chrome">
      <div aria-hidden="true">
        <Circle />
        <Circle />
        <Circle />
      </div>
      <span>{label}</span>
      <Expand size={11} aria-hidden="true" />
    </div>
  );
}

function WebPlacement() {
  return (
    <div className="placement-screen stage-web">
      <Chrome label="FIELDNOTES / WEB" />
      <div className="publisher-masthead">
        <span>FIELDNOTES</span>
        <div>
          <span>EXPLORE</span>
          <span>STORIES</span>
          <Plus size={12} aria-hidden="true" />
        </div>
      </div>
      <div className="publisher-spread">
        <article className="publisher-story">
          <Photo
            name="editorial"
            alt="Cinematic outdoor landscape illustrating a publisher’s travel feature"
          />
          <span className="publisher-category">
            THE OUTSIDE EDIT / 06 MIN READ
          </span>
          <h3>Somewhere beyond the everyday.</h3>
          <p>
            A new perspective starts where the familiar ends. Stories for a life
            spent discovering.
          </p>
          <div className="native-story">
            <Photo
              name="product"
              alt="Trail shoe campaign photograph in a sponsored native placement"
            />
            <div>
              <span>SPONSORED / TRAIL SUPPLY</span>
              <b>Leave the ordinary.</b>
              <small>Illustrative native advertisement</small>
            </div>
            <ChevronRight size={12} aria-hidden="true" />
          </div>
        </article>
        <aside className="publisher-sidebar" aria-label="Example display ad">
          <span className="ad-placement-label">ADVERTISEMENT</span>
          <Campaign shared />
          <span className="placement-anchor">
            <span /> Display placement
          </span>
        </aside>
      </div>
    </div>
  );
}

function AppPlacement() {
  const [reward, setReward] = useState(false);
  const rewardedTriggerRef = useRef<HTMLButtonElement>(null);
  const rewardedReturnRef = useRef<HTMLButtonElement>(null);
  const rewardId = useId();

  function showReward() {
    setReward(true);
    requestAnimationFrame(() => rewardedReturnRef.current?.focus());
  }

  function returnToApp() {
    setReward(false);
    requestAnimationFrame(() => rewardedTriggerRef.current?.focus());
  }
  return (
    <div className="placement-screen stage-app">
      <div className="app-context-copy" aria-hidden="true">
        <span>IN THE FEED.</span>
        <strong>
          In the
          <br />
          experience.
        </strong>
        <span>CONTENT / CREATIVE / CONNECTION</span>
      </div>
      <div className="app-handset">
        <div className="app-status">
          <span>9:41</span>
          <span className="app-camera" aria-hidden="true" />
          <span aria-hidden="true">••• ▰</span>
        </div>
        <div className="app-titlebar">
          <span>Fieldnotes.</span>
          <Plus size={14} aria-hidden="true" />
        </div>
        <div className="app-feed">
          <article className="app-feed-card">
            <Photo
              name="app-editorial"
              alt="Editorial lifestyle photograph in the fictional Fieldnotes app"
            />
            <div>
              <span>TAKE A DIFFERENT ROUTE</span>
              <h3>A little further from ordinary.</h3>
            </div>
          </article>
          <div className="app-native">
            <span>SPONSORED / TRAIL SUPPLY</span>
            <Campaign small shared />
          </div>
        </div>
        <div className="app-bottom-nav" aria-hidden="true">
          <span>DISCOVER</span>
          <span>SAVED</span>
          <span>YOU</span>
        </div>
        {reward && (
          <div
            className="reward-overlay"
            id={rewardId}
            role="group"
            aria-label="Rewarded placement illustration"
            onKeyDown={(event) => {
              if (event.key === "Escape") returnToApp();
            }}
          >
            <span className="reward-heading">OPTIONAL REWARDED PLACEMENT</span>
            <Campaign portrait />
            <button
              type="button"
              className="reward-return"
              ref={rewardedReturnRef}
              onClick={returnToApp}
            >
              <Check size={12} aria-hidden="true" /> Return to the app
            </button>
            <small>
              A completed illustrative experience. No reward or video is
              running.
            </small>
          </div>
        )}
      </div>
      <div className="app-mode-control">
        <button
          type="button"
          aria-pressed={!reward}
          onClick={() => setReward(false)}
        >
          Native feed
        </button>
        <button
          type="button"
          ref={rewardedTriggerRef}
          aria-pressed={reward}
          aria-expanded={reward}
          aria-controls={reward ? rewardId : undefined}
          onClick={showReward}
        >
          Show rewarded placement
        </button>
      </div>
    </div>
  );
}

const videoStages = ["Content", "Ad break", "Back to content"];

function VideoPlacement() {
  const [stage, setStage] = useState(1);
  return (
    <div className="placement-screen stage-video">
      <Chrome label="FIELDNOTES / VIDEO" />
      <div className="video-stage">
        <Photo
          name="entertainment"
          alt="Original fictional cinematic scene used as the content context"
          className="video-content"
        />
        <div className="video-program-title">
          <span>AN ORIGINAL VIEWING CONTEXT</span>
          <strong>The world, a little closer.</strong>
        </div>
        {stage === 1 && (
          <div className="video-ad-overlay">
            <span>AD BREAK / ILLUSTRATIVE PLACEMENT</span>
            <Campaign shared />
          </div>
        )}
        <div className="video-player-caption">
          <span>{stage === 1 ? "Advertisement" : "Publisher content"}</span>
          <span>Placement illustration · not a video player</span>
        </div>
      </div>
      <div className="video-timeline" aria-label="Video placement sequence">
        {videoStages.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={stage === index}
            onClick={() => setStage(index)}
          >
            <span>0{index + 1}</span>
            {label}
          </button>
        ))}
      </div>
      <p className="stage-caption" aria-live="polite">
        {stage === 1
          ? "A video advertisement occupies an eligible break, then viewing returns to the content."
          : "The publisher’s content surrounds the advertising break. Select Ad break to see the placement."}
      </p>
    </div>
  );
}

function CtvPlacement() {
  const [showAd, setShowAd] = useState(true);
  return (
    <div className="placement-screen stage-ctv">
      <div className="ctv-context">
        <Photo
          name="ctv-room"
          alt="A carefully lit living room with a television showing a composed sample ad placement"
        />
        <div className="ctv-screen">
          {showAd ? (
            <Campaign shared />
          ) : (
            <Photo
              name="entertainment"
              alt="Original entertainment still in the illustrated television screen"
            />
          )}
          <span className="ctv-screen-label">
            {showAd ? "ADVERTISEMENT" : "STREAMING CONTENT"}
          </span>
        </div>
        <div className="ctv-context-title">
          <span>THE BIG-SCREEN MOMENT</span>
          <strong>Made for the living room.</strong>
        </div>
      </div>
      <div className="ctv-controls">
        <span>
          <Radio size={13} aria-hidden="true" /> Connected TV / sample context
        </span>
        <button
          type="button"
          aria-pressed={showAd}
          onClick={() => setShowAd((value) => !value)}
        >
          {showAd ? "Show the content" : "Show the ad break"}
          <ArrowRight size={13} aria-hidden="true" />
        </button>
      </div>
      <p className="stage-caption">
        A conceptual TV composition. Actual inventory and ad-break behavior
        depend on the streaming service and campaign.
      </p>
    </div>
  );
}

const placementFormats = [
  {
    name: "Web",
    number: "01",
    title: "A place alongside a good story.",
    text: "See a finished display placement beside a publisher feature. Size, position and ad creative work together with the reading experience.",
    caption: "PUBLISHER CONTENT + DISPLAY ADVERTISING",
  },
  {
    name: "App",
    number: "02",
    title: "A natural part of the feed.",
    text: "Explore native creative within an app feed, then a separate optional rewarded placement. Different formats, each with a clear role in the experience.",
    caption: "NATIVE FEED + OPTIONAL REWARDED PLACEMENT",
  },
  {
    name: "Video",
    number: "03",
    title: "Your message enters the picture.",
    text: "Follow content, advertising break and return to content. A clear sequence makes the difference between the video itself and the placement around it.",
    caption: "CONTENT → AD BREAK → CONTENT",
  },
  {
    name: "CTV",
    number: "04",
    title: "Built for a bigger viewing moment.",
    text: "Bring the placement into a living-room context. Connected TV advertising belongs within an eligible streaming experience, not on top of every screen.",
    caption: "CONNECTED TV / STREAMING CONTEXT",
  },
];

/** Finished contextual placements: four authored compositions, not one resized card. */
export function PlacementLens() {
  const [active, setActive] = useState(0);
  const groupId = useId();
  const format = placementFormats[active];
  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id={groupId}>
        <div className="placement-lens v3-placement v4-placement">
          <div className="placement-copy">
            <span className="eyebrow">THE PLACEMENT STUDIO</span>
            <h2>
              One campaign.
              <br />
              Four real contexts.
            </h2>
            <p className="placement-intro">
              Follow the orange frame. The same campaign changes shape around
              the content, the device and the way people watch.
            </p>
            <div
              className="format-tabs"
              role="group"
              aria-label="Ad placement types"
            >
              {placementFormats.map((item, index) => (
                <button
                  type="button"
                  key={item.name}
                  aria-pressed={active === index}
                  aria-controls={`${groupId}-placement-scene`}
                  onClick={() => setActive(index)}
                >
                  <span>{item.number}</span>
                  {item.name}
                </button>
              ))}
            </div>
            <div
              className="format-description"
              aria-live="polite"
              aria-atomic="true"
            >
              <h3>{format.title}</h3>
              <p>{format.text}</p>
            </div>
            <a className="text-link" href="/publishers">
              Explore publisher solutions{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <motion.div
            layout="size"
            initial={false}
            className="placement-stage"
            data-format={format.name.toLowerCase()}
          >
            <div className="placement-stage-topline">
              <span>
                {format.number} / {format.name.toUpperCase()} PLACEMENT
              </span>
              <Layers3 size={15} aria-hidden="true" />
            </div>
            <div className="placement-journey-rail" aria-hidden="true">
              {placementFormats.map((item, index) => (
                <span key={item.name}>
                  {active === index && (
                    <motion.i
                      layoutId="placement-guide"
                      transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
                    />
                  )}
                </span>
              ))}
            </div>
            <div
              className="placement-stage-scene"
              id={`${groupId}-placement-scene`}
            >
              {active === 0 && <WebPlacement />}
              {active === 1 && <AppPlacement />}
              {active === 2 && <VideoPlacement />}
              {active === 3 && <CtvPlacement />}
            </div>
            <div className="placement-stage-bottomline">
              <span className="placement-accent" aria-hidden="true" />
              <span>{format.caption}</span>
              <span>ILLUSTRATIVE EXAMPLE</span>
            </div>
          </motion.div>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}

function contextForKind(kind = "") {
  const normalized = kind.toLowerCase();
  if (normalized.includes("jio") || normalized.includes("sony"))
    return {
      photo: "sports" as PhotoName,
      label: "A SPORTING MOMENT",
      title: "Right in the moment.",
    };
  if (normalized.includes("zee"))
    return {
      photo: "culture" as PhotoName,
      label: "STORIES, LANGUAGE & CULTURE",
      title: "A story worth sharing.",
    };
  if (normalized.includes("youtube"))
    return {
      photo: "app-editorial" as PhotoName,
      label: "ONLINE VIDEO & DISCOVERY",
      title: "A new way to see it.",
    };
  return {
    photo: "entertainment" as PhotoName,
    label: "ENTERTAINMENT & STREAMING",
    title: "Their next viewing moment.",
  };
}

/** A manually staged original illustration. It never masquerades as video playback. */
export function FormatPreview({ kind = "" }: { kind?: string } = {}) {
  const [showAd, setShowAd] = useState(false);
  const reduceMotion = useReducedMotion();
  const context = contextForKind(kind);
  return (
    <div
      className={`format-preview v3-format-preview v4-format-preview ${showAd ? "preview-playing" : ""}`}
      data-show-ad={showAd}
    >
      <div className="format-preview-topline">
        <span>{context.label}</span>
        <span>PLACEMENT STUDY / 01</span>
      </div>
      <div className="format-cinema">
        <motion.div
          className="format-view"
          initial={false}
          animate={{
            scale: showAd && !reduceMotion ? 1.07 : 1,
            x: showAd && !reduceMotion ? -12 : 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          <Photo
            name={context.photo}
            alt="Original fictional content image used to demonstrate an advertising context"
          />
          <div className="format-content-copy">
            <span>ORIGINAL ILLUSTRATIVE CONTENT</span>
            <h3>{context.title}</h3>
          </div>
        </motion.div>
        <motion.div
          className="format-campaign-layer"
          aria-hidden={!showAd}
          inert={!showAd}
          initial={false}
          animate={{
            clipPath: showAd ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)",
            x: showAd || reduceMotion ? 0 : 28,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          <Campaign />
          <span className="format-break-label">AD BREAK / SAMPLE CAMPAIGN</span>
        </motion.div>
        <div className="format-view-label">
          <span>{showAd ? "Advertisement" : "Viewing context"}</span>
          <span>Not an official platform interface</span>
        </div>
      </div>
      <div className="format-timeline" aria-hidden="true">
        <span className={!showAd ? "is-active" : ""}>Content</span>
        <span className={showAd ? "is-active" : ""}>Ad placement</span>
        <span>Return to content</span>
      </div>
      <div className="preview-control">
        <button
          type="button"
          className="placement-preview-action"
          aria-label={
            showAd
              ? "Return to content illustration"
              : "Show ad placement illustration"
          }
          aria-pressed={showAd}
          onClick={() => setShowAd((value) => !value)}
        >
          {showAd ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          <span>
            {showAd ? "Return to the content" : "Show the ad placement"}
          </span>
        </button>
        <small aria-live="polite" aria-atomic="true">
          {showAd ? "Advertisement illustration" : "Content illustration"} · not
          playback
        </small>
      </div>
      <p className="format-placement-note">
        Original campaign artwork in a conceptual placement. Actual
        availability, dimensions and requirements are confirmed for the selected
        platform.
      </p>
    </div>
  );
}
