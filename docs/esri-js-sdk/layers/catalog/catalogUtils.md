# catalogUtils

**Module:** `@arcgis/core/layers/catalog/catalogUtils`

## Import

```javascript
import * as catalogUtils from "@arcgis/core/layers/catalog/catalogUtils.js";
```

```javascript
// CDN
const catalogUtils = await $arcgis.import("@arcgis/core/layers/catalog/catalogUtils.js");
```

**Since:** 4.30

## Overview

Provides utility functions for the CatalogLayer.

## See Also

- CatalogLayer

## Property Details

### `getCatalogLayerForLayer`

### `isLayerFromCatalog`


## Method Details

### `Method Details()`


## Examples

```javascript
// Highlight the footprint for a layer if it's part of a catalog dynamic grouplayer.
function highlightFootprintForLayer(view, layer) {
  const catalog = getCatalogLayerForLayer(layer);

  if (catalog) {
    const footprint = catalog.createFootprintFromLayer(layer);

    if (footprint) {
      const catalogLayerView = view.allLayerViews.find((layerView) => layerView.layer === catalog);
      return catalogLayerView?.footprintLayerView?.highlight(footprint);
    }
  }

  return { remove() {} };
}
```

```javascript
// Get all layer not part of a catalog.
const layers = map.allLayers.filter((layer) => !isLayerFromCatalog(layer))
```

