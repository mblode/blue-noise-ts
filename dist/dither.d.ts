interface DitherOptions {
    foreground: string;
    background: string;
    noisePath: string;
    width?: number;
    height?: number;
    contrast?: number;
}
/**
 * Apply blue noise dithering to an image
 */
export declare function applyBlueNoiseDither(inputPath: string, outputPath: string, options: DitherOptions): Promise<void>;
export {};
//# sourceMappingURL=dither.d.ts.map