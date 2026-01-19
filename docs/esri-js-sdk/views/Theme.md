# Theme

**Module:** `@arcgis/core/views/Theme`

## Import

```javascript
import Theme from "@arcgis/core/views/Theme.js";
```

```javascript
// CDN
const Theme = await $arcgis.import("@arcgis/core/views/Theme.js");
```

**Since:** 4.28

## See Also

- View.theme
- Color
- Sample - Color theming for interactive tools

## Property Details

### `Theme`

### `accentColor`

### `declaredClass`
- **Type:** `Inherited`

### `textColor`

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
// Update the theme to use purple graphics
// and slightly transparent green text
view.theme = new Theme({
  accentColor: "purple",
  textColor: [125, 255, 13, 0.9]
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

