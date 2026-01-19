# FeatureTable

**Module:** `@arcgis/core/widgets/FeatureTable`

## Import

```javascript
import FeatureTable from "@arcgis/core/widgets/FeatureTable.js";
```

```javascript
// CDN
const FeatureTable = await $arcgis.import("@arcgis/core/widgets/FeatureTable.js");
```

**Since:** 4.15

## See Also

- FeatureTableViewModel
- DefaultUI
- FeatureLayer
- Sample - FeatureTable
- Sample - FeatureTable using a map
- Sample - FeatureTable with editing enabled
- Sample - FeatureTable with popup interaction
- Sample - FeatureTable with related records
- Sample - FeatureTable with custom content
- Sample - FeatureTable with row highlight
- Highlight features by geometry sample
- actionColumnConfig
- actionColumn
- ActionColumn
- Calcite Icon Search
- Sample - FeatureTable with row highlighting
- Sample - FeatureTable using a map
- FeatureLayer.capabilities.data.supportsAttachment
- Sample - FeatureTable Component
- Editing within the FeatureTable
- Sample - FeatureTable with editing enabled
- Sample - FeatureTable with related data
- Sample - FeatureTable with related data
- Sample - FeatureTable using a map
- Sample - FeatureTable with related data
- TableTemplate
- FieldColumnTemplate
- Sample - FeatureTable with related data
- Sample - FeatureTable with popup interaction
- highlightEnabled
- Sample - FeatureTable using a map
- Sample - FeatureTable with popup interaction
- Sample - FeatureTable with related data
- Sample - FeatureTable with row highlighting
- Calcite Icon Search
- Sample - FeatureTable with related data
- [Sample - FeatureTable with custom content](../sample-code/widgets-featuretable-custom-content/
- pageSize
- Sample - FeatureTable with row highlighting
- FieldColumnTemplate.initialSortPriority
- FieldColumnTemplate.direction
- FeatureTable.sortColumn()
- Sample - FeatureTable with editing enabled
- Sample - FeatureTable
- ArcGIS REST API - FeatureLayer - maxRecordCount
- FeatureLayer.capabilities.data.supportsRelationships
- FeatureLayer.relationships
- RelationshipColumn
- FeatureTable.attributeTableTemplate
- FeatureLayer.timeExtent
- FeatureTable.visibleElements.menuItems.selectedRecordsShowAllToggle
- FeatureTable.visibleElements.menuItems.selectedRecordsShowSelectedToggle
- FeatureTable.visibleElements.menuItems.selectionColumn
- Sample - FeatureTable using a map
- pageIndex
- FeatureTable.multiSortEnabled()
- FieldColumnTemplate.initialSortPriority
- FeatureTable.visibleElements.menuItems.zoomToSelection

## Property Details

### `FeatureTable`

### `actionColumn`

### `actionColumnConfig`

### `activeFilters`

### `activeSortOrders`

### `allColumns`

### `allRelatedTablesVisible`

### `allVisibleColumns`

### `attachmentsColumns`

### `attachmentsEnabled`

### `attachmentsViewOptions`

### `attributeTableTemplate`

### `autoRefreshEnabled`

### `columnPerformanceModeEnabled`

### `columnReorderingEnabled`

### `columns`

### `container`

### `declaredClass`
- **Type:** `Inherited`

### `definitionExpression`

### `description`

### `destroyed`
- **Type:** `Inherited`

### `disabled`

### `editingEnabled`

### `effectiveSize`

### `fieldColumns`

### `filterBySelectionEnabled`

### `filterGeometry`

### `groupColumns`

### `hiddenFields`

### `highlightEnabled`

### `highlightIds`

### `icon`

### `id`
- **Type:** `Inherited`

### `initialSize`

### `isQueryingOrSyncing`

### `isSyncingAttachments`

### `label`

### `layer`

### `layerView`

### `layers`

### `maxSize`

### `menuConfig`

### `multiSortEnabled`

### `multipleSelectionEnabled`

### `multipleSortPriority`

### `navigationScale`

### `noDataMessage`

### `objectIds`

### `outFields`

### `pageCount`

### `pageIndex`

### `pageSize`

### `paginationEnabled`

### `relatedRecordsEnabled`

### `relatedTable`

### `relatedTables`

### `relationshipColumns`

### `returnGeometryEnabled`

### `returnMEnabled`

### `returnZEnabled`

### `rowHighlightIds`

### `size`

### `state`

### `supportsAddAttachments`

### `supportsAttachments`

### `supportsDeleteAttachments`

### `supportsResizeAttachments`

### `supportsUpdateAttachments`

### `syncTemplateOnChangesEnabled`

### `tableController`

### `tableParent`

### `tableTemplate`

### `timeExtent`

### `timeZone`

### `title`

### `view`

### `viewModel`

### `visible`
- **Type:** `Inherited`

### `visibleColumns`

### `visibleElements`

### `addHandles`
- **Type:** `Inherited`

### `classes`
- **Type:** `Inherited`

### `clearSelectionFilter`

### `deleteSelection`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `exportSelectionToCSV`

### `filterBySelection`

### `findColumn`

### `goToPage`

### `hasEventListener`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `hideColumn`

### `isFulfilled`
- **Type:** `Inherited`

### `isRejected`
- **Type:** `Inherited`

### `isResolved`
- **Type:** `Inherited`

### `nextPage`

### `on`
- **Type:** `Inherited`

### `postInitialize`
- **Type:** `Inherited`

### `previousPage`

### `refresh`

### `refreshCellContent`

### `removeHandles`
- **Type:** `Inherited`

### `render`
- **Type:** `Inherited`

### `renderNow`
- **Type:** `Inherited`

### `scheduleRender`
- **Type:** `Inherited`

### `scrollLeft`

### `scrollToBottom`

### `scrollToIndex`

### `scrollToRow`

### `scrollToTop`

### `showAllColumns`

### `showColumn`

### `sortColumn`

### `toggleColumnVisibility`

### `when`
- **Type:** `Inherited`

### `zoomToSelection`

### `TableMenuConfig`

### `TableMenuItemConfig`

### `TableMenuItemConfigClickFunction`

### `TableMenuItemConfigHiddenFunction`

### `VisibleElements`


## Method Details

### `Method Details()`


## Examples

```javascript
const featureTable = new FeatureTable({
 view: view,
layer: featureLayer,
container: "tableDiv"
});
```

```javascript
// This snippet highlights rows within the table that have been edited.
featureTable.layer.on("edits", (event) => {
  event.updatedFeatures.forEach((feature) => {
    featureTable.rowHighlightIds.push(feature.getObjectId());
  });
});
```

```javascript
const featureTable = new FeatureTable({
  view: view,
  layer: featureLayer,
  relatedRecordsEnabled: true,
  container: "tableDiv"
});
```

```javascript
const featureTable = new FeatureTable({
 view: view,
 layer: featureLayer,
 tableTemplate: ({  // autocastable to table template
   columnTemplates: [{
     type: "field", // autocastable to field column template
     fieldName: "field1",
     label: "Field 1"
   },
   {
     type: "field",
     fieldName: "field2",
     label: "Field 2"
   }]
 }),
 container: "tableDiv"
});
```

```javascript
const columnConfig = new ColumnTemplate({
  fieldName: "rating_stars",
  icon: "inspection",
  label: "Average Rating",
  formatFunction: ({ feature, index }) => {
    // Reuse existing components for optimal performance
    let component = ratingComponentMap.get(index);
    if (component) {
      return component;
    }
    component = document.createElement("calcite-rating");
    component.readOnly = true;
    component.value = Math.round(Math.random() * 5);
    ratingComponentMap.set(index, component);
    return component;
  }
});
```

```javascript
featureTable.menuConfig = {
  items: [
    {
      label: "Clear selection",
      icon: "erase",
      clickFunction: () => {
        featureTable.highlightIds.removeAll();
      }
    },
  {
    label: "Delete selection",
    icon: "group-x",
    clickFunction: () => {
      featureTable.viewModel.deleteSelectedRecords();
    }
  }]
};
```

