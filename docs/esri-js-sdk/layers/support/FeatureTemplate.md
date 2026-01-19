# FeatureTemplate

**Module:** `@arcgis/core/layers/support/FeatureTemplate`

## Import

```javascript
import FeatureTemplate from "@arcgis/core/layers/support/FeatureTemplate.js";
```

```javascript
// CDN
const FeatureTemplate = await $arcgis.import("@arcgis/core/layers/support/FeatureTemplate.js");
```

**Since:** 4.4

## Property Details

### `FeatureTemplate`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `drawingTool`

### `name`

### `prototype`

### `thumbnail`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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
// this snippet code shows how to create a feature based on
// feature type prototype. Creates a new feature assigns
// default values for the attributes to the new feature.
view.on("click", function(event) {
  let park = fl.templates[0].prototype;
  newPark = new Graphic({
    attributes: park.attributes,
    geometry: event.mapPoint
  });

  let promise = fl.applyEdits({addFeatures: [newPark]});
  editResultsHandler(promise);
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

