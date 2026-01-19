# BatchFormInputs

**Module:** `@arcgis/core/widgets/BatchAttributeForm/inputs/BatchFormInputs`

## Import

```javascript
import BatchFormInputs from "@arcgis/core/widgets/BatchAttributeForm/inputs/BatchFormInputs.js";
```

```javascript
// CDN
const BatchFormInputs = await $arcgis.import("@arcgis/core/widgets/BatchAttributeForm/inputs/BatchFormInputs.js");
```

**Since:** 4.33

## See Also

- BatchAttributeFormViewModel
- allFieldInputs

## Property Details

### `allFieldInputs`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `inputs`

### `invalidFeatures`

### `invalidHiddenInputs`

### `title`

### `valid`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
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

