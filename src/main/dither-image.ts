import sharp from 'sharp';

export const processImage = async ({ inputPath, distances, gridWidth, gridHeight, imageBase }: { distances: number[], gridWidth: number, gridHeight: number, imageBase: string, inputPath: string }) => {
  const fullInputPath = `./input/main/${inputPath}`;
  const outputPath = `./output/main/${imageBase}-dither.png`;

  try {
    // Read the image from disk and convert to grayscale
    const image = sharp(fullInputPath).grayscale();

    // Get image metadata to determine its dimensions
    const metadata = await image.metadata();
    const { width, height } = metadata;

    // Get raw pixel data from the image
    const rawBuffer = await image.raw().toBuffer();

    let outputBuffer = Buffer.alloc(rawBuffer.length);

    for (let y = 0; y < height!; y++) {
      for (let x = 0; x < width!; x++) {
        // Calculate the position in the normalized distances grid, wrapping around if necessary
        const gridX = x % gridWidth;
        const gridY = y % gridHeight;
        const gridIndex = gridY * gridWidth + gridX;

        // Get the corresponding normalized distance value
        const distanceValue = distances[gridIndex];

        // Calculate the index in the image buffer
        const bufferIndex = y * width! + x;

        // Determine if the pixel value is greater than the distance value
        outputBuffer[bufferIndex] = rawBuffer[bufferIndex] > distanceValue ? 255 : 0; // black or white
      }
    }

    // Write the new image to disk
    await sharp(outputBuffer, {
      raw: {
        width: width!,
        height: height!,
        channels: 1
      }
    }).toFile(outputPath);

    console.log(`Image processing complete. Output saved as ${outputPath}`);
  } catch (error) {
    console.error('An error occurred during image processing:', error);
  }
}
