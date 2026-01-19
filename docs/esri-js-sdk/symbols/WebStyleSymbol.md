# WebStyleSymbol

**Module:** `@arcgis/core/symbols/WebStyleSymbol`

## Import

```javascript
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
```

```javascript
// CDN
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");
```

**Since:** 4.1

## See Also

- Guide - Visualizing points with 3D symbols
- Guide - WebStyleSymbol reference list
- Symbol Builder
- Sample - WebStyleSymbols(2D)
- Sample - Visualize features with realistic WebStyleSymbols
- Sample - Visualize features with realistic 3D symbols
- CIMSymbol
- PointSymbol3D
- ObjectSymbol3DLayer
- IconSymbol3DLayer
- Renderer
- Guide - WebStyleSymbol reference list
- Guide - WebStyleSymbol reference list
- Guide - Visualizing points with 3D symbols

## Property Details

### `WebStyleSymbol`

### `declaredClass`
- **Type:** `Inherited`

### `name`

### `portal`

### `styleName`

### `styleUrl`

### `type`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `fetchCIMSymbol`

### `fetchSymbol`

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
// Referencing a web style via styleName
let symbol = {
  type: "web-style",  // autocasts as new WebStyleSymbol()
  styleName: "EsriThematicShapesStyle",
  name: "Standing Diamond"
};
```

```javascript
// Referencing a web style via styleUrl
let symbol = {
  type: "web-style",  // autocasts as new WebStyleSymbol()
  styleUrl: "http://www.arcgis.com/sharing/rest/content/items/bf27400d167d4c2e8e12c8a46f87afe4/data",
  name: "Centered Sphere"
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
// Creates a deep clone of the graphic's symbol
let symLyr = graphic.symbol.clone();
```

```javascript
// Given a SimpleRenderer with a WebStyleSymbol,
// fetch the corresponding CIMSymbol,
// then replace the renderer symbol with the returned CIMSymbol
renderer.symbol.fetchCIMSymbol().then(function (cimSymbol) {
  renderer.symbol = cimSymbol;
});

// note: the above is deprecated functionality. Use the following instead:
renderer.symbol.fetchSymbol({ acceptedFormats: ["cim"] }).then(function (cimSymbol) {
  renderer.symbol = cimSymbol;
});
```

```javascript
// Given a SimpleRenderer with a WebStyleSymbol, replaces the symbol with its non-referencing version by fetching it
renderer.symbol.fetchSymbol().then(function(actualSymbol) {
  renderer.symbol = actualSymbol;
});
```

