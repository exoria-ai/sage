# NetworkUrl

**Module:** `@arcgis/core/rest/support/NetworkUrl`

## Import

```javascript
import NetworkUrl from "@arcgis/core/rest/support/NetworkUrl.js";
```

```javascript
// CDN
const NetworkUrl = await $arcgis.import("@arcgis/core/rest/support/NetworkUrl.js");
```

**Since:** 4.21

## See Also

- closestFacility
- route
- serviceArea

## Property Details

### `NetworkUrl`

### `declaredClass`
- **Type:** `Inherited`

### `doNotLocateOnRestrictedElements`

### `url`

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

