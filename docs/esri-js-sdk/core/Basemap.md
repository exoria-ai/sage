# Basemap

**Module:** `@arcgis/core/Basemap`

## Import

```javascript
import Basemap from "@arcgis/core/Basemap.js";
```

```javascript
// CDN
const Basemap = await $arcgis.import("@arcgis/core/Basemap.js");
```

**Since:** 4.0

## See Also

- Basemap Layers
- BasemapGallery Widget
- BasemapToggle Widget
- Map
- Zoom and LODs
- Sample - Create a custom basemap
- Sample - PopupTemplate with promise (basemap from PortalItem)
- Sample - Custom basemap
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Ground.destroy()
- Layer.destroy()
- PortalItem.destroy()
- load

## Property Details

### `Basemap`

### `baseLayers`

### `declaredClass`
- **Type:** `Inherited`

### `id`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `loaded`

### `portalItem`

### `referenceLayers`

### `spatialReference`

### `style`

### `thumbnailUrl`

### `title`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`

### `clone`

### `destroy`

### `fromId`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `loadAll`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `when`


## Method Details

### `Method Details()`


## Examples

```javascript
// in this case the portalItem has to be a webmap
const basemap = new Basemap({
  portalItem: {
    id: "8dda0e7b5e2d4fafa80132d59122268c" // WGS84 Streets Vector webmap
  }
});
```

```javascript
// create the basemap from a basemap id
Basemap.fromId("topo-vector");
```

```javascript
// create a basemap from the basemap styles service
const basemap = new Basemap({
  style: {
    id: "arcgis/outdoor",
    language: "es" // displays basemap place labels in spanish
  }
});
```

```javascript
// create from a third party source
const basemap = new Basemap({
  baseLayers: [
    new WebTileLayer(...)
  ],
  referenceLayers: [
    new WebTileLayer(...)
  ]
});
```

```javascript
// create a basemap from a dynamic MapServer
const basemap = new Basemap({
  baseLayers: [
    new MapImageLayer({
      url: "url to your dynamic MapServer",
      title: "Basemap"
    })
  ],
  title: "basemap",
  id: "basemap"
});

const map = new Map({
  basemap: basemap
});

// create a TileInfo instance using the default settings and
// pass its resulting LOD's to a MapView's constraints
// in this case, lods will match the ArcGIS Online web mercator LODs
const view = new MapView({
  container: "viewDiv",
  map: map,
  constraints: {
    lods: TileInfo.create().lods
  }
});
```

```javascript
const customBasemap = new Basemap({
  baseLayers: [layers],
  title: "Custom Basemap",
  id: "myBasemap"
});
```

