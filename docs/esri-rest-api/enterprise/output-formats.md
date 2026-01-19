# Output formats

> Source: [/rest/services-reference/enterprise/output-formats/](https://developers.arcgis.com/rest/services-reference/enterprise/output-formats/)

ArcGIS REST API supports responses in several formats. You specify the response format using the query parameter `f` . A list of valid formats is included for each of the resources and operations where `f` is a parameter.

### HTML

| Parameter format | Description |
|---|---|
| f=html | Default format unless otherwise stated. The response is an HTML page. |

The set of these HTML pages for each resource in the system is called the Services Directory. To view the Services Directory page for the root directory of ArcGIS Enterprise, you would use the following URL:



```
https://organization.example.com/<context>/rest/services?f=html
```

Since "html" is the default value, you are not required to include this parameter in the URL. This means that the above URL is equivalent to the following URL:



```
https://organization.example.com/<context>/rest/services
```

### JSON

| Parameter format | Description |
|---|---|
| f=json | The response is a JSON object in Esri JSON format. |

This format is used by many Esri clients and APIs, including ArcGIS API for JavaScript. To retrieve the information in a JSON object, you would use the following URL:



```
https://organization.example.com/<context>/rest/services?f=json
```

You can also reference a callback function in the URL as follows:



```
https://organization.example.com/<context>/rest/services?f=json&callback=myMethod
```

If you want the JSON object to be more readable, you can use `pjson` . You should not include this parameter in your production applications, as it will affect performance. Use the parameter for debugging purposes only:



```
https://organization.example.com/<context>/rest/services?f=pjson
```

### GeoJSON

| Parameter format | Description |
|---|---|
| f=geojson | The response is in GeoJSON format. The GeoJSON format is standardized in RFC 7946. |

This format is used by many non-Esri APIs and applications. Supported by query operations in ArcGIS Enterprise:



```
https://organization.example.com/<context>/rest/services/Census/MapServer/3/query?where=state_name='california'&f=geojson
```

### PBF

| Parameter format | Description |
|---|---|
| f=pbf | The response is in the Protocol Buffers format. |

The PBF format is binary and is thus smaller and faster for clients to parse than JSON. It is used by newer versions of some Esri APIs and applications to improve efficiency. The PBF format is supported by some feature service operations from ArcGIS Enterprise 10.7 and later.

### Image

| Parameter format | Description |
|---|---|
| f=image | The response is a streamed image. No other information is included in the response. |



```
https://organization.example.com/<context>/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/export?bbox=-117,35.79,-122,42.38&f=image
```

### KMZ

| Parameter format | Description |
|---|---|
| f=kmz | The response is a KML document wrapped in a .kmz file. |

It can be a footprint or the result of an operation. In the following example, a request is made for a KML footprint of a map service with an extent of the United States:



```
https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer?f=kmz
```

For more information about KML as an output option, see KML support.

### Help

| Parameter format | Description |
|---|---|
| f=help | The response is a context-sensitive help document. |

The following URL opens the help on the page that provides information about the map service resource:



```
https://organization.example.com/<context>/rest/services/World_Physical_Map/MapServer?f=help
```

### Pitemx

| Parameter format | Description |
|---|---|
| f=pitemx | The response generates .pitemx files for map services. These files can be opened in ArcGIS Pro 2.3 and later. |

The `.pitemx` file format is supported by ArcGIS Enterprise 10.7 and later.

### Lyr

| Parameter format | Description |
|---|---|
| f=lyr | Generates a layer file for viewing in ArcMap. |



```
https://organization.example.com/<context>/rest/services/World_Physical_Map/MapServer?f=lyr
```

### Jsapi

| Parameter format | Description |
|---|---|
| f=jsapi | The response is a web page for viewing a map service in a web browser using ArcGIS API for JavaScript. |



```
https://organization.example.com/<context>/rest/services/World_Physical_Map/MapServer?f=jsapi
```