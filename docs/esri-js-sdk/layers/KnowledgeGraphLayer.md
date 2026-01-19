# KnowledgeGraphLayer

**Module:** `@arcgis/core/layers/KnowledgeGraphLayer`

## Import

```javascript
import KnowledgeGraphLayer from "@arcgis/core/layers/KnowledgeGraphLayer.js";
```

```javascript
// CDN
const KnowledgeGraphLayer = await $arcgis.import("@arcgis/core/layers/KnowledgeGraphLayer.js");
```

**Since:** 4.26

## See Also

- Sample - Working with KnowledgeGraphLayer
- KnowledgeGraphSublayer
- knowledgeGraphService
- KnowledgeGraphSublayer
- knowledgeGraphService
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

### `KnowledgeGraphLayer`

### `declaredClass`
- **Type:** `Inherited`

### `fullExtent`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `inclusionModeDefinition`

### `knowledgeGraph`

### `layers`

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

### `memberEntityTypes`

### `memberRelationshipTypes`

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`
- **Type:** `Inherited`

### `sublayerIdsCache`

### `tables`

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

### `addRecords`

### `cancelLoad`
- **Type:** `Inherited`

### `convertSublayerToDynamicData`

### `convertSublayerToExplicitMembership`

### `convertToExplicitMembership`

### `convertToFullyDynamicData`

### `createLayerView`
- **Type:** `Inherited`

### `createSublayerForNamedType`

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

### `loadLayerAssumingLocalCache`

### `on`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `removeRecords`

### `when`
- **Type:** `Inherited`

### `IdTypePair`

### `InclusionModeDefinition`

### `LayerInclusionDefinition`

### `LayerInclusionMemberDefinition`


## Method Details

### `Method Details()`


## Examples

```javascript
const KnowledgeGraphLayer = await $arcgis.import("@arcgis/core/layers/KnowledgeGraphLayer.js");
const kgl = new KnowledgeGraphLayer({
  url: "https://sampleserver7.arcgisonline.com/arcgis/rest/services/Hosted/SupplyChain/KnowledgeGraphServer"
});
kgl.load().then(()=>{
  map.add(kgl);  // adds the layer to the map
})
```

```javascript
//iterate through spatial sublayers and query each
kgLayer.layers.items.forEach((sublayer)=>{
  sublayer.queryFeatures("WHERE name = 'Supplier 5'").then((results)=>{
    console.log(results)
  })
})
```

```javascript
kgLayer.load().then(()=>{
  kgLayer.layers.items.forEach((sublayer)=> {
    //label all points by their type.
    sublayer.labelingInfo = [
      new LabelClass({
        labelExpression: `${sublayer.objectType.name}`,
        symbol: {
          type: "text", // autocasts as new TextSymbol()
          color: [255, 255, 255, 0.7],
          haloColor: [0, 0, 0, 0.85],
          haloSize: 1,
          font: {
            size: 11
          }
        }
      })
    ];
    sublayer.labelsVisible = true;
  })
})
```

```javascript
//create popup template for observations
const observationPopup = new PopupTemplate({
  title: "{species_guess}",
  content: [{
    type: "text",
    text: "Quality: {quality_grade}"
  },
  {
    type: "text",
    text: "Place guess: {place_guess}"
  }]
});

//create popup template for users
const userPopup = new PopupTemplate({
  title: "{name}",
  content: [{
    type: "text",
    text: "Observation count: {observation_count}"
  }]
});

//create popup template for species
const speciesPopup = new PopupTemplate({
  title: "{common_name}",
  content: [{
    type: "text",
    text: "Scientific Name: {name}"
  }]
});
//when layer loads, apply popups to sublayers
kgLayer.load().then(()=>{
  kgLayer.layers.items.forEach((sublayer)=> {
    switch(sublayer.title) {
      case 'Observation':
        sublayer.popupTemplate = observationPopup;
        break;
      case 'User':
        sublayer.popupTemplate = userPopup;
        break;
      case 'Species':
        sublayer.popupTemplate = speciesPopup;
        break;
      default:
        sublayer.popupTemplate = new PopupTemplate({
          title: "{globalid}"
        })
        break;
    }
  })
  map.add(kgLayer);
});
```

```javascript
// Once the layer loads, set the view's extent to the layer's fullextent
layer.when(function(){
  view.extent = layer.fullExtent;
});
```

