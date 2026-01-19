# ActionBase

**Module:** `@arcgis/core/support/actions/ActionBase`

## Import

```javascript
import ActionBase from "@arcgis/core/support/actions/ActionBase.js";
```

```javascript
// CDN
const ActionBase = await $arcgis.import("@arcgis/core/support/actions/ActionBase.js");
```

**Since:** 4.8

## See Also

- ActionButton
- ActionToggle
- Calcite Icon Search

## Property Details

### `active`

### `className`

### `declaredClass`
- **Type:** `Inherited`

### `disabled`

### `icon`

### `id`

### `title`

### `type`

### `uid`

### `visible`

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

