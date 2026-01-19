# PictureMarkerSymbol

**Module:** `@arcgis/core/symbols/PictureMarkerSymbol`

## Import

```javascript
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
```

```javascript
// CDN
const PictureMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/PictureMarkerSymbol.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Sample - Visualize data with rotation
- SimpleMarkerSymbol

## Property Details

### `PictureMarkerSymbol`

### `angle`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `height`

### `type`

### `url`

### `width`

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
  type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
  url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
  width: "64px",
  height: "64px"
};
```

```javascript
// height in points
symbol.height = 14;
```

```javascript
// height in pixels
symbol.height = "20px";
```

```javascript
// height in points
symbol.height = "14pt";
```

```javascript
symbol.url = "cat-1-hurricane.png";
```

```javascript
// render SVG document as a PictureMarkerSymbol
symbol.url = "logo.svg";
```

