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

      <h3>Budget</h3>
      <ul>
        <li><strong>search_budget</strong> - Search FY2025-26 Recommended Budget document</li>
        <li><strong>get_budget_chunk</strong> - Retrieve full text of a budget section</li>
        <li><strong>list_budget_departments</strong> - List all departments in budget</li>
        <li><strong>list_budget_sections</strong> - List major budget sections (A-N)</li>
        <li><strong>get_department_budget</strong> - Get all budget info for a department</li>
        <li><strong>get_budget_overview</strong> - Budget document stats and metadata</li>
      </ul>

      <h3>General Plan (2008)</h3>
      <ul>
        <li><strong>search_general_plan</strong> - Search all General Plan documents (1,345 chunks)</li>
        <li><strong>get_general_plan_chunk</strong> - Retrieve full text of a specific chunk</li>
        <li><strong>list_general_plan_chapters</strong> - List all 13 chapters</li>
        <li><strong>list_general_plan_documents</strong> - List document types (chapters, EIR, resolutions)</li>
        <li><strong>get_general_plan_chapter</strong> - Get all content from a chapter</li>
        <li><strong>get_general_plan_overview</strong> - Collection stats and metadata</li>
        <li><strong>search_general_plan_policies</strong> - Search policies and goals specifically</li>
      </ul>

      <h3>Org Chart &amp; Staffing</h3>
      <ul>
        <li><strong>get_org_overview</strong> - County org chart with 21 departments, 3,284 FTE</li>
        <li><strong>get_department</strong> - Department details with divisions and top positions</li>
        <li><strong>search_positions</strong> - Search position titles across all departments</li>
        <li><strong>get_position_distribution</strong> - Where a job class is allocated county-wide</li>
        <li><strong>get_division</strong> - Division details by code</li>
        <li><strong>list_job_classes</strong> - Search job classifications (399 classes)</li>
        <li><strong>compare_departments</strong> - Side-by-side department staffing comparison</li>
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

      <h3>Image Generation</h3>
      <ul>
        <li><strong>generate_infographic</strong> - Create infographics, diagrams, and visualizations</li>
        <li><strong>edit_image</strong> - Edit or combine images using AI</li>
      </ul>

      <h2>Usage</h2>
      <p>Add this server to your MCP client configuration:</p>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`{
  "mcpServers": {
    "sage-gis": {
      "url": "https://sage-three-theta.vercel.app/api/mcp"
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

// Search county code for ADU regulations
search_county_code({ query: "accessory dwelling unit" })

// Get Sheriff's department staffing
get_department({ code_or_name: "sheriff" })

// Find all social worker positions county-wide
search_positions({ query: "social worker" })

// Compare public safety departments
compare_departments({ departments: ["sheriff", "probation", "district attorney"] })

// Search budget for mental health funding
search_budget({ query: "behavioral health", department: "H&SS" })

// Search General Plan for housing policies
search_general_plan({ query: "housing density", chapter: "9" })

// Find agricultural preservation policies
search_general_plan_policies({ query: "agricultural preservation" })`}
      </pre>

      <h2>Data Sources</h2>
      <p style={{ fontSize: '0.9em', color: '#666' }}>
        GIS data from Solano County ArcGIS services. County Code from official ordinances.
        Budget data from FY2025-26 Recommended Budget. Staffing data from Position Allocation
        Report (April 2025) and Salary Listing (January 2026). General Plan from 2008 Solano
        County General Plan including all chapters, appendices, amendments, and EIR documents.
      </p>
    </main>
  );
}
