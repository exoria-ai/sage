# print

**Module:** `@arcgis/core/rest/print`

## Import

```javascript
import * as print from "@arcgis/core/rest/print.js";
```

```javascript
// CDN
const print = await $arcgis.import("@arcgis/core/rest/print.js");
```

**Since:** 4.20

## Overview

The print module provides an executePrint method that generates a printer-ready version of the map using an Export Web Map Task available with ArGIS Server 10.1 and later. This class is used when you want to have more granular control over the user interface, for example, if you want to provide users the ability to define what appears on the printed page. For more information about printing with the MAP_ONLY layout, please see exportOptions. Use PrintParameters to set the printing options. Known Limitations No support There is no current support for printing with any Printing Service published with ArcMap. There is no current support for printing SceneViews. Instead, see SceneView.takeScreenshot(). There is no current support for printing ImageryLayers when a pixelFilter is defined. There is no current support for printing renderers generated from univariateColorSize.createContinuousRenderer() with an above-and-below theme. There is no current support for printing legend items for layers that are sent as a client-side image in the printout. There is no current support for printing rotated symbols and labels when the map is rotated, and layers are sent as a client-side image in the printout. There is no current support for printing features when using a renderer with above-and-below theme. There is no current support for printing GroupLayers with blending or effects. Instead, see MapView.takeScreenshot(). There is no current support for printing effects when a blendMode is applied to a layer. There is no current support for printing layers with the following blendModes: "average", "destination-atop", "destination-in", "destination-out", "destination-over", "invert", "lighter", "minus", "plus", "reflect", "source-atop", "source-in", "source-out", "vivid-light", "XOR". Versioned support Labels currently cannot be printed as part of a FeatureLayer with ArcGIS Server 10.5.1. ImageryLayer cannot be printed with ArcGIS Server 10.5.1 or earlier. VectorTileLayer printing requires ArcGIS Server 10.5.1 or later. Printing layers rendered with the DotDensityRenderer will create a client-side image of the layer in the printout with ArcGIS Server 10.8.0 or earlier. Printing layers using clustering will create a client-side image of the layer in the printout with GeoJSONLayer and/or ArcGIS Server 10.9.0 or earlier. For printing secure VectorTileLayers with ArcGIS Server 10.5.1 or 10.6.0, or for printing VectorTileLayers with ArcGIS Server 10.5.1, the print will create a client-side image for the VectorTileLayer to use in the printout. Printing WFSLayer will create a client-side image of the layer in the printout with ArcGIS Server 11.4.1 or earlier. This has some limitations related to large size printing quality and a dependency on browser window height/width ratio. Printing the drawing order of layers configured with the orderBy property is supported with ArcGIS Server 11.5.0 or later. Printing the background color of a MapView or WebMap requires ArcGIS Server 10.9.0 or later. Printing layers with non-standard URLs (e.g. no MapServer, FeatureServer, or ImageServer in the URL) requires ArcGIS Server 10.9.1 or later. Printing layers with supported blendModes requires ArcGIS Server 10.9.1 or later. This is the list of currently supported types: "color-burn", "color-dodge", "color", "darken", "difference", "exclusion", "hard-light", "hue", "lighten", "luminosity", "multiply", "normal", "overlay", "saturation", "screen", "soft-light". Printing highlighted features with SimpleFillSymbol with FeatureLayers requires ArcGIS Server 11.4.0 or higher. For printing CatalogLayer the catalog footprint is sent as a feature collection if the ArcGIS Server version is less than 11.3.1. Otherwise, it's sent as a CatalogLayer with the dynamicGroupLayer visibility set to false. The other layers from the CatalogLayer are sent separately. Behavior notes Printing layers using effects will create a client-side image of the layer in the printout. Printing layers using binning will create a client-side image of the layer in the printout. Printing layers using pie-chart renderer will create a client-side image of the layer in the printout. Printing layers using TrackInfo and/or trackLines will create a client-side image of the layer in the printout. Printing Multipoint geometries may result in a different output based on the algorithms used to compute labels on the print server versus that of the ArcGIS Maps SDK for JavaScript. Printing layers using highlighted features is only supported for FeatureLayer. For other layer types, see MapView.takeScreenshot(). Printing layers using spike renderer will not apply the spike renderer to the printed legend. Legends will print if there is enough space in the template for both the map and the legend. The print server does not directly print SVG symbols. Rather, they are converted to PictureMarkerSymbols for display. Make certain that any resources to be printed are accessible by the print server. For example, if printing a map containing PictureMarkerSymbols, the URL to these symbols must be accessible to the print server for it to work properly. Currently, charts can only be printed when published as part of a FeatureLayer, and with ArcGIS Server version 11.2 or later. For Print widget only: if the application and the print service are on the same origin, the name of the downloadable file can be customized with the fileName or title properties. If not, the name of the downloadable file will be generated by the ArcGIS Enterprise that hosts the print service.

## See Also

- Print widget
- Print component
- PrintTemplate

## Property Details

### `execute`

### `getMode`

### `PrintResponse`


## Method Details

### `Method Details()`


## Examples

```javascript
const [print, PrintTemplate, PrintParameters] = await $arcgis.import([
 "@arcgis/core/rest/print.js",
 "@arcgis/core/rest/support/PrintTemplate.js",
 "@arcgis/core/rest/support/PrintParameters.js"
]);

// url to the print service
const url = "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";

const template = new PrintTemplate({
  format: "pdf",
  exportOptions: {
    dpi: 300
  },
  layout: "a4-portrait",
  layoutOptions: {
    titleText: "Gillette Stadium",
    authorText: "Thomas B."
  }
});

const params = new PrintParameters({
  view: view,
  template: template
});

// print when this function is called
function executePrint() {
  print.execute(url, params).then(printResult).catch(printError);
}

function printResult(result) {
  console.log(result.url);
  window.open(result.url);
}

function printError(err) {
  console.log("Something broke: ", err);
}
```

