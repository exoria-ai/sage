/**
 * Image generation tools using fal.ai Nano Banana Pro.
 *
 * Cost control is handled by fal.ai account top-up balance.
 *
 * Returns both image URLs (for user) and base64 data (for agent to view).
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

interface ImageData {
  url: string;
  base64: string;
  mimeType: string;
  file_name: string;
}

interface GenerateImageResult {
  success: boolean;
  images?: ImageData[];
  description?: string;
  error?: string;
}

/**
 * Fetch image from URL and convert to base64.
 */
async function fetchImageAsBase64(url: string, contentType: string): Promise<{ base64: string; mimeType: string }> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');

  // Determine mime type from content-type header or fallback
  const mimeType = response.headers.get('content-type') || contentType || 'image/png';

  return { base64, mimeType };
}

// Maximum prompt length for fal.ai models (conservative limit)
const MAX_PROMPT_LENGTH = 500;

/**
 * Truncate prompt to max length while preserving meaning.
 * Tries to break at sentence boundaries.
 */
function truncatePrompt(prompt: string, maxLength: number = MAX_PROMPT_LENGTH): { text: string; wasTruncated: boolean } {
  if (prompt.length <= maxLength) {
    return { text: prompt, wasTruncated: false };
  }

  // Try to find a good break point (end of sentence)
  let truncated = prompt.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastComma = truncated.lastIndexOf(',');

  if (lastPeriod > maxLength * 0.6) {
    truncated = truncated.substring(0, lastPeriod + 1);
  } else if (lastComma > maxLength * 0.6) {
    truncated = truncated.substring(0, lastComma);
  } else {
    // Just cut at word boundary
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > maxLength * 0.8) {
      truncated = truncated.substring(0, lastSpace);
    }
  }

  return { text: truncated.trim(), wasTruncated: true };
}

/**
 * Generate images using Nano Banana Pro.
 *
 * Returns both:
 * - Image URLs (for sharing with user - they can't see images otherwise)
 * - Base64 image data (for agent to view what was generated)
 */
export async function generateImage(params: GenerateImageParams): Promise<GenerateImageResult> {
  const {
    prompt: rawPrompt,
    aspect_ratio = '16:9',
    resolution = '1K',
    output_format = 'png',
    num_images = 1,
  } = params;

  // Truncate prompt if too long (prevents API errors)
  const { text: prompt, wasTruncated } = truncatePrompt(rawPrompt);

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

    const rawImages = (result.data as { images: Array<{ url: string; file_name: string; content_type: string }> }).images;
    const description = (result.data as { description?: string }).description;

    // Fetch each image and convert to base64
    const images: ImageData[] = await Promise.all(
      rawImages.map(async (img) => {
        const { base64, mimeType } = await fetchImageAsBase64(img.url, img.content_type);
        return {
          url: img.url,
          base64,
          mimeType,
          file_name: img.file_name,
        };
      })
    );

    return {
      success: true,
      images,
      description: wasTruncated
        ? `${description || ''} (Note: Prompt was truncated from ${rawPrompt.length} to ${prompt.length} characters for API compatibility)`
        : description,
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
  images?: ImageData[];
  description?: string;
  error?: string;
}

/**
 * Edit images using Nano Banana Pro.
 *
 * Takes one or more source image URLs and a prompt describing the desired edits.
 * Can combine multiple images, add annotations, modify content, etc.
 *
 * Returns both:
 * - Image URLs (for sharing with user - they can't see images otherwise)
 * - Base64 image data (for agent to view what was generated)
 */
export async function editImage(params: EditImageParams): Promise<EditImageResult> {
  const {
    prompt: rawPrompt,
    image_urls,
    aspect_ratio = 'auto',
    resolution = '1K',
    output_format = 'png',
    num_images = 1,
  } = params;

  // Truncate prompt if too long (prevents API errors)
  const { text: prompt, wasTruncated } = truncatePrompt(rawPrompt);

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

    const rawImages = (result.data as { images: Array<{ url: string; file_name: string; content_type: string }> }).images;
    const description = (result.data as { description?: string }).description;

    // Fetch each image and convert to base64
    const images: ImageData[] = await Promise.all(
      rawImages.map(async (img) => {
        const { base64, mimeType } = await fetchImageAsBase64(img.url, img.content_type);
        return {
          url: img.url,
          base64,
          mimeType,
          file_name: img.file_name,
        };
      })
    );

    return {
      success: true,
      images,
      description: wasTruncated
        ? `${description || ''} (Note: Prompt was truncated from ${rawPrompt.length} to ${prompt.length} characters for API compatibility)`
        : description,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during image editing',
    };
  }
}
