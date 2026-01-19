# geometryService

**Module:** `@arcgis/core/rest/geometryService`

## Import

```javascript
import * as geometryService from "@arcgis/core/rest/geometryService.js";
```

```javascript
// CDN
const geometryService = await $arcgis.import("@arcgis/core/rest/geometryService.js");
```

**Since:** 4.19

## Overview

Represents geometry service resources exposed by the ArcGIS REST API. It is used to perform various operations on geometries such as project, simplify, buffer, and relationships. View the About the geometry service help topic for details. Esri hosts a geometry service on sampleserver6.arcgisonline.com to support samples. However, we do not guarantee that the service will be available 24/7. Many of the functions in geometryService are available for use client-side using geometry operators. See the Introduction to geometry operators guide topic for more details.

## Inheritance

Extends: **the**

## See Also

- areaOperator
- geodeticAreaOperator
- lengthOperator
- geodeticLengthOperator
- autoCompleteOperator
- bufferOperator
- geodesicBufferOperator
- graphicBufferOperator
- convexHullOperator
- cutOperator
- densifyOperator
- geodeticDensifyOperator
- differenceOperator
- distanceOperator
- geodeticDistanceOperator
- coordinateFormatter
- generalizeOperator
- intersectionOperator
- intersectsOperator
- labelPointOperator
- lengthOperator
- geodeticLengthOperator
- offsetOperator
- projectOperator
- Guide topic - Spatial relationship operators
- reshapeOperator
- simplifyOperator
- coordinateFormatter
- extendOperator
- cutOperator
- unionOperator

## Property Details

### `areasAndLengths`

### `autoComplete`

### `buffer`

### `convexHull`

### `cut`

### `densify`

### `difference`

### `distance`

### `fromGeoCoordinateString`

### `generalize`

### `intersect`

### `labelPoints`

### `lengths`

### `offset`

### `project`

### `relation`

### `reshape`

### `simplify`

### `toGeoCoordinateString`

### `trimExtend`

### `union`


## Method Details

### `Method Details()`


## Examples

```javascript
{
  areas: <Number[]>,
  lengths: <Number[]>
}
```

```javascript
simplify(url, { polygons: [polygon] }).then(function(simplifiedGeometries){
  const areasAndLengthParams = new AreasAndLengthsParameters({
    areaUnit: "square-kilometers",
    lengthUnit: "kilometers",
    polygons: simplifiedGeometries
  });
  areasAndLengths(url, areasAndLengthParams).then(function(results){
    console.log("area: ", results.areas[0]);
    console.log("length: ", results.lengths[0]);
  });
});
```

```javascript
const webMerPoint = webMercatorUtils.geographicToWebMercator(point);
const params = new BufferParameters({
  distances: [560],
  unit: "kilometers",
  geodesic: true,
  bufferSpatialReference: new SpatialReference({wkid: 3857}),
  outSpatialReference: view.spatialReference,
  geometries: [webMerPoint]
});

buffer(url, params).then(function(results){
  bufferLayer.add(new Graphic({
     geometry: results[0]
  }));
});
```

```javascript
const geoms = pointLayer.graphics.map(function(item, i){
  return webMercatorUtils.geographicToWebMercator(item.geometry);
});
convexHull(url, { geometries: geoms.toArray() }).then(function(result){
  convexLayer.add(new Graphic({
    geometry: result
  }));
},function(error){
   console.log("error occurred", error)
});
```

```javascript
{
  cutIndexes: <Number[]>,
  geometries: <Geometry[]>
}
```

```javascript
const params = new DensifyParameters({
  geodesic: true,
  lengthUnit: "meters",
  maxSegmentLength: 30,
  geometries: [polygon]
});

densify(url, params).then(function(results){
  layer.add(new Graphic({
    geometry: results[0]
  }));
}.catch(function(error){
   console.log("error occurred", error)
});
```

