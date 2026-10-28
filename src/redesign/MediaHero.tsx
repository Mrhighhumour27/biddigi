import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Pause,
  Play,
  RotateCcw,
  ArrowDownRight,
} from "lucide-react";

export function MediaPhoto({
  name,
  alt,
  eager = false,
  sizes = "(max-width: 680px) 88vw, 620px",
  className = "",
}: {
  name: string;
  alt: string;
  eager?: boolean;
  sizes?: string;
  className?: string;
}) {
  const portrait = name === "lifestyle" || name === "app-editorial";
  const wide = ["ctv-room", "entertainment", "sports"].includes(name);
  return (
    <picture className={`media-photo ${className}`}>
      <source
        type="image/avif"
        srcSet={`/images/v3/${name}-640.avif 640w, /images/v3/${name}-1280.avif ${portrait ? "1024w" : "1280w"}`}
        sizes={sizes}
      />
      <img
        src={`/images/v3/${name}-640.webp`}
        srcSet={`/images/v3/${name}-640.webp 640w, /images/v3/${name}-1280.webp ${portrait ? "1024w" : "1280w"}`}
        sizes={sizes}
        width={portrait ? 1024 : 1536}
        height={portrait ? 1536 : wide ? 864 : 1024}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}

export function EditorialInterlude() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia(
      "(min-width: 851px) and (prefers-reduced-motion: no-preference)",
    );
    let visible = false;
    let frame = 0;
    function update() {
      frame = 0;
      if (!element) return;
      const box = element.getBoundingClientRect();
      const value = media.matches
        ? Math.max(
            -8,
            Math.min(
              8,
              (window.innerHeight / 2 - box.top - box.height / 2) / 45,
            ),
          )
        : 0;
      element.style.setProperty("--art-shift", `${value.toFixed(2)}px`);
    }
    function onScroll() {
      if (visible && !frame) frame = requestAnimationFrame(update);
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) onScroll();
    });
    observer.observe(element);
    window.addEventListener("scroll", onScroll, { passive: true });
    media.addEventListener("change", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      media.removeEventListener("change", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <section className="editorial-interlude" ref={root}>
      <div className="interlude-photo">
        <MediaPhoto
          name="lifestyle"
          alt="Original Trail Supply campaign showing a runner wearing the blue and orange trail shoes"
          sizes="(max-width:680px) 100vw, 65vw"
        />
        <span>TRAIL SUPPLY / ORIGINAL ILLUSTRATIVE CAMPAIGN</span>
      </div>
      <div className="interlude-copy">
        <span className="eyebrow">WHERE CONTENT MEETS OPPORTUNITY</span>
        <h2>
          Made to be seen.
          <br />
          Placed with
          <br />
          <em>purpose.</em>
        </h2>
        <p>
          Good advertising starts with context. We help you consider the
          placement, the audience and the experience around it.
        </p>
        <a href="/publishers" className="text-link">
          Explore a considered ad setup <ArrowUpRight size={18} />
        </a>
        <span className="interlude-marker">
          CONTENT / CREATIVE / CONNECTION
        </span>
      </div>
    </section>
  );
}

export function MediaHero() {
  const root = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [complete, setComplete] = useState(false);
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let active = true;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.25),
      { threshold: 0.25 },
    );
    observer.observe(element);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReduced = () => {
      setReduced(media.matches);
      if (media.matches) {
        elapsed.current = 4500;
        setComplete(true);
        setPhase(3);
      }
    };
    const updateHidden = () => setHidden(document.hidden);
    updateReduced();
    updateHidden();
    media.addEventListener("change", updateReduced);
    document.addEventListener("visibilitychange", updateHidden);
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
      media.removeEventListener("change", updateReduced);
      document.removeEventListener("visibilitychange", updateHidden);
    };
  }, []);
  const running =
    ready && visible && !hidden && !reduced && !paused && !complete;
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let previous: number | null = null;
    function advance(timestamp: number) {
      if (previous !== null)
        elapsed.current += Math.min(timestamp - previous, 100);
      previous = timestamp;
      const next = Math.min(3, Math.floor(elapsed.current / 1125));
      setPhase((old) => (old === next ? old : next));
      if (elapsed.current >= 4500) {
        setComplete(true);
        return;
      }
      frame = requestAnimationFrame(advance);
    }
    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [running, cycle]);
  function replay() {
    elapsed.current = 0;
    setPhase(0);
    setComplete(false);
    setPaused(false);
    setCycle((value) => value + 1);
  }
  return (
    <div
      className="media-installation"
      ref={root}
      data-phase={phase}
      data-running={running}
      data-complete={complete || reduced}
    >
      <div className="installation-topline">
        <span>THE OPPORTUNITY, IN CONTEXT.</span>
        <span>01—04 / MEDIA STUDY</span>
      </div>
      <div className="installation-stage" key={cycle}>
        <div className="installation-orbit" aria-hidden="true" />
        <div className="installation-tv">
          <MediaPhoto
            name="entertainment"
            alt="Original fictional streaming scene in a secondary video context"
            sizes="(max-width:680px) 1px, 260px"
          />
          <span>VIDEO / CTV</span>
        </div>
        <div className="installation-publication">
          <div className="installation-browser">
            <span />
            <span />
            <span />
            <small>fieldnotes.example / illustrative publisher</small>
            <ArrowUpRight size={11} />
          </div>
          <div className="installation-masthead">
            <b>Fieldnotes</b>
            <span>OUTSIDE / CULTURE / PERSPECTIVE</span>
          </div>
          <div className="installation-editorial">
            <MediaPhoto
              name="editorial"
              alt="Alpine lake and mountain photography within the sample publisher feature"
              eager
              sizes="(max-width:680px) 62vw, 390px"
            />
            <div>
              <span>THE OUTSIDE EDIT / ISSUE 024</span>
              <h3>
                Somewhere
                <br />
                beyond ordinary.
              </h3>
              <p>New places. Different perspectives.</p>
            </div>
          </div>
          <div className="installation-ad">
            <span className="installation-ad-label">
              ADVERTISEMENT / ILLUSTRATIVE CAMPAIGN
            </span>
            <MediaPhoto
              name="product"
              alt="Finished Trail Supply campaign photograph showing a blue and orange trail shoe"
              eager
              sizes="(max-width:680px) 76vw, 450px"
            />
            <div className="installation-ad-copy">
              <span>TRAIL SUPPLY</span>
              <strong>
                Leave the
                <br />
                ordinary.
              </strong>
              <span className="installation-shop">
                Explore the collection <ArrowUpRight size={11} />
              </span>
            </div>
          </div>
          <div className="installation-pagefoot">
            <span>INDEPENDENT STORIES. A CONNECTED OPPORTUNITY.</span>
            <span>01 / 24</span>
          </div>
        </div>
        <div className="installation-phone">
          <div className="installation-phonebar">
            <span>9:41</span>
            <i />
            <span>•••</span>
          </div>
          <b>Fieldnotes.</b>
          <MediaPhoto
            name="app-editorial"
            alt="Coastal cafe editorial story in the illustrative mobile app"
            sizes="(max-width:680px) 1px, 160px"
          />
          <span>DISCOVER SOMETHING DIFFERENT</span>
          <div className="installation-native">
            <MediaPhoto
              name="product"
              alt="Trail Supply native ad within the example app"
              sizes="180px"
            />
            <div>
              <span>SPONSORED</span>
              <b>
                Made for
                <br />
                the outside.
              </b>
            </div>
          </div>
          <small>DISCOVER / SAVED / YOU</small>
        </div>
        <div className="installation-annotation annotation-content">
          <ArrowDownRight size={18} />
          <span>Publisher content</span>
        </div>
        <div className="installation-annotation annotation-ad">
          <span>Ad placement</span>
          <ArrowUpRight size={19} />
        </div>
        <span className="installation-stamp">
          YOUR CONTENT.
          <br />
          CONNECTED TO
          <br />
          <b>OPPORTUNITY.</b>
        </span>
      </div>
      <div className="installation-controls">
        <span>Original imagery. Illustrative placements.</span>
        <div>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              disabled={complete}
              aria-label={
                paused ? "Resume hero animation" : "Pause hero animation"
              }
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
              <span>{paused ? "Resume" : "Pause"}</span>
            </button>
          )}
          <button
            type="button"
            onClick={replay}
            disabled={reduced}
            aria-label="Replay hero animation"
          >
            <RotateCcw size={14} />
            <span>Replay</span>
          </button>
        </div>
      </div>
    </div>
  );
}
