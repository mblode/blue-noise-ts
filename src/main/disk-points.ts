import { Point } from "./types";

export const generateTorusDiskPoints = ({ gridWidth, gridHeight, n }: { gridWidth: number, gridHeight: number, n: number }): Point[] => {
  // Simplified random number generator
  const rng = Math.random;

  // TorusDiskSample generator function (simplified from your provided code)
  function* TorusDiskSample(width: number, height: number, n: number) {
    const k = 50; // maximum number of samples before rejection (use 13 or more for higher quality)
    const m = 4; // a number mutually prime to k
    const radius2 = (0.69 * (width * height)) / n;
    const radius = Math.sqrt(radius2);
    const cellSize = 1 / (radius * Math.SQRT1_2);
    const gridWidth = Math.ceil(width * cellSize) + 4; // pad grid by 2 on each side
    const gridHeight = Math.ceil(height * cellSize) + 4;
    const grid = new Float64Array(2 * gridWidth * gridHeight).fill(Infinity);
    const queue = [];
    const rotx = Math.cos((2 * Math.PI * m) / k);
    const roty = Math.sin((2 * Math.PI * m) / k);

    // Pick the first sample near the center
    yield sample(width * rng(), height * rng(), null);

    // Pick a random existing sample from the queue.
    pick: while (queue.length) {
      const i = (rng() * queue.length) | 0;
      const parent = queue[i];
      const t = tanpi_2(2 * rng() - 1);
      const q = 1 / (1 + t * t);
      const epsilon = 1e-6;
      let dw, dx, dy;
      dx = q ? (1 - t * t) * q : -1; // [dx, dy] = random unit vector
      dy = q ? 2 * t * q : 0;

      // Make a new candidate.
      for (let j = 0; j < k; ++j) {
        dw = dx * rotx - dy * roty; // temporary name for dx
        dy = dx * roty + dy * rotx;
        dx = dw;
        const rand0 = rng();
        const rand1 = rng();
        const r = (radius + epsilon) * (1 + 0.65 * rand0 * rand1);
        const x = (parent[0] + r * dx + width) % width; // wrap
        const y = (parent[1] + r * dy + height) % height;

        // Accept candidates that are inside the allowed extent
        // and farther than 2 * radius to all existing samples.
        if (far(x, y)) {
          yield sample(x, y);
          continue pick;
        }
      }

      // If none of k candidates were accepted, remove the point from the queue.
      const r = queue.pop();
      if (i < queue.length) queue[i] = r;
    }

    // fast approximation of tan(πx/2)
    function tanpi_2(a) {
      let b = 1 - a * a;
      return a * (-0.0187108 * b + 0.31583526 + 1.27365776 / b);
    }

    function far(x, y) {
      const j0 = (y * cellSize) | 0;
      const i0 = (x * cellSize) | 0;
      for (let j = j0; j < j0 + 5; ++j) {
        const index0 = 2 * (j * gridWidth + i0);
        for (let i = index0; i < index0 + 10; i += 2) {
          let dx = grid[i] - x;
          let dy = grid[i + 1] - y;
          dx -= width * Math.round(dx * (1 / width));
          dy -= height * Math.round(dy * (1 / height));
          if (dx * dx + dy * dy < radius2) return false;
        }
      }
      return true;
    }

    function populate_grid(i, j, x, y) {
      const jpad = j + 2, ipad = i + 2
      const index = 2 * (gridWidth * jpad + ipad);
      grid[index] = x;
      grid[index + 1] = y;
    }
    function flip(i, w) {
      return i - w + 2 * w * (i < (w >>> 1));
    }

    function sample(x, y) {
      const s = [x, y];
      const w = gridWidth - 4, h = gridHeight - 4;
      const xg = (x * cellSize) | 0;
      const yg = (y * cellSize) | 0;

      populate_grid(xg, yg, x, y);
      // if we are near an edge of the grid, also save
      // the sample in the grid padding on the opposite side
      const xg_near_side = (xg >= w - 2) | (xg < 2);
      const yg_near_side = (yg >= h - 2) | (yg < 2);
      if (xg_near_side) {
        populate_grid(flip(xg, w), yg, x, y);
        if (yg_near_side) populate_grid(flip(xg, w), flip(yg, h), x, y);
      }
      if (yg_near_side) populate_grid(xg, flip(yg, h), x, y);

      queue.push(s);
      return s;
    }
  }

  // Generate points using the TorusDiskSample generator
  const points = Array.from(TorusDiskSample(gridWidth, gridHeight, n));

  // Transform the points array to a more convenient format (array of {x, y})
  return points.map(point => ([point[0], point[1]]));
}

