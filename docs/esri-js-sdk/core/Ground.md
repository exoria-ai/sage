# Ground

**Module:** `@arcgis/core/Ground`

## Import

```javascript
import Ground from "@arcgis/core/Ground.js";
```

```javascript
// CDN
const Ground = await $arcgis.import("@arcgis/core/Ground.js");
```

**Since:** 4.0

## See Also

- Map.ground
- ElevationLayer
- Sample - Underground navigation in global mode
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Layer.destroy()
- PortalItem.destroy()
- load

## Property Details

### `Ground`

### `declaredClass`
- **Type:** `Inherited`

### `layers`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `loaded`

### `navigationConstraint`

### `opacity`

### `surfaceColor`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`

### `clone`

### `createElevationSampler`

### `destroy`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `loadAll`

### `queryElevation`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `when`

### `ElevationQueryResult`


## Method Details

### `Method Details()`


## Examples

```javascript
let map = new Map({
  basemap: "topo-vector",
  ground: "world-elevation"
});
```

```javascript
let map = new Map({
  basemap: "topo-vector",
  ground: "world-topobathymetry"
});
```

```javascript
map.ground.surfaceColor = '#004c73';
```

```javascript
// Adds the esri world elevation service to the ground
let layer = new ElevationLayer({
  url: "//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
});
map.ground.layers.add(layer);
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

