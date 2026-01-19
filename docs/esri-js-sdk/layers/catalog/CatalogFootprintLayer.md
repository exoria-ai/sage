# CatalogFootprintLayer

**Module:** `@arcgis/core/layers/catalog/CatalogFootprintLayer`

## Import

```javascript
import CatalogFootprintLayer from "@arcgis/core/layers/catalog/CatalogFootprintLayer.js";
```

```javascript
// CDN
const CatalogFootprintLayer = await $arcgis.import("@arcgis/core/layers/catalog/CatalogFootprintLayer.js");
```

**Since:** 4.30

## See Also

- CatalogLayer
- CatalogDynamicGroupLayer
- Sample - Intro to CatalogLayer
- Sample - Explore data in CatalogLayer
- Layer blending samples
- Sample - Scale-dependent DisplayFilter
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- Sample - Apply effects to features
- Sample - Apply drop-shadow effect to a layerView
- effect
- ArcGIS REST API documentation
- Sample: Add multiple label classes to a layer
- Sample: Multi-line labels
- Sample: Flat vs. volumetric 3D symbol layers
- fields
- fieldUtils
- createPopupTemplate
- SceneView
- View2D
- createPopupTemplate
- SceneView
- View2D
- Styles and data visualization
- Sample - Custom WebGL layer view
- Sample - Query features from a FeatureLayer
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- fields
- AttributeBinsQuery
- Sample - Attribute Bins Query
- Sample - Select features by rectangle
- Query and filter guide
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `CatalogFootprintLayer`

### `apiKey`

### `blendMode`

### `capabilities`

### `charts`

### `customParameters`

### `dateFieldsTimeZone`

### `datesInUnknownTimezone`

### `declaredClass`
- **Type:** `Inherited`

### `definitionExpression`

### `displayField`

### `displayFilterEnabled`

### `displayFilterInfo`

### `effect`

### `effectiveCapabilities`

### `elevationInfo`

### `featureEffect`

### `fields`

### `fieldsIndex`

### `fullExtent`
- **Type:** `Inherited`

### `geometryFieldsInfo`

### `geometryType`

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

### `opacity`
- **Type:** `Inherited`

### `orderBy`

### `outFields`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`
- **Type:** `Inherited`

### `popupEnabled`

### `popupTemplate`

### `preferredTimeZone`

### `renderer`

### `returnM`

### `returnZ`

### `spatialReference`

### `timeExtent`

### `timeInfo`

### `timeOffset`

### `title`
- **Type:** `Inherited`

### `type`

### `uid`
- **Type:** `Inherited`

### `useViewTime`

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

### `queryAttributeBins`

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
// gray out features that fall outside of the 3 mile buffer of the mouse's location
// by setting feature effect on excluded features
layer.featureEffect = new FeatureEffect({
  filter: new FeatureFilter({
    geometry: filterGeometry,
    spatialRelationship: "intersects",
    distance: 3,
    units: "miles"
  }),
  excludedEffect: "grayscale(100%) opacity(30%)"
});
```

```javascript
// Apply a drop-shadow feature effect to the features that intersect the borough boundaries,
// while applying blur and brightness effects to the features that are excluded from filter criteria.
// The resulting map will make it easier to spot if the residents are more likely to experience deprivation
// if they live on a borough boundary.
const featureFilter = new FeatureFilter({
  where: "BoroughEdge='true'"
});
layer.featureEffect = new FeatureEffect({
  filter: featureFilter,
  includedEffect: "drop-shadow(3px, 3px, 3px, black)",
  excludedEffect: "blur(1px) brightness(65%)"
});
```

```javascript
// Once the layer loads, set the view's extent to the layer's fullextent
layer.when(function(){
  view.extent = layer.fullExtent;
});
```

```javascript
const statesLabelClass = new LabelClass({
  labelExpressionInfo: { expression: "$feature.NAME" },
  symbol: {
    type: "text",  // autocasts as new TextSymbol()
    color: "black",
    haloSize: 1,
    haloColor: "white"
  }
});

footprintLayer.labelingInfo = [ statesLabelClass ];
```

