import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Pause, Play, RotateCcw } from "lucide-react";
import { MediaPhoto } from "./MediaHero";

const stages = [
  {
    name: "Content",
    title: "Your audience starts the story.",
    text: "A publisher brings the content, the property and the audience. The advertisement has a defined place alongside it.",
  },
  {
    name: "Placement",
    title: "Make room for the right opportunity.",
    text: "We review the format, integration and commercial scope around your property. The content stays at the centre.",
  },
  {
    name: "Demand",
    title: "Connect the eligible buyers.",
    text: "Buyer responses meet the configured auction. These response slips explain the mechanism; they are illustrative, not live bids.",
  },
  {
    name: "Ad served",
    title: "An impression, connected.",
    text: "The selected creative fills the placement. Reporting helps you understand delivery and decide what to improve next.",
  },
];
const positions = [0, 0.32, 0.57, 1];
const duration = 6400;

/** One clock drives the entire cutaway, including pause and visibility recovery. */
export function SignalHero() {
  const root = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const [stage, setStage] = useState(0);
  const [mode, setMode] = useState<"paused" | "playing" | "complete">(
    "playing",
  );
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [compact, setCompact] = useState(false);
  const manualTarget = useRef<number | null>(null);
  const manualStart = useRef(0);
  const [manualCycle, setManualCycle] = useState(0);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let active = true;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const size = matchMedia("(max-width: 900px)");
    const preferences = () => {
      setCompact(size.matches);
      setReduced(media.matches);
      if (media.matches) {
        progress.set(1);
        elapsed.current = duration;
        manualTarget.current = null;
        setStage(3);
        setMode("complete");
      }
    };
    const visibility = () => setHidden(document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.18);
      },
      { threshold: [0.18] },
    );
    observer.observe(element.querySelector(".signal-theatre") ?? element);
    preferences();
    visibility();
    media.addEventListener("change", preferences);
    size.addEventListener("change", preferences);
    document.addEventListener("visibilitychange", visibility);
    Promise.allSettled(
      [
        ...element.querySelectorAll<HTMLImageElement>('img[loading="eager"]'),
      ].map((img) => img.decode()),
    ).then(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
      observer.disconnect();
      media.removeEventListener("change", preferences);
      size.removeEventListener("change", preferences);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [progress]);
  const running = mode === "playing" && visible && !hidden && ready && !reduced;
  useEffect(() => {
    if (
      (!running && manualTarget.current === null) ||
      reduced ||
      hidden ||
      !visible
    )
      return;
    if (manualTarget.current !== null) manualStart.current = progress.get();
    let frame = 0;
    let previous: number | null = null;
    let manualTime = 0;
    function advance(now: number) {
      const delta = previous === null ? 0 : Math.min(now - previous, 64);
      previous = now;
      if (manualTarget.current !== null) {
        manualTime += delta;
        const t = Math.min(1, manualTime / 720);
        const eased = 1 - Math.pow(1 - t, 4);
        progress.set(
          manualStart.current +
            (manualTarget.current - manualStart.current) * eased,
        );
        if (t >= 1) {
          elapsed.current = manualTarget.current * duration;
          manualTarget.current = null;
          return;
        }
      } else {
        elapsed.current += delta;
        const p = Math.min(1, elapsed.current / duration);
        progress.set(p);
        setStage(p < 0.2 ? 0 : p < 0.46 ? 1 : p < 0.77 ? 2 : 3);
        if (p >= 1) {
          setMode("complete");
          return;
        }
      }
      frame = requestAnimationFrame(advance);
    }
    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [running, manualCycle, hidden, visible, reduced, progress]);

  function selectStage(index: number) {
    setMode("paused");
    setStage(index);
    if (reduced) {
      progress.set(positions[index]);
      return;
    }
    manualStart.current = progress.get();
    manualTarget.current = positions[index];
    setManualCycle((value) => value + 1);
  }
  function play(replay = false) {
    manualTarget.current = null;
    elapsed.current = progress.get() * duration;
    if (replay || mode === "complete") {
      elapsed.current = 0;
      progress.set(0);
      setStage(0);
    }
    setMode("playing");
    setManualCycle((value) => value + 1);
  }
  const rotateX = useTransform(
    progress,
    [0, 0.16, 0.65, 1],
    [0, compact ? 0 : 9, compact ? 0 : 9, 0],
  );
  const rotateY = useTransform(
    progress,
    [0, 0.16, 0.65, 1],
    [0, compact ? 0 : -17, compact ? 0 : -17, 0],
  );
  const publicationX = useTransform(
    progress,
    [0, 0.2, 0.45, 0.7, 1],
    [0, 0, compact ? 0 : -80, compact ? 0 : -80, 0],
  );
  const publicationScale = useTransform(
    progress,
    [0, 0.2, 0.45, 0.7, 1],
    [1, 1, compact ? 1 : 0.8, compact ? 1 : 0.8, 1],
  );
  const slotX = useTransform(
    progress,
    [0, 0.15, 0.34, 0.67, 1],
    [0, 0, compact ? 0 : 26, compact ? 0 : 26, 0],
  );
  const slotY = useTransform(
    progress,
    [0, 0.15, 0.34, 0.67, 1],
    [0, 0, compact ? -30 : -24, compact ? -30 : -24, 0],
  );
  const slotZ = useTransform(
    progress,
    [0, 0.15, 0.34, 0.67, 1],
    [0, 0, compact ? 0 : 130, compact ? 0 : 130, 0],
  );
  const demandOpacity = useTransform(
    progress,
    [0, 0.38, 0.48, 0.69, 0.88, 1],
    [0, 0, 1, 1, 0, 0],
  );
  const demandX = useTransform(
    progress,
    [0, 0.38, 0.52, 0.7, 0.88, 1],
    [30, 30, 0, 0, -20, -20],
  );
  const lineScale = useTransform(
    progress,
    [0, 0.35, 0.58, 0.78, 1],
    [0, 0, 1, 1, 0],
  );
  const creativeScale = useTransform(
    progress,
    [0, 0.21, 0.37, 0.6, 0.78, 1],
    [1, 1, 0.88, 0.88, 1, 1],
  );
  const creativeX = useTransform(
    progress,
    [0, 0.21, 0.37, 0.6, 0.78, 1],
    [0, 0, compact ? -8 : -24, compact ? -8 : -24, 0, 0],
  );
  return (
    <section
      className="signal-hero"
      ref={root}
      data-stage={stage}
      data-running={running}
      data-motion={reduced ? "reduced" : mode}
    >
      <div className="signal-hero-top container">
        <span>
          <i /> INDEPENDENT CONTENT. CONNECTED OPPORTUNITY.
        </span>
        <span>PUBLISHER MONETIZATION / 01</span>
      </div>
      <div className="signal-hero-grid container">
        <div className="signal-copy">
          <span className="signal-kicker">
            WEB · APP · VIDEO · CONNECTED TV
          </span>
          <h1>
            Your content.
            <br />
            <em>In demand.</em>
          </h1>
          <p>
            Turn your audience into ad revenue. Biddigi connects your ad space
            with buyers and helps you build a better setup around your content.
          </p>
          <div className="hero-actions">
            <a className="button" href="/contact?role=publisher">
              Discuss my ad setup <ArrowUpRight size={18} />
            </a>
            <a className="text-link" href="#how-it-works">
              Explore the connection <ArrowDown size={17} />
            </a>
          </div>
          <div className="signal-copy-foot">
            <span>YOUR PROPERTY.</span>
            <span>YOUR NEXT OPPORTUNITY.</span>
          </div>
        </div>
        <div
          className="signal-illustration"
          aria-label="Interactive cutaway of an illustrative publisher advertisement"
        >
          <div className="signal-illustration-head">
            <span>ANATOMY OF AN IMPRESSION</span>
            <span>0{stage + 1} / 04</span>
          </div>
          <div className="signal-theatre">
            <div className="signal-grid" aria-hidden="true" />
            <span className="signal-axis axis-publisher">
              PUBLISHER
              <br />
              <b>Content & audience</b>
            </span>
            <motion.div
              className="signal-publication"
              style={{
                rotateX,
                rotateY,
                x: publicationX,
                scale: publicationScale,
              }}
            >
              <div className="signal-publication-head">
                <b>FIELDNOTES</b>
                <span>STORIES FROM THE OUTSIDE</span>
              </div>
              <div className="signal-editorial">
                <MediaPhoto
                  name="editorial"
                  alt="Original alpine landscape in the illustrative Fieldnotes publication"
                  eager
                  sizes="(max-width:900px) 85vw, 480px"
                />
                <div>
                  <span>EXPLORE / JOURNAL NO. 024</span>
                  <h3>
                    A different
                    <br />
                    point of view.
                  </h3>
                </div>
              </div>
              <div className="signal-publication-bottom">
                <div className="signal-story-lines" aria-hidden="true">
                  <b>A little further from ordinary.</b>
                  <p>
                    Independent stories for a life spent exploring. Step outside
                    the everyday.
                  </p>
                </div>
                <div className="signal-slot-ghost">
                  <span>AD PLACEMENT</span>
                  <span>
                    Defined space.
                    <br />
                    Connected demand.
                  </span>
                </div>
              </div>
              <motion.div
                className="signal-ad-plane"
                style={{ x: slotX, y: slotY, z: slotZ }}
              >
                <span className="signal-ad-top">
                  ADVERTISEMENT / ILLUSTRATIVE
                </span>
                <motion.div
                  className="signal-ad-art"
                  style={{ scale: creativeScale, x: creativeX }}
                >
                  <MediaPhoto
                    name="product"
                    alt="Finished Trail Supply shoe advertisement fitted into the publisher’s ad slot"
                    eager
                    sizes="(max-width:900px) 45vw, 250px"
                  />
                  <div>
                    <span>TRAIL SUPPLY</span>
                    <strong>
                      Leave the
                      <br />
                      ordinary.
                    </strong>
                  </div>
                </motion.div>
                <i className="signal-corner corner-tl" />
                <i className="signal-corner corner-br" />
              </motion.div>
            </motion.div>
            <motion.div
              className="signal-trace"
              aria-hidden="true"
              style={{ scaleX: lineScale }}
            >
              <i />
              <i />
            </motion.div>
            <motion.div
              className="signal-responses"
              style={{ opacity: demandOpacity, x: demandX }}
              aria-hidden="true"
            >
              <span>ELIGIBLE DEMAND / ILLUSTRATIVE</span>
              {["A", "B", "C"].map((name, i) => (
                <div key={name} className={i === 1 ? "selected" : ""}>
                  <span>BUYER {name}</span>
                  <b>{i === 1 ? "Selected response" : "Bid response"}</b>
                  <span>{i === 1 ? "↙" : "↗"}</span>
                </div>
              ))}
            </motion.div>
            <div className="signal-art-annotation">
              <span>
                <i /> Publisher content
              </span>
              <span>
                <i /> Ad placement
              </span>
            </div>
          </div>
          <div className="signal-director">
            <div>
              <span>EXPLORE THE CUTAWAY</span>
              <small>Original imagery · illustrative mechanism</small>
            </div>
            <div className="signal-playback">
              {!reduced && (
                <button
                  type="button"
                  onClick={() =>
                    mode === "playing" ? setMode("paused") : play()
                  }
                  aria-label={
                    mode === "playing"
                      ? "Pause impression sequence"
                      : "Play impression sequence"
                  }
                >
                  {mode === "playing" ? (
                    <Pause size={15} />
                  ) : (
                    <Play size={15} />
                  )}
                  <span>{mode === "playing" ? "Pause" : "Play"}</span>
                </button>
              )}
              <button
                type="button"
                disabled={reduced}
                onClick={() => play(true)}
                aria-label="Replay impression sequence"
              >
                <RotateCcw size={15} />
                <span>Replay</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="signal-story-controller container" id="how-it-works">
        <div
          className="signal-stage-buttons"
          aria-label="Impression sequence stages"
        >
          {stages.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={stage === index}
              onClick={() => selectStage(index)}
            >
              <span>0{index + 1}</span>
              <b>{item.name}</b>
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
        <div className="signal-stage-explanation">
          <span>0{stage + 1} / THE CONNECTION</span>
          <h2>{stages[stage].title}</h2>
          <p>{stages[stage].text}</p>
        </div>
      </div>
    </section>
  );
}
