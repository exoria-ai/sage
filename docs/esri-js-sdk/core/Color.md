# Color

**Module:** `@arcgis/core/Color`

## Import

```javascript
import Color from "@arcgis/core/Color.js";
```

```javascript
// CDN
const Color = await $arcgis.import("@arcgis/core/Color.js");
```

**Since:** 4.0

## See Also

- Guide - Esri color ramps
- Guide - Visualization best practices
- RGB Hexadecimal Notations

## Property Details

### `Color`

### `a`

### `b`

### `g`

### `r`

### `blendColors`

### `clone`

### `equals`

### `fromArray`

### `fromHex`

### `fromJSON`

### `fromRgb`

### `fromString`

### `setColor`

### `toCss`

### `toHex`

### `toJSON`

### `toRgb`

### `toRgba`

### `RGBA`


## Method Details

### `Method Details()`


## Examples

```javascript
// Examples for green
let color = new Color("lime");  // named value
let color = new Color("#0f0");  // shortened three digit hexadecimal value
let color = new Color("#00ff00");  // six digit hexadecimal value
let color = new Color("hsl(120, 100%, 50%)");  // hsl
let color = new Color("hsla(120, 100%, 50%, 0.5)"); // hsla
```

```javascript
// Examples for green
let color = new Color([0, 255, 0]);
let color = new Color([0, 255, 0, 0.5]);
let color = new Color("rgb(0, 255, 0)");
let color = new Color("rgba(0, 255, 0, 0.5)");
let color = new Color({r: 0, g: 255, b: 0});
let color = new Color({r: 0, g: 255, b: 0, a: 0.5});
```

```javascript
// Creates a green Color object using a named value
let color = new Color("green");

// Creates a green Color object using a hex value
let color = new Color("#00ff00");

// Creates a new Color object using an array of r, g, b values
let color = new Color([125, 255, 13]);

// Add a fourth value to the array to add opacity (range between 0 and 1)
let color = new Color([125, 255, 13, 0.5]);

// Creates a new Color object using an object
let color = new Color({
  r: 125,
  g: 255,
  b: 13,
  a: 0.3  // Optional
});
```

```javascript
const startColor = new Color("#0000ff");
const endColor = new Color("#ca0013");
const blendedColor = Color.blendColors(startColor, endColor, 0.5);
```

```javascript
// Creates a deep clone of the graphic's color
let colorClone = graphic.symbol.color.clone();
```

```javascript
let redColor = Color.fromArray([201, 0, 19]);
```

