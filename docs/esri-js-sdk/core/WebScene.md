# WebScene

**Module:** `@arcgis/core/WebScene`

## Import

```javascript
import WebScene from "@arcgis/core/WebScene.js";
```

```javascript
// CDN
const WebScene = await $arcgis.import("@arcgis/core/WebScene.js");
```

```javascript
// CDN
const [esriRequest, WebScene] = await $arcgis.import("@arcgis/core/request.js", "@arcgis/ccore/WebScene.js");
```

**Since:** 4.0

## See Also

- Sample - Load a basic WebScene
- Sample - Save a WebScene
- Sample - WebScene slides
- PortalItem
- Sample - SceneLayer
- clippingEnabled
- clippingArea
- Editor
- Sample - Edit features with the Editor widget
- Sample - Editor widget with configurations
- FocusAreas
- Sample - Focus Area
- ElevationLayer
- Ground
- Slide
- Sample - WebScene slides
- Sample - Creating a FeatureLayer - Add an array of client-side features
- FeatureLayer.isTable
- Sample - Save a web map
- layer collection's push() method
- layer collection's push() method
- Map.destroy()
- WebMap.destroy()
- Basemap.destroy()
- Ground.destroy()
- Layer.destroy()
- PortalItem.destroy()
- portalItem
- load
- updateFrom
- Sample - Save a WebScene
- updateFrom
- Sample - Save a WebScene
- save
- saveAs
- updateFrom
- save
- saveAs

## Property Details

### `WebScene`

### `allLayers`
- **Type:** `Inherited`

### `allTables`
- **Type:** `Inherited`

### `applicationProperties`

### `authoringApp`

### `authoringAppVersion`

### `basemap`
- **Type:** `Inherited`

### `clippingArea`

### `clippingEnabled`

### `declaredClass`
- **Type:** `Inherited`

### `editableLayers`
- **Type:** `Inherited`

### `floorInfo`

### `focusAreas`
- **Type:** `Inherited`

### `ground`
- **Type:** `Inherited`

### `heightModelInfo`

### `initialViewProperties`

### `layers`
- **Type:** `Inherited`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `loaded`

### `portalItem`

### `presentation`

### `sourceVersion`

### `tables`
- **Type:** `Inherited`

### `thumbnailUrl`

### `version`

### `widgets`

### `add`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `addMany`
- **Type:** `Inherited`

### `cancelLoad`

### `destroy`

### `findLayerById`
- **Type:** `Inherited`

### `findTableById`
- **Type:** `Inherited`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `loadAll`

### `remove`
- **Type:** `Inherited`

### `removeAll`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `removeMany`
- **Type:** `Inherited`

### `reorder`
- **Type:** `Inherited`

### `save`

### `saveAs`

### `toJSON`

### `updateFrom`

### `updateThumbnail`

### `when`

### `Widgets`


## Method Details

### `Method Details()`


## Examples

```javascript
const scene = new WebScene({
  portalItem: { // autocasts as new PortalItem()
    id: "affa021c51944b5694132b2d61fe1057"  // ID of the WebScene on arcgis.com
  }
});
```

```javascript
esriConfig.portalUrl = "https://myHostName.esri.com/arcgis";

const scene = new WebScene({
  portalItem: { // autocasts as new PortalItem()
    id: "0614ea1f9dd043e9ba157b9c20d3c538" // ID of the WebScene on the on-premise portal
  }
});
```

```javascript
const view = new SceneView({
  map: scene,  // The WebScene instance created above
  container: "viewDiv"
});
```

```javascript
scene.when(function() {
  // All layers and the basemap have been created
});
view.when(function() {
  // All layer and basemap resources have been loaded and are ready to be displayed
});
```

```javascript
const portal = new Portal({
  url: "https://myportal.arcgis.com/", // the url of the portal
  authMode: "immediate" // user authenticates by signing in when the Portal is loaded
});
// once the portal is loaded save the web scene to the portal as a new web scene
portal.load().then(function() {
  webscene.saveAs({
    title: "My Scene",
    portal: portal
  })
  .then(function() {
    console.log("Scene was saved");
  })
  .catch(function(err) {
    console.log(err);
  });
})
```

```javascript
// Typical usage
const scene = new WebScene({
  portalItem: {
    id: "affa021c51944b5694132b2d61fe1057"
  }
});
```

