import sharp from "sharp";

const noise = await sharp("blue-noise.png").metadata();
console.log("Noise dimensions:", noise.width, "x", noise.height);

const input = await sharp("input/claude-shannon-mouse-mit-00.jpg").metadata();
console.log("Input dimensions:", input.width, "x", input.height);
