# Font

**Module:** `@arcgis/core/symbols/Font`

## Import

```javascript
import Font from "@arcgis/core/symbols/Font.js";
```

```javascript
// CDN
const Font = await $arcgis.import("@arcgis/core/symbols/Font.js");
```

**Since:** 4.0

## See Also

- TextSymbol
- TextSymbol3DLayer
- Sample: Add labels to a FeatureLayer
- Guide: Esri Icon Font
- Guide: Labeling
- Guide: Labeling
- MDN: font-family
- MDN: font-size
- MDN: font-style
- MDN: font-weight

## Property Details

### `Font`

### `declaredClass`
- **Type:** `Inherited`

### `decoration`

### `family`

### `size`

### `style`

### `weight`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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
let textSymbol = {
  type: "text",  // autocasts as new TextSymbol()
  text: "Science of Where",
  font: {  // autocasts as new Font()
    family: "Merriweather",
    size: 12,
    style: "italic",
    weight: "bold"
  }
};
```

```javascript
// size in points
symbol.size = 14;
```

```javascript
// size in pixels
symbol.size = "20px";
```

```javascript
// size in points
symbol.size = "14pt";
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

