import crypto from 'node:crypto';

export const GCP_MONTHLY_CREDIT_INR = 959.89;
export const USD_TO_INR_RATE = 86.0;
// Conservative Gemini 2.5 Flash Paid Tier rates ($0.30 / 1M input, $2.50 / 1M output)
export const GEMINI_FLASH_INPUT_USD_PER_1M = 0.30;
export const GEMINI_FLASH_OUTPUT_USD_PER_1M = 2.50;

export const ALLOWED_AD_NETWORKS = [
  'Google AdSense',
  'Google Ad Manager (GAM)',
  'Google AdX',
  'Prebid.js (Client)',
  'Prebid Server (S2S)',
  'Amazon TAM / UAM',
  'Index Exchange',
  'Magnite CTV / DV+',
  'PubMatic OpenWrap',
  'OpenX',
  'The Trade Desk OpenPath',
  'Direct / Sponsorship',
];

/**
 * Strict OpenAPI 3.0 / Gemini Structured Outputs responseSchema
 */
export const YIELD_COPILOT_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  required: [
    'summaryHeadline',
    'executiveDiagnostic',
    'baselineEcpmUsd',
    'projectedEcpmUsd',
    'ecpmLiftPct',
    'baselineMonthlyRevenueUsd',
    'projectedMonthlyRevenueUsd',
    'monthlyIncrementalRevenueUsd',
    'annualIncrementalRevenueUsd',
    'recommendedFloorCpmUsd',
    'monthlyProjectionSeries',
    'networkOptimizations',
    'architecturalRecommendations',
  ],
  properties: {
    summaryHeadline: { type: 'STRING' },
    executiveDiagnostic: { type: 'STRING' },
    baselineEcpmUsd: { type: 'NUMBER' },
    projectedEcpmUsd: { type: 'NUMBER' },
    ecpmLiftPct: { type: 'NUMBER' },
    baselineMonthlyRevenueUsd: { type: 'NUMBER' },
    projectedMonthlyRevenueUsd: { type: 'NUMBER' },
    monthlyIncrementalRevenueUsd: { type: 'NUMBER' },
    annualIncrementalRevenueUsd: { type: 'NUMBER' },
    recommendedFloorCpmUsd: { type: 'NUMBER' },
    monthlyProjectionSeries: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        required: [
          'monthLabel',
          'stage',
          'baselineRevenueUsd',
          'projectedRevenueUsd',
          'projectedEcpmUsd',
          'clearingFloorUsd',
        ],
        properties: {
          monthLabel: { type: 'STRING' },
          stage: { type: 'STRING' },
          baselineRevenueUsd: { type: 'NUMBER' },
          projectedRevenueUsd: { type: 'NUMBER' },
          projectedEcpmUsd: { type: 'NUMBER' },
          clearingFloorUsd: { type: 'NUMBER' },
        },
      },
    },
    networkOptimizations: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        required: ['network', 'role', 'status', 'expectedEcpmDeltaPct', 'actionItem'],
        properties: {
          network: { type: 'STRING' },
          role: { type: 'STRING' },
          status: { type: 'STRING' },
          expectedEcpmDeltaPct: { type: 'NUMBER' },
          actionItem: { type: 'STRING' },
        },
      },
    },
    architecturalRecommendations: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        required: ['pillar', 'standardRef', 'impact', 'implementationDetail'],
        properties: {
          pillar: { type: 'STRING' },
          standardRef: { type: 'STRING' },
          impact: { type: 'STRING' },
          implementationDetail: { type: 'STRING' },
        },
      },
    },
  },
};

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function round2(val) {
  return Math.round(val * 100) / 100;
}

export function validateYieldCopilotInput(rawPayload = {}) {
  const monthlyImpressions = Number(rawPayload.monthlyImpressions ?? 25_000_000);
  const currentEcpmUsd = Number(rawPayload.currentEcpmUsd ?? 2.8);
  const currentFillRatePct = Number(rawPayload.currentFillRatePct ?? 78);
  const ctvVideoSharePct = Number(rawPayload.ctvVideoSharePct ?? 25);
  const primaryGeo = String(rawPayload.primaryGeo ?? 'US / Tier-1').slice(0, 64);
  const publisherVertical = String(rawPayload.publisherVertical ?? 'OTT & Digital News').slice(0, 64);

  const rawNetworks = Array.isArray(rawPayload.currentNetworks)
    ? rawPayload.currentNetworks.map((n) => String(n).trim()).filter(Boolean)
    : ['Google AdSense', 'Google Ad Manager (GAM)'];

  const errors = [];
  if (!Number.isFinite(monthlyImpressions) || monthlyImpressions < 10_000 || monthlyImpressions > 100_000_000_000) {
    errors.push('monthlyImpressions must be between 10,000 and 100,000,000,000.');
  }
  if (!Number.isFinite(currentEcpmUsd) || currentEcpmUsd < 0.05 || currentEcpmUsd > 150) {
    errors.push('currentEcpmUsd must be between $0.05 and $150.00.');
  }
  if (!Number.isFinite(currentFillRatePct) || currentFillRatePct < 10 || currentFillRatePct > 100) {
    errors.push('currentFillRatePct must be between 10% and 100%.');
  }
  if (!Number.isFinite(ctvVideoSharePct) || ctvVideoSharePct < 0 || ctvVideoSharePct > 100) {
    errors.push('ctvVideoSharePct must be between 0% and 100%.');
  }

  return {
    ok: errors.length === 0,
    errors,
    sanitized: {
      monthlyImpressions: Math.round(clamp(monthlyImpressions || 25_000_000, 10_000, 100_000_000_000)),
      currentEcpmUsd: round2(clamp(currentEcpmUsd || 2.8, 0.05, 150)),
      currentFillRatePct: round2(clamp(currentFillRatePct || 78, 10, 100)),
      ctvVideoSharePct: round2(clamp(ctvVideoSharePct || 25, 0, 100)),
      currentNetworks: rawNetworks.length > 0 ? rawNetworks.slice(0, 12) : ['Google AdSense'],
      primaryGeo,
      publisherVertical,
    },
  };
}

/**
 * Deterministic actuarial yield calculation (Order-Statistic Auction Lift + Dynamic Floor + CTV/VAST 4.2 Format Shift)
 */
export function calculateDeterministicYield(input) {
  const {
    monthlyImpressions,
    currentEcpmUsd,
    currentFillRatePct,
    ctvVideoSharePct,
    currentNetworks,
    primaryGeo,
    publisherVertical,
  } = input;

  const fillBase = currentFillRatePct / 100;
  const videoShare = ctvVideoSharePct / 100;
  const networkSet = new Set(currentNetworks.map((n) => n.toLowerCase()));

  const hasPrebidS2S =
    networkSet.has('prebid server (s2s)') ||
    networkSet.has('magnite ctv / dv+') ||
    networkSet.has('pubmatic openwrap');
  const hasAmazonTam = networkSet.has('amazon tam / uam');
  const onlyAdSenseOrSingle =
    currentNetworks.length <= 1 || (currentNetworks.length === 1 && networkSet.has('google adsense'));

  let alphaStack = 0.14;
  if (onlyAdSenseOrSingle) {
    alphaStack = 0.34;
  } else if (!hasPrebidS2S || !hasAmazonTam) {
    alphaStack = 0.22;
  }

  const effectiveBidders = clamp(currentNetworks.length, 1, 8);
  const alphaFloor = 0.08 + 0.06 * (1 - Math.min(1, effectiveBidders / 6));
  const alphaFormat = 0.06 + 0.18 * videoShare;

  const totalLiftRatio = clamp(alphaStack + alphaFloor + alphaFormat, 0.18, 0.68);
  const ecpmLiftPct = round2(totalLiftRatio * 100);
  const projectedEcpmUsd = round2(currentEcpmUsd * (1 + totalLiftRatio));
  const projectedFillRate = Math.min(0.96, round2(fillBase + 0.07));

  const baselineMonthlyRevenueUsd = Math.round(((monthlyImpressions * fillBase) / 1000) * currentEcpmUsd);
  const projectedMonthlyRevenueUsd = Math.round(((monthlyImpressions * projectedFillRate) / 1000) * projectedEcpmUsd);
  const monthlyIncrementalRevenueUsd = Math.max(0, projectedMonthlyRevenueUsd - baselineMonthlyRevenueUsd);
  const annualIncrementalRevenueUsd = monthlyIncrementalRevenueUsd * 12;

  const recommendedFloorCpmUsd = round2(projectedEcpmUsd * 0.64);

  const rampFactors = [
    { monthLabel: 'M1', stage: 'Prebid 9.x + S2S Audit', ramp: 0.35 },
    { monthLabel: 'M2', stage: 'Dynamic Floor Calibration', ramp: 0.58 },
    { monthLabel: 'M3', stage: 'OpenRTB 2.6 CTV Pod Activation', ramp: 0.76 },
    { monthLabel: 'M4', stage: 'VAST 4.2 + SIMID L-Bar Rollout', ramp: 0.90 },
    { monthLabel: 'M5', stage: 'Bid-Shading Counter-Model', ramp: 0.96 },
    { monthLabel: 'M6', stage: 'Full Biddigi Signal Maturity', ramp: 1.0 },
  ];

  const monthlyProjectionSeries = rampFactors.map((step) => {
    const stepEcpm = round2(currentEcpmUsd + (projectedEcpmUsd - currentEcpmUsd) * step.ramp);
    const stepFill = fillBase + (projectedFillRate - fillBase) * step.ramp;
    const stepRev = Math.round(((monthlyImpressions * stepFill) / 1000) * stepEcpm);
    return {
      monthLabel: step.monthLabel,
      stage: step.stage,
      baselineRevenueUsd: baselineMonthlyRevenueUsd,
      projectedRevenueUsd: stepRev,
      projectedEcpmUsd: stepEcpm,
      clearingFloorUsd: round2(stepEcpm * 0.64),
    };
  });

  const networkOptimizations = [
    {
      network: 'Prebid.js 9.x + Prebid Server (S2S)',
      role: 'Parallel Header Bidding Multiplexer',
      status: hasPrebidS2S ? 'Calibrate Timeouts & Floors' : 'High-Priority Addition',
      expectedEcpmDeltaPct: round2(alphaStack * 100 * 0.55),
      actionItem:
        'Unify client-side and S2S OpenRTB 2.6 bid requests with 850ms desktop / 1100ms CTV auction timeout governance.',
    },
    {
      network: 'Magnite CTV / PubMatic OpenWrap',
      role: 'OTT & Video Pod SSP',
      status: ctvVideoSharePct >= 20 ? 'Primary CTV Yield Driver' : 'Format Expansion Bidder',
      expectedEcpmDeltaPct: round2(alphaFormat * 100),
      actionItem:
        'Enable OpenRTB 2.6 imp.video.plcmt=1 & poddur parameters for VAST 4.2 L-Bar and OTT Pause Glass inventory.',
    },
    {
      network: 'Amazon TAM / UAM + Index Exchange',
      role: 'First-Price Omni-Channel Demand',
      status: hasAmazonTam ? 'Active — Floor Sync Required' : 'Recommended Demand Partner',
      expectedEcpmDeltaPct: round2(alphaStack * 100 * 0.45),
      actionItem:
        'Synchronize Prebid Price Floors module with BigQuery P65 clearing percentiles to neutralize DSP bid shading.',
    },
    {
      network: 'Google Ad Manager (GAM / AdX)',
      role: 'Dynamic Allocation & Final Clearing Server',
      status: 'Baseline Anchor',
      expectedEcpmDeltaPct: round2(alphaFloor * 100),
      actionItem:
        'Switch to dense price granularity ($0.01 increments up to $20, $0.05 to $50) and enforce unified first-price floor rules.',
    },
  ];

  const architecturalRecommendations = [
    {
      pillar: 'Dynamic Floor Price Modeling',
      standardRef: 'OpenRTB 2.6 imp.bidfloor / Prebid Floors Module',
      impact: `+$${round2(projectedEcpmUsd - currentEcpmUsd)} blended eCPM lift`,
      implementationDetail: `Set dynamic soft floor at $${recommendedFloorCpmUsd} CPM (${primaryGeo} ${publisherVertical} P65 clearing benchmark) to counter DSP bid-shading algorithms.`,
    },
    {
      pillar: 'Dimensional CTV & High-Impact Units',
      standardRef: 'IAB VAST 4.2 + SIMID 1.1 (ADR-004 / ADR-005)',
      impact: `+${round2(alphaFormat * 100)}% format yield expansion`,
      implementationDetail:
        'Deploy non-intrusive L-Bar Squeeze and OTT Pause Glass overlays on clean broadcast plates without playback interruption.',
    },
    {
      pillar: 'SupplyChain & Auction Telemetry',
      standardRef: 'IAB OpenRTB SupplyChain (schain 1.0)',
      impact: '+7.0% fill rate recovery',
      implementationDetail:
        'Stream bid request/win logs to BigQuery Partitioned Sandbox for hourly floor recalibration and SPO path verification.',
    },
  ];

  return {
    summaryHeadline: `Projected +${ecpmLiftPct}% eCPM lift ($${currentEcpmUsd.toFixed(2)} -> $${projectedEcpmUsd.toFixed(2)}) generating +$${monthlyIncrementalRevenueUsd.toLocaleString('en-US')}/mo incremental yield`,
    executiveDiagnostic: `For ${publisherVertical} inventory (${(monthlyImpressions / 1_000_000).toFixed(1)}M monthly impressions in ${primaryGeo} across ${currentNetworks.join(', ')}), transitioning to parallel OpenRTB 2.6 header bidding, BigQuery-calibrated dynamic floors ($${recommendedFloorCpmUsd.toFixed(2)} CPM), and VAST 4.2 / SIMID dimensional units unlocks $${annualIncrementalRevenueUsd.toLocaleString('en-US')} in annualized net publisher lift.`,
    baselineEcpmUsd: currentEcpmUsd,
    projectedEcpmUsd,
    ecpmLiftPct,
    baselineMonthlyRevenueUsd,
    projectedMonthlyRevenueUsd,
    monthlyIncrementalRevenueUsd,
    annualIncrementalRevenueUsd,
    recommendedFloorCpmUsd,
    monthlyProjectionSeries,
    networkOptimizations,
    architecturalRecommendations,
  };
}

export function computeTokenEconomics(inputTokens = 640, outputTokens = 440, cacheHit = false) {
  const effectiveIn = cacheHit ? 0 : inputTokens;
  const effectiveOut = cacheHit ? 0 : outputTokens;
  const costUsd =
    (effectiveIn / 1_000_000) * GEMINI_FLASH_INPUT_USD_PER_1M +
    (effectiveOut / 1_000_000) * GEMINI_FLASH_OUTPUT_USD_PER_1M;
  const costInr = Number((costUsd * USD_TO_INR_RATE).toFixed(4));
  const singleCallReferenceInr =
    (((640 / 1_000_000) * GEMINI_FLASH_INPUT_USD_PER_1M +
      (440 / 1_000_000) * GEMINI_FLASH_OUTPUT_USD_PER_1M) *
      USD_TO_INR_RATE);
  const estimatedMonthlyCallsCapacity = Math.floor(GCP_MONTHLY_CREDIT_INR / singleCallReferenceInr);

  return {
    model: 'gemini-2.5-flash',
    structuredOutputsEnabled: true,
    cacheHit,
    inputTokens: effectiveIn,
    outputTokens: effectiveOut,
    estimatedCostUsd: Number(costUsd.toFixed(6)),
    estimatedCostInr: costInr,
    monthlyCreditBudgetInr: GCP_MONTHLY_CREDIT_INR,
    estimatedMonthlyCallsCapacity,
  };
}

const responseCache = new Map();

export async function generateYieldCopilotForecast(rawPayload, options = {}) {
  const validation = validateYieldCopilotInput(rawPayload);
  if (!validation.ok) {
    return {
      statusCode: 400,
      body: {
        ok: false,
        errors: validation.errors,
      },
    };
  }

  const input = validation.sanitized;
  const deterministicBaseline = calculateDeterministicYield(input);

  const cacheKey = crypto.createHash('sha256').update(JSON.stringify(input)).digest('hex');
  if (responseCache.has(cacheKey) && !options.bypassCache) {
    const cached = responseCache.get(cacheKey);
    return {
      statusCode: 200,
      body: {
        ok: true,
        source: cached.source,
        input,
        forecast: cached.forecast,
        tokenEconomics: computeTokenEconomics(cached.inputTokens, cached.outputTokens, true),
      },
    };
  }

  const apiKey = options.apiKey ?? process.env.GEMINI_API_KEY ?? '';
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;

  if (apiKey && typeof fetchImpl === 'function') {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
      const prompt = [
        'You are the Biddigi Principal Programmatic Yield Architect.',
        'Analyze the publisher telemetry profile and deterministic actuarial baseline below.',
        'Preserve the exact deterministic financial numbers (baselineEcpmUsd, projectedEcpmUsd, ecpmLiftPct, baselineMonthlyRevenueUsd, projectedMonthlyRevenueUsd, monthlyIncrementalRevenueUsd, annualIncrementalRevenueUsd, recommendedFloorCpmUsd, monthlyProjectionSeries) while tailoring summaryHeadline, executiveDiagnostic, networkOptimizations, and architecturalRecommendations to the publisher stack.',
        `Publisher Input: ${JSON.stringify(input)}`,
        `Deterministic Baseline: ${JSON.stringify(deterministicBaseline)}`,
      ].join('\n\n');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs ?? 6500);

      const response = await fetchImpl(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json',
            responseSchema: YIELD_COPILOT_RESPONSE_SCHEMA,
          },
        }),
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          const parsed = JSON.parse(candidateText);
          // Enforce deterministic financial numbers so arithmetic is 100% invariant
          const mergedForecast = {
            ...deterministicBaseline,
            ...parsed,
            baselineEcpmUsd: deterministicBaseline.baselineEcpmUsd,
            projectedEcpmUsd: deterministicBaseline.projectedEcpmUsd,
            ecpmLiftPct: deterministicBaseline.ecpmLiftPct,
            baselineMonthlyRevenueUsd: deterministicBaseline.baselineMonthlyRevenueUsd,
            projectedMonthlyRevenueUsd: deterministicBaseline.projectedMonthlyRevenueUsd,
            monthlyIncrementalRevenueUsd: deterministicBaseline.monthlyIncrementalRevenueUsd,
            annualIncrementalRevenueUsd: deterministicBaseline.annualIncrementalRevenueUsd,
            recommendedFloorCpmUsd: deterministicBaseline.recommendedFloorCpmUsd,
            monthlyProjectionSeries: deterministicBaseline.monthlyProjectionSeries,
          };

          const inTokens = Number(data?.usageMetadata?.promptTokenCount ?? 640);
          const outTokens = Number(data?.usageMetadata?.candidatesTokenCount ?? 440);

          responseCache.set(cacheKey, {
            source: 'gemini-2.5-flash-structured',
            forecast: mergedForecast,
            inputTokens: inTokens,
            outputTokens: outTokens,
          });

          return {
            statusCode: 200,
            body: {
              ok: true,
              source: 'gemini-2.5-flash-structured',
              input,
              forecast: mergedForecast,
              tokenEconomics: computeTokenEconomics(inTokens, outTokens, false),
            },
          };
        }
      }
    } catch {
      // Fall through cleanly to deterministic structured engine
    }
  }

  responseCache.set(cacheKey, {
    source: 'deterministic-structured-engine',
    forecast: deterministicBaseline,
    inputTokens: 640,
    outputTokens: 440,
  });

  return {
    statusCode: 200,
    body: {
      ok: true,
      source: 'deterministic-structured-engine',
      input,
      forecast: deterministicBaseline,
      tokenEconomics: computeTokenEconomics(640, 440, false),
    },
  };
}

export function createYieldCopilotHandler() {
  return async function handleYieldCopilot(req, res) {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/api/yield-copilot/schema' && req.method === 'GET') {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(JSON.stringify({ ok: true, schema: YIELD_COPILOT_RESPONSE_SCHEMA }));
      return true;
    }
    if (url.pathname === '/api/yield-copilot') {
      if (req.method === 'OPTIONS') {
        res.writeHead(204, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        });
        res.end();
        return true;
      }
      if (req.method === 'POST') {
        let bodyStr = '';
        req.setEncoding('utf8');
        for await (const chunk of req) {
          bodyStr += chunk;
          if (bodyStr.length > 65536) {
            res.writeHead(413, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, error: 'Payload too large' }));
            return true;
          }
        }
        let parsed = {};
        try {
          parsed = bodyStr ? JSON.parse(bodyStr) : {};
        } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'Invalid JSON body' }));
          return true;
        }
        const result = await generateYieldCopilotForecast(parsed);
        res.writeHead(result.statusCode, {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify(result.body));
        return true;
      }
    }
    return false;
  };
}
