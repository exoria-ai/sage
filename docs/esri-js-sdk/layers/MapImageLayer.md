# MapImageLayer

**Module:** `@arcgis/core/layers/MapImageLayer`

## Import

```javascript
import MapImageLayer from "@arcgis/core/layers/MapImageLayer.js";
```

```javascript
// CDN
const MapImageLayer = await $arcgis.import("@arcgis/core/layers/MapImageLayer.js");
```

**Since:** 4.0

## Inheritance

Extends: **Accessor**

## See Also

- Sublayer
- TileLayer
- Sample - MapImageLayer
- Sample - MapImageLayer: toggle sublayer visibility
- Sample - MapImageLayer: set definition expression
- Sample - MapImageLayer: set renderers on sublayers
- Sample - MapImageLayer: label sublayer features
- Sample - MapImageLayer: create dynamic map layers
- Sample - MapImageLayer: dynamic data layer with table join
- Sample - MapImageLayer: dynamic data layer with query table
- Sample - MapImageLayer: dynamic data layer with raster
- Layer blending samples
- Wikipedia - List of tz database time zones
- Date-time queries | Time zone properties
- ArcGIS REST API - New in 10.9
- What's new in ArcGIS Server
- Edit map service settings
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- Wikipedia - List of tz database time zones
- refresh()
- refresh event
- Sample - GraphicsLayer with visibilityTimeExtent
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- load
- refreshInterval
- refresh event
- View.whenLayerView()
- View.whenLayerView()
- refreshInterval
- refresh()

## Property Details

### `MapImageLayer`

### `allSublayers`

### `blendMode`

### `capabilities`

### `copyright`

### `customParameters`

### `dateFieldsTimeZone`

### `datesInUnknownTimezone`

### `declaredClass`
- **Type:** `Inherited`

### `dpi`

### `effect`

### `fullExtent`

### `gdbVersion`

### `id`
- **Type:** `Inherited`

### `imageFormat`

### `imageMaxHeight`

### `imageMaxWidth`

### `imageTransparency`

### `legendEnabled`

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

### `portalItem`

### `preferredTimeZone`

### `refreshInterval`

### `sourceJSON`

### `spatialReference`

### `sublayers`

### `subtables`

### `timeExtent`

### `timeInfo`

### `timeOffset`

### `title`

### `type`

### `uid`
- **Type:** `Inherited`

### `url`

### `useViewTime`

### `version`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`
- **Type:** `Inherited`

### `createExportImageParameters`

### `createLayerView`
- **Type:** `Inherited`

### `createServiceSublayers`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

### `fetchImage`

### `findSublayerById`

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

### `refresh`

### `removeHandles`
- **Type:** `Inherited`

### `save`

### `saveAs`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
https://<hostname>/arcgis/rest/services/<service-name>/MapServer
```

```javascript
const MapImageLayer = await $arcgis.import("@arcgis/core/layers/MapImageLayer.js");
// points to the states layer in a service storing U.S. census data
let layer = new MapImageLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer"
});
map.add(layer);  // adds the layer to the map
```

```javascript
// references an ArcGIS Online item pointing to a Map Service Layer
let layer = new MapImageLayer({
  portalItem: {  // autocasts as esri/portal/PortalItem
    id: "8444e275037549c1acab02d2626daaee"
  }
});
map.add(layer);  // adds the layer to the map
```

```javascript
let layer = new MapImageLayer({
url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
  sublayers: [
   {
     id: 3,
     visible: false
   }, {
     id: 2,
     visible: true
   }, {
     id: 1,
     visible: true
   }, {
     id: 0,
     visible: true,
     definitionExpression: "pop2000 > 100000"
   }
 ]
});
```

```javascript
// Typical usage
let layer = new MapImageLayer({
  // URL to the map service
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
  // dynamic sublayers. See sublayers documentation for more info
  sublayers: [ {}, {}, {} ]
});
```

```javascript
// finds the census tracts sublayer from a parent sublayer of the
// MapImageLayer containing various census sublayers
let tractsId = 5;
let tracksSublayer = layer.allSublayers.find(function(sublayer){
  return sublayer.id === tracksId;
});
```

