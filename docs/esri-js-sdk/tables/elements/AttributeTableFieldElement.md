# AttributeTableFieldElement

**Module:** `@arcgis/core/tables/elements/AttributeTableFieldElement`

## Import

```javascript
import AttributeTableFieldElement from "@arcgis/core/tables/elements/AttributeTableFieldElement.js";
```

```javascript
// CDN
const AttributeTableFieldElement = await $arcgis.import("@arcgis/core/tables/elements/AttributeTableFieldElement.js");
```

**Since:** 4.31

## See Also

- FeatureTable
- esri/tables/AttributeTableTemplate/

## Property Details

### `AttributeTableFieldElement`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `fieldName`

### `label`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

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

