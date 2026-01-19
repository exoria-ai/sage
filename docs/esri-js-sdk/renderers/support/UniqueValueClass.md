# UniqueValueClass

**Module:** `@arcgis/core/renderers/support/UniqueValueClass`

## Import

```javascript
import UniqueValueClass from "@arcgis/core/renderers/support/UniqueValueClass.js";
```

```javascript
// CDN
const UniqueValueClass = await $arcgis.import("@arcgis/core/renderers/support/UniqueValueClass.js");
```

**Since:** 4.25

## See Also

- UniqueValueGroup.classes

## Property Details

### `UniqueValueClass`

### `declaredClass`
- **Type:** `Inherited`

### `label`

### `symbol`

### `values`

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
const lowDensityCommercialClass = new UniqueValueClass({
  label: "C-2 | Community Commercial",
  symbol: {
    type: "simple-fill",
    color: [255,179,219]
  },
  values: ["C-1", "C-2"]
});
```

```javascript
lowDensityCommercialClass.label = "C-2 | Community Commercial";
```

```javascript
lowDensityCommercialClass.symbol = {
  type: "simple-fill",
  color: [255,179,219]
};
```

```javascript
// Features with the value of "High" in the renderer's field
// will be represented with the symbol defined in the class.
uniqueValueClass.values = "High";
```

```javascript
// Features with any of the values below in the renderer's field
// will be represented with the symbol defined in the class.
uniqueValueClass.values = ["R-1", "R-2", "R-3", "R-4", "R-5"];
```

```javascript
// Features with only the combination values below from
// field, field2, and field3 in the renderer
// will be represented with the symbol defined in the class.
uniqueValueClass.values = {
  value: "50,000-75,000",
  value2: "Republican",
  value3: "18-25"
};
```

