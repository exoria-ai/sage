# ArealUnit

**Module:** `@arcgis/core/rest/support/ArealUnit`

## Import

```javascript
import ArealUnit from "@arcgis/core/rest/support/ArealUnit.js";
```

```javascript
// CDN
const ArealUnit = await $arcgis.import("@arcgis/core/rest/support/ArealUnit.js");
```

**Since:** 4.30

## See Also

- geoprocessor

## Property Details

### `ArealUnit`

### `area`

### `declaredClass`
- **Type:** `Inherited`

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

