# Feature Service

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/feature-service/

## Service Info

- **Parameter:** Details
- **option:** NoteSupport for footprints has been removed at ArcGIS Enterprise 11.1, and the footprints  value for this parameter has been deprecated.If option  is footprints , the footprint of the feature service is returned as a feature collection. This feature collection can be viewed in Map Viewer Classic. This is only supported when f  is json .Value: footprints
- **outSR:** NoteSupport for footprints has been removed at ArcGIS Enterprise 11.1.The spatial reference of the geometry returned in footprints. This parameter is supported only when option=footprints  is specified. The spatial reference should be specified as a well-known ID. If outSR  is not specified, the geometry is returned in GCS_WGS_1984 .
- **useGlobalIds:** Used to specify whether upsert  needs to use GlobalId  when matching features. The default value is false and ObjectId  is used by default.
- **f:** The response format. The default response format is html .Values: html  | json  | pjson

## Description

A feature service can contain datasets (for example, tables and views) with or without a spatial column. Datasets with a spatial column are considered layers; those without a spatial column are considered tables. A feature service allows clients to query and edit feature geometry and attributes.

This resource provides basic information about the feature service, including the feature layers and tables that it contains, the service description, and so on.

The capabilities property returns Create, Delete, Extract, Query, Update, Sync, Uploads, and SharedTemplateEditing (added at ArcGIS Enterprise 11.4) capabilities. The Uploads capability is included if Create, Delete, or Update is enabled for a feature service. The Editing capability is included if Create, Delete, and Update is enabled and allowGeometryUpdates is true. The Sync capability allows editors to make local edits and periodically sync with the feature service. The Extract capability allows editors to create a local copy of data without the ability to sync with the feature service. The SharedTemplateEditing capability allows users to add shared templates as well as update and delete the shared template they have created.

The maxRecordCount property returns the maximum number of records that will be returned at once for a query. The Feature Service resource has an input parameters option and outSR to support viewing of a feature service footprint.

The following properties describe features that have been added to Feature Service through the releases. If the property does not exist, it's equivalent to having a value of false or is not set:

## Request Parameters

## Response

## Examples

```json
1
https://organization.example.com/<context>/rest/services/USA/FeatureServer?f=pjson
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
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
```

