# Types

> Source: [/rest/services-reference/enterprise/routing/routing-data-types/](https://developers.arcgis.com/rest/services-reference/enterprise/routing/routing-data-types/)

## locations

Inputs with locations data type can be specified using a simple comma- and semicolon-based syntax.

Input locations are specified using longitude and latitude values in the WGS84 coordinate system. You cannot pass additional attributes with the location. If you need to pass additional attributes with the location, use the feature data type.



```
x1,y1; x2, y2; ...; xn, yn
```

## feature

Inputs with feature data type can be specified using a JSON structure that represents the features.

You can either specify the complete input using json, or you can publish the input as a feature service or map service and specify the URL of the feature service or map service layer as the input.

-   The example shows a last mile delivery service's [order](../last-mile-delivery-service/#orders) input feature. Refer to each feature input's documentation for the supported attributes for each feature.



```
{
  "spatialReference": {
    "wkid": "<wkid>",
    "latestWkid": "<wkid>"
  },
  "features": [
    {
      "geometry": {
        "x": "<x1>",
        "y": "<y1>"
      },
      "attributes": {
        "<field1>": "<value11>",
        "<field2>": "<value12>"
      }
    },
    {
      "geometry": {
        "x": "<x2>",
        "y": "<y2>"
```

Expand



```
{
  "url": "<url>"
}
```

## table

Inputs with table data type can be specified using a JSON structure that represents the records.

You can either specify the complete input using json, or you can publish the input as a feature service or map service and specify the URL of the table layer within the feature service or map service as the input.

-   The example shows a last mile delivery service's [routes](../last-mile-delivery-service/#routes) input feature. Refer to each feature input's documentation for the supported attributes for each feature.



```
{
  "features": [
    {
      "attributes": {
        "<field1>": "<value11>",
        "<field2>": "<value12>"
      }
    },
    {
      "attributes": {
        "<field1>": "<value21>",
        "<field2>": "<value22>"
      }
    }
  ]
}
```



```
{
  "url": "<url>"
}
```

## layer

Layer data type represents a feature layer in the map service. To use layer data type for inputs, you must publish routing service using [ArcGIS Pro](https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/publish-standard-routing-services.htm). The feature layer must be in the same map that is used to publish map service with network analysis capabilities.

Inputs can be specified using a JSON structure that represents the feature layer in the map service. Attribute and spatial filters can also be applied on the layer. The JSON structure can include the following properties:

-   `type` — Set the `type` property to `layer` to indicate that you're specifying the stops by referencing a layer.
    
-   `layerName` —The name or ID of the data layer in the map service that is being referenced.
    
-   `where` (optional)—A WHERE clause for the query filter. Any legal SQL WHERE clause operating on the fields in the layer is allowed.
    
-   `geometry` (optional)—The geometry to apply as the spatial filter. The structure of the geometry is the same as the structure of the [JSON geometry objects](../../../rest/services-reference/enterprise/geometry-objects/) returned by the ArcGIS REST API.
    
    The geometry type is specified using the `geometryType` property.
    
-   `geometryType` (optional)—The type of geometry specified by the geometry property. The supported geometry types are envelope, point, line, and polygon. The default geometry type is `esriGeometryEnvelope`.
    
    Allowed values: `esriGeometryPoint` | `esriGeometryMultipoint` | `esriGeometryPolyline` | `esriGeometryPolygon` | `esriGeometryEnvelope`
    
-   `spatialRel` (optional)—The spatial relationship to be applied to the input geometry . The supported spatial relationships include intersects, contains, envelope intersects, within, and so on. The default spatial relationship is `esriSpatialRelIntersects`.
    
    Allowed values: `esriSpatialRelIntersects` | `esriSpatialRelContains` | `esriSpatialRelCrosses` | `esriSpatialRelEnvelopeIntersects` | `esriSpatialRelIndexIntersects` | `esriSpatialRelOverlaps` | `esriSpatialRelTouches` | `esriSpatialRelWithin`
    
-   `doNotLocateOnRestrictedElements` (optional)—Specify whether the restricted network elements will be considered when finding network locations. The default is `true`.
    



```
{
  "type": "layer",
  "layerName": "<layerName>",
  "where": "<whereClause>",
  "geometry": "<geometry>",
  "geometryType": "<geometryType>",
  "spatialRel": "<spatialRel>",
  "doNotLocateOnRestrictedElements": "true | false"
}
```

## datetime

Datetime data type is specified as milliseconds since epoch for the date and time. For example, `1451606400000` represents `01/01/2016 00:00:00`.

## date

Date data type is specified as YYYY-MM-DD. For example: 2023-03-15.

## time

Time data type is specified as hh:mm:ss, for example: 14:30:30.

## travel\_mode\_object

You must specify the JSON object containing the settings for a travel mode supported by your organization. For a list of supported travel modes, run the [`GetTravelModes`](/rest/services-reference/enterprise/gettravelmodes-tool/) service from the Utilities service.

The value for the `travel_mode` parameter should be a JSON object representing travel mode settings. When you use the `GetTravelModes` from the Utilities service, a string representing the travel mode JSON is returned. You need to convert this string to a valid JSON object using your API, and pass the JSON object as the value for the `travel_mode` parameter.



```
{
  "results": [
    {
      "paramName": "supportedTravelModes",
      "dataType": "GPRecordSet",
      "value": {
        "displayFieldName": "",
        "fields": [
          {
            "name": "ObjectID",
            "type": "esriFieldTypeOID",
            "alias": "ObjectID"
          },
          {
            "name": "Name",
            "type": "esriFieldTypeString",
            "alias": "Travel Mode Name",
            "length": 255
          },
          {
```

Expand

From the response above, the following is a string representing the Walking Time travel mode:



```
"{\"attributeParameterValues\": [{\"attributeName\": \"Avoid Private Roads\", \"parameterName\": \"Restriction Usage\", \"value\": \"AVOID_MEDIUM\"}, {\"attributeName\": \"Walking\", \"parameterName\": \"Restriction Usage\", \"value\": \"PROHIBITED\"}, {\"attributeName\": \"Preferred for Pedestrians\", \"parameterName\": \"Restriction Usage\", \"value\": \"PREFER_LOW\"}, {\"attributeName\": \"WalkTime\", \"parameterName\": \"Walking Speed (km/h)\", \"value\": 5}, {\"attributeName\": \"Avoid Roads Unsuitable for Pedestrians\", \"parameterName\": \"Restriction Usage\", \"value\": \"AVOID_HIGH\"}], \"description\": \"Follows paths and roads that allow pedestrian traffic and finds solutions that optimize travel time. The walking speed is set to 5 kilometers per hour.\", \"distanceAttributeName\": \"Kilometers\", \"id\": \"caFAgoThrvUpkFBW\", \"impedanceAttributeName\": \"WalkTime\", \"name\": \"Walking Time\", \"restrictionAttributeNames\": [\"Avoid Private Roads\", \"Avoid Roads Unsuitable for Pedestrians\", \"Preferred for Pedestrians\", \"Walking\"], \"simplificationTolerance\": 2, \"simplificationToleranceUnits\": \"esriMeters\", \"timeAttributeName\": \"WalkTime\", \"type\": \"WALK\", \"useHierarchy\": false, \"uturnAtJunctions\": \"esriNFSBAllowBacktrack\"}"
```

The value above should be converted to a valid travel mode JSON object and passed as the value for the travel\_mode parameter as shown below.



```
{
  "attributeParameterValues": [
    {
      "attributeName": "Avoid Private Roads",
      "parameterName": "Restriction Usage",
      "value": "AVOID_MEDIUM"
    },
    {
      "attributeName": "Walking",
      "parameterName": "Restriction Usage",
      "value": "PROHIBITED"
    },
    {
      "attributeName": "Preferred for Pedestrians",
      "parameterName": "Restriction Usage",
      "value": "PREFER_LOW"
    },
    {
      "attributeName": "WalkTime",
      "parameterName": "Walking Speed (km/h)",
```

Expand

#### Travel mode JSON object properties

You can update any of the properties in the travel mode JSON object to suit your requirements. For example, you can update the `impedanceAttributeName` property to use a different impedance attribute, or update `restrictionAttributeNames` to use different restriction attributes.

-   `impedanceAttributeName`— Impedance is a value that quantifies travel along the transportation network. Travel distance is an example of impedance; it quantifies the length of walkways and road segments. Similarly, drive time—the typical time it takes to drive a car along a road segment—is an example of impedance. Drive times may vary by type of vehicle—for instance, the time it takes for a truck to travel along a path tends to be longer than a car—so there can be many impedance values representing travel times for different vehicle types. Impedance values may also vary with time; live and typical traffic reference dynamic impedance values. Each walkway and road segment stores at least one impedance value. When performing a network analysis, the impedance values are used to calculate the best results, such as finding the shortest route—the route that minimizes impedance—between two points.
    
    Show more information for impedanceAttributeName
    
    The `impedanceAttributeName` property can be specified using the following values:
    
    -   `TravelTime`—Historical and live traffic data is used. This option is good for modeling the time it takes automobiles to travel along roads at a specific time of day using live traffic speed data where available. When using `TravelTime`, you can optionally set the TravelTime::Vehicle Maximum Speed (km/h) attribute parameter to specify the physical limitation of the speed the vehicle is capable of traveling.
    -   `Minutes`—Live traffic data is not used, but historical average speeds for automobiles data is used.
    -   `TruckTravelTime`—Historical and live traffic data is used, but the speed is capped at the posted truck speed limit. This is good for modeling the time it takes for the trucks to travel along roads at a specific time. When using `TruckTravelTime`, you can optionally set the TruckTravelTime::Vehicle Maximum Speed (km/h) attribute parameter to specify the physical limitation of the speed the truck is capable of traveling.
    -   `TruckMinutes`—Live traffic data is not used, but the smaller of the historical average speeds for automobiles and the posted speed limits for trucks are used.
    -   `WalkTime`—The default is a speed of 5 km/hr on all roads and paths, but this can be configured through the WalkTime::Walking Speed (km/h) attribute parameter.
    -   `Miles`—Length measurements along roads are stored in miles and can be used for performing analysis based on shortest distance.
    -   `Kilometers`—Length measurements along roads are stored in kilometers and can be used for performing analysis based on shortest distance.
    
-   `distanceAttributeName`— The distance-based impedance value represents the travel distance along road segments or on other parts of the transportation network.
    
    -   `Miles`
    -   `Kilometers`
-   `timeAttributeName`— The time-based impedance value represents the travel time along road segments or on other parts of the transportation network.
    
    -   `Minutes`
    -   `TravelTime`
    -   `WalkTime`
    -   `TruckMinutes`
    -   `TruckTravelTime`
-   `restrictionAttributeNames`— Specify the restrictions that will be honored by the service. A restriction represents a driving preference or requirement. In most cases, restrictions cause roads or pathways to be prohibited, but they can also cause them to be avoided or preferred. For instance, using the `Avoid Toll Roads` restriction will result in a route that will include toll roads only when it is required to travel on toll roads to visit a stop. Use `Height Restriction` to route around clearances that are lower than the height of the vehicle. If the vehicle is carrying corrosive materials, you can use the `Any Hazmat Prohibited` restriction to prevent hauling the materials along roads where it is marked as illegal to do so.
    
    The value is specified as a list of restriction names. An empty list \[\] indicates that no restriction will be used in the analysis.
    
    Show more information for restrictionAttributeNames
    
    The service supports the following restriction names:
    
    -   Any Hazmat Prohibited—The results will not include roads where transporting any kind of hazardous material is prohibited.
    -   Avoid Carpool Roads—The results will avoid roads that are designated exclusively for car pool (high-occupancy) vehicles.
    -   Avoid Express Lanes—The results will avoid roads designated as express lanes.
    -   Avoid Ferries—The results will avoid ferries.
    -   Avoid Gates—The results will avoid roads where there are gates, such as keyed access or guard-controlled entryways.
    -   Avoid Limited Access Roads—The results will avoid roads that are limited-access highways.
    -   Avoid Private Roads—The results will avoid roads that are not publicly owned and maintained.
    -   Avoid Roads Unsuitable for Pedestrians—The results will avoid roads that are unsuitable for pedestrians.
    -   Avoid Stairways—The results will avoid all stairways on a pedestrian-suitable route.
    -   Avoid Toll Roads—The results will avoid all toll roads for automobiles.
    -   Avoid Toll Roads for Trucks—The results will avoid all toll roads for trucks.
    -   Avoid Truck Restricted Roads—The results will avoid roads where trucks are not allowed, except when making deliveries.
    -   Avoid Unpaved Roads—The results will avoid roads that are not paved (for example, dirt, gravel, and so on).
    -   Axle Count Restriction—The results will not include roads where trucks with the specified number of axles are prohibited. The number of axles can be specified using the Number of Axles restriction parameter.
    -   Driving a Bus—The results will not include roads where buses are prohibited. Using this restriction will also ensure that the results will honor one-way streets.
    -   Driving a Taxi—The results will not include roads where taxis are prohibited. Using this restriction will also ensure that the results will honor one-way streets.
    -   Driving a Truck—The results will not include roads where trucks are prohibited. Using this restriction will also ensure that the results will honor one-way streets.
    -   Driving an Automobile—The results will not include roads where automobiles are prohibited. Using this restriction will also ensure that the results will honor one-way streets.
    -   Driving an Emergency Vehicle—The results will not include roads where emergency vehicles are prohibited. Using this restriction will also ensure that the results will honor one-way streets.
    -   Height Restriction—The results will not include roads where the vehicle height exceeds the maximum allowed height for the road. The vehicle height can be specified using the Vehicle Height (meters) restriction parameter.
    -   Kingpin to Rear Axle Length Restriction—The results will not include roads where the vehicle length exceeds the maximum allowed kingpin to rear axle for all trucks on the road. The length between the vehicle kingpin and the rear axle can be specified using the Vehicle Kingpin to Rear Axle Length (meters) restriction parameter.
    -   Length Restriction—The results will not include roads where the vehicle length exceeds the maximum allowed length for the road. The vehicle length can be specified using the Vehicle Length (meters) restriction parameter.
    -   Preferred for Pedestrians—The results will use preferred routes suitable for pedestrian navigation.
    -   Riding a Motorcycle—The results will not include roads where motorcycles are prohibited. Using this restriction will also ensure that the results will honor one-way streets.
    -   Roads Under Construction Prohibited—The results will not include roads that are under construction.
    -   Semi or Tractor with One or More Trailers Prohibited—The results will not include roads where semis or tractors with one or more trailers are prohibited.
    -   Single Axle Vehicles Prohibited—The results will not include roads where vehicles with single axles are prohibited.
    -   Tandem Axle Vehicles Prohibited—The results will not include roads where vehicles with tandem axles are prohibited.
    -   Through Traffic Prohibited—The results will not include roads where through traffic (nonlocal traffic) is prohibited.
    -   Truck with Trailers Restriction—The results will not include roads where trucks with the specified number of trailers on the truck are prohibited. The number of trailers on the truck can be specified using the Number of Trailers on Truck restriction parameter.
    -   Use Preferred Hazmat Routes—The results will prefer roads that are designated for transporting hazardous materials.
    -   Use Preferred Truck Routes—The results will prefer roads that are designated as truck routes, such as roads that are part of the national network as specified by the National Surface Transportation Assistance Act in the United States, or roads that are designated as truck routes by the state or province, or roads that are preferred by truckers when driving in an area.
    -   Walking—The results will not include roads where pedestrians are prohibited.
    -   Weight Restriction—The results will not include roads where the vehicle weight exceeds the maximum allowed weight for the road. The vehicle weight can be specified using the Vehicle Weight (kilograms) restriction parameter.
    -   Weight per Axle Restriction—The results will not include roads where the vehicle weight per axle exceeds the maximum allowed weight per axle for the road. The vehicle weight per axle can be specified using the Vehicle Weight per Axle (kilograms) restriction parameter.
    -   Width Restriction—The results will not include roads where the vehicle width exceeds the maximum allowed width for the road. The vehicle width can be specified using the Vehicle Width (meters) restriction parameter.
    
-   `attributeParameterValues`—Specify additional values required by an attribute or restriction, such as to specify whether the restriction prohibits, avoids, or prefers travel on restricted roads. If the restriction is meant to avoid or prefer roads, you can further specify the degree to which they are avoided or preferred using this parameter. For example, you can choose to never use toll roads, avoid them as much as possible, or prefer them.
    
    Show more information for attributeParameterValues
    
    The `attributeParameterValues` can be specified with the following attributes:
    
    -   `attributeName` —The name of the restriction or the impedance attribute.
    -   `parameterName` —The name of the parameter associated with the restriction or impedance attribute. An attribute can have one or more `parameterName` values based on its intended use, which implies you may need multiple `attributeParameterValues` for a single attribute name.
    -   `value` —The value for the `parameterName` that is used by the service when evaluating the restriction or impedance attribute.
    
    When specifying the `attributeParameterValues` for restrictions, each restriction (listed as `attributeName` ) has a `parameterName` value, `Restriction Usage` , that specifies whether the restriction prohibits, avoids, or prefers travel on the roads associated with the restriction and the degree to which the roads are avoided or preferred.
    
    The `value` for the `Restriction Usage` `parameterName` can be assigned any of the following string values or their equivalent numeric values listed in the parentheses:
    
    -   `PROHIBITED` (`-1` )—Travel on the roads that have the restriction is prohibited.
    -   `AVOID_HIGH` (`5` )—It is very unlikely the service will include in the route the roads that are associated with the restriction.
    -   `AVOID_MEDIUM` (`2` )—It is unlikely the service will include in the route the roads that are associated with the restriction.
    -   `AVOID_LOW` (`1.3` )—It is somewhat unlikely the service will include in the route the roads that are associated with the restriction.
    -   `PREFER_LOW` (`0.8` )—It is somewhat likely the service will include in the route the roads that are associated with the restriction.
    -   `PREFER_MEDIUM` (`0.5` )—It is likely the service will include in the route the roads that are associated with the restriction.
    -   `PREFER_HIGH` (`0.2` )—It is very likely the service will include in the route the roads that are associated with the restriction.
    
    Expand to see the default Restriction Usage values for the restrictions
    
    | Restriction name | Restriction parameter name | Restriction parameter default value |
    |---|---|---|
    | Any Hazmat Prohibited | Restriction Usage | PROHIBITED |
    | Avoid Carpool Roads | Restriction Usage | PROHIBITED |
    | Avoid Express Lanes | Restriction Usage | PROHIBITED |
    | Avoid Ferries | Restriction Usage | AVOID_MEDIUM |
    | Avoid Gates | Restriction Usage | AVOID_MEDIUM |
    | Avoid Limited Access Roads | Restriction Usage | AVOID_MEDIUM |
    | Avoid Private Roads | Restriction Usage | AVOID_MEDIUM |
    | Avoid Roads Unsuitable for Pedestrians | Restriction Usage | AVOID_HIGH |
    | Avoid Stairways | Restriction Usage | AVOID_HIGH |
    | Avoid Toll Roads | Restriction Usage | AVOID_MEDIUM |
    | Avoid Toll Roads for Trucks | Restriction Usage | AVOID_MEDIUM |
    | Avoid Truck Restricted Roads | Restriction Usage | AVOID_HIGH |
    | Avoid Unpaved Roads | Restriction Usage | AVOID_HIGH |
    | Axle Count Restriction | Number of Axles | 0 |
    | Axle Count Restriction | Restriction Usage | PROHIBITED |
    | Driving a Bus | Restriction Usage | PROHIBITED |
    | Driving a Taxi | Restriction Usage | PROHIBITED |
    | Driving a Truck | Restriction Usage | PROHIBITED |
    | Driving an Automobile | Restriction Usage | PROHIBITED |
    | Driving an Emergency Vehicle | Restriction Usage | PROHIBITED |
    | Height Restriction | Restriction Usage | PROHIBITED |
    | Height Restriction | Vehicle Height (meters) | 0 |
    | Kingpin to Rear Axle Length Restriction | Restriction Usage | PROHIBITED |
    | Kingpin to Rear Axle Length Restriction | Vehicle Kingpin to Rear Axle Length (meters) | 0 |
    | Length Restriction | Restriction Usage | PROHIBITED |
    | Length Restriction | Vehicle Length (meters) | 0 |
    | Preferred for Pedestrians | Restriction Usage | PREFER_LOW |
    | Riding a Motorcycle | Restriction Usage | PROHIBITED |
    | Roads Under Construction Prohibited | Restriction Usage | PROHIBITED |
    | Semi or Tractor with One or More Trailers Prohibited | Restriction Usage | PROHIBITED |
    | Single Axle Vehicles Prohibited | Restriction Usage | PROHIBITED |
    | Tandem Axle Vehicles Prohibited | Restriction Usage | PROHIBITED |
    | Through Traffic Prohibited | Restriction Usage | AVOID_HIGH |
    | Truck with Trailers Restriction | Restriction Usage | PROHIBITED |
    | Truck with Trailers Restriction | Number of Trailers on Truck | 0 |
    | Use Preferred Hazmat Routes | Restriction Usage | PREFER_MEDIUM |
    | Use Preferred Truck Routes | Restriction Usage | PREFER_HIGH |
    | Walking | Restriction Usage | PROHIBITED |
    | WalkTime | Walking Speed (km/h) | 5 |
    | Weight Restriction | Restriction Usage | PROHIBITED |
    | Weight Restriction | Vehicle Weight (kilograms) | 0 |
    | Weight per Axle Restriction | Restriction Usage | PROHIBITED |
    | Weight per Axle Restriction | Vehicle Weight per Axle (kilograms) | 0 |
    | Width Restriction | Restriction Usage | PROHIBITED |
    | Width Restriction | Vehicle Width (meters) | 0 |
    

## locate\_settings\_object

This object is used to specify settings that affect how inputs are located, such as the maximum search distance to use when locating the inputs on the network or the network sources being used for locating.

[Learn more about locating inputs](https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/locating-analysis-inputs.htm)

To restrict locating on a portion of the source, you can specify a where clause for a source.

The locate settings object is specified as a JSON object. The JSON object allows you to specify a locator JSON for all input feature in the analysis, or you can specify an override for a particular input. The override allows you to have different settings for each analysis input. For example, you can disallow stops to locate on highway ramps and allow point barriers to locate on highway ramps.

The locator JSON object has the following properties:

-   `tolerance` and `toleranceUnits`—Control the maximum search distance when locating inputs. If no valid network location is found within this distance, the input features will be considered unlocated. A small search tolerance decreases the likelihood of locating on the wrong street but increases the likelihood of not finding a valid network location. The `toleranceUnits` parameter value can be specified as one of the following values:
    -   `esriCentimeters`
    -   `esriDecimalDegrees`
    -   `esriDecimeters`
    -   `esriFeet`
    -   `esriInches`
    -   `esriIntFeet`
    -   `esriIntInches`
    -   `esriIntMiles`
    -   `esriIntNauticalMiles`
    -   `esriIntYards`
    -   `esriKilometers`
    -   `esriMeters`
    -   `esriMiles`
    -   `esriMillimeters`
    -   `esriNauticalMiles`
    -   `esriYards`

-   `sources`—Control which network source can be used for locating. For example, you can configure the analysis to locate inputs on streets but not on sidewalks. The list of possible sources on which to locate is specific to the network dataset this service references. Only the sources that are in the sources array are used for locating. You can specify a `where` clause on each source you specified in the sources array to further restrict locating on that source matching certain characteristics using an [SQL expression](https://pro.arcgis.com/en/pro-app/latest/help/mapping/navigation/sql-reference-for-elements-used-in-query-expressions.htm). For example, you can configure the analysis to locate inputs only on street features matching certain road classes such as avoiding highway ramps. The `sources` property is specified as an array of objects, each having the following attributes:
    -   `name`—The name of the network source feature class that can be used for locating inputs.
    -   `where`—An SQL expression on the network source feature class.

-   `allowAutoRelocate`—Control whether inputs with existing network location fields can be automatically relocated when solving to ensure valid, routable location fields for the analysis. If the value is `true`, points located on restricted network elements and points affected by barriers will be relocated to the closest routable location. If the value is `false`, network location fields will be used as they are even if the points are unreachable, and this may cause the solve to fail. Even if the value is `false`, inputs with no location fields or incomplete location fields will be located during the solve operation.

#### Syntax for locate\_settings

Following is the syntax for locating settings using a JSON structure:



```
{
  "default": {
    "tolerance": "<value>",
    "toleranceUnits": "<unit>",
    "allowAutoRelocate": "true | false",
    "sources": [
      {
        "name": "<sourceName>",
        "where": "<whereClause>"
      }
    ]
  },
  "overrides": {
    "orders": {
      "tolerance": "<value>",
      "toleranceUnits": "<unit>",
      "allowAutoRelocate": "true | false",
      "sources": [
        {
          "name": "<sourceName>",
```

Expand

## usage\_cost\_object

The `usage_cost` object is returned as a JSON with the following syntax:



```
{
  "paramName": "Usage_Cost",
  "dataType": "GPString",
  "value": {
    "numObjects": "<number>",
    "credits": "<number>"
  }
}
```

#### Example for usage\_cost

The following shows an example of the usage\_cost parameter in which the analysis generated 9 billable objects (represented by numObjects) and 4.5 credits were used by the analysis.



```
{
  "paramName": "Usage_Cost",
  "dataType": "GPString",
  "value": {
    "numObjects": 9,
    "credits": 4.5
  }
}
```

## context\_object

The [Context](/rest/services-reference/enterprise/spatial-reference/) object contains the following additional settings that affect task operation:

-   [Extent](/rest/services-reference/enterprise/spatial-reference/#extent) (`extent`)—A bounding box that defines the analysis area. Only input features that intersect the bounding box will be analyzed.
-   [Output spatial reference](/rest/services-reference/enterprise/spatial-reference/#output-spatial-reference) (`outSR`)—The output features will be projected into the output spatial reference.

## file

Outputs with file data type are returned as a JSON structure with a url field. The value of the url field is a URL to the location of the output file.

By default, these files will no longer be available when directories get cleaned up periodically. To learn more about these directories, and configure the frequency of the cleanup, see [Server directories](https://enterprise.arcgis.com/en/server/latest/administer/windows/about-server-directories.htm)



```
{
  "paramName": "<paramName>",
  "dataType": "GPDataFile",
  "value": {
    "url": "<url>"
  }
}
```