# PlaybackInfo

**Module:** `@arcgis/core/layers/support/PlaybackInfo`

## Import

```javascript
import PlaybackInfo from "@arcgis/core/layers/support/PlaybackInfo.js";
```

```javascript
// CDN
const PlaybackInfo = await $arcgis.import("@arcgis/core/layers/support/PlaybackInfo.js");
```

**Since:** 4.33

## See Also

- VideoLayer.playbackInfo

## Property Details

### `PlaybackInfo`

### `aspectRatio`

### `containerFormat`

### `declaredClass`
- **Type:** `Inherited`

### `framerate`

### `gop`

### `klv`

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

