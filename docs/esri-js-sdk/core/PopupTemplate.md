# PopupTemplate

**Module:** `@arcgis/core/PopupTemplate`

## Import

```javascript
import PopupTemplate from "@arcgis/core/PopupTemplate.js";
```

```javascript
// CDN
const PopupTemplate = await $arcgis.import("@arcgis/core/PopupTemplate.js");
```

**Since:** 4.0

## See Also

- Popup component
- Popup
- FieldInfo
- Map component popup
- Scene component popup
- Link Chart component popup
- MapView.popup
- SceneView.popup
- PopupTemplate samples
- Popup samples
- Sample - Popup actions
- Sample - Custom popup actions per feature
- Sample - Popup with edit action
- FieldInfo
- FieldInfoFormat
- ExpressionInfo
- Sample - Multiple popup elements
- Sample - PopupTemplate function
- Sample - PopupTemplate with promise
- Sample - Browse related records in a popup
- Sample - Custom popup content
- Arcade Popup Profile
- Arcade Feature Reduction Popup Profile
- FeatureLayer.outFields
- PopupTemplate.content
- Sample - Create a FeatureLayer with client-side graphics (popupTemplate.title returns a promise)

## Property Details

### `PopupTemplate`

### `actions`

### `content`

### `declaredClass`
- **Type:** `Inherited`

### `expressionInfos`

### `fieldInfos`

### `lastEditInfoEnabled`

### `layerOptions`

### `outFields`

### `overwriteActions`

### `returnGeometry`

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
popupTemplate.title = "Marriage in {COUNTY} County {CENSUS_TRACT}",
```

```javascript
popupTemplate.content = "<p>From 2017 to 2021, <b>{MARRIEDRATE}%</b> of the" +
" population in {CENSUS_TRACT} were married.</p>" +
"<ul><li>{MARRIED_CY} people were married.</li>" +
"<li>{NEVMARR_CY} people had never married.</li>" +
"<li>{DIVORCD_CY} people were divorced.</li><ul>";
```

```javascript
// Defines an action to zoom out from the selected feature
let zoomOutAction = {
  // This text is displayed as a tooltip
  title: "Zoom out",
  // The ID by which to reference the action in the event handler
  id: "zoom-out",
  // Sets the icon font used to style the action button
  className: "esri-icon-zoom-out-magnifying-glass"
};
// Adds the custom action to the PopupTemplate.
popupTemplate.actions.push(zoomOutAction);
// Apply this PopupTemplate to a layer (or graphic)
layer.popupTemplate = popupTemplate;
// This action will only appear in the popup for features in that layer

// The function to execute when the zoom-out action is clicked
function zoomOut() {
  // In this case the view zooms out two LODs on each click
  view.goTo({
    center: view.center,
    zoom: view.zoom - 2
  });
}

// This event fires for each click on any action
// Notice this event is handled on the default popup of the View
// NOT on an instance of PopupTemplate
view.popup.on("trigger-action", function(event){
  // If the zoom-out action is clicked, fire the zoomOut() function
  if(event.action.id === "zoom-out"){
    zoomOut();
  }
});
```

```javascript
// Set a simple string to a popupTemplate's content
// The string references a value from the POP_2015 attribute field
layer.popupTemplate = {
  content: "{POP_2015} people live in this census tract"
};
```

```javascript
// Set a simple string to a popupTemplate's content
// referencing the value returned from an Arcade expression
layer.popupTemplate = {
  content: "{expression/per-total}% of people in this boundary have a college education.",
  expressionInfos: [{
    name: "per-total",
    expression: "Round((($feature.bachelor + $feature.master + $feature.doctorate) / $feature.TOT_POP) * 100, 2)"
  }]
};
```

```javascript
// Display a table in the popup's content referencing two values
// one from a field, and another returned from an Arcade expression
layer.popupTemplate = {
  title: "College Education in {NAME}",
  content: [
  {
    type: "fields", // Autocasts as new FieldsContent()
    // Autocasts as new FieldInfo[]
    fieldInfos: [
    {
      fieldName: "TOT_POP",
      label: "Total population (2023)",
      format: {
        digitSeparator: true
      }
    },
    {
      fieldName: "expression/college"
    }]
  }],
  // autocasts to ExpressionInfo class
  expressionInfos: [{
    name: "college",
    title: "Completed a college degree",
    expression: "$feature.bachelor + $feature.master + $feature.doctorate"
  }]
};
```

