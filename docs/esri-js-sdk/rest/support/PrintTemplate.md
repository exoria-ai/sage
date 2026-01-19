# PrintTemplate

**Module:** `@arcgis/core/rest/support/PrintTemplate`

## Import

```javascript
import PrintTemplate from "@arcgis/core/rest/support/PrintTemplate.js";
```

```javascript
// CDN
const PrintTemplate = await $arcgis.import("@arcgis/core/rest/support/PrintTemplate.js");
```

**Since:** 4.20

## See Also

- Make a chart
- Configure charts
- Map.tables
- FeatureLayer.isTable
- Share custom layouts for printing from ArcGIS Pro
- Federate an ArcGIS Server site with your portal
- reportItem
- reportOptions
- Reports in ArcGIS Pro
- Blog: Print reports from ArcGIS Enterprise web apps
- report
- reportOptions
- Reports in ArcGIS Pro
- Blog: Print reports from ArcGIS Enterprise web apps
- report
- reportItem
- Reports in ArcGIS Pro
- Blog: Print reports from ArcGIS Enterprise web apps

## Property Details

### `PrintTemplate`

### `attributionVisible`

### `declaredClass`
- **Type:** `Inherited`

### `exportOptions`

### `forceFeatureAttributes`

### `format`

### `includeCharts`

### `includeTables`

### `layout`

### `layoutItem`

### `layoutOptions`

### `outScale`

### `report`

### `reportItem`

### `reportOptions`

### `scalePreserved`

### `showLabels`

### `addHandles`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
const template = new PrintTemplate({
  layout: "A4 Portrait with Chart",
  format: "png32",
  includeCharts: true,
  layoutOptions: {
    elementOverrides: {
       "line_chart_frame_1": {
          "sourceLayerId": "188dad6022b4-layer-2",
          "sourceChartId": "Chart 168786106706"
       },
       "bar_chart_frame_2": {
          "sourceLayerId": "188dad6022b4-layer-2",
          "sourceChartId": "Chart 168786109405"
       }
    }
  }
});
```

```javascript
let item = new PortalItem({
  id: "affa021c51944b5694132b2d61fe1057"
});

// specify your own print service
const printURL = "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";

const template = new PrintTemplate({
  layoutItem: item
});
const params = new PrintParameters({
  view,
  template
});

print.execute(printURL, params).then(printResult, printError);
```

```javascript
layoutOptions: {
  titleText: "My Print",
  authorText: "Sam",
  copyrightText: "My Company",
  scalebarUnit: "Miles",
  // the following text elements must
  // exist in the print service to appear
  customTextElements: [
    {"description": "My description"},
    {"location": "My Location"},
    {"date": "11/11/2020, 11:11:20 AM"}
  ],
  elementOverrides: {
    "North Arrow": {
      "visible": true
    }
  }
}
```

```javascript
const template = new PrintTemplate({
  layout: "A4 Landscape",
  report: "Theme Parks A4 Landscape",
  format: "pdf",
  reportOptions: {}
});
```

```javascript
const template = new PrintTemplate({
  layout: "map-only",
  format: "pdf",
  reportItem: {id: "9a7aefd5bcd24bf7891264e0c5ecgbb8"},
  reportOptions: {}
});
```

```javascript
const template = new PrintTemplate({
  layout: "A4 Landscape",
  report: "Theme Parks A4 Landscape",
  format: "pdf",
  reportOptions: {
    "reportSectionOverrides": {
      "Related Report": {
        "fieldElements": {
          "Related Field 1":"AttractionName",
          "Related Field 2":"Description"
        },
        "fieldLabelElements": {
          "Related Field Label 1":"Name",
          "Related Field Label 2":"Description"
         },
         "groupSections": {
           "[related-report-name]: Group Header: [group-field-value]":"AttractionType"
         },
         "relatedId":"R0L1Parks_ReportL0_ReportBase",
         "sourceId":"18a86753b0-layer-2"
      },
      "Report Section":{
        "fieldElements":{
          "Field 1":"Website",
          "Field 2":"City",
          "Field 3":"State",
          "Field 4":"OpeningTime",
          "Field 5":"ChildPrice",
          "Field 6":"AdultPrice"
        },
        "groupSections":{
          "Group field: [group-field-value]":"Name"
        },
        "name":"USA Theme Parks",
        "sourceId":"12a387780ai-layer-1",
        "statisticElements":{
          "Count Statistic 1":"Name"
        }
      }
    }
  }
});
```

