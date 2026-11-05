import { NetworkBrand } from "./BrandLogo";
import { useState, useId } from 'react';
import {
  calculateDeterministicYield,
  ALLOWED_AD_NETWORKS,
  type MonthlyProjectionStep,
} from '../../server/yield-copilot.mjs';
import {
  Cpu,
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
    badge: 'Biddigi placement guide',
    title: 'How content, buyer selection and placements connect',
    ref: 'Explore the interactive examples on our publisher and OTT pages.',
  },
];

const BQ_SAMPLE_SEATS = [
  { dsp: 'Example buyer 1', bids: '1.24M', cpm: '$34.82', p99: '18.4ms', winRate: '68.2%', status: 'OPTIMAL' },
  { dsp: 'Example buyer 2', bids: '984K', cpm: '$31.40', p99: '16.2ms', winRate: '64.5%', status: 'OPTIMAL' },
  { dsp: 'Example buyer 3', bids: '840K', cpm: '$28.15', p99: '14.8ms', winRate: '59.1%', status: 'S2S_PBS' },
  { dsp: 'Example buyer 4', bids: '710K', cpm: '$27.60', p99: '12.5ms', winRate: '54.0%', status: 'FAST_SEAT' },
  { dsp: 'Example buyer 5', bids: '620K', cpm: '$24.90', p99: '21.0ms', winRate: '48.6%', status: 'FLOOR_SHADED' },
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
    'Amazon TAM / UAM',
    'Prebid Server (S2S)',
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


  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div
      id="yield-copilot"
      className="yield-copilot-card my-12 rounded-2xl border border-[#48534f] bg-[#0b1012] p-6 lg:p-8 text-[#F8FAFC] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85)] relative overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div
        className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #d9f36b 0%, #ffb47f 100%)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex flex-col gap-4 border-b border-[#48534f] pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#ffb47f] uppercase">
            <Cpu size={16} />
            <span>EXPLORE YOUR AD REVENUE</span>
          </div>
          <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-white lg:text-3xl font-chivo">
            Revenue scenario explorer
          </h3>
          <p className="mt-1 text-sm text-[#c4cdc7]">
            Adjust your traffic, pricing and fill assumptions to compare possible outcomes. Figures are illustrative, not a revenue forecast.
          </p>
        </div>

        <span className="scenario-badge">Illustrative scenario · adjustable assumptions</span>
      </div>

      {/* Main Grid: Controls (5 cols) & Forecast View (7 cols) */}
      <div className="relative z-10 mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6 rounded-xl border border-[#48534f] bg-[#182123]/80 backdrop-blur-md p-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#48534f] pb-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#ffb47f] uppercase flex items-center gap-2">
              <Sliders size={14} />
              Your assumptions
            </h4>
            <span className="text-[10px] font-mono text-[#adb9b1]">USD / MONTH</span>
          </div>

          {/* Monthly Impressions Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor={impressionsId} className="text-[#c4cdc7]">
                Monthly Impression Requests:
              </label>
              <strong className="text-[#ffb47f] font-bold">
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
              className="mt-2 w-full accent-[#ffb47f] cursor-pointer"
            />
          </div>

          {/* Baseline eCPM Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor={ecpmId} className="text-[#c4cdc7]">
                Current Baseline eCPM:
              </label>
              <strong className="text-[#d9f36b] font-bold">
                ${currentEcpmUsd.toFixed(2)}
              </strong>
            </div>
            <input
              id={ecpmId}
              type="range"
              min={1.5}
              max={25.0}
              step={0.05}
              value={currentEcpmUsd}
              onChange={(e) => setCurrentEcpmUsd(Number(e.target.value))}
              className="mt-2 w-full accent-[#d9f36b] cursor-pointer"
            />
          </div>

          {/* Current Fill Rate Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor={fillRateId} className="text-[#c4cdc7]">
                Current Fill Rate:
              </label>
              <strong className="text-[#d9f36b] font-bold">{currentFillRatePct}%</strong>
            </div>
            <input
              id={fillRateId}
              type="range"
              min={40}
              max={98}
              step={2}
              value={currentFillRatePct}
              onChange={(e) => setCurrentFillRatePct(Number(e.target.value))}
              className="mt-2 w-full accent-[#d9f36b] cursor-pointer"
            />
          </div>

          {/* CTV / Video Share Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor={ctvShareId} className="text-[#c4cdc7]">
                CTV / Video Inventory Share:
              </label>
              <strong className="text-[#ffb47f] font-bold">{ctvVideoSharePct}%</strong>
            </div>
            <input
              id={ctvShareId}
              type="range"
              min={0}
              max={100}
              step={5}
              value={ctvVideoSharePct}
              onChange={(e) => setCtvVideoSharePct(Number(e.target.value))}
              className="mt-2 w-full accent-[#ffb47f] cursor-pointer"
            />
          </div>

          {/* Current Ad Networks Multiselect */}
          <div className="pt-2">
            <span className="block text-xs font-mono text-[#c4cdc7] mb-2">
              Compare an ad setup:
            </span>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {ALLOWED_AD_NETWORKS.slice(0, 6).map((net) => {
                const selected = selectedNetworks.includes(net);
                return (
                  <button
                    key={net}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleNetwork(net)}
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-mono text-left transition-all ${
                      selected
                        ? 'border-[#ffb47f]/60 bg-[#ffb47f]/15 text-[#ffb47f]'
                        : 'border-[#48534f] bg-[#0b1012] text-[#c4cdc7] hover:bg-[#48534f]/50'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        selected ? 'bg-[#ffb47f]' : 'bg-[#adb9b1]'
                      }`}
                    />
                    <NetworkBrand name={net} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Forecast View Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#48534f] bg-[#182123]/80 backdrop-blur-md p-5 shadow-lg">
          <div>
            {/* KPI Banner Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-[#48534f] bg-[#0b1012]/70 p-3">
                <span className="text-[10px] font-mono text-[#c4cdc7] uppercase">Scenario eCPM</span>
                <div className="mt-1 text-xl font-bold font-mono text-[#d9f36b]">
                  ${yieldData.projectedEcpmUsd.toFixed(2)}
                </div>
                <span className="text-[10px] font-mono text-[#d9f36b] font-semibold">
                  +{yieldData.ecpmLiftPct.toFixed(1)}% lift
                </span>
              </div>

              <div className="rounded-lg border border-[#48534f] bg-[#0b1012]/70 p-3">
                <span className="text-[10px] font-mono text-[#c4cdc7] uppercase">Monthly Revenue</span>
                <div className="mt-1 text-xl font-bold font-mono text-white">
                  {formatCurrency(yieldData.projectedMonthlyRevenueUsd)}
                </div>
                <span className="text-[10px] font-mono text-[#ffb47f] font-semibold">
                  +{formatCurrency(yieldData.monthlyIncrementalRevenueUsd)}/mo
                </span>
              </div>

              <div className="rounded-lg border border-[#48534f] bg-[#0b1012]/70 p-3">
                <span className="text-[10px] font-mono text-[#c4cdc7] uppercase">Annual Delta</span>
                <div className="mt-1 text-xl font-bold font-mono text-[#ffb47f]">
                  {formatCurrency(yieldData.annualIncrementalRevenueUsd)}
                </div>
                <span className="text-[10px] font-mono text-[#c4cdc7]">illustrative annual increase</span>
              </div>

              <div className="rounded-lg border border-[#48534f] bg-[#0b1012]/70 p-3">
                <span className="text-[10px] font-mono text-[#c4cdc7] uppercase">Reserve Floor</span>
                <div className="mt-1 text-xl font-bold font-mono text-[#d9f36b]">
                  ${yieldData.recommendedFloorCpmUsd.toFixed(2)}
                </div>
                <span className="text-[10px] font-mono text-[#d9f36b]">P72 Quantile</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-6 flex border-b border-[#48534f] text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('chart')}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors ${
                  activeTab === 'chart'
                    ? 'border-[#ffb47f] text-[#ffb47f]'
                    : 'border-transparent text-[#c4cdc7] hover:text-white'
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
                    ? 'border-[#ffb47f] text-[#ffb47f]'
                    : 'border-transparent text-[#c4cdc7] hover:text-white'
                }`}
              >
                <Sparkles size={14} />
                <span>Scenario notes</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bigquery')}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors ${
                  activeTab === 'bigquery'
                    ? 'border-[#ffb47f] text-[#ffb47f]'
                    : 'border-transparent text-[#c4cdc7] hover:text-white'
                }`}
              >
                <Database size={14} />
                <span>Sample buyer activity</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('citations')}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors ${
                  activeTab === 'citations'
                    ? 'border-[#ffb47f] text-[#ffb47f]'
                    : 'border-transparent text-[#c4cdc7] hover:text-white'
                }`}
              >
                <BookOpen size={14} />
                <span>Technical references</span>
              </button>
            </div>

            {/* Tab 1: 6-Month Ramp Visualizer */}
            {activeTab === 'chart' && (
              <div className="mt-5 space-y-4">
                <div className="h-44 w-full flex items-end justify-between gap-2 rounded-lg bg-[#0b1012]/80 p-4 border border-[#48534f]">
                  {yieldData.monthlyProjectionSeries.map((step: MonthlyProjectionStep, i: number) => {
                    const maxVal = yieldData.monthlyProjectionSeries[5]?.projectedRevenueUsd || 1;
                    const heightPct = Math.round((step.projectedRevenueUsd / maxVal) * 100);
                    return (
                      <div key={step.monthLabel} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <span className="text-[9px] font-mono text-[#d9f36b] font-semibold">
                          ${(step.projectedRevenueUsd / 1000).toFixed(0)}k
                        </span>
                        <div
                          style={{ height: `${heightPct}%` }}
                          className={`w-full rounded-t transition-all duration-500 ${
                            i === 5
                              ? 'bg-gradient-to-t from-[#d9f36b]/30 to-[#d9f36b] shadow-[0_0_12px_rgba(0,230,118,0.4)]'
                              : 'bg-gradient-to-t from-[#ffb47f]/20 to-[#ffb47f]/80'
                          }`}
                        />
                        <span className="text-[10px] font-mono text-[#c4cdc7]">{step.monthLabel}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-[#c4cdc7] font-mono">
                  Illustrative six-month scenario based on the selected assumptions. Actual results depend on your inventory, demand and agreed fees.
                </p>
              </div>
            )}

            {/* Tab 2: Gemini 2.5 Flash Structured Audit Card */}
            {activeTab === 'copilot' && (
              <div className="mt-5 space-y-3">
                <div className="rounded-lg bg-[#0b1012]/80 p-3 border border-[#ffb47f]/30">
                  <div className="flex items-center justify-between text-xs font-mono text-[#ffb47f] mb-2">
                    <span className="flex items-center gap-1 font-bold">
                      <Sparkles size={13} />
                      ILLUSTRATIVE OPTIMIZATION NOTES
                    </span>
                    <span className="rounded bg-[#ffb47f]/20 px-2 py-0.5 text-[10px] text-white">
                      Calculated locally
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-[#c4cdc7]">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#d9f36b] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">CTV Interactive L-Bar Arbitrage:</strong> Compare optional placements against viewer experience and eligible demand.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#ffb47f] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">S2S Timeout Compression:</strong> Review timeout settings and measure their effect on buyer responses before changing your setup.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#d9f36b] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Quantile Reserve Floor:</strong> Applied P72 dynamic reserve of <span className="text-[#d9f36b] font-mono">${yieldData.recommendedFloorCpmUsd.toFixed(2)}</span> mitigates DSP bid shading.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: BigQuery OpenRTB Telemetry Sandbox */}
            {activeTab === 'bigquery' && (
              <div className="mt-5 space-y-3 font-mono text-xs">
                <div className="rounded-lg bg-[#0b1012] p-3 border border-[#48534f] text-[10px]">
                  <div className="flex items-center justify-between text-[#ffb47f] pb-1.5 border-b border-white/5 mb-2">
                    <span className="flex items-center gap-1">
                      <Terminal size={12} />
                      EXAMPLE QUERY · SYNTHETIC DATA
                    </span>
                    <span className="text-[#d9f36b]">Not connected to live telemetry</span>
                  </div>
                  <pre className="text-[#c4cdc7] overflow-x-auto whitespace-pre">
{`SELECT dsp_seat, COUNT(bid_id) as bids, ROUND(AVG(price), 2) as cleared_cpm,
       APPROX_QUANTILES(latency_ms, 100)[OFFSET(99)] as p99_latency
FROM \`biddigi_telemetry.openrtb_auction_events\`
WHERE DATE(auction_timestamp) >= CURRENT_DATE() - 7
GROUP BY 1 ORDER BY cleared_cpm DESC LIMIT 5;`}
                  </pre>
                </div>

                <div className="overflow-x-auto rounded-lg border border-[#48534f] bg-[#0b1012]">
                  <table className="w-full text-[10px] text-left">
                    <thead className="border-b border-[#48534f] bg-[#182123] text-[#adb9b1]">
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
                        <tr key={row.dsp} className="text-[#c4cdc7]">
                          <td className="p-2 text-white font-medium">{row.dsp}</td>
                          <td className="p-2">{row.bids}</td>
                          <td className="p-2 text-[#d9f36b] font-bold">{row.cpm}</td>
                          <td className="p-2 text-[#ffb47f]">{row.p99}</td>
                          <td className="p-2">
                            <span className="rounded bg-[#48534f] px-1.5 py-0.5 text-[9px] text-[#ffb47f]">
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

            {/* Tab 4: NotebookLM Grounded Technical references */}
            {activeTab === 'citations' && (
              <div className="mt-5 space-y-2">
                {NOTEBOOKLM_CITATIONS.map((cit) => (
                  <div
                    key={cit.badge}
                    className="rounded-lg border border-[#48534f] bg-[#0b1012]/80 p-2.5 text-xs font-mono"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-[#ffb47f]/15 px-2 py-0.5 text-[10px] font-bold text-[#ffb47f] border border-[#ffb47f]/30">
                        {cit.badge}
                      </span>
                      <span className="text-[10px] text-[#adb9b1]">REFERENCE NOTES</span>
                    </div>
                    <h5 className="mt-1 text-white font-semibold text-xs font-chivo">{cit.title}</h5>
                    <p className="text-[10px] text-[#c4cdc7] mt-0.5">{cit.ref}</p>
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
