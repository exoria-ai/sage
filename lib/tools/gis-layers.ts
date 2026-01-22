/**
 * GIS Layers Discovery Tool
 *
 * Provides discovery and information about available GIS layers
 * for Solano County from the gis-layers.json catalog.
 */

import { promises as fs } from 'fs';
import * as path from 'path';

// Types matching the gis-layers.json schema
export interface FieldInfo {
  name: string;
  alias: string;
  type: string;
  description?: string;
  isPrimary?: boolean;
}

/** Available download format for a GIS dataset */
export interface DownloadOption {
  /** File format type */
  format: 'shapefile' | 'geodatabase' | 'geojson' | 'csv' | 'lidar' | 'kml' | 'other';
  /** Direct download URL */
  url: string;
  /** File size in bytes (optional, can be fetched dynamically) */
  sizeBytes?: number;
  /** ISO date string of last modification */
  lastModified?: string;
  /** Additional notes about this download */
  notes?: string;
}

export interface GISLayer {
  id: string;
  name: string;
  description: string;
  sourceId: string;
  /** Live service URL for queries - may be empty for download-only datasets */
  serviceUrl: string;
  layerType: 'FeatureServer' | 'MapServer' | 'TileServer' | 'download-only';
  layerIndex?: number;
  category: string;
  tags: string[];
  userQuestions: string[];
  geometryType: 'Point' | 'Polygon' | 'Polyline' | 'MultiPoint';
  spatialReference: number;
  fields: FieldInfo[];
  lookupMethod: 'spatial' | 'attribute' | 'both' | 'download';
  priority: 'high' | 'medium' | 'low';
  coverage: 'countywide' | 'unincorporated' | 'cities' | 'partial';
  updateFrequency?: string;
  dataSource?: string;
  notes?: string;
  relatedLayers?: string[];
  /** URL to metadata page (e.g., ArcGIS Online item page) */
  metadataUrl?: string;
  /** Available file downloads for this dataset */
  downloads?: DownloadOption[];
}

interface GISSource {
  id: string;
  name: string;
  baseUrl: string;
  type: 'county' | 'state' | 'federal' | 'regional';
  maintainer?: string;
  contact?: string;
}

interface GISLayerCatalog {
  version: string;
  lastUpdated: string;
  sources: GISSource[];
  layers: GISLayer[];
}

// Cache for the catalog
let catalogCache: GISLayerCatalog | null = null;

// Index for fast lookups
const layerIndex = new Map<string, GISLayer>();
const tagIndex = new Map<string, Set<string>>(); // tag -> layer IDs
const categoryIndex = new Map<string, Set<string>>(); // category -> layer IDs

/**
 * Get the data directory path
 */
function getDataDir(): string {
  return path.join(process.cwd(), 'data');
}

/**
 * Load the catalog from disk and build indexes
 */
async function loadCatalog(): Promise<GISLayerCatalog> {
  if (catalogCache) {
    return catalogCache;
  }

  const filePath = path.join(getDataDir(), 'gis-layers.json');
  const content = await fs.readFile(filePath, 'utf-8');
  const catalog: GISLayerCatalog = JSON.parse(content);

  // Build indexes
  for (const layer of catalog.layers) {
    layerIndex.set(layer.id.toLowerCase(), layer);

    // Index by category
    if (!categoryIndex.has(layer.category)) {
      categoryIndex.set(layer.category, new Set());
    }
    categoryIndex.get(layer.category)!.add(layer.id);

    // Index by tags
    for (const tag of layer.tags) {
      const tagLower = tag.toLowerCase();
      if (!tagIndex.has(tagLower)) {
        tagIndex.set(tagLower, new Set());
      }
      tagIndex.get(tagLower)!.add(layer.id);
    }
  }

  catalogCache = catalog;
  return catalog;
}

/**
 * List available categories
 */
export async function listGISCategories(): Promise<{
  success: boolean;
  categories?: Array<{
    category: string;
    layerCount: number;
    examples: string[];
  }>;
  error_type?: string;
  message?: string;
}> {
  try {
    const catalog = await loadCatalog();

    const categories: Array<{
      category: string;
      layerCount: number;
      examples: string[];
    }> = [];

    for (const [category, layerIds] of categoryIndex) {
      const layers = Array.from(layerIds)
        .map(id => layerIndex.get(id.toLowerCase()))
        .filter((l): l is GISLayer => l !== undefined);

      categories.push({
        category,
        layerCount: layers.length,
        examples: layers.slice(0, 3).map(l => l.name),
      });
    }

    // Sort by layer count descending
    categories.sort((a, b) => b.layerCount - a.layerCount);

    return {
      success: true,
      categories,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'READ_ERROR',
      message: `Failed to read GIS catalog: ${errorMessage}`,
    };
  }
}

/**
 * List layers in a category
 */
export async function listGISLayers(args: {
  category?: string;
  priority?: 'high' | 'medium' | 'low';
}): Promise<{
  success: boolean;
  layers?: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
    priority: string;
    coverage: string;
    serviceUrl: string;
    geometryType: string;
  }>;
  total?: number;
  error_type?: string;
  message?: string;
  suggestion?: string;
}> {
  const { category, priority } = args;

  try {
    const catalog = await loadCatalog();

    let layers = catalog.layers;

    // Filter by category
    if (category) {
      const categoryLower = category.toLowerCase();
      layers = layers.filter(l => l.category.toLowerCase() === categoryLower);

      if (layers.length === 0) {
        const validCategories = Array.from(categoryIndex.keys()).join(', ');
        return {
          success: false,
          error_type: 'CATEGORY_NOT_FOUND',
          message: `No layers found in category "${category}"`,
          suggestion: `Available categories: ${validCategories}`,
        };
      }
    }

    // Filter by priority
    if (priority) {
      layers = layers.filter(l => l.priority === priority);
    }

    // Sort by priority (high first), then by name
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    layers.sort((a, b) => {
      const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (pDiff !== 0) return pDiff;
      return a.name.localeCompare(b.name);
    });

    return {
      success: true,
      layers: layers.map(l => ({
        id: l.id,
        name: l.name,
        description: l.description,
        category: l.category,
        priority: l.priority,
        coverage: l.coverage,
        serviceUrl: l.serviceUrl,
        geometryType: l.geometryType,
      })),
      total: layers.length,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'READ_ERROR',
      message: `Failed to read GIS catalog: ${errorMessage}`,
    };
  }
}

/**
 * Get detailed info about a specific layer
 */
export async function getGISLayerDetails(args: {
  layerId: string;
}): Promise<{
  success: boolean;
  layer?: GISLayer & { source?: GISSource };
  error_type?: string;
  message?: string;
  suggestion?: string;
}> {
  const { layerId } = args;

  if (!layerId) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Layer ID is required',
      suggestion: 'Use search_gis_layers or list_gis_layers to find layer IDs',
    };
  }

  try {
    const catalog = await loadCatalog();

    const layer = layerIndex.get(layerId.toLowerCase());

    if (!layer) {
      return {
        success: false,
        error_type: 'LAYER_NOT_FOUND',
        message: `Layer "${layerId}" not found`,
        suggestion: 'Use search_gis_layers to find layers by keyword',
      };
    }

    // Find the source
    const source = catalog.sources.find(s => s.id === layer.sourceId);

    return {
      success: true,
      layer: {
        ...layer,
        source,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'READ_ERROR',
      message: `Failed to read GIS catalog: ${errorMessage}`,
    };
  }
}

/**
 * Search layers by keyword
 */
export async function searchGISLayers(args: {
  query: string;
  category?: string;
  maxResults?: number;
}): Promise<{
  success: boolean;
  results?: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
    serviceUrl: string;
    matchType: 'name' | 'tag' | 'question' | 'description';
    matchedText?: string;
  }>;
  totalMatches?: number;
  error_type?: string;
  message?: string;
}> {
  const { query, category, maxResults = 10 } = args;

  if (!query || query.length < 2) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Search query must be at least 2 characters',
    };
  }

  try {
    const catalog = await loadCatalog();
    const queryLower = query.toLowerCase();

    const results: Array<{
      id: string;
      name: string;
      description: string;
      category: string;
      serviceUrl: string;
      matchType: 'name' | 'tag' | 'question' | 'description';
      matchedText?: string;
      score: number;
    }> = [];

    for (const layer of catalog.layers) {
      // Filter by category if specified
      if (category && layer.category.toLowerCase() !== category.toLowerCase()) {
        continue;
      }

      let matchType: 'name' | 'tag' | 'question' | 'description' | null = null;
      let matchedText: string | undefined;
      let score = 0;

      // Check name (highest priority)
      if (layer.name.toLowerCase().includes(queryLower)) {
        matchType = 'name';
        matchedText = layer.name;
        score = 100;
      }
      // Check tags
      else if (layer.tags.some(t => t.toLowerCase().includes(queryLower))) {
        matchType = 'tag';
        matchedText = layer.tags.find(t => t.toLowerCase().includes(queryLower));
        score = 80;
      }
      // Check user questions
      else if (layer.userQuestions.some(q => q.toLowerCase().includes(queryLower))) {
        matchType = 'question';
        matchedText = layer.userQuestions.find(q => q.toLowerCase().includes(queryLower));
        score = 60;
      }
      // Check description
      else if (layer.description.toLowerCase().includes(queryLower)) {
        matchType = 'description';
        // Extract snippet
        const idx = layer.description.toLowerCase().indexOf(queryLower);
        const start = Math.max(0, idx - 30);
        const end = Math.min(layer.description.length, idx + query.length + 30);
        matchedText = (start > 0 ? '...' : '') +
          layer.description.slice(start, end) +
          (end < layer.description.length ? '...' : '');
        score = 40;
      }

      if (matchType) {
        // Boost high-priority layers
        if (layer.priority === 'high') score += 10;
        if (layer.priority === 'medium') score += 5;

        results.push({
          id: layer.id,
          name: layer.name,
          description: layer.description,
          category: layer.category,
          serviceUrl: layer.serviceUrl,
          matchType,
          matchedText,
          score,
        });
      }
    }

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    const totalMatches = results.length;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const limitedResults = results.slice(0, maxResults).map(({ score, ...rest }) => rest);

    return {
      success: true,
      results: limitedResults,
      totalMatches,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'SEARCH_ERROR',
      message: `Search failed: ${errorMessage}`,
    };
  }
}

/**
 * Find layers that answer a user question
 */
export async function findLayersForQuestion(args: {
  question: string;
  maxResults?: number;
}): Promise<{
  success: boolean;
  recommendedLayers?: Array<{
    id: string;
    name: string;
    serviceUrl: string;
    category: string;
    relevantQuestion: string;
    lookupMethod: string;
    notes?: string;
  }>;
  error_type?: string;
  message?: string;
}> {
  const { question, maxResults = 5 } = args;

  if (!question || question.length < 5) {
    return {
      success: false,
      error_type: 'INVALID_INPUT',
      message: 'Question must be at least 5 characters',
    };
  }

  try {
    const catalog = await loadCatalog();
    const questionLower = question.toLowerCase();

    // Keywords to match against
    const keywords = questionLower
      .replace(/[?.,!]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2);

    const scoredLayers: Array<{
      layer: GISLayer;
      score: number;
      matchedQuestion: string;
    }> = [];

    for (const layer of catalog.layers) {
      let bestScore = 0;
      let matchedQuestion = '';

      // Check each user question for keyword matches
      for (const q of layer.userQuestions) {
        const qLower = q.toLowerCase();
        let score = 0;

        for (const keyword of keywords) {
          if (qLower.includes(keyword)) {
            score += 10;
          }
        }

        // Boost for priority
        if (layer.priority === 'high') score += 5;
        if (layer.priority === 'medium') score += 2;

        if (score > bestScore) {
          bestScore = score;
          matchedQuestion = q;
        }
      }

      // Also check tags
      for (const tag of layer.tags) {
        const tagLower = tag.toLowerCase();
        for (const keyword of keywords) {
          if (tagLower.includes(keyword) || keyword.includes(tagLower)) {
            bestScore += 5;
            if (!matchedQuestion) {
              matchedQuestion = layer.userQuestions[0] || layer.description;
            }
          }
        }
      }

      if (bestScore > 0) {
        scoredLayers.push({
          layer,
          score: bestScore,
          matchedQuestion,
        });
      }
    }

    // Sort by score
    scoredLayers.sort((a, b) => b.score - a.score);

    const results = scoredLayers.slice(0, maxResults).map(({ layer, matchedQuestion }) => ({
      id: layer.id,
      name: layer.name,
      serviceUrl: layer.serviceUrl,
      category: layer.category,
      relevantQuestion: matchedQuestion,
      lookupMethod: layer.lookupMethod,
      notes: layer.notes,
    }));

    return {
      success: true,
      recommendedLayers: results,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'SEARCH_ERROR',
      message: `Search failed: ${errorMessage}`,
    };
  }
}

/**
 * List layers that have downloadable files
 */
export async function listGISDownloads(args: {
  format?: 'shapefile' | 'geodatabase' | 'geojson' | 'csv' | 'lidar' | 'kml' | 'other';
  category?: string;
}): Promise<{
  success: boolean;
  downloads?: Array<{
    layerId: string;
    layerName: string;
    description: string;
    category: string;
    metadataUrl?: string;
    serviceUrl?: string;
    hasLiveService: boolean;
    availableFormats: Array<{
      format: string;
      url: string;
      notes?: string;
    }>;
  }>;
  total?: number;
  error_type?: string;
  message?: string;
}> {
  const { format, category } = args;

  try {
    const catalog = await loadCatalog();

    // Filter layers that have downloads
    let layers = catalog.layers.filter(l => l.downloads && l.downloads.length > 0);

    // Filter by category
    if (category) {
      const categoryLower = category.toLowerCase();
      layers = layers.filter(l => l.category.toLowerCase() === categoryLower);
    }

    // Filter by format
    if (format) {
      layers = layers.filter(l =>
        l.downloads?.some(d => d.format === format)
      );
    }

    const results = layers.map(l => ({
      layerId: l.id,
      layerName: l.name,
      description: l.description,
      category: l.category,
      metadataUrl: l.metadataUrl,
      serviceUrl: l.serviceUrl || undefined,
      hasLiveService: Boolean(l.serviceUrl && l.layerType !== 'download-only'),
      availableFormats: (l.downloads || []).map(d => ({
        format: d.format,
        url: d.url,
        notes: d.notes,
      })),
    }));

    return {
      success: true,
      downloads: results,
      total: results.length,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'READ_ERROR',
      message: `Failed to read GIS catalog: ${errorMessage}`,
    };
  }
}

/**
 * Get download URL for a specific layer and format
 * Used by geoprocessing tools to look up download URLs from the catalog
 */
export async function getLayerDownloadUrl(args: {
  layerId: string;
  format?: 'shapefile' | 'geodatabase' | 'geojson' | 'csv' | 'lidar' | 'kml' | 'other';
}): Promise<{
  success: boolean;
  url?: string;
  allFormats?: Array<{ format: string; url: string }>;
  error_type?: string;
  message?: string;
}> {
  const { layerId, format = 'shapefile' } = args;

  try {
    await loadCatalog();
    const layer = layerIndex.get(layerId.toLowerCase());

    if (!layer) {
      return {
        success: false,
        error_type: 'LAYER_NOT_FOUND',
        message: `Layer "${layerId}" not found`,
      };
    }

    if (!layer.downloads || layer.downloads.length === 0) {
      return {
        success: false,
        error_type: 'NO_DOWNLOADS',
        message: `Layer "${layerId}" does not have any downloadable files`,
      };
    }

    const download = layer.downloads.find(d => d.format === format);

    if (!download) {
      return {
        success: false,
        error_type: 'FORMAT_NOT_FOUND',
        message: `Format "${format}" not available for layer "${layerId}"`,
        allFormats: layer.downloads.map(d => ({ format: d.format, url: d.url })),
      };
    }

    return {
      success: true,
      url: download.url,
      allFormats: layer.downloads.map(d => ({ format: d.format, url: d.url })),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error_type: 'READ_ERROR',
      message: `Failed to read GIS catalog: ${errorMessage}`,
    };
  }
}
