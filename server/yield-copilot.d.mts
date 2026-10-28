import type { IncomingMessage, ServerResponse } from "node:http";

export interface YieldCopilotInput {
  monthlyImpressions: number;
  currentEcpmUsd: number;
  currentFillRatePct?: number;
  ctvVideoSharePct?: number;
  currentNetworks: string[];
  primaryGeo?: string;
  publisherVertical?: string;
}

export interface MonthlyProjectionStep {
  monthLabel: string;
  stage: string;
  baselineRevenueUsd: number;
  projectedRevenueUsd: number;
  projectedEcpmUsd: number;
  clearingFloorUsd: number;
}

export interface NetworkOptimizationItem {
  network: string;
  role: string;
  status: string;
  expectedEcpmDeltaPct: number;
  actionItem: string;
}

export interface ArchitecturalRecommendationItem {
  pillar: string;
  standardRef: string;
  impact: string;
  implementationDetail: string;
}

export interface YieldCopilotForecastResult {
  summaryHeadline: string;
  executiveDiagnostic: string;
  baselineEcpmUsd: number;
  projectedEcpmUsd: number;
  ecpmLiftPct: number;
  baselineMonthlyRevenueUsd: number;
  projectedMonthlyRevenueUsd: number;
  monthlyIncrementalRevenueUsd: number;
  annualIncrementalRevenueUsd: number;
  recommendedFloorCpmUsd: number;
  monthlyProjectionSeries: MonthlyProjectionStep[];
  networkOptimizations: NetworkOptimizationItem[];
  architecturalRecommendations: ArchitecturalRecommendationItem[];
}

export interface TokenEconomicsResult {
  model: string;
  structuredOutputsEnabled: boolean;
  cacheHit: boolean;
  inputTokens: number;
  outputTokens: number;
  estimatedCostUsd: number;
  estimatedCostInr: number;
  monthlyCreditBudgetInr: number;
  estimatedMonthlyCallsCapacity: number;
}

export const GCP_MONTHLY_CREDIT_INR: number;
export const USD_TO_INR_RATE: number;
export const GEMINI_FLASH_INPUT_USD_PER_1M: number;
export const GEMINI_FLASH_OUTPUT_USD_PER_1M: number;
export const ALLOWED_AD_NETWORKS: readonly string[];
export const YIELD_COPILOT_RESPONSE_SCHEMA: Record<string, unknown>;

export function validateYieldCopilotInput(rawPayload?: Record<string, unknown>): {
  ok: boolean;
  errors: string[];
  sanitized: YieldCopilotInput;
};

export function calculateDeterministicYield(input: YieldCopilotInput): YieldCopilotForecastResult;

export function computeTokenEconomics(
  inputTokens?: number,
  outputTokens?: number,
  cacheHit?: boolean
): TokenEconomicsResult;

export function generateYieldCopilotForecast(
  rawPayload: Record<string, unknown>,
  options?: {
    apiKey?: string;
    fetchImpl?: typeof fetch;
    timeoutMs?: number;
    bypassCache?: boolean;
  }
): Promise<{
  statusCode: number;
  body: {
    ok: boolean;
    source?: string;
    input?: YieldCopilotInput;
    forecast?: YieldCopilotForecastResult;
    tokenEconomics?: TokenEconomicsResult;
    errors?: string[];
  };
}>;

export function createYieldCopilotHandler(): (
  req: IncomingMessage,
  res: ServerResponse
) => Promise<boolean>;
