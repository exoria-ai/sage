# ActionButton

**Module:** `@arcgis/core/support/actions/ActionButton`

## Import

```javascript
import ActionButton from "@arcgis/core/support/actions/ActionButton.js";
```

```javascript
// CDN
const ActionButton = await $arcgis.import("@arcgis/core/support/actions/ActionButton.js");
```

**Since:** 4.8

## See Also

- Sample - Popup actions
- Sample - Custom popup actions per feature
- Calcite Icon Search

## Property Details

### `ActionButton`

### `active`
- **Type:** `Inherited`

### `className`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `disabled`
- **Type:** `Inherited`

### `icon`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `image`

### `title`
- **Type:** `Inherited`

### `type`

### `uid`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create an action button to delete features
// using the 'trash' Calcite Icon.
const deleteAction = new ActionButton({
 id: "delete-feature",
 title: "Delete Feature",
 icon: "trash"
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

