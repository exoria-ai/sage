# MediaContent

**Module:** `@arcgis/core/popup/content/MediaContent`

## Import

```javascript
import MediaContent from "@arcgis/core/popup/content/MediaContent.js";
```

```javascript
// CDN
const MediaContent = await $arcgis.import("@arcgis/core/popup/content/MediaContent.js");
```

**Since:** 4.11

## See Also

- PopupTemplate
- BarChartMediaInfo
- ColumnChartMediaInfo
- LineChartMediaInfo
- PieChartMediaInfo
- ImageMediaInfo
- Sample - Intro to PopupTemplate
- Sample - Multiple popup elements
- Sample - Pie charts

## Property Details

### `MediaContent`

### `activeMediaInfoIndex`

### `declaredClass`
- **Type:** `Inherited`

### `description`

### `mediaInfos`

### `title`

### `type`

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
layer.popupTemplate.content = [{
  // The following creates a piechart in addition to an image. The chart is
  // also set  up to work with related tables.
  // Autocasts as new MediaContent()
  type: "media",
  activeMediaInfoIndex: 1,
  // Autocasts as array of MediaInfo objects
  mediaInfos: [{
    title: "<b>Count by type</b>",
    type: "pie-chart", // autocasts as new PieChartMediaInfo
    // Autocasts as new ChartMediaInfoValue object
    value: {
      fields: ["relationships/0/Point_Count_COMMON"],
      normalizeField: null,
      tooltipField: "relationships/0/COMMON"
    }
  }, {
    title: "<b>Mexican Fan Palm</b>",
    type: "image", // Autocasts as new ImageMediaInfo object
    caption: "tree species",
    // Autocasts as new ImageMediaInfoValue object
    value: {
      sourceURL: "https://www.sunset.com/wp-content/uploads/96006df453533f4c982212b8cc7882f5-800x0-c-default.jpg"
    }
  }]
}];
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

