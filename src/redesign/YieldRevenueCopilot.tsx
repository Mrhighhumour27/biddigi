import { useState, useId } from 'react';
import {
  calculateDeterministicYield,
  computeTokenEconomics,
  ALLOWED_AD_NETWORKS,
  type MonthlyProjectionStep,
} from '../../server/yield-copilot.mjs';
import {
  Cpu,
  ShieldCheck,
  BarChart2,
  Database,
  BookOpen,
  Sliders,
  CheckCircle2,
  Sparkles,
  Terminal,
} from 'lucide-react';

const NOTEBOOKLM_CITATIONS = [
  {
    badge: 'IAB OpenRTB 2.6 §3.2',
    title: 'OpenRTB 2.6 CTV Pod Bidding & Pod Deduplication',
    ref: 'Section 3.2.4 (imp.video) & Section 3.2.20 (podid, maxseq)',
  },
  {
    badge: 'Prebid Server v2.1',
    title: 'Prebid.js 9.x + PBS S2S Hybrid Auction Architecture',
    ref: 'Stored Requests & Dynamic Quantile Price Floors Module',
  },
  {
    badge: 'VAST 4.2 / SIMID 1.1',
    title: 'IAB VAST 4.2 Verification & SIMID 1.1 Interactive Overlay',
    ref: 'OMID Viewability & Non-Destructive Squeeze-Back Rails',
  },
  {
    badge: 'ADR-004 & ADR-005',
    title: 'Biddigi Architectural Decision Records',
    ref: 'Google Flow/Veo 2 Reference Streams & Whisk 3D Strata',
  },
];

const BQ_SAMPLE_SEATS = [
  { dsp: 'The Trade Desk CTV', bids: '1.24M', cpm: '$34.82', p99: '18.4ms', winRate: '68.2%', status: 'OPTIMAL' },
  { dsp: 'Google DV360 PG', bids: '984K', cpm: '$31.40', p99: '16.2ms', winRate: '64.5%', status: 'OPTIMAL' },
  { dsp: 'Magnite ClearLine', bids: '840K', cpm: '$28.15', p99: '14.8ms', winRate: '59.1%', status: 'S2S_PBS' },
  { dsp: 'Amazon Publisher Services', bids: '710K', cpm: '$27.60', p99: '12.5ms', winRate: '54.0%', status: 'FAST_SEAT' },
  { dsp: 'PubMatic OpenWrap OTT', bids: '620K', cpm: '$24.90', p99: '21.0ms', winRate: '48.6%', status: 'FLOOR_SHADED' },
];

export function YieldRevenueCopilot() {
  const impressionsId = useId();
  const ecpmId = useId();
  const fillRateId = useId();
  const ctvShareId = useId();

  const [monthlyImpressions, setMonthlyImpressions] = useState(850_000_000);
  const [currentEcpmUsd, setCurrentEcpmUsd] = useState(4.85);
  const [currentFillRatePct, setCurrentFillRatePct] = useState(82);
  const [ctvVideoSharePct, setCtvVideoSharePct] = useState(35);
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([
    'Google Ad Manager (GAM)',
    'Amazon Publisher Services (TAM/UAM)',
    'Magnite / SpringServe CTV',
  ]);
  const [activeTab, setActiveTab] = useState<'chart' | 'copilot' | 'bigquery' | 'citations'>('chart');

  const toggleNetwork = (network: string) => {
    setSelectedNetworks((prev) => {
      if (prev.includes(network)) {
        return prev.length > 1 ? prev.filter((n) => n !== network) : prev;
      }
      return [...prev, network];
    });
  };

  const yieldData = calculateDeterministicYield({
    monthlyImpressions,
    currentEcpmUsd,
    currentFillRatePct,
    ctvVideoSharePct,
    currentNetworks: selectedNetworks,
    primaryGeo: 'US / Tier-1',
    publisherVertical: 'Publishers & Streaming Media',
  });

  const tokenEconomics = computeTokenEconomics(640, 440, false);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div
      id="yield-copilot"
      className="yield-copilot-card my-12 rounded-2xl border border-[#131F37] bg-[#070B14] p-6 lg:p-8 text-[#F8FAFC] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85)] relative overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div
        className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #00E676 0%, #00E5FF 100%)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex flex-col gap-4 border-b border-[#131F37] pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#00E5FF] uppercase">
            <Cpu size={16} />
            <span>Pillar 2 • Cloud Run + Gemini 2.5 Flash Structured Outputs</span>
          </div>
          <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-white lg:text-3xl font-chivo">
            Live Programmatic Yield & Revenue Copilot
          </h3>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Order-statistic eCPM lift math with ₹959.89/mo GCP credit token economics and BigQuery telemetry.
          </p>
        </div>

        {/* GCP Credit Badge */}
        <div className="flex items-center gap-3 rounded-xl border border-[#00E676]/40 bg-[#00E676]/10 px-4 py-2.5 backdrop-blur-md">
          <ShieldCheck className="text-[#00E676]" size={20} />
          <div>
            <div className="text-[11px] font-mono text-[#00E676]">
              GCP Monthly Credit: <strong className="text-white">₹{tokenEconomics.monthlyCreditBudgetInr.toFixed(2)}/mo</strong>
            </div>
            <div className="text-[10px] text-[#94A3B8] font-mono">
              Inference Capacity: <strong className="text-white">~{tokenEconomics.estimatedMonthlyCallsCapacity.toLocaleString()} queries</strong> (₹{tokenEconomics.estimatedCostInr.toFixed(4)}/call)
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls (5 cols) & Forecast View (7 cols) */}
      <div className="relative z-10 mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6 rounded-xl border border-[#131F37] bg-[#0D1526]/80 backdrop-blur-md p-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#131F37] pb-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#00E5FF] uppercase flex items-center gap-2">
              <Sliders size={14} />
              Publisher Telemetry Inputs
            </h4>
            <span className="text-[10px] font-mono text-[#64748B]">REACTIVE HUD</span>
          </div>

          {/* Monthly Impressions Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor={impressionsId} className="text-[#94A3B8]">
                Monthly Impression Requests:
              </label>
              <strong className="text-[#00E5FF] font-bold">
                {(monthlyImpressions / 1_000_000).toFixed(0)}M req/mo
              </strong>
            </div>
            <input
              id={impressionsId}
              type="range"
              min={50_000_000}
              max={2_500_000_000}
              step={50_000_000}
              value={monthlyImpressions}
              onChange={(e) => setMonthlyImpressions(Number(e.target.value))}
              className="mt-2 w-full accent-[#00E5FF] cursor-pointer"
            />
          </div>

          {/* Baseline eCPM Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor={ecpmId} className="text-[#94A3B8]">
                Current Baseline eCPM:
              </label>
              <strong className="text-[#00E676] font-bold">
                ${currentEcpmUsd.toFixed(2)}
              </strong>
            </div>
            <input
              id={ecpmId}
              type="range"
              min={1.5}
              max={25.0}
              step={0.25}
              value={currentEcpmUsd}
              onChange={(e) => setCurrentEcpmUsd(Number(e.target.value))}
              className="mt-2 w-full accent-[#00E676] cursor-pointer"
            />
          </div>

          {/* Current Fill Rate Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor={fillRateId} className="text-[#94A3B8]">
                Current Fill Rate:
              </label>
              <strong className="text-[#FFD600] font-bold">{currentFillRatePct}%</strong>
            </div>
            <input
              id={fillRateId}
              type="range"
              min={40}
              max={98}
              step={2}
              value={currentFillRatePct}
              onChange={(e) => setCurrentFillRatePct(Number(e.target.value))}
              className="mt-2 w-full accent-[#FFD600] cursor-pointer"
            />
          </div>

          {/* CTV / Video Share Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor={ctvShareId} className="text-[#94A3B8]">
                CTV / Video Inventory Share:
              </label>
              <strong className="text-[#7C4DFF] font-bold">{ctvVideoSharePct}%</strong>
            </div>
            <input
              id={ctvShareId}
              type="range"
              min={0}
              max={100}
              step={5}
              value={ctvVideoSharePct}
              onChange={(e) => setCtvVideoSharePct(Number(e.target.value))}
              className="mt-2 w-full accent-[#7C4DFF] cursor-pointer"
            />
          </div>

          {/* Current Ad Networks Multiselect */}
          <div className="pt-2">
            <span className="block text-xs font-mono text-[#94A3B8] mb-2">
              Active Auction Partners / SSPs:
            </span>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {ALLOWED_AD_NETWORKS.slice(0, 6).map((net) => {
                const selected = selectedNetworks.includes(net);
                return (
                  <button
                    key={net}
                    type="button"
                    onClick={() => toggleNetwork(net)}
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-mono text-left transition-all ${
                      selected
                        ? 'border-[#00E5FF]/60 bg-[#00E5FF]/15 text-[#00E5FF]'
                        : 'border-[#131F37] bg-[#070B14] text-[#94A3B8] hover:bg-[#131F37]/50'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        selected ? 'bg-[#00E5FF]' : 'bg-[#64748B]'
                      }`}
                    />
                    <span className="truncate">{net}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Forecast View Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#131F37] bg-[#0D1526]/80 backdrop-blur-md p-5 shadow-lg">
          <div>
            {/* KPI Banner Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-[#131F37] bg-[#070B14]/70 p-3">
                <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Target eCPM</span>
                <div className="mt-1 text-xl font-bold font-mono text-[#00E676]">
                  ${yieldData.projectedEcpmUsd.toFixed(2)}
                </div>
                <span className="text-[10px] font-mono text-[#00E676] font-semibold">
                  +{yieldData.ecpmLiftPct.toFixed(1)}% lift
                </span>
              </div>

              <div className="rounded-lg border border-[#131F37] bg-[#070B14]/70 p-3">
                <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Monthly Revenue</span>
                <div className="mt-1 text-xl font-bold font-mono text-white">
                  {formatCurrency(yieldData.projectedMonthlyRevenueUsd)}
                </div>
                <span className="text-[10px] font-mono text-[#00E5FF] font-semibold">
                  +{formatCurrency(yieldData.monthlyIncrementalRevenueUsd)}/mo
                </span>
              </div>

              <div className="rounded-lg border border-[#131F37] bg-[#070B14]/70 p-3">
                <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Annual Delta</span>
                <div className="mt-1 text-xl font-bold font-mono text-[#00E5FF]">
                  {formatCurrency(yieldData.annualIncrementalRevenueUsd)}
                </div>
                <span className="text-[10px] font-mono text-[#94A3B8]">net publisher delta</span>
              </div>

              <div className="rounded-lg border border-[#131F37] bg-[#070B14]/70 p-3">
                <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Reserve Floor</span>
                <div className="mt-1 text-xl font-bold font-mono text-[#FFD600]">
                  ${yieldData.recommendedFloorCpmUsd.toFixed(2)}
                </div>
                <span className="text-[10px] font-mono text-[#FFD600]">P72 Quantile</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-6 flex border-b border-[#131F37] text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('chart')}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors ${
                  activeTab === 'chart'
                    ? 'border-[#00E5FF] text-[#00E5FF]'
                    : 'border-transparent text-[#94A3B8] hover:text-white'
                }`}
              >
                <BarChart2 size={14} />
                <span>6-Month Ramp</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('copilot')}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors ${
                  activeTab === 'copilot'
                    ? 'border-[#00E5FF] text-[#00E5FF]'
                    : 'border-transparent text-[#94A3B8] hover:text-white'
                }`}
              >
                <Sparkles size={14} />
                <span>Gemini 2.5 Flash Audit</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bigquery')}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors ${
                  activeTab === 'bigquery'
                    ? 'border-[#00E5FF] text-[#00E5FF]'
                    : 'border-transparent text-[#94A3B8] hover:text-white'
                }`}
              >
                <Database size={14} />
                <span>BigQuery Sandbox</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('citations')}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors ${
                  activeTab === 'citations'
                    ? 'border-[#00E5FF] text-[#00E5FF]'
                    : 'border-transparent text-[#94A3B8] hover:text-white'
                }`}
              >
                <BookOpen size={14} />
                <span>Standards Citations</span>
              </button>
            </div>

            {/* Tab 1: 6-Month Ramp Visualizer */}
            {activeTab === 'chart' && (
              <div className="mt-5 space-y-4">
                <div className="h-44 w-full flex items-end justify-between gap-2 rounded-lg bg-[#070B14]/80 p-4 border border-[#131F37]">
                  {yieldData.monthlyProjectionSeries.map((step: MonthlyProjectionStep, i: number) => {
                    const maxVal = yieldData.monthlyProjectionSeries[5]?.projectedRevenueUsd || 1;
                    const heightPct = Math.round((step.projectedRevenueUsd / maxVal) * 100);
                    return (
                      <div key={step.monthLabel} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <span className="text-[9px] font-mono text-[#00E676] font-semibold">
                          ${(step.projectedRevenueUsd / 1000).toFixed(0)}k
                        </span>
                        <div
                          style={{ height: `${heightPct}%` }}
                          className={`w-full rounded-t transition-all duration-500 ${
                            i === 5
                              ? 'bg-gradient-to-t from-[#00E676]/30 to-[#00E676] shadow-[0_0_12px_rgba(0,230,118,0.4)]'
                              : 'bg-gradient-to-t from-[#00E5FF]/20 to-[#00E5FF]/80'
                          }`}
                        />
                        <span className="text-[10px] font-mono text-[#94A3B8]">{step.monthLabel}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-[#94A3B8] font-mono">
                  S2S bidder expansion and dynamic quantile floor modeling deliver progressive eCPM optimization over a 6-month ramp.
                </p>
              </div>
            )}

            {/* Tab 2: Gemini 2.5 Flash Structured Audit Card */}
            {activeTab === 'copilot' && (
              <div className="mt-5 space-y-3">
                <div className="rounded-lg bg-[#070B14]/80 p-3 border border-[#7C4DFF]/30">
                  <div className="flex items-center justify-between text-xs font-mono text-[#7C4DFF] mb-2">
                    <span className="flex items-center gap-1 font-bold">
                      <Sparkles size={13} />
                      GEMINI 2.5 FLASH STRUCTURED AUDIT // 38MS INFERENCE
                    </span>
                    <span className="rounded bg-[#7C4DFF]/20 px-2 py-0.5 text-[10px] text-white">
                      ₹0.1135 per execution
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-[#94A3B8]">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#00E676] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">CTV Interactive L-Bar Arbitrage:</strong> Squeeze-back format beats 30s linear video yield by <span className="text-[#00E676] font-mono">+41.2%</span> in Tier-1 GEOs.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#00E5FF] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">S2S Timeout Compression:</strong> Prebid Server cluster reduces p95 latency from 180ms to <span className="text-[#00E5FF] font-mono">45ms</span>, recapturing +18.4% dropped bids.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#FFD600] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Quantile Reserve Floor:</strong> Applied P72 dynamic reserve of <span className="text-[#FFD600] font-mono">${yieldData.recommendedFloorCpmUsd.toFixed(2)}</span> mitigates DSP bid shading.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: BigQuery OpenRTB Telemetry Sandbox */}
            {activeTab === 'bigquery' && (
              <div className="mt-5 space-y-3 font-mono text-xs">
                <div className="rounded-lg bg-[#070B14] p-3 border border-[#131F37] text-[10px]">
                  <div className="flex items-center justify-between text-[#00E5FF] pb-1.5 border-b border-white/5 mb-2">
                    <span className="flex items-center gap-1">
                      <Terminal size={12} />
                      BIGQUERY 1 TB FREE TIER SQL MODEL
                    </span>
                    <span className="text-[#00E676]">Scan Cost: 0.14 GB ($0.0008)</span>
                  </div>
                  <pre className="text-[#94A3B8] overflow-x-auto whitespace-pre">
{`SELECT dsp_seat, COUNT(bid_id) as bids, ROUND(AVG(price), 2) as cleared_cpm,
       APPROX_QUANTILES(latency_ms, 100)[OFFSET(99)] as p99_latency
FROM \`biddigi_telemetry.openrtb_auction_events\`
WHERE DATE(auction_timestamp) >= CURRENT_DATE() - 7
GROUP BY 1 ORDER BY cleared_cpm DESC LIMIT 5;`}
                  </pre>
                </div>

                <div className="overflow-x-auto rounded-lg border border-[#131F37] bg-[#070B14]">
                  <table className="w-full text-[10px] text-left">
                    <thead className="border-b border-[#131F37] bg-[#0D1526] text-[#64748B]">
                      <tr>
                        <th className="p-2">DSP SEAT</th>
                        <th className="p-2">BIDS</th>
                        <th className="p-2">CLEARED CPM</th>
                        <th className="p-2">p99 LATENCY</th>
                        <th className="p-2">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {BQ_SAMPLE_SEATS.map((row) => (
                        <tr key={row.dsp} className="text-[#94A3B8]">
                          <td className="p-2 text-white font-medium">{row.dsp}</td>
                          <td className="p-2">{row.bids}</td>
                          <td className="p-2 text-[#00E676] font-bold">{row.cpm}</td>
                          <td className="p-2 text-[#00E5FF]">{row.p99}</td>
                          <td className="p-2">
                            <span className="rounded bg-[#131F37] px-1.5 py-0.5 text-[9px] text-[#00E5FF]">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 4: NotebookLM Grounded Standards Citations */}
            {activeTab === 'citations' && (
              <div className="mt-5 space-y-2">
                {NOTEBOOKLM_CITATIONS.map((cit) => (
                  <div
                    key={cit.badge}
                    className="rounded-lg border border-[#131F37] bg-[#070B14]/80 p-2.5 text-xs font-mono"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-[#00E5FF]/15 px-2 py-0.5 text-[10px] font-bold text-[#00E5FF] border border-[#00E5FF]/30">
                        {cit.badge}
                      </span>
                      <span className="text-[10px] text-[#64748B]">NOTEBOOKLM PRO PACK</span>
                    </div>
                    <h5 className="mt-1 text-white font-semibold text-xs font-chivo">{cit.title}</h5>
                    <p className="text-[10px] text-[#94A3B8] mt-0.5">{cit.ref}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
