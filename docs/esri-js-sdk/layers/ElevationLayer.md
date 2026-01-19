# ElevationLayer

**Module:** `@arcgis/core/layers/ElevationLayer`

## Import

```javascript
import ElevationLayer from "@arcgis/core/layers/ElevationLayer.js";
```

```javascript
// CDN
const ElevationLayer = await $arcgis.import("@arcgis/core/layers/ElevationLayer.js");
```

**Since:** 4.0

## See Also

- Sample - 3D Map with elevation services
- Sample - Query Elevation (points)
- ArcGIS Blog - Creating and Using Elevation Layers in ArcGIS Online & ArcGIS Pro
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

### `ElevationLayer`

### `copyright`

### `declaredClass`
- **Type:** `Inherited`

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

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `portalItem`

### `sourceJSON`

### `spatialReference`

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

### `createElevationSampler`

### `createLayerView`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

### `fetchTile`

### `getTileUrl`

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

### `queryElevation`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`

### `ElevationQueryResult`


## Method Details

### `Method Details()`


## Examples

```javascript
let elevLyr = new ElevationLayer({
  // Custom elevation service
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Elevation/MtBaldy_Elevation/ImageServer"
});
// Add elevation layer to the map's ground.
map.ground.layers.add(elevLyr);
```

```javascript
// Once the layer loads, set the view's extent to the layer's fullextent
layer.when(function(){
  view.extent = layer.fullExtent;
});
```

```javascript
// Makes the layer 50% transparent
layer.opacity = 0.5;
```

```javascript
// While this example uses FeatureLayer, this same pattern can be
// used for other layers that may be loaded from portalItem ids.
const layer = new FeatureLayer({
  portalItem: {  // autocasts as new PortalItem()
    id: "caa9bd9da1f4487cb4989824053bb847"
  }  // the first layer in the service is returned
});
```

```javascript
// Set hostname when using an on-premise portal (default is ArcGIS Online)
// esriConfig.portalUrl = "http://myHostName.esri.com/arcgis";

// While this example uses FeatureLayer, this same pattern can be
// used for SceneLayers.
const layer = new FeatureLayer({
  portalItem: {  // autocasts as new PortalItem()
    id: "8d26f04f31f642b6828b7023b84c2188"
  },
  // loads the third item in the given feature service
  layerId: 2
});
```

```javascript
// Initialize GeoJSONLayer by referencing a portalItem id pointing to geojson file.
const layer = new GeoJSONLayer({
  portalItem: new PortalItem({
    id: "81e769cd7031482797e1b0768f23c7e1",
    // optionally define the portal, of the item.
    // if not specified, the default portal defined is used.
    // see https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html#portalUrl
    portal: new Portal({
      url: "https://jsapi.maps.arcgis.com/"
    })
  }
});
```

