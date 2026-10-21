import { mkdir, readFile, writeFile } from 'node:fs/promises';

// Give the service route its own document metadata for direct visits and crawlers.
const index = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const title = 'JioHotstar Advertising Services & Ad Formats | BidDigi';
const description = 'Plan your JioHotstar advertising campaign with BidDigi. Explore looping mid-roll, pre-roll and fence ad previews, creative specifications and campaign support.';
const page = index
  .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
  .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`)
  .replace('</head>', '  <link rel="canonical" href="https://biddigi.io/jiohotstar-ads" />\n</head>');
const output = new URL('../dist/jiohotstar-ads/', import.meta.url);
await mkdir(output, { recursive: true });
await writeFile(new URL('index.html', output), page);
console.log('Created /jiohotstar-ads with service metadata.');
