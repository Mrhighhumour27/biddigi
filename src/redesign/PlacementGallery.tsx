import { useId, useRef, useState } from 'react';
import { placementExamples, type PlacementExample } from './placementExamples';

export function PlacementPoster({ platformId, eager = false }: { platformId: string; eager?: boolean }) {
  const example = placementExamples[platformId][0];
  const [failed, setFailed] = useState(false);
  return <figure className="placement-poster">
    {failed ? <a href={example.sourcePage} target="_blank" rel="noreferrer">View {example.publisher}’s placement example ↗</a> : <img src={example.poster} width={example.width} height={example.height} alt={`${example.publisher}: ${example.format} — original platform example`} loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(true)} />}
    <figcaption>{example.format} · {platformId === 'zee5' ? '2022 media kit' : 'Platform example'}</figcaption>
  </figure>;
}

function ExampleMedia({ example, eager }: { example: PlacementExample; eager: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [revision, setRevision] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  return <>
    <div className="placement-media" ref={frame} tabIndex={-1} aria-label={`${example.format} example`}>
      {failed ? <div className="placement-media-error" role="status"><p>The platform example could not be loaded.</p><button type="button" onClick={() => { setPlaying(false); setFailed(false); setRevision(revision + 1); frame.current?.focus(); }}>Retry example</button><a href={example.sourcePage} target="_blank" rel="noreferrer">View the publisher’s original ↗</a></div> : playing && example.video ? <video key={revision} src={example.video} poster={example.poster} controls autoPlay muted playsInline preload="none" aria-label={`${example.publisher} ${example.format} demonstration`} onError={() => setFailed(true)} /> : <img key={revision} src={example.poster} alt={`${example.publisher}: ${example.format}. ${example.description}`} width={example.width} height={example.height} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />}
    </div>
    {!failed && !playing && example.video && <button type="button" className="placement-play" onClick={() => setPlaying(true)}>Play {example.format.toLowerCase()} demonstration <span aria-hidden="true">▶</span></button>}
  </>;
}

export function PlacementGallery({ platformId, eager = false, compact = false }: { platformId: string; eager?: boolean; compact?: boolean }) {
  return <PlatformGallery key={platformId} platformId={platformId} eager={eager} compact={compact} />;
}

function PlatformGallery({ platformId, eager, compact }: { platformId: string; eager: boolean; compact: boolean }) {
  const examples = placementExamples[platformId];
  const [selected, setSelected] = useState(0);
  const uid = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const example = examples[selected];
  return <section className={`placement-gallery${compact ? ' placement-gallery-compact' : ''}`} aria-label={`${example.publisher} ad placement examples`}>
    <div className="placement-gallery-heading"><span className="eyebrow">INSIDE THE AD PLACEMENT</span><span>Original platform example</span></div>
    {examples.length > 1 && <div className="placement-gallery-tabs" role="tablist" aria-label={`${example.publisher} ad formats`}>{examples.map((item, index) => <button key={item.id} ref={el => { refs.current[index] = el; }} type="button" role="tab" id={`${uid}-tab-${index}`} aria-controls={`${uid}-panel`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % examples.length;
      else if (event.key === 'ArrowLeft') next = (index + examples.length - 1) % examples.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = examples.length - 1;
      else return;
      event.preventDefault(); setSelected(next); refs.current[next]?.focus();
    }}>{item.format}</button>)}</div>}
    <div id={`${uid}-panel`} role={examples.length > 1 ? 'tabpanel' : undefined} aria-labelledby={examples.length > 1 ? `${uid}-tab-${selected}` : undefined}>
      <ExampleMedia key={`${platformId}-${example.id}`} example={example} eager={eager || selected > 0} />
      <div className="placement-example-caption"><h3>{example.format}</h3><p>{example.description}</p><p className="placement-limitation">{example.limitation}</p><a href={example.sourcePage} target="_blank" rel="noreferrer">Source: {example.publisher} ↗</a>{platformId === 'zee5' && <a href={example.originalMedia} target="_blank" rel="noreferrer">Original media kit · page 19 ↗</a>}</div>
    </div>
  </section>;
}
