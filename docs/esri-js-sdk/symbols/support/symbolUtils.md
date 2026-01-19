# symbolUtils

**Module:** `@arcgis/core/symbols/support/symbolUtils`

## Import

```javascript
import * as symbolUtils from "@arcgis/core/symbols/support/symbolUtils.js";
```

```javascript
// CDN
const symbolUtils = await $arcgis.import("@arcgis/core/symbols/support/symbolUtils.js");
```

**Since:** 4.11

## Overview

Utilities for generating small preview images of symbols.

## Property Details

### `getDisplayedColor`

### `getDisplayedSymbol`

### `getLegendLabel`

### `renderColorRampPreviewHTML`

### `renderPieChartPreviewHTML`

### `renderPreviewHTML`

### `renderRelationshipRampPreviewHTML`


## Method Details

### `Method Details()`


## Examples

```javascript
view.on("click", async (event) => {
  const { results } = await view.hitTest(event, { include: layer });
  const graphic = results[0].graphic;

  // do something with the result color
  const color = await symbolUtils.getDisplayedColor(graphic);
});
```

```javascript
view.on("click", async (event) => {
  const { results } = await view.hitTest(event, { include: layer });
  const graphic = results[0].graphic;

  // do something with the result symbol
  const symbol = await symbolUtils.getDisplayedSymbol(graphic, {
    scale: view.scale,
    spatialReference: view.spatialReference,
    resolution: view.resolution
  });
});
```

```javascript
view.on("click", async (event) => {
  const { results } = await view.hitTest(event, { include: layer });
  const graphic = results[0].graphic;

  // do something with the result symbol
  const label = await symbolUtils.getLegendLabel(graphic, view, {
    scale: view.scale,
    spatialReference: view.spatialReference,
    resolution: view.resolution
  });
});
```

```javascript
const colors = [
  "#d6ffe1",
  "#8ceda6",
  "#2ee860",
  "#00e33d"
];

const colorRamp = symbolUtils.renderColorRampPreviewHTML(colors, {
  align: "vertical"
});

body.appendChild(colorRamp);
```

```javascript
// Primary color scheme from colorSchemes.getSchemes()
const schemes = colorSchemes.getSchemes({
  basemap: "gray-vector",
  geometryType: "polygon",
  theme: "above-and-below"
});

const colorRamp = symbolUtils.renderColorRampPreviewHTML(schemes.primaryScheme.colors, {
  align: "horizontal"
});

body.appendChild(colorRamp);
```

```javascript
const { attributes, size, holePercentage, outline } = layer.renderer;
const colors = attributes.map( attribute => attribute.color );

const element = symbolUtils.renderPieChartPreviewHTML(colors, {
  radius: size * 0.5,
  holePercentage,
  values: [10,70,20],
  outline
});

legendElement.appendChild(element);
```

