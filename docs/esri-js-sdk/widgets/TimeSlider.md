# TimeSlider

**Module:** `@arcgis/core/widgets/TimeSlider`

## Import

```javascript
import TimeSlider from "@arcgis/core/widgets/TimeSlider.js";
```

```javascript
// CDN
const TimeSlider = await $arcgis.import("@arcgis/core/widgets/TimeSlider.js");
```

**Since:** 4.12

## See Also

- TimeSliderViewModel
- Sample - TimeSlider widget
- Sample - TimeSlider component
- Sample - SceneLayer with time filter
- Sample - Filter features with TimeSlider widget
- Sample - Filter features with TimeSlider component
- Sample - TimeSlider with offset
- Sample - Visualizing wind data with VectorFieldRenderer
- Temporal data (ArcGIS Pro)
- Set time properties on data (ArcGIS Pro)
- Configure time settings on a layer (ArcGIS Online)
- Set GeoJSONLayer timeInfo
- Set CSVLayer timeInfo
- DefaultUI
- Sample - TimeSlider with offset
- Calcite Icon Search
- timeExtent
- TimeSlider.actions

## Property Details

### `TimeSlider`

### `actions`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `effectiveStops`

### `fullTimeExtent`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `labelFormatFunction`

### `layout`

### `loop`

### `mode`

### `playRate`

### `stops`

### `tickConfigs`

### `timeExtent`

### `timeVisible`

### `timeZone`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `addHandles`
- **Type:** `Inherited`

### `classes`
- **Type:** `Inherited`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `next`

### `on`
- **Type:** `Inherited`

### `play`

### `postInitialize`
- **Type:** `Inherited`

### `previous`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `scheduleRender`
- **Type:** `Inherited`

### `stop`

### `updateWebDocument`

### `when`
- **Type:** `Inherited`

### `DateLabelFormatter`

### `StopsByCount`

### `StopsByDates`

### `StopsByInterval`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a TimeSlider for the first decade of the 21st century.
// set the TimeSlider's view property.
// Only show content for the 1st year of the decade for all
// time aware layers in the view.
const timeSlider = new TimeSlider({
  container: "timeSliderDiv",
  view: view,
  // show data within a given time range
  // in this case data within one year
  mode: "time-window",
  fullTimeExtent: { // entire extent of the timeSlider
    start: new Date(2000, 0, 1),
    end: new Date(2010, 0, 1)
  },
  timeExtent: { // location of timeSlider thumbs
    start: new Date(2000, 0, 1),
    end: new Date(2001, 1, 1)
  }
});
view.ui.add(timeSlider, "manual");
```

```javascript
// Create a time slider to update layerView filter
const timeSlider = new TimeSlider({
  container: "timeSliderDiv",
  mode: "cumulative-from-start",
});
view.ui.add(timeSlider, "manual");

// wait until the layer view is loaded
let timeLayerView;
view.whenLayerView(layer).then((layerView) => {
  timeLayerView = layerView;
  const fullTimeExtent = layer.timeInfo.fullTimeExtent;
  const end = fullTimeExtent.start;

  // set up time slider properties based on layer timeInfo
  timeSlider.fullTimeExtent = fullTimeExtent;
  timeSlider.timeExtent = {
    start: null,
    end: end
  };
  timeSlider.stops = {
    interval: layer.timeInfo.interval
  };
});

reactiveUtils.watch(
  () => timeSlider.timeExtent,
  (value) => {
    // update layer view filter to reflect current timeExtent
    timeLayerView.filter = {
      timeExtent: value
    };
  }
);
```

```javascript
// this webmap is saved with TimeSlider settings
const webmap = new WebMap({
  portalItem: {
    id: "your-webmap-id"
  }
});

// set the TimeSlider widget to honor the TimeSlider settings from the webmap.
timeUtils.getTimeSliderSettingsFromWebDocument(webmap).then((timeSliderSettings) => {
  const timeSlider = new TimeSlider({
    ...timeSliderSettings,
    view
  });

  const { unit, value } = timeSlider.stops.interval;
  console.log(`The stop interval is every ${value} ${unit}.`); // output: "This stop interval is every 3 weeks."
});
```

```javascript
const timeSlider = new TimeSlider({
  ...timeSliderSettings,
  view,
  playRate: 1000
});
console.log(`The playback rate is ${timeSlider.playRate} ms.`); // output: "The playback rate is 1000 ms."
```

```javascript
await reactiveUtils.whenOnce(() => timeSlider.viewModel.state === "ready");
timeSlider.fullTimeExtent = timeSlider.fullTimeExtent.expandTo("years");
```

```javascript
// Create a TimeSlider with two actions to snap the thumb to
// two specific time extents.
const timeSlider = new TimeSlider({
  container: "timeSliderDiv",
  fullTimeExtent: {
    start: new Date(2011, 0, 1),
    end: new Date(2012, 0, 1)
  },
  mode: "instant",
  actions: [
    {
      id: "quake",
      icon: "exclamation-mark-triangle",
      title: "Jump to Earthquake"
    },
    {
      id: "quake-plus-one-month",
      icon: "organization",
      title: "One month later"
    }
  ]
});

// listen to timeSlider's trigger-action event
// check what action user clicked on and respond accordingly.
timeSlider.on("trigger-action", (event) => {
  const quake = new Date(Date.UTC(2011, 3, 11, 8, 16, 12));
  const oneMonthLater = new Date(quake.getTime()).setMonth(quake.getMonth() + 1);
  switch(event.action.id) {
    case "quake":
      timeSlider.timeExtent = {
        start: quake,
        end: quake
      };
      break;
    case "quake-plus-one-month":
      timeSlider.timeExtent = {
        start: oneMonthLater,
        end: oneMonthLater
      };
      break;
  }
});
```

