# TimeZoneLabel

**Module:** `@arcgis/core/widgets/TimeZoneLabel`

## Import

```javascript
import TimeZoneLabel from "@arcgis/core/widgets/TimeZoneLabel.js";
```

```javascript
// CDN
const TimeZoneLabel = await $arcgis.import("@arcgis/core/widgets/TimeZoneLabel.js");
```

**Since:** 4.28

## See Also

- Calcite Icon Search

## Property Details

### `TimeZoneLabel`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `expandDirection`

### `expanded`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`
- **Type:** `Inherited`

### `view`

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

### `on`
- **Type:** `Inherited`

### `postInitialize`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `scheduleRender`
- **Type:** `Inherited`

### `when`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
view.ui.add(new TimeZoneLabel({ view: view }), "top-right");
```

```javascript
view.ui.add(new TimeZoneLabel({ expanded: true, view: view }), "bottom-right");
```

```javascript
// Create the HTML div element programmatically at runtime and set to the widget's container
const basemapGallery = new BasemapGallery({
  view: view,
  container: document.createElement("div")
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

```javascript
// Specify an already-defined HTML div element in the widget's container

const basemapGallery = new BasemapGallery({
  view: view,
  container: basemapGalleryDiv
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});

// HTML markup
<body>
  <div id="viewDiv"></div>
  <div id="basemapGalleryDiv"></div>
</body>
```

```javascript
// Specify the widget while adding to the view's UI
const basemapGallery = new BasemapGallery({
  view: view
});

// Add the widget to the top-right corner of the view
view.ui.add(basemapGallery, {
  position: "top-right"
});
```

```javascript
// Create the TimeZoneLabel widget.
const timeZoneLabel = new TimeZoneLabel({ view: view });

// Add the widget to the upper right hand corner of the view.
view.ui.add(timeZoneLabel, "top-right");

// Disable the widget when a user clicks a button.
document.getElementById("myButton").addEventListener("click", () => {
  timeZoneLabel.disable = true;
});
```

