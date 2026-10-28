#!/usr/bin/env node
/**
 * Deterministic OpenRTB 2.6 / 3.0 Synthetic Bidstream & Telemetry Generator
 * Generates realistic CTV (L-Bar, Pause Ad, Mid-Roll) and Header Bidding auction
 * packets for BigQuery sandbox verification and frontend telemetry visualization.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Deterministic Mulberry32 PRNG for reproducible builds
function createPrng(seed = 20250515) {
  let a = seed >>> 0;
  return function next() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = createPrng(84572025);

const STREAMS = [
  {
    streamId: 'ctv-sports-live-01',
    domain: 'live.sportsnet-ott.tv',
    placementType: 'CTV_LBAR',
    baseCpm: 26.4,
    sigma: 0.34,
    vastVersion: 'VAST_4_2',
    simidInteractive: true,
    cat: ['IAB17', 'IAB17-1'],
  },
  {
    streamId: 'ctv-scifi-drama-01',
    domain: 'cinema.nebula-stream.io',
    placementType: 'CTV_PAUSE',
    baseCpm: 22.8,
    sigma: 0.31,
    vastVersion: 'VAST_4_2',
    simidInteractive: true,
    cat: ['IAB1', 'IAB1-5'],
  },
  {
    streamId: 'ctv-fin-news-01',
    domain: 'terminal.alphadesk-tv.com',
    placementType: 'CTV_MIDROLL',
    baseCpm: 31.5,
    sigma: 0.28,
    vastVersion: 'VAST_4_2',
    simidInteractive: true,
    cat: ['IAB13', 'IAB13-1'],
  },
  {
    streamId: 'web-header-flagship-01',
    domain: 'quant-insights.biddigi.io',
    placementType: 'DISPLAY_HEADER',
    baseCpm: 8.9,
    sigma: 0.38,
    vastVersion: 'N/A',
    simidInteractive: false,
    cat: ['IAB19', 'IAB19-18'],
  },
];

const DSP_SEATS = [
  { id: 'ttd-ctv-prime', name: 'The Trade Desk CTV', meanLatency: 68 },
  { id: 'dv360-pg-live', name: 'Google DV360 Programmatic', meanLatency: 62 },
  { id: 'magnite-ctv-s2s', name: 'Magnite ClearLine S2S', meanLatency: 54 },
  { id: 'pubmatic-openwrap', name: 'PubMatic OpenWrap OTT', meanLatency: 74 },
  { id: 'index-exchange-s2s', name: 'Index Exchange Server', meanLatency: 59 },
  { id: 'freewheel-ssp-core', name: 'FreeWheel Broadcast SSP', meanLatency: 81 },
  { id: 'amazon-aps-tam', name: 'Amazon Publisher Services', meanLatency: 51 },
  { id: 'xandr-curated-ctv', name: 'Microsoft Invest / Xandr', meanLatency: 77 },
];

function sampleNormal() {
  const u1 = Math.max(1e-7, rand());
  const u2 = rand();
  return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
}

export function generateSyntheticAuctions(count = 48) {
  const events = [];
  const baseTime = Date.UTC(2025, 4, 15, 18, 30, 0);

  for (let i = 0; i < count; i++) {
    const stream = STREAMS[i % STREAMS.length];
    const timestampMs = baseTime + i * 1250;
    const configuredBidders = 8;
    const timeoutCutoffMs = 140;

    const bidVector = [];
    for (const dsp of DSP_SEATS) {
      const responseMs = Math.max(
        22,
        Math.round(dsp.meanLatency + sampleNormal() * 18)
      );
      const timedOut = responseMs > timeoutCutoffMs;
      const rawCpm =
        stream.baseCpm * Math.exp(sampleNormal() * stream.sigma - 0.08);
      const bidCpm = timedOut ? 0 : Number(rawCpm.toFixed(2));
      bidVector.push({
        dsp_id: dsp.id,
        dsp_name: dsp.name,
        bid_cpm: bidCpm,
        response_ms: responseMs,
        status: timedOut ? 'TIMEOUT_SLA' : 'VALID_BID',
      });
    }

    const validBids = bidVector
      .filter((b) => b.status === 'VALID_BID' && b.bid_cpm > 0)
      .sort((a, b) => b.bid_cpm - a.bid_cpm);

    const softFloor = Number((stream.baseCpm * 0.78).toFixed(2));
    const hardFloor = Number((stream.baseCpm * 0.94).toFixed(2));

    const highestBid = validBids[0]?.bid_cpm ?? hardFloor;
    const secondHighestBid = validBids[1]?.bid_cpm ?? softFloor;
    const clearingPrice = Number(
      Math.max(hardFloor, secondHighestBid * 1.04, highestBid * 0.93).toFixed(2)
    );
    const winningDsp = validBids[0]?.dsp_id ?? 'magnite-ctv-s2s';
    const maxValidLatency = Math.max(
      ...validBids.map((b) => b.response_ms),
      65
    );

    const auctionId = `ortb26-${(100000 + i).toString(16)}-${stream.streamId.slice(0, 8)}`;

    events.push({
      auction_timestamp: new Date(timestampMs).toISOString(),
      auction_id: auctionId,
      publisher_id: 'pub-biddigi-enterprise-01',
      site_or_app_domain: stream.domain,
      placement_type: stream.placementType,
      stream_id: stream.streamId,
      openrtb_version: i % 3 === 0 ? '3.0' : '2.6',
      device_type:
        stream.placementType === 'DISPLAY_HEADER' ? 'DESKTOP' : 'CTV',
      geo_country: 'USA',
      configured_bidders: configuredBidders,
      responding_bidders: validBids.length,
      timed_out_bidders: configuredBidders - validBids.length,
      auction_latency_ms: maxValidLatency,
      applied_soft_floor_cpm: softFloor,
      applied_hard_floor_cpm: hardFloor,
      highest_bid_cpm: highestBid,
      second_highest_bid_cpm: secondHighestBid,
      clearing_price_cpm: clearingPrice,
      winning_dsp_id: winningDsp,
      vast_version: stream.vastVersion,
      simid_interactive: stream.simidInteractive,
      bid_vector: bidVector,
      openrtb_packet_preview: {
        id: auctionId,
        imp: [
          {
            id: '1',
            bidfloor: hardFloor,
            bidfloorcur: 'USD',
            video:
              stream.placementType !== 'DISPLAY_HEADER'
                ? {
                    mimes: ['video/mp4', 'application/x-mpegURL'],
                    minduration: 15,
                    maxduration: 30,
                    protocols: [7, 8, 10],
                    w: 1920,
                    h: 1080,
                    startdelay: 0,
                    plcmt: 1,
                    api: [7, 8],
                    podid: `pod-${stream.streamId}`,
                    maxseq: 3,
                  }
                : undefined,
            ext: {
              prebid: {
                storedrequest: { id: `pbs-${stream.streamId}` },
                floors: {
                  floorRule: 'bq_quantile_p72_v3',
                  floorValue: hardFloor,
                },
              },
            },
          },
        ],
        app: {
          bundle: stream.domain,
          cat: stream.cat,
          publisher: { id: 'pub-biddigi-enterprise-01' },
        },
        device: {
          devicetype: stream.placementType === 'DISPLAY_HEADER' ? 2 : 3,
          ifa: '00000000-0000-0000-0000-000000000000',
          lmt: 0,
        },
        tmax: timeoutCutoffMs,
      },
    });
  }

  return events;
}

function main() {
  const events = generateSyntheticAuctions(48);
  const outDir = path.join(ROOT_DIR, 'public', 'data');
  fs.mkdirSync(outDir, { recursive: true });

  const byPlacement = {};
  for (const ev of events) {
    if (!byPlacement[ev.placement_type]) {
      byPlacement[ev.placement_type] = [];
    }
    byPlacement[ev.placement_type].push(ev);
  }

  const placementSummaries = Object.entries(byPlacement).map(([type, list]) => {
    const sortedHigh = [...list]
      .map((x) => x.highest_bid_cpm)
      .sort((a, b) => a - b);
    const p50 = sortedHigh[Math.floor(sortedHigh.length * 0.5)];
    const p72 = sortedHigh[Math.floor(sortedHigh.length * 0.72)];
    const p90 = sortedHigh[Math.floor(sortedHigh.length * 0.9)];
    const avgClearing =
      list.reduce((acc, x) => acc + x.clearing_price_cpm, 0) / list.length;
    const avgLatency =
      list.reduce((acc, x) => acc + x.auction_latency_ms, 0) / list.length;

    return {
      placement_type: type,
      sample_count: list.length,
      p50_cpm: Number(p50.toFixed(2)),
      p72_optimal_floor_cpm: Number(p72.toFixed(2)),
      p90_cpm: Number(p90.toFixed(2)),
      avg_clearing_cpm: Number(avgClearing.toFixed(2)),
      avg_latency_ms: Math.round(avgLatency),
    };
  });

  const payload = {
    generatedAt: '2025-05-15T18:30:00.000Z',
    schemaVersion: 'openrtb-2.6-3.0-bq-v3',
    bigQueryFreeTierStatus: {
      monthlyQueryQuotaTb: 1.0,
      estimatedScanPerRunMb: 1.42,
      monthlyRunsSupportedInFreeTier: 704225,
      partitionFilterEnforced: true,
      clusteringColumns: ['publisher_id', 'placement_type', 'winning_dsp_id'],
    },
    placementSummaries,
    sampleEvents: events.slice(0, 12),
  };

  const jsonPath = path.join(outDir, 'openrtb-sample-stream.json');
  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), 'utf8');

  const ndjsonPath = path.join(outDir, 'openrtb-telemetry-bq.ndjson');
  fs.writeFileSync(
    ndjsonPath,
    events.map((e) => JSON.stringify(e)).join('\n') + '\n',
    'utf8'
  );

  console.log(
    `[simulate-openrtb-stream] Wrote ${events.length} synthetic OpenRTB 2.6/3.0 events to ${jsonPath}`
  );
}

main();
