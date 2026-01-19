# ServiceDefinition

**Module:** `@arcgis/core/rest/knowledgeGraph/ServiceDefinition`

## Import

```javascript
import ServiceDefinition from "@arcgis/core/rest/knowledgeGraph/ServiceDefinition.js";
```

```javascript
// CDN
const ServiceDefinition = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/ServiceDefinition.js");
```

**Since:** 4.26

## Overview

Outlines the service capabilities for a knowledgeGraphService.

## See Also

- An introduction to provenance
- Adding provenance to a knowledge graph

## Property Details

### `allowGeometryUpdates`

### `capabilities`

### `copyrightText`

### `currentVersion`

### `dataEditingNotSupported`

### `dateFieldsTimeReference`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `maxRecordCount`

### `schemaEditingNotSupported`

### `searchMaxRecordCount`

### `serviceCapabilities`

### `serviceItemId`

### `spatialReference`

### `supportedQueryFormats`

### `supportsDocuments`

### `supportsProvenance`

### `supportsSearch`

### `units`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
{
	"allowGeometryUpdates": false,
	"capabilities": [
		"Delete",
		"Query",
		"Create",
		"Editing",
		"Update"
	],
	"copyrightText": "2023 Esri, all rights reserved",
	"currentVersion": 11.0,
	"dataEditingNotSupported": false,
	"dateFieldsTimeReference": {
		"respectsDaylightSaving": false,
		"timeZone": "UTC"
	},
	"description": "Supply chain data",
	"maxRecordCount": 2000,
	"schemaEditingNotSupported": false,
	"searchMaxRecordCount": 2000,
	"serviceCapabilities": {
		"applyEditsCapabilities": {
			"graphDefaultRollbackOnFailure": false
		},
		"geometryCapabilities": {
			"geometryMaxBoundingRectangleSizeX": 180,
			"geometryMaxBoundingRectangleSizeY": 180,
			"supportedGeometryTypes": [
				"Point",
				"Mulitpoint",
				"Polyline",
				"Polygon"
			],
			"supportsMValues": false,
			"supportsZValues": false
		},
		"indexCapabilities": {
			"supportsDecendingIndex": false,
			"supportsRelationshipIndex": true,
			"supportsUniqueRelationshipConstraint": false
		}
	},
	"searchCapabilities": {
		"allowLeadingWildcardQueries": true,
		"searchTypeFilterCapabilities": [
			"esriTypeEntity",
			"esriTypeRelationship",
			"esriTypeBoth"
		]
	},
	"serviceItemId": "87941a7420e84933882502ff2e9a5c34",
	"spatialReference": {
		"wkid": 4326
	},
	"supportedQueryFormats": [
		"PBF"
	],
	"supportsDocuments": true,
	"supportsSearch": true,
	"units": "esriDecimalDegrees",
	"url": "https://myHostName.domain.com/server/rest/services/Hosted/myServiceName/KnowledgeGraphServer"
}
```

```javascript
["Query", "Editing", "Delete", "Create", "Update"]
```

```javascript
"serviceCapabilities": {
	"applyEditsCapabilities": {
		"graphDefaultRollbackOnFailure": false
	},
	"geometryCapabilities": {
		"geometryMaxBoundingRectangleSizeX": 180,
		"geometryMaxBoundingRectangleSizeY": 180,
		"supportedGeometryTypes": [
			"Point",
			"Mulitpoint",
			"Polyline",
			"Polygon"
		],
		"supportsMValues": false,
		"supportsZValues": false
	},
	"indexCapabilities": {
		"supportsDecendingIndex": false,
		"supportsRelationshipIndex": true,
		"supportsUniqueRelationshipConstraint": false
	}
	},
	"searchCapabilities": {
	"allowLeadingWildcardQueries": true,
	"searchTypeFilterCapabilities": [
		"esriTypeEntity",
		"esriTypeRelationship",
		"esriTypeBoth"
	]
}
```

```javascript
// Manually manage handles
const handle = reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
);

this.addHandles(handle);

// Destroy the object
this.destroy();
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

