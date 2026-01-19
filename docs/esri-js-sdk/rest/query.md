# query

**Module:** `@arcgis/core/rest/query`

## Import

```javascript
import * as query from "@arcgis/core/rest/query.js";
```

```javascript
// CDN
const query = await $arcgis.import("@arcgis/core/rest/query.js");
```

```javascript
// CDN
const query = await $arcgis.import("@arcgis/core/rest/query");
```

**Since:** 4.19

## Overview

Executes different types of query operations on a layer. The most common method used is executeQueryJSON(), which executes the query for JSON results as defined in the Query object that is passed as a parameter to the function. executeQueryJSON() returns a Promise that resolves to a FeatureSet, which contains the features in the layer that satisfy the Query. You can also obtain the number of features that satisfy the query, the extent of features, related features or records associated with a feature, attachments for features or the featureIds of features. For example, when working with a feature layer of world cities, to obtain a FeatureSet of cities with a population greater than one million people, use the code below.

## See Also

- Query
- AttachmentQuery
- RelationshipQuery
- FeatureSet
- capabilities.data.supportsAttachment
- capabilities.operations.supportsQueryAttachments
- Query and filter guide
- TopFeaturesQuery
- TopFilter
- Query and filter guide
- TopFeaturesQuery
- TopFilter
- Query and filter guide
- TopFeaturesQuery
- TopFilter
- Sample - Aggregate spatial statistics
- Query and filter guide
- TopFeaturesQuery
- TopFilter

## Property Details

### `executeAttachmentQuery`

### `executeForCount`

### `executeForExtent`

### `executeForIds`

### `executeForTopCount`

### `executeForTopExtents`

### `executeForTopIds`

### `executeQueryJSON`

### `executeQueryPBF`

### `executeRelationshipQuery`

### `executeTopFeaturesQuery`


## Method Details

### `Method Details()`


## Examples

```javascript
// query featureLayer for cities with a population greater than one million people
const query = await $arcgis.import("@arcgis/core/rest/query");

// url to the layer of interest to query
const url = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/SampleWorldCities/MapServer/0";

const { features } = await query.executeQueryJSON(url, {
  where: "POP > 1000000"
});
```

```javascript
const query = await $arcgis.import("@arcgis/core/rest/query");

// url to the layer of interest to query
const url = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3";

const count = await query.executeForCount(url, {
  where: "POP07_SQMI > 100"
});
```

```javascript
const query = await $arcgis.import("@arcgis/core/rest/query");

// url to the layer of interest to query
const url = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3";

const ids = await query.executeForIds(url, {
  where: "SUB_REGION = 'Pacific'"
});
console.log(ids);  // an array of object IDs
```

```javascript
// set the query to return a count
// of features that has most sales grouped by regions.
// top query will run against all features available in the service
const query = await $arcgis.import("@arcgis/core/rest/query");

const count = await query.executeForTopCount(url, { // autocast to TopFeaturesQuery
  where: "mag >= 6",
  topFilter: { // autocast to TopFilter
    topCount: 1,
    groupByFields: ["Region"],
    orderByFields: ["Sales DESC"],
  },
});
```

```javascript
// Get the count and extent of the three highest magnitude earthquakes in each region.

const query = await $arcgis.import("@arcgis/core/rest/query");

const { count, extent } = await query.executeForTopExtents(url, { // autocast to TopFeaturesQuery
  where: "mag >= 6",
  topFilter: { // autocast to TopFilter
    topCount: 3,
    groupByFields: ["region"],
    orderByFields: ["mag DESC"]
  }
});
```

```javascript
// Get the objectIds top three earthquakes
// grouped by regions and ordered by their magnitude levels
// top query will only run against earthquakes that have mag >=6.

const query = await $arcgis.import("@arcgis/core/rest/query");

const ids = await query.executeForTopIds(url, { // autocast to TopFeaturesQuery
  where: "mag >= 6",
  topFilter: { // autocast to TopFilter
    topCount: 3,
    groupByFields: ["region"],
    orderByFields: ["mag DESC"]
  }
});
```

