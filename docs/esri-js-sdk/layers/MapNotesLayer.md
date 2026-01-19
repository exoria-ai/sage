# MapNotesLayer

**Module:** `@arcgis/core/layers/MapNotesLayer`

## Import

```javascript
import MapNotesLayer from "@arcgis/core/layers/MapNotesLayer.js";
```

```javascript
// CDN
const MapNotesLayer = await $arcgis.import("@arcgis/core/layers/MapNotesLayer.js");
```

**Since:** 4.4

## See Also

- Map
- WebMap
- SketchViewModel
- Sample - MapNotesLayer
- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `blendMode`

### `capabilities`

### `declaredClass`
- **Type:** `Inherited`

### `effect`

### `fullExtent`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `listMode`

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

### `multipointLayer`

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `pointLayer`

### `polygonLayer`

### `polylineLayer`

### `portalItem`

### `textLayer`

### `title`

### `type`

### `uid`
- **Type:** `Inherited`

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

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

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

### `on`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const map = new WebMap({
  portalItem: {
    id: "6b3bfc4900214761a709b5d5a6a3d92b"
  }
});

const view = new MapView({
  container: "viewDiv",
  map
});

view.when(() => {
  // get the layer type ("map-notes")
  console.log(map.layers.at(0).type);
  // get the title
  console.log(map.layers.items[0].sublayers.items[0].sublayers.items[0].attributes.title);
  // update the popupTemplate
  map.layers.items[0].sublayers.items[1].sublayers.items[0].popupTemplate.content = "{title} has an updated popup";
});
```

```javascript
const map = new Map({
  basemap: "topo-vector"
});

const view = new MapView({
  container: "viewDiv",
  map
});

const promise = Layer.fromPortalItem({
  portalItem: {
    id: "2e2f6840647d4cb9a384532652e5100f"
  }
});
promise.then((layer) => {
  console.log(layer.type); // "map-notes"
  map.add(layer);

  Promise.all([view.when(), layer.load()]).then(() => {
    view.goTo(layer.fullExtent);
  });
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
// Once the layer loads, set the view's extent to the layer's fullextent
layer.when(function(){
  view.extent = layer.fullExtent;
});
```

```javascript
// The layer will not be visible when the view is zoomed in beyond a scale of 1:1,000
layer.maxScale = 1000;
```

