export default function Home() {
  return (
    <main
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '3rem 1.5rem',
        lineHeight: 1.7,
        color: '#1e293b',
      }}
    >
      {/* Hero */}
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          SAGE
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '1rem' }}>
          Solano Agent for Geographic Enquiry
        </p>
        <p style={{ fontSize: '1.1rem', color: '#475569', maxWidth: '700px', margin: '0 auto 1.5rem' }}>
          An MCP server that gives AI assistants access to Solano County&apos;s property records, zoning regulations,
          hazard data, county code, budget documents, and organizational structure.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/map"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            Open Interactive Map
          </a>
          <a
            href="#setup"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              background: '#f1f5f9',
              color: '#334155',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              border: '1px solid #e2e8f0',
            }}
          >
            Setup Instructions
          </a>
        </div>
      </header>

      {/* What can you ask? */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600 }}>What can you ask?</h2>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <ExampleCard
            question="What's the zoning for 675 Texas St, Fairfield?"
            answer="Public Facilities (City of Fairfield jurisdiction). The parcel is 5.28 acres, in flood zone X (minimal risk), and within Supervisor District 3."
          />
          <ExampleCard
            question="Find agricultural parcels over 20 acres zoned A-40"
            answer="Found 1,077 parcels totaling 89,746 acres. Average size is 83 acres. Top uses: Orchard (369), Agricultural Property (315), Row Crop (144)."
          />
          <ExampleCard
            question="What are the ADU rules in unincorporated Solano County?"
            answer="ADUs are allowed by-right (no use permit) in Rural Residential and Residential-Traditional Community districts. See County Code Section 28.72.10 for standards."
          />
          <ExampleCard
            question="How many employees does the Sheriff's Office have?"
            answer="588 FTE across 7 divisions. Largest: Custody (287 FTE), Field Operations (171 FTE). Top positions: Correctional Officer (247), Deputy Sheriff (115)."
          />
          <ExampleCard
            question="What's the county's General Plan policy on agricultural preservation?"
            answer="Chapter 3 establishes goals to maintain agricultural land base, support farm economy, and minimize land use conflicts. Policy AG.P-1 prioritizes agricultural uses in designated areas."
          />
          <ExampleCard
            question="Is this property in a fire hazard zone?"
            answer="High Fire Hazard Severity Zone (SRA). 100ft defensible space required. Chapter 7A building standards recommended. Disclosure required at sale."
          />
        </div>
      </section>

      {/* Data Available */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600 }}>Data Available</h2>
        <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <DataCard
            icon="🗺️"
            title="Property & Parcels"
            items={[
              'Address geocoding with APN lookup',
              'Parcel details, boundaries, assessed values',
              'Ownership (public record)',
              'Parcel search by criteria (zoning, size, use)',
              'Buffer queries for notification lists',
            ]}
          />
          <DataCard
            icon="📍"
            title="Zoning & Districts"
            items={[
              'Automatic city vs. county jurisdiction routing',
              'Zoning codes with permitted uses',
              'Special districts (fire, water, school)',
              'Supervisor district lookup',
              'Nearby schools, parks, fire stations',
            ]}
          />
          <DataCard
            icon="⚠️"
            title="Hazards"
            items={[
              'FEMA flood zones with insurance implications',
              'CAL FIRE hazard severity zones',
              'Defensible space requirements',
              'Building code implications',
            ]}
          />
          <DataCard
            icon="📜"
            title="County Code"
            items={[
              '8 chapters, 323 sections',
              'Full-text search',
              'Zoning regulations (Ch. 28 - 166 sections)',
              'Subdivisions (Ch. 26)',
              'Grading & erosion control (Ch. 31)',
            ]}
          />
          <DataCard
            icon="📋"
            title="General Plan"
            items={[
              '2008 General Plan with amendments',
              '13 chapters, 1,345 searchable chunks',
              '282 policies and goals',
              'Housing Element (2023-2031)',
              'EIR documents and appendices',
            ]}
          />
          <DataCard
            icon="💰"
            title="Budget & Staffing"
            items={[
              'FY2025-26 Recommended Budget',
              'Department-level appropriations',
              'Organizational chart (21 depts, 3,284 FTE)',
              'Position searches across 399 job classes',
              'Department comparisons',
            ]}
          />
        </div>
      </section>

      {/* GIS Layer Catalog */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 600 }}>GIS Layer Catalog</h2>
        <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
          Discover and query 67 GIS layers across 11 categories from Solano County, FEMA, CAL FIRE, and CGS.
          The AI can find the right layers to answer your questions.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            marginBottom: '1.5rem',
          }}
        >
          <CategoryCard name="Property" count={3} examples="Parcels, addresses" />
          <CategoryCard name="Zoning" count={16} examples="County + 7 cities" />
          <CategoryCard name="Hazards" count={7} examples="Flood, fire, faults" />
          <CategoryCard name="Districts" count={6} examples="BOS, school, fire" />
          <CategoryCard name="Services" count={3} examples="Garbage, water" />
          <CategoryCard name="POI" count={10} examples="Schools, parks" />
          <CategoryCard name="Infrastructure" count={5} examples="Roads, bridges" />
          <CategoryCard name="Emergency" count={4} examples="OES incidents" />
        </div>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Each layer includes service URLs, field definitions, and example questions it can answer.
        </p>
      </section>

      {/* Map Capabilities */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 600 }}>Map Generation</h2>
        <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
          Generate static map images or links to the interactive map explorer with various presets.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            marginBottom: '1.5rem',
          }}
        >
          <PresetCard name="Property Research" desc="Parcels, addresses, boundaries" />
          <PresetCard name="Hazard Assessment" desc="Flood zones, fire severity" />
          <PresetCard name="Zoning Analysis" desc="Zoning districts, land use" />
          <PresetCard name="Environmental" desc="Wetlands, habitat constraints" />
          <PresetCard name="District Lookup" desc="Supervisor & service districts" />
        </div>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Maps include 2025 high-resolution aerial imagery, parcel boundaries, and custom overlays.
        </p>
      </section>

      {/* Setup */}
      <section id="setup" style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 600 }}>Setup</h2>
        <p style={{ color: '#475569', marginBottom: '1rem' }}>
          Add SAGE to any MCP-compatible client (Claude Desktop, Claude Code, Cursor, etc.):
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>
            Claude Desktop / Cursor
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.75rem' }}>
            Add to your <code style={{ background: '#f1f5f9', padding: '0.125rem 0.375rem', borderRadius: '4px' }}>claude_desktop_config.json</code>:
          </p>
          <pre
            style={{
              background: '#0f172a',
              color: '#e2e8f0',
              padding: '1.25rem',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '0.875rem',
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
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Claude Code</h3>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.75rem' }}>
            Add to <code style={{ background: '#f1f5f9', padding: '0.125rem 0.375rem', borderRadius: '4px' }}>.mcp.json</code> in your project:
          </p>
          <pre
            style={{
              background: '#0f172a',
              color: '#e2e8f0',
              padding: '1.25rem',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '0.875rem',
            }}
          >
            {`{
  "mcpServers": {
    "sage": {
      "type": "http",
      "url": "https://sage-three-theta.vercel.app/api/mcp"
    }
  }
}`}
          </pre>
        </div>
      </section>

      {/* Tools Reference */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600 }}>Tools Reference</h2>

        <ToolGroup
          title="Property & Parcels"
          tools={[
            { name: 'geocode_address', desc: 'Convert address to coordinates and APN' },
            { name: 'get_parcel_details', desc: 'Property info, assessment, boundaries' },
            { name: 'search_parcels', desc: 'Find parcels by zoning, size, use, value' },
            { name: 'get_parcels_in_buffer', desc: 'Parcels within radius (for notification lists)' },
          ]}
        />

        <ToolGroup
          title="Zoning & Location"
          tools={[
            { name: 'get_zoning', desc: 'Zoning with automatic jurisdiction routing' },
            { name: 'get_special_districts', desc: 'Fire, water, school, waste districts' },
            { name: 'get_supervisor_district', desc: 'Board of Supervisors district' },
            { name: 'get_nearby', desc: 'Schools, parks, fire stations within radius' },
          ]}
        />

        <ToolGroup
          title="Hazards"
          tools={[
            { name: 'get_flood_zone', desc: 'FEMA flood zone, SFHA status, insurance' },
            { name: 'get_fire_hazard_zone', desc: 'CAL FIRE severity, defensible space requirements' },
          ]}
        />

        <ToolGroup
          title="County Code"
          tools={[
            { name: 'search_county_code', desc: 'Keyword search across all chapters' },
            { name: 'get_county_code_sections', desc: 'Retrieve full section text' },
            { name: 'list_county_code_chapters', desc: 'Available chapters' },
            { name: 'list_county_code_sections', desc: 'Sections within a chapter' },
          ]}
        />

        <ToolGroup
          title="General Plan"
          tools={[
            { name: 'search_general_plan', desc: 'Search 1,345 document chunks' },
            { name: 'search_general_plan_policies', desc: 'Search only policies and goals' },
            { name: 'get_general_plan_chapter', desc: 'Full chapter content' },
            { name: 'get_general_plan_overview', desc: 'Document metadata and stats' },
          ]}
        />

        <ToolGroup
          title="Budget"
          tools={[
            { name: 'search_budget', desc: 'Search FY2025-26 budget document' },
            { name: 'get_department_budget', desc: 'Department appropriations and narrative' },
            { name: 'list_budget_departments', desc: 'All departments in budget' },
            { name: 'get_budget_overview', desc: 'Budget structure and stats' },
          ]}
        />

        <ToolGroup
          title="Organization & Staffing"
          tools={[
            { name: 'get_org_overview', desc: 'All departments with FTE counts' },
            { name: 'get_department', desc: 'Divisions and top positions' },
            { name: 'search_positions', desc: 'Find positions by title' },
            { name: 'get_position_distribution', desc: 'Where a job class is allocated' },
            { name: 'compare_departments', desc: 'Side-by-side department comparison' },
          ]}
        />

        <ToolGroup
          title="Maps & Visualization"
          tools={[
            { name: 'render_map', desc: 'Generate static map images' },
            { name: 'get_interactive_map_url', desc: 'URL for interactive map explorer' },
            { name: 'generate_infographic', desc: 'AI-generated diagrams and charts' },
            { name: 'get_directions', desc: 'Turn-by-turn driving directions' },
            { name: 'get_travel_time', desc: 'Distance and drive time' },
          ]}
        />

        <ToolGroup
          title="GIS Layer Discovery"
          tools={[
            { name: 'list_gis_categories', desc: 'Browse 11 layer categories' },
            { name: 'list_gis_layers', desc: 'List layers by category or priority' },
            { name: 'search_gis_layers', desc: 'Keyword search across 67 layers' },
            { name: 'get_gis_layer_details', desc: 'Service URL, fields, metadata' },
            { name: 'find_layers_for_question', desc: 'Match questions to relevant layers' },
          ]}
        />

        <ToolGroup
          title="Reference"
          tools={[{ name: 'get_solano_context', desc: 'Detailed topic guides (ADU, flood, fire, etc.)' }]}
        />
      </section>

      {/* Data Sources */}
      <footer
        style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '2rem',
          color: '#64748b',
          fontSize: '0.9rem',
        }}
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#475569' }}>Data Sources</h3>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.5rem' }}>
          <li>GIS data from Solano County ArcGIS services</li>
          <li>County Code: Chapters 19, 23-24, 26, 26.5, 28, 30-31 (323 sections)</li>
          <li>2008 Solano County General Plan with amendments and EIR</li>
          <li>FY2025-26 Recommended Budget document</li>
          <li>Position Allocation Report (April 2025)</li>
        </ul>
        <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
          SAGE is for informational purposes only. Always verify critical information with official county sources.
          Zoning interpretations and permit requirements should be confirmed with the relevant jurisdiction.
        </p>
      </footer>
    </main>
  );
}

function ExampleCard({ question, answer }: { question: string; answer: string }) {
  return (
    <div
      style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '1.25rem',
      }}
    >
      <p style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#1e293b', fontSize: '0.95rem' }}>
        &ldquo;{question}&rdquo;
      </p>
      <p style={{ color: '#475569', fontSize: '0.875rem', margin: 0 }}>{answer}</p>
    </div>
  );
}

function DataCard({ icon, title, items }: { icon: string; title: string; items: string[] }) {
  return (
    <div
      style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '1.25rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '1.25rem' }}>{icon}</span>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>{title}</h3>
      </div>
      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#475569' }}>
        {items.map((item, i) => (
          <li key={i} style={{ marginBottom: '0.25rem' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PresetCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div
      style={{
        background: '#f1f5f9',
        borderRadius: '8px',
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem', color: '#1e293b' }}>{name}</p>
      <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>{desc}</p>
    </div>
  );
}

function CategoryCard({ name, count, examples }: { name: string; count: number; examples: string }) {
  return (
    <div
      style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '0.875rem',
        textAlign: 'center',
      }}
    >
      <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.125rem', color: '#1e293b' }}>{name}</p>
      <p style={{ fontSize: '0.75rem', color: '#3b82f6', marginBottom: '0.25rem' }}>{count} layers</p>
      <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>{examples}</p>
    </div>
  );
}

function ToolGroup({ title, tools }: { title: string; tools: Array<{ name: string; desc: string }> }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#475569', marginBottom: '0.75rem' }}>{title}</h3>
      <div
        style={{
          display: 'grid',
          gap: '0.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        {tools.map((tool) => (
          <div
            key={tool.name}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.75rem',
              padding: '0.5rem 0',
              borderBottom: '1px solid #f1f5f9',
            }}
          >
            <code
              style={{
                fontSize: '0.8rem',
                color: '#3b82f6',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              {tool.name}
            </code>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{tool.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
