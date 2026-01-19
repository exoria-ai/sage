# SubtypeSublayer

**Module:** `@arcgis/core/layers/support/SubtypeSublayer`

## Import

```javascript
import SubtypeSublayer from "@arcgis/core/layers/support/SubtypeSublayer.js";
```

```javascript
// CDN
const SubtypeSublayer = await $arcgis.import("@arcgis/core/layers/support/SubtypeSublayer.js");
```

**Since:** 4.20

## See Also

- SubtypeGroupLayer
- Sample - Intro to SubtypeGroupLayer
- applyEdits
- Sample - Update Feature Attributes
- fields
- Add an array of client-side features
- Sample: Add multiple label classes to a layer
- Sample: Multi-line labels
- Sample: Flat vs. volumetric 3D symbol layers
- fields
- Add an array of client-side features
- createPopupTemplate
- SceneView
- View2D
- createPopupTemplate
- SceneView
- View2D
- queryRelatedFeatures
- capabilities.data.supportsAttachment
- Sample - Edit features
- capabilities.data.supportsAttachment
- fields
- capabilities.data.supportsAttachment
- capabilities.operations.supportsQueryAttachments
- Query and filter guide
- relationships property
- Sample - Query Related Features
- relationships property
- Sample - Query Related Features
- capabilities.data.supportsAttachment

## Property Details

### `SubtypeSublayer`

### `attributeTableTemplate`

### `capabilities`

### `declaredClass`
- **Type:** `Inherited`

### `editingEnabled`

### `effectiveCapabilities`

### `effectiveEditingEnabled`

### `fields`

### `fieldsIndex`

### `formTemplate`

### `geometryType`

### `globalIdField`

### `id`

### `labelingInfo`

### `labelsVisible`

### `legendEnabled`

### `listMode`

### `loadError`

### `loadStatus`

### `loadWarnings`

### `maxScale`

### `minScale`

### `objectIdField`

### `opacity`

### `parent`

### `popupEnabled`

### `popupTemplate`

### `relationships`

### `renderer`

### `spatialReference`

### `subtypeCode`

### `subtypeField`

### `templates`

### `title`

### `type`

### `uid`

### `url`

### `visible`

### `addAttachment`

### `addHandles`
- **Type:** `Inherited`

### `applyEdits`

### `cancelLoad`

### `createPopupTemplate`

### `createQuery`

### `deleteAttachments`

### `getField`

### `getFieldDomain`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`

### `isRejected`

### `isResolved`

### `load`

### `queryAttachments`

### `queryFeatureCount`

### `queryFeatures`

### `queryObjectIds`

### `queryRelatedFeatures`

### `queryRelatedFeaturesCount`

### `removeHandles`
- **Type:** `Inherited`

### `updateAttachment`

### `when`


## Method Details

### `Method Details()`


## Examples

```javascript
// Only includes one SubtypeSublayer from the SubtypeGroupLayer
let layer = new SuptypeGroupLayer({
  url: "https://sampleserver7.arcgisonline.com/server/rest/services/UtilityNetwork/NapervilleElectric/FeatureServer/0",
  sublayers: [{  // autocasts as a Collection of SubtypeSublayers
    subtypeCode: 14,
    visible: true,
    renderer: {
      type: "simple",  // autocasts as a SimpleRenderer()
      symbol: {
        type: "simple-marker",  // autocasts as a SimpleMarkerSymbol()
        style: "circle",
        color: [120, 120, 120, 255],
        size: 6
      }
    }
  }]
});
```

```javascript
// define each field's schema
const fields = [
 new Field({
   name: "ObjectID",
   alias: "ObjectID",
   type: "oid"
 }), new Field({
   name: "description",
   alias: "Description",
   type: "string"
 }), new Field ({
   name: "title",
   alias: "Title",
   type: "string"
 })
];

// See the sample snippet for the source property
const layer = new SubtypeSublayer({
  // Object ID field is inferred from the fields array
  fields: fields
});
```

```javascript
// lookup a field by name. name is case-insensitive
const field = layer.fieldsIndex.get("someField");

if (field) {
  console.log(field.name); // SomeField
}
```

```javascript
// Create the Field Elements to pass into the template
const fieldElement1 = new FieldElement({
  fieldName: "firstname",
  label: "First name",
  description: "First name of emergency contact"
});

const fieldElement2 = new FieldElement({
  fieldName: "lastname",
  label: "Last name",
  description: "Last name of emergency contact"
});

// Create the form's template
const formTemplate = new FormTemplate({
  title: "Emergency information",
  description: "In case of emergency, update any additional information needed",
  elements: [fieldElement1, fieldElement2] // pass in array of field elements from above
});

// Pass the template to the layer
subtypeSublayer.formTemplate = formTemplate;

// Pass the layer to the FeatureForm
const form = new FeatureForm({
  container: "form", // html div referencing the form
  layer: subtypeSublayer
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

subtypeSubLayer.labelingInfo = [ statesLabelClass ];
```

```javascript
// Makes the layer 50% transparent
layer.opacity = 0.5;
```

