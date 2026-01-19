# SAGE Development Skills

Skills for developing and maintaining the SAGE (Solano Agent for Geographic Enquiry) codebase.

## Overview

SAGE is an AI-powered GIS assistant that provides county GIS analyst-level capabilities through an MCP server hosted on Vercel. It combines real-time access to Solano County's GIS infrastructure with deep organizational knowledge about county processes, regulations, and data interpretation.

## When to Load

Load these skills when:
- Working on any file in this repository
- Debugging MCP tool implementations
- Adding new GIS tools or features
- Working with ArcGIS/ESRI APIs
- Modifying map rendering code

## Browser Control

You have access to a Chrome browser via the Claude-in-Chrome MCP extension. Use it for:
- Viewing Vercel deployment logs and build errors
- Testing the SAGE homepage and interactive map
- Checking ArcGIS service responses in browser
- Debugging map rendering issues visually

Key browser tools:
- `mcp__Claude_in_Chrome__navigate` - Go to URLs
- `mcp__Claude_in_Chrome__computer` - Take screenshots, click, type
- `mcp__Claude_in_Chrome__read_page` - Get page content/accessibility tree
- `mcp__Claude_in_Chrome__find` - Find elements by description

## Skills

### sage-architecture
Core codebase structure and patterns.
Instruction: @sage-architecture.md

### sage-tools
MCP tool development patterns and conventions.
Instruction: @sage-tools.md

### sage-esri
ArcGIS/ESRI API patterns and map rendering.
Instruction: @sage-esri.md

### sage-workflow
Development workflow and best practices.
Instruction: @sage-workflow.md
