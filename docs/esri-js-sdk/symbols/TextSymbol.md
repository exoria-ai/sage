# TextSymbol

**Module:** `@arcgis/core/symbols/TextSymbol`

## Import

```javascript
import TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
```

```javascript
// CDN
const TextSymbol = await $arcgis.import("@arcgis/core/symbols/TextSymbol.js");
```

**Since:** 4.0

## Inheritance

Extends: **farther**

## See Also

- Symbol Builder
- Sample: Add labels to a FeatureLayer
- Sample: Using Esri Icon Fonts with map graphics
- TextSymbol3DLayer
- Labeling Guide
- Sample: MapImageLayer - label sublayer features
- Sample: MapImageLayer - label sublayer features
- Sample: MapImageLayer - label sublayer features
- Labeling Guide
- lineWidth

## Property Details

### `TextSymbol`

### `angle`

### `backgroundColor`

### `borderLineColor`

### `borderLineSize`

### `color`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `font`

### `haloColor`

### `haloSize`

### `horizontalAlignment`

### `kerning`

### `lineHeight`

### `lineWidth`

### `rotated`

### `text`

### `type`

### `verticalAlignment`

### `xoffset`

### `yoffset`

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
let textSymbol = {
  type: "text",  // autocasts as new TextSymbol()
  color: "white",
  haloColor: "black",
  haloSize: "1px",
  text: "You are here",
  xoffset: 3,
  yoffset: 3,
  font: {  // autocasts as new Font()
    size: 12,
    family: "Josefin Slab",
    weight: "bold"
  }
};
```

```javascript
const textSymbol = {
  type: "text", // autocasts as new TextSymbol()
  angle: 90,
  color: "green",
  font: {
    // autocast as new Font()
    family: "Just Another Hand",
    size: 12
  },
  haloColor: "black",
  haloSize: 1,
  horizontalAlignment: "right",
  verticalAlignment: "bottom"
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

