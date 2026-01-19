# LineSymbol

**Module:** `@arcgis/core/symbols/LineSymbol`

## Import

```javascript
import LineSymbol from "@arcgis/core/symbols/LineSymbol.js";
```

```javascript
// CDN
const LineSymbol = await $arcgis.import("@arcgis/core/symbols/LineSymbol.js");
```

**Since:** 4.0

## See Also

- Symbol Builder
- Renderer
- Graphic

## Property Details

### `color`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `type`

### `width`

### `addHandles`
- **Type:** `Inherited`

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
// width in points
symbol.width = 4;
```

```javascript
// width in pixels
symbol.width = "2px";
```

