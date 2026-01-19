# SimpleLineSymbol

**Module:** `@arcgis/core/symbols/SimpleLineSymbol`

## Import

```javascript
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
```

```javascript
// CDN
const SimpleLineSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleLineSymbol.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Sample - Visualize features by type
- Sample - Add graphics (MapView)
- Sample - Add graphics (SceneView)
- Renderer
- Graphic

## Property Details

### `SimpleLineSymbol`

### `cap`

### `color`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `join`

### `marker`

### `miterLimit`

### `style`

### `type`

### `width`
- **Type:** `Inherited`

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
// this symbol can be used to visualize polyline
// features or the outline of a fill symbol
let symbol = {
  type: "simple-line",  // autocasts as new SimpleLineSymbol()
  color: "lightblue",
  width: "2px",
  style: "short-dot"
};
```

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

