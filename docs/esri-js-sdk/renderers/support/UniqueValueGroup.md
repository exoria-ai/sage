# UniqueValueGroup

**Module:** `@arcgis/core/renderers/support/UniqueValueGroup`

## Import

```javascript
import UniqueValueGroup from "@arcgis/core/renderers/support/UniqueValueGroup.js";
```

```javascript
// CDN
const UniqueValueGroup = await $arcgis.import("@arcgis/core/renderers/support/UniqueValueGroup.js");
```

**Since:** 4.25

## See Also

- UniqueValueRenderer.uniqueValueGroups

## Property Details

### `UniqueValueGroup`

### `classes`

### `declaredClass`
- **Type:** `Inherited`

### `heading`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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
// This example groups categories under three headings:
// Commercial, Residential, and Other
layer.renderer = {
  type: "unique-value",
  field: "zonecode",
  uniqueValueGroups: [{
    heading: "Commercial",
    classes: [{
      label: "C-2 | Community Commercial",
      symbol: createSymbol([255,179,219]),
      values: ["C-1", "C-2"]
    }, {
      label: "C-3 | Major Commercial",
      symbol: createSymbol([255,0,0]),
      values: "C-3"
    }]
  }, {
    heading: "Residential",
    classes: [{
      label: "R-1 | Low-Density Residential",
      symbol: createSymbol([255,255,224]),
      values: "R-1"
    }, {
      label: "R-3 | Limited High-Density Residential",
      symbol: createSymbol([255,214,0]),
      values: "R-3"
    }, {
      label: "R-4 | High-Density Residential",
      symbol: createSymbol([255,166,0]),
      values: "R-4",
    }]
  }, {
    heading: "Other",
    classes: [{
      label: "S | Special Area",
      symbol: createSymbol([161,237,237]),
      values: ["S-DW", "S-DR", "S-RP", "S-JW", "S-RN", "S-WS"]
    }]
  }]
};
```

```javascript
commercialGroup.classes = [{
  label: "C-2 | Community Commercial",
  symbol: {
    type: "simple-fill",
    color: [255,179,219]
  },
  values: ["C-1", "C-2"]
}, {
  label: "C-3 | Major Commercial",
  symbol: {
    type: "simple-fill",
    color: 255,0,0
  },
  values: "C-3"
}];
```

```javascript
commercialGroup.heading = "Commercial";
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

