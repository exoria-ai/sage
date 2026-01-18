# Image Service

**Category:** services-enterprise
**URL:** https://developers.arcgis.com/rest/services-reference/enterprise/image-service/

## Service Info

- **Parameter:** Details
- **option:** NoteSupport for footprints has been removed at ArcGIS Enterprise 11.1, and the footprints  value for this parameter has been deprecated.If option  is footprints , the footprint of the image service is returned as a feature collection. This feature collection can be viewed in an ArcGIS Online map. This is only supported when the format (f ) parameter is specified as json .Value: footprints
- **outSR:** NoteSupport for footprints has been removed at ArcGIS Enterprise 11.1.The spatial reference of the geometry returned in footprints. This parameter is supported only when option  is specified as footprints . The spatial reference should be specified as a well-known ID. If outSR  is not specified, the geometry is returned in GCS_WGS_1984 .
- **renderingRule:** The rendering rule for how the requested image will be processed is specified. The response is updated service information that reflects a custom processing as defined by the rendering rule. For example, if renderingRule  contains an attributeTable  function, the response will indicate "hasRasterAttributeTable"  as true ; if the renderingRule  contains functions that alter the number of bands, the response will indicate the correct bandCount  value.See Raster function objects for the syntax and examples.
- **f:** The response format. The default response format is html .Values: html  | json  | kmz  | lyr

## Description

An image service provides access to raster data through a web service. Multiple rasters can be served as one image service through mosaic dataset technology, dynamically processed and mosaicked on the fly. An image service supports accessing the mosaicked image, its catalog, and the individual rasters in the catalog.

An image service supports dynamic access and tiled access. Dynamic access provides more functionality, and tiled access provides faster and more scalable access to precooked tiles. There are two types of tiles: map tiles and elevation tiles. Map tiles (introduced at 10.1) represent rendered map images, typically in JPEG or PNG format. Elevation tiles (introduced at 10.3) represent elevation data and are stored as Limited Error Raster Compression (LERC) tiles.

The ArcGIS REST API ImageServer resource root information represents an image service published with ArcGIS Server. The resource provides basic information associated with the image service, such as the service description, its name, its extent, pixel sizes, and band counts.

## Request Parameters

## Examples

```json
1
https://sampleserver6.arcgisonline.com/arcgis/rest/services/CharlotteLAS/ImageServer?f=pjson
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
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
```

