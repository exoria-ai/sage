# Vector Tile Style

> Source: [/rest/services-reference/enterprise/vector-tile-style/](https://developers.arcgis.com/rest/services-reference/enterprise/vector-tile-style/)

**URL:**: https://<root>/<serviceName>/VectorTileServer/resources/style

**Methods:**: GET

**Version Introduced:**: 10.4

## Description

This resource returns styles for vector tiles in [Mapbox GL Style specification](https://www.mapbox.com/mapbox-gl-style-spec/#) version 8. The response for this styles resource includes the `sprite` and `glyphs` properties, with a relative path to the [Vector Tile Sprite](/rest/services-reference/enterprise/vector-tile-sprite/) and [Vector Tile Font](/rest/services-reference/enterprise/vector-tile-font/) resources. It also includes the `version` property, which represents the version of the style specification.

## Example usage

Note: This is an example URL only and is not an active link to an existing attachment.

`https://services.myserver.com/arcgis/rest/services/Hosted/World/VectorTileServer/resources/style`

## JSON Response syntax



```
{
  "version": <version>,
   "sprite": "../sprites/sprite",
   "glyphs": "../fonts/{fontstack}/{range}.pbf",
   "sources": {...},
   "layers": [...]
  }
```

## JSON Response example



```
{
   "version": 8,
   "sprite": "../sprites/sprite",
   "glyphs": "../fonts/{fontstack}/{range}.pbf",
   "sources": {
       "esri": {
           "type": "vector",
           "url": "../../"
       }
   },
   "layers": [
       {
           "id": "Graduated Color/GraduatedColor_poly/482025.000000 - 2135252.000000",
           "type": "fill",
           "source": "esri",
           "source-layer": "GraduatedColor_poly",
           "filter": [
               "==",
               "_symbol",
               0
           ],
           "layout": {},
           "paint": {
               "fill-color": "#FFFF80",
               "fill-outline-color": "#6E6E6E"
           }
       },
       {
           "id": "Graduated Color/GraduatedColor_poly/2135252.000001 - 4790311.000000",
           "type": "fill",
           "source": "esri",
           "source-layer": "GraduatedColor_poly",
           "filter": [
               "==",
               "_symbol",
               1
           ],
           "layout": {},
           "paint": {
               "fill-color": "#FAD155",
               "fill-outline-color": "#6E6E6E"
           }
       },
       {
           "id": "Graduated Color/GraduatedColor_poly/4790311.000001 - 9866640.000000",
           "type": "fill",
           "source": "esri",
           "source-layer": "GraduatedColor_poly",
           "filter": [
               "==",
               "_symbol",
               2
           ],
           "layout": {},
           "paint": {
               "fill-color": "#F2A72E",
               "fill-outline-color": "#6E6E6E"
           }
       },
       {
           "id": "Graduated Color/GraduatedColor_poly/9866640.000001 - 20127338.000000",
           "type": "fill",
           "source": "esri",
           "source-layer": "GraduatedColor_poly",
           "filter": [
               "==",
               "_symbol",
               3
           ],
           "layout": {},
           "paint": {
               "fill-color": "#AD5313",
               "fill-outline-color": "#6E6E6E"
           }
       },
       {
           "id": "Graduated Color/GraduatedColor_poly/20127338.000001 - 33090214.000000",
           "type": "fill",
           "source": "esri",
           "source-layer": "GraduatedColor_poly",
           "filter": [
               "==",
               "_symbol",
               4
           ],
           "layout": {},
           "paint": {
               "fill-color": "#6B0000",
               "fill-outline-color": "#6E6E6E"
           }
       },
       {
           "id": "Graduated Color/GraduatedColor_line/0.012504 - 4.886840",
           "type": "line",
           "source": "esri",
           "source-layer": "GraduatedColor_line",
           "filter": [
               "==",
               "_symbol",
               0
           ],
           "layout": {
               "line-cap": "round",
               "line-join": "round"
           },
           "paint": {
               "line-color": "#FFFF80",
               "line-width": 1
           }
       },
       {
           "id": "Graduated Color/GraduatedColor_line/4.886841 - 10.196044",
           "type": "line",
           "source": "esri",
           "source-layer": "GraduatedColor_line",
           "filter": [
               "==",
               "_symbol",
               1
           ],
           "layout": {
               "line-cap": "round",
               "line-join": "round"
           },
           "paint": {
               "line-color": "#FAD155",
               "line-width": 1
           }
       },
       {
           "id": "Graduated Color/GraduatedColor_line/10.196045 - 20.520850",
           "type": "line",
           "source": "esri",
           "source-layer": "GraduatedColor_line",
           "filter": [
               "==",
               "_symbol",
               2
           ],
           "layout": {
               "line-cap": "round",
               "line-join": "round"
           },
           "paint": {
               "line-color": "#F2A72E",
               "line-width": 1
           }
       },
       {
           "id": "Graduated Color/GraduatedColor_line/20.520851 - 39.175259",
           "type": "line",
           "source": "esri",
           "source-layer": "GraduatedColor_line",
           "filter": [
               "==",
               "_symbol",
               3
           ],
           "layout": {
               "line-cap": "round",
               "line-join": "round"
           },
           "paint": {
               "line-color": "#AD5313",
               "line-width": 1
           }
       },
       {
           "id": "Graduated Color/GraduatedColor_line/39.175260 - 76.515412",
           "type": "line",
           "source": "esri",
           "source-layer": "GraduatedColor_line",
           "filter": [
               "==",
               "_symbol",
               4
           ],
           "layout": {
               "line-cap": "round",
               "line-join": "round"
           },
           "paint": {
               "line-color": "#6B0000",
               "line-width": 1
           }
       },
       {
           "id": "Graduated Color/GraduatedColor_point/-99 - 190",
           "type": "symbol",
           "source": "esri",
           "source-layer": "GraduatedColor_point",
           "filter": [
               "==",
               "_symbol",
               0
           ],
           "layout": {
               "symbol-avoid-edges": true,
               "icon-image": "Graduated Color/GraduatedColor_point/-99 - 190",
               "icon-padding": 1
           },
           "paint": {}
       },
       {
           "id": "Graduated Color/GraduatedColor_point/191 - 803",
           "type": "symbol",
           "source": "esri",
           "source-layer": "GraduatedColor_point",
           "filter": [
               "==",
               "_symbol",
               1
           ],
           "layout": {
               "symbol-avoid-edges": true,
               "icon-image": "Graduated Color/GraduatedColor_point/191 - 803",
               "icon-padding": 1
           },
           "paint": {}
       },
       {
           "id": "Graduated Color/GraduatedColor_point/804 - 1680",
           "type": "symbol",
           "source": "esri",
           "source-layer": "GraduatedColor_point",
           "filter": [
               "==",
               "_symbol",
               2
           ],
           "layout": {
               "symbol-avoid-edges": true,
               "icon-image": "Graduated Color/GraduatedColor_point/804 - 1680",
               "icon-padding": 1
           },
           "paint": {}
       },
       {
           "id": "Graduated Color/GraduatedColor_point/1681 - 4687",
           "type": "symbol",
           "source": "esri",
           "source-layer": "GraduatedColor_point",
           "filter": [
               "==",
               "_symbol",
               3
           ],
           "layout": {
               "symbol-avoid-edges": true,
               "icon-image": "Graduated Color/GraduatedColor_point/1681 - 4687",
               "icon-padding": 1
           },
           "paint": {}
       },
       {
           "id": "Graduated Color/GraduatedColor_point/4688 - 6989",
           "type": "symbol",
           "source": "esri",
           "source-layer": "GraduatedColor_point",
           "filter": [
               "==",
               "_symbol",
               4
           ],
           "layout": {
               "symbol-avoid-edges": true,
               "icon-image": "Graduated Color/GraduatedColor_point/4688 - 6989",
               "icon-padding": 1
           },
           "paint": {}
       }
   ]
}
```