# SimpleMarkerSymbol

**Module:** `@arcgis/core/symbols/SimpleMarkerSymbol`

## Import

```javascript
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
```

```javascript
// CDN
const SimpleMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleMarkerSymbol.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Sample - Visualize features with simple symbols
- Sample - Continuous size
- Sample - Add graphics (MapView)
- Renderer
- Graphic

## Property Details

### `SimpleMarkerSymbol`

### `angle`
- **Type:** `Inherited`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `outline`

### `path`

### `size`

### `style`

### `type`

### `xoffset`
- **Type:** `Inherited`

### `yoffset`
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
let symbol = {
  type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
  style: "square",
  color: "blue",
  size: "8px",  // pixels
  outline: {  // autocasts as new SimpleLineSymbol()
    color: [ 255, 255, 0 ],
    width: 3  // points
  }
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

```javascript
let sym = {
  type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
  color: "red",
  outline: {  // autocasts as new SimpleLineSymbol()
    color: [ 128, 128, 128, 0.5 ],
    width: "0.5px"
  }
};
```

