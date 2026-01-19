# LinkChartLayer

**Module:** `@arcgis/core/layers/LinkChartLayer`

## Import

```javascript
import LinkChartLayer from "@arcgis/core/layers/LinkChartLayer.js";
```

```javascript
// CDN
const LinkChartLayer = await $arcgis.import("@arcgis/core/layers/LinkChartLayer.js");
```

**Since:** 4.31

## See Also

- WebLinkChart
- KnowledgeGraphSublayer
- knowledgeGraphService
- KnowledgeGraphLayer
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

### `LinkChartLayer`

### `declaredClass`
- **Type:** `Inherited`

### `fullExtent`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `initializationInclusionModeDefinition`

### `initializationLinkChartConfig`

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

### `tables`

### `title`

### `uid`
- **Type:** `Inherited`

### `url`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `applyNewLinkChartLayout`

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

### `loadLayerAssumingLocalCache`

### `on`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`

### `InclusionModeDefinition`

### `LayerInclusionDefinition`

### `LayerInclusionMemberDefinition`


## Method Details

### `Method Details()`


## Examples

```javascript
const [LinkChartLayer, WebLinkChart, LinkChartView] = await $arcgis.import([
  "@arcgis/core/layers/LinkChartLayer.js",
  "@arcgis/core/WebLinkChart.js",
  "@arcgis/core/LinkChartView.js"
]);
const myLinkChartLayer = new LinkChartLayer({
  title: "link chart layer",
  url: "https://sampleserver7.arcgisonline.com/arcgis/rest/services/Hosted/SmallBumbleBees/KnowledgeGraphServer"
});
myLinkChartLayer.load().then(()=>{
  const linkchart = new WebLinkChart({
    layers: [myLinkChartLayer]
  });
})
```

```javascript
// Once the layer loads, set the view's extent to the layer's fullextent
layer.when(function(){
  view.extent = layer.fullExtent;
});
```

```javascript
// constructing an inclusion list:
// The exact record ids of each of the records of a specific named type (entity type or relationship type)
// to include in the layer. In this case the layer will contain one record
const layerInclusionMemberDefinition = new Map();
layerInclusionMemberDefinition.set("{1A4W8G4-W52G-W89G-1W5G-J1R4S8H52H4S}",{id:"{1A4W8G4-W52G-W89G-1W5G-J1R4S8H52H4S}"})

 //The layerInclusionDefinition specifies whether to use all of the data in a named type or only the records
// specified in the 'members' list. In this case we only want the records specified.
const layerInclusionDefinition = {
  useAllData: false, //only include instances in the member list
  members: layerInclusionMemberDefinition
};

// The namedTypeDefinition is a map of the typeName of each type to be included.
// In this case we are only including the "Observation" entity type.
// The layerInclusionDefinition specifies exactly which "Observation" entities to include in the layer.
const namedTypeDefinition = new Map();
namedTypeDefinition.set("Observation", layerInclusionDefinition);

// Specify if a sublayer should be generated for all named types.
// If true, a sublayer will be created for all named types regardless of
// whether they have a list of instances to include or not.
// If there are no instances the sublayer will be empty. In this case we have set 'generateAllSubLayers' to false so the
// layer will only contain sublayers for the named types (entity types or relationship types) that are specified
// in the namedTypeDefinitions.
// Also defines the collection of named types to include in the layer.
const inclusionListDefinition = {
  generateAllSublayers: false, //only create sublayers for the named types in the namedTypeDefinition
  namedTypeDefinitions: namedTypeDefinition
}
```

```javascript
//to access individual sublayers to add or modify properties such as the renderer, popups and labels
LinkChartLayer.layers.forEach((sublayer)=>{
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
// Makes the layer 50% transparent
layer.opacity = 0.5;
```

