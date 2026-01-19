# ElevationProfileLineQuery

**Module:** `@arcgis/core/analysis/ElevationProfile/ElevationProfileLineQuery`

## Import

```javascript
import ElevationProfileLineQuery from "@arcgis/core/analysis/ElevationProfile/ElevationProfileLineQuery.js";
```

```javascript
// CDN
const ElevationProfileLineQuery = await $arcgis.import("@arcgis/core/analysis/ElevationProfile/ElevationProfileLineQuery.js");
```

**Since:** 4.34

## See Also

- ElevationProfileAnalysis

## Property Details

### `ElevationProfileLineQuery`

### `chartOptions`
- **Type:** `Inherited`

### `color`

### `declaredClass`
- **Type:** `Inherited`

### `enabled`
- **Type:** `Inherited`

### `id`
- **Type:** `Inherited`

### `source`

### `title`
- **Type:** `Inherited`

### `type`

### `viewOptions`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `clone`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `queryElevation`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create an elevation profile analysis with a custom elevation layer as the source
const elevationLayer = new ElevationLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Elevation/MtBaldy_Elevation/ImageServer"
});

const analysis = new ElevationProfileAnalysis({
  profiles: [{
    type: "query",
    source: elevationLayer
  }]
});
```

```javascript
const elevationLayer = new ElevationLayer({
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/.../Elevation/ImageServer"
});

// Profile line with elevation layer source
const analysis1 = new ElevationProfileAnalysis({
  profiles: [{
    type: "query", // Autocasts as new ElevationProfileLineQuery(),
    source: elevationLayer
  }]
});
```

```javascript
// Profile line with a source coming from an elevation
// layer with a specific sampling resolution
const analysis2 = new ElevationProfileAnalysis({
  profiles: [{
    type: "query",
    source: {
      queryElevation(geometry, options) {
        return elevationLayer.queryElevation(geometry, { ...options, demResolution: 20 })
      }
    }
  }]
});
```

```javascript
// Profile line with a source that queries data
// on an elevation sampler
const sampler = await elevationLayer.createElevationSampler(extent);

const analysis3 = new ElevationProfileAnalysis({
  profiles: [{
    type: "query",
    source: {
      queryElevation: async (geometry: Multipoint) => {
        return {
          geometry: await sampler.queryElevation(geometry),
          noDataValue: sampler.noDataValue
        };
      }
    }
  }]
});
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
// Remove a named group of handles if they exist.
if (obj.hasHandles("watch-view-updates")) {
  obj.removeHandles("watch-view-updates");
}
```

