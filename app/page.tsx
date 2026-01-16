export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '800px' }}>
      <h1>SAGE - Solano Agent for Geographic Enquiry</h1>
      <p>AI-powered GIS assistant for Solano County, California.</p>

      <h2>MCP Endpoint</h2>
      <p>
        Connect your MCP client to: <code>/api/mcp</code>
      </p>

      <h2>Available Tools</h2>
      <ul>
        <li><strong>geocode_address</strong> - Convert street address to coordinates and APN</li>
        <li><strong>get_parcel_details</strong> - Get comprehensive property information</li>
        <li><strong>get_zoning</strong> - Query zoning designation with automatic jurisdiction routing</li>
        <li><strong>get_flood_zone</strong> - Query FEMA flood zone designation</li>
        <li><strong>get_fire_hazard_zone</strong> - Query CAL FIRE Fire Hazard Severity Zone</li>
        <li><strong>get_supervisor_district</strong> - Get Board of Supervisors district info</li>
        <li><strong>get_special_districts</strong> - Query special districts (water, fire, schools, etc.)</li>
        <li><strong>search_parcels</strong> - Search parcels by criteria with aggregations</li>
        <li><strong>find_nearby</strong> - Find nearby places and services</li>
        <li><strong>get_knowledge</strong> - Get contextual knowledge about GIS topics</li>
        <li><strong>render_map</strong> - Generate static map images with parcel overlays</li>
      </ul>

      <h2>Usage</h2>
      <p>Add this server to your MCP client configuration:</p>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`{
  "mcpServers": {
    "sage-gis": {
      "url": "https://sage-gis.vercel.app/api/mcp"
    }
  }
}`}
      </pre>
    </main>
  );
}
