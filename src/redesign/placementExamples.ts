export interface PlacementExample {
  id: string;
  platformId: string;
  format: string;
  description: string;
  poster: string;
  width: number;
  height: number;
  video?: string;
  publisher: string;
  sourcePage: string;
  originalMedia: string;
  retrieved: string;
  limitation: string;
}

const make = (platformId: string, example: Omit<PlacementExample, 'platformId' | 'retrieved'>): PlacementExample => ({ platformId, retrieved: '2026-11-05', ...example });
const googleSource = 'https://support.google.com/google-ads/answer/2375464?hl=en';
const zeeKit = 'https://tma-live.s3.ap-south-1.amazonaws.com/media/zee5-app-advertising/media-kit-ZEE5%20Deck%20Mar%2722%20%281%29.pdf';

export const placementExamples: Record<string, PlacementExample[]> = {
  jiohotstar: ['pre-roll', 'mid-roll'].map((format) => make('jiohotstar', {
    id: format, format: format === 'pre-roll' ? 'Pre-roll video' : 'Mid-roll video',
    description: format === 'pre-roll' ? 'A video advertisement before the programme starts. Original demonstration from JioHotstar’s advertising guide.' : 'A video advertisement during a break in the programme. Original demonstration from JioHotstar’s advertising guide.',
    poster: `/media/platforms/jiohotstar-${format}.webp`, video: `/media/jiohotstar/${format}.mp4`, width: 798, height: 1662,
    publisher: 'JioHotstar', sourcePage: 'https://ads.hotstar.com/ad-formats/',
    originalMedia: `https://ads.hotstar.com/wp-content/uploads/2023/08/SS-${format === 'pre-roll' ? 'Pre' : 'Mid'}-Roll-Mock.mp4`,
    limitation: 'Publisher demonstration retains its original interface and advertiser creative. Duration and device availability are confirmed in your media plan.',
  })),
  'prime-video': [make('prime-video', {
    id: 'interactive-video', format: 'Interactive in-stream video',
    description: 'An original Amazon Ads example showing an interactive call to action over a streaming video advertisement. The viewer can send more information to their phone.',
    poster: '/media/platforms/prime-interactive.jpg', width: 1092, height: 730,
    publisher: 'Amazon Ads', sourcePage: 'https://advertising.amazon.com/library/guides/interactive-video',
    originalMedia: 'https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/guides/gd_Screenshot_body._TTW_.jpg',
    limitation: 'Amazon streaming-TV format example. Interactive features vary by market, device and campaign eligibility; this does not promise the shown option for every Prime Video booking.',
  })],
  sonyliv: [make('sonyliv', {
    id: 'spotlight', format: 'Ads on Spotlight',
    description: 'An original frame from Sony LIV’s advertising showcase, displaying a Samsung campaign within its Spotlight experience.',
    poster: '/media/platforms/sony-spotlight.png', width: 1400, height: 656,
    publisher: 'Sony LIV', sourcePage: 'https://advertisewithus.sonyliv.com/',
    originalMedia: 'https://streaming.sonyliv.com/Sony_Liv_Video_Final_tv.mpd',
    limitation: 'Historical interface in the reel currently published by Sony LIV (frame at 00:45). Confirm current placement availability and specifications before booking.',
  })],
  youtube: [
    make('youtube', {
      id: 'in-stream', format: 'Skippable in-stream', description: 'Google’s original demonstration of an advertisement in the YouTube player, including its skip control.',
      poster: '/media/platforms/youtube-instream.webp', video: '/media/platforms/youtube-instream.mp4', width: 895, height: 448,
      publisher: 'Google Ads', sourcePage: googleSource,
      originalMedia: 'https://lh3.googleusercontent.com/5PZeggbAP_FAWJl-_8pyAZ5MUR-l-uYvC1irpGvPSoKextn-2-Cghh4PYkTCRrV_9uY=w895',
      limitation: 'Original Google format demonstration. Appearance varies by device and campaign settings.',
    }),
    make('youtube', {
      id: 'in-feed', format: 'In-feed video', description: 'An original Google illustration of a promoted video in the YouTube discovery experience.',
      poster: '/media/platforms/youtube-infeed.svg', width: 1200, height: 600, publisher: 'Google Ads', sourcePage: googleSource,
      originalMedia: 'https://storage.googleapis.com/support-kms-prod/Rwe8QAidjWhs6T2qj8s3sdZ3iOadku5CJk4p',
      limitation: 'Publisher format illustration. In-feed ads may appear in eligible Home, Search and Watch Next surfaces.',
    }),
    make('youtube', {
      id: 'shorts', format: 'Shorts', description: 'Google’s original Shorts ad-format illustration, showing the vertical viewing experience.',
      poster: '/media/platforms/youtube-shorts.svg', width: 535, height: 1064, publisher: 'Google Ads', sourcePage: googleSource,
      originalMedia: 'https://storage.googleapis.com/support-kms-prod/F7OqoadWdOdPhfZGKSeNGQCQIE0TPwo5WgyV',
      limitation: 'Publisher format illustration. Creative, device and campaign settings determine the final presentation.',
    }),
  ],
  zee5: [make('zee5', {
    id: 'video-display', format: 'Video & display placements',
    description: 'ZEE5’s original media-kit slide shows video inventory alongside display and native placements, with the source labels and advertiser examples preserved.',
    poster: '/media/platforms/zee5-formats-2022.webp', width: 1440, height: 810, publisher: 'ZEE5', sourcePage: 'https://adsmanagerhelp.zee5.com/portal/en/kb/articles/ad-formats', originalMedia: zeeKit,
    limitation: 'Historical interface: March 2022 media kit, page 19, hosted by The Media Ant. Current ZEE5 documentation also lists a 300 × 250 medium rectangle; that exact unit is not pictured separately on this slide.',
  })],
};
