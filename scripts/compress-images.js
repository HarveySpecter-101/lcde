const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const images = [
  { input: "public/og/og-image.png", width: 1344, quality: 82 },
  { input: "public/founders/rachad-ghali.jpg", width: 400, quality: 80 },
  { input: "public/founders/moutik-rida.jpg", width: 400, quality: 80 },
  { input: "public/founders/rida-moutik.jpg", width: 400, quality: 80 },
];

async function compress() {
  for (const img of images) {
    const inputPath = path.resolve(img.input);
    if (!fs.existsSync(inputPath)) {
      console.log(`SKIP: ${img.input}`);
      continue;
    }
    const sizeBefore = fs.statSync(inputPath).size;
    const ext = path.extname(img.input).toLowerCase();
    const tmpPath = inputPath + ".tmp" + ext;

    try {
      // Read into buffer first to avoid file locking
      const inputBuffer = fs.readFileSync(inputPath);
      let pipeline = sharp(inputBuffer).resize({ width: img.width, withoutEnlargement: true });

      if (ext === ".png") {
        pipeline = pipeline.png({ quality: img.quality, compressionLevel: 9 });
      } else if (ext === ".jpg" || ext === ".jpeg") {
        pipeline = pipeline.jpeg({ quality: img.quality, mozjpeg: true });
      }

      const buffer = await pipeline.toBuffer();
      fs.writeFileSync(tmpPath, buffer);
      fs.unlinkSync(inputPath);
      fs.renameSync(tmpPath, inputPath);
      const sizeAfter = buffer.length;
      const pct = Math.round((1 - sizeAfter / sizeBefore) * 100);
      console.log(`OK ${img.input}: ${(sizeBefore/1024).toFixed(1)}KB -> ${(sizeAfter/1024).toFixed(1)}KB (-${pct}%)`);
    } catch (err) {
      console.error(`FAIL ${img.input}: ${err.message}`);
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    }
  }
}

compress();
