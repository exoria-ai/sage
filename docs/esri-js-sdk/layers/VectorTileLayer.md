# VectorTileLayer

**Module:** `@arcgis/core/layers/VectorTileLayer`

## Import

```javascript
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer.js";
```

```javascript
// CDN
const VectorTileLayer = await $arcgis.import("@arcgis/core/layers/VectorTileLayer.js");
```

**Since:** 4.0

## See Also

- TileLayer
- WebTileLayer
- Sample - Vector tiles
- Sample - VectorTileLayer from JSON
- Sample - VectorTileLayer - update style layers
- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- refresh()
- refresh event
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Sample - VectorTileLayer - update style layers
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- Sample - VectorTileLayer - update style layers
- Sample - VectorTileLayer - update style layers
- Sample - VectorTileLayer - update style layers
- refreshInterval
- refresh event
- Sample - VectorTileLayer - update style layers
- Sample - VectorTileLayer - update style layers
- View.whenLayerView()
- View.whenLayerView()
- refreshInterval
- refresh()

## Property Details

### `VectorTileLayer`

### `apiKey`

### `attributionDataUrl`

### `blendMode`

### `capabilities`

### `currentStyleInfo`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `effect`

### `fullExtent`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `initialExtent`

### `listMode`
- **Type:** `Inherited`

### `loadError`
- **Type:** `Inherited`

### `loadStatus`
- **Type:** `Inherited`

### `loadWarnings`
- **Type:** `Inherited`

### `loaded`
- **Type:** `Inherited`

### `maxScale`

### `minScale`

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `portalItem`

### `refreshInterval`

### `spatialReference`

### `style`

### `tileInfo`

### `title`

### `type`

### `uid`
- **Type:** `Inherited`

### `url`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`
- **Type:** `Inherited`

### `createLayerView`
- **Type:** `Inherited`

### `deleteStyleLayer`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

### `getLayoutProperties`

### `getPaintProperties`

### `getStyleLayer`

### `getStyleLayerId`

### `getStyleLayerIndex`

### `getStyleLayerVisibility`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `load`
- **Type:** `Inherited`

### `loadStyle`

### `on`
- **Type:** `Inherited`

### `refresh`

### `removeHandles`
- **Type:** `Inherited`

### `setLayoutProperties`

### `setPaintProperties`

### `setSpriteSource`

### `setStyleLayer`

### `setStyleLayerVisibility`

### `when`
- **Type:** `Inherited`

### `ImageObject`

### `SpriteInfo`

### `SpriteSource`

### `SpriteSourceImageInfo`

### `SpriteSourceUrlInfo`

### `getSpriteInfo`


## Method Details

### `Method Details()`


## Examples

```javascript
// Example 1: Create a VectorTileLayer from vector tile service URL by setting the layer's url property
const VectorTileLayer = await $arcgis.import("@arcgis/core/layers/VectorTileLayer.js");
const layer = new VectorTileLayer({
  // esri world vector tile service
  url: "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer"
});
map.add(layer);
```

```javascript
// Example 2: Create a VectorTileLayer from the vector tile style endpoint by setting the layer's url property
const layer = new VectorTileLayer({
  // esri colored pencil style
  url:
   "https://www.arcgis.com/sharing/rest/content/items/4cf7e1fb9f254dcda9c8fbadb15cf0f8/resources/styles/root.json"
});
map.add(layer);
```

```javascript
// Example 3: Create a VectorTileLayer from a TileJSON source
const layer = new VectorTileLayer({
  url: "https://your-tile-json-url?f=tilejson"
});
map.add(layer);
```

```javascript
// points to the charted territory vector tile portal item in ArcGIS Online
// https://www.arcgis.com/home/item.html?id=1c365daf37a744fbad748b67aa69dac8
let layer = new VectorTileLayer({
 portalItem:{
   id: "1c365daf37a744fbad748b67aa69dac8"
 }
});
map.add(layer);  // adds the layer to the map
```

```javascript
// create a new instance of VectorTileLayer from style JSON object
// by setting the layer's style property
const layer = new VectorTileLayer({
  style: {
    glyphs: "glyphsUrl/{fontstack}/{range}.pbf",
    version: 8,
    sprite: "spritesUrl/sprites/sprite",
    sources: {
      esri: {
        url: "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer",
        type: "vector"
      }
    },
    layers: [ ... ]
  }
});
map.add(layer);  // adds the layer to the map
```

```javascript
// add a mid-century vector tile layer from its portal item
let layer = new VectorTileLayer({
 portalItem:{
   id: "7675d44bb1e4428aa2c30a9b68f97822"
 }
});
map.add(layer);  // adds the layer to the map

// replace the style of this layer to point to modern antique style
layer.loadStyle(
  "https://www.arcgis.com/sharing/rest/content/items/effe3475f05a4d608e66fd6eeb2113c0/resources/styles/root.json"
);
```

