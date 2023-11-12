import { processImage } from "./dither-image";
import { createImageFromDistances } from "./distances-image";
import { getNormalizedDistances } from "./normalize";
import { generateTorusDiskPoints } from "./disk-points";
import { createImageFromPoints } from "./points-image";

const inputPath = '3.webp'
const imageBase = '3.3'
const base = 18
const gridWidth = Math.pow(base, 2); // Define the width of the sampling area
const gridHeight = Math.pow(base, 2); // Define the height of the sampling area
const n = Math.pow(base, 4); // Define the number of points
const gamma = 0.65

const points = generateTorusDiskPoints({ gridWidth, gridHeight, n });

const distances = getNormalizedDistances({ gridWidth, gridHeight, points, gamma });

createImageFromPoints({ points, gridWidth, gridHeight, imageBase })
createImageFromDistances({ distances, gridWidth, gridHeight, imageBase });
processImage({ inputPath, distances, gridWidth, gridHeight, imageBase });
