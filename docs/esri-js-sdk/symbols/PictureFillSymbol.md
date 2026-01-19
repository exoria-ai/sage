# PictureFillSymbol

**Module:** `@arcgis/core/symbols/PictureFillSymbol`

## Import

```javascript
import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";
```

```javascript
// CDN
const PictureFillSymbol = await $arcgis.import("@arcgis/core/symbols/PictureFillSymbol.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Graphic
- Renderer

## Property Details

### `PictureFillSymbol`

### `declaredClass`
- **Type:** `Inherited`

### `height`

### `outline`
- **Type:** `Inherited`

### `type`

### `url`

### `width`

### `xoffset`

### `xscale`

### `yoffset`

### `yscale`

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
  type: "picture-fill",  // autocasts as new PictureFillSymbol()
  url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
  width: "24px",
  height: "24px",
  outline: {
    style: "solid"
  },
};
```

```javascript
// height in points
symbol.height = 16;
```

```javascript
// height in pixels
symbol.height = "12px";
```

```javascript
// height in points
symbol.height = "16pt";
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

```javascript
// width in points
symbol.width = 16;
```

