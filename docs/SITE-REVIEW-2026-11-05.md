# Website review — 5 November 2026

Reviewed live HTML from all 13 public routes, plus the application and deployment implementation. All routes returned HTTP 200. Browser control was disabled in Work settings, so this review does not constitute a fresh visual, mobile or interaction audit.

## Changes requested and implemented

- Removed public source links, format-guide links and media-kit links from the OTT hub, five platform pages and shared homepage gallery, including media-error fallbacks. Source metadata and embedded advertiser branding remain intact.
- Replaced fictional Fieldnotes/Trail Supply presentations on the homepage, publishers and advertisers pages with Biddigi service briefs, property readiness checks, inventory-specific services and reporting scope.
- Removed the illustrative CTV cutaway and the revenue scenario dashboard from public pages. The basic calculator starts with empty inputs and uses visitors' own figures.
- Added direct platform discovery to the advertiser page, using existing original company marks and platform service links.
- Retained sourced platform examples, historical-interface qualifications and campaign enquiry context.

## Recommended next priorities

1. **Enquiry delivery:** the live `/api/enquiries` GET returns HTTP 404 with HTML. The UI posts to this route; the existing Pages deployment has no Functions adapter. The repository documents the separate Node mail handler and its production configuration requirements. Connect a production handler, verified sender and abuse controls, then verify an approved enquiry reaches the inbox. No test enquiry was sent in this review.
2. **Publisher offering:** specify confirmed acceptance criteria, onboarding responsibilities, expected integration stages and actual reporting deliverables. Add real anonymized placement reports and case studies only when supplied and approved. Avoid invented earnings and universal approval promises.
3. **Advertiser offering:** add an objective-to-platform comparison, sample media-plan structure, creative specifications and the metrics available per format. Only publish minimum spends or turnaround times once the business confirms them. Keep DSP integration enquiries separate from brand campaign planning.
4. **OTT service pages:** use one placement gallery per page rather than repeating the same preview in the hero and formats section. Give each platform a distinct audience/format proposition. Replace historical Sony LIV/ZEE5 references when current publisher material is available; retain the age labels until then.
5. **Homepage:** offer an equally clear advertiser entry point alongside publisher onboarding, and make service outcomes the main narrative. Add approved customer proof before adding decorative sections.
6. **About/contact:** add verified team information, company registration details and a public contact channel. The current About page lists entities and cities but has little operational proof. Do not publish a private recipient address as a shortcut.
7. **Measurement:** existing analytics are local custom events, with no persistent analytics adapter installed. Connect approved measurement for role selection, platform interest, enquiry starts and successful delivery; exclude form contents.
8. **Performance and visual QA:** removal of unused demos reduced compressed initial JavaScript from approximately 158 KB to 92 KB. After browser control is available, inspect the new service briefs at 320, 390, 768 and 1440 px, test keyboard focus and review image loading. Do not substitute static HTML checks for visual verification.

Privacy and terms pages were included in the route/content review. Their final business-specific retention and contact details still need the operator's input; no legal compliance assessment was performed.
