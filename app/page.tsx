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
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>SAGE</h1>
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

      {/* Tool Sections */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1e293b' }}>Available Tools</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Property & Parcels */}
          <ToolSection
            title="Property & Parcels"
            color="#059669"
            tools={[
              {
                name: 'geocode_address',
                desc: 'Address to coordinates and APN',
                example: 'geocode_address({ address: "675 Texas St, Fairfield, CA" })',
              },
              {
                name: 'get_parcel_details',
                desc: 'Property info, assessment, owner',
                example: 'get_parcel_details({ apn: "0030251020" })',
              },
              {
                name: 'search_parcels',
                desc: 'Search by criteria with stats',
                example: 'search_parcels({ criteria: { zoning: "A-40", min_acres: 10 } })',
              },
              {
                name: 'get_parcels_in_buffer',
                desc: 'Find parcels within radius',
                example: 'get_parcels_in_buffer({ apn: "0030251020", radius_feet: 500 })',
              },
            ]}
          />

          {/* Zoning & Land Use */}
          <ToolSection
            title="Zoning & Land Use"
            color="#7c3aed"
            tools={[
              {
                name: 'get_zoning',
                desc: 'Zoning with auto jurisdiction routing',
                example: 'get_zoning({ apn: "0030251020" })',
              },
              {
                name: 'get_special_districts',
                desc: 'Water, fire, school districts',
                example: 'get_special_districts({ latitude: 38.2494, longitude: -122.04 })',
              },
              {
                name: 'get_supervisor_district',
                desc: 'Board of Supervisors district',
                example: 'get_supervisor_district({ apn: "0030251020" })',
              },
            ]}
          />

          {/* Hazards */}
          <ToolSection
            title="Hazards"
            color="#dc2626"
            tools={[
              {
                name: 'get_flood_zone',
                desc: 'FEMA flood zone & insurance implications',
                example: 'get_flood_zone({ apn: "0030251020" })',
              },
              {
                name: 'get_fire_hazard_zone',
                desc: 'CAL FIRE severity zone',
                example: 'get_fire_hazard_zone({ latitude: 38.35, longitude: -122.15 })',
              },
            ]}
          />

          {/* County Code */}
          <ToolSection
            title="County Code"
            color="#0891b2"
            tools={[
              {
                name: 'search_county_code',
                desc: 'Search by keyword',
                example: 'search_county_code({ query: "accessory dwelling unit" })',
              },
              {
                name: 'get_county_code_sections',
                desc: 'Get section full text',
                example: 'get_county_code_sections({ section_ids: ["28.72", "28.72.10"] })',
              },
              {
                name: 'list_county_code_chapters',
                desc: 'Available chapters',
                example: 'list_county_code_chapters()',
              },
              {
                name: 'list_county_code_sections',
                desc: 'Sections in a chapter',
                example: 'list_county_code_sections({ chapter: "28" })',
              },
            ]}
          />

          {/* General Plan */}
          <ToolSection
            title="General Plan (2008)"
            color="#ca8a04"
            tools={[
              {
                name: 'search_general_plan',
                desc: 'Search 1,345 chunks',
                example: 'search_general_plan({ query: "agricultural preservation" })',
              },
              {
                name: 'search_general_plan_policies',
                desc: 'Goals & policies only',
                example: 'search_general_plan_policies({ query: "housing density" })',
              },
              {
                name: 'get_general_plan_chapter',
                desc: 'Full chapter content',
                example: 'get_general_plan_chapter({ chapter: "9" })',
              },
              {
                name: 'get_general_plan_overview',
                desc: 'Stats & metadata',
                example: 'get_general_plan_overview()',
              },
            ]}
          />

          {/* Budget */}
          <ToolSection
            title="Budget (FY2025-26)"
            color="#ea580c"
            tools={[
              {
                name: 'search_budget',
                desc: 'Search budget document',
                example: 'search_budget({ query: "behavioral health services" })',
              },
              {
                name: 'get_department_budget',
                desc: 'Department budget info',
                example: 'get_department_budget({ department: "Sheriff" })',
              },
              {
                name: 'list_budget_departments',
                desc: 'All departments',
                example: 'list_budget_departments()',
              },
              {
                name: 'get_budget_overview',
                desc: 'Stats & metadata',
                example: 'get_budget_overview()',
              },
            ]}
          />

          {/* Org Chart & Staffing */}
          <ToolSection
            title="Org Chart & Staffing"
            color="#be185d"
            tools={[
              {
                name: 'get_org_overview',
                desc: '21 depts, 3,284 FTE',
                example: 'get_org_overview()',
              },
              {
                name: 'get_department',
                desc: 'Divisions & top positions',
                example: 'get_department({ code_or_name: "sheriff" })',
              },
              {
                name: 'search_positions',
                desc: 'Find positions by title',
                example: 'search_positions({ query: "social worker" })',
              },
              {
                name: 'get_position_distribution',
                desc: 'Where a job class is allocated',
                example: 'get_position_distribution({ title: "Administrative Analyst" })',
              },
              {
                name: 'compare_departments',
                desc: 'Side-by-side comparison',
                example: 'compare_departments({ departments: ["sheriff", "probation"] })',
              },
              {
                name: 'list_job_classes',
                desc: 'Search 399 classifications',
                example: 'list_job_classes({ search: "analyst" })',
              },
            ]}
          />

          {/* Mapping & Routing */}
          <ToolSection
            title="Mapping & Routing"
            color="#2563eb"
            tools={[
              {
                name: 'render_map',
                desc: 'Static maps with overlays',
                example: 'render_map({ apn: "0030251020", basemap: "aerial" })',
              },
              {
                name: 'get_directions',
                desc: 'Turn-by-turn directions',
                example:
                  'get_directions({ origin: { address: "675 Texas St, Fairfield" }, destination: { address: "Solano County Courthouse" } })',
              },
              {
                name: 'get_travel_time',
                desc: 'Distance & drive time',
                example:
                  'get_travel_time({ origin: { address: "Fairfield, CA" }, destination: { address: "Vallejo, CA" } })',
              },
              {
                name: 'get_nearby',
                desc: 'Schools, parks, stations',
                example: 'get_nearby({ layer_type: "school", apn: "0030251020", radius_feet: 5280 })',
              },
            ]}
          />

          {/* AI Image Generation */}
          <ToolSection
            title="AI Image Generation"
            color="#6366f1"
            tools={[
              {
                name: 'generate_infographic',
                desc: 'Create diagrams & visuals',
                example:
                  'generate_infographic({ prompt: "Flowchart showing permit application process for ADUs in Solano County" })',
              },
              {
                name: 'edit_image',
                desc: 'Edit or combine images',
                example:
                  'edit_image({ prompt: "Add labels for each city", image_urls: ["https://..."] })',
              },
            ]}
          />

          {/* Reference */}
          <ToolSection
            title="Reference"
            color="#64748b"
            tools={[
              {
                name: 'get_solano_context',
                desc: 'GIS topic knowledge',
                example: 'get_solano_context({ topic: "adu" })',
              },
            ]}
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

      {/* Data Sources */}
      <footer
        style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', color: '#64748b', fontSize: '0.875rem' }}
      >
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
  tools: Array<{ name: string; desc: string; example: string }>;
}) {
  return (
    <div
      style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '1.25rem',
        borderLeft: `4px solid ${color}`,
      }}
    >
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#1e293b' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {tools.map((tool) => (
          <div key={tool.name} style={{ fontSize: '0.875rem' }}>
            <div style={{ marginBottom: '0.25rem' }}>
              <code
                style={{
                  background: '#f1f5f9',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  color: color,
                  fontWeight: 500,
                }}
              >
                {tool.name}
              </code>
              <span style={{ color: '#64748b', marginLeft: '0.75rem' }}>{tool.desc}</span>
            </div>
            <pre
              style={{
                margin: 0,
                padding: '0.5rem 0.75rem',
                background: '#f8fafc',
                borderRadius: '6px',
                fontSize: '0.8rem',
                color: '#475569',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {tool.example}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
