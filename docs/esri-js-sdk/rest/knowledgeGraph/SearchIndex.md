# SearchIndex

**Module:** `@arcgis/core/rest/knowledgeGraph/SearchIndex`

## Import

```javascript
import SearchIndex from "@arcgis/core/rest/knowledgeGraph/SearchIndex.js";
```

```javascript
// CDN
const SearchIndex = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/SearchIndex.js");
```

**Since:** 4.26

## Overview

Defines a search index for a KnowledgeGraph.

## Property Details

### `analyzers`

### `declaredClass`
- **Type:** `Inherited`

### `name`

### `searchProperties`

### `supportedCategory`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `SearchProperties`


## Method Details

### `Method Details()`


## Examples

```javascript
//structure of a search index in a knowledge graph data model.
{
	"analizers": [
		{
			"name": "text_en"
		}
	],
	"name": "esri__search_idx",
	"searchProperties": [
		{
			"key": "Supplier",
			"value": {
				"propertyNames": [
					"name",
					"EmployeeCount",
					"globalid"
				]
			}
		},
		{
			"key": "buys_part",
			"value": {
				"propertyNames": [
					"quantity",
					"globalid"
				]
			}
		},
		{
			"key": "Part",
			"value": {
				"propertyNames": [
					"name",
					"globalid"
				]
			}
		}
	],
	"supportedCategory": "Both"
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

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

