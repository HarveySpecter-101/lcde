import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const sourceDirs = [
  path.join(publicDir, "logos"),
  path.join(publicDir, "logos", "entreprises"),
];
const outputDir = path.join(publicDir, "logos", "normalized");
const supportedExtensions = new Set([".png", ".jpg", ".jpeg", ".svg"]);

async function getLogoSources() {
  const sources = [];

  for (const directory of sourceDirs) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;

      const extension = path.extname(entry.name).toLowerCase();
      if (!supportedExtensions.has(extension)) continue;
      if (directory === outputDir || entry.name === "bank-of-africa.png" || entry.name === "banque-populaire.png" || entry.name === "cdg.png" || entry.name === "cih-bank.png" || entry.name === "cnss.png" || entry.name === "grant-thornton.png" || entry.name === "royal-air-maroc.png") continue;

      sources.push(path.join(directory, entry.name));
    }
  }

  return sources;
}

function outputPathFor(sourcePath) {
  const relative = path.relative(publicDir, sourcePath);
  const relativeWithoutExtension = relative.replace(path.extname(relative), "");
  return path.join(outputDir, `${relativeWithoutExtension.replaceAll(path.sep, "-")}.webp`);
}

await fs.mkdir(outputDir, { recursive: true });

const sources = await getLogoSources();

for (const sourcePath of sources) {
  const outputPath = outputPathFor(sourcePath);
  await sharp(sourcePath)
    // Remove the source image's empty border before sizing the actual logo.
    .trim({ threshold: 18 })
    // A shared visual canvas makes the visible mark comparable while preserving its ratio.
    .resize({ width: 520, height: 180, fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .webp({ quality: 92, effort: 4 })
    .toFile(outputPath);
}

console.log(`Normalized ${sources.length} logos into ${path.relative(process.cwd(), outputDir)}`);
