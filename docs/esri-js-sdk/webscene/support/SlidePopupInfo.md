# SlidePopupInfo

**Module:** `@arcgis/core/webscene/support/SlidePopupInfo`

## Import

```javascript
import SlidePopupInfo from "@arcgis/core/webscene/support/SlidePopupInfo.js";
```

```javascript
// CDN
const SlidePopupInfo = await $arcgis.import("@arcgis/core/webscene/support/SlidePopupInfo.js");
```

**Since:** 4.33

## See Also

- FeatureReference

## Property Details

### `SlidePopupInfo`

### `declaredClass`
- **Type:** `Inherited`

### `features`

### `location`

### `selectedFeatureIndex`

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

