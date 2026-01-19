# AreasAndLengthsParameters

**Module:** `@arcgis/core/rest/support/AreasAndLengthsParameters`

## Import

```javascript
import AreasAndLengthsParameters from "@arcgis/core/rest/support/AreasAndLengthsParameters.js";
```

```javascript
// CDN
const AreasAndLengthsParameters = await $arcgis.import("@arcgis/core/rest/support/AreasAndLengthsParameters.js");
```

**Since:** 4.20

## See Also

- geometryService.areasAndLengths()
- ArcGIS REST API - Areas and Lengths

## Property Details

### `AreasAndLengthsParameters`

### `areaUnit`

### `calculationType`

### `declaredClass`
- **Type:** `Inherited`

### `lengthUnit`

### `polygons`

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

