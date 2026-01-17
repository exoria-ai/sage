/**
 * Image generation tools using fal.ai Nano Banana Pro.
 *
 * Rate limited to prevent runaway costs ($10/day max at $0.15/image).
 */

import { fal } from '@fal-ai/client';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

// Rate limiting configuration
const COST_PER_IMAGE = 0.15; // dollars
const DAILY_BUDGET = 10.0; // dollars
const MAX_IMAGES_PER_DAY = Math.floor(DAILY_BUDGET / COST_PER_IMAGE); // ~66 images

// Rate limit state file
const RATE_LIMIT_FILE = path.join(process.cwd(), 'data', '.image-rate-limit.json');

interface RateLimitState {
  date: string; // YYYY-MM-DD
  count: number;
  totalCost: number;
}

/**
 * Load rate limit state from file.
 */
function loadRateLimitState(): RateLimitState {
  const today = new Date().toISOString().slice(0, 10);

  if (!existsSync(RATE_LIMIT_FILE)) {
    return { date: today, count: 0, totalCost: 0 };
  }

  try {
    const content = readFileSync(RATE_LIMIT_FILE, 'utf-8');
    const state = JSON.parse(content) as RateLimitState;

    // Reset if it's a new day
    if (state.date !== today) {
      return { date: today, count: 0, totalCost: 0 };
    }

    return state;
  } catch {
    return { date: today, count: 0, totalCost: 0 };
  }
}

/**
 * Save rate limit state to file.
 */
function saveRateLimitState(state: RateLimitState): void {
  // Ensure data directory exists
  const dataDir = path.dirname(RATE_LIMIT_FILE);
  if (!existsSync(dataDir)) {
    const { mkdirSync } = require('fs');
    mkdirSync(dataDir, { recursive: true });
  }

  writeFileSync(RATE_LIMIT_FILE, JSON.stringify(state, null, 2));
}

/**
 * Check if we can generate more images today.
 */
function checkRateLimit(numImages: number = 1): { allowed: boolean; message?: string; remaining: number } {
  const state = loadRateLimitState();
  const remaining = MAX_IMAGES_PER_DAY - state.count;

  if (state.count + numImages > MAX_IMAGES_PER_DAY) {
    return {
      allowed: false,
      message: `Daily image limit reached. Generated ${state.count}/${MAX_IMAGES_PER_DAY} images today ($${state.totalCost.toFixed(2)}/$${DAILY_BUDGET} budget). Resets at midnight.`,
      remaining: Math.max(0, remaining),
    };
  }

  return { allowed: true, remaining };
}

/**
 * Record image generation for rate limiting.
 */
function recordGeneration(numImages: number): void {
  const state = loadRateLimitState();
  state.count += numImages;
  state.totalCost += numImages * COST_PER_IMAGE;
  saveRateLimitState(state);
}

// Types
type AspectRatio = '21:9' | '16:9' | '3:2' | '4:3' | '5:4' | '1:1' | '4:5' | '3:4' | '2:3' | '9:16';
type Resolution = '1K' | '2K' | '4K';
type OutputFormat = 'jpeg' | 'png' | 'webp';

interface GenerateImageParams {
  prompt: string;
  aspect_ratio?: AspectRatio;
  resolution?: Resolution;
  output_format?: OutputFormat;
  num_images?: number;
}

interface GenerateImageResult {
  success: boolean;
  images?: Array<{
    url: string;
    file_name: string;
    content_type: string;
  }>;
  description?: string;
  error?: string;
  rate_limit?: {
    images_generated_today: number;
    images_remaining_today: number;
    daily_budget_used: string;
  };
}

/**
 * Generate images using Nano Banana Pro.
 *
 * IMPORTANT: Returns image URLs that MUST be included in the response to the user.
 * The agent should always display these URLs as clickable links.
 */
export async function generateImage(params: GenerateImageParams): Promise<GenerateImageResult> {
  const {
    prompt,
    aspect_ratio = '16:9',
    resolution = '1K',
    output_format = 'png',
    num_images = 1,
  } = params;

  // Check rate limit
  const limitCheck = checkRateLimit(num_images);
  if (!limitCheck.allowed) {
    return {
      success: false,
      error: limitCheck.message,
      rate_limit: {
        images_generated_today: MAX_IMAGES_PER_DAY - limitCheck.remaining,
        images_remaining_today: limitCheck.remaining,
        daily_budget_used: `$${((MAX_IMAGES_PER_DAY - limitCheck.remaining) * COST_PER_IMAGE).toFixed(2)}`,
      },
    };
  }

  // Validate num_images
  const imageCount = Math.min(Math.max(1, num_images), 4);

  // Check API key
  const apiKey = process.env.FAL_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: 'FAL_API_KEY environment variable not set.',
    };
  }

  // Configure fal client
  fal.config({ credentials: apiKey });

  try {
    const result = await fal.subscribe('fal-ai/nano-banana-pro', {
      input: {
        prompt,
        aspect_ratio,
        resolution,
        output_format,
        num_images: imageCount,
      },
    });

    // Record successful generation
    recordGeneration(imageCount);
    const state = loadRateLimitState();

    const images = (result.data as { images: Array<{ url: string; file_name: string; content_type: string }> }).images;
    const description = (result.data as { description?: string }).description;

    return {
      success: true,
      images: images.map((img) => ({
        url: img.url,
        file_name: img.file_name,
        content_type: img.content_type,
      })),
      description,
      rate_limit: {
        images_generated_today: state.count,
        images_remaining_today: MAX_IMAGES_PER_DAY - state.count,
        daily_budget_used: `$${state.totalCost.toFixed(2)}`,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during image generation',
    };
  }
}

/**
 * Get current rate limit status.
 */
export async function getImageRateLimitStatus(): Promise<{
  images_generated_today: number;
  images_remaining_today: number;
  daily_limit: number;
  daily_budget: string;
  budget_used: string;
  cost_per_image: string;
}> {
  const state = loadRateLimitState();
  return {
    images_generated_today: state.count,
    images_remaining_today: MAX_IMAGES_PER_DAY - state.count,
    daily_limit: MAX_IMAGES_PER_DAY,
    daily_budget: `$${DAILY_BUDGET.toFixed(2)}`,
    budget_used: `$${state.totalCost.toFixed(2)}`,
    cost_per_image: `$${COST_PER_IMAGE.toFixed(2)}`,
  };
}

// Edit image types
type EditAspectRatio = 'auto' | AspectRatio;

interface EditImageParams {
  prompt: string;
  image_urls: string[];
  aspect_ratio?: EditAspectRatio;
  resolution?: Resolution;
  output_format?: OutputFormat;
  num_images?: number;
}

interface EditImageResult {
  success: boolean;
  images?: Array<{
    url: string;
    file_name: string;
    content_type: string;
  }>;
  description?: string;
  error?: string;
  rate_limit?: {
    images_generated_today: number;
    images_remaining_today: number;
    daily_budget_used: string;
  };
}

/**
 * Edit images using Nano Banana Pro.
 *
 * Takes one or more source image URLs and a prompt describing the desired edits.
 * Can combine multiple images, add annotations, modify content, etc.
 *
 * IMPORTANT: Returns image URLs that MUST be included in the response to the user.
 * The agent should always display these URLs as clickable links.
 */
export async function editImage(params: EditImageParams): Promise<EditImageResult> {
  const {
    prompt,
    image_urls,
    aspect_ratio = 'auto',
    resolution = '1K',
    output_format = 'png',
    num_images = 1,
  } = params;

  // Validate image_urls
  if (!image_urls || image_urls.length === 0) {
    return {
      success: false,
      error: 'At least one image URL is required for editing.',
    };
  }

  // Check rate limit
  const limitCheck = checkRateLimit(num_images);
  if (!limitCheck.allowed) {
    return {
      success: false,
      error: limitCheck.message,
      rate_limit: {
        images_generated_today: MAX_IMAGES_PER_DAY - limitCheck.remaining,
        images_remaining_today: limitCheck.remaining,
        daily_budget_used: `$${((MAX_IMAGES_PER_DAY - limitCheck.remaining) * COST_PER_IMAGE).toFixed(2)}`,
      },
    };
  }

  // Validate num_images
  const imageCount = Math.min(Math.max(1, num_images), 4);

  // Check API key
  const apiKey = process.env.FAL_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: 'FAL_API_KEY environment variable not set.',
    };
  }

  // Configure fal client
  fal.config({ credentials: apiKey });

  try {
    const result = await fal.subscribe('fal-ai/nano-banana-pro/edit', {
      input: {
        prompt,
        image_urls,
        aspect_ratio,
        resolution,
        output_format,
        num_images: imageCount,
      },
    });

    // Record successful generation
    recordGeneration(imageCount);
    const state = loadRateLimitState();

    const images = (result.data as { images: Array<{ url: string; file_name: string; content_type: string }> }).images;
    const description = (result.data as { description?: string }).description;

    return {
      success: true,
      images: images.map((img) => ({
        url: img.url,
        file_name: img.file_name,
        content_type: img.content_type,
      })),
      description,
      rate_limit: {
        images_generated_today: state.count,
        images_remaining_today: MAX_IMAGES_PER_DAY - state.count,
        daily_budget_used: `$${state.totalCost.toFixed(2)}`,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during image editing',
    };
  }
}
