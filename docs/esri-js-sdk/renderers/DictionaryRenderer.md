# DictionaryRenderer

**Module:** `@arcgis/core/renderers/DictionaryRenderer`

## Import

```javascript
import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer.js";
```

```javascript
// CDN
const DictionaryRenderer = await $arcgis.import("@arcgis/core/renderers/DictionaryRenderer.js");
```

**Since:** 4.13

## See Also

- CIMSymbol
- Sample - Visualize data with dictionary renderer
- ArcGIS Pro - Dictionary symbology
- ArcGIS Blog - Create custom dictionary styles for ArcGIS
- Arcade Visualization Profile
- Styles and data visualization

## Property Details

### `DictionaryRenderer`

### `authoringInfo`
- **Type:** `Inherited`

### `config`

### `declaredClass`
- **Type:** `Inherited`

### `fieldMap`

### `scaleExpression`

### `scaleExpressionTitle`

### `type`

### `url`

### `visualVariables`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fromJSON`
- **Type:** `Inherited`

### `getSymbolAsync`

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
let renderer = new DictionaryRenderer({
  url: "./alternative-fuel-stations",
  fieldMap: {
    fuel_type: "Fuel_Type_Code",
    name: "Station_Name"
  },
  config: {
    show_label: "false"
  }
});

let layer = new FeatureLayer({
  url: "http://url.to.service",
  renderer: renderer
});
```

```javascript
// Typical usage
let renderer = new DictionaryRenderer({
  url: "./alternative-fuel-stations",
  fieldMap: {
    fuel_type: "Fuel_Type_Code",
    name: "Station_Name"
  },
  config: {
    show_label: "false"
  }
});
```

```javascript
renderer.config = {
 show_label: "true"
}
```

```javascript
renderer.fieldMap = {
  fuel_type: "Fuel_Type_Code",
  connector_types: "EV_Connector_Types",
  network: "EV_Network",
  name: "Station_Name"
};
```

```javascript
renderer.scaleExpression = "2"; //Make the symbols two times bigger.
```

```javascript
renderer.scaleExpression = "IIF($feature.symbolset == 10, 2, 1)"; //If the value of "symbolset" field of a feature is 10, make the symbols two times bigger.
```

