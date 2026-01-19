# Get Layout Templates Info Task

> Source: [/rest/services-reference/enterprise/get-layout-templates-info-task/](https://developers.arcgis.com/rest/services-reference/enterprise/get-layout-templates-info-task/)

**URL:**: https://<catalog-url>/Utilities/PrintingTools/GPServer/Get Layout Templates Info Task

**Methods:**: GET

**Version Introduced:**: 10.4

## Description

This operation layout returns information about a print service layout. The response returns the size of the layout page and the size of the active data frame and shows whether the following layout elements are available:

-   Legend
-   Title text
-   Copyright text
-   Author text
-   Custom text elements

The `layoutTemplate` information returned by this operation can be plugged in to the `Layout_Template` parameter when using the [Export Web Map](/rest/services-reference/enterprise/export-web-map-task/) operation.

## New at 11.4

-   Returns `dynamicLegends` for legend element to indicate if dynamic legends on or off by default in a layout template.

## New at 11.3

-   Supports portal items as layout templates. A print service must be federated to an enterprise portal.

## New at 11.2

-   Supports returning dynamic text elements available on layout template.

## Request parameters

| Parameter | Details |
|---|---|
| f | The response format. The default response format is html .Values: html \| json \| kmz |
| Layout_Item_ID | The portal ID (in JSON format) of the layout item, from the federated enterprise portal, that will be used for templates. Use the format: {"id": "<portal-id>"}. |

## JSON Response example



```
{
  "results": [
    {
      "paramName": "Output_JSON",
      "dataType": "GPString",
      "value": [
        {
          "layoutTemplate": "A3 Landscape",
          "pageSize": [
            42.0,
            29.700000000000003
          ],
          "pageUnits": "CENTIMETER",  //introduced at 10.6
          "webMapFrameSize": [  //Previously named activeDataFrameSize
            40.0,
            21.17
          ],
          "layoutOptions": {
            "hasTitleText": true,
            "hasAuthorText": true,
            "hasCopyrightText": true,
            "hasLegend": true,
            "customTextElements": []
          }
        },
        {
          "layoutTemplate": "A3 Portrait",
          "pageSize": [
            29.700000000000003,
            42.0
          ],
          "pageUnits": "CENTIMETER",  //introduced at 10.6
          "webMapFrameSize": [  //Previously named activeDataFrameSize
            27.68,
            33.45
          ],
          "layoutOptions": {
            "hasTitleText": true,
            "hasAuthorText": true,
            "hasCopyrightText": true,
            "hasLegend": true,
            "customTextElements": []
          }
        },
        {
          "layoutTemplate": "A4 Landscape",
          "pageSize": [
            29.700000000000003,
            21.0
          ],
          "pageUnits": "CENTIMETER",  //introduced at 10.6
          "webMapFrameSize": [  //Previously named activeDataFrameSize
            27.76,
            15.92
          ],
          "layoutOptions": {
            "hasTitleText": true,
            "hasAuthorText": true,
            "hasCopyrightText": true,
            "hasLegend": true,
            "customTextElements": []
          }
        },
        {
          "layoutTemplate": "A4 Portrait",
          "pageSize": [
            21.0,
            29.700000000000003
          ],
          "pageUnits": "CENTIMETER",  //introduced at 10.6
          "webMapFrameSize": [  //Previously named activeDataFrameSize
            19.02,
            22.28
          ],
          "layoutOptions": {
            "hasTitleText": true,
            "hasAuthorText": true,
            "hasCopyrightText": true,
            "hasLegend": true,
            "customTextElements": []
          }
        },
        {
          "layoutTemplate": "Letter ANSI A Landscape",
          "pageSize": [
            11.0,
            8.5
          ],
          "pageUnits": "INCH",  //introduced at 10.6
          "webMapFrameSize": [  //Previously named activeDataFrameSize
            10.0,
            6.25
          ],
          "layoutOptions": {
            "hasTitleText": true,
            "hasAuthorText": true,
            "hasCopyrightText": true,
            "hasLegend": true,
            "customTextElements": []
          }
        },
        {
          "layoutTemplate": "Letter ANSI A Portrait",
          "pageSize": [
            8.5,
            11.0
          ],
          "pageUnits": "INCH",  //introduced at 10.6
          "webMapFrameSize": [  //Previously named activeDataFrameSize
            7.5,
            8.0
          ],
          "layoutOptions": {
            "hasTitleText": true,
            "hasAuthorText": true,
            "hasCopyrightText": true,
            "hasLegend": true,
            "customTextElements": []
          }
        },
        {
          "layoutTemplate": "Tabloid ANSI B Landscape",
          "pageSize": [
            17.0,
            11.0
          ],
          "pageUnits": "INCH",  //introduced at 10.6
          "webMapFrameSize": [  //Previously named activeDataFrameSize
            16.0,
            7.76
          ],
          "layoutOptions": {
            "hasTitleText": true,
            "hasAuthorText": true,
            "hasCopyrightText": true,
            "hasLegend": true,
            "customTextElements": []
          }
        },
        {
          "layoutTemplate": "Tabloid ANSI B Portrait",
          "pageSize": [
            11.0,
            17.0
          ],
          "pageUnits": "INCH",  //introduced at 10.6
          "webMapFrameSize": [  //Previously named activeDataFrameSize
            10.0,
            13.61
          ],
          "layoutOptions": {
            "hasTitleText": true,
            "hasAuthorText": true,
            "hasCopyrightText": false,
            "hasLegend": true,
            "customTextElements": [],
            "mapSurroundInfos": [
              {
                "name": "Legend",
                "type": "CIMLegend",
                "visible": true,
                "defaultLegendItem": {
                    "dynamicLegends": true
                  }
              },
              {
                "name": "North Arrow",
                "type": "CIMMarkerNorthArrow",
                "visible": false
              },
              {
                "name": "Scale bar",
                "type": "CIMGroupElement",
                "visible": true,
                "elements": [
                  {
                    "name": "Scale Line",
                    "type": "CIMScaleLine",
                    "visible": true
                  },
                  {
                    "name": "Scale Line 1",
                    "type": "CIMScaleLine",
                    "visible": true
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  ],
  "messages": []
}
```