-- =============================================================================
-- Biddigi Programmatic Auction Telemetry Schema (GCP BigQuery 1 TB Free Tier)
-- Partitioned by UTC Date + Clustered by Publisher, Placement Type, Winning DSP
-- Enforces partition filtering to guarantee < 1 TB/month query scan budget.
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS `biddigi_telemetry`
OPTIONS (
  location = 'US',
  description = 'OpenRTB 2.6/3.0 & Prebid Server high-efficiency auction telemetry warehouse'
);

CREATE TABLE IF NOT EXISTS `biddigi_telemetry.openrtb_auction_events`
(
  auction_timestamp TIMESTAMP NOT NULL OPTIONS(description = 'UTC timestamp of auction initiation'),
  auction_id STRING NOT NULL OPTIONS(description = 'UUIDv7 globally unique OpenRTB auction identifier'),
  publisher_id STRING NOT NULL OPTIONS(description = 'Normalized publisher account slug'),
  site_or_app_domain STRING NOT NULL OPTIONS(description = 'Bundle ID or domain (e.g., sports.ctv.biddigi.io)'),
  placement_type STRING NOT NULL OPTIONS(description = 'CTV_LBAR | CTV_PAUSE | CTV_MIDROLL | DISPLAY_HEADER'),
  stream_id STRING OPTIONS(description = 'Reference CTV stream ID (ctv-sports-live-01, ctv-scifi-drama-01, ctv-fin-news-01)'),
  openrtb_version STRING NOT NULL OPTIONS(description = '2.6 or 3.0'),
  device_type STRING NOT NULL OPTIONS(description = 'CTV | OTT_BOX | DESKTOP | MOBILE'),
  geo_country STRING NOT NULL OPTIONS(description = 'ISO-3166-1 alpha-3 country code'),
  configured_bidders INT64 NOT NULL OPTIONS(description = 'Total S2S + client bidders invoked'),
  responding_bidders INT64 NOT NULL OPTIONS(description = 'Bidders responding prior to timeout cutoff'),
  timed_out_bidders INT64 NOT NULL OPTIONS(description = 'Bidders truncated by auction timeout SLA'),
  auction_latency_ms INT64 NOT NULL OPTIONS(description = 'End-to-end Prebid Server + Edge auction duration in ms'),
  applied_soft_floor_cpm NUMERIC(10, 4) NOT NULL OPTIONS(description = 'Applied P55 soft floor in USD eCPM'),
  applied_hard_floor_cpm NUMERIC(10, 4) NOT NULL OPTIONS(description = 'Applied P72 dynamic hard reserve in USD eCPM'),
  highest_bid_cpm NUMERIC(10, 4) NOT NULL OPTIONS(description = 'First-order statistic Y_(N:N) gross bid in USD eCPM'),
  second_highest_bid_cpm NUMERIC(10, 4) NOT NULL OPTIONS(description = 'Second-order statistic Y_(N-1:N) bid in USD eCPM'),
  clearing_price_cpm NUMERIC(10, 4) NOT NULL OPTIONS(description = 'Final net clearing eCPM after floor & bid-shading'),
  winning_dsp_id STRING OPTIONS(description = 'Winning demand seat identifier (e.g., ttd-ctv, dv360-pg, magnite-s2s)'),
  vast_version STRING OPTIONS(description = 'VAST_4_2 or N/A'),
  simid_interactive BOOL NOT NULL OPTIONS(description = 'True if SIMID 1.1 interactive creative payload was rendered'),
  bid_vector ARRAY<STRUCT<
    dsp_id STRING,
    bid_cpm NUMERIC(10, 4),
    response_ms INT64,
    status STRING
  >> OPTIONS(description = 'Compact array of per-seat bidder telemetry to avoid expensive JOIN scans')
)
PARTITION BY DATE(auction_timestamp)
CLUSTER BY publisher_id, placement_type, winning_dsp_id
OPTIONS (
  require_partition_filter = TRUE,
  partition_expiration_days = 90,
  description = 'Partitioned & clustered OpenRTB 2.6/3.0 telemetry optimized for GCP 1 TB Free Tier'
);
