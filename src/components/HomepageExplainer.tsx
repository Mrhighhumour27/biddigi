import { ArrowRight, Globe, BarChart3, Users } from 'lucide-react';

export function HomepageExplainer() {
  return (
    <section id="how-it-works" className="py-20 md:py-24 bg-white border-b border-slate-200 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono font-semibold tracking-widest text-[#FF5C00] mb-4">WHAT BIDDIGI DOES</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">You create the content.<br /><span className="font-serif italic font-normal text-[#FF5C00]">We help turn your audience into ad revenue.</span></h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">If you run a website, app, or streaming service, the spaces where ads can appear are your ad inventory. BidDigi connects that inventory with advertising buyers and helps you manage how it is sold. Publishers earn from showing ads; advertisers pay to reach the people viewing them.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Globe, title: '1. Tell us about your property', text: 'Share your website or app, audience, traffic, and current ad setup. We review where ads could work and which integrations suit your business.' },
            { icon: Users, title: '2. Let buyers compete for your ads', text: 'After setup and approval, eligible buyers can bid for your available ad spaces. Header bidding invites multiple buyers into the auction at the same time, creating more competition.' },
            { icon: BarChart3, title: '3. Measure and improve performance', text: 'Track earnings, the number of ads shown, and the revenue each placement generates. Use these insights to adjust ad formats, pricing, and placements over time.' },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="liquid-glass-light p-7 md:p-8 bg-slate-50/60">
              <Icon className="w-7 h-7 text-[#FF5C00] mb-6" />
              <h3 className="text-xl font-bold mb-3">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
          <ArrowRight className="w-6 h-6 text-[#FF5C00] shrink-0" />
          <p className="text-sm leading-relaxed text-slate-700"><strong className="text-slate-950">A simple example:</strong> A reader opens an article on your website. Buyers compete for an available ad space, an eligible winning ad is displayed, and that impression contributes to your advertising earnings.</p>
        </div>
      </div>
    </section>
  );
}

const questions = [
  ['Who is BidDigi for?', 'BidDigi serves digital publishers looking to earn from advertising on websites, mobile apps, video content, and connected TV. We also work with advertising buyers and demand partners looking for suitable ad inventory. The right setup depends on your property, audience, and integration requirements.'],
  ['What does programmatic advertising mean?', 'It means using software to buy and sell digital ad space. When an ad space becomes available, eligible buyers can bid automatically instead of arranging every placement manually.'],
  ['What is header bidding?', 'Header bidding lets multiple advertising buyers bid for the same ad opportunity at the same time. It helps publishers compare competing bids before choosing an eligible winner, rather than asking buyers one after another.'],
  ['Can I use BidDigi with my existing ad setup?', 'Start by sharing the ad server, networks, and bidding tools you already use. We can review how a BidDigi integration would fit and explain any changes needed before you proceed.'],
  ['How much can I earn?', 'Revenue depends on your audience location, traffic quality, ad formats, viewability, buyer demand, and commercial terms. There is no fixed return for every publisher. The calculator on this page illustrates a scenario; it is not an earnings forecast or guarantee.'],
  ['What are eCPM and fill rate?', 'eCPM is your effective revenue per 1,000 ad impressions. Fill rate is the percentage of ad requests that result in an ad being served. Looking at both helps you understand how ad prices and the volume of ads shown affect your earnings.'],
  ['What do I need to get started?', 'Have your website or app link, approximate monthly traffic or ad impressions, main audience countries, and details of any existing monetization ready. Ask the team to confirm eligibility, available demand, fees, payment terms, and the integration plan for your property.'],
];

export function HomepageFAQ() {
  return (
    <section id="faq" className="py-20 md:py-24 bg-white scroll-mt-28">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <p className="text-xs font-mono font-semibold tracking-widest text-[#FF5C00] mb-4">YOUR QUESTIONS, ANSWERED</p>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">New to ad monetization?<br /><span className="font-serif italic font-normal text-[#FF5C00]">Start here.</span></h2>
        <p className="text-slate-600 leading-relaxed mb-10">You do not need to know the terminology to understand how your ad space earns money.</p>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {questions.map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className="cursor-pointer font-semibold text-base sm:text-lg focus-visible:outline-2 focus-visible:outline-[#FF5C00]">{question}</summary>
              <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
