# Export Web Map Task

> Source: [/rest/services-reference/enterprise/export-web-map-task/](https://developers.arcgis.com/rest/services-reference/enterprise/export-web-map-task/)

**URL:**: https://<catalog-url>/Utilities/PrintingTools/GPServer/Export Web Map Task

**Methods:**: GET

**Version Introduced:**: 10.1

## Description

The Export Web Map task takes the state of a web application (for example, map services, layer visibility settings, client-side graphics, and so on) and returns either a page layout or a map without page surrounds of the specified area of interest in raster or vector format.

The input for Export Web Map is a piece of text in JavaScript Object Notation (JSON) format describing the layers, graphics, and other settings in the web map. The JSON must be structured according to the WebMap specification described in the parameters section below.

## New at 11.3

-   Supports portal items as layout templates. A print service must be federated to an enterprise portal.

## New at 10.9

-   Supports TIFF as a new image output format.

## New at 10.8.1

-   Added AIX as a new image format.

## Request parameters

| Parameter | Details |
|---|---|
| Web_Map_as_JSON | A JSON representation of the state of the map to be exported as it appears in the web application. For more information on how this JSON object is formatted, see ExportWebMap specification. |
| Format | The format in which the map image for printing will be delivered. The default value is PNG8.Values: PNG8 \| PNG32 \| JPG \| GIF \| PDF \| EPS \| SVG \| SVGZ \|AIX \|TIFF |
| Layout_Template | Either a name of a template from the list (retrieved from the Get Layout Templates Info task, returned as the layoutTemplate property) or the keyword MAP_ONLY . When the value is MAP_ONLY or is empty, the output map does not contain any page layout surroundings (for example, title, legends, scale bar, and so on). The default value is MAP_ONLY . |
| f | The response format. The default response format is html .Values: html \| json \| pjson |
| Layout_Item_ID | The portal ID (in JSON format) of the layout item, from the federated enterprise portal, that will be used for templates. Use the format: {"id": "<portal-id>"}. When a value is provided, this parameter takes precedence over the Layout Template parameter. |

## JSON Response examples

Below is a sample response returned from a synchronous job request:



```
{
  "results": [
    {
      "paramName": "Output_File",
      "dataType": "GPDataFile",
      "value": {
        "url": "https://myserver/arcgis/rest/directories/arcgisoutput/Utilities/ExportWebMap_GPServer/_ags_c39e93a6a7d24286ad9fa3b812f23ad3.png"
      }
    }
  ],
  "messages": []
}
```

Below is a sample response returned from an asynchronous job request:



```
{
  "paramName": "Output_File",
  "dataType": "GPDataFile",
  "value": {
    "url": "https://myserver/arcgis/rest/directories/arcgisjobs/exportwebmap_gpserver/j16f7de07afee441585f84cd788266c9c/scratch/fd67076d7a7b448282eac9ff62afac4d.pdf"
  }
}
```