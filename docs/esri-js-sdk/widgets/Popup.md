# Popup

**Module:** `@arcgis/core/widgets/Popup`

## Import

```javascript
import Popup from "@arcgis/core/widgets/Popup.js";
```

```javascript
// CDN
const Popup = await $arcgis.import("@arcgis/core/widgets/Popup.js");
```

**Since:** 4.0

## See Also

- PopupTemplate
- SceneView
- View2D
- Sample - Intro to popups
- Sample - to PopupTemplate
- Sample - Dock positions with popup
- Sample - Popup actions
- Sample - Custom popup actions per feature
- Sample - Popup with edit action
- Sample - Popup with DOM node
- Guide - Esri Icon Font
- PopupViewModel
- trigger-action
- Sample - Popup actions
- Sample - Custom popup actions per feature
- Sample - Popup with edit action
- Sample - Popup Docking
- Sample - Popup with DOM node
- Sample - Popup docking
- Sample - Popup docking
- MapView
- SceneView
- Heading Elements
- Calcite Icon Search
- Intro to popups
- headingLevel
- PopupViewModel.active
- Popup.visible
- selectedFeatureIndex
- Intro to popups
- Popup.visible
- Sample - Query with rest/query
- Sample - Popup with DOM node
- selectedFeatureIndex
- actions

## Property Details

### `Popup`

### `actions`

### `active`

### `alignment`

### `autoCloseEnabled`

### `collapsed`

### `container`
- **Type:** `Inherited`

### `content`

### `currentDockPosition`

### `declaredClass`
- **Type:** `Inherited`

### `defaultPopupTemplateEnabled`

### `destroyed`
- **Type:** `Inherited`

### `dockEnabled`

### `dockOptions`

### `featureCount`

### `features`

### `goToOverride`

### `headingLevel`

### `highlightEnabled`

### `icon`

### `id`
- **Type:** `Inherited`

### `initialDisplayMode`

### `label`

### `location`

### `promises`

### `selectedDrillInFeature`

### `selectedFeature`

### `selectedFeatureIndex`

### `selectedFeatureWidget`

### `title`

### `view`

### `viewModel`

### `visible`

### `visibleElements`

### `addHandles`
- **Type:** `Inherited`

### `blur`

### `classes`
- **Type:** `Inherited`

### `clear`

### `close`

### `destroy`
- **Type:** `Inherited`

### `emit`

### `fetchFeatures`

### `focus`

### `hasEventListener`

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

### `open`

### `postInitialize`
- **Type:** `Inherited`

### `previous`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `reposition`

### `scheduleRender`
- **Type:** `Inherited`

### `triggerAction`

### `when`
- **Type:** `Inherited`

### `FetchFeaturesOptions`

### `FetchPopupFeaturesResult`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
// Create a new MapView
const view = new MapView({
// set the popup property to a new instance of Popup
  popup: new Popup(...)
});
```

```javascript
const view = MapView({
  popup: {
    dockEnabled: true,
    dockOptions: {
      position: true,
      ...
    }
  }
});
```

```javascript
// The popup doesn't show for features on selection, but will on Search results and when `openPopup()` is called.
view.popupEnabled = false;
```

```javascript
// A deprecation warning is prompted if the popup isn't created
// and calls view.openPopup() or view.closePopup() respectively under the hood.
view.popup.open(...);
view.popup.close(...);

// Opens or closes the popup on the View.
view.openPopup(...);
view.closePopup(...);
```

```javascript
// This will throw an error that watch() is not a method
// since the popup hasn't been created yet.
view.popup.watch("selectedFeature", ...)

// Call reactiveUtils.watch() on popup properties with optional chaining.
reactiveUtils.watch(() => view.popup?.selectedFeature, ...);
```

```javascript
// This will throw an error that actions is not a property.
view.popup.actions.push(...);

// Wait for the popup to load before accessing properties.
reactiveUtils.when(() => view.popup?.actions, ()=>{
  view.popup.actions.push(...);
});
```

