# Add Features

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/add-features/

## Service Info

- **Parameter:** Details
- **features:** The array of features to be added. The structure of each feature in the array is the same as the structure of the  json feature object returned by the ArcGIS REST API. Features to be added to a feature layer should include the geometry. Records to be added to a table should not include the geometry.SyntaxUse dark colors for code blocksCopy1
features=[<feature1>, <feature2>]ExampleUse dark colors for code blocksCopy1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
features=[
  {
    "geometry": {
      "x": -118.15,
      "y": 33.80
    },
    "attributes": {
      "OWNER": "Joe Smith",
      "VALUE": 94820.37,
      "APPROVED": true,
      "LASTUPDATE": 1227663551096
    }
  },
  {
    "geometry": {
      "x": -118.37,
      "y": 34.086
    },
    "attributes": {
      "OWNER": "John Doe",
      "VALUE": 17325.90,
      "APPROVED": false,
      "LASTUPDATE": 1227628579430
    }
  }
]
- **gdbVersion:** The geodatabase version to apply the edits. This parameter applies only if the isDataVersioned  property of the layer is true .
If the gdbVersion  parameter is not specified, edits are made to the published map’s version.
Syntax: gdbVersion=<version>
Example: gdbVersion=SDE.DEFAULT
- **returnEditMoment(Optional):** This option was added at 10.5 and works with ArcGIS Enterprise services only.Optional parameter specifying whether the response will report the time features were added. If returnEditMoment = true , the server will report the time in the response's editMoment  key. The default value is false .Values: true  | false
- **rollbackOnFailure:** Specifies whether the edits should be applied only if all submitted edits succeed. If false , the server will apply the edits that succeed even if some of the submitted edits fail. If true , the server will apply the edits only if all edits succeed. The default value is true .
Not all data supports setting this parameter. Query the supportsRollbackonFailureParameter  property of the layer to determine whether a layer supports setting this parameter. If supportsRollbackOnFailureParameter = false  for a layer, then when editing this layer, rollbackOnFailure  will always be true , regardless of how the parameter is set. However, if supportsRollbackonFailureParameter = true , the rollbackOnFailure  parameter value will be honored on edit operations.
Values: true|false
Example: rollbackOnFailure=true
- **timeReferenceUnknownClient:** Setting timeReferenceUnknownClient  as true  indicates that the client is capable of working with data values that are not in UTC. If its not set to true , and the service layer's datesInUnknownTimeZone  property is true , then an error is returned. The default is false.Its possible to define a service's time zone of date fields as unknown. Setting the time zone as unknown means that date values will be returned as-is from the database, rather than as date values in UTC. Non-hosted feature services can be set to use an unknown time zone using ArcGIS Server Manager. Setting the time zones to unknown also sets the datesInUnknownTimeZone  layer property as true. Currently, hosted feature services do not support this setting. Unknown time zones do not apply to editor tracking date fields. Editor tracking date fields, when set to unknown, must be in UTC.Most clients released prior to ArcGIS Enterprise 10.9 will not be able to work with feature services that have an unknown time setting. Newer clients, such as ArcGIS Pro 2.7, can work with specific operations, such as the query  and applyEdits  feature service & feature layer operations, if they contain the timeReferenceUnknownClient  parameter.Value: true  | false
- **f:** The response format. The default response format is html .
Values: html | json

## Description

This operation adds features to the associated feature layer or table (POST only). The addFeatures operation is performed on a feature service layer resource.

The operation returns the results of the edits in an array of edit result objects. Each edit result identifies a single feature and indicates if the inserts were successful or not. If not, it also includes an error code and an error description.

You can provide arguments to the addFeatures operation as defined in the following parameters table:

## Request Parameters

## Response

## Examples

```json
1
features=[<feature1>, <feature2>]
```

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
features=[
  {
    "geometry": {
      "x": -118.15,
      "y": 33.80
    },
    "attributes": {
      "OWNER": "Joe Smith",
      "VALUE": 94820.37,
      "APPROVED": true,
      "LASTUPDATE": 1227663551096
    }
  },
  {
    "geometry": {
      "x": -118.37,
      "y": 34.086
    },
    "attributes": {
      "OWNER": "John Doe",
      "VALUE": 17325.90,
      "APPROVED": false,
      "LASTUPDATE": 1227628579430
    }
  }
]
```

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
```

```json
1
https://services.myserver.com/ERmEceOGq5cHrItq/ArcGIS/rest/services/SanFrancisco/311Incidents/FeatureServer/0/addFeatures
```

