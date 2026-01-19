# TopFilter

**Module:** `@arcgis/core/rest/support/TopFilter`

## Import

```javascript
import TopFilter from "@arcgis/core/rest/support/TopFilter.js";
```

```javascript
// CDN
const TopFilter = await $arcgis.import("@arcgis/core/rest/support/TopFilter.js");
```

**Since:** 4.20

## See Also

- TopFeaturesQuery
- FeatureLayer.queryTopFeatures()
- Query and filter guide
- Sample - Aggregate spatial statistics

## Property Details

### `TopFilter`

### `declaredClass`
- **Type:** `Inherited`

### `groupByFields`

### `orderByFields`

### `topCount`

### `addHandles`
- **Type:** `Inherited`

### `clone`

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
// query the top three most populous counties from each state.
// Results will be ordered based the population of each county in descending order
// top query will run against all features available in the service
const query = new TopFeaturesQuery({
  outFields: ["State, Pop_total, County"],
  topFilter: new TopFilter({
    topCount: 3,
    groupByFields: ["State"],
    orderByFields: ["Pop_total DESC"]
  })
});
featureLayer.queryTopFeatures(query)
  .then(function(response){
     // returns a feature set with features containing the most populous
     // three counties in each state ordered by the number of population.
     // The following attributes are returned as well: State, Pop_total, County
   });
```

```javascript
const query = new TopFeaturesQuery({
  outFields: ["State, Pop_total, County"],
  topFilter: new TopFilter({
    topCount: 3,
    groupByFields: ["State"],
    orderByFields: ["Pop_total DESC"]
  })
});
```

```javascript
const query = new TopFeaturesQuery({
  outFields: ["State, Pop_total, County"],
  topFilter: new TopFilter({
    topCount: 3,
    groupByFields: ["State"],
    orderByFields: ["Pop_total DESC"]
  })
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

```javascript
obj.removeHandles(); // removes handles from default group

obj.removeHandles("handle-group");
obj.removeHandles("other-handle-group");
```

