-- =============================================================================
-- Biddigi Dynamic Quantile Floor Price Optimizer (BigQuery SQL Model)
-- Calculates empirical order-statistic quantiles (P50, P55 Soft Floor, P72 Hard
-- Reserve Floor, P90) with Bidder Density Elasticity Adjustment.
-- =============================================================================

WITH recent_auctions AS (
  SELECT
    publisher_id,
    placement_type,
    geo_country,
    device_type,
    responding_bidders,
    auction_latency_ms,
    highest_bid_cpm,
    second_highest_bid_cpm,
    clearing_price_cpm
  FROM `biddigi_telemetry.openrtb_auction_events`
  WHERE DATE(auction_timestamp) BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()
    AND highest_bid_cpm > 0
),

quantile_aggregation AS (
  SELECT
    publisher_id,
    placement_type,
    geo_country,
    device_type,
    COUNT(*) AS sample_auctions,
    ROUND(AVG(responding_bidders), 2) AS avg_bid_density,
    ROUND(AVG(auction_latency_ms), 1) AS avg_latency_ms,
    APPROX_QUANTILES(highest_bid_cpm, 100) AS bid_percentiles,
    APPROX_QUANTILES(second_highest_bid_cpm, 100) AS second_price_percentiles,
    ROUND(AVG(clearing_price_cpm), 4) AS baseline_clearing_ecpm
  FROM recent_auctions
  GROUP BY publisher_id, placement_type, geo_country, device_type
  HAVING COUNT(*) >= 50
)

SELECT
  publisher_id,
  placement_type,
  geo_country,
  device_type,
  sample_auctions,
  avg_bid_density,
  avg_latency_ms,
  baseline_clearing_ecpm,
  ROUND(bid_percentiles[OFFSET(50)], 2) AS p50_median_bid_cpm,
  -- Soft floor set at P55 of second-highest order statistic to trigger DSP bid-shading upward
  ROUND(second_price_percentiles[OFFSET(55)], 2) AS recommended_soft_floor_cpm,
  -- Hard reserve floor set at P72 weighted by logarithmic bidder density elasticity
  ROUND(
    bid_percentiles[OFFSET(72)] * (1.0 + LEAST(0.18, LN(GREATEST(avg_bid_density, 2.0)) * 0.065)),
    2
  ) AS recommended_hard_floor_cpm,
  ROUND(bid_percentiles[OFFSET(90)], 2) AS p90_premium_pod_cpm,
  -- Projected order-statistic eCPM lift percentage
  ROUND(
    SAFE_DIVIDE(
      (bid_percentiles[OFFSET(72)] * 1.08) - baseline_clearing_ecpm,
      baseline_clearing_ecpm
    ) * 100.0,
    2
  ) AS projected_ecpm_lift_pct
FROM quantile_aggregation
ORDER BY projected_ecpm_lift_pct DESC;
