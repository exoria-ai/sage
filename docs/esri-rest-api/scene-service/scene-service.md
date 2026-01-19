# Scene Service

> Source: [/rest/services-reference/enterprise/scene-service/](https://developers.arcgis.com/rest/services-reference/enterprise/scene-service/)

**URL:**: https://<root>/<serviceName>/SceneServer

**Methods:**: GET

**Child Resources:**: Symbol, Layer

**Version Introduced:**: 10.3.1

## Description

A scene service is an ArcGIS Server web service that originates from a 3D scene in ArcGIS Pro. Scene services (also known as web scene layers) allow you to share 3D content via web scenes to your ArcGIS Enterprise organization. Web scenes are similar in concept to web maps. However, instead of displaying a 2D map or feature services, they use 3D scene services and give you access to 3D content originally created in ArcGIS Pro. See [Publish hosted scene layers for more information](https://enterprise.arcgis.com/en/portal/latest/use/publish-scenes.htm).

To share a scene service, you need to install and configure ArcGIS Pro and a [base ArcGIS Enterprise deployment](https://enterprise.arcgis.com/en/get-started/latest/windows/base-arcgis-enterprise-deployment.htm). Starting at ArcGIS Enterprise 11.4, a base deployment of ArcGIS Enterprise includes an object store. The object store can either be an ArcGIS Data Store object store or, if ArcGIS Enterprise is being deployed using the Amazon Web Services (AWS) or Microsoft Azure cloud, the organization can [register a cloud-provided object store](/rest/enterprise-administration/server/registerdataitem/) using either Amazon Simple Storage Service (S3) or Azure Blob Storage.

Prior to ArcGIS Enterprise 11.4, an ArcGIS Data Store tile cache data store was required to store the caches for hosted scene layers. However, at 11.4 tile cache data stores have been retired with a full deprecation coming at version 12.X. Caches for hosted scene layers are instead stored in the object store. Prior to the tile cache data store's full deprecation, its recommended that the **MigrationSceneServices** tool be used to move any scene services from a tile cache data store to the object store. For more information, see the [migration tool documentation](https://enterprise.arcgis.com/en/server/latest/publish-services/windows/migrate-scene-services-utility.htm).

## Request parameters

| Parameter | Details |
|---|---|
| f | The response format. The default response format is html.Values: html \| json \| pjson |

## Example usage



```
https://organization.example.com/<context>/rest/services/Hosted/downtown/SceneServer?f=pjson
```

## JSON Response example



```
{
  "serviceName": "Downtown",
  "serviceVersion": "1.4",
  "supportedBindings": [
    "REST"
  ],
  "layers": [
    {
      "id": 0,
      "version": "DE2A8CA5-04C8-4D1D-8D15-1BEF07B4C458",
      "name": "downtown",
      "href": "./layers/0",
      "ZFactor": 1,
      "alias": "downtown",
      "description": "",
      "copyrightText": "",
      "capabilities": [
        "View",
        "Query"
      ],
      "store": {
        "id": "B4A96D41-212B-4C89-9337-8A97D09A3E67",
        "profile": "meshpyramids",
        "rootNode": "./nodes/root",
        "version": "1.4",
        "extent": [
          -122.39322065783433,
          37.78655216996529,
          -122.38515083926168,
          37.791307296087865
        ],
        "indexCRS": "https://www.opengis.net/def/crs/EPSG/0/4326",
        "vertexCRS": "https://www.opengis.net/def/crs/EPSG/0/4326",
        "nidEncoding": "application/vnd.esri.i3s.json+gzip; version=1.4",
        "featureEncoding": "application/vnd.esri.i3s.json+gzip; version=1.4",
        "geometryEncoding": "application/octet-stream; version=1.4",
        "textureEncoding": "image/jpeg",
        "lodType": "MeshPyramid",
        "reductionType": "none",
        "indexingScheme": {
          "name": "esriRTree",
          "inclusive": true,
          "dimensionality": 3,
          "childrenCardinality": [
            0,
            9
          ],
          "neighborCardinality": [
            0,
            9
          ]
        },
        "defaultGeometrySchema": {
          "header": [
            {
              "property": "vertexCount",
              "type": "UInt32"
            },
            {
              "property": "featureCount",
              "type": "UInt32"
            }
          ],
          "topology": "Indexed",
          "ordering": [
            "position",
            "normal",
            "uv0",
            "color"
          ],
          "vertexAttributes": {
            "position": {
              "valueType": "Float32",
              "valuesPerElement": 3
            },
            "normal": {
              "valueType": "Float32",
              "valuesPerElement": 3
            },
            "uv0": {
              "valueType": "Float32",
              "valuesPerElement": 2
            },
            "color": {
              "valueType": "UInt8",
              "valuesPerElement": 4
            }
          },
          "faces": {
            "position": {
              "valueType": "UInt32",
              "valuesPerElement": 1
            },
            "normal": {
              "valueType": "UInt32",
              "valuesPerElement": 1
            },
            "uv0": {
              "valueType": "UInt32",
              "valuesPerElement": 1
            },
            "color": {
              "valueType": "UInt32",
              "valuesPerElement": 1
            }
          },
          "featureAttributeOrder": [
            "id",
            "faceRange"
          ],
          "featureAttributes": {
            "id": {
              "valueType": "UInt64"
            },
            "faceRange": {
              "valuesPerElement": 2
            }
          }
        },
        "fields": [
          {
            "name": "OBJECTID",
            "type": "esriFieldTypeOID",
            "alias": "OBJECTID"
          },
          {
            "name": "SHAPE",
            "type": "esriFieldTypeGeometry",
            "alias": "SHAPE"
          },
          {
            "name": "NAME",
            "type": "esriFieldTypeString",
            "alias": "NAME"
          }
        ]
      }
    }
  ]
}
```