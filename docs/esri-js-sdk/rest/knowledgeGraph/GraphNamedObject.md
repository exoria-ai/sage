# GraphNamedObject

**Module:** `@arcgis/core/rest/knowledgeGraph/GraphNamedObject`

## Import

```javascript
import GraphNamedObject from "@arcgis/core/rest/knowledgeGraph/GraphNamedObject.js";
```

```javascript
// CDN
const GraphNamedObject = await $arcgis.import("@arcgis/core/rest/knowledgeGraph/GraphNamedObject.js");
```

**Since:** 4.25

## See Also

- GraphObject
- Entity
- Relationship

## Property Details

### `GraphNamedObject`

### `declaredClass`
- **Type:** `Inherited`

### `id`

### `properties`
- **Type:** `Inherited`

### `typeName`

### `addHandles`
- **Type:** `Inherited`

### `fromJSON`
- **Type:** `Inherited`

### `hasHandles`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `toJSON`
- **Type:** `Inherited`


## Method Details

### `Method Details()`


## Examples

```javascript
//example of properties structure that includes geometry
"properties": {
  "shape": {
    "declaredClass": "esri.geometry.Point",
    "cache": {},
    "hasM": false,
    "hasZ": false,
    "latitude": 53.589000000000009,
    "longitude": -0.9633,
    "type": "point",
    "extent": null,
    "spatialReference": {
      "wkid": 4326
    },
    "x": -0.9633,
    "y": 53.589000000000009
  },
  "Name": "Suncommon",
  "Employee_Count": 400,
  "Address": "123 Broadway, New York, New York",
  "EnergyType": "solar"
}
```

```javascript
//two entities of different entity types with different properties
[{
  "declaredClass": "esri.rest.knowledgeGraph.Entity",
  "properties": {
    "Name": "Suncommon",
    "Employee_Count": 400,
    "energyType": "solar"
  },
  "typeName": "Company",
  "id": "1256"
},
{
  "declaredClass": "esri.rest.knowledgeGraph.Entity",
  "properties": {
    "Name": "Empire State Building",
    "height": 1454,
    "heightUnits": "feet",
    "city": "New York"
  },
  "typeName": "Building",
  "id": "B7889541"
}]
```

```javascript
//two relationships of different relationship types with different properties
[{
  "declaredClass": "esri.rest.Relationship.Relationship",
  "properties": {
    "start_date": "2020-04-17",
    "employee_id": "4589",
    "office": "152 Building A"
  },
  "typeName": "Employed_by",
  "id": "B7889541"
},
{
  "declaredClass": "esri.rest.Relationship.Relationship",
  "properties": {
    "quantity": 125000,
    "frequency": "bi-weekly",
    "contact_person": "Betty White"
  },
  "typeName": "buys_part",
  "id": "B7889541"
}]
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

