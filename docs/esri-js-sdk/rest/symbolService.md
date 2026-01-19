# symbolService

**Module:** `@arcgis/core/rest/symbolService`

## Import

```javascript
import * as symbolService from "@arcgis/core/rest/symbolService.js";
```

```javascript
// CDN
const symbolService = await $arcgis.import("@arcgis/core/rest/symbolService.js");
```

**Since:** 4.25

## Overview

Represents symbol service resources exposed by the ArcGIS REST API. This module provides resources to convert Scalable Vector Graphics (SVG) to CIMSymbols.

## See Also

- CIMSymbol
- cimSymbolUtils

## Property Details

### `generateSymbol`

### `GenerateSymbolParameters`

### `GenerateSymbolResponse`


## Method Details

### `Method Details()`


## Examples

```javascript
// Using a string.
const svgString = `
   <svg xmlns="http://www.w3.org/2000/svg" height="200" width="200">
     <path d="M150 0 L75 200 L225 200 Z" />
   </svg>
`;
const params = { svgImage: svgString };
symbolService.generateSymbol(symbolServiceUrl, params).then({symbol} => {
  // apply the CIMSymbol to a graphic
  graphicA.symbol = symbol;
});
```

```javascript
// Using FormData.
const blob = new Blob([svgSymbol.trim()], { type: "image/svg+xml" });
const formData = new FormData();
formData.append("svgImage", blob, "symbol.svg");

const params = { svgImage: formData };
symbolService.generateSymbol(symbolServiceUrl, params).then({symbol} => {
  // apply the CIMSymbol to a graphic
  graphicB.symbol = symbol;
});
```

```javascript
// Using HTMLFormElement.
<!-- HTML Element -->
<form name="uploadForm">
  <input type="file" name="svgImage" id="svgFile" />
</form>
// JavaScript
const uploadForm = document.forms["uploadForm"];
uploadForm.addEventListener("change", (event) => {
    const fileName = event.target.value.toLowerCase();
    if (fileName.includes(".svg")) {
        const params = { svgImage: uploadForm };
        symbolService.generateSymbol(symbolServiceUrl, params).then({symbol} => {
           // apply the CIMSymbol to a graphic
           graphicC.symbol = symbol;
        });
    }
});
```

