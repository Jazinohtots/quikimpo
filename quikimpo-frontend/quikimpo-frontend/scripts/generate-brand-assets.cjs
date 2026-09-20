const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const favicon = path.join(publicDir, "favicon.svg");

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0f172a"/>
  <circle cx="1050" cy="90" r="220" fill="#38bdf8" opacity=".11"/>
  <circle cx="65" cy="620" r="220" fill="#38bdf8" opacity=".09"/>
  <rect x="90" y="112" width="10" height="216" fill="#ffd700"/>
  <text x="130" y="205" fill="#ffd700" font-family="Arial, sans-serif" font-size="82" font-weight="700">Quik</text>
  <text x="330" y="205" fill="#ffffff" font-family="Arial, sans-serif" font-size="82" font-weight="700">Impo</text>
  <text x="132" y="252" fill="#38bdf8" font-family="Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="7">FREIGHT &amp; LOGISTICS</text>
  <text x="130" y="384" fill="#ffffff" font-family="Arial, sans-serif" font-size="49" font-weight="700">Fast, reliable freight forwarding</text>
  <text x="130" y="446" fill="#ffffff" font-family="Arial, sans-serif" font-size="49" font-weight="700">across Africa and worldwide.</text>
  <text x="130" y="530" fill="#b6c2d3" font-family="Arial, sans-serif" font-size="25">Air · Sea · Road Freight · Customs Clearance · Warehousing · Tracking</text>
</svg>`;

async function generate() {
  const iconSizes = [
    ["favicon-16x16.png", 16],
    ["favicon-32x32.png", 32],
    ["apple-touch-icon.png", 180],
    ["android-chrome-192x192.png", 192],
    ["android-chrome-512x512.png", 512],
  ];
  await Promise.all(iconSizes.map(([name, width]) => sharp(favicon).resize(width, width).png().toFile(path.join(publicDir, name))));
  await sharp(Buffer.from(ogSvg)).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(publicDir, "og-image.jpg"));
}

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});