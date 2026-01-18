# Map Service

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/map-service/

## Service Info

- **Parameter:** Details
- **returnUpdates:** If true , this resource returns the updated time extent. If the service is not time aware, the resource will return an empty response.Values: true  | false
- **option:** NoteSupport for footprints has been removed at ArcGIS Enterprise 11.1, and the footprints  value for this parameter has been deprecated.If option  is footprints , the footprint of the map service is returned as a feature collection. This feature collection can be viewed in ArcGIS Online. This option is only supported if the response format is json .Values: footprints
- **outSR:** NoteSupport for footprints has been removed at ArcGIS Enterprise 11.1.The spatial reference of the geometry returned in footprints. This parameter is supported only when option  is specified as footprints . The spatial reference should be specified as a well-known ID. If outSR  is not specified, the geometry is returned in GCS_WGS_1984 .
- **f:** The response format. The default response format is html .Values: html  | json  | kmz  | lyr  | nmf  | jsapi  | ve  | gmaps

## Description

Map services offer access to the contents of a map hosted on a server. Map services can expose different levels of capabilities. When a map service is hosted on ArcGIS Online or Portal for ArcGIS, it exposes a set of tiled images that are used by the client for rapid map navigation. When a map service is hosted on an ArcGIS Server site, it exposes additional functionality, such as dynamic drawing, query, and search. With ArcGIS Server, further web services may be available through the map service root URL that allow network analysis, vector feature editing, and so forth.

The REST API Map Service resource works only with the default data frame of your published map document. This resource provides basic information about the map, including the layers that it contains, whether or not the map is cached, its spatial reference, initial and full extents, map units, and copyright text. It also provides some metadata associated with the service, such as its service description, its author, and keywords. If the map is cached, additional information about its tiling scheme, such as the origin of the cached tiles, the levels of detail, and tile size, is included.

Map services do not expose editing capabilities. They provide read-only access to feature and attribute content.

## Request Parameters

## Response

The following example demonstrates the response when requesting updated information from the service:

The following example demonstrates the response when requesting footprint for a service:

## Examples

```json
1
https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer
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
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
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
{
  "timeExtent": [
    <startTime>,
    <endTime>
  ],
  "fullExtent": {
    "xmin": <xmin>,
    "ymin": <ymin>,
    "xmax": <xmax>,
    "ymax": <ymax>,
    "spatialReference": <spatialReference>
  }
}
```

