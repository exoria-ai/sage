# GraphicsLayer

**Module:** `@arcgis/core/layers/GraphicsLayer`

## Import

```javascript
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
```

```javascript
// CDN
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
```

**Since:** 4.0

## See Also

- Sample - Add graphics (MapView)
- Sample - Add graphics (SceneView)
- Graphic
- View.graphics
- FeatureLayer
- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- Graphic
- Sample - GraphicsLayer with visibilityTimeExtent
- Collection events
- graphics collection's push() method
- Collection events
- graphics collection's push() method
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- Collection events
- Collection events
- Collection events
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `GraphicsLayer`

### `blendMode`

### `declaredClass`
- **Type:** `Inherited`

### `effect`

### `elevationInfo`

### `fullExtent`
- **Type:** `Inherited`

### `graphics`

### `id`
- **Type:** `Inherited`

### `listMode`
- **Type:** `Inherited`

### `loadError`
- **Type:** `Inherited`

### `loadStatus`
- **Type:** `Inherited`

### `loadWarnings`
- **Type:** `Inherited`

### `loaded`

### `maxScale`

### `minScale`

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`
- **Type:** `Inherited`

### `screenSizePerspectiveEnabled`

### `title`
- **Type:** `Inherited`

### `type`

### `uid`
- **Type:** `Inherited`

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

### `remove`

### `removeAll`

### `removeHandles`
- **Type:** `Inherited`

### `removeMany`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const [GraphicsLayer, Graphic] = await $arcgis.import([
  "@arcgis/core/layers/GraphicsLayer.js",
  "@arcgis/core/Graphic.js"
]);
// Create graphics
let graphicA = new Graphic({  // graphic with line geometry
  geometry: new Polyline({...}), // set geometry here
  symbol: new SimpleLineSymbol({...}) // set symbol here
});
let graphicB = new Graphic({  // graphic with point geometry
  geometry: new Point({...}), // set geometry here
  symbol: new SimpleMarkerSymbol({...}) // set symbol here
});
let graphicC = new Graphic({  // graphic with polygon geometry
  geometry: new Polygon({...}), // set geometry here
  symbol: new SimpleFillSymbol({...}) // set symbol here
});
let graphicD = new Graphic();
let graphicE = new Graphic();

// Add graphic when GraphicsLayer is constructed
let layer = new GraphicsLayer({
  graphics: [graphicA]
});

// Add graphic to graphics collection
layer.graphics.add(graphicB);

// Add graphic using add()
layer.add(graphicC);
layer.addMany([graphicD, graphicE]);

// Add graphics using push method graphics collection
layer.graphics.push(graphic1, graphic2);

// Add GraphicsLayer to map
map.add(layer);
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
// Add graphics to GraphicsLayer directly as an array
layer.graphics = [graphicA, graphicB];

// Add graphics to layer via Collection
layer.graphics.addMany([graphicC, graphicD]);

// Add graphics to layer via Collection
layer.graphics.push(graphicC, graphicD);
```

```javascript
// The layer will not be visible when the view is zoomed in beyond a scale of 1:1,000
layer.maxScale = 1000;
```

