import { useId, useRef, useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { PlacementGallery } from './PlacementGallery';
import { platforms } from './platforms';

/** Publisher-sourced placements; selected media and enquiry always share a platform. */
export function CampaignAtlas({ compact = false }: { compact?: boolean }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const platform = platforms[active];
  return <section className={`campaign-atlas platform-placement-atlas${compact ? ' campaign-atlas-compact' : ''}`} aria-labelledby={`${uid}-heading`}>
    <div className="atlas-intro"><div className="atlas-overline"><span>CAMPAIGN ATLAS</span><span>FIVE PLATFORMS / ORIGINAL AD EXAMPLES</span></div><div className="atlas-heading"><h2 id={`${uid}-heading`}>See where your<br /><em>campaign appears.</em></h2><p>Explore original advertising examples from each platform. Biddigi plans and executes your campaign, from the media brief to delivery review.</p></div></div>
    <div className="atlas-selector" role="tablist" aria-label="Campaign viewing platforms">{platforms.map((item, index) => <button key={item.id} ref={el => { buttons.current[index] = el; }} type="button" role="tab" id={`${uid}-tab-${index}`} aria-controls={`${uid}-panel`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => {setActive(index); window.dispatchEvent(new window.CustomEvent('biddigi:analytics',{detail:{event:'platform_selection',platform:item.id}}));}} onKeyDown={event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % platforms.length;
      else if (event.key === 'ArrowLeft') next = (index + platforms.length - 1) % platforms.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = platforms.length - 1;
      else return;
      event.preventDefault(); setActive(next); buttons.current[next]?.focus();
    }}><span className="atlas-index">0{index + 1}</span><BrandLogo brand={item.id} label={item.name} dark /></button>)}</div>
    <div className="atlas-panel" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${active}`} tabIndex={0}>
      <PlacementGallery key={platform.id} platformId={platform.id} eager={active > 0} />
      <div className="atlas-details"><span className="atlas-details-category">{platform.category}</span><h3><BrandLogo brand={platform.id} label={platform.name} hero dark /></h3><p className="atlas-proposition">{platform.tagline}</p><p>{platform.description}</p><div className="atlas-planning-note"><span>YOUR CAMPAIGN, FROM BRIEF TO DELIVERY</span><p>We execute campaigns directly across these platforms. Inventory, targeting and creative requirements are confirmed in your media plan.</p></div><div className="atlas-actions"><a className="atlas-enquire" href={`/contact?role=advertiser&platform=${encodeURIComponent(platform.id)}`}>Request a media plan ↗</a><a className="atlas-explore" href={platform.slug}><BrandLogo brand={platform.id} label={`Explore ${platform.name}`} dark /></a></div></div>
    </div>
    <p className="atlas-footnote">Publisher examples retain their original branding. They demonstrate ad placements and are not presented as Biddigi customer campaigns.</p>
  </section>;
}
