# Field

**Module:** `@arcgis/core/layers/support/Field`

## Import

```javascript
import Field from "@arcgis/core/layers/support/Field.js";
```

```javascript
// CDN
const Field = await $arcgis.import("@arcgis/core/layers/support/Field.js");
```

**Since:** 4.0

## See Also

- Layer
- FeatureLayer
- Sample - Create a FeatureLayer with client side graphics
- Blog - Describing layer attributes with field descriptions
- Describe attribute fields - ArcGIS Online Help
- ArcGIS field data types
- Blog - Describing layer attributes with field descriptions
- Describe attribute fields - ArcGIS Online Help

## Property Details

### `Field`

### `alias`

### `declaredClass`
- **Type:** `Inherited`

### `defaultValue`

### `description`

### `domain`

### `editable`

### `length`

### `name`

### `nullable`

### `type`

### `valueType`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`


## Method Details

### `Method Details()`


## Examples

```javascript
// Each object in this array is autocast as
// an instance of esri/layers/support/Field
let fields = [
  {
    name: "ObjectID",
    alias: "ObjectID",
    type: "oid"
  }, {
    name: "title",
    alias: "title",
    type: "string"
  }, {
    name: "type",
    alias: "type",
    type: "string"
  }, {
    name: "mag",
    alias: "Magnitude",
    type: "double"
}];

// add the array of fields to a feature layer
// created from client-side graphics
featureLayer.set({
  fields: fields,
  objectIdField: "ObjectID"
});
```

```javascript
// print out the coded domain values when the layer is loaded
const layerView = await view.whenLayerView(featureLayer)
await reactiveUtils.whenOnce(() => !layerView.updating);

featureLayer.fields.forEach((field) => {
  if (!field.domain) {
    return;
  }

  let domain = field.domain
  console.log(field.name, domain.type, domain.name);

  if (domain.type === "coded-value"){
    domain.codedValues.forEach((codeValue) => {
      console.log("name:", codeValue.name, "code:", codeValue.code);
    });
  }
});
```

```javascript
// Manually manage handles
const handle = reactiveUtils.when(
  () => !view.updating,
  () => {
    wkidSelect.disabled = false;
  },
  { once: true }
);

this.addHandles(handle);

// Destroy the object
this.destroy();
```

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

