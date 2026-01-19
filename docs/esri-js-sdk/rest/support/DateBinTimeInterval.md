# DateBinTimeInterval

**Module:** `@arcgis/core/rest/support/DateBinTimeInterval`

## Import

```javascript
import DateBinTimeInterval from "@arcgis/core/rest/support/DateBinTimeInterval.js";
```

```javascript
// CDN
const DateBinTimeInterval = await $arcgis.import("@arcgis/core/rest/support/DateBinTimeInterval.js");
```

**Since:** 4.32

## Property Details

### `DateBinTimeInterval`

### `declaredClass`
- **Type:** `Inherited`

### `unit`

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

