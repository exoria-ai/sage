export interface ToolDefinition {
	name: string;
	description: string;
}

export interface Scenario {
	title: string;
	description: string;
	query: string;
	toolCalls: string[];
	result: string;
}

export interface CapabilityCategory {
	title: string;
	slug: string;
	icon: string;
	description: string;
	source: string;
	tools: ToolDefinition[];
	scenarios: Scenario[];
}

export const capabilities: CapabilityCategory[] = [
	{
		title: 'Site Selection & Feasibility',
		slug: 'economic-development',
		icon: '📈',
		description: 'Complex site selection queries that combine spatial criteria with regulatory analysis. What takes hours of manual research becomes a single question—with full context from zoning, hazards, districts, and policy.',
		source: 'Multiple Sources (Assessor, Zoning, General Plan, County Code)',
		tools: [
			{ name: 'get_parcel_details', description: 'Retrieve comprehensive property info including APN, address, acreage, use codes, and assessed values.' },
			{ name: 'get_zoning', description: 'Returns zoning code, description, and jurisdiction with automatic city vs. county detection.' },
			{ name: 'search_county_code', description: 'Full-text search of regulations with relevance ranking.' },
			{ name: 'search_general_plan', description: 'Search General Plan policies and goals.' },
			{ name: 'get_flood_zone', description: 'FEMA flood zone designation and insurance implications.' },
			{ name: 'capture_map_view', description: 'Generate static map images with parcel highlights and layer overlays.' }
		],
		scenarios: [
			{
				title: 'Agritourism Site Analysis',
				description: 'Comprehensive property evaluation for agricultural tourism development.',
				query: 'Give me a property profile for 4300 Suisun Valley Road for agritourism.',
				toolCalls: ['Geocode Address', 'Get Parcel Details', 'Get Zoning', 'Get Flood Zone', 'Get Fire Hazard Zone', 'Get Special Districts', 'Search County Code', 'Search General Plan', 'Capture Map View'],
				result: `**Property Overview**
| Attribute | Value |
| :--- | :--- |
| **APN** | 002-703-0010 |
| **Acreage** | 80.1 acres |
| **Zoning** | ASV-20 (Suisun Valley Agriculture) |
| **Flood Zone** | Zone A (High Risk SFHA) |
| **Fire Hazard** | Non-FHSZ |

**Existing Improvements:** 22,032 sq ft estate (2002), 6 bed/8.5 bath, plus 49,727 sq ft outbuildings. Trees & vines assessed at $361K.

**Agritourism Opportunities (ASV-20 Zone)**
| Use | Permit Required |
| :--- | :--- |
| Agricultural Homestay | Administrative Permit |
| Small Winery (<20k gal) | Allowed by Right |
| Tasting Room | Administrative Permit |
| Farm Stand (<1,000 sf) | Allowed by Right |
| Special Events Facility | Minor Use Permit |

**Key Requirements:** All agritourism must be incidental to agriculture; 300-ft setbacks for event facilities; hours 10am-10pm; food service requires Environmental Health permit.

**Flood Zone Impact:** Zone A requires flood insurance and Base Flood Elevation determination for any new construction.

The General Plan explicitly supports agritourism in Suisun Valley. The existing large structure and active agricultural production position this property well for agricultural homestay, winery, or event facility uses.`
			}
		]
	},
	{
		title: 'Property & Parcels',
		slug: 'property',
		icon: '🗺️',
		description: 'The foundation of county GIS. Direct access to Assessor data, boundaries, and ownership information for 152,000+ parcels across seven cities and unincorporated areas.',
		source: 'Solano County Assessor / Aumentum System',
		tools: [
			{ name: 'get_parcel_details', description: 'Retrieve comprehensive property info including APN, address, acreage, use codes, and assessed values.' },
			{ name: 'geocode_address', description: 'Convert street addresses to coordinates and APNs with fuzzy matching.' },
			{ name: 'search_parcels', description: 'Find parcels matching specific criteria (e.g., "Agricultural land over 20 acres").' },
			{ name: 'find_nearby_parcels', description: 'Buffer analysis for notification lists. Returns all parcels within specified radius with owner info and distances.' }
		],
		scenarios: [
			{
				title: 'Policy Lookup by APN',
				description: 'Comprehensive zoning and land use policy research from a parcel number.',
				query: 'I have 80 acres near Dixon—what policies apply? [APN: 014-218-0100]',
				toolCalls: ['Get Parcel Details', 'Get Zoning', 'Get Flood Zone', 'Get Fire Hazard Zone', 'Get Special Districts', 'Search General Plan Policies', 'Search County Code'],
				result: `**Property:** 6156 Clark Road, Dixon (APN 014-218-0100)
**Acreage:** 79.19 acres | **Zoning:** A-80 (Exclusive Agricultural)
**Jurisdiction:** Unincorporated Solano County (not City of Dixon)

**Permitted Uses (No Permit Required)**
Crop production, grazing, primary dwelling (min 1,000 sf), secondary dwelling (max 2,400 sf), agricultural accessory buildings

**Uses Requiring Permits**
| Use | Permit Type |
| :--- | :--- |
| Agricultural employee housing | Administrative Permit |
| Agritourism events | Minor Use Permit |
| Winery (<25% local grapes) | Use Permit |
| Large animal operations | Use Permit |

**Development Standards (A-80)**
| Standard | Requirement |
| :--- | :--- |
| Minimum lot size | 80 acres |
| Front setback | 30 ft (50 ft from centerline) |
| Side/Rear setbacks | 20 ft / 25 ft |
| Height limit | 35 ft (50 ft for ag processing) |

**Hazards:** Zone X (minimal flood risk), Non-FHSZ (no fire hazard designation)

**Service Districts:** Dixon Fire District, Vacaville Unified School District, Recology garbage service, Supervisor District 5

**Key Policy Note:** At 79 acres, this parcel is just under the 80-acre minimum—limiting subdivision potential in A-80 zoning. General Plan Policy AG.P-31 requires conformance with minimum parcel sizes.`
			}
		]
	},
	{
		title: 'Zoning & Permit Analysis',
		slug: 'zoning',
		icon: '📍',
		description: 'AI-powered analysis of 365 pages of zoning regulations. Ask complex permit questions and get structured answers—permit matrices by use type, development standards, grape sourcing requirements—not just keyword matches.',
		source: 'Solano County Code Chapter 28 (Zoning)',
		tools: [
			{ name: 'get_zoning', description: 'Returns zoning code, description, and jurisdiction with automatic city vs. county detection based on actual parcel location.' },
			{ name: 'search_county_code', description: 'Full-text search with relevance ranking. Returns section IDs, titles, and contextual snippets.' },
			{ name: 'get_county_code_sections', description: 'Retrieve complete legal text of specific code sections with ordinance history.' }
		],
		scenarios: [
			{
				title: 'Winery Permit Research',
				description: 'Multi-step regulatory navigation synthesized into actionable guidance.',
				query: 'What permits does a winery need in agricultural zoning?',
				toolCalls: ['Search County Code', 'Get County Code Sections'],
				result: `Winery Permits in Solano County Agricultural Zones
The permit required for a winery depends on its size (annual production) and grape sourcing:

**Permit Requirements by Winery Size**
| Winery Type | A-20, A-40, A-80, A-160 Zones | Key Conditions |
| :--- | :--- | :--- |
| Small Winery (≤ 20k gal) | **Allowed by Right** (no permit) | Must source ≥25% of grapes from Solano County |
| Medium Winery (20k-100k) | **Administrative Permit (AP)** or MUP | MUP required if no direct access from public road |
| Large Winery (> 100k) | **Use Permit (UP)** | Discretionary approval required |
| Winery with <25% local grapes | **Use Permit (UP)** | Regardless of size |

**Key Requirements**
• **Grape Sourcing:** Small wineries must source at least 25% of grapes locally.
• **Reporting:** Annual reporting of total gallons produced required.
• **Tasting Rooms:** Max size varies (1,000 sq ft for Small, 2,000 sq ft for Medium/Large).
• **Special Events:** Medium/Large wineries may host events per permit; Small wineries need Sheriff notification.

*Summary: Small local wineries (under 20k gallons) operate by right. Larger operations need discretionary permits.*`
			}
		]
	},
	{
		title: 'County Code',
		slug: 'code',
		icon: '📜',
		description: 'Semantic search across 8 chapters of the Solano County Code: Zoning (Ch. 28), Subdivisions (Ch. 26), Grading (Ch. 31), and more. Surfaces specific sections buried in hundreds of pages of regulations.',
		source: 'Solano County Code (Municode)',
		tools: [
			{ name: 'search_county_code', description: 'Full-text search with relevance ranking. Returns section IDs, titles, and contextual snippets.' },
			{ name: 'get_county_code_sections', description: 'Retrieve complete legal text of specific code sections with ordinance history.' },
			{ name: 'list_county_code_chapters', description: 'Browse available chapters and section counts.' }
		],
		scenarios: [
			{
				title: 'Grading Permit Exemptions',
				description: 'Navigating Chapter 31 permit requirements for land disturbance.',
				query: 'Does my client need a grading permit to level a field for agriculture?',
				toolCalls: ['Search County Code', 'Get County Code Sections'],
				result: `Grading Permit Requirements (Chapter 31)
**Short answer:** Likely exempt, but conditions apply.

**General Rule (Section 31-20)**
A grading permit is required for any work that changes topography, alters drainage, or clears vegetation—unless specifically exempted.

**Agricultural Exemptions (Section 31-22)**
| Activity | Exempt? | Conditions |
| :--- | :--- | :--- |
| Routine plowing, disking, planting | **Yes** | Slopes under 14% (7:1) |
| Same on steeper slopes | **Yes** | Must follow RCD conservation plan |
| Field leveling for crops | **Yes** | Under 50 cu yd, <8,000 sq ft, <3 ft depth |
| Irrigation trenching | **Yes** | For water management or piping |
| Corral/stable maintenance | **Yes** | Cleaning and related activities |

**Conditions for All Exemptions (Section 31-21)**
Even exempt work must:
• Not adversely impact adjacent property
• Not increase erosion, sedimentation, or runoff
• Not divert or impair offsite watercourses
• Not create a public nuisance

**Special Restriction: Suisun Marsh**
Work within 25 feet of protected channels in the Suisun Marsh watershed requires a permit regardless of exemptions—plus a separate marsh development permit.

*Cite: Solano County Code Sections 31-20, 31-21, 31-22*`
			}
		]
	},
	{
		title: 'General Plan',
		slug: 'general-plan',
		icon: '📋',
		description: 'Access to the 2008 General Plan (13 chapters, 1,345 policy chunks) and supporting documents. Connects long-range planning goals to specific development questions.',
		source: 'Solano County Resource Management',
		tools: [
			{ name: 'search_general_plan', description: 'Semantic search across all chapters, appendices, and environmental review documents.' },
			{ name: 'search_general_plan_policies', description: 'Targeted search filtered to policy and goal statements only.' },
			{ name: 'get_general_plan_chapter', description: 'Retrieve all content from a specific chapter.' },
			{ name: 'list_general_plan_chapters', description: 'Browse chapter titles and content counts.' }
		],
		scenarios: [
			{
				title: 'Agricultural Policy',
				description: 'Understanding land use restrictions and preservation goals.',
				query: 'Does the General Plan support subdivisions in agricultural areas?',
				toolCalls: ['Search General Plan', 'Search General Plan Policies', 'Get General Plan Chunk'],
				result: `General Plan Policy on Subdivisions in Agricultural Areas
Short answer: No. The General Plan strongly discourages parcel divisions in agricultural zones and establishes large minimum parcel sizes to preserve farmland.

**Minimum Parcel Sizes (Table AG-3)**
| Agricultural Region | Minimum Parcel Size |
| :--- | :--- |
| Suisun Valley | 20 acres |
| Green Valley | 20 acres |
| Winters / Dixon Ridge | 40 acres |
| Montezuma Hills | 160 acres |
| Jepson Prairie | 160 acres |

**Key Policies**
• **Policy AG.P-31:** Parcel sizes must conform to these minimums.
• **Policy AG.P-28:** Agriculture is to be the predominant land use in these regions.
• **Policy AG.P-32:** Redesignation to rural residential is extremely limited and requires finding that land is *unsuitable* for agriculture.

*Summary: The General Plan's approach to agricultural lands is preservation, not subdivision.*`
			}
		]
	},
	{
		title: 'Budget & Staffing',
		slug: 'budget',
		icon: '💰',
		description: 'Transparency into county operations. Query the FY2025-26 Recommended Budget, organizational structure, and position allocation across 21 departments and 3,284 FTE.',
		source: "County Administrator's Office",
		tools: [
			{ name: 'search_budget', description: 'Search budget narratives, accomplishments, and financial tables.' },
			{ name: 'get_department', description: 'Detailed department breakdown: divisions, FTE counts, top positions.' },
			{ name: 'get_org_overview', description: 'County-wide statistics and department listing.' },
			{ name: 'search_positions', description: 'Find job classifications across all departments.' },
			{ name: 'get_position_distribution', description: 'See where a specific job class is allocated county-wide.' }
		],
		scenarios: [
			{
				title: 'GIS Division Analysis',
				description: 'Understanding staffing, budget, and accomplishments for a specific division.',
				query: 'What is the staffing and budget for the GIS division?',
				toolCalls: ['Get Division', 'Search Budget'],
				result: `GIS Division (Division 1896)
Part of the Department of Information Technology under CIO Timothy Flanagan.

**Staffing: 5 FTE**
| Position | FTE |
| :--- | :--- |
| IT Infrastructure & Ops Manager | 1 |
| IT Analyst (Principal) | 1 |
| IT Analyst IV | 2 |
| Cadastral Mapping Technician II | 1 |

**Parent Department:** DoIT has 74 total FTE and a $48.5M budget (FY2025-26). GIS falls under "Regional Services" alongside Emergency Radio and Digital Equity programs.

**FY2024-25 Accomplishments (from budget document)**
• Achieved inclusion in 3DEP program for advanced LiDAR/elevation data
• Secured federal hydrography funding through the 3DHP grant
• Delivered GIS training through Teach Me GIS and Esri workshops
• Established interagency data-sharing via ReGIS consortium
• Developed Spatial Data Governance Framework
• Enhanced emergency response through updated data layers and drone-based mapping

The GIS team supports 19 departments county-wide and coordinates with 7 cities through the ReGIS consortium, chaired by Stewart Bruce.`
			}
		]
	},
	{
		title: 'Hazards',
		slug: 'hazards',
		icon: '⚠️',
		description: 'Critical safety data from state and federal agencies. Fire hazard severity zones, FEMA flood zones, and earthquake fault information integrated into property analysis.',
		source: 'FEMA National Flood Hazard Layer, CAL FIRE Fire Hazard Severity Zones, California Geological Survey',
		tools: [
			{ name: 'get_flood_zone', description: 'FEMA flood zone designation, SFHA status, base flood elevation, and insurance implications.' },
			{ name: 'get_fire_hazard_zone', description: 'CAL FIRE severity rating (Moderate/High/Very High), responsibility area (SRA/LRA), defensible space requirements.' }
		],
		scenarios: [
			{
				title: 'Visual Flood Zone Analysis',
				description: 'AI interprets a map overlay to answer spatial questions.',
				query: 'Where exactly does the flood zone cross the 80-acre parcel at 4300 Suisun Valley Road?',
				toolCalls: ['Geocode Address', 'Capture Map View', 'Get Flood Zone'],
				result: `**Visual Analysis of APN 002-703-0010**

I've captured a map with FEMA flood zones overlaid on the parcel:

**What I See:**
The parcel is bisected by Suisun Creek running roughly north-south through the eastern third of the property.

**Zone A (High Risk)** — shown in cyan/teal:
• Follows the creek corridor through the property
• Covers approximately 15-20 acres along the creek
• Includes the area immediately surrounding the main estate buildings

**Zone X (Minimal Risk)** — shown in orange:
• Covers the western portion of the parcel
• The vineyard areas appear to be mostly in Zone X

**Development Implications:**
• New structures in Zone A require Base Flood Elevation determination
• Flood insurance mandatory for any mortgaged structures in Zone A
• The existing 22,000 sq ft estate is partially within Zone A—verify elevation certificate
• Agricultural uses (vines, orchards) are less constrained than structures

*This is visual interpretation, not just a zone code lookup. I'm analyzing where on the parcel the hazard applies.*`
			},
			{
				title: 'Fire Hazard Assessment',
				description: 'Determining disclosure requirements and building standards.',
				query: 'Is the property at 4303 Rockville Heights in a fire hazard zone?',
				toolCalls: ['Geocode Address', 'Get Fire Hazard Zone'],
				result: `Yes.
**Fire Hazard Severity Zone:** Moderate
**Responsibility Area:** SRA (State Responsibility Area—CAL FIRE jurisdiction)

**Requirements:**
• 100ft defensible space per PRC 4291
• Fire-resistant materials recommended
• Real estate disclosure required

*Note: FHSZ maps fire behavior potential (hazard), not probability (risk).*`
			}
		]
	},
	{
		title: 'Special Districts',
		slug: 'districts',
		icon: '🏫',
		description: 'Navigate the complex web of overlapping service boundaries. Identify exactly which agencies provide fire, water, schools, garbage, and other services to any location.',
		source: 'Solano LAFCO / County GIS / District Boundaries',
		tools: [
			{ name: 'get_special_districts', description: 'Returns all districts covering a location: fire, water, school, garbage, cemetery, supervisor district.' },
			{ name: 'get_supervisor_district', description: 'Board of Supervisors district with representative contact info.' },
			{ name: 'find_nearby', description: 'Locate nearest schools, parks, fire stations, hospitals, libraries, transit stops.' }
		],
		scenarios: [
			{
				title: 'Service Provider Identification',
				description: 'Answering "who do I call?" for any property.',
				query: 'What districts serve the property at 2500 Cordelia Road?',
				toolCalls: ['Geocode Address', 'Get Special Districts'],
				result: `Districts Serving 2500 Cordelia Road

| Service | District/Provider |
| :--- | :--- |
| **Fire Protection** | Suisun Fire Protection District |
| **Water** | Solano Irrigation District |
| **School District** | Fairfield-Suisun Unified School District |
| **Board of Supervisors** | District 2 |
| **Garbage/Waste** | Republic Services |
| **Cemetery** | Solano Cemetery District |

This property is in unincorporated Solano County and receives services from these special districts rather than a city.`
			}
		]
	},
	{
		title: 'Meeting Minutes',
		slug: 'meetings',
		icon: '🎙️',
		description: 'Search the legislative history. Access agendas and minutes from the Board of Supervisors and ReGIS (Regional GIS Consortium) meetings.',
		source: 'Clerk of the Board / ReGIS Consortium',
		tools: [
			{ name: 'search_meeting_minutes', description: 'Full-text search across meeting transcripts. Filter by committee, date range, document type.' },
			{ name: 'get_meeting', description: 'Retrieve all agenda items and minutes for a specific meeting.' },
			{ name: 'list_meetings', description: 'Browse available meetings by committee and year.' },
			{ name: 'list_committees', description: 'See available committees with meeting counts and date ranges.' }
		],
		scenarios: [
			{
				title: '2025 GIS Initiatives',
				description: 'Research across Board of Supervisors and ReGIS consortium meetings.',
				query: 'Search 2025 Board meetings for GIS-related initiatives and projects.',
				toolCalls: ['Search Meeting Minutes', 'List Meetings', 'Get Meeting'],
				result: `**Major Projects**
• **3DHP Grant** (June 2025) — $634K federal grant for elevation-derived hydrography covering 4,000+ sq mi of Northern California watersheds
• **2025 Aerial Imagery** — Full county capture completed; 2023 LiDAR now in USGS National Maps
• **Land Use & Zoning App** (Oct 2025) — New portal app with 16 maps and 8 dashboards, topology-aligned to city boundaries

**ReGIS Consortium Updates**
• New governance: Solutions Committee (technical users) + Steering Committee (department heads)
• ArcGIS Urban study modeling winery buildout in Suisun Valley
• Fire response time analysis underway in Vacaville and Suisun City
• FME Flow tool exploration for AI-powered permit data transformation

**Training & Outreach**
• GIS Day 2025 partnering with Office of Education for middle/high school presentations
• Intro to ArcGIS Pro training sessions in Feb and May`
			}
		]
	},
	{
		title: 'Maps & Visualization',
		slug: 'maps',
		icon: '🗾',
		description: 'Generate static map snapshots for analysis or create interactive map URLs for exploration. Supports 67 data layers across 11 categories.',
		source: 'Solano County AGOL / ESRI Services',
		tools: [
			{ name: 'capture_map_view', description: 'Generate static map images with parcel highlights, buffer rings, and custom layer combinations.' },
			{ name: 'get_interactive_map_url', description: 'Create parameterized URLs to the interactive map viewer with preset configurations.' },
			{ name: 'list_gis_layers', description: 'Browse available layers by category: property, zoning, hazards, districts, services, POI.' },
			{ name: 'search_gis_layers', description: 'Find layers by keyword or user question.' },
			{ name: 'suggest_layers', description: 'Get layer recommendations based on a natural language question.' }
		],
		scenarios: [
			{
				title: 'Interactive Handoff',
				description: 'Transitioning from AI answers to self-service exploration.',
				query: 'Show me an interactive map of this property with hazard layers.',
				toolCalls: ['Get Interactive Map Url'],
				result: `Interactive Hazard Map for APN 004-425-0050
Here's an interactive map with hazard layers for the property:

**[Open Interactive Hazard Map](#)**

**This map includes:**
• FEMA Flood Zones
• CAL FIRE Severity Zones
• Parcel boundaries with the subject property highlighted`
			}
		]
	}
];

export function getCapability(slug: string) {
	return capabilities.find(c => c.slug === slug);
}