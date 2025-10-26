# Blue Noise Dithering

A TypeScript implementation of blue noise dithering for images, inspired by the Rust version.

## Installation

```bash
npm install
```

## Usage

The tool uses `noise.png` as the default blue noise texture to dither input images.

### Basic usage

```bash
npm run dither <input-image>
```

### With custom colors

```bash
npm run dither <input-image> -- -f <foreground-hex> -b <background-hex>
```

### Examples

```bash
# Black and white (default)
npm run dither input/claude-shannon-mouse-mit-00.jpg

# Custom colors
npm run dither input/claude-shannon-mouse-mit-00.jpg -- -f "#ff0000" -b "#ffffff"

# Different noise texture
npm run dither input/claude-shannon-mouse-mit-00.jpg -- -n custom-noise.png
```

## CLI Options

- `<input>` - Path to input image (required)
- `-o, --output <path>` - Output directory (default: "output")
- `-n, --noise <path>` - Path to blue noise texture (default: "./noise.png")
- `-f, --foreground <hex>` - Foreground color in hex (default: "#000000")
- `-b, --background <hex>` - Background color in hex (default: "#ffffff")

## How it works

1. Loads the blue noise texture (`noise.png`) as a grayscale image
2. Converts the input image to grayscale
3. For each pixel, compares the input image luminance with the noise texture (tiled if needed)
4. If the image pixel is brighter than the noise pixel, uses the foreground color; otherwise uses the background color

This creates a dithered effect that preserves the visual information while using only two colors.
