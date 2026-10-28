export const routes = [
  {
    path: "/",
    title: "Ad monetization for publishers",
    description:
      "Turn your audience into ad revenue. Biddigi connects website, app, video and CTV ad space with buyers and helps improve your ad setup.",
  },
  {
    path: "/publishers",
    title: "Publisher ad monetization",
    description:
      "Explore header bidding, web and app advertising, video, CTV, reporting and a transparent revenue calculator with Biddigi.",
  },
  {
    path: "/advertisers",
    title: "Advertising and demand solutions",
    description:
      "Plan campaigns and discuss inventory access with Biddigi. Connect your objective, audience and creative with a practical media plan.",
  },
  {
    path: "/ott-ads",
    title: "OTT and video advertising",
    description:
      "Plan advertising on JioHotstar, Prime Video, Sony LIV, YouTube and ZEE5 with Biddigi campaign support.",
  },
  {
    path: "/jiohotstar-ads",
    title: "JioHotstar advertising services",
    description:
      "Explore JioHotstar video and display placements, creative planning and campaign coordination with Biddigi.",
  },
  {
    path: "/prime-video-ads",
    title: "Prime Video advertising services",
    description:
      "Build a streaming advertising brief for Prime Video with Biddigi media planning and campaign support.",
  },
  {
    path: "/sonyliv-ads",
    title: "Sony LIV advertising services",
    description:
      "Plan Sony LIV advertising around streaming entertainment, sports and your campaign objectives with Biddigi.",
  },
  {
    path: "/youtube-ads",
    title: "YouTube advertising services",
    description:
      "Explore YouTube video campaign objectives, creative formats and media planning with Biddigi.",
  },
  {
    path: "/zee5-ads",
    title: "ZEE5 advertising services",
    description:
      "Plan ZEE5 advertising for entertainment and regional-language audiences with Biddigi campaign support.",
  },
  {
    path: "/about",
    title: "About Biddigi and Expoworld",
    description:
      "Biddigi is a product by Expoworld, connecting advertising technology and ad operations across the UK and India.",
  },
  {
    path: "/contact",
    title: "Discuss your project",
    description:
      "Tell Biddigi about your publishing property, campaign or demand requirements. Send a qualified enquiry to our team.",
  },
  {
    path: "/privacy",
    title: "Privacy notice",
    description:
      "How Biddigi handles website enquiries and information submitted through this website.",
  },
  {
    path: "/terms",
    title: "Website terms",
    description:
      "Using the Biddigi website, illustrative tools and campaign service enquiries.",
  },
];
export const normalizePath = (path: string) => {
  const clean = path.replace(/\/index\.html$/, "/").replace(/\/+$/, "");
  return clean || "/";
};
