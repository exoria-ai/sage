/**
 * Interactive Map URL Tool Tests
 *
 * These tests ensure the MCP tool stays in sync with the client's URL parameter handling.
 * If you change URL parameters in app/map/page.tsx, these tests should fail,
 * reminding you to update the MCP tool as well.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getInteractiveMapUrlTool, listMapPresetsTool } from './interactive-map';

/**
 * IMPORTANT: This is the source of truth for URL parameters.
 * These must match what app/map/page.tsx actually parses.
 *
 * If you're here because a test failed, you probably changed the client
 * and need to update the MCP tool to match. Steps:
 * 1. Update this list to match the new client parameters
 * 2. Update the MCP tool schema in interactive-map.ts
 * 3. Update the buildMapUrl function in interactive-map.ts
 * 4. Update the tool description examples
 */
const CLIENT_URL_PARAMETERS = {
  // Map source selection
  id: 'Custom Web Map ID (e.g., ?id=abc123)',
  preset: 'Map preset name (e.g., ?preset=hazards)',

  // Feature highlighting
  apn: 'APN to highlight and zoom to (e.g., ?apn=0001-011-180)',
  address: 'Address to geocode and highlight (e.g., ?address=675+Texas+St)',

  // View control
  center: 'Map center as "lng,lat" (e.g., ?center=-122.0,38.25)',
  zoom: 'Zoom level 1-20 (e.g., ?zoom=17)',

  // Route display
  origin: 'Route start as "lng,lat" or "lng,lat,label" (e.g., ?origin=-122.0,38.2,Start)',
  destination: 'Route end as "lng,lat" or "lng,lat,label" (e.g., ?destination=-122.1,38.3,End)',
} as const;

/**
 * Map presets supported by the client.
 * Must match WEB_MAPS keys in lib/esri/webmaps.ts
 */
const CLIENT_MAP_PRESETS = ['base', 'hazards', 'zoning', 'environmental', 'districts'] as const;

describe('Interactive Map URL Tool - Client Sync', () => {
  describe('URL Parameter Coverage', () => {
    it('MCP tool schema covers all client URL parameters', () => {
      const mcpSchemaKeys = Object.keys(getInteractiveMapUrlTool.schema);

      // Map MCP schema keys to URL param names
      // (some have different names in schema vs URL)
      const mcpToUrlMapping: Record<string, string> = {
        preset: 'preset',
        webMapId: 'id',
        apn: 'apn',
        address: 'address',
        center: 'center',
        zoom: 'zoom',
        origin: 'origin',
        destination: 'destination',
      };

      const mcpUrlParams = mcpSchemaKeys.map((k) => mcpToUrlMapping[k] || k);
      const clientUrlParams = Object.keys(CLIENT_URL_PARAMETERS);

      // Check that MCP tool supports all client parameters
      for (const clientParam of clientUrlParams) {
        expect(
          mcpUrlParams,
          `MCP tool is missing URL parameter: ${clientParam}\n` +
            `Client expects: ${CLIENT_URL_PARAMETERS[clientParam as keyof typeof CLIENT_URL_PARAMETERS]}\n` +
            `Add this parameter to the MCP tool schema in interactive-map.ts`
        ).toContain(clientParam);
      }

      // Check for extra MCP params that client doesn't use (warning, not error)
      for (const mcpParam of mcpUrlParams) {
        if (!clientUrlParams.includes(mcpParam)) {
          console.warn(
            `MCP tool has parameter "${mcpParam}" that client doesn't use. ` +
              `Consider removing it or adding client support.`
          );
        }
      }
    });

    it('MCP tool preset enum matches client presets', () => {
      // Extract preset enum values from the MCP tool schema
      const presetSchema = getInteractiveMapUrlTool.schema.preset;
      // @ts-expect-error - accessing internal zod structure
      const mcpPresets = presetSchema?._def?.innerType?._def?.values as string[] | undefined;

      expect(
        mcpPresets,
        'Could not extract preset values from MCP schema. Schema structure may have changed.'
      ).toBeDefined();

      // Check all client presets are in MCP
      for (const preset of CLIENT_MAP_PRESETS) {
        expect(
          mcpPresets,
          `MCP tool is missing preset: ${preset}\n` +
            `Add it to MAP_PRESETS in interactive-map.ts`
        ).toContain(preset);
      }

      // Check for extra MCP presets
      for (const preset of mcpPresets || []) {
        expect(
          CLIENT_MAP_PRESETS as readonly string[],
          `MCP tool has preset "${preset}" that client doesn't support.\n` +
            `Either add it to CLIENT_MAP_PRESETS in this test or remove from MCP tool.`
        ).toContain(preset);
      }
    });
  });

  describe('URL Generation', () => {
    it('generates valid URL with preset', async () => {
      const result = await getInteractiveMapUrlTool.handler({ preset: 'hazards' });
      const text = result.content[0];
      expect(text.type).toBe('text');

      const data = JSON.parse((text as { type: 'text'; text: string }).text);
      expect(data.url).toContain('preset=hazards');
      expect(data.url).not.toContain('undefined');
    });

    it('generates valid URL with APN', async () => {
      const result = await getInteractiveMapUrlTool.handler({ apn: '0001-011-180' });
      const text = result.content[0];
      const data = JSON.parse((text as { type: 'text'; text: string }).text);

      expect(data.url).toContain('apn=0001-011-180');
    });

    it('generates valid URL with address', async () => {
      const result = await getInteractiveMapUrlTool.handler({
        address: '675 Texas St, Fairfield, CA',
      });
      const text = result.content[0];
      const data = JSON.parse((text as { type: 'text'; text: string }).text);

      expect(data.url).toContain('address=');
      expect(data.url).toContain('Texas');
    });

    it('generates valid URL with center and zoom', async () => {
      const result = await getInteractiveMapUrlTool.handler({
        center: { longitude: -122.0, latitude: 38.25 },
        zoom: 15,
      });
      const text = result.content[0];
      const data = JSON.parse((text as { type: 'text'; text: string }).text);

      expect(data.url).toContain('center=-122');
      expect(data.url).toContain('38.25');
      expect(data.url).toContain('zoom=15');
    });

    it('generates valid URL with route', async () => {
      const result = await getInteractiveMapUrlTool.handler({
        origin: { longitude: -122.0, latitude: 38.2, label: 'Start' },
        destination: { longitude: -122.1, latitude: 38.3, label: 'End' },
      });
      const text = result.content[0];
      const data = JSON.parse((text as { type: 'text'; text: string }).text);

      expect(data.url).toContain('origin=');
      expect(data.url).toContain('destination=');
      expect(data.url).toContain('Start');
      expect(data.url).toContain('End');
    });

    it('generates valid URL with webMapId (overrides preset)', async () => {
      const result = await getInteractiveMapUrlTool.handler({
        webMapId: 'abc123',
        preset: 'hazards', // should be ignored
      });
      const text = result.content[0];
      const data = JSON.parse((text as { type: 'text'; text: string }).text);

      expect(data.url).toContain('id=abc123');
      expect(data.url).not.toContain('preset=');
    });

    it('APN takes precedence over address', async () => {
      const result = await getInteractiveMapUrlTool.handler({
        apn: '0001-011-180',
        address: '675 Texas St', // should be ignored
      });
      const text = result.content[0];
      const data = JSON.parse((text as { type: 'text'; text: string }).text);

      expect(data.url).toContain('apn=0001-011-180');
      expect(data.url).not.toContain('address=');
    });
  });

  describe('list_map_presets tool', () => {
    it('returns all client presets', async () => {
      const result = await listMapPresetsTool.handler({});
      const text = result.content[0];
      const data = JSON.parse((text as { type: 'text'; text: string }).text);

      expect(data.presets).toHaveLength(CLIENT_MAP_PRESETS.length);

      for (const preset of CLIENT_MAP_PRESETS) {
        const found = data.presets.find((p: { id: string }) => p.id === preset);
        expect(found, `Missing preset: ${preset}`).toBeDefined();
      }
    });
  });
});

/**
 * Automatic Client Sync Tests
 *
 * These tests read the actual client source code and extract URL parameters,
 * ensuring the MCP tool stays in sync automatically.
 */
describe('Automatic Client Sync', () => {
  // Read the client source code
  const clientSourcePath = join(__dirname, '../../../app/map/page.tsx');
  const clientSource = readFileSync(clientSourcePath, 'utf-8');

  it('detects all searchParams.get() calls in client and verifies MCP tool covers them', () => {
    // Extract all searchParams.get('xxx') calls from the client
    const getParamRegex = /searchParams\.get\(['"](\w+)['"]\)/g;
    const clientParams = new Set<string>();
    let match;

    while ((match = getParamRegex.exec(clientSource)) !== null) {
      clientParams.add(match[1]);
    }

    // Sanity check - we should find at least the core params
    const coreParams = ['id', 'preset', 'apn', 'address', 'center', 'zoom'];
    for (const core of coreParams) {
      expect(
        clientParams.has(core),
        `Client source doesn't contain searchParams.get('${core}'). ` +
          `Either the client changed significantly or the test regex is broken.`
      ).toBe(true);
    }

    // Now check MCP tool covers all client params
    const mcpSchemaKeys = Object.keys(getInteractiveMapUrlTool.schema);
    const mcpToUrlMapping: Record<string, string> = {
      preset: 'preset',
      webMapId: 'id',
      apn: 'apn',
      address: 'address',
      center: 'center',
      zoom: 'zoom',
      origin: 'origin',
      destination: 'destination',
    };
    const mcpUrlParams = new Set(mcpSchemaKeys.map((k) => mcpToUrlMapping[k] || k));

    // CRITICAL: Ensure MCP tool supports everything the client uses
    for (const clientParam of clientParams) {
      expect(
        mcpUrlParams.has(clientParam),
        `Client uses URL parameter '${clientParam}' but MCP tool doesn't support it!\n` +
          `Found in: app/map/page.tsx\n` +
          `Fix: Add '${clientParam}' to the MCP tool schema in interactive-map.ts`
      ).toBe(true);
    }

    // Note: MCP tool may support additional params for future client features.
    // This is OK - the important thing is MCP covers what client needs.
    const extraMcpParams = [...mcpUrlParams].filter((p) => !clientParams.has(p));
    if (extraMcpParams.length > 0) {
      console.log(
        `Note: MCP tool supports params not yet in client: ${extraMcpParams.join(', ')}. ` +
          `This is fine - client may add support later.`
      );
    }
  });

  it('detects preset options in client', () => {
    // Look for the preset type cast or options in client
    // The client has: (searchParams.get('preset') as keyof typeof WEB_MAPS)
    // And the select has: <option value="base">, <option value="hazards">, etc.
    const optionRegex = /<option value="(\w+)">/g;
    const clientPresets = new Set<string>();
    let match;

    while ((match = optionRegex.exec(clientSource)) !== null) {
      clientPresets.add(match[1]);
    }

    // Verify we found presets
    expect(clientPresets.size).toBeGreaterThan(0);

    // Extract MCP presets
    const presetSchema = getInteractiveMapUrlTool.schema.preset;
    // @ts-expect-error - accessing internal zod structure
    const mcpPresets = new Set(presetSchema?._def?.innerType?._def?.values as string[]);

    // Check all client presets are in MCP
    for (const preset of clientPresets) {
      expect(
        mcpPresets.has(preset),
        `Client has preset '${preset}' but MCP tool doesn't support it!\n` +
          `Found in: app/map/page.tsx <option value="${preset}">\n` +
          `Fix: Add '${preset}' to MAP_PRESETS in interactive-map.ts`
      ).toBe(true);
    }

    // Check MCP doesn't have extra presets
    for (const preset of mcpPresets) {
      expect(
        clientPresets.has(preset),
        `MCP tool has preset '${preset}' but client doesn't have it as an option!\n` +
          `Either add it to the client or remove from MCP tool.`
      ).toBe(true);
    }
  });

  it('detects center format (lng,lat order)', () => {
    // Client parses center as: centerParam.split(',') -> [lng, lat]
    // Look for the parsing logic
    expect(clientSource).toContain("centerParam.split(',')");
    expect(clientSource).toMatch(/parts\[0\].*lng|lng.*parts\[0\]/i);
    expect(clientSource).toMatch(/parts\[1\].*lat|lat.*parts\[1\]/i);
  });

  it('detects route format if client supports routes', () => {
    // Only check route format if client has route support
    const hasRouteSupport = clientSource.includes("searchParams.get('origin')");

    if (hasRouteSupport) {
      // Client parses routes - verify format
      expect(clientSource).toContain('parseRouteStop');
      expect(clientSource).toMatch(/parts\.length\s*>\s*2.*label|label.*parts\.slice\(2\)/);
    } else {
      // Route support not in client yet - just log it
      console.log('Note: Client does not yet have route URL parameter support');
    }
  });
});

/**
 * URL Format Tests
 *
 * These test the exact URL format that the client expects.
 * If the client's parsing logic changes, update these tests.
 */
describe('URL Format Compatibility', () => {
  it('center format matches client expectation (lng,lat)', async () => {
    const result = await getInteractiveMapUrlTool.handler({
      center: { longitude: -122.5, latitude: 38.25 },
    });
    const text = result.content[0];
    const data = JSON.parse((text as { type: 'text'; text: string }).text);
    const url = new URL(data.url);

    // Client expects: center=lng,lat (longitude first!)
    const centerParam = url.searchParams.get('center');
    expect(centerParam).toBe('-122.5,38.25');

    // Verify it can be parsed back
    const [lng, lat] = centerParam!.split(',').map(Number);
    expect(lng).toBe(-122.5);
    expect(lat).toBe(38.25);
  });

  it('route format matches client expectation (lng,lat,label)', async () => {
    const result = await getInteractiveMapUrlTool.handler({
      origin: { longitude: -122.0, latitude: 38.2, label: 'My Start' },
      destination: { longitude: -122.1, latitude: 38.3 }, // no label
    });
    const text = result.content[0];
    const data = JSON.parse((text as { type: 'text'; text: string }).text);
    const url = new URL(data.url);

    // Client expects: origin=lng,lat or origin=lng,lat,encodedLabel
    const originParam = url.searchParams.get('origin');
    expect(originParam).toContain('-122');
    expect(originParam).toContain('38.2');
    expect(originParam).toContain('My%20Start'); // URL encoded

    const destParam = url.searchParams.get('destination');
    expect(destParam).toBe('-122.1,38.3'); // no label = just coords
  });

  it('zoom is a simple integer', async () => {
    const result = await getInteractiveMapUrlTool.handler({ zoom: 17 });
    const text = result.content[0];
    const data = JSON.parse((text as { type: 'text'; text: string }).text);
    const url = new URL(data.url);

    expect(url.searchParams.get('zoom')).toBe('17');
  });
});
