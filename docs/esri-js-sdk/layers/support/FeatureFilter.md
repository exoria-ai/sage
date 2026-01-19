# FeatureFilter

**Module:** `@arcgis/core/layers/support/FeatureFilter`

## Import

```javascript
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter.js";
```

```javascript
// CDN
const FeatureFilter = await $arcgis.import("@arcgis/core/layers/support/FeatureFilter.js");
```

**Since:** 4.22

## See Also

- FeatureLayerView.filter
- Sample - Filter features by attributes
- Sample - Filter features by geometry
- Querying and filtering guide doc
- Sample - Filter features by geometry
- Sample - Filter features by attributes

## Property Details

### `FeatureFilter`

### `declaredClass`
- **Type:** `Inherited`

### `distance`

### `geometry`

### `objectIds`

### `spatialRelationship`

### `timeExtent`

### `units`

### `where`

### `addHandles`
- **Type:** `Inherited`

### `clone`

### `createQuery`

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
// display rain gauges where their water percent is over 30%
// and if the gauges are completely contained by the 10-mile
// buffer around the filter geometry
featureLayerView.filter = new FeatureFilter({
  where: "percentile >= 30",
  geometry: filterPolygon,
  spatialRelationship: "contains",
  distance: 10,
  units: "miles"
});
```

```javascript
// Typical usage
const filter = new FeatureFilter({
  where: "magnitude >= 3"
});
layerView.filter = filter;
```

```javascript
// hide all features when objectIds array is empty
const oidsArray = layerView.queryObjectIds(query);
layerView.filter = oidsArray.length > 0 ?  { objectIds: oidsArray } : { where: "1=0" };
```

```javascript
// display features that are completely within state
let filter = new FeatureFilter({
  spatialRelationship: "contains",
  geometry: statePolygon
});
```

```javascript
filter.where = "NAME = '" + stateName + "'";
```

```javascript
filter.where = "POP04 > " + population;
```

