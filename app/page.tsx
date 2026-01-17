export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '900px' }}>
      <h1>SAGE - Solano Agent for Geographic Enquiry</h1>
      <p>AI-powered GIS assistant for Solano County, California.</p>

      <h2>MCP Endpoint</h2>
      <p>
        Connect your MCP client to: <code>/api/mcp</code>
      </p>

      <h2>Available Tools</h2>

      <h3>Geocoding &amp; Property</h3>
      <ul>
        <li><strong>geocode_address</strong> - Convert street address to coordinates and APN</li>
        <li><strong>get_parcel_details</strong> - Get comprehensive property information</li>
        <li><strong>search_parcels</strong> - Search parcels by criteria with aggregations</li>
        <li><strong>get_parcels_in_buffer</strong> - Find parcels within radius for notification lists</li>
      </ul>

      <h3>Zoning &amp; Land Use</h3>
      <ul>
        <li><strong>get_zoning</strong> - Query zoning designation with automatic jurisdiction routing</li>
      </ul>

      <h3>Hazards</h3>
      <ul>
        <li><strong>get_flood_zone</strong> - Query FEMA flood zone designation</li>
        <li><strong>get_fire_hazard_zone</strong> - Query CAL FIRE Fire Hazard Severity Zone</li>
      </ul>

      <h3>Districts &amp; Jurisdictions</h3>
      <ul>
        <li><strong>get_supervisor_district</strong> - Get Board of Supervisors district info</li>
        <li><strong>get_special_districts</strong> - Query special districts (water, fire, schools, etc.)</li>
      </ul>

      <h3>Nearby &amp; Reference</h3>
      <ul>
        <li><strong>get_nearby</strong> - Find nearby places and services</li>
        <li><strong>get_solano_context</strong> - Get contextual knowledge about GIS topics</li>
      </ul>

      <h3>County Code</h3>
      <ul>
        <li><strong>list_county_code_chapters</strong> - List available county code chapters</li>
        <li><strong>list_county_code_sections</strong> - List sections within a chapter</li>
        <li><strong>search_county_code</strong> - Search county code by keyword</li>
        <li><strong>get_county_code_sections</strong> - Get full text of specific sections</li>
      </ul>

      <h3>Mapping</h3>
      <ul>
        <li><strong>render_map</strong> - Generate static map images with parcel overlays</li>
        <ul style={{ marginTop: '0.5rem', fontSize: '0.9em' }}>
          <li>Center on APN or coordinates</li>
          <li>Buffer visualization with radius rings</li>
          <li>County and city boundary overlays</li>
          <li>County-wide extent view</li>
          <li>Aerial or streets basemap</li>
        </ul>
      </ul>

      <h2>Usage</h2>
      <p>Add this server to your MCP client configuration:</p>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`{
  "mcpServers": {
    "sage-gis": {
      "url": "https://sage.solano.ai/api/mcp"
    }
  }
}`}
      </pre>

      <h2>Example Queries</h2>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px', overflow: 'auto', fontSize: '0.85em' }}>
{`// Get property info for an address
geocode_address({ address: "675 Texas St, Fairfield, CA" })

// Generate a parcel map
render_map({ apn: "003-025-1020" })

// Show county-wide map with boundaries
render_map({
  extent: "county",
  boundaries: { showCounty: true, showCities: true }
})

// Buffer map for notification list
render_map({
  buffer: { apn: "003-025-1020", radius_feet: 300 }
})`}
      </pre>
    </main>
  );
}
