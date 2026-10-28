export interface AdvertisingPlatform {
  id: string;
  slug: string;
  name: string;
  category: "OTT & streaming" | "Online video";
  tagline: string;
  description: string;
  objectives: string[];
  formats: { name: string; description: string }[];
  creative: string[];
  audience: string;
  geographic: string;
  pricing: string;
  faqs: { q: string; a: string }[];
  source: { label: string; url: string };
}

// Platform references reviewed 26 October 2026. Numeric creative specifications
// are deliberately excluded: the selected placement's current brief governs them.
export const platforms: AdvertisingPlatform[] = [
  {
    id: "jiohotstar",
    slug: "/jiohotstar-ads",
    name: "JioHotstar",
    category: "OTT & streaming",
    tagline: "Your brand. Their next viewing moment.",
    description:
      "Bring your campaign into entertainment and sports viewing. Biddigi helps shape the media brief, coordinate creative, and prepare your JioHotstar campaign for review.",
    objectives: ["Brand introductions", "Product launches", "Campaign recall"],
    formats: [
      {
        name: "Pre-roll video",
        description: "Introduce your message before the selected video begins.",
      },
      {
        name: "Mid-roll video",
        description: "Tell your story within an available break in the stream.",
      },
      {
        name: "Fence display",
        description:
          "Explore display artwork alongside content in eligible portrait placements.",
      },
    ],
    creative: [
      "Share your video or storyboard and campaign objective.",
      "Prepare separate artwork for display placements.",
      "Confirm the accepted duration, dimensions, and file requirements before production.",
    ],
    audience:
      "Plan around relevant entertainment or sports viewing, with audience options confirmed for the campaign.",
    geographic:
      "Share your target locations and languages. Inventory and device availability are checked before booking.",
    pricing:
      "Request a scoped media plan covering inventory, schedule, creative requirements, and Biddigi support.",
    faqs: [
      {
        q: "Can I choose a specific match or show?",
        a: "Tell us your preference. Availability and any contextual booking options must be confirmed before commitment.",
      },
      {
        q: "Are fence ads the same as video ads?",
        a: "No. They use separate display artwork. We clarify each placement and its creative checklist in your plan.",
      },
      {
        q: "Do I need a finished creative to enquire?",
        a: "No. A campaign brief or storyboard is enough to start the discussion.",
      },
    ],
    source: {
      label: "JioHotstar format guide",
      url: "https://ads.hotstar.com/ad-formats/",
    },
  },
  {
    id: "prime-video",
    slug: "/prime-video-ads",
    name: "Prime Video",
    category: "OTT & streaming",
    tagline: "A bigger setting for your brand story.",
    description:
      "Explore advertising alongside Prime Video entertainment. Biddigi helps translate your objective into a media brief, prepare assets, and coordinate campaign requirements.",
    objectives: [
      "Brand awareness",
      "Entertainment-led storytelling",
      "Audience consideration",
    ],
    formats: [
      {
        name: "Pre-roll video",
        description: "An ad break before eligible Prime Video content.",
      },
      {
        name: "Mid-roll video",
        description:
          "A video message in an available break during eligible content.",
      },
    ],
    creative: [
      "Start with a clear brand message and a finished video or storyboard.",
      "Confirm the current Amazon creative requirements for the selected market.",
      "Review any interactive option separately; availability is not universal.",
    ],
    audience:
      "Explore relevant demographic or lifestyle audience options. Title inclusion varies by market.",
    geographic:
      "Prime Video advertising is available in India and other supported markets. Confirm geography and device inventory in the proposal.",
    pricing:
      "Receive a campaign-specific quotation with media scope and service responsibilities explained.",
    faqs: [
      {
        q: "Must my business sell on Amazon?",
        a: "No. Amazon states that eligible businesses can advertise on Prime Video whether or not they sell products on Amazon.",
      },
      {
        q: "Can I book a particular title?",
        a: "A preferred title is a planning request. We confirm available inventory rather than promise placement against a named programme.",
      },
      {
        q: "Does every title have both ad placements?",
        a: "No. Amazon explains that some titles may have pre-roll only; the experience varies by title and locale.",
      },
    ],
    source: {
      label: "Amazon Ads: Prime Video",
      url: "https://advertising.amazon.com/products/prime-video-ads",
    },
  },
  {
    id: "sonyliv",
    slug: "/sonyliv-ads",
    name: "Sony LIV",
    category: "OTT & streaming",
    tagline: "Be part of the viewing conversation.",
    description:
      "Plan a Sony LIV campaign around your brand and viewing context. Biddigi supports the brief, placement discussion, creative coordination, and delivery review.",
    objectives: [
      "Sports-led awareness",
      "Entertainment audiences",
      "Campaign storytelling",
    ],
    formats: [
      {
        name: "Before-stream video",
        description: "Explore an introduction before eligible content starts.",
      },
      {
        name: "In-stream video",
        description:
          "Explore an available video break during eligible viewing.",
      },
    ],
    creative: [
      "Share the brand, product category, and campaign objective.",
      "Match the language and message to the intended audience.",
      "Confirm placement-specific duration and delivery specifications before editing the final asset.",
    ],
    audience:
      "Discuss sports, original entertainment, and other available content contexts. Subscription tiers do not imply identical ad inventory.",
    geographic:
      "Set out your target locations, languages, and device preference. Available targeting is confirmed in the media plan.",
    pricing:
      "Request a plan for your timing and audience. Media availability, creative preparation, and Biddigi services are scoped before launch.",
    faqs: [
      {
        q: "Can a sports campaign be planned in advance?",
        a: "Yes. Share the event and dates early so availability and the booking approach can be checked.",
      },
      {
        q: "Will every Sony LIV viewer see my ad?",
        a: "No. Exposure depends on the booked inventory, eligible audience, and campaign configuration.",
      },
      {
        q: "Are interactive formats included automatically?",
        a: "No. Any additional format is discussed and confirmed separately for your campaign.",
      },
    ],
    source: {
      label: "Sony LIV advertising",
      url: "https://advertisewithus.sonyliv.com/",
    },
  },
  {
    id: "youtube",
    slug: "/youtube-ads",
    name: "YouTube",
    category: "Online video",
    tagline: "Meet your audience as they watch and discover.",
    description:
      "Connect your creative with a clear YouTube campaign objective. Biddigi helps plan formats, coordinate assets, support setup, and interpret the agreed performance measures.",
    objectives: ["Video reach", "Views and consideration", "Website actions"],
    formats: [
      {
        name: "In-stream video",
        description:
          "Skippable or non-skippable placements around eligible videos, depending on campaign settings.",
      },
      {
        name: "Shorts",
        description:
          "Vertical video creative in the Shorts viewing experience.",
      },
      {
        name: "In-feed video",
        description:
          "A discovery placement within eligible YouTube browsing and search surfaces.",
      },
    ],
    creative: [
      "Prepare assets suited to horizontal and vertical viewing.",
      "Make the brand and intended action clear early.",
      "Supply the destination URL and agree conversion measurement before launch.",
    ],
    audience:
      "Discuss audience and contextual options, device preferences, exclusions, and the right campaign objective.",
    geographic:
      "Specify the countries or locations and languages you want to reach. Targeting is configured around the agreed brief.",
    pricing:
      "Budget and buying approach follow the objective and selected formats. Request a scoped plan rather than assume a fixed cost per view.",
    faqs: [
      {
        q: "Is YouTube an OTT service?",
        a: "This page covers online video advertising. It sits alongside our streaming services so you can plan video activity in one place.",
      },
      {
        q: "Are all YouTube ads skippable?",
        a: "No. Available formats include skippable and non-skippable options; their suitability depends on the campaign.",
      },
      {
        q: "Can we measure website enquiries?",
        a: "We can discuss conversion measurement and the implementation needed. Measurement depends on your website setup and applicable consent requirements.",
      },
    ],
    source: {
      label: "YouTube advertising guide",
      url: "https://business.google.com/in/ad-solutions/youtube-ads/",
    },
  },
  {
    id: "zee5",
    slug: "/zee5-ads",
    name: "ZEE5",
    category: "OTT & streaming",
    tagline: "Build a campaign around the stories people choose.",
    description:
      "Explore ZEE5 advertising with a brief built around your audience, language, and campaign timing. Biddigi supports planning, creative coordination, and campaign review.",
    objectives: [
      "Language-led brand awareness",
      "Entertainment campaigns",
      "Product introductions",
    ],
    formats: [
      {
        name: "Pre-roll and mid-roll",
        description:
          "Explore video placements before or during eligible content.",
      },
      {
        name: "Platform display",
        description:
          "Discuss eligible home-screen or other platform display inventory.",
      },
      {
        name: "Additional placements",
        description:
          "Ask about overlays or other available formats; confirm the exact placement before production.",
      },
    ],
    creative: [
      "Share your preferred language and brand message.",
      "Prepare video and display assets separately where required.",
      "Confirm current dimensions, duration, file limits, and approval requirements for each placement.",
    ],
    audience:
      "Use language and viewing context as planning inputs. Available audience selections depend on the booked campaign.",
    geographic:
      "State the locations and devices you want to cover. ZEE5 notes that placements vary across devices, regions, and content.",
    pricing:
      "Request a tailored quotation covering the selected inventory and agreed Biddigi support.",
    faqs: [
      {
        q: "Can we plan a language-specific creative?",
        a: "Yes. Share the language and target market in your brief; we confirm the available media options.",
      },
      {
        q: "Are all placements available on every device?",
        a: "No. Device, content, and regional availability must be checked for the proposed booking.",
      },
      {
        q: "Can the same file cover video and display?",
        a: "Usually these require different assets. The media plan will identify the creative needed for each selected placement.",
      },
    ],
    source: {
      label: "ZEE5 platform placement information",
      url: "https://www.zee5.com/termsofuse",
    },
  },
];
