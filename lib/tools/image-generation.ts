/**
 * Image generation tools using fal.ai Nano Banana Pro.
 *
 * Cost control is handled by fal.ai account top-up balance.
 */

import { fal } from '@fal-ai/client';

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
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during image generation',
    };
  }
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
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during image editing',
    };
  }
}
