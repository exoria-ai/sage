/**
 * Get Solano Context Tool
 *
 * Retrieves detailed reference material from the SAGE knowledge base
 * for interpreting GIS results and understanding Solano County processes.
 */

import { promises as fs } from 'fs';
import path from 'path';

interface ContextResult {
  success: boolean;
  topic?: string;
  content?: string;
  available_topics?: string[];
  error_type?: string;
  message?: string;
  suggestion?: string;
}

// Map of topics to reference files
const TOPIC_MAP: Record<string, { file: string; description: string }> = {
  jurisdiction: {
    file: 'jurisdiction.md',
    description: 'City vs county routing, incorporated cities, common pitfalls',
  },
  zoning: {
    file: 'zoning-codes.md',
    description: 'Zoning code meanings, residential/agricultural/commercial zones',
  },
  'zoning-codes': {
    file: 'zoning-codes.md',
    description: 'Zoning code meanings, residential/agricultural/commercial zones',
  },
  prop13: {
    file: 'prop13.md',
    description: 'Assessed vs market value, Proposition 13 and 8 explanations',
  },
  'assessed-value': {
    file: 'prop13.md',
    description: 'Assessed vs market value, Proposition 13 and 8 explanations',
  },
  adu: {
    file: 'adu-rules.md',
    description: 'ADU/JADU requirements, state law, county and city rules',
  },
  'accessory-dwelling': {
    file: 'adu-rules.md',
    description: 'ADU/JADU requirements, state law, county and city rules',
  },
  flood: {
    file: 'flood-zones.md',
    description: 'FEMA flood zones, SFHA, insurance requirements, BFE',
  },
  'flood-zone': {
    file: 'flood-zones.md',
    description: 'FEMA flood zones, SFHA, insurance requirements, BFE',
  },
  fire: {
    file: 'fire-hazard.md',
    description: 'Fire hazard severity zones, defensible space, Chapter 7A',
  },
  'fire-hazard': {
    file: 'fire-hazard.md',
    description: 'Fire hazard severity zones, defensible space, Chapter 7A',
  },
  fhsz: {
    file: 'fire-hazard.md',
    description: 'Fire hazard severity zones, defensible space, Chapter 7A',
  },
  contacts: {
    file: 'contacts.md',
    description: 'Department phone numbers, emails, and addresses',
  },
  'special-districts': {
    file: 'special-districts.md',
    description: 'Fire, water, sewer, school districts',
  },
  districts: {
    file: 'special-districts.md',
    description: 'Fire, water, sewer, school districts',
  },
  disclaimers: {
    file: 'disclaimers.md',
    description: 'Standard disclaimer language for different contexts',
  },
};

// Get the references directory path
function getReferencesDir(): string {
  // In Next.js, we need to handle both development and production paths
  // process.cwd() should give us the project root
  return path.join(process.cwd(), 'references');
}

export async function getSolanoContext(args: {
  topic: string;
}): Promise<ContextResult> {
  const { topic } = args;

  // Normalize topic to lowercase
  const normalizedTopic = topic.toLowerCase().trim();

  // Check if topic exists
  const topicInfo = TOPIC_MAP[normalizedTopic];

  if (!topicInfo) {
    // Return available topics
    const availableTopics = Object.entries(TOPIC_MAP)
      .filter(([key], index, arr) => {
        // Dedupe by file (some topics map to same file)
        return arr.findIndex(([, v]) => v.file === TOPIC_MAP[key]!.file) === index;
      })
      .map(([key, value]) => `${key}: ${value.description}`);

    return {
      success: false,
      error_type: 'UNKNOWN_TOPIC',
      message: `Unknown topic: "${topic}"`,
      suggestion: 'Use one of the available topics listed below',
      available_topics: availableTopics,
    };
  }

  try {
    const referencesDir = getReferencesDir();
    const filePath = path.join(referencesDir, topicInfo.file);

    const content = await fs.readFile(filePath, 'utf-8');

    return {
      success: true,
      topic: normalizedTopic,
      content,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Check if it's a file not found error
    if (errorMessage.includes('ENOENT')) {
      return {
        success: false,
        error_type: 'FILE_NOT_FOUND',
        message: `Reference file not found: ${topicInfo.file}`,
        suggestion: 'The reference file may not be deployed. Contact administrator.',
      };
    }

    return {
      success: false,
      error_type: 'READ_ERROR',
      message: `Failed to read reference file: ${errorMessage}`,
      suggestion: 'Try again or contact administrator if the problem persists.',
    };
  }
}

/**
 * List all available topics without retrieving content
 */
export function listAvailableTopics(): string[] {
  const uniqueTopics = new Map<string, string>();

  for (const [key, value] of Object.entries(TOPIC_MAP)) {
    // Use file as key to dedupe
    if (!uniqueTopics.has(value.file)) {
      uniqueTopics.set(value.file, `${key}: ${value.description}`);
    }
  }

  return Array.from(uniqueTopics.values());
}
