#!/usr/bin/env npx ts-node
/**
 * Test script to validate all GIS layer URLs in gis-layers.json
 * Checks that each service URL is accessible and returns valid layer metadata
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface GisLayer {
  id: string;
  name: string;
  serviceUrl: string;
  layerType: string;
  [key: string]: unknown;
}

interface GisLayersData {
  layers: GisLayer[];
}

interface TestResult {
  id: string;
  name: string;
  url: string;
  status: 'ok' | 'error';
  error?: string;
  actualLayerId?: number;
  suggestedUrl?: string;
}

async function testLayerUrl(layer: GisLayer): Promise<TestResult> {
  const result: TestResult = {
    id: layer.id,
    name: layer.name,
    url: layer.serviceUrl,
    status: 'ok',
  };

  // Skip layers without URLs (e.g., download-only layers)
  if (!layer.serviceUrl) {
    result.status = 'ok';
    return result;
  }

  try {
    // Test the exact URL provided
    const response = await fetch(`${layer.serviceUrl}?f=json`);
    const data = await response.json();

    if (data.error) {
      result.status = 'error';
      result.error = data.error.message || JSON.stringify(data.error);

      // If layer not found, try to find the correct layer ID
      if (data.error.message?.includes('layer') && data.error.message?.includes('not found')) {
        const baseUrl = layer.serviceUrl.replace(/\/\d+$/, '');
        const serviceResponse = await fetch(`${baseUrl}?f=json`);
        const serviceData = await serviceResponse.json();

        if (serviceData.layers && serviceData.layers.length > 0) {
          const firstLayer = serviceData.layers[0];
          result.actualLayerId = firstLayer.id;
          result.suggestedUrl = `${baseUrl}/${firstLayer.id}`;
          result.error += ` (Found layer at ID ${firstLayer.id})`;
        }
      }
    }
  } catch (err) {
    result.status = 'error';
    result.error = err instanceof Error ? err.message : String(err);
  }

  return result;
}

async function main() {
  const jsonPath = path.join(__dirname, '..', 'data', 'gis-layers.json');
  const data: GisLayersData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log(`Testing ${data.layers.length} GIS layer URLs...\n`);

  const results: TestResult[] = [];
  const batchSize = 10;

  for (let i = 0; i < data.layers.length; i += batchSize) {
    const batch = data.layers.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(testLayerUrl));
    results.push(...batchResults);

    // Progress indicator
    const progress = Math.min(i + batchSize, data.layers.length);
    process.stdout.write(`\rProgress: ${progress}/${data.layers.length}`);
  }

  console.log('\n');

  // Separate results
  const okResults = results.filter((r) => r.status === 'ok');
  const errorResults = results.filter((r) => r.status === 'error');

  console.log(`✓ ${okResults.length} layers OK`);
  console.log(`✗ ${errorResults.length} layers with errors\n`);

  if (errorResults.length > 0) {
    console.log('=== ERRORS ===\n');
    for (const result of errorResults) {
      console.log(`Layer: ${result.name} (${result.id})`);
      console.log(`  URL: ${result.url}`);
      console.log(`  Error: ${result.error}`);
      if (result.suggestedUrl) {
        console.log(`  Suggested fix: ${result.suggestedUrl}`);
      }
      console.log();
    }
  }

  // Output summary for easy fixing
  if (errorResults.some((r) => r.suggestedUrl)) {
    console.log('=== SUGGESTED FIXES ===\n');
    for (const result of errorResults.filter((r) => r.suggestedUrl)) {
      console.log(`${result.id}:`);
      console.log(`  Current:   ${result.url}`);
      console.log(`  Should be: ${result.suggestedUrl}`);
      console.log();
    }
  }

  process.exit(errorResults.length > 0 ? 1 : 0);
}

main().catch(console.error);
