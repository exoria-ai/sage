# TileInfo

**Module:** `@arcgis/core/layers/support/TileInfo`

## Import

```javascript
import TileInfo from "@arcgis/core/layers/support/TileInfo.js";
```

```javascript
// CDN
const TileInfo = await $arcgis.import("@arcgis/core/layers/support/TileInfo.js");
```

**Since:** 4.0

## See Also

- MapView.constraints

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `dpi`

### `format`

### `isWrappable`

### `lods`

### `origin`

### `size`

### `spatialReference`

### `addHandles`
- **Type:** `Inherited`

### `create`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `scaleToZoom`

### `toJSON`

### `zoomToScale`


## Method Details

### `Method Details()`


## Examples

```javascript
// sets the height and width of each tile to [ 256, 256 ]
tileInfo.size = 256;
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
// This snippet shows how to create a TileInfo instance using the default
// settings and passing its resulting LODs to a MapView's constraints

let view = new MapView({
  container: "viewDiv",
  map: map,
  constraints: {
    lods: TileInfo.create().lods
  }
});
```

```javascript
// This snippet shows how to set the MapView scale 1:1 while generating additional LODs for the MapView.constraints.
const spatialReference = new SpatialReference({
  wkid: 2154
});

const center = new Point({
  x: 0,
  y: 0,
  spatialReference
});

// Create LODs from level 0 to 31
const tileInfo = TileInfo.create({
  spatialReference,
  numLODs: 32
});

const lods = tileInfo.lods;

let view = new MapView({
  container: "viewDiv",
  map,
  scale: 1,
  center,
  spatialReference,
  constraints: {
    lods: lods,
    snapToZoom: false
  }
});
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

