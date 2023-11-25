import { processImage } from "./dither-image";
import { createImageFromDistances } from "./distances-image";
import { getNormalizedDistances } from "./normalize";
import { createImageFromPoints } from "./points-image";
import PoissonDiskSampling from 'poisson-disk-sampling'

const inputPath = '4 copy.png'
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
});

const points = p.fill();

const distances = getNormalizedDistances({ gridWidth, gridHeight, points, gamma });
createImageFromPoints({ points, gridWidth, gridHeight, imageBase })
createImageFromDistances({ distances, gridWidth, gridHeight, imageBase });
processImage({ inputPath, distances, gridWidth, gridHeight, imageBase });


