# AuthoringInfoVisualVariable

**Module:** `@arcgis/core/renderers/support/AuthoringInfoVisualVariable`

## Import

```javascript
import AuthoringInfoVisualVariable from "@arcgis/core/renderers/support/AuthoringInfoVisualVariable.js";
```

```javascript
// CDN
const AuthoringInfoVisualVariable = await $arcgis.import("@arcgis/core/renderers/support/AuthoringInfoVisualVariable.js");
```

**Since:** 4.6

## See Also

- Sample - Multivariate data exploration
- Web map specification - AuthoringInfo visual variable

## Property Details

### `AuthoringInfoVisualVariable`

### `declaredClass`
- **Type:** `Inherited`

### `endTime`

### `field`

### `maxSliderValue`

### `minSliderValue`

### `normalizationField`

### `referenceSizeScale`

### `referenceSizeSymbolStyle`

### `sizeStops`

### `spikeSymbolStyle`

### `startTime`

### `style`

### `theme`

### `type`

### `units`

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
// Creates a deep clone of the authoring info visual variable
let authInfoVV = layer.renderer.authoringInfo.visualVariables.find(function(vv){
  return vv.type === "color";
}).clone();
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

