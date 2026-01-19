# StreamLayer

**Module:** `@arcgis/core/layers/StreamLayer`

## Import

```javascript
import StreamLayer from "@arcgis/core/layers/StreamLayer.js";
```

```javascript
// CDN
const StreamLayer = await $arcgis.import("@arcgis/core/layers/StreamLayer.js");
```

**Since:** 4.0

## See Also

- Sample - Add StreamLayer to your Map
- StreamLayerView
- Layer blending samples
- DisplayFilterInfo
- DisplayFilter
- View.displayFilterEnabled
- displayFilterInfo
- Sample - Scale-dependent DisplayFilter
- featureEffect
- More information on how to set effect
- Layer and layer view effect samples
- Sample - Apply effects to features
- Sample - Apply drop-shadow effect to a layerView
- effect
- Sample - Point clustering
- Sample - Point clustering with visual variables
- Sample - Filter clustered points
- Sample - Point styles for cities
- Sample: Flat vs. volumetric 3D symbol layers
- Sample: Add multiple label classes to a layer
- Sample: Multi-line labels
- fields
- createPopupTemplate
- SceneView
- View2D
- createPopupTemplate
- SceneView
- View2D
- Styles and data visualization
- Sample: Point styles for cities
- Sample - GraphicsLayer with visibilityTimeExtent
- StreamLayer from a custom stream service
- Creating a custom stream service
- createConnectionParameters
- connect
- Sample - Custom WebGL layer view
- Map.destroy()
- WebMap.destroy()
- WebScene.destroy()
- Basemap.destroy()
- Ground.destroy()
- PortalItem.destroy()
- fields
- Add an array of client-side features
- Reference a custom stream service
- createConnectionParameters
- connect
- View.whenLayerView()
- View.whenLayerView()

## Property Details

### `StreamLayer`

### `blendMode`

### `copyright`

### `customParameters`

### `declaredClass`
- **Type:** `Inherited`

### `definitionExpression`

### `displayField`

### `displayFilterEnabled`

### `displayFilterInfo`

### `effect`

### `elevationInfo`

### `featureEffect`

### `featureReduction`

### `fields`

### `fieldsIndex`

### `geometryDefinition`

### `geometryType`

### `id`
- **Type:** `Inherited`

### `labelingInfo`

### `labelsVisible`

### `legendEnabled`

### `listMode`
- **Type:** `Inherited`

### `loadError`
- **Type:** `Inherited`

### `loadStatus`
- **Type:** `Inherited`

### `loadWarnings`
- **Type:** `Inherited`

### `loaded`
- **Type:** `Inherited`

### `maxReconnectionAttempts`

### `maxReconnectionInterval`

### `maxScale`

### `minScale`

### `objectIdField`

### `opacity`
- **Type:** `Inherited`

### `parent`
- **Type:** `Inherited`

### `persistenceEnabled`

### `popupEnabled`

### `popupTemplate`

### `purgeOptions`

### `renderer`

### `screenSizePerspectiveEnabled`

### `sourceJSON`

### `spatialReference`

### `timeExtent`

### `timeInfo`

### `timeOffset`

### `title`
- **Type:** `Inherited`

### `trackInfo`

### `type`

### `uid`
- **Type:** `Inherited`

### `updateInterval`

### `url`

### `useViewTime`

### `visibilityTimeExtent`
- **Type:** `Inherited`

### `visible`
- **Type:** `Inherited`

### `webSocketUrl`

### `addHandles`
- **Type:** `Inherited`

### `cancelLoad`
- **Type:** `Inherited`

### `clone`

### `connect`

### `createConnectionParameters`

### `createLayerView`
- **Type:** `Inherited`

### `createPopupTemplate`

### `destroy`
- **Type:** `Inherited`

### `emit`
- **Type:** `Inherited`

### `getField`

### `getFieldDomain`

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

### `load`
- **Type:** `Inherited`

### `on`
- **Type:** `Inherited`

### `removeHandles`
- **Type:** `Inherited`

### `save`

### `saveAs`

### `sendMessageToClient`

### `sendMessageToSocket`

### `when`
- **Type:** `Inherited`

### `ConnectionParameters`


## Method Details

### `Method Details()`


## Examples

```javascript
// Construct Stream Layer
streamLayer = new StreamLayer({
  url: "https://geoeventsample1.esri.com:6443/arcgis/rest/services/LABus/StreamServer",
  purgeOptions: {
    displayCount: 10000
  },
  maxReconnectionAttempts: 100,
  maxReconnectionInterval: 10,
  renderer: renderer
}
map.add(streamLayer);
```

```javascript
const layer = new StreamLayer({
  popupTemplate: {
    content: "OBJECTID={OBJECTID}, TRACKID={TRACKID}",
  },
  webSocketUrl: "ws://localhost:8000",
  fields: [
    {
      name: "OBJECTID",
      alias: "ObjectId",
      type: "oid",
    },
    {
      name: "TRACKID",
      alias: "TrackId",
      type: "long",
    }
  ],
  timeInfo: {
    trackIdField: "TRACKID"
  },
  geometryType: "point"
  maxReconnectionAttempts: 100,
  maxReconnectionInterval: 10,
  renderer: renderer
});
map.add(layer);
```

```javascript
// create a client-side streamlayer by setting its required properties
// and additional desired properties. Do not set url or websocketUrl.
const layer = new StreamLayer({
  objectIdField: "OBJECTID",
  fields: [
    {
      name: "OBJECTID", // required
      alias: "ObjectId",
      type: "oid",
    },
    {
      name: "TRACKID",
      alias: "TrackId",
      type: "long",
    },
    {
      name: "STATUS",
      alias: "STATUS",
      type: "string",
    }
  ],
  timeInfo: {
    trackIdField: "TRACKID" // required
  },
  geometryType: "point", // required
  updateInterval: 100,
  popupTemplate: {
    title: "{status}",
    content: "{TRACKID}, {this}"
  },
  renderer: {
    type: "simple",
    symbol: {
      type: "simple-marker",
      size: "10px",
      color: [255, 0, 0, .4],
    }
  }
});
```

```javascript
// call the sendMessageToClient method every 100 milliseconds with
// "features" message to keep moving positions of features.
setInterval(() => {
  lastY += 500;

  // send "features" message to the client to update
  // positions of features on the map.
  layer.sendMessageToClient({
    type: "features",
    features: [
      {
        attributes: {
          TRACKID: 1,
          OBJECTID: objectIdCounter++,
          STATUS: "red"
        },
        geometry: {
          x: lastX,
          y: lastY,
        }
      },
      {
        attributes: {
          TRACKID: 2,
          OBJECTID: objectIdCounter++,
          STATUS: "green"
        },
        geometry: {
          x: lastX + 100000,
          y: lastY + 100000,
        }
      },
       {
        attributes: {
          TRACKID: 3,
          OBJECTID: objectIdCounter++,
          STATUS: "blue"
        },
        geometry: {
          x: lastX - 100000,
          y: lastY - 100000,
        }
      }
    ]
  })
}, 100);
```

```javascript
let streamLayer = new StreamLayer({
  url: "https://geoeventsample3.esri.com:6080/arcgis/rest/services/SeattleBus/StreamServer",
  purgeOptions: {
    displayCount: 1000
  }
});
```

```javascript
// send a custom parameter to your special service
let layer = new MapImageLayer({
  url: serviceUrl,
  customParameters: {
    "key": "my-special-key"
  }
});
```

