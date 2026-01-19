# ProjectParameters

**Module:** `@arcgis/core/rest/support/ProjectParameters`

## Import

```javascript
import ProjectParameters from "@arcgis/core/rest/support/ProjectParameters.js";
```

```javascript
// CDN
const ProjectParameters = await $arcgis.import("@arcgis/core/rest/support/ProjectParameters.js");
```

**Since:** 4.0

## See Also

- geometryService.project()
- ArcGIS REST API - Project

## Property Details

### `ProjectParameters`

### `declaredClass`
- **Type:** `Inherited`

### `geometries`

### `outSpatialReference`

### `transformForward`

### `transformation`

### `addHandles`
- **Type:** `Inherited`

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

