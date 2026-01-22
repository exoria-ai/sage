export interface ToolDefinition {
	name: string;
	description: string;
}

export interface Scenario {
	title: string;
	description: string;
	query: string;
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
			{ name: 'get_parcel_details', description: 'Retrieve comprehensive property info: APN, address, acreage, lot size, use codes, zoning, assessed values, building characteristics, and tax links.' },
			{ name: 'geocode_address', description: 'Convert street addresses to coordinates and APNs. Handles fuzzy matching and suggests alternatives when exact match unavailable.' },
			{ name: 'search_parcels', description: 'Find parcels matching criteria: zoning type, acreage range, assessed value, year built, amenities (pool, solar), Williamson Act status.' },
			{ name: 'find_nearby_parcels', description: 'Buffer analysis for notification lists. Returns all parcels within specified radius with owner info and distances.' }
		],
		scenarios: [
			{
				title: 'Government Property Lookup',
				description: 'Identifying public facilities and their tax status.',
				query: 'What property is at 675 Texas Street in Fairfield?',
				result: 'APN: 003-025-1020. Use: Governmental & Miscellaneous (Code 9800). Size: 5.28 acres. Assessed Value: $0 (Government Exempt). Zoning: Public Facilities. This is a County-owned parcel in the Fairfield civic center area.'
			},
			{
				title: 'Notification List Generation',
				description: 'Automated buffer analysis for discretionary permit applications.',
				query: 'Generate a 300-foot notification list for APN 004-425-0050.',
				result: '3 parcels within 300ft buffer. Nearest: 004-631-0120 (137ft, 0.49 acres). Largest neighbor: 004-424-0010 (237ft, 62 acres agricultural). All addresses and distances compiled for mailing labels.'
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
				result: 'Jurisdiction: Unincorporated Solano County (NOT City of Fairfield). Zoning: ASV-20 (Suisun Valley Agriculture, 20-acre minimum). The mailing address says "Fairfield" but this parcel is outside city limits and subject to County zoning regulations.'
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
				description: 'Navigating complex dwelling unit standards.',
				query: 'What are the setback and size requirements for an ADU in Solano County?',
				result: 'Per Section 28.72.10: Side/rear setbacks: 4 feet minimum. Attached ADU: max 50% of primary dwelling, up to 1,200 sq ft. Detached ADU in R-R district: up to 1,500 sq ft. Detached in R-TC: 850 sq ft (or 1,000 if 2+ bedrooms). Minimum size: 380 sq ft (or 220 sq ft efficiency unit). No additional setback required when converting existing garage.'
			},
			{
				title: 'Winery Permit Research',
				description: 'Multi-step regulatory navigation.',
				query: 'What permits does a winery need in agricultural zoning?',
				result: 'Found 7 relevant sections. Wineries are classified by production volume (Small/Medium/Large) per Section 28.01. Section 28.21.20 shows permit requirements vary by district: Small winery on A-40 may be allowed by-right (A) or Administrative Permit (AP). Section 28.71.20 details agricultural processing standards. Section 28.73.30 covers special events—hosting weddings requires separate "Special Events Facility" approval.'
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
				result: 'Chapter 3 (Agriculture) establishes strong preservation policies. Policy AG.P-4 requires farmland conversion mitigation for any General Plan amendment changing agricultural to non-agricultural use OR any development permit changing land from production agriculture. The Tri-City and County Cooperative Plan (1994) guides protection of open space and agricultural lands in the Fairfield-Vacaville-Benicia corridor.'
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
				result: "Total FTE: 588 across 7 divisions. Custody Division: 287 FTE (largest). Field Operations: 171 FTE. Support Services: 56 FTE. Animal Care Services: 29 FTE. Emergency Services: 29 FTE. Top positions: 247 Correctional Officers, 115 Deputy Sheriffs, 30 Custody Sergeants, 24 Sheriff's Security Officers."
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
				result: 'Yes. Fire Hazard Severity Zone: Moderate. Responsibility Area: SRA (State Responsibility Area—CAL FIRE jurisdiction). Requirements: 100ft defensible space per PRC 4291, fire-resistant materials recommended, real estate disclosure required. Note: FHSZ maps fire behavior potential (hazard), not probability (risk).'
			},
			{
				title: 'Flood Zone Check',
				description: 'Insurance and development constraint analysis.',
				query: 'What flood zone is 2500 Cordelia Road in?',
				result: 'Zone X (0.2% Annual Chance Flood Hazard). Risk Level: Low—outside 500-year floodplain. Not a Special Flood Hazard Area (SFHA). Flood insurance NOT required for federally-backed mortgage, but available at preferred rates. Note: Low risk is not no risk.'
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
				result: 'Fire: Suisun Fire Protection District. Water: Solano Irrigation District (SID). School: Fairfield-Suisun Unified School District. Garbage: Republic Services. Cemetery: Solano Cemetery District. Supervisor: District 2. This property is in unincorporated county but served by multiple special districts.'
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
				title: 'Policy History',
				description: 'Tracking Board decisions on emerging topics.',
				query: 'When did Solano County approve participation in the GovAI Coalition?',
				result: 'April 9, 2024. Item 24-251: "Authorize the Chief Information Officer to execute the GovAI Coalition registration agreement." Status: Approved. This authorized County participation in the multi-jurisdictional AI governance initiative.'
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
				title: 'Notification Map',
				description: 'Visual documentation for public hearings.',
				query: 'Create a 300-foot buffer map for APN 004-425-0050.',
				result: 'Map generated showing: subject parcel (orange fill), 300ft buffer ring (dashed line), neighboring parcels (blue highlight), all APNs labeled. Suitable for discretionary permit notification documentation.'
			},
			{
				title: 'Interactive Handoff',
				description: 'Transitioning from AI answers to self-service exploration.',
				query: 'Show me an interactive map of this property with hazard layers.',
				result: 'URL generated: Opens interactive map centered on parcel with Hazards preset (fire severity, flood zones, fault lines enabled). User can pan, zoom, toggle layers, and click parcels for details.'
			}
		]
	}
];

export function getCapability(slug: string) {
	return capabilities.find(c => c.slug === slug);
}