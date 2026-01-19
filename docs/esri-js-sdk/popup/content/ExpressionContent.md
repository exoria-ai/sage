# ExpressionContent

**Module:** `@arcgis/core/popup/content/ExpressionContent`

## Import

```javascript
import ExpressionContent from "@arcgis/core/popup/content/ExpressionContent.js";
```

```javascript
// CDN
const ExpressionContent = await $arcgis.import("@arcgis/core/popup/content/ExpressionContent.js");
```

**Since:** 4.22

## See Also

- PopupTemplate
- ElementExpressionInfo
- Popup Element Web Map Specification
- Popup Element Profile
- Arcade Profiles: Popup Element Specification
- Sample - Create popup charts from Arcade expressions
- Sample - Popup charts for point clusters

## Property Details

### `ExpressionContent`

### `declaredClass`
- **Type:** `Inherited`

### `expressionInfo`

### `type`

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
// Creates an column chart where each category/value
// is an aggregate of two or more fields
layer.popupTemplate = {
  title: "Educational Attainment",
  content: [{
    type: "expression",
    expressionInfo: {
      expression: `
        // Create a dictionary of attributes representing the values
        // to display in the chart
        var attributes = {
          "No School": $feature.no_school + $feature.some_primary,
          "Primary": $feature.primary_complete + $feature.some_secondary,
          "Secondary": $feature.secondary_complete + $feature.some_highSchool,
          "High School": $feature.highSchool_diploma + $feature.highSchool_ged + $feature.some_college,
          "College/University": $feature.associates + $feature.bachelors + $feature.masters + $feature.doctorate + $feature.professional;
        };

        var fields = [];

        // Create an array representing the attribute names (or keys)
        for (var k in attributes){
          Push(fields, k);
        }

        // Returns a dictionary providing the information
        // required by the popup to render a column chart
        return {
          type: "media",
          attributes: attributes,
          title: "Educational attainment",
          mediaInfos: [{
            type: "columnchart",
            value: {
              // The list of attribute names (keys) to include in the chart
              fields: fields
            }
          }]
        };
      `,
      title: "Educational Attainment"
    }
  }]
};
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

```javascript
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

