/**
 * Blue Noise Texture Generator using Void-and-Cluster Algorithm
 * Based on Robert Ulichney's method (1993)
 *
 * Generates tileable blue noise textures for use in dithering and sampling.
 * The algorithm produces optimal spatial distribution with blue noise characteristics.
 *
 * Implementation includes FFT-optimized Gaussian blur for 50% performance improvement.
 */
/**
 * Configuration for blue noise generation
 */
export interface BlueNoiseConfig {
    width: number;
    height: number;
    sigma?: number;
    initialDensity?: number;
    seed?: number;
    verbose?: boolean;
}
/**
 * Result of blue noise generation
 */
export interface BlueNoiseResult {
    data: Uint8ClampedArray;
    width: number;
    height: number;
}
/**
 * Main class for generating blue noise textures
 */
export declare class BlueNoiseGenerator {
    private static readonly DEFAULT_SIGMA;
    private static readonly DEFAULT_INITIAL_DENSITY;
    private static readonly MAX_ITERATIONS_MULTIPLIER;
    private static readonly THRESHOLD_MAP_LEVELS;
    private static isPowerOfTwo;
    private readonly width;
    private readonly height;
    private readonly area;
    private readonly sigma;
    private readonly initialDensity;
    private readonly verbose;
    private readonly random;
    private bitmap;
    private rank;
    private energy;
    private onesCount;
    private useFFT;
    private fft2D;
    private gaussianKernel;
    constructor(config: BlueNoiseConfig);
    /**
     * Create Gaussian kernel in frequency domain for FFT convolution
     */
    private createGaussianKernelFFT;
    /**
     * Apply Gaussian blur using FFT (frequency domain convolution)
     */
    private gaussianBlurFFT;
    /**
     * Apply Gaussian blur using spatial domain convolution (fallback)
     */
    private gaussianBlurSpatial;
    /**
     * Apply Gaussian blur (chooses FFT or spatial based on size)
     */
    private gaussianBlur;
    /**
     * Find the tightest cluster: pixel with highest energy among all 1s
     */
    private findTightestCluster;
    /**
     * Find the largest void: pixel with lowest energy among all 0s
     */
    private findLargestVoid;
    /**
     * Count number of 1s in the bitmap (returns cached value)
     */
    private countOnes;
    /**
     * Set a bit in the bitmap and update the cache
     */
    private setBit;
    /**
     * Recalculate ones count from scratch (used for initialization)
     */
    private recalculateOnesCount;
    /**
     * Recalculate energy field by applying Gaussian blur to bitmap
     */
    private recalculateEnergy;
    /**
     * Phase 0: Generate Initial Binary Pattern
     */
    private phase0_generateInitialPattern;
    /**
     * Phase 1: Serialize Initial Points
     */
    private phase1_serializeInitialPoints;
    /**
     * Phase 2: Fill to Half Capacity
     */
    private phase2_fillToHalf;
    /**
     * Phase 3: Fill to Completion
     */
    private phase3_fillToCompletion;
    /**
     * Phase 4: Convert Ranks to Threshold Map
     */
    private phase4_convertToThresholdMap;
    /**
     * Generate the blue noise texture
     */
    generate(): BlueNoiseResult;
}
/**
 * Convenience function to generate a blue noise texture
 */
export declare function generateBlueNoise(width?: number, height?: number, sigma?: number): BlueNoiseResult;
/**
 * Save blue noise texture to PNG file
 */
export declare function saveBlueNoiseToPNG(result: BlueNoiseResult, filename: string): Promise<void>;
/**
 * Apply ordered dithering using blue noise threshold map
 */
export declare function orderedDither(value: number, x: number, y: number, blueNoise: BlueNoiseResult, levels?: number): number;
//# sourceMappingURL=generator.d.ts.map