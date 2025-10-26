#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import { applyBlueNoiseDither } from './dither.js';

const program = new Command();

program
  .name('blue-noise')
  .description('Apply blue noise dithering to images')
  .version('1.0.0')
  .argument('<input>', 'Path to input image')
  .option('-o, --output <path>', 'Output directory', 'output')
  .option('-n, --noise <path>', 'Path to blue noise texture', './noise.png')
  .option('-f, --foreground <hex>', 'Foreground color (hex)', '#000000')
  .option('-b, --background <hex>', 'Background color (hex)', '#ffffff')
  .option('-w, --width <number>', 'Output width in pixels')
  .option('-h, --height <number>', 'Output height in pixels')
  .option('-c, --contrast <number>', 'Contrast adjustment (1.0 = normal, >1 = more contrast, <1 = less contrast)')
  .action(async (input: string, options: any) => {
    try {
      const inputPath = path.resolve(input);
      const outputDir = path.resolve(options.output);
      const noisePath = path.resolve(options.noise);
      const inputFilename = path.basename(input);
      const outputFilename = inputFilename.replace(/\.[^.]+$/, '-dithered.png');
      const outputPath = path.join(outputDir, outputFilename);

      const width = options.width ? parseInt(options.width, 10) : undefined;
      const height = options.height ? parseInt(options.height, 10) : undefined;
      const contrast = options.contrast ? parseFloat(options.contrast) : undefined;

      console.log(`Processing: ${inputPath}`);
      console.log(`Noise texture: ${noisePath}`);
      console.log(`Output: ${outputPath}`);
      if (width || height) {
        console.log(`Dimensions: ${width || 'auto'}x${height || 'auto'}`);
      }
      if (contrast !== undefined) {
        console.log(`Contrast: ${contrast}`);
      }
      console.log(`Foreground: ${options.foreground}`);
      console.log(`Background: ${options.background}`);

      await applyBlueNoiseDither(inputPath, outputPath, {
        foreground: options.foreground,
        background: options.background,
        noisePath: noisePath,
        width,
        height,
        contrast,
      });

      console.log('Done!');
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
