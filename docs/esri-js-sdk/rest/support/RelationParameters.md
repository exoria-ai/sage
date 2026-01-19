# RelationParameters

**Module:** `@arcgis/core/rest/support/RelationParameters`

## Import

```javascript
import RelationParameters from "@arcgis/core/rest/support/RelationParameters.js";
```

```javascript
// CDN
const RelationParameters = await $arcgis.import("@arcgis/core/rest/support/RelationParameters.js");
```

**Since:** 4.0

## See Also

- geometryService.relation()
- ArcGIS REST API - Relation

## Property Details

### `RelationParameters`

### `declaredClass`
- **Type:** `Inherited`

### `geometries1`

### `geometries2`

### `relation`

### `relationParameter`

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

