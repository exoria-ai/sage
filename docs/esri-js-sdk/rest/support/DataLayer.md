# DataLayer

**Module:** `@arcgis/core/rest/support/DataLayer`

## Import

```javascript
import DataLayer from "@arcgis/core/rest/support/DataLayer.js";
```

```javascript
// CDN
const DataLayer = await $arcgis.import("@arcgis/core/rest/support/DataLayer.js");
```

**Since:** 4.20

## Property Details

### `DataLayer`

### `declaredClass`
- **Type:** `Inherited`

### `doNotLocateOnRestrictedElements`

### `geometry`

### `geometryType`

### `name`

### `spatialRelationship`

### `type`

### `where`

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
let stops = new DataLayer();
stops.geometry = view.extent;
```

```javascript
let stops = new DataLayer();
stops.name = "Hospitals";
```

```javascript
let stops = new DataLayer();
stops.spatialRelationship = "contains";
```

```javascript
let stops = new DataLayer();
stops.where = "POP2000 > 350000";
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

