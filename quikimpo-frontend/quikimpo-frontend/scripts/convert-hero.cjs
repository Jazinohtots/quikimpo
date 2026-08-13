const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

(async () => {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const publicDir = path.join(projectRoot, 'public');
    const backendImages = path.resolve(projectRoot, '..', '..', 'quikimpo-backend', 'quikimpo-main', 'static', 'images');

    const candidates = ['hero.jpg', 'hero.jpeg', 'hero.png', 'hero1.png'];
    let src = null;
    for (const c of candidates) {
      const p = path.join(publicDir, c);
      if (fs.existsSync(p)) { src = p; break; }
    }
    if (!src) {
      console.error('No hero source found in public/. Please add hero.jpg or hero.png');
      process.exit(1);
    }

    console.log('Using source:', src);

    const outputs = [
      { name: 'hero.jpg', width: 1920, options: { quality: 85 } },
      { name: 'hero.webp', width: 1920, options: { quality: 80 } },
      { name: 'hero-mobile.jpg', width: 800, options: { quality: 80 } },
      { name: 'hero@2x.jpg', width: 3840, options: { quality: 75 } },
      { name: 'hero-mobile.webp', width: 800, options: { quality: 75 } },
    ];

    await Promise.all(outputs.map(async (o) => {
      const outPath = path.join(publicDir, o.name);
      let pipeline = sharp(src).rotate().resize({ width: o.width }).withMetadata();
      if (o.name.endsWith('.webp')) pipeline = pipeline.webp(o.options);
      else pipeline = pipeline.jpeg(o.options);
      await pipeline.toFile(outPath);
      console.log('Wrote', outPath);

      // copy to backend static images if folder exists
      try {
        if (fs.existsSync(backendImages)) {
          const dest = path.join(backendImages, o.name);
          await fs.promises.copyFile(outPath, dest);
          console.log('Copied to backend:', dest);
        }
      } catch (err) {
        console.warn('Could not copy to backend images:', err.message);
      }
    }));

    console.log('All conversions finished.');
  } catch (err) {
    console.error('Conversion failed:', err);
    process.exit(1);
  }
})();
