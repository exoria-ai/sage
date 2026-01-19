# AttributeTableGroupElement

**Module:** `@arcgis/core/tables/elements/AttributeTableGroupElement`

## Import

```javascript
import AttributeTableGroupElement from "@arcgis/core/tables/elements/AttributeTableGroupElement.js";
```

```javascript
// CDN
const AttributeTableGroupElement = await $arcgis.import("@arcgis/core/tables/elements/AttributeTableGroupElement.js");
```

**Since:** 4.31

## See Also

- FeatureTable
- esri/tables/AttributeTableTemplate/

## Property Details

### `AttributeTableGroupElement`

### `declaredClass`
- **Type:** `Inherited`

### `description`
- **Type:** `Inherited`

### `elements`

### `label`
- **Type:** `Inherited`

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

