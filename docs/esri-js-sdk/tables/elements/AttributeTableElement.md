# AttributeTableElement

**Module:** `@arcgis/core/tables/elements/AttributeTableElement`

## Import

```javascript
import AttributeTableElement from "@arcgis/core/tables/elements/AttributeTableElement.js";
```

```javascript
// CDN
const AttributeTableElement = await $arcgis.import("@arcgis/core/tables/elements/AttributeTableElement.js");
```

**Since:** 4.31

## See Also

- FeatureTable
- esri/tables/AttributeTableTemplate/

## Property Details

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `label`

### `type`

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

