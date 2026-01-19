# ParameterValue

**Module:** `@arcgis/core/rest/support/ParameterValue`

## Import

```javascript
import ParameterValue from "@arcgis/core/rest/support/ParameterValue.js";
```

```javascript
// CDN
const ParameterValue = await $arcgis.import("@arcgis/core/rest/support/ParameterValue.js");
```

**Since:** 4.0

## See Also

- geoprocessor
- GPMessage
- JobInfo
- Geoprocessing service data types

## Property Details

### `dataType`

### `declaredClass`
- **Type:** `Inherited`

### `paramName`

### `value`

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

