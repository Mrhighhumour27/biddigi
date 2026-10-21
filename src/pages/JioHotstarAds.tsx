import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, CheckCircle2, Clapperboard, FileVideo, Mail, Monitor, Pause, Play, RotateCcw, Target, Volume2, VolumeX } from 'lucide-react';

const referenceUrl = 'https://ads.hotstar.com/ad-formats/';
const mediaBase = '/media/jiohotstar/';

const formats = [
  {
    id: 'mid-roll', number: '01', name: 'Mid-roll ads', moment: 'DURING THE CONTENT',
    headline: 'Put your story in the viewing moment.',
    description: 'A non-skippable video placement within the stream. Use it to introduce a product, tell a brand story, or build consideration while viewers are watching.',
    use: 'Brand storytelling · Product launches · Consideration',
    video: 'mid-roll.mp4', poster: 'mid-roll.webp',
    specs: [['Canvas', '1920 × 1080 · 16:9'], ['File', 'MP4 · up to 500 MB'], ['Frame rate', '25 FPS'], ['Ad duration', '10–60 seconds'], ['Campaign title', 'Up to 24 characters']],
  },
  {
    id: 'pre-roll', number: '02', name: 'Pre-roll ads', moment: 'BEFORE THE CONTENT',
    headline: 'Make an impression before the show begins.',
    description: 'A non-skippable video placement before playback, with mobile and connected TV options. Lead with a clear brand message and a creative length suited to your campaign objective.',
    use: 'Brand introductions · Short messages · Campaign launches',
    video: 'pre-roll.mp4', poster: 'pre-roll.webp',
    specs: [['Canvas', '1920 × 1080 · 16:9'], ['File', 'MP4 · up to 500 MB'], ['Frame rate', '25 FPS'], ['Ad duration', 'Depends on campaign objective*'], ['Campaign title', 'Up to 24 characters']],
  },
  {
    id: 'fence', number: '03', name: 'Fence ads', moment: 'ALONGSIDE THE CONTENT',
    headline: 'Keep your brand beside the action.',
    description: 'A display placement around the content in portrait viewing. Use a concise visual and a recognizable brand to complement your video campaign.',
    use: 'Brand recall · Visual messaging · Campaign reinforcement',
    video: 'pre-roll.mp4', poster: 'pre-roll.webp',
    specs: [['Canvas', '640 × 100'], ['File', 'JPG / JPEG'], ['Maximum size', '500 KB'], ['Creative type', 'Display banner']],
  },
];

function FormatVideo({ format }: { format: typeof formats[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const visibleRef = useRef(false);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const syncPlayback = () => {
      if (visibleRef.current && !document.hidden && !userPaused.current) {
        void video.play().catch(() => setPlaying(false));
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.2 });
    observer.observe(video);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      void video.play().catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <div className="relative rounded-[2rem] border border-slate-200 bg-[#f5f6fa] p-6 sm:p-8">
      <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-500 mb-5">
        <span>FORMAT PREVIEW</span><span className="flex items-center gap-1.5"><span className={`h-1.5 w-1.5 rounded-full ${playing ? 'bg-emerald-500' : 'bg-slate-400'}`} />{playing ? 'PLAYING' : 'PAUSED'}</span>
      </div>
      <video
        ref={videoRef}
        src={`${mediaBase}${format.video}`}
        poster={`${mediaBase}${format.poster}`}
        aria-label={`${format.name} demonstration`}
        className="block w-full max-w-[260px] aspect-[798/1662] object-contain mx-auto rounded-[2rem]"
        muted={muted} loop playsInline preload="metadata"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onError={() => setFailed(true)} onLoadedData={() => setFailed(false)}
      />
      {failed && <p role="alert" className="mt-4 text-sm text-slate-600">This preview is currently unavailable. <a href={referenceUrl} target="_blank" rel="noopener noreferrer" className="underline">View the official demonstration.</a></p>}
      <div className="mt-6 flex justify-center items-center gap-2">
        <button type="button" onClick={togglePlayback} aria-label={`${playing ? 'Pause' : 'Play'} ${format.name} preview`} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 bg-white text-xs font-semibold hover:border-[#FF5C00] focus-visible:outline-2 focus-visible:outline-[#FF5C00]">
          {playing ? <Pause size={14} /> : <Play size={14} />}{playing ? 'Pause' : 'Play'}
        </button>
        <button type="button" aria-label={`Replay ${format.name} preview`} onClick={() => { if (videoRef.current) { videoRef.current.currentTime = 0; userPaused.current = false; void videoRef.current.play().catch(() => setPlaying(false)); } }} className="p-2.5 rounded-full border border-slate-200 bg-white hover:border-[#FF5C00]"><RotateCcw size={15} /></button>
        <button type="button" aria-label={`${muted ? 'Unmute' : 'Mute'} ${format.name} preview`} onClick={() => setMuted(!muted)} className="p-2.5 rounded-full border border-slate-200 bg-white hover:border-[#FF5C00]">{muted ? <VolumeX size={15} /> : <Volume2 size={15} />}</button>
      </div>
      <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-500">Official reference creative · Loops while in view</p>
      {format.id === 'fence' && <p className="mt-3 border-t border-slate-200 pt-3 text-xs leading-relaxed text-slate-500">The reference page reuses its pre-roll clip here. Fence ads use the separate display artwork specified alongside.</p>}
    </div>
  );
}

function CampaignEnquiry() {
  const [prepared, setPrepared] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['Mid-roll ads']);
  const [error, setError] = useState('');

  function prepareEnquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFormats.length) { setError('Select at least one ad format.'); return; }
    setError('');
    const values = new FormData(event.currentTarget);
    const body = [
      'Hello BidDigi, I would like a JioHotstar advertising plan.', '',
      `Name: ${values.get('name')}`, `Business email: ${values.get('email')}`, `Brand / website: ${values.get('brand')}`,
      `Formats: ${selectedFormats.join(', ')}`, `Indicative media budget: ${values.get('budget')}`,
      `Campaign brief: ${values.get('brief')}`, '', 'Please share suitable options, availability, costs, and next steps.',
    ].join('\n');
    window.location.href = `mailto:sameer@biddigi.com?subject=${encodeURIComponent('JioHotstar advertising enquiry via BidDigi')}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }

  return (
    <section id="campaign-enquiry" className="py-20 md:py-28 bg-slate-950 text-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <p className="text-xs font-mono tracking-widest text-orange-400 mb-5">YOUR NEXT CAMPAIGN STARTS HERE</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">Bring your brief.<br /><span className="font-serif italic font-normal text-orange-400">We’ll help shape the plan.</span></h2>
          <p className="text-slate-300 leading-relaxed mt-6 max-w-lg">Tell BidDigi what you want to promote, who you want to reach, and when you want to run. We’ll discuss the formats, creative requirements, and media options for your campaign.</p>
          <div className="mt-8 space-y-4 text-sm text-slate-300">
            {['A plan around your brand and campaign objective', 'Creative specifications explained before launch', 'Media costs and service scope agreed in advance'].map(text => <p key={text} className="flex items-start gap-3"><CheckCircle2 className="text-orange-400 shrink-0" size={18} />{text}</p>)}
          </div>
          <a href="mailto:sameer@biddigi.com?subject=JioHotstar%20advertising%20enquiry" className="inline-flex items-center gap-3 text-orange-300 mt-10 text-sm"><Mail size={18} />sameer@biddigi.com</a>
        </div>
        <form onSubmit={prepareEnquiry} className="rounded-3xl p-6 sm:p-8 bg-white text-slate-900 space-y-5">
          <h3 className="text-xl font-bold">Request a JioHotstar media plan</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="text-xs font-semibold">Your name<input name="name" required autoComplete="name" maxLength={100} className="mt-2 w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm" placeholder="Full name" /></label>
            <label className="text-xs font-semibold">Business email<input name="email" type="email" required autoComplete="email" maxLength={200} className="mt-2 w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm" placeholder="you@company.com" /></label>
          </div>
          <label className="block text-xs font-semibold">Brand or website<input name="brand" required maxLength={200} className="mt-2 w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm" placeholder="Your brand or website URL" /></label>
          <fieldset><legend className="text-xs font-semibold mb-3">Formats you’re interested in</legend><div className="flex flex-wrap gap-2">{formats.map(format => <label key={format.id} className="flex items-center gap-2 text-xs border border-slate-200 rounded-full px-3 py-2 cursor-pointer"><input type="checkbox" checked={selectedFormats.includes(format.name)} onChange={event => setSelectedFormats(previous => event.target.checked ? [...previous, format.name] : previous.filter(item => item !== format.name))} className="accent-[#FF5C00]" />{format.name}</label>)}</div>{error && <p role="alert" className="text-red-700 text-xs mt-2">{error}</p>}</fieldset>
          <label className="block text-xs font-semibold">Indicative media budget<select name="budget" className="mt-2 w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm"><option>I'd like guidance</option><option>Under ₹5 lakh</option><option>₹5–10 lakh</option><option>₹10–25 lakh</option><option>₹25 lakh+</option></select></label>
          <label className="block text-xs font-semibold">What would you like to achieve?<textarea name="brief" rows={3} required maxLength={1800} className="mt-2 w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm resize-y" placeholder="Objective, audience, locations, and preferred campaign dates" /></label>
          <button className="w-full flex items-center justify-center gap-2 bg-[#FF5C00] hover:bg-[#E85300] text-white rounded-full py-3.5 text-sm font-semibold">Prepare Email Enquiry<ArrowRight size={16} /></button>
          <p className="text-xs leading-relaxed text-slate-500">Opens an email draft to BidDigi. Review and send it in your email app. Budget ranges are planning inputs, not published rates or minimum spends.</p>
          {prepared && <p role="status" className="text-sm text-slate-700 rounded-xl bg-orange-50 p-4">Your email draft is ready to open. Your enquiry is sent only after you send it from your email app. If no app opened, email <a className="underline" href="mailto:sameer@biddigi.com">sameer@biddigi.com</a> with your brief.</p>}
        </form>
      </div>
    </section>
  );
}

export function JioHotstarAds() {
  useEffect(() => {
    document.title = 'JioHotstar Advertising Services & Ad Formats | BidDigi';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Plan your JioHotstar advertising campaign with BidDigi. Explore looping mid-roll, pre-roll and fence ad previews, creative specifications and campaign support.');
  }, []);

  return (
    <main>
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-24 bg-grid-pattern border-b border-slate-200">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/60 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div>
            <a href="/" className="text-xs text-slate-500 hover:text-[#FF5C00]">BidDigi / Advertising Services</a>
            <p className="text-xs font-mono font-semibold tracking-widest text-[#FF5C00] mt-8 mb-5">JIOHOTSTAR ADVERTISING, WITH BIDDIGI</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">Your brand.<br />Their next<br /><span className="font-serif italic font-normal text-[#FF5C00]">viewing moment.</span></h1>
            <p className="mt-7 text-base sm:text-lg leading-relaxed text-slate-600 max-w-xl">Advertise on JioHotstar with campaign support from BidDigi. We help turn your brief into a media plan, prepare your creative for the right placements, and support campaign setup and reporting.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3"><a href="#campaign-enquiry" className="inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-[#FF5C00] text-white rounded-full text-sm font-semibold hover:bg-[#E85300]">Plan My Campaign<ArrowRight size={16} /></a><a href="#ad-formats" className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-full border border-slate-200 bg-white text-sm font-semibold">Explore Ad Formats<ArrowDown size={16} /></a></div>
            <p className="mt-5 text-xs text-slate-500">Media planning · Creative coordination · Campaign support</p>
          </div>
          <div className="rounded-[2rem] p-7 sm:p-10 bg-slate-950 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#FF5C00]/25 rounded-full blur-3xl" />
            <div className="flex items-center justify-between relative"><span className="text-xs font-mono text-orange-300 tracking-widest">THE FORMAT LINEUP</span><Clapperboard size={23} className="text-orange-400" /></div>
            <h2 className="mt-9 text-3xl sm:text-4xl font-bold leading-tight">Three ways to<br />enter the picture.</h2>
            <div className="mt-8 divide-y divide-white/10">{formats.map(format => <a href={`#${format.id}`} key={format.id} className="group py-5 flex items-center gap-4"><span className="text-xs font-mono text-orange-300">{format.number}</span><div className="flex-1"><p className="font-semibold text-lg">{format.name}</p><p className="text-[10px] font-mono tracking-widest text-slate-400 mt-1">{format.moment}</p></div><ArrowRight size={18} className="text-slate-500 group-hover:text-orange-300 transition-colors" /></a>)}</div>
            <p className="text-xs text-slate-400 leading-relaxed mt-6">See the placements in motion. Then find the right fit for your campaign.</p>
          </div>
        </div>
      </section>

      <section id="ad-formats" className="pt-20 md:pt-24 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-3xl"><p className="text-xs font-mono font-semibold tracking-widest text-[#FF5C00] mb-4">SEE HOW YOUR AD APPEARS</p><h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">The right format.<br /><span className="font-serif italic font-normal text-[#FF5C00]">A clearer creative brief.</span></h2><p className="mt-6 text-slate-600 leading-relaxed">Explore the official placement demonstrations below. Previews start muted, loop automatically while in view, and pause when you scroll away. Playback and audio controls are available for every example.</p></div>
          {formats.map((format, index) => <article id={format.id} key={format.id} className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20 items-center py-16 md:py-24 border-b border-slate-200 scroll-mt-24">
            <div className={index % 2 ? 'lg:order-2' : ''}><FormatVideo format={format} /></div>
            <div className={index % 2 ? 'lg:order-1' : ''}>
              <p className="text-xs font-mono text-[#FF5C00] font-semibold tracking-widest mb-4">{format.number} / {format.moment}</p>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{format.name}</h3>
              <p className="text-xl sm:text-2xl text-slate-800 font-semibold leading-snug mt-4">{format.headline}</p>
              <p className="text-slate-600 leading-relaxed mt-5">{format.description}</p>
              <p className="text-xs leading-relaxed font-medium text-[#C44900] bg-orange-50 border border-orange-100 rounded-xl p-4 mt-5">Useful for: {format.use}</p>
              <h4 className="flex items-center gap-2 text-sm font-bold mt-8 mb-4"><FileVideo size={17} className="text-[#FF5C00]" />Creative checklist</h4>
              <dl className="grid sm:grid-cols-2 gap-x-7 gap-y-4">{format.specs.map(([label, value]) => <div key={label} className="border-b border-slate-100 pb-3"><dt className="text-xs text-slate-500">{label}</dt><dd className="text-sm font-semibold mt-1">{value}</dd></div>)}</dl>
              {format.id === 'pre-roll' && <p className="text-xs text-slate-500 leading-relaxed mt-4">*The official reference lists different pre-roll duration limits in its description and checklist. We’ll confirm the accepted length for your selected objective before production.</p>}
              <a href="#campaign-enquiry" className="mt-7 inline-flex items-center gap-2 text-sm text-[#C44900] font-semibold">Discuss {format.name.toLowerCase()}<ArrowRight size={16} /></a>
            </div>
          </article>)}
          <p className="py-7 text-xs text-slate-500 leading-relaxed">Format details and demonstration videos: <a href={referenceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#FF5C00]">JioHotstar Ads’ official format guide</a>. Sample creative is shown for placement illustration. Specifications, inventory, and objective eligibility are subject to platform confirmation.</p>
        </div>
      </section>

      <section id="campaign-support" className="py-20 md:py-24 bg-slate-50 border-y border-slate-200 scroll-mt-28"><div className="max-w-7xl mx-auto px-5 md:px-8">
        <p className="text-xs font-mono font-semibold tracking-widest text-[#FF5C00] mb-4">WHAT BIDDIGI DOES FOR YOU</p><h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl">From campaign brief<br /><span className="font-serif italic font-normal text-[#FF5C00]">to a plan you can act on.</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">{[
          { icon: Target, title: 'Plan the campaign', text: 'Define your objective, audience, locations, schedule, and indicative budget. We help choose a suitable format mix.' },
          { icon: Clapperboard, title: 'Prepare the creative', text: 'Check dimensions, video length, file size, and messaging. Coordinate the assets needed for platform review.' },
          { icon: Monitor, title: 'Coordinate the launch', text: 'Support campaign configuration and submission. Confirm inventory, commercial terms, and approvals before going live.' },
          { icon: Check, title: 'Review the delivery', text: 'Review available delivery and performance reports against the agreed objective, then discuss what to adjust next.' },
        ].map(({ icon: Icon, title, text }, index) => <article key={title} className="bg-white border border-slate-200 rounded-2xl p-6"><div className="flex justify-between items-center mb-7"><Icon className="text-[#FF5C00]" size={24} /><span className="font-mono text-xs text-slate-400">0{index + 1}</span></div><h3 className="font-bold text-lg mb-3">{title}</h3><p className="text-sm text-slate-600 leading-relaxed">{text}</p></article>)}</div>
      </div></section>
      <section className="py-20 md:py-24 bg-white"><div className="max-w-4xl mx-auto px-5 md:px-8"><h2 className="text-3xl sm:text-4xl font-extrabold mb-9">Before you book.</h2><div className="divide-y divide-slate-200 border-y border-slate-200">{[
        ['How much does JioHotstar advertising cost?', 'Pricing depends on the inventory, campaign objective, dates, targeting, and media volume. Share your brief for a proposal. Media spend, BidDigi’s service scope, applicable fees, and taxes should be agreed before booking.'],
        ['Can you guarantee a placement or a result?', 'Availability and creative acceptance depend on the platform. Reach, impressions, clicks, and business outcomes depend on the agreed plan and actual delivery. Any booking commitments will be stated in your proposal.'],
        ['Do I need a finished video to enquire?', 'No. Start with your brand, objective, audience, budget, and dates. We can discuss the required assets and creative coordination before you produce or adapt the final ad.'],
        ['Who handles my enquiry?', 'Your enquiry goes to BidDigi for advertising campaign services. JioHotstar is the media platform. BidDigi does not represent this page as an official JioHotstar website or claim an official partnership.'],
      ].map(([question, answer]) => <details key={question} className="py-5"><summary className="font-semibold cursor-pointer">{question}</summary><p className="mt-4 text-sm text-slate-600 leading-relaxed">{answer}</p></details>)}</div></div></section>
      <CampaignEnquiry />
      <div className="px-5 md:px-8 py-6 max-w-7xl mx-auto text-xs text-slate-500 leading-relaxed">JioHotstar and the brands shown in the demonstration videos belong to their respective owners. BidDigi provides campaign services; bookings remain subject to availability, agreed terms, and platform approval.</div>
    </main>
  );
}
