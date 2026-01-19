# RelationshipQuery

**Module:** `@arcgis/core/rest/support/RelationshipQuery`

## Import

```javascript
import RelationshipQuery from "@arcgis/core/rest/support/RelationshipQuery.js";
```

```javascript
// CDN
const RelationshipQuery = await $arcgis.import("@arcgis/core/rest/support/RelationshipQuery.js");
```

**Since:** 4.20

## See Also

- query
- Sample - Query Related Features
- FeatureLayer.capabilities

## Property Details

### `RelationshipQuery`

### `cacheHint`

### `declaredClass`
- **Type:** `Inherited`

### `gdbVersion`

### `geometryPrecision`

### `historicMoment`

### `maxAllowableOffset`

### `num`

### `objectIds`

### `orderByFields`

### `outFields`

### `outSpatialReference`

### `relationshipId`

### `returnGeometry`

### `returnM`

### `returnZ`

### `start`

### `where`

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
query.orderByFields = ["STATE_NAME DESC"];
```

```javascript
query.outFields = [ "NAME", "STATE_ABBR", "POP04" ];
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

