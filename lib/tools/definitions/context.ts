/**
 * Context Tool Definitions
 *
 * Tools for retrieving reference material and context.
 */

import { z } from 'zod';
import { defineTool, jsonResponse } from '../types';
import { getSolanoContext } from '../context';

export const getSolanoContextTool = defineTool({
  name: 'get_solano_context',
  description: `Retrieve detailed reference material about Solano County GIS topics.

USE THIS TOOL when you need to:
- Interpret zoning codes or flood zones
- Explain Proposition 13 / assessed values
- Understand ADU rules and requirements
- Know which department to contact
- Get proper disclaimer language

AVAILABLE TOPICS:
- jurisdiction: City vs county routing, incorporated cities
- zoning: Zoning code meanings and allowed uses
- prop13: Assessed value vs market value, Proposition 13/8
- adu: ADU/JADU requirements, state and local rules
- flood: FEMA flood zone explanations, insurance
- fire: Fire hazard severity zones, defensible space
- contacts: Department phone numbers and emails
- districts: Special districts (fire, water, sewer)
- disclaimers: Standard disclaimer language

Returns full reference document for the requested topic.`,
  schema: {
    topic: z.string().describe('Topic to retrieve (e.g., "zoning", "flood", "adu", "contacts")'),
  },
  handler: async ({ topic }) => {
    const result = await getSolanoContext({ topic });
    return jsonResponse(result);
  },
});

/** All context tools */
export const contextTools = [getSolanoContextTool];
