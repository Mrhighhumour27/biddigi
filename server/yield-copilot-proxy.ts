import {
  YIELD_COPILOT_RESPONSE_SCHEMA,
  GCP_MONTHLY_CREDIT_INR,
  validateYieldCopilotInput,
  calculateDeterministicYield,
  computeTokenEconomics,
  generateYieldCopilotForecast,
} from './yield-copilot.mjs';

export interface YieldCopilotRequestPayload {
  monthlyImpressions: number;
  currentEcpmUsd: number;
  currentFillRatePct?: number;
  ctvVideoSharePct?: number;
  currentNetworks: string[];
  primaryGeo?: string;
  publisherVertical?: string;
}

export {
  YIELD_COPILOT_RESPONSE_SCHEMA,
  GCP_MONTHLY_CREDIT_INR,
  validateYieldCopilotInput,
  calculateDeterministicYield,
  computeTokenEconomics,
  generateYieldCopilotForecast,
};
