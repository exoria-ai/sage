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
		description: 'The foundation of county GIS. Direct access to Assessor data, boundaries, and ownership information for 152,000+ parcels.',
		source: 'Solano County Assessor / Aumentum System',
		tools: [
			{ name: 'get_parcel_details', description: 'Retrieve comprehensive property info including APN, address, acreage, use codes, and assessed values.' },
			{ name: 'geocode_address', description: 'Convert street addresses to coordinates and APNs with fuzzy matching.' },
			{ name: 'search_parcels', description: 'Find parcels matching specific criteria (e.g., "Agricultural land over 20 acres").' }
		],
		scenarios: [
			{
				title: 'Property Lookup',
				description: 'Instant fact-checking for property questions.',
				query: 'Who owns 675 Texas St in Fairfield and what is the assessed value?',
				result: 'Owner: County of Solano. Assessed Value: $0 (Government Exempt). Use Code: 8000 (Government).'
			}
		]
	},
	{
		title: 'Zoning & Routing',
		slug: 'zoning',
		icon: '📍',
		description: 'Intelligent jurisdiction routing that prevents misinformation. Automatically determines if a parcel is subject to City or County regulations.',
		source: 'Solano County Planning + 7 City GIS Services',
		tools: [
			{ name: 'get_zoning', description: 'Check zoning with automatic city vs. county detection.' },
			{ name: 'check_jurisdiction', description: 'Verify if a location is unincorporated or within a specific city limit.' }
		],
		scenarios: [
			{
				title: 'Jurisdiction Check',
				description: 'Crucial for mailing addresses that look like cities but are widely unincorporated.',
				query: 'What is the zoning for 2500 Cordelia Road, Fairfield?',
				result: 'Jurisdiction: Unincorporated Solano County (NOT City of Fairfield). Zoning: I-G (General Industrial).'
			}
		]
	},
	{
		title: 'County Code',
		slug: 'code',
		icon: '📜',
		description: 'Semantic search across thousands of pages of regulations. Finds specific development standards buried in PDF chapters.',
		source: 'Solano County Code (Municode/Publishing)',
		tools: [
			{ name: 'search_county_code', description: 'Semantic search across all County Code chapters (Zoning, Grading, Subdivisions, etc.).' },
			{ name: 'get_code_section', description: 'Retrieve the full legal text of a specific code section.' }
		],
		scenarios: [
			{
				title: 'ADU Regulations',
				description: 'Summarizing complex development standards.',
				query: 'What are the setback requirements for a detached ADU?',
				result: 'Side/Rear Setbacks: 4 feet minimum (Section 28.72.10). Maximum Height: 16 feet (or 20 feet if matching primary roof pitch).'
			}
		]
	},
	{
		title: 'General Plan',
		slug: 'general-plan',
		icon: '📋',
		description: 'Access to the 2008 General Plan and 2023-2031 Housing Element. Connects long-term policy goals to specific property inquiries.',
		source: 'Solano County Resource Management',
		tools: [
			{ name: 'search_general_plan', description: 'Search policies, goals, and diagrams within the General Plan.' },
			{ name: 'get_policy', description: 'Retrieve specific policy language (e.g., AG.P-4).' }
		],
		scenarios: [
			{
				title: 'Policy Consistency',
				description: 'Checking if a project aligns with county goals.',
				query: 'Does the General Plan support new subdivisions in agricultural areas?',
				result: 'Policy AG.P-1: Protect agricultural lands from urban development. Goal AG.G-2: Maintain large parcel sizes to support viable farming.'
			}
		]
	},
	{
		title: 'Budget & Staffing',
		slug: 'budget',
		icon: '💰',
		description: 'Transparency into county operations. Query the FY2025-26 Recommended Budget and Position Allocation List.',
		source: 'County Administrator\'s Office',
		tools: [
			{ name: 'search_budget', description: 'Search budget narrative and tables.' },
			{ name: 'get_department_budget', description: 'Get total appropriations and revenue for a specific department.' },
			{ name: 'get_staffing_levels', description: 'Retrieve FTE counts and position classifications.' }
		],
		scenarios: [
			{
				title: 'Department Resources',
				description: 'Understanding organizational capacity.',
				query: 'What is the total budget and staff count for the Sheriff\'s Office?',
				result: 'Total Appropriations: $142M. Total FTE: 588. Key Divisions: Custody (287 FTE), Field Operations (171 FTE).'
			}
		]
	},
	{
		title: 'Hazards',
		slug: 'hazards',
		icon: '⚠️',
		description: 'Critical safety constraints from state and federal agencies. Flood, Fire, and Seismic data integrated into property reports.',
		source: 'FEMA (NFHL) & CAL FIRE (FHSZ)',
		tools: [
			{ name: 'get_flood_zone', description: 'Determine FEMA Flood Zone and insurance requirements.' },
			{ name: 'get_fire_hazard_zone', description: 'Check Fire Hazard Severity Zone (LRA/SRA) and defensible space rules.' }
		],
		scenarios: [
			{
				title: 'Risk Assessment',
				description: 'Essential for insurance and building permits.',
				query: 'Is 123 Valley Road in a high fire hazard zone?',
				result: 'Yes. Zone: Very High Fire Hazard Severity Zone (State Responsibility Area). Requirements: 100ft defensible space, Chapter 7A building standards.'
			}
		]
	},
	{
		title: 'Special Districts',
		slug: 'districts',
		icon: '🏫',
		description: 'Navigate the complex web of service boundaries. Identify exactly who provides water, fire, school, and vector control services.',
		source: 'Solano LAFCO / County GIS',
		tools: [
			{ name: 'get_special_districts', description: 'List all special districts overlapping a specific location.' },
			{ name: 'get_school_district', description: 'Identify elementary, high, and unified school district attendance areas.' }
		],
		scenarios: [
			{
				title: 'Service Providers',
				description: 'Clarifying service responsibility.',
				query: 'Who provides fire and water service for this parcel?',
				result: 'Fire: Suisun Fire Protection District. Water: Solano Irrigation District (SID).'
			}
		]
	},
	{
		title: 'Meeting Minutes',
		slug: 'meetings',
		icon: '🎙️',
		description: 'Search the legislative history. Access minutes and agendas from the Board of Supervisors and ReGIS Consortium.',
		source: 'Clerk of the Board / ReGIS',
		tools: [
			{ name: 'search_minutes', description: 'Full-text search of meeting transcripts and action summaries.' },
			{ name: 'get_meeting_summary', description: 'Summarize actions taken at a specific meeting date.' }
		],
		scenarios: [
			{
				title: 'Legislative History',
				description: 'Tracking decision making.',
				query: 'When did the Board approve the contract for the new generic AI policy?',
				result: 'May 21, 2024. Item 24-251: Authorized participation in the GovAI Coalition.'
			}
		]
	}
];

export function getCapability(slug: string) {
	return capabilities.find(c => c.slug === slug);
}
