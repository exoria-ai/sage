# Symbol

**Module:** `@arcgis/core/symbols/Symbol`

## Import

```javascript
import Symbol from "@arcgis/core/symbols/Symbol.js";
```

```javascript
// CDN
const Symbol = await $arcgis.import("@arcgis/core/symbols/Symbol.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Styles and data visualization
- Renderer
- Graphic

## Property Details

### `color`

### `declaredClass`
- **Type:** `Inherited`

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
// CSS color string
symbol.color = "dodgerblue";
```

```javascript
// HEX string
symbol.color = "#33cc33";
```

```javascript
// array of RGBA values
symbol.color = [51, 204, 51, 0.3];
```

```javascript
// object with rgba properties
symbol.color = {
  r: 51,
  g: 51,
  b: 204,
  a: 0.7
};
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

