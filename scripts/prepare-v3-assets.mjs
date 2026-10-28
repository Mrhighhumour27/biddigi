import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { readFile, mkdir, copyFile, writeFile, access } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const { assets } = JSON.parse(
  await readFile(new URL("design/v3-generation.json", root), "utf8"),
);
await mkdir(new URL("design/v3-originals/", root), { recursive: true });
await mkdir(new URL("public/images/v3/", root), { recursive: true });
const manifest = [];
for (const asset of assets) {
  const original = new URL(`design/v3-originals/${asset.id}.png`, root);
  try { await access(original); }
  catch { await copyFile(asset.source, original); }
  const meta = await sharp(fileURLToPath(original)).metadata();
  const variants = [];
  for (const width of [640, 1280]) {
    for (const format of ["webp", "avif"]) {
      const target = new URL(
        `public/images/v3/${asset.id}-${width}.${format}`,
        root,
      );
      const result = await sharp(fileURLToPath(original))
        .resize({ width, withoutEnlargement: true })
        [format]({ quality: format === "avif" ? 55 : 78 })
        .toFile(fileURLToPath(target));
      variants.push({
        width: result.width,
        height: result.height,
        bytes: result.size,
        path: `/images/v3/${asset.id}-${width}.${format}`,
      });
    }
  }
  manifest.push({
    id: asset.id,
    width: meta.width,
    height: meta.height,
    variants,
  });
}
await writeFile(
  new URL("design/v3-assets.json", root),
  JSON.stringify(manifest, null, 2),
);
const thumbs = await Promise.all(
  assets.map(async (a, i) => ({
    input: await sharp(
      fileURLToPath(new URL(`design/v3-originals/${a.id}.png`, root)),
    )
      .resize(320, 220, { fit: "cover" })
      .jpeg()
      .toBuffer(),
    left: (i % 4) * 320,
    top: Math.floor(i / 4) * 220,
  })),
);
await sharp({
  create: { width: 1280, height: 440, channels: 3, background: "#f1f0ea" },
})
  .composite(thumbs)
  .jpeg()
  .toFile(fileURLToPath(new URL("design/v3-contact-sheet.jpg", root)));
console.log(
  "Prepared eight V3 source photographs, responsive AVIF/WebP variants and asset manifest.",
);
