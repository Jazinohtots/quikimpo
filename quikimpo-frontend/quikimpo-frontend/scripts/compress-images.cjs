const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.resolve(__dirname, "..", "public");
const maxWidth = 1600;
const largeImageBytes = 300 * 1024;

function formatSize(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

async function compressImage(file) {
  const filePath = path.join(publicDir, file);
  const before = fs.statSync(filePath).size;
  if (before <= 150 * 1024) {
    console.log(`${file}: ${formatSize(before)} (already optimized)`);
    return;
  }
  const extension = path.extname(file).toLowerCase();
  const source = fs.readFileSync(filePath);
  const metadata = await sharp(source).metadata();
  const basePipeline = sharp(source).rotate().resize({ width: maxWidth, withoutEnlargement: true });
  const encoded = extension === ".png"
    ? await basePipeline.png({ quality: 80, compressionLevel: 9, palette: true }).toBuffer()
    : await basePipeline.jpeg({ quality: 78, mozjpeg: true }).toBuffer();

  if (encoded.length < before) {
    fs.writeFileSync(filePath, encoded);
  }

  let finalPath = filePath;
  let after = fs.statSync(filePath).size;
  if (extension === ".png" && !metadata.hasAlpha && after > largeImageBytes) {
    const jpegPath = filePath.replace(/\.png$/i, ".jpg");
    const jpegBuffer = await sharp(fs.readFileSync(filePath))
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toBuffer();
    if (jpegBuffer.length < after) {
      fs.writeFileSync(jpegPath, jpegBuffer);
      fs.unlinkSync(filePath);
      finalPath = jpegPath;
      after = jpegBuffer.length;
    }
  }

  const saved = (((before - after) / before) * 100).toFixed(0);
  const finalName = path.basename(finalPath);
  console.log(`${file}${finalName === file ? "" : ` -> ${finalName}`}: ${formatSize(before)} -> ${formatSize(after)} (-${saved}%)`);
}

async function main() {
  const files = fs.readdirSync(publicDir).filter((file) => /\.(png|jpe?g)$/i.test(file));
  for (const file of files) {
    await compressImage(file);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});