import { processImage } from "./dither-image";
import { createImageFromDistances } from "./distances-image";
import { getNormalizedDistances } from "./normalize";
import { generateTorusDiskPoints } from "./disk-points";
import { createImageFromPoints } from "./points-image";
import PoissonDiskSampling from 'poisson-disk-sampling'

const inputPath = '2.jpg'
const imageBase = 'f'
const gridWidth = 256; // Define the width of the sampling area
const gridHeight = 256; // Define the height of the sampling area
const gamma = 0.5
const n = Math.pow(gridWidth, 2)

var p = new PoissonDiskSampling({
  shape: [gridWidth, gridHeight],
  minDistance: 2,
  maxDistance: 4,
  tries: 50,
  // distanceFunction: function (point) {
  //   // Custom distance function for the flat torus
  //   // Implement the toroidal projection here
  //   // For example, you can use modulo to wrap points around the torus
  //   const x = (point[0] % gridWidth + gridWidth) % gridWidth;
  //   const y = (point[1] % gridHeight + gridHeight) % gridHeight;
  //   return Math.sqrt(x * x + y * y) / gridWidth; // Adjust as needed
  // },
});

const points = p.fill();
// const points = generateTorusDiskPoints({ gridWidth, gridHeight, n });

const distances = getNormalizedDistances({ gridWidth, gridHeight, points, gamma });
createImageFromPoints({ points, gridWidth, gridHeight, imageBase })
createImageFromDistances({ distances, gridWidth, gridHeight, imageBase });
processImage({ inputPath, distances, gridWidth, gridHeight, imageBase });


// for (let i = 1; i < 10; i++) {
//   const distances = getNormalizedDistances({ gridWidth, gridHeight, points, gamma: i * 0.15 });
//   // createImageFromPoints({ points, gridWidth, gridHeight, imageBase })
//   // createImageFromDistances({ distances, gridWidth, gridHeight, imageBase });
//   processImage({ inputPath, distances, gridWidth, gridHeight, imageBase: `${imageBase}-${i}` });
// }




