# LayerOptions

**Module:** `@arcgis/core/popup/LayerOptions`

## Import

```javascript
import LayerOptions from "@arcgis/core/popup/LayerOptions.js";
```

```javascript
// CDN
const LayerOptions = await $arcgis.import("@arcgis/core/popup/LayerOptions.js");
```

**Since:** 4.11

## See Also

- PopupTemplate
- Sample - Intro to PopupTemplate
- Sample - Multiple popup elements

## Property Details

### `LayerOptions`

### `declaredClass`
- **Type:** `Inherited`

### `returnTopmostRaster`

### `showNoDataRecords`

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
popupTemplate: {
  "title": "ScientificData/SeaTemperature:{ProductName}",
  content: [{
    type: "fields",
    "fieldInfos": [{
      "fieldName": "Raster.ItemPixelValue",
      "label": "Item Pixel Value",
      "isEditable": false,
      "visible": true,
      "format": {
        "places": 2,
        "digitSeparator": true
      }
    }],
  "layerOptions": {
    "showNoDataRecords": true
  }
  }]
}
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

