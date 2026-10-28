/** Gross scenario arithmetic, not a forecast. */
export function revenue(impressions: string, ecpm: string): number | null {
  if (!impressions.trim() || !ecpm.trim()) return null;
  const count = Number(impressions);
  const rate = Number(ecpm);
  if (
    !Number.isSafeInteger(count) ||
    count < 0 ||
    count > 1e12 ||
    !Number.isFinite(rate) ||
    rate < 0 ||
    rate > 10000
  )
    return null;
  return (count / 1000) * rate;
}
