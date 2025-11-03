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
    private width;
    private height;
    private area;
    private sigma;
    private initialDensity;
    private random;
    private bitmap;
    private rank;
    private energy;
    private useFFT;
    private fft2D;
    private gaussianKernel;
    constructor(config: BlueNoiseConfig);
    private isPowerOfTwo;
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
     * Count number of 1s in the bitmap
     */
    private countOnes;
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
//# sourceMappingURL=generator_new.d.ts.map