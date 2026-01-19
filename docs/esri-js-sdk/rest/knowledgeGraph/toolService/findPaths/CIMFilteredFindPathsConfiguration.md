# CIMFilteredFindPathsConfiguration

**Module:** `@arcgis/core/rest/knowledgeGraph/toolService/findPaths/CIMFilteredFindPathsConfiguration`

## Import

```javascript
import CIMFilteredFindPathsConfiguration from "@arcgis/core/rest/knowledgeGraph/toolService/findPaths/CIMFilteredFindPathsConfiguration.js";
```

```javascript
// CDN
const CIMFilteredFindPathsConfiguration = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/toolService/findPaths/CIMFilteredFindPathsConfiguration.js");
```

**Since:** 4.32

## Property Details

### `CIMFilteredFindPathsConfiguration`

### `declaredClass`
- **Type:** `Inherited`

### `defaultTraversalDirectionType`

### `destinationEntities`

### `entityUsage`

### `maxCountPaths`

### `maxPathLength`

### `minPathLength`

### `name`

### `originEntities`

### `pathFilters`

### `pathMode`

### `traversalDirections`

### `type`

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
knowledgeGraphService.executeFindPaths({
    inKnowledgeGraphUrl: "https://sampleserver7.arcgisonline.com/server/rest/services/Hosted/BumbleBees/KnowledgeGraphServer",
    config: {
			type: "CIMFilteredFindPathsConfiguration",
			name: "exampleFFPconfiguration",
			originEntities: [
				{
					type: "CIMFilteredFindPathsEntity",
					iD: devPathStart,
					entityTypeName: "User"
				}
			],
			destinationEntities: [
				{
					type: "CIMFilteredFindPathsEntity",
					iD: devPathEnd,
					entityTypeName: "Species"
				}
			],
			pathFilters: [
				{
					type: "CIMFilteredFindPathsPathFilter",
					iD: null,
					itemTypeName: "Observation",
					itemType: "Entity",
					filterType: "Include"
				}
			],
			defaultTraversalDirectionType: "Any",
			entityUsage: "EachPair",
			pathMode: "All",
			minPathLength: 1,
			maxPathLength: 8,
			maxCountPaths: 100000
		}
  });
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

