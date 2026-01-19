# ElementExpressionInfo

**Module:** `@arcgis/core/popup/ElementExpressionInfo`

## Import

```javascript
import ElementExpressionInfo from "@arcgis/core/popup/ElementExpressionInfo.js";
```

```javascript
// CDN
const ElementExpressionInfo = await $arcgis.import("@arcgis/core/popup/ElementExpressionInfo.js");
```

**Since:** 4.22

## See Also

- PopupTemplate
- Popup Element Web Map Specification
- Popup Element Profile
- Arcade Profiles: Popup Element Specification
- Sample - Create popup charts from Arcade expressions
- Sample - Popup charts for point clusters
- Popup Element web map specification
- Popup Element Profile
- Arcade Profiles: Popup Element Specification
- Sample - Create popup charts from Arcade expressions
- Sample - Popup charts for point clusters

## Property Details

### `ElementExpressionInfo`

### `declaredClass`
- **Type:** `Inherited`

### `expression`

### `returnType`

### `title`

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
// Creates an ordered list in a cluster's popup
// listing the type of fuel used to generate power in the cluster
// ordered by the total number of power plants for each fuel type.
layer.featureReduction = {
  type: "cluster",
  popupTemplate: {
    title: "Power plant summary",
    content: [{
      type: "expression",
      expressionInfo: {
        expression: `
          // Specify which fields are required by the expression
          Expects($aggregatedFeatures, "fuel1", "capacity_mw")

          // Query stats for each fuel type
          var statsFS = GroupBy($aggregatedFeatures,
            [
              { name: 'Type', expression: 'fuel1'},
            ],
            [  // statistics to return for each unique category
              { name: 'capacity_total', expression: 'capacity_mw', statistic: 'SUM' },
              { name: 'capacity_max', expression: 'capacity_mw', statistic: 'MAX' },
              { name: 'num_features', expression: '1', statistic: 'COUNT' }
            ]
          );
          // create an list in descending order based
          // on the number of plants for each fuel type.
          var ordered = OrderBy(statsFs, 'num_features DESC');

          var list = "<ol>";

          for (var group in ordered){
            list += \`<li>\${group.Type} (\${Text(group.num_features, "#,###")})</li>\`
          }
          list += "</ol>";

          // The return dictionary must return a text, fields, or media
          // popup element as defined in the web map specification
          return {
            type: "text",
            text: list
          }
        `,
        title: "List of fuel types"
      }
    }]
  }
};
```

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
        // to display in the table
        var attributes = {
          "No School": $feature.no_school + $feature.some_primary,
          "Primary": $feature.primary_complete + $feature.some_secondary,
          "Secondary": $feature.secondary_complete + $feature.some_highSchool,
          "High School": $feature.highSchool_diploma + $feature.highSchool_ged + $feature.some_college,
          "College/University": $feature.associates + $feature.bachelors + $feature.masters + $feature.doctorate + $feature.professional;
        };

        var fieldInfos = [];

        // Create an array representing the attribute names (or keys)
        // to include in the chart
        for (var k in attributes){
          Push(fieldInfos, {
            fieldName: k
          });
        }

        // Returns a dictionary providing the information
        // required by the popup to render a table of key value pairs
        return {
          type: "media",
          attributes: attributes,
          // The list of attribute names (keys) to include in the table
          fieldInfos: fieldInfos
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

