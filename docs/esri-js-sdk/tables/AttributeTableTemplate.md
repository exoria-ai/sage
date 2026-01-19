# AttributeTableTemplate

**Module:** `@arcgis/core/tables/AttributeTableTemplate`

## Import

```javascript
import AttributeTableTemplate from "@arcgis/core/tables/AttributeTableTemplate.js";
```

```javascript
// CDN
const AttributeTableTemplate = await $arcgis.import("@arcgis/core/tables/AttributeTableTemplate.js");
```

**Since:** 4.31

## See Also

- FeatureTable
- AttributeTableElement
- Sample - FeatureTable Component
- Web Map Specification - attributeTableInfo
- AttributeTableAttachmentElement
- AttributeTableFieldElement
- AttributeTableGroupElement

## Property Details

### `AttributeTableTemplate`

### `declaredClass`
- **Type:** `Inherited`

### `elements`

### `orderByFields`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`

### `FieldOrder`


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

