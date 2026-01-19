# KnowledgeGraphSublayer

**Module:** `@arcgis/core/layers/knowledgeGraph/KnowledgeGraphSublayer`

## Import

```javascript
import KnowledgeGraphSublayer from "@arcgis/core/layers/knowledgeGraph/KnowledgeGraphSublayer.js";
```

```javascript
// CDN
const KnowledgeGraphSublayer = await $arcgis.import("@arcgis/core/layers/knowledgeGraph/KnowledgeGraphSublayer.js");
```

**Since:** 4.26

## See Also

- Sample - Working with KnowledgeGraphLayer
- LinkChartLayer
- KnowledgeGraphLayer
- knowledgeGraphService
- Layer blending samples
- DisplayFilterInfo
- DisplayFilter
- View.displayFilterEnabled
- displayFilterInfo
- Sample - Scale-dependent DisplayFilter
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- Sample - Apply effects to features
- Sample - Apply drop-shadow effect to a layerView
- effect
- Sample - Point clustering
- Sample - Point clustering with visual variables
- Sample - Filter clustered points
- Sample - Point styles for cities
- Sample: Add multiple label classes to a layer
- Sample: Multi-line labels
- Sample: Flat vs. volumetric 3D symbol layers
- Arcade Feature Z Profile
- createPopupTemplate
- SceneView
- View2D
- createPopupTemplate
- SceneView
- View2D
- Styles and data visualization
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

### `defaultPopupTemplate`

### `definitionExpression`

### `displayFilterEnabled`

### `displayFilterInfo`

### `effect`

### `elevationInfo`

### `featureEffect`

### `featureReduction`

### `fields`

### `fieldsIndex`

### `formTemplate`

### `fullExtent`
- **Type:** `Inherited`

### `geometryFieldName`

### `geometryType`

### `graphType`

### `hasM`

### `hasZ`

### `id`
- **Type:** `Inherited`

### `labelingInfo`

### `labelsVisible`

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

### `objectIdField`

### `objectType`

### `opacity`
- **Type:** `Inherited`

### `orderBy`

### `parent`
- **Type:** `Inherited`

### `parentCompositeLayer`

### `persistenceEnabled`
- **Type:** `Inherited`

### `popupEnabled`

### `popupTemplate`

### `renderer`

### `templates`

### `timeExtent`

### `timeInfo`

### `timeOffset`

### `title`
- **Type:** `Inherited`

### `type`

### `uid`
- **Type:** `Inherited`

### `useViewTime`

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

### `createPopupTemplate`

### `createQuery`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `fetchAttributionData`
- **Type:** `Inherited`

### `getField`

### `getFieldDomain`

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

### `queryExtent`

### `queryFeatureCount`

### `queryFeatures`

### `queryObjectIds`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
//to access individual sublayers in a KnowledgeGraphLayer
knowledgeGraphLayer.layers.items.forEach((sublayer)=>{
 sublayer.popupTemplate = new PopupTemplate({
  title: "{common_name}",
  content: [{
    type: "text",
    text: "Scientific Name: {name}"
  }]
 });
})
```

```javascript
// Print the maximum number of features that will be returned per server request.
layer.when(() => {
  console.log(`Maximum number of records: ${layer.capabilities.query.maxRecordCount}`);
}
```

```javascript
// Set the definition expression directly on sublayer instance to only suppliers with more than 50 employees.
knowledgeGraphLayer.layers.items[0].definitionExpression = "employee_count > 50";
```

```javascript
// set a scale-dependent display filter on a layer
const layer = new FeatureLayer({
  portalItem: {
    id: "28dbd58ad90e4a47ab0e0334d2b69427"
  },
  minScale: 0,
  maxScale: 0,
  outFields: ["*"],
  // set scale-dependent display filters to declutter the display at different scales.
  // Show more streams as user zooms in and less as user zooms out.
  displayFilterInfo: new DisplayFilterInfo({
    mode: "scale",
    filters: [
      {
        title: "streamOrder >= 8",
        minScale: 0,
        maxScale: 18_489_297.737236,
        where: "streamOrder >= 8"
      },
      {
        title: "streamOrder >= 6",
        minScale: 18_489_297.737236
        maxScale: 9_244_648.868618,
        where: "streamOrder >= 6"
      },
      {
        title: "streamOrder >= 4",
        minScale: 9_244_648.868618,
        maxScale: 577790.5542885
        where: "streamOrder >= 4"
      },
      {
        title: "all",
        minScale: 577790.5542885,
        maxScale: 0
      }
    ]
  })
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

