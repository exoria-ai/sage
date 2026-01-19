# RouteLayer

**Module:** `@arcgis/core/layers/RouteLayer`

## Import

```javascript
import RouteLayer from "@arcgis/core/layers/RouteLayer.js";
```

```javascript
// CDN
const RouteLayer = await $arcgis.import("@arcgis/core/layers/RouteLayer.js");
```

**Since:** 4.23

## See Also

- route
- RouteParameters
- Directions
- Sample - Intro to RouteLayer
- Layer blending samples
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- config.routeServiceUrl
- Portal.helperServices
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- saveAs()
- save()
- update()
- solve()
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `RouteLayer`

### `blendMode`

### `declaredClass`
- **Type:** `Inherited`

### `defaultSymbols`

### `directionLines`

### `directionPoints`

### `effect`

### `fullExtent`
- **Type:** `Inherited`

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
- **Type:** `Inherited`

### `maxScale`

### `minScale`

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `pointBarriers`

### `polygonBarriers`

### `polylineBarriers`

### `portalItem`

### `routeInfo`

### `stops`

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

### `save`

### `saveAs`

### `solve`

### `update`

### `when`
- **Type:** `Inherited`

### `RouteLayerSolveResult`


## Method Details

### `Method Details()`


## Examples

```javascript
// Routing with the RouteLayer's default route service requires an apikey.
const apiKey = "<your api key>";

// A minimum of two stops is required for routing.
const stops = [
  new Stop({ geometry: { x: -117.1825, y: 34.054722 }}),
  new Stop({ geometry: { x: -116.545278, y: 33.830278 }})
];

// Create route layer and assign the stops. Only solved routelayers will be rendered.
const routeLayer = new RouteLayer({
  stops
});

// Create a view and add the routelayer to the view's map.
const view = new MapView({
  container: "viewDiv",
  map: new Map({
    basemap: "dark-gray-vector",
    layers: [ routeLayer ]
  })
});

// Wait for the view to load since we'll be zooming to the extent of the zoomed solution.
view.when().then(async () => {
  // Solve the route using routelayer stops and barries and additional properties from the parsed RouteParameters
  // object. Use the RouteParameters to provide the apiKey and other setting like directions language and travel
  // mode.
  const results = await routeLayer.solve({ apiKey });

  // Use the returned result to update the RouteLayer. This method will overwrite the stops, barriers, directions and
  // routeInfo properties.
  routeLayer.update(results);

  // Zoom to the extent of the solve route.
  view.goTo(routeLayer.routeInfo.geometry);
});
```

```javascript
// When a route is solved, display the direction lines with a thick cyan line and hide both diection points and the
// overall route line.
const layer = new RouteLayer({
  defaultSymbols: {
   directionLines: {
     type: "simple-line",
     color: [105, 220, 255],
     width: 7,
     cap: "round",
     join: "round"
   },
   directionPoints: {
     type: "simple-marker",
     size: 0
   },
   routeInfo: {
     type: "simple-line",
     width: 0
   }
  }
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

