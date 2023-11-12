import { Point } from "./types";


function calculateTorusDistance(point1: Point, point2: Point, width: number, height: number): number {
  const dx = Math.abs(point1.x - point2.x);
  const dy = Math.abs(point1.y - point2.y);

  // If the distance is greater than half the grid size, we consider the wraparound distance
  const wrappedDx = Math.min(dx, width - dx);
  const wrappedDy = Math.min(dy, height - dy);

  return Math.sqrt(wrappedDx * wrappedDx + wrappedDy * wrappedDy);
}

function findNearestTorusDistance(x: number, y: number, points: Point[], width: number, height: number): number {
  let nearestDistance = Number.MAX_VALUE;
  for (const point of points) {
    const distance = calculateTorusDistance({ x, y }, point, width, height);
    if (distance < nearestDistance) {
      nearestDistance = distance;
    }
  }
  return nearestDistance;
}

const normalizeDistances = (distances: number[], gamma: number = 1.0): number[] => {
  const maxDistance = Math.max(...distances);
  const minDistance = Math.min(...distances);
  return distances.map(dist => {
    // Apply a gamma correction to the distance to bias towards white
    const correctedDistance = Math.pow((dist - minDistance) / (maxDistance - minDistance), gamma);
    return correctedDistance * 255;
  });
};

export const getNormalizedDistances = ({
  gridWidth,
  gridHeight,
  points,
  gamma,
}: {
  gridWidth: number,
  gridHeight: number,
  points: Point[],
  gamma?: number
}): number[] => {
  let distanceValues: number[] = [];
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const nearestDistance = findNearestTorusDistance(x, y, points, gridWidth, gridHeight);
      distanceValues.push(nearestDistance);
    }
  }

  // Normalize the distance values to a range of 0-255
  return normalizeDistances(distanceValues, gamma);
}
