#!/usr/bin/env npx tsx
/**
 * Test script to validate all GIS layer URLs used by the application
 *
 * This catches silently failing layers (like retired/renamed services) before
 * they cause issues in production.
 *
 * Usage: npx tsx scripts/test-layer-validity.ts
 */

import { SOLANO_AGOL_BASE, SOLANO_SERVICES } from '../lib/config/endpoints';

interface LayerCheck {
  name: string;
  url: string;
  type: 'FeatureServer' | 'MapServer' | 'VectorTileServer' | 'ImageServer';
  critical: boolean;
}

// All layers used by capture-map.ts and other tools
const LAYERS_TO_CHECK: LayerCheck[] = [
  // Core parcel/address layers
  {
    name: 'Parcels (Feature)',
    url: `${SOLANO_AGOL_BASE}/Parcels_Public_Aumentum/FeatureServer/0`,
    type: 'FeatureServer',
    critical: true,
  },
  {
    name: 'Parcels (Vector Tile)',
    url: 'https://vectortileservices7.arcgis.com/KbDaBCmcuKbyQfck/arcgis/rest/services/Parcels_Public_Aumentum_Shapefiles_Vector_Tiles/VectorTileServer',
    type: 'VectorTileServer',
    critical: true,
  },
  {
    name: 'Address Points',
    url: `${SOLANO_AGOL_BASE}/Address_Points/FeatureServer/0`,
    type: 'FeatureServer',
    critical: true,
  },

  // Boundary layers
  {
    name: 'City Boundary',
    url: SOLANO_SERVICES.cityBoundary,
    type: 'FeatureServer',
    critical: true,
  },
  {
    name: 'County Boundary',
    url: `${SOLANO_AGOL_BASE}/County_Boundary/FeatureServer/1`,
    type: 'FeatureServer',
    critical: true,
  },

  // Service area layers
  {
    name: 'Garbage Service Areas',
    url: `${SOLANO_AGOL_BASE}/Garbage_Service_Areas/FeatureServer/0`,
    type: 'FeatureServer',
    critical: false,
  },

  // Aerial imagery
  {
    name: 'Aerial 2025',
    url: 'https://tiles.arcgis.com/tiles/SCn6czzcqKAFwdGU/arcgis/rest/services/Aerial2025_WGS84/MapServer',
    type: 'MapServer',
    critical: false,
  },

  // Hazard layers
  {
    name: 'Fire Hazard Severity Zone',
    url: `${SOLANO_AGOL_BASE}/FireHazardSeverityZone/FeatureServer/0`,
    type: 'FeatureServer',
    critical: true,
  },
  {
    name: 'Fire Hazard 2025 Phase 2',
    url: `${SOLANO_AGOL_BASE}/FireHazardSeverityZone_Phase2_2025/FeatureServer/0`,
    type: 'FeatureServer',
    critical: false,
  },
  {
    name: 'Fire Hazard April 2024',
    url: `${SOLANO_AGOL_BASE}/FireHazardSeverityZone_April2024/FeatureServer/0`,
    type: 'FeatureServer',
    critical: false,
  },
  {
    name: 'FEMA Flood Zones (NFHL)',
    url: 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28',
    type: 'FeatureServer', // This is layer 28 from NFHL MapServer, which is a Feature Layer
    critical: true,
  },
  {
    name: 'County Floodplains (Local)',
    url: `${SOLANO_AGOL_BASE}/Floodplains/FeatureServer/0`,
    type: 'FeatureServer',
    critical: false,
  },

  // Planning layers
  {
    name: 'County Zoning',
    url: `${SOLANO_AGOL_BASE}/SolanoCountyZoning_092322/FeatureServer/4`,
    type: 'FeatureServer',
    critical: true,
  },
  {
    name: 'BOS Districts',
    url: `${SOLANO_AGOL_BASE}/BOS_District_Boundaries_2021/FeatureServer/0`,
    type: 'FeatureServer',
    critical: false,
  },

  // Infrastructure
  {
    name: 'Fire Stations',
    url: `${SOLANO_AGOL_BASE}/Fire_Stations/FeatureServer/0`,
    type: 'FeatureServer',
    critical: false,
  },
  {
    name: 'Fire Response Boundary',
    url: `${SOLANO_AGOL_BASE}/FireResponse_Boundary/FeatureServer/0`,
    type: 'FeatureServer',
    critical: false,
  },
  {
    name: 'Schools',
    url: `${SOLANO_AGOL_BASE}/Schools/FeatureServer/0`,
    type: 'FeatureServer',
    critical: false,
  },
];

interface CheckResult {
  name: string;
  url: string;
  valid: boolean;
  critical: boolean;
  error?: string;
  details?: Record<string, unknown>;
}

async function checkLayer(layer: LayerCheck): Promise<CheckResult> {
  const result: CheckResult = {
    name: layer.name,
    url: layer.url,
    valid: false,
    critical: layer.critical,
  };

  try {
    const response = await fetch(`${layer.url}?f=json`, {
      headers: { 'Accept': 'application/json' },
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
            creationDate: data.creationDate ? new Date(data.creationDate).toISOString() : undefined,
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
        if (data.mapName || data.layers || data.singleFusedMapCache !== undefined) {
          result.valid = true;
          result.details = {
            name: data.mapName || data.name,
            layerCount: data.layers?.length,
          };
        } else {
          result.error = 'Not a valid map service';
        }
        break;

      case 'ImageServer':
        if (data.serviceDataType || data.pixelType) {
          result.valid = true;
          result.details = { name: data.name };
        } else {
          result.error = 'Not a valid image service';
        }
        break;
    }
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
  }

  return result;
}

async function runValidation() {
  console.log('🔍 Layer Validity Check');
  console.log('='.repeat(70));
  console.log(`Checking ${LAYERS_TO_CHECK.length} layers...\n`);

  const results: CheckResult[] = [];

  for (const layer of LAYERS_TO_CHECK) {
    process.stdout.write(`  Checking ${layer.name}... `);
    const result = await checkLayer(layer);
    results.push(result);

    if (result.valid) {
      console.log('✅');
    } else {
      console.log(`❌ ${result.error}`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 Summary\n');

  const valid = results.filter(r => r.valid);
  const invalid = results.filter(r => !r.valid);
  const criticalFailures = invalid.filter(r => r.critical);

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
    console.log('   Consider updating these layer URLs.');
    process.exit(0);
  } else {
    console.log('\n✅ All layers are valid!');
    process.exit(0);
  }
}

runValidation().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
