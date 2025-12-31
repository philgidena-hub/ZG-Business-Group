/**
 * Image Optimization Script
 * Converts large images to optimized WebP format
 * Run with: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

// Image sizes for different use cases
const SIZES = {
  parallax: { width: 1200, quality: 80 },  // For zoom parallax images
  thumbnail: { width: 400, quality: 75 },   // For thumbnails
  card: { width: 800, quality: 80 },        // For card images
};

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputName, size) {
  const outputPath = path.join(OUTPUT_DIR, `${outputName}.webp`);

  try {
    const metadata = await sharp(inputPath).metadata();
    const inputStats = fs.statSync(inputPath);

    await sharp(inputPath)
      .resize(size.width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: size.quality })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    console.log(`✓ ${path.basename(inputPath)}`);
    console.log(`  Original: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Optimized: ${(outputStats.size / 1024).toFixed(0)} KB`);
    console.log(`  Savings: ${savings}%`);
    console.log(`  Output: ${outputName}.webp\n`);

    return { input: inputPath, output: outputPath, savings };
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script\n');
  console.log(`Input directory: ${INPUT_DIR}`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  // Get all image files
  const files = fs.readdirSync(INPUT_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.webp'].includes(ext);
  });

  if (files.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${files.length} images to optimize:\n`);

  const results = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(INPUT_DIR, file);
    const baseName = path.basename(file, path.extname(file));

    // Generate a clean name (replace UUID with index if needed)
    const cleanName = baseName.match(/^[a-f0-9-]{36}$/i)
      ? `parallax-${i + 1}`
      : baseName.toLowerCase().replace(/\s+/g, '-');

    const result = await optimizeImage(inputPath, cleanName, SIZES.parallax);
    if (result) results.push(result);
  }

  // Summary
  console.log('═'.repeat(50));
  console.log('SUMMARY');
  console.log('═'.repeat(50));
  console.log(`Total images processed: ${results.length}`);

  const totalOriginal = results.reduce((acc, r) => {
    return acc + fs.statSync(r.input).size;
  }, 0);

  const totalOptimized = results.reduce((acc, r) => {
    return acc + fs.statSync(r.output).size;
  }, 0);

  console.log(`Total original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total optimized size: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total savings: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);

  // Generate updated image paths for ZoomParallax component
  console.log('\n📝 Update ZoomParallax.tsx with these paths:\n');
  results.forEach((r, i) => {
    const outputName = path.basename(r.output);
    console.log(`  '/images/optimized/${outputName}',`);
  });
}

main().catch(console.error);
