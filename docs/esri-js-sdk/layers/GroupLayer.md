# GroupLayer

**Module:** `@arcgis/core/layers/GroupLayer`

## Import

```javascript
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";
```

```javascript
// CDN
const GroupLayer = await $arcgis.import("@arcgis/core/layers/GroupLayer.js");
```

**Since:** 4.0

## See Also

- Sample - GroupLayer with LayerList widget
- GroupLayerView
- FeatureLayer
- MapImageLayer
- TileLayer
- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- Sample - Creating a FeatureLayer - Add an array of client-side features
- FeatureLayer.isTable
- Sample - Save a web map
- Sample - GraphicsLayer with visibilityTimeExtent
- layer collection's push() method
- layer collection's push() method
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- load
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `GroupLayer`

### `allLayers`

### `allTables`

### `blendMode`

### `declaredClass`
- **Type:** `Inherited`

### `effect`

### `id`
- **Type:** `Inherited`

### `layers`

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

### `tables`

### `title`
- **Type:** `Inherited`

### `type`

### `uid`
- **Type:** `Inherited`

### `visibilityMode`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `add`

### `addHandles`
- **Type:** `Inherited`

### `addMany`

### `cancelLoad`
- **Type:** `Inherited`

### `createLayerView`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `findLayerById`

### `findTableById`

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

### `loadAll`

### `on`
- **Type:** `Inherited`

### `remove`

### `removeAll`

### `removeHandles`
- **Type:** `Inherited`

### `removeMany`

### `reorder`

### `save`

### `saveAs`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Find a layer with title "US Counties"
const foundLayer = groupLayer.allLayers.find((layer) => {
 return layer.title === "US Counties";
});

// Listen for any layer being added or removed in the GroupLayer
groupLayer.allLayers.on("change", (event) => {
 console.log("Layer added: ", event.added);
 console.log("Layer removed: ", event.removed);
 console.log("Layer moved: ", event.moved);
});
```

```javascript
// A feature layer where isTable = true.
const foundTable = groupLayer.allTables.find((table) => {
  // Find a table with title "US Counties"
  return table.title === "US Counties";
});
```

```javascript
// the following effect will be applied to the layer at all scales
// brightness will be applied first, then hue-rotate followed by contrast
// changing order of the effects will change the final result
layer.effect = "brightness(5) hue-rotate(270deg) contrast(200%)";
```

```javascript
// set a scale dependent bloom effect on the layer
layer.effect = [
  {
    scale: 36978595,
    value: "drop-shadow(3px, 3px, 4px)"
  },
  {
    scale: 18489297,
    value: "drop-shadow(2px, 2px, 3px)"
  },
  {
    scale: 4622324,
    value: "drop-shadow(1px, 1px, 2px)"
  }
];
```

```javascript
let layer = new GraphicsLayer();
// The layer belongs to map1
map1.layers.add(layer);
// The layer now belongs to map2
// and implicitly does: map1.layers.remove(layer)
map2.layers.add(layer);
```

```javascript
// Add layers in the constructor of Map using an array
let fl = new FeatureLayer(url);
let gl = new GraphicsLayer();
let map = new Map({
  layers: [fl, gl]
});

// Add layers using add()
map.addMany([fl, gl]);

// Add layers using layers collection
map.layers.addMany([fl, gl]);

// Add layers using layers collection's push method
map.layers.push(fl, gl);
```

