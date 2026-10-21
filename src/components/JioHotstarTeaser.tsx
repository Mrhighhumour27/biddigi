import { ArrowRight, Clapperboard } from 'lucide-react';

export function JioHotstarTeaser() {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="rounded-3xl bg-slate-950 text-white p-8 md:p-12 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
          <div className="flex-1">
            <p className="flex items-center gap-2 text-xs font-mono tracking-widest text-orange-300 mb-5"><Clapperboard size={17} />FOR BRANDS &amp; ADVERTISERS</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Bring your brand to <span className="font-serif italic font-normal text-orange-300">JioHotstar.</span></h2>
            <p className="text-slate-300 leading-relaxed mt-5 max-w-2xl">Explore mid-roll, pre-roll, and fence ad formats with video previews. BidDigi helps you plan the campaign, coordinate creative, and prepare for launch.</p>
          </div>
          <a href="/jiohotstar-ads" className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5C00] hover:bg-[#E85300] text-white px-6 py-4 font-semibold text-sm">Explore JioHotstar Ads<ArrowRight size={17} /></a>
        </div>
      </div>
    </section>
  );
}
