import sharp from 'sharp';
import { Point } from './types';

export const createImageFromPoints = async ({ points, gridWidth, gridHeight, imageBase }: { points: Point[], gridWidth: number, gridHeight: number, imageBase: string }) => {
  const outputPath = `./output/main/${imageBase}-points.png`;
  // Create a buffer with the size of the image, filled with white pixels (255)
  // For a grayscale image, each pixel is represented by a single byte
  const buffer = Buffer.alloc(gridWidth * gridHeight, 255);

  // Iterate over the points and set the corresponding pixels to black (0)
  points.forEach(point => {
    const x = Math.round(point[0]);
    const y = Math.round(point[1]);

    if (x < gridWidth && y < gridHeight) {
      const index = y * gridWidth + x; // Calculate the buffer index
      buffer[index] = 0; // Set the pixel value to black
    }
  });

  // Use sharp to create the image from the buffer
  await sharp(buffer, {
    raw: {
      width: gridWidth,
      height: gridHeight,
      channels: 1, // Grayscale image has one channel
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
