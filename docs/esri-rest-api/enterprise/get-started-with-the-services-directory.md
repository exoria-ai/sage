# ArcGIS Server Services Directory REST API

> Source: [/rest/services-reference/enterprise/get-started-with-the-services-directory/](https://developers.arcgis.com/rest/services-reference/enterprise/get-started-with-the-services-directory/)

The ArcGIS Server Services Directory is a RESTful representation of all the services running on an ArcGIS Server site. Every instance of ArcGIS Server includes the Services Directory as part of its installation. While the Services Directory will work out of the box, once ArcGIS Server has been fully installed the [Edit Services Directory](/rest/enterprise-administration/server/handlersrestservicesdirectoryedit/) operation can be used to modify aspects of the Services Directory, such as disabling the HTML view of the directory and modifying URLs to applications such as Map Viewer that can be accessed to view a published web map. Changes to the Services Directory's configurations should only be made when necessary and with an understanding of how the changes impact the use of the Services Directory.

Once installed, service owners and those with access to the ArcGIS Server can use the Services Directory to do the following tasks:

-   Browse the contents of the GIS Server
-   View published maps
-   Get information for application development

## Browse the contents of the GIS Server

The Services Directory utilizes the RESTful architectural style that allows the API to reveal a hierarchy of information about itself through endpoints. When you use the Services Directory, you can choose to navigate through the directory from its HTML view using links or manually construct specific endpoint URLs.

Whether using the HTML view of the directory or manually building the URLs, you'll need to know how to construct the well-known endpoint (also known as the site root), which is the top node of the Services Directory.

### Construct the well-known endpoint

The well-known endpoint is the site root from which the rest of the API can be accessed. For ArcGIS Enterprise, the default version of the well-known endpoint is as follows:



```
https://<host>/<context>/rest/services
```

The table below defines the key elements of the well-known endpoint's structure:

| URL component | Details |
|---|---|
| <host> | The <host> has three parts to its structure:The name of the ArcGIS Server host organization or the web adaptor hostThe domainThe top-level domain (.com )Throughout the ArcGIS Enterprise API documentation, including the administrative APIs, the host is documented in the following way: https://organization.example.com |
| <context> | This component is either the name of the web adaptor configured for ArcGIS Server (specified during installation) or the site name (arcgis ) if no web adaptor is associated with your deployment of ArcGIS Server. Throughout the ArcGIS Enterprise API documentation, including the administrative APIs, the context is documented as webadaptor . Building off of the URL format shown above, the context would be appended to the URL in the following way: https://organization.example.com/<context> |
| rest/services | The directory endpoint. Appending this to the well-known endpoint URL provides access to the site root, allowing you to see any top-level operations, services, and folders. Building off the other structural components, the directory endpoint is appended to the URL in the following way: https://organization.example.com/<context>/rest/services |

With the site root URL structure in place, you can choose to either use the HTML view of the directory to navigate the site or continue to modify the URL manually to access specific endpoints. The example below demonstrates the additional elements that can be added to the site root URL to navigate to a service, service layer, a resource, or perform an operation:



```
https://<host>/<context>/rest/services/<folderName>/<serviceName>/<ServiceType>/<layer>/<resource>/<operation>?<parameter=value>
```

The table below defines the additional URL components that can be added to the site root URL.

| URL component | Details |
|---|---|
| <folderName> | The name of a folder that holds specific services. Folder names are case-sensitive and should be appended to the URL using the casing they were created with. https://organization.example.com/<context>/rest/services/folderName |
| <serviceName>/<ServiceType> | The name-type pair for a specific service. The service name is case-sensitive and should use the casing it was created with. The service type should use mixed case format, which is defined by the service type being used.Example of a service accessible from the site root https://organization.example.com/<context>/rest/services/serviceName/ServiceTypeExample of a service in a specific folder https://organization.example.com/<context>/rest/services/folderName/serviceName/ServiceType |
| <layer> | The numerical representation of a service layer. https://organization.example.com/<context>/rest/services/folderName/serviceName/ServiceType/0 |
| <resource> | The name of an associated resource endpoint for either a service or service layer.Example of a feature service resource: https://organization.example.com/<context>/rest/services/folderName/sampleFeatureService/FeatureServer/relationshipsExample of a feature service layer resource: https://organization.example.com/<context>/rest/services/folderName/sampleFeatureService/FeatureServer/0/<featureID> |
| <operation> | The name of an operation that can be performed on a specific service, service layer, or a resource associated with a service or service layer.Example of a feature service operation https://organization.example.com/<context>/rest/services/folderName/sampleFeatureService/FeatureServer/ApplyEditsExample of a feature service layer operation https://organization.example.com/<context>/rest/services/folderName/sampleFeatureService/FeatureServer/0/ApplyEditsExample of an operation for a feature service layer's resource: https://organization.example.com/<context>/rest/services/folderName/sampleFeatureService/FeatureServer/0/<featureID>/addAttachment |
| ? | The beginning of the parameter list. An example of this will be showcased in the <parameter=value> examples below. |
| <parameter=value> | The parameters and their associated input for an operation or resource. The parameters of a request are in the form of name-value pairs. The values themselves may be literal (name=value ) for simple parameters, or JSON representations (name={<json-object>} ) for more complex structures. Unless otherwise specified, resources will only support the format (f ) parameter, which sets the response format of the resource.Example of modifying the format of a resource: https://organization.example.com/<context>/rest/services/folderName/sampleFeatureService/FeatureServer/relationships?f=pjsonExample of performing a request (Aggregate Points): https://organization.example.com/<context>/rest/services/folder/GeoAnalyticsTools/GPServer/AggregatePoints/submitJob?pointLayer={"url":"https://organization.example.com/<context>/rest/services/Hurricane/hurricaneTrack/0"}&binType=Square&binSize=100&binSizeUnit=Meters&polygonLayer={}&timeStepInterval=20&timeStepIntervalUnit=Minutes&timeStepRepeatInterval=1&timeStepRepeatIntervalUnit=Days&timeStepReference=946684800000&summaryFields=[{"statisticType": "Mean","onStatisticField":"Annual_Sales"},{"statisticType":"Sum","onStatisticField":"Annual_Sales"}]&outputName=myOutput&context={"extent":{"xmin":-122.68,"ymin":45.53,"xmax":-122.45,"ymax":45.6,"spatialReference":{"wkid":4326}}}&f=json |

#### Additional considerations for Server Directory requests

The most common request method when using the Services Directory is a GET request created from an operation form in the HTML view of the directory. Using an operation form to create a GET request ensures that the request is encoded in the URL, which is the preferred method when submitting a request. However, GET request URLs are limited to as few as 1,024 characters, though this limit is dependent on which browser is being used to access the Services Directory. If you have a long JSON object included in a GET request that may result in the URL exceeding the character limit, you'll need to either submit the request using POST or, if you're using certain geometry and geoprocessing service operations, format your GET request to specify a URL to the input JSON object contained in a file on a public server.

When making a POST request to an operation that involves uploading a file, such as [Add Attachment](/rest/services-reference/enterprise/add-attachment/) for feature services, specify the content type as `multipart/form-data` . For all other POST requests, specify the content type as `application/x-www-form-urlencoded` . Example POST requests in this publication are formatted in the following way:



```
POST /<context>/rest/services/serviceName/ServiceType/operation HTTP/1.1
Host: organization.example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: []

parameter=value&parameter=value
```

For qualifying geometry and geoprocessing services, the URL to the input JSON object file can be formatted in the following way:

Syntax example



```
geometries={"url": "<URL to file>"}
```

Formatting example



```
geometries={"url": "https://myserver/mygeometries/afile.txt"}
```

URL example



```
https://organization.example.com/<context>/rest/services/Geometry/GeometryServer/project?inSR=4326&outSR=54004&geometries={"url": "https://myserver/mygeometries/afile.txt"}
```

## View published maps

You can use the Services Directory API to view your published web maps. Each map service will have a **View In** option on their resource page in the HTML directory that includes links to the following applications:

-   ArcGIS API for JavaScript: This URL provides a simple preview of the map in a web browser that uses ArcGIS API for JavaScript. The advantage of this option is that it does not require any special software on the client to view the web map.
-   Map Viewer: This URL provides a preview of a map service, image service, feature service, or feature service layer in Map Viewer. For more information on Map Viewer, see the [Get started with Map Viewer](https://enterprise.arcgis.com/en/portal/latest/use/get-started-with-mv.htm) documentation in the Portal for ArcGIS publication.
-   ArcGIS Pro: This URL download an ArcGIS Pro PITEMX file referencing the service. Use this option to view your service in ArcGIS Pro.

## Get information for application development

The Services Directory API can help you gather information that you need when developing JavaScript applications. The JavaScript APIs included with ArcGIS Server are based on REST, and every ArcGIS Server instance exposes its information through REST endpoints or URLs. Each endpoint returns some piece of information about the server or one of its services that can be used to develop an application.

### Additional considerations for application development using the Services Directory API

When developing applications using the Services Directory API, its important to keep in mind the version at which you are developing the application and how version compatibility works in the ArcGIS REST APIs. The Services Directory will evolve in such a way that the input parameters and JSON responses will be version compatible, though the actual input parameters and responses may not be the same across different versions of the API.

The version of the deployed API is indicated on the site root of the Services Directory, which informs the clients of the current version of the API. If a client makes a request to a version greater than the current version, the API returns responses in its current version.

The following sections outline the compatibility rules for input parameters and JSON responses.

#### Compatibility rules for input parameters

-   Requests are compatible irrespective of the order in which the parameters appear.
-   Requests are compatible irrespective of the order in which the properties of JSON parameters appear, though it's recommended that clients should strive to maintain the expected property order of JSON properties.
-   New parameters may be added to future versions of requests. The REST API implementation is aware that new parameters may be added to future requests and is flexible enough to ignore parameters it is not aware of.
-   Existing parameters cannot be removed from future versions of requests.
-   Existing properties cannot be removed from the JSON parameters in future versions of requests.

#### Compatibility rules for JSON responses:

-   Responses are compatible irrespective of the order in which the properties appear.
-   New properties may be added to future versions of the response. Clients of the REST API should be aware that new properties may be added to future responses, and they should be flexible enough to ignore properties that they are not aware of.
-   Existing properties cannot be removed from future versions of the response.

## Navigate the API documentation

The Services Directory API publication is organized alphabetically and contains documentation for various GIS services, including some that are dependent on a specific service type or licensing. Each service section outlines the operations and resources available for their specific service area.

To see documentation about what has changed in the API at each release, see the [What's New](/rest/services-reference/enterprise/whats-new/) documentation.

To understand the organizational structure of the API, and how the operations and resources are structured within their service area, see the [Resource hierarchy](/rest/services-reference/enterprise/resource-hierarchy-services/) documentation.

The [Output formats](/rest/services-reference/enterprise/output-formats/) and [Using spatial references](/rest/services-reference/enterprise/using-spatial-references/) documentation can also be used as a reference when formatting requests or developing applications that access the Services Directory API.