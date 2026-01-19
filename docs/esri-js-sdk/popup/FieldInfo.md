# FieldInfo

**Module:** `@arcgis/core/popup/FieldInfo`

## Import

```javascript
import FieldInfo from "@arcgis/core/popup/FieldInfo.js";
```

```javascript
// CDN
const FieldInfo = await $arcgis.import("@arcgis/core/popup/FieldInfo.js");
```

**Since:** 4.11

## See Also

- PopupTemplate
- ExpressionInfo
- Sample - Intro to PopupTemplate
- Sample - Custom popup actions per feature
- Sample - Multiple popup elements
- Sample - PopupTemplate function
- Sample - PopupTemplate with promise
- FeatureLayer.fieldConfigurations
- FieldConfiguration
- ExpressionInfo.name
- fieldFormat

## Property Details

### `FieldInfo`

### `declaredClass`
- **Type:** `Inherited`

### `fieldFormat`

### `fieldName`

### `format`

### `isEditable`

### `label`

### `statisticType`

### `stringFieldOption`

### `tooltip`

### `visible`

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
let fieldInfo = new FieldInfo({
  fieldName: 'PROMINENCE_ft',
  label: 'Prominence (feet)',
  //autocasts to FieldInfo.Format
  format: {
    places: 0,
    digitSeparator: true
  }
});
```

```javascript
// Attribute expression using expressionInfos to append the time zone suffix to a date field.
// Date field types will show in the MapView's current time zone.
layer.popupTemplate = {
  title: "Display time zones",
  fieldInfos: [{
    fieldName: "expression/date-with-time-zone-suffix",
  }],
  expressionInfos: [{
    expression: `Text($feature.date_Field, "M/D/Y, h:mm A ZZZZ")`,
    name: "date-with-time-zone-suffix",
  }],
  content: [{
    type: "fields"
  }]
};
```

```javascript
// ExpressionContent to append the time zone suffix to a date field.
// Date field types will show in the MapView's current time zone by default.
layer.popupTemplate = {
  title: "Display time zones",
  content: [{
    type: "expression",
    expressionInfo: {
      expression: `return {
        type : 'text',
        text : Text($feature.date_Field, "M/D/Y, h:mm A ZZZZ")
      }`
    }
  }]
 };
```

```javascript
// Attribute expression using expressionInfos to append the time zone suffix to a timestamp-offset field.
layer.popupTemplate = {
  title: "Display time zones",
  fieldInfos: [{
    fieldName: "expression/TSO-from-server",
  }],
  expressionInfos: [{
    expression: `Text($feature.TimestampOffset_Field, "M/D/Y, h:mm A ZZZZ")`,
    name: "TSO-from-server",
  }],
  content: [{
    type: "fields"
  }]
};
```

```javascript
// ExpressionContent to append the time zone suffix to a timestamp-offset field.
layer.popupTemplate = {
  title: "Display time zones",
  content: [{
    type: "expression",
    expressionInfo: {
      expression: `return {
        type : 'text',
        text : Text($feature.TimestampOffset_Field, "M/D/Y, h:mm A ZZZZ")
      }`
    }
  }]
 };
```

```javascript
// Attribute expression using expressionInfos to append the MapView's current time zone suffix to a timestamp-offset field
layer.popupTemplate = {
  title: "Display time zones",
  fieldInfos: [{
    fieldName: "expression/TSO-matching-view-tz",
  }],
  expressionInfos: [{
    expression: `Text(ChangeTimeZone($feature.TimestampOffset_Field, GetEnvironment().timeZone), "M/D/Y, h:mm A ZZZZ")`,
    name: "TSO-matching-view-tz",
  }],
  content: [{
    type: "fields"
  }]
};
```

