# GPMessage

**Module:** `@arcgis/core/rest/support/GPMessage`

## Import

```javascript
import GPMessage from "@arcgis/core/rest/support/GPMessage.js";
```

```javascript
// CDN
const GPMessage = await $arcgis.import("@arcgis/core/rest/support/GPMessage.js");
```

**Since:** 4.20

## See Also

- geoprocessor
- ParameterValue
- JobInfo

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `description`

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

