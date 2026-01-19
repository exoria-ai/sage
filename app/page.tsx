export default function Home() {
  return (
    <main
      style={{
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '1100px',
        margin: '0 auto',
        lineHeight: 1.6,
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: '2.5rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
          SAGE
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#64748b', margin: 0 }}>
          Solano Agent for Geographic Enquiry
        </p>
        <p style={{ marginTop: '0.75rem', color: '#475569' }}>
          AI-powered GIS assistant for Solano County, California. Access property data, zoning, hazards,
          county code, budget, staffing, and more through natural language.
        </p>
      </header>

      {/* Quick Links */}
      <section style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <a
          href="/map"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            background: '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Interactive Map
        </a>
        <a
          href="#mcp-setup"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            background: '#f1f5f9',
            color: '#334155',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 500,
            border: '1px solid #e2e8f0',
          }}
        >
          MCP Setup
        </a>
      </section>

      {/* Tool Sections Grid */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1e293b' }}>Available Tools</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {/* Property & Parcels */}
          <ToolSection
            title="Property & Parcels"
            color="#059669"
            tools={[
              { name: 'geocode_address', desc: 'Address to coordinates and APN' },
              { name: 'get_parcel_details', desc: 'Property info, assessment, owner' },
              { name: 'search_parcels', desc: 'Search by criteria with stats' },
              { name: 'get_parcels_in_buffer', desc: 'Find parcels within radius' },
            ]}
          />

          {/* Zoning & Land Use */}
          <ToolSection
            title="Zoning & Land Use"
            color="#7c3aed"
            tools={[
              { name: 'get_zoning', desc: 'Zoning with auto jurisdiction routing' },
              { name: 'get_special_districts', desc: 'Water, fire, school districts' },
              { name: 'get_supervisor_district', desc: 'Board of Supervisors district' },
            ]}
          />

          {/* Hazards */}
          <ToolSection
            title="Hazards"
            color="#dc2626"
            tools={[
              { name: 'get_flood_zone', desc: 'FEMA flood zone & insurance' },
              { name: 'get_fire_hazard_zone', desc: 'CAL FIRE severity zone' },
            ]}
          />

          {/* County Code */}
          <ToolSection
            title="County Code"
            color="#0891b2"
            tools={[
              { name: 'search_county_code', desc: 'Search by keyword' },
              { name: 'get_county_code_sections', desc: 'Get section full text' },
              { name: 'list_county_code_chapters', desc: 'Available chapters' },
              { name: 'list_county_code_sections', desc: 'Sections in a chapter' },
            ]}
          />

          {/* General Plan */}
          <ToolSection
            title="General Plan (2008)"
            color="#ca8a04"
            tools={[
              { name: 'search_general_plan', desc: 'Search 1,345 chunks' },
              { name: 'search_general_plan_policies', desc: 'Goals & policies only' },
              { name: 'get_general_plan_chapter', desc: 'Full chapter content' },
              { name: 'get_general_plan_overview', desc: 'Stats & metadata' },
            ]}
          />

          {/* Budget */}
          <ToolSection
            title="Budget (FY2025-26)"
            color="#ea580c"
            tools={[
              { name: 'search_budget', desc: 'Search budget document' },
              { name: 'get_department_budget', desc: 'Department budget info' },
              { name: 'list_budget_departments', desc: 'All departments' },
              { name: 'get_budget_overview', desc: 'Stats & metadata' },
            ]}
          />

          {/* Org Chart & Staffing */}
          <ToolSection
            title="Org Chart & Staffing"
            color="#be185d"
            tools={[
              { name: 'get_org_overview', desc: '21 depts, 3,284 FTE' },
              { name: 'get_department', desc: 'Divisions & top positions' },
              { name: 'search_positions', desc: 'Find positions by title' },
              { name: 'compare_departments', desc: 'Side-by-side comparison' },
            ]}
          />

          {/* Mapping & Routing */}
          <ToolSection
            title="Mapping & Routing"
            color="#2563eb"
            tools={[
              { name: 'render_map', desc: 'Static maps with overlays' },
              { name: 'get_directions', desc: 'Turn-by-turn directions' },
              { name: 'get_travel_time', desc: 'Distance & drive time' },
              { name: 'get_nearby', desc: 'Schools, parks, stations' },
            ]}
          />

          {/* AI Image Generation */}
          <ToolSection
            title="AI Image Generation"
            color="#6366f1"
            tools={[
              { name: 'generate_infographic', desc: 'Create diagrams & visuals' },
              { name: 'edit_image', desc: 'Edit or combine images' },
            ]}
          />

          {/* Reference */}
          <ToolSection
            title="Reference"
            color="#64748b"
            tools={[{ name: 'get_solano_context', desc: 'GIS topic knowledge' }]}
          />
        </div>
      </section>

      {/* MCP Setup */}
      <section id="mcp-setup" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>MCP Setup</h2>
        <p style={{ marginBottom: '1rem', color: '#475569' }}>
          Add this server to your MCP client (Claude Desktop, etc.):
        </p>
        <pre
          style={{
            background: '#1e293b',
            color: '#e2e8f0',
            padding: '1.25rem',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.9rem',
          }}
        >
          {`{
  "mcpServers": {
    "sage": {
      "url": "https://sage-three-theta.vercel.app/api/mcp"
    }
  }
}`}
        </pre>
      </section>

      {/* Examples */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>Example Queries</h2>
        <pre
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            padding: '1.25rem',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.85rem',
            color: '#334155',
          }}
        >
          {`// Property lookup
geocode_address({ address: "675 Texas St, Fairfield, CA" })

// Generate a parcel map
render_map({ apn: "003-025-1020" })

// Driving directions
get_directions({
  origin: { address: "675 Texas St, Fairfield, CA" },
  destination: { address: "580 Texas St, Fairfield, CA" }
})

// County code search
search_county_code({ query: "accessory dwelling unit" })

// Department staffing
get_department({ code_or_name: "sheriff" })

// Position search
search_positions({ query: "social worker" })

// Budget search
search_budget({ query: "behavioral health" })

// General Plan policies
search_general_plan_policies({ query: "housing density" })`}
        </pre>
      </section>

      {/* Data Sources */}
      <footer style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', color: '#64748b', fontSize: '0.875rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#475569' }}>Data Sources</h3>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li>GIS data from Solano County ArcGIS services</li>
          <li>County Code from official ordinances (Chapters 19, 23-24, 26, 28, 30-31)</li>
          <li>FY2025-26 Recommended Budget document</li>
          <li>Position Allocation Report (April 2025) &amp; Salary Listing (January 2026)</li>
          <li>2008 Solano County General Plan with amendments, appendices, and EIR</li>
        </ul>
      </footer>
    </main>
  );
}

function ToolSection({
  title,
  color,
  tools,
}: {
  title: string;
  color: string;
  tools: Array<{ name: string; desc: string }>;
}) {
  return (
    <div
      style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '1.25rem',
        borderTop: `4px solid ${color}`,
      }}
    >
      <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#1e293b' }}>{title}</h3>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {tools.map((tool) => (
          <li key={tool.name} style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            <code
              style={{
                background: '#f1f5f9',
                padding: '0.125rem 0.375rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                color: color,
              }}
            >
              {tool.name}
            </code>
            <span style={{ color: '#64748b', marginLeft: '0.5rem' }}>{tool.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
