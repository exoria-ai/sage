# Directions

**Module:** `@arcgis/core/widgets/Directions`

## Import

```javascript
import Directions from "@arcgis/core/widgets/Directions.js";
```

```javascript
// CDN
const Directions = await $arcgis.import("@arcgis/core/widgets/Directions.js");
```

**Since:** 4.6

## See Also

- DirectionsViewModel
- RouteLayer
- Guide topic - Access secure resources
- Sample - Directions widget
- MapView
- SceneView
- Heading Elements
- Calcite Icon Search
- RouteLayer.solve()
- RouteLayer.save()
- RouteLayer.saveAs()
- RouteLayer.save()
- RouteLayer.saveAs()

## Property Details

### `Directions`

### `apiKey`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `goToOverride`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `lastRoute`

### `layer`

### `maxStops`

### `searchProperties`

### `unit`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `visibleElements`

### `addHandles`
- **Type:** `Inherited`

### `classes`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `getDirections`

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

### `on`
- **Type:** `Inherited`

### `postInitialize`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `save`

### `saveAs`

### `scheduleRender`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`

### `zoomToRoute`

### `SearchProperties`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
// 1. Add empty RouteLayer to Directions widget

// create a new empty RouteLayer
const routeLayer = new RouteLayer();

// new RouteLayer must be added to the map
// for route visualization
const map = new Map({
  basemap: "topo-vector",
  layers: [routeLayer]
});

// new RouteLayer must be added to Directions widget
const directionsWidget = new Directions({
  view: view,
  layer: routeLayer
});

// adds the Directions widget to the
// top right corner of the view
view.ui.add(directionsWidget, {
  position: "top-right"
});
```

```javascript
// 2. Add RouteLayer from portal to Directions widget

// create a new RouteLayer from a portal item
const routeLayer = new RouteLayer({
  portalItem: { // autocasts as new PortalItem()
    id: "fd4188722f3e4e14986abca86cad80c6"
  }
});

// new RouteLayer must be added to the map
// for route visualization
const map = new Map({
  basemap: "topo-vector",
  layers: [routeLayer]
});

// new RouteLayer must be added to Directions widget
const directionsWidget = new Directions({
  view: view,
  layer: routeLayer
});

// adds the Directions widget to the
// bottom right corner of the view
view.ui.add(directionsWidget, {
  position: "bottom-right"
});
```

```javascript
// 3. Create a Directions widget with 2 pre-set stops

// create a new RouteLayer with 2 stops
const routeLayer = new RouteLayer({
  stops: [
    { name: "Redlands, CA", geometry: { x: -117.1825, y: 34.0547 } },
    { name: "Palm Springs, CA", geometry: { x: -116.5452, y: 33.8302 } }
  ]
});

// new RouteLayer must be added to the map
// for route visualization
const map = new Map({
  basemap: "topo-vector",
  layers: [routeLayer]
});

// new RouteLayer must be added to Directions widget
const directionsWidget = new Directions({
  view: view,
  layer: routeLayer
});
```

```javascript
// 4. Update the empty stops that are automatically added by the Directions widget

// create a new empty RouteLayer
const routeLayer = new RouteLayer();

// new RouteLayer must be added to the map
// for route visualization
const map = new Map({
  basemap: "topo-vector",
  layers: [routeLayer]
});

// new RouteLayer must be added to Directions widget
const directionsWidget = new Directions({
  view: view,
  layer: routeLayer
});

// call the asynchronous function
directionsReady();

// asynchronous function to seed the Directions widget
// with two initials stops (Campton to Plymouth)
// instead of the empty stops
async function directionsReady(){
  await directionsWidget.when();
  directionsWidget.layer.stops.at(0).name = "Campton, NH";
  directionsWidget.layer.stops.at(0).geometry = new Point({ x: -71.64133, y: 43.85191 });
  directionsWidget.layer.stops.at(1).name = "Plymouth, NH";
  directionsWidget.layer.stops.at(1).geometry = new Point({ x: -71.68808, y: 43.75792 });
}
```

```javascript
const directionsWidget = new Directions({
  view: view,
  layer: routeLayer,
  apiKey: "YOUR_API_KEY"
});
// Add the Directions widget to the top right corner of the view
view.ui.add(directionsWidget, {
  position: "top-right"
});
```

```javascript
// Create the HTML div element programmatically at runtime and set to the widget's container
const basemapGallery = new BasemapGallery({
  view: view,
  container: document.createElement("div")
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

