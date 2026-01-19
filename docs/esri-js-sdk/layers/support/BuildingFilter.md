# BuildingFilter

**Module:** `@arcgis/core/layers/support/BuildingFilter`

## Import

```javascript
import BuildingFilter from "@arcgis/core/layers/support/BuildingFilter.js";
```

```javascript
// CDN
const BuildingFilter = await $arcgis.import("@arcgis/core/layers/support/BuildingFilter.js");
```

**Since:** 4.12

## See Also

- Sample - Filter BuildingScenelayer
- BuildingSceneLayer.filters

## Property Details

### `BuildingFilter`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `filterBlocks`

### `id`

### `name`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `BuildingFilterBlock`


## Method Details

### `Method Details()`


## Examples

```javascript
// define a floor filter
const buildingFilter = new BuildingFilter({
  filterBlocks: [{
    // an SQL expression that filters using the BldgLevel field
    filterExpression: "BldgLevel = 3",
    filterMode: {
      type: "wire-frame",
      edges: {
         type: "solid",
         color: [0, 0, 0, 0.8]
      }
    }
  }]
});
// set the filter in the filters array on the layer
buildingLayer.filters = [buildingFilter];
// specify which filter is the one that should be applied
buildingLayer.activeFilterId = buildingFilter.id;
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

