#!/usr/bin/env npx tsx
/**
 * Test script to validate all GIS layer URLs used by the application
 *
 * This catches silently failing layers (like retired/renamed services) before
 * they cause issues in production.
 *
 * Usage: npx tsx scripts/test-layer-validity.ts
 */

import {
  LAYER_CATALOG,
  type LayerDefinition,
} from '../lib/config/layer-catalog';

interface CheckResult {
  name: string;
  url: string;
  valid: boolean;
  critical: boolean;
  error?: string;
  details?: Record<string, unknown>;
}

async function checkLayer(layer: LayerDefinition): Promise<CheckResult> {
  const result: CheckResult = {
    name: layer.title,
    url: layer.url,
    valid: false,
    critical: layer.critical ?? false,
  };

  try {
    const response = await fetch(`${layer.url}?f=json`, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      result.error = `HTTP ${response.status}: ${response.statusText}`;
      return result;
    }

    const data = await response.json();

    // Check for ESRI error response
    if (data.error) {
      result.error = `ESRI Error ${data.error.code}: ${data.error.message}`;
      return result;
    }

    // Layer-type specific validation
    switch (layer.type) {
      case 'VectorTileServer':
        // Check for vector tile specific properties
        if (data.type === 'indexedVector' || data.capabilities?.includes('Tiles')) {
          result.valid = true;
          result.details = {
            name: data.name,
            creationDate: data.creationDate
              ? new Date(data.creationDate).toISOString()
              : undefined,
            maxZoom: data.maxZoom,
          };
        } else {
          result.error = 'Not a valid vector tile service';
        }
        break;

      case 'FeatureServer':
        // Check for feature layer properties
        if (data.type === 'Feature Layer' || data.geometryType) {
          result.valid = true;
          result.details = {
            name: data.name,
            geometryType: data.geometryType,
            featureCount: data.count,
          };
        } else {
          result.error = 'Not a valid feature layer';
        }
        break;

      case 'MapServer':
        // Check for map server properties
        if (
          data.mapName ||
          data.layers ||
          data.singleFusedMapCache !== undefined
        ) {
          result.valid = true;
          result.details = {
            name: data.mapName || data.name,
            layerCount: data.layers?.length,
          };
        } else {
          result.error = 'Not a valid map service';
        }
        break;
    }
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
  }

  return result;
}

async function runValidation() {
  const layers = Object.values(LAYER_CATALOG);

  console.log('🔍 Layer Validity Check');
  console.log('='.repeat(70));
  console.log(`Checking ${layers.length} layers from layer-catalog.ts...\n`);

  const results: CheckResult[] = [];
  const categories = new Set(layers.map((l) => l.category));

  for (const category of categories) {
    const categoryLayers = layers.filter((l) => l.category === category);
    console.log(`\n📂 ${category.toUpperCase()} (${categoryLayers.length} layers)`);

    for (const layer of categoryLayers) {
      process.stdout.write(`  Checking ${layer.title}... `);
      const result = await checkLayer(layer);
      results.push(result);

      if (result.valid) {
        console.log('✅');
      } else {
        console.log(`❌ ${result.error}`);
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 Summary\n');

  const valid = results.filter((r) => r.valid);
  const invalid = results.filter((r) => !r.valid);
  const criticalFailures = invalid.filter((r) => r.critical);

  console.log(`✅ Valid layers: ${valid.length}/${results.length}`);

  if (invalid.length > 0) {
    console.log(`\n❌ Invalid layers (${invalid.length}):`);
    for (const r of invalid) {
      const icon = r.critical ? '🚨' : '⚠️';
      console.log(`   ${icon} ${r.name}: ${r.error}`);
      console.log(`      URL: ${r.url}`);
    }
  }

  if (criticalFailures.length > 0) {
    console.log('\n🚨 CRITICAL: Some essential layers are failing!');
    console.log('   These must be fixed before deploying.');
    process.exit(1);
  } else if (invalid.length > 0) {
    console.log('\n⚠️  WARNING: Some non-critical layers are failing.');
    console.log('   Consider updating these layer URLs in layer-catalog.ts.');
    process.exit(0);
  } else {
    console.log('\n✅ All layers are valid!');
    process.exit(0);
  }
}

runValidation().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
