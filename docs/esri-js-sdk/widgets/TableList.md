# TableList

**Module:** `@arcgis/core/widgets/TableList`

## Import

```javascript
import TableList from "@arcgis/core/widgets/TableList.js";
```

```javascript
// CDN
const TableList = await $arcgis.import("@arcgis/core/widgets/TableList.js");
```

**Since:** 4.17

## See Also

- TableListViewModel
- Map.tables
- WebMap.tables
- Sample - TableList Widget
- visibleElements.collapseButton
- minDragEnabledItems
- visibleElements.filter
- visibleElements.filter
- Calcite Icon Search
- Map.tables
- WebMap.tables
- dragEnabled
- visibleElements.filter
- selectionMode
- selectedItems

## Property Details

### `TableList`

### `collapsed`

### `container`
- **Type:** `Inherited`

### `declaredClass`
- **Type:** `Inherited`

### `destroyed`
- **Type:** `Inherited`

### `dragEnabled`

### `filterPlaceholder`

### `filterPredicate`

### `filterText`

### `headingLevel`

### `icon`

### `id`
- **Type:** `Inherited`

### `label`

### `listItemCreatedFunction`

### `map`

### `minDragEnabledItems`

### `minFilterItems`

### `selectedItems`

### `selectionMode`

### `tableItems`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `visibleElements`

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

### `triggerAction`

### `when`
- **Type:** `Inherited`

### `FilterPredicate`

### `ListItemCreatedHandler`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
const tableList = new TableList({
  map: map, // takes any tables associated with the map and displays in widget
  listItemCreatedFunction: function(event) {
    let item = event.item;
    item.actionsSections = [
      {
        title: "Show table",
        className: "esri-icon-table",
        id: "table",
        type: "toggle"
      },
      {
       title: "Layer information",
       className: "esri-icon-description",
       id: "information"
      }
    ]
});
```

```javascript
// Typical usage
const tableList = new TableList({
  map: map
});
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

