/**
 * Image Generation Tool Definitions
 *
 * AI-powered infographic and image editing tools.
 */

import { z } from 'zod';
import { defineTool, ToolResponse } from '../types';
import { generateImage, editImage } from '../image-generation';

export const generateInfographicTool = defineTool({
  name: 'generate_infographic',
  description: `Generate infographics, diagrams, and visualizations using AI.

**CRITICAL**: This tool returns image URLs. You MUST include these URLs in your response
to the user so they can view the generated infographics. Format as clickable markdown links.

Intended uses:
- Create infographics explaining county data, zoning, or processes
- Generate presentation slides for staff meetings
- Create diagrams illustrating geographic concepts
- Visualize organizational structures or workflows
- Generate educational materials about county services

Aspect ratios:
- 16:9: Presentations, slides (default)
- 1:1: Square infographics
- 4:3: Traditional presentations
- 9:16: Mobile/portrait infographics
- 21:9: Ultra-wide banners`,
  schema: {
    prompt: z.string().describe('Detailed description of the image to generate. Be specific about style, content, layout, and any text to include.'),
    aspect_ratio: z.enum(['21:9', '16:9', '3:2', '4:3', '5:4', '1:1', '4:5', '3:4', '2:3', '9:16']).optional().describe('Aspect ratio of the image. Default: 16:9 (good for presentations)'),
    resolution: z.enum(['1K', '2K', '4K']).optional().describe('Image resolution. Default: 1K. Use 2K or 4K for higher quality.'),
    output_format: z.enum(['jpeg', 'png', 'webp']).optional().describe('Output format. Default: png'),
    num_images: z.number().min(1).max(4).optional().describe('Number of images to generate (1-4). Default: 1'),
  },
  handler: async ({ prompt, aspect_ratio, resolution, output_format, num_images }): Promise<ToolResponse> => {
    const result = await generateImage({
      prompt,
      aspect_ratio,
      resolution,
      output_format,
      num_images,
    });

    // If successful, return image content blocks so agent can see them
    if (result.success && result.images && result.images.length > 0) {
      // Build content array with proper types
      const imageBlocks = result.images.map((img) => ({
        type: 'image' as const,
        data: img.base64,
        mimeType: img.mimeType,
      }));

      const urls = result.images.map((img) => img.url).join('\n');
      const textBlock = {
        type: 'text' as const,
        text: `Infographic generated successfully.

**IMPORTANT - Share these URLs with the user (they cannot see the images otherwise):**
${urls}

${result.description ? `Description: ${result.description}` : ''}`,
      };

      return {
        content: [...imageBlocks, textBlock],
      };
    }

    // Error case
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  },
});

export const editImageTool = defineTool({
  name: 'edit_image',
  description: `Edit or combine images using AI.

**CRITICAL**: This tool returns image URLs. You MUST include these URLs in your response
to the user so they can view the edited images. Format as clickable markdown links.

Capabilities:
- Modify existing images based on text prompts
- Combine multiple images into one
- Add annotations, labels, or callouts
- Change style, colors, or composition
- Remove or add elements

Input images:
- Use URLs from previous generate_infographic calls
- Use any publicly accessible image URL
- Can provide multiple images to combine/reference`,
  schema: {
    prompt: z.string().describe('Description of the edits to make. Be specific about what to change, add, or remove.'),
    image_urls: z.array(z.string()).describe('URLs of source images to edit. Can be FAL URLs from previous generations or any public image URL.'),
    aspect_ratio: z.enum(['auto', '21:9', '16:9', '3:2', '4:3', '5:4', '1:1', '4:5', '3:4', '2:3', '9:16']).optional().describe('Aspect ratio. Default: auto (preserves original)'),
    resolution: z.enum(['1K', '2K', '4K']).optional().describe('Output resolution. Default: 1K'),
    output_format: z.enum(['jpeg', 'png', 'webp']).optional().describe('Output format. Default: png'),
    num_images: z.number().min(1).max(4).optional().describe('Number of variations to generate (1-4). Default: 1'),
  },
  handler: async ({ prompt, image_urls, aspect_ratio, resolution, output_format, num_images }): Promise<ToolResponse> => {
    const result = await editImage({
      prompt,
      image_urls,
      aspect_ratio,
      resolution,
      output_format,
      num_images,
    });

    // If successful, return image content blocks so agent can see them
    if (result.success && result.images && result.images.length > 0) {
      // Build content array with proper types
      const imageBlocks = result.images.map((img) => ({
        type: 'image' as const,
        data: img.base64,
        mimeType: img.mimeType,
      }));

      const urls = result.images.map((img) => img.url).join('\n');
      const textBlock = {
        type: 'text' as const,
        text: `Image edited successfully.

**IMPORTANT - Share these URLs with the user (they cannot see the images otherwise):**
${urls}

${result.description ? `Description: ${result.description}` : ''}`,
      };

      return {
        content: [...imageBlocks, textBlock],
      };
    }

    // Error case
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  },
});

/** All image generation tools */
export const imageGenerationTools = [generateInfographicTool, editImageTool];
