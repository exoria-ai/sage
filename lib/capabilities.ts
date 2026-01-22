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
				title: 'Agritourism Feasibility',
				description: 'Comprehensive property profile for development evaluation.',
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
			},
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
			},
			{
				title: 'Notification List Generation',
				description: 'Automated buffer analysis for discretionary permit applications.',
				query: 'Generate a 300-foot notification list for APN 004-425-0050.',
				toolCalls: ['Find Nearby Parcels'],
				result: `300-Foot Notification List for APN 004-425-0050
Source Parcel: 004-425-0050
Buffer Radius: 300 feet
Total Parcels Found: 3

| APN | Situs Address | Owner | City | Acreage | Distance (ft) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 004-631-0120 | — | Not Available | Unincorporated | 0.49 | 137 |
| 004-424-0010 | — | Not Available | Unincorporated | 62.06 | 237 |
| 004-425-0080 | 2543 Cordelia Road | Not Available | Unincorporated | 21.71 | 272 |

**Notes:**
• This is a rural area near Cordelia Road with only 3 parcels within 300 feet
• Owner names are not available in the public dataset - you'll need to obtain current owner/mailing address information from the Solano County Assessor's Office for official notification purposes
• All neighboring parcels are in unincorporated Solano County

For official permit notification purposes, contact the Solano County Assessor's Office to obtain the current property owner names and mailing addresses for these APNs.`
			}
		]
	},
	{
		title: 'Zoning & Jurisdiction',
		slug: 'zoning',
		icon: '📍',
		description: 'Intelligent jurisdiction routing across 8 zoning authorities. Automatically determines whether a parcel falls under County or City regulations—critical because mailing addresses often mislead.',
		source: 'Solano County Planning + Benicia, Dixon, Fairfield, Rio Vista, Suisun City, Vacaville, Vallejo GIS Services',
		tools: [
			{ name: 'get_zoning', description: 'Returns zoning code, description, and jurisdiction with automatic city vs. county detection based on actual parcel location.' },
			{ name: 'geocode_address', description: 'Address lookup that identifies the legal jurisdiction—not just the mailing city.' }
		],
		scenarios: [
			{
				title: 'Jurisdiction Routing',
				description: 'Catching the common mailing-address-vs-legal-jurisdiction confusion.',
				query: 'What is the zoning for 2500 Cordelia Road, Fairfield?',
				toolCalls: ['Geocode Address', 'Get Zoning'],
				result: `Jurisdiction: Unincorporated Solano County (NOT City of Fairfield).
Zoning: ASV-20 (Suisun Valley Agriculture, 20-acre minimum).

The mailing address says "Fairfield" but this parcel is outside city limits and subject to County zoning regulations.`
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
				title: 'ADU Regulations',
				description: 'Summarizing complex development standards.',
				query: 'What are the setback and size requirements for an ADU in Solano County?',
				toolCalls: ['Search County Code', 'Get County Code Sections'],
				result: `ADU Requirements in Solano County
Based on Solano County Code Section 28.72.10, here are the setback and size requirements for Accessory Dwelling Units (ADUs) and Junior ADUs (JADUs):

**Setbacks**
| Setback | Requirement |
| :--- | :--- |
| Front | Per the applicable zoning district (Table 28.31B for R-R or 28.32C for R-TC) |
| Side | 4 feet minimum |
| Rear | 4 feet minimum |

*Exception: No additional setback is required when converting existing living area or a residential accessory structure.*

**Size Requirements**
| ADU Type | Size Limits |
| :--- | :--- |
| Attached ADU | Max 50% of primary dwelling floor area, not to exceed 1,200 sq ft |
| Detached ADU (R-TC) | Max 850 sq ft (1 bedroom) or 1,000 sq ft (2+ bedrooms) |
| Detached ADU (R-R) | Max 1,500 sq ft |
| Junior ADU | Max 500 sq ft |
| Minimum size | 380 sq ft (or efficiency unit) |

**Other Key Requirements**
• 1 parking space required per ADU (unless within ½ mile of transit)
• ADUs are allowed by right in R-R and R-TC zoning districts
• Owner occupancy is not required for ADUs
• ADUs cannot be sold separately from the primary dwelling`
			},
			{
				title: 'Winery Permit Research',
				description: 'Multi-step regulatory navigation.',
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
				title: 'Department Analysis',
				description: 'Understanding organizational capacity and structure.',
				query: "What is the staffing breakdown for the Sheriff's Office?",
				toolCalls: ['Get Department'],
				result: `Sheriff's Office Staffing Breakdown
The Sheriff's Office has **588 total FTE** (full-time equivalent positions) across 7 divisions:

**By Division**
| Division | FTE |
| :--- | :--- |
| Custody Division | 287 |
| Field Operations Division | 171 |
| Support Services Division | 56 |
| Animal Care Services | 29 |
| Emergency Services Division | 29 |
| Compliance Services Division | 14 |

**Top Positions**
• **Correctional Officer:** 247 FTE
• **Deputy Sheriff:** 115 FTE
• **Custody Sergeant:** 30 FTE
• **Sheriff's Security Officer:** 24 FTE

The **Custody Division** is the largest, accounting for nearly half of the department's staff. **Field Operations** is the second largest, focusing on patrol and investigative duties.`
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
			},
			{
				title: 'Flood Zone Check',
				description: 'Insurance and development constraint analysis.',
				query: 'What flood zone is 2500 Cordelia Road in?',
				toolCalls: ['Geocode Address', 'Get Flood Zone'],
				result: `Flood Zone for 2500 Cordelia Road

| Detail | Information |
| :--- | :--- |
| **Address** | 2500 Cordelia Road (matched to 2503 Cordelia Road) |
| **APN** | 004-425-0050 |
| **FEMA Flood Zone** | Zone X (0.2% Annual Chance Flood Hazard) |
| **Risk Level** | Low |
| **Special Flood Hazard Area** | No |
| **Insurance Required** | No |

**What This Means**
Zone X (shaded) indicates moderate-to-low flood risk—outside the 100-year floodplain. Flood insurance is not required for federally-backed mortgages but is available at preferred rates.`
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
				title: 'GovAI Coalition Approval',
				description: 'Finding when the Board approved a specific initiative.',
				query: 'When did Solano County approve participation in the GovAI Coalition?',
				toolCalls: ['Search Meeting Minutes', 'Get Meeting'],
				result: `**April 9, 2024** — Item 24-251, approved on consent calendar.

The Board authorized the CIO to execute the GovAI Coalition registration agreement—a partnership of government agencies focused on responsible AI adoption in public sector operations.`
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