# VoxelLayer

**Module:** `@arcgis/core/layers/VoxelLayer`

## Import

```javascript
import VoxelLayer from "@arcgis/core/layers/VoxelLayer.js";
```

```javascript
// CDN
const VoxelLayer = await $arcgis.import("@arcgis/core/layers/VoxelLayer.js");
```

**Since:** 4.22

## See Also

- SceneLayer
- SceneView
- Map
- Sample - Intro to Voxel Layer
- Sample - VoxelLayer variable and render mode
- Sample - Create area of interest for VoxelLayer
- Sample - VoxelLayer Isosurface
- Sample - VoxelLayer Dynamic Sections
- Sample - VoxelLayer Discrete Variable
- Sample - VoxelLayer Color Stops
- Sample - VoxelLayer Opacity Stops
- Sample - VoxelLayer and time
- Sample - Configuring the popup of a VoxelLayer
- Item access privileges
- API key guide
- createPopupTemplate
- SceneView
- View2D
- https://github.com/Esri/i3s-spec
- Sample - GraphicsLayer with visibilityTimeExtent
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- fields
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `VoxelLayer`

### `apiKey`

### `copyright`

### `currentVariableId`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `enableDynamicSections`

### `enableIsosurfaces`

### `enableSlices`

### `fields`

### `fullExtent`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `layerId`

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
- **Type:** `Inherited`

### `maxScale`

### `minScale`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `popupEnabled`

### `popupTemplate`

### `portalItem`

### `renderMode`

### `spatialReference`

### `timeExtent`

### `timeInfo`

### `timeOffset`

### `title`
- **Type:** `Inherited`

### `type`

### `uid`
- **Type:** `Inherited`

### `url`

### `useViewTime`

### `variableStyles`

### `variables`

### `version`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `volumeStyles`

### `volumes`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`
- **Type:** `Inherited`

### `createPopupTemplate`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

### `getColorForContinuousDataValue`

### `getField`

### `getVariable`

### `getVariableStyle`

### `getVolume`

### `getVolumeStyle`

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
const voxelLayer = new VoxelLayer({
   url: "https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/EMU_Caribbean_Voxel/SceneServer"
});
const map = new Map({
   layers: [voxelLayer],
   basemap: {
     baseLayers: [
       new VectorTileLayer({
         url: "https://basemaps.arcgis.com/arcgis/rest/services/OpenStreetMap_GCS_v2/VectorTileServer"
       })
     ]
   }
});
```

```javascript
const voxelLayer = new VoxelLayer({
   portalItem: {
     id: "3a922ed0c7a8489ea4fbe8747ac560ba"
   },
});
```

```javascript
// Typical usage
let layer = new VoxelLayer({
// URL to the service
url: "your voxel service url"
});
```

```javascript
// set the api key to access a protected service
const layer = new FeatureLayer({
  url: serviceUrl,
  apiKey: "YOUR_API_KEY"
});
```

```javascript
// send a custom parameter to your special service
let layer = new MapImageLayer({
  url: serviceUrl,
  customParameters: {
    "key": "my-special-key"
  }
});
```

```javascript
layer.when(() => {
  // print out field names returned in layer.fields
  layer.fields.forEach((field) => {
    console.log(field.name);
  });
});
```

