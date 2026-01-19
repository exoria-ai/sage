# FieldConfiguration

**Module:** `@arcgis/core/layers/support/FieldConfiguration`

## Import

```javascript
import FieldConfiguration from "@arcgis/core/layers/support/FieldConfiguration.js";
```

```javascript
// CDN
const FieldConfiguration = await $arcgis.import("@arcgis/core/layers/support/FieldConfiguration.js");
```

**Since:** 4.34

## See Also

- FeatureLayer.fieldConfigurations
- FeatureTable component
- PopupTemplate
- DateTimeFieldFormat
- NumberFieldFormat
- FieldInfo
- FeatureLayer.getFieldAlias()
- DateTimeFieldFormat
- NumberFieldFormat
- FieldInfo.fieldFormat

## Property Details

### `FieldConfiguration`

### `alias`

### `declaredClass`
- **Type:** `Inherited`

### `fieldFormat`

### `name`

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
// Create a number field format
const numberFormat = new NumberFieldFormat ({
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
  useGrouping: "always"
});

// Create a field configuration object containing the number format
const numFieldConfiguration = new FieldConfiguration ({
  name: "lat", // name of the field in the service
  fieldFormat: numberFormat,
  alias: "Latitude"
});

// Create a date-time field format
const dateTimeFormat = new DateTimeFieldFormat ({
  dateStyle: "medium",
  timeStyle: "short",
  hour12: "never"
});

// Create a field configuration object containing the date format
const dateFieldConfiguration = new FieldConfiguration ({
  name: "collectionDate", // name of the field in the service
  fieldFormat: dateTimeFormat,
  alias: "Date Collected"
});

// Create a feature layer and pass in the field configurations
const featureLayer = new FeatureLayer ({
  url: "url to feature layer",
  outFields: ["*"],
  fieldConfigurations: [numFieldConfiguration, dateFieldConfiguration] // add as many field configurations as needed

});
```

```javascript
// Adding a new field configuration
const addNewConfig = (layer, fieldName, alias,
fieldFormat) => {
  const existingConfig = layer.getFieldConfiguration(fieldName);
  if (!existingConfig) {
    const newConfig = new FieldConfiguration ({ name: fieldName, alias, fieldFormat });
    const newConfigs = clone(layer.fieldConfigurations);
    newConfigs.push(newConfig);
    layer.fieldConfigurations = newConfigs;
  }
};
```

```javascript
// Updating an existing field configuration
const updateConfig = (layer, fieldName, alias,
fieldFormat) => {
  const existingConfig = layer.getFieldConfiguration(fieldName);
  if (existingConfig) {
    const newConfig = existingConfig.clone();
    newConfig.alias = alias;
    newConfig.fieldFormat = fieldFormat;

    const index = layer.fieldConfigurations.indexOf(existingConfig);
    const newConfigs = clone(layer.fieldConfigurations);
    newConfigs[index] = newConfig;
    layer.fieldConfigurations = newConfigs;
  }
};
```

```javascript
// Deleting an existing field configuration
const deleteConfig = (layer, fieldName) => {
  const existingConfig = layer.getFieldConfiguration(fieldName);
  if(existingConfig) {
    const index = layer.fieldConfigurations.indexOf(existingConfig);
    var newConfigs = clone(layer.fieldConfigurations);
    newConfigs.splice(index, 1);
    layer.fieldConfigurations = newConfigs;
 }
};
```

```javascript
const fieldConfig = new FieldConfiguration({
  "name": "install_date",
  "alias": "Date of Installation",
  "fieldFormat": { // Autocast to DateTimeFieldFormat
     "type": "date-time",
     "dateStyle": "short",
     "timeStyle": "medium"
  }
});
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

