# AttributeTableAttachmentElement

**Module:** `@arcgis/core/tables/elements/AttributeTableAttachmentElement`

## Import

```javascript
import AttributeTableAttachmentElement from "@arcgis/core/tables/elements/AttributeTableAttachmentElement.js";
```

```javascript
// CDN
const AttributeTableAttachmentElement = await $arcgis.import("@arcgis/core/tables/elements/AttributeTableAttachmentElement.js");
```

**Since:** 4.31

## See Also

- FeatureTable
- esri/tables/AttributeTableTemplate/

## Property Details

### `AttributeTableAttachmentElement`

### `declaredClass`
- **Type:** `Inherited`

### `description`
- **Type:** `Inherited`

### `displayType`

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

