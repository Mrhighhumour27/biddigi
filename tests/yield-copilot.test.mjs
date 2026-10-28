import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateYieldCopilotInput,
  calculateDeterministicYield,
  computeTokenEconomics,
  generateYieldCopilotForecast,
  createYieldCopilotHandler,
  YIELD_COPILOT_RESPONSE_SCHEMA,
  GCP_MONTHLY_CREDIT_INR,
} from '../server/yield-copilot.mjs';

test('Yield Copilot input validation rejects out-of-bound inputs and sanitizes valid payloads', () => {
  const invalid = validateYieldCopilotInput({
    monthlyImpressions: -50,
    currentEcpmUsd: 200,
    currentFillRatePct: 5,
  });
  assert.equal(invalid.ok, false);
  assert.ok(invalid.errors.length >= 2);

  const valid = validateYieldCopilotInput({
    monthlyImpressions: 15_000_000,
    currentEcpmUsd: 3.5,
    currentFillRatePct: 82,
    ctvVideoSharePct: 40,
    currentNetworks: ['Google AdSense', 'Prebid Server (S2S)'],
  });
  assert.equal(valid.ok, true);
  assert.equal(valid.sanitized.monthlyImpressions, 15_000_000);
  assert.equal(valid.sanitized.currentEcpmUsd, 3.5);
  assert.equal(valid.sanitized.currentFillRatePct, 82);
  assert.equal(valid.sanitized.ctvVideoSharePct, 40);
});

test('calculateDeterministicYield computes accurate financial numbers with bounded lift', () => {
  const input = {
    monthlyImpressions: 20_000_000,
    currentEcpmUsd: 2.5,
    currentFillRatePct: 75,
    ctvVideoSharePct: 30,
    currentNetworks: ['Google AdSense'],
    primaryGeo: 'US / Tier-1',
    publisherVertical: 'Streaming & News',
  };

  const result = calculateDeterministicYield(input);
  assert.ok(result.ecpmLiftPct >= 18 && result.ecpmLiftPct <= 68);
  assert.ok(result.projectedEcpmUsd > result.baselineEcpmUsd);
  assert.ok(result.monthlyIncrementalRevenueUsd > 0);
  assert.equal(result.annualIncrementalRevenueUsd, result.monthlyIncrementalRevenueUsd * 12);
  assert.equal(result.monthlyProjectionSeries.length, 6);
  assert.equal(result.networkOptimizations.length, 4);
  assert.equal(result.architecturalRecommendations.length, 3);
});

test('computeTokenEconomics guarantees monthly operations within GCP credit budget', () => {
  const economics = computeTokenEconomics(640, 440, false);
  assert.equal(economics.model, 'gemini-2.5-flash');
  assert.equal(economics.monthlyCreditBudgetInr, GCP_MONTHLY_CREDIT_INR);
  assert.ok(economics.estimatedCostInr < 0.25, 'Single query cost should be under 25 paise');
  assert.ok(economics.estimatedMonthlyCallsCapacity > 5000, 'Capacity must exceed 5,000 queries per month');
});

test('generateYieldCopilotForecast returns deterministic structured fallback when API key is unset', async () => {
  const result = await generateYieldCopilotForecast({
    monthlyImpressions: 10_000_000,
    currentEcpmUsd: 2.0,
    currentFillRatePct: 80,
  });
  assert.equal(result.statusCode, 200);
  assert.equal(result.body.ok, true);
  assert.ok(result.body.forecast.projectedEcpmUsd > 2.0);
  assert.ok(result.body.tokenEconomics.estimatedMonthlyCallsCapacity > 5000);
});

test('createYieldCopilotHandler responds to /api/yield-copilot/schema and POST requests', async () => {
  const handler = createYieldCopilotHandler();

  // Test schema endpoint
  let schemaHeaders = {};
  let schemaBody = '';
  const fakeSchemaRes = {
    writeHead(status, headers) {
      schemaHeaders = headers;
    },
    end(data) {
      schemaBody = data;
    },
  };
  const handledSchema = await handler({ url: '/api/yield-copilot/schema', method: 'GET' }, fakeSchemaRes);
  assert.equal(handledSchema, true);
  const parsedSchema = JSON.parse(schemaBody);
  assert.equal(parsedSchema.ok, true);
  assert.ok(parsedSchema.schema.properties.summaryHeadline);

  // Test POST endpoint
  let postBody = '';
  const fakePostRes = {
    writeHead() {},
    end(data) {
      postBody = data;
    },
  };
  const fakePostReq = (async function* () {
    yield Buffer.from(
      JSON.stringify({
        monthlyImpressions: 12_000_000,
        currentEcpmUsd: 3.0,
      })
    );
  })();
  fakePostReq.url = '/api/yield-copilot';
  fakePostReq.method = 'POST';
  fakePostReq.setEncoding = () => {};

  const handledPost = await handler(fakePostReq, fakePostRes);
  assert.equal(handledPost, true);
  const parsedPost = JSON.parse(postBody);
  assert.equal(parsedPost.ok, true);
  assert.ok(parsedPost.forecast.projectedEcpmUsd > 3.0);
});
