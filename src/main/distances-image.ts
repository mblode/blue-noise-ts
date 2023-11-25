import sharp from 'sharp';
import { Buffer } from 'buffer';

// Function to convert an array of normalized distances into an image
export const createImageFromDistances = async ({ distances, gridWidth, gridHeight, imageBase }: { distances: number[], gridWidth: number, gridHeight: number, imageBase: string }) => {
  const outputPath = `./output/main/${imageBase}-distance.png`;
  // Ensure the distances are in the range 0-255 and convert them into a Buffer
  const pixelData = Buffer.from(distances.map(value => Math.min(Math.max(value, 0), 255)));

  // Create the image using sharp
  await sharp(pixelData, {
    raw: {
      width: gridWidth,
      height: gridHeight,
      channels: 1, // 1 channel for grayscale
    },
  })
    .toFile(outputPath)
    .then(() => {
      console.log(`Image created successfully and saved to ${outputPath}`);
    })
    .catch(err => {
      console.error('Error creating the image:', err);
    });
}
