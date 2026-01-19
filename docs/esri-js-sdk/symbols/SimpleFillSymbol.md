# SimpleFillSymbol

**Module:** `@arcgis/core/symbols/SimpleFillSymbol`

## Import

```javascript
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
```

```javascript
// CDN
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Sample - Continuous color
- Sample - Add graphics (MapView)
- Graphic
- Renderer

## Property Details

### `SimpleFillSymbol`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `outline`
- **Type:** `Inherited`

### `style`

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
let symbol = {
  type: "simple-fill",  // autocasts as new SimpleFillSymbol()
  color: [ 51,51, 204, 0.9 ],
  style: "solid",
  outline: {  // autocasts as new SimpleLineSymbol()
    color: "white",
    width: 1
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
  type: "simple-fill",  // autocasts as new SimpleFillSymbol()
  color: "red",
  outline: {  // autocasts as new SimpleLineSymbol()
    color: [128, 128, 128, 0.5],
    width: "0.5px"
  }
};
```

