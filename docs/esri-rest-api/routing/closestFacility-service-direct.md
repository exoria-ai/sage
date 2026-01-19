# /solveClosestFacility

> Source: [/rest/services-reference/enterprise/routing/closestFacility-service-direct/](https://developers.arcgis.com/rest/services-reference/enterprise/routing/closestFacility-service-direct/)

If you publish routing services using [configure routing services](https://enterprise.arcgis.com/en/portal/latest/administer/windows/configure-routing-services.htm) dialog box from ArcGIS Enterprise portal website, or publish using [publish routing services](https://enterprise.arcgis.com/en/server/latest/develop/windows/publishing-routing-services.htm) command line utility, use the following endpoint to access the /solveClosestFacility direct request. The `{{folderName}}` represents the folder in which the services are being published.

GETGETPOST



```
GET https://{{machineName}}/{{serverWebAdaptorName}}/rest/services/{{folderName}}/NetworkAnalysis/NAServer/ClosestFacility/solveClosestFacility
```

If you publish routing services using [ArcGIS Pro](https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/publish-standard-routing-services.htm), use the following endpoint to access the /solveClosestFacility direct request. The `{{serviceName}}` represents the name of the routing services published from ArcGIS Pro. The `{{layerName}}` is the closest facility layer's name in the map used to publish the routing service.

GETGETPOST



```
GET https://{{machineName}}/{{serverWebAdaptorName}}/rest/services/{{serviceName}}/NAServer/{{layerName}}/solveClosestFacility
```

The `/solveClosestFacility` direct request finds one or more nearby facilities from incidents based on travel time or travel distance.

Finding the closest hospital to an accident, the closest police cars to a crime scene, and the closest store to a customer's address are examples of problems that can be solved using the Closest facility service.

When finding the closest facilities, you can specify how many to find and whether the direction of travel is toward or away from them. Once you've found the closest facilities, you can display the best route to or from them and include the travel time, travel distance, and driving directions to each facility.

The service can use current traffic conditions when determining the best routes. You can also specify an impedance cutoff beyond which the service will not search for a facility. For instance, you can set up a Closest facility service to search for hospitals within a 15-minute drive time of the site of an accident. Any hospitals that take longer than 15 minutes to reach will not be included in the results. The hospitals are referred to as facilities, and the accident is referred to as an incident. The service allows you to perform multiple closest facility analyses simultaneously. This means you can have multiple incidents and find the closest facility or facilities to each incident.

The `solve` operation is performed on a [network layer resource](/rest/services-reference/enterprise/rest/services-reference/enterprise/network-layer/). The `solve` operation is supported on a network layer with a `layerType` value of `esriNAServerRouteLayer`.

## Parameters

| Name | Required | Type | Default | Description |
|---|---|---|---|---|
| f |  | string |  | The request response format, either json or pjson |
| token |  | string |  | An access token with the required privileges. |
| incidents |  | locations \| feature \| layer |  | One or more locations from which the nearby locations are searched. |
| facilities |  | locations \| feature \| layer |  | One or more locations that are searched for when finding the closest location. |
| returnCFRoutes |  | string | false | Return routes. |
| travelMode |  | object |  | The mode of transportation for the analysis provided as a JSON object. |
| defaultTargetFacilityCount |  | string |  | The number of closest facilities to find per incident. |
| travelDirection |  | string | esriNATravelDirectionToFacility | Search for the closest facility as measured from the incident to the facility or from the facility to the incident. |
| defaultCutoff |  | number | null | The travel time or travel distance value at which to stop searching for facilities for a given incident. |
| timeOfDay |  | string |  | The time and date to depart from or arrive at incidents or facilities. |
| timeOfDayIsUTC |  | boolean | false | The time zone or zones of the timeOfDay parameter. |
| timeOfDayUsage |  | string | esriNATimeOfDayUseAsStartTime | Specifies whether the timeOfDay parameter value represents the arrival or departure time for the routes. |
| restrictUTurns |  | string | esriNFSBAtDeadEndsAndIntersections | Restricts or allows a route to make U-turns at junctions. |
| useHierarchy |  | boolean | true | Hierarchy used when finding the shortest paths. |
| impedanceAttributeName |  | string | TravelTime | Type of impedance. |
| accumulateAttributeNames |  | string | Miles,Kilometers | Accumulates values other than the value set in the impedanceAttributeName parameter. |
| restrictionAttributeNames |  | string |  | The restrictions that should be honored by the service. |
| attributeParameterValues |  | [object] |  | Additional values required by an attribute or restriction. |
| barriers |  | locations \| feature \| layer |  | One or more points that act as temporary restrictions, additional time, or distance. |
| polylineBarriers |  | feature \| layer |  | One ore more lines that prohibit travel anywhere the lines intersect the streets. |
| polygonBarriers |  | feature \| layer |  | Polygons that either prohibit travel or proportionately scale the time or distance required to travel on the streets. |
| returnDirections |  | boolean | false | Generates the driving directions for each route. |
| directionsLanguage |  | string | en | The language used when generating driving directions. |
| directionsOutputType |  | string | esriDOTStandard | The content and length of the driving directions. Used if returnDirections=true. |
| directionsStyleName |  | string | NADesktop | The formatting style for the directions. Used if returnDirections=true. |
| directionsLengthUnits |  | string | esriNAUMiles | The units to display the travel distance in driving directions. Used ifreturnDirections=true. |
| directionsTimeAttributeName |  | string | TravelTime | The time-based impedance attribute to display the duration of a maneuver. |
| outputLines |  | string | esriNAOutputLineTrueShape | The type of route features that are returned. |
| returnFacilities |  | boolean | true | Returns facilities. |
| returnIncidents |  | boolean | true | Returns incidents. |
| returnBarriers |  | boolean | false | Returns barriers. |
| returnPolylineBarriers |  | boolean | false | Returns polyline barriers. |
| returnPolygonBarriers |  | boolean | false | Returns polygon barriers. |
| returnTraversedEdges |  | boolean | false | Returns traversed edges. |
| returnTraversedJunctions |  | boolean | false | Returns traversed junctions. |
| returnTraversedTurns |  | boolean | false | Returns traversed turns. |
| returnZ |  | string |  | Include the z-values for the returned geometries if supported by the underlying network. |
| ignoreInvalidLocations |  | boolean | true | Ignores invalid input locations. |
| context |  | string |  | Additional settings that affect task operation |
| outputGeometryPrecision |  | number | 10 | Simplifies route geometry. |
| outputGeometryPrecisionUnits |  | string | esriMeters | The units for the value in the outputGeometryPrecision parameter. |
| geometryPrecision |  | integer |  | The number of decimal places in the response geometries. Applies to x and y values only. |
| geometryPrecisionM |  | string |  | The number of decimal places in the response geometries. Applies to m-values only. |
| geometryPrecisionZ |  | string |  | The number of decimal places in the response geometries. Applies to z-values only. |
| overrides |  | string |  | For internal use only. |
| preserveObjectID |  | boolean | false | Preserves the object IDs from input locations when the input locations are returned as output. |
| returnEmptyResults |  | boolean | false | Returns empty results instead of the error property when a request fails. |
| locateSettings |  | object |  | Determines how input data are located. |

## Required parameters

### f

`string`required

Values: _json | pjson_

The response format.



```
f=json
```

### token

`string`required

Specify a token that provides the identity of a user that has the permissions to access the service. The [security and authentication](/rest/services-reference/enterprise/generate-token/) page provides more information about how an access token can be obtained.



```
"token=<yourToken>"
```

### incidents

[`locations`](../routing-data-types/#locations)[`feature`](../routing-data-types/#feature)[`layer`](../routing-data-types/#layer)required

Specify one or more locations from which the service searches for the nearby locations. These locations are referred to as incidents.

When specifying the stops, you can set attributes for each as follows:

Show attributes for incidents

#### Attributes for incidents

-   Namestring (length: 500)nullable
    
    The name of the incident. The name is used in the driving directions. If the name is not specified, a unique name prefixed with Location is automatically generated in the output routes and directions.
    

-   ObjectIDinteger (non-negative)nullable
    
    The object ID of the incident. `ObjectID` is a unique identifier for the incident. If you want to maintain a relationship between input and output, set `preserveObjectID` to `true` , and the `ObjectID` value of the input incident is included in the output routes (as the IncidentID field). The `ObjectID` value is also included in the output incidents (as the `ObjectID` field) and can be used to join additional information from the analysis outputs to the attribute of the incidents. If the `ObjectID` value is not specified, a unique `ID` is automatically generated in the output.
    

-   SourceIDinteger (non-negative)nullable
    
    The numeric identifier of the network dataset source feature class on which the input point is located.
    
-   SourceOIDinteger (non-negative)nullable
    
    The object ID of the feature in the source on which the input point is located.
    
-   PosAlongnumber (non-negative)nullable
    
    The position along the digitized direction of the source line feature. This value is stored as a ratio. This attribute is null if the network location references a junction.
    
-   SideOfEdgeint enumnullable
    
    Allowed values: `1`, `2`
    
    The side of the edge in relation to the digitized direction of the line feature.
    
    This attribute is limited to a domain of two values:
    
    -   `1`: Right Side
    -   `2`: Left Side

-   TargetFacilityCountintegerdefault:null
    
    Specify the number of facilities that need to be found for the given incident.
    
    If `TargetFacilityCount` is not set for an incident, the service will use the value specified as the `defaultTargetFacilityCount` parameter. The value for the `TargetFacilityCount` attribute allows the ability to overwrite the `defaultTargetFacilityCount` value on a per incident basis. The default value for this attribute is null , which causes the service to use the value set for the `defaultTargetFacilityCount` parameter. If the `TargetFacilityCount` attribute is set to a value other than null , the `defaultTargetFacilityCount` value is overwritten.
    

-   Attr\_\[Cost\]number (non-negative)default:0nullable
    
    The name of the attribute can be: `Attr_TravelTime`, `Attr_TruckTravelTime`, `Attr_Minutes`, `Attr_TruckMinutes`, `Attr_WalkTime`, `Attr_Miles`, `Attr_Kilometers`
    
    This attribute specifies how much additional time spent or distance traveled can occur at the incident. The value for this attribute is included in the total travel time or distance for the output [routes](#routes) and is also displayed in output [directionPoints](#directionpoints) as service time.
    
    The value for this attribute is specified in the units of the cost attribute. For instance, `Attr_TravelTime` is in minutes.
    
    Use case
    
    You can add time to an incident to represent how long it takes to make a delivery, install equipment, or perform some other task at the incident. Similarly, adding extra distance may be useful to account for a long driveway or other road that isn't represented by the network dataset. When a time-based cost attribute `TravelTime` is used, it will specify the travel time for cars, in minutes, that will be added to the total travel time of the route between the incident and the closest facility. The attribute value can be used to model the time spent at the incident.
    
    For example, if you are finding the three closest fire stations from a fire incident, the attribute can store the amount of time spent at the fire incident. This could be the time it takes for firefighters to hook up their equipment and begin fighting the fire. The value for this attribute is included in the total travel time for the route and is also displayed in driving directions as service time. `Attr_TravelTime` is only referenced if `TravelTime` is used in the analysis as impedance or accumulate attribute. A zero or null value indicates that the incident requires no service time.
    
    However, when a distance-based cost attribute like `Miles` is used, it specifies the distance in miles that will be added to the total distance of the route between the incident and the closest facility. Generally the locations of the incidents are not exactly on the streets but are set back somewhat from the road. The `Attr_Miles` attribute can be used to model the distance between the actual incident location and its location on the street if it is important to include that distance in the total travel distance. `Attr_Miles` is only referenced if `Miles` is used in the analysis as impedance or accumulate attribute.
    

-   Cutoff\_\[Cost\]number (non-negative)default:null
    
    Specify the travel time or distance at which to stop searching for facilities for a given incident.
    
    If `Cutoff_[Cost]` is not set for an incident, the service will use the value specified as the `defaultCutoff` parameter. The default value for this attribute is null, which causes the service to use the value set for the `defaultCutoff` parameter. If the `Cutoff_[Cost]` attribute is set to a value other than `null`, the `defaultCutoff` value is overridden.
    

-   CurbApproachint enumdefault:0
    
    Allowed values: `0`, `1`, `2`, `3`
    
    Specifies the direction a vehicle may arrive at and depart from the incident. The field value is specified as one of the following integers:
    
    -   `0`: Either side of vehicle. The vehicle can approach and depart the incident in either direction. U-turns are allowed. You should choose this setting if your vehicle can make a U-turn at the order or if it can pull into a driveway or parking lot and turn around.
    -   `1`: Right side of vehicle. When the vehicle approaches and departs the incident, the curb must be on the right side of the vehicle. A U-turn is prohibited.
    -   `2`: Left side of vehicle. When the vehicle approaches and departs the incident, the curb must be on the left side of the vehicle. A U-turn is prohibited.
    -   `3`: No U-turn. When the vehicle approaches the incident, the curb can be on either side of the vehicle; however, the vehicle must depart without turning around. [Learn more about U-turn policies](https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/u-turn-policies.htm)
    
    Show illustration
    
    | Setting | Coded value | Description |
    |---|---|---|
    | Either side of vehicle | 0 | The vehicle can approach and depart the incident in either direction, so a U-turn is allowed at the incident. This setting can be chosen if it is possible and desirable for a vehicle to turn around at the incident. This decision may depend on the width of the road and the amount of traffic or whether the location has a parking lot where vehicles can pull in and turn around.All arrival and departure combinations are allowed with the Either side of vehicle curb approach. |
    | Right side of vehicle | 1 | When the vehicle approaches and departs the incident, the incident must be on the right side of the vehicle. A U-turn is prohibited. This is typically used for vehicles such as buses that must arrive with the bus stop on the right side.The allowed arrival and departure combination for the Right side of vehicle curb approach is shown. |
    | Left side of vehicle | 2 | When the vehicle approaches and departs the incident, the incident must be on the left side of the vehicle. A U-turn is prohibited. This is typically used for vehicles such as buses that must arrive with the bus stop on the left side.The allowed arrival and departure combination for the Left side of vehicle curb approach is shown. |
    | No U-Turn | 3 | When the vehicle approaches the incident, the incident can be on either side of the vehicle; however, when it departs, the vehicle must continue in the same direction it arrived. A U-turn is prohibited.The allowed arrival and departure combinations for the No U-Turn curb approach are shown. |
    
    The `CurbApproach` attribute is designed to work with both types of national driving standards: right-hand traffic (United States) and left-hand traffic (United Kingdom). First, consider an incident on the left side of a vehicle. It is always on the left side regardless of whether the vehicle travels on the left or right half of the road. What may change with national driving standards is your decision to approach an incident from one of two directions, that is, so it ends up on the right or left side of the vehicle. For example, if you want to arrive at an incident and not have a lane of traffic between the vehicle and the incident, choose 1 (Right side of vehicle) in the United States and 2 (Left side of vehicle) in the United Kingdom.
    
    ![ Right side of vehicle with right-hand traffic](../images/CurbApproach_RightSide.png)
    
    _With right-hand traffic, the curb approach that leaves the vehicle closest to the incident is Right side of vehicle._
    
    ![ Left side of vehicle with left-hand traffic ](../images/CurbApproach_LeftSideDriving.png)
    
    _With left-hand traffic, the curb approach that leaves the vehicle closest to the incident is Left side of vehicle._
    

-   Bearingnumber (non-negative)nullable
    
    The direction in which a point is moving. The units are degrees and are measured clockwise from true north.
    
    This attribute is used in conjunction with the `BearingTol` attribute. Bearing data is usually sent automatically from a mobile device equipped with a GPS receiver. Try to include bearing data if you are loading an input location that is moving, such as a pedestrian or a vehicle. Using this attribute tends to prevent adding locations to the wrong edges, which can occur when a vehicle is near an intersection or an overpass, for example. Bearing also helps the solver determine the side of the street that the point is on.
    
    [Learn more about bearing and bearing tolerance](https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/bearing-and-bearing-tolerance.htm)
    
-   BearingTolnumber (range: 0 - 180)default:30nullable
    
    The bearing tolerance value creates a range of acceptable bearing values when locating moving points on an edge using the `Bearing` attribute.
    
    If the `Bearing` attribute value is within the range of acceptable values that are generated from the bearing tolerance on an edge, the point can be added as a network location there; otherwise, the closest point on the next-nearest edge is evaluated. The units are in degrees. A value of 30 means that when Network Analyst attempts to add a network location on an edge, a range of acceptable bearing values is generated 15 degrees to either side of the edge (left and right) and in both digitized directions of the edge.
    
    [Learn more about bearing and bearing tolerance](https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/bearing-and-bearing-tolerance.htm)
    
-   NavLatencynumber (non-negative)nullable
    
    Indicates how much cost is expected to elapse from the moment GPS information is sent from a moving vehicle to a server and the moment the processed route is received by the vehicle's navigation device.
    
    This attribute is only used in the solve process if the `Bearing` and `BearingTol` fields also have values; however, providing a `NavLatency` attribute value is optional, even when values are present in the `Bearing` and `BearingTol`.
    

### facilities

[`locations`](../routing-data-types/#locations)[`feature`](../routing-data-types/#feature)[`layer`](../routing-data-types/#layer)required

Specify one or more locations that are searched for when finding the closest location. These locations are referred to as facilities.

When specifying the facilities, you can set attributes for each as follows:

Show attributes for facilities

#### Attributes for facilities

-   Namestring (length: 500)nullable
    
    The name of the facility. The name is used in the driving directions. If the name is not specified, a unique name prefixed with Location is automatically generated in the output routes and directions.
    

-   ObjectIDinteger (non-negative)nullable
    
    The object ID of the facility. `ObjectID` is a unique identifier for the facility. If you want to maintain a relationship between input and output, set `preserveObjectID` to `true`, and the `ObjectID` value of the input facility is included in the output routes (as the `FacilityID` field). The `ObjectID` value is also included in the output facilities (as the `ObjectID` field) and can be used to join additional information from the analysis outputs to the attribute of the facilities. If the `ObjectID` value is not specified, a unique ID is automatically generated in the output.
    

-   SourceIDinteger (non-negative)nullable
    
    The numeric identifier of the network dataset source feature class on which the input point is located.
    
-   SourceOIDinteger (non-negative)nullable
    
    The object ID of the feature in the source on which the input point is located.
    
-   PosAlongnumber (non-negative)nullable
    
    The position along the digitized direction of the source line feature. This value is stored as a ratio. This attribute is null if the network location references a junction.
    
-   SideOfEdgeint enumnullable
    
    Allowed values: `1`, `2`
    
    The side of the edge in relation to the digitized direction of the line feature.
    
    This attribute is limited to a domain of two values:
    
    -   `1`: Right Side
    -   `2`: Left Side

-   CurbApproachint enumdefault:0
    
    Allowed values: `0`, `1`, `2`, `3`
    
    Specifies the direction a vehicle may arrive at and depart from the facility. The field value is specified as one of the following integers:
    
    -   `0`: Either side of vehicle. The vehicle can approach and depart the facility in either direction. U-turns are allowed. You should choose this setting if your vehicle can make a U-turn at the order or if it can pull into a driveway or parking lot and turn around.
    -   `1`: Right side of vehicle. When the vehicle approaches and departs the facility, the curb must be on the right side of the vehicle. A U-turn is prohibited.
    -   `2`: Left side of vehicle. When the vehicle approaches and departs the facility, the curb must be on the left side of the vehicle. A U-turn is prohibited.
    -   `3`: No U-turn. When the vehicle approaches the facility, the curb can be on either side of the vehicle; however, the vehicle must depart without turning around. [Learn more about U-turn policies](https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/u-turn-policies.htm)
    
    Show illustration
    
    | Setting | Coded value | Description |
    |---|---|---|
    | Either side of vehicle | 0 | The vehicle can approach and depart the facility in either direction, so a U-turn is allowed at the facility. This setting can be chosen if it is possible and desirable for a vehicle to turn around at the facility. This decision may depend on the width of the road and the amount of traffic or whether the location has a parking lot where vehicles can pull in and turn around.All arrival and departure combinations are allowed with the Either side of vehicle curb approach. |
    | Right side of vehicle | 1 | When the vehicle approaches and departs the facility, the facility must be on the right side of the vehicle. A U-turn is prohibited. This is typically used for vehicles such as buses that must arrive with the bus stop on the right side.The allowed arrival and departure combination for the Right side of vehicle curb approach is shown. |
    | Left side of vehicle | 2 | When the vehicle approaches and departs the facility, the facility must be on the left side of the vehicle. A U-turn is prohibited. This is typically used for vehicles such as buses that must arrive with the bus stop on the left side.The allowed arrival and departure combination for the Left side of vehicle curb approach is shown. |
    | No U-Turn | 3 | When the vehicle approaches the facility, the facility can be on either side of the vehicle; however, when it departs, the vehicle must continue in the same direction it arrived. A U-turn is prohibited.The allowed arrival and departure combinations for the No U-Turn curb approach are shown. |
    
    The `CurbApproach` attribute is designed to work with both types of national driving standards: right-hand traffic (United States) and left-hand traffic (United Kingdom). First, consider an incident on the left side of a vehicle. It is always on the left side regardless of whether the vehicle travels on the left or right half of the road. What may change with national driving standards is your decision to approach an incident from one of two directions, that is, so it ends up on the right or left side of the vehicle. For example, if you want to arrive at an incident and not have a lane of traffic between the vehicle and the incident, choose 1 (Right side of vehicle) in the United States and 2 (Left side of vehicle) in the United Kingdom.
    
    ![ Right side of vehicle with right-hand traffic](../images/CurbApproach_RightSide.png)
    
    _With right-hand traffic, the curb approach that leaves the vehicle closest to the incident is Right side of vehicle._
    
    ![ Left side of vehicle with left-hand traffic ](../images/CurbApproach_LeftSideDriving.png)
    
    _With left-hand traffic, the curb approach that leaves the vehicle closest to the incident is Left side of vehicle._
    

-   Attr\_\[Cost\]number (non-negative)default:0nullable
    
    The name of the attribute can be: `Attr_TravelTime`, `Attr_TruckTravelTime`, `Attr_Minutes`, `Attr_TruckMinutes`, `Attr_WalkTime`, `Attr_Miles`, `Attr_Kilometers`
    
    This attribute specifies how much additional time spent or distance traveled can occur at the facility. The value for this attribute is included in the total travel time or distance for the output [routes](#routes) and is also displayed in output [directionPoints](#directionpoints) as service time.
    
    The value for this attribute is specified in the units of the cost attribute. For instance, `Attr_TravelTime` is in minutes.
    
    Use case
    
    When a time-based cost attribute `TravelTime` is used, it will specify the travel time for cars, in minutes, that will be added to the total travel time of the route between the incident and the closest facility. The attribute value can be used to model the time spent at the incident.
    
    For example, if you are finding the three closest fire stations from a fire incident, the attribute can store the amount of time spent at the fire incident. This could be the time it takes for firefighters to hook up their equipment and begin fighting the fire. The value for this attribute is included in the total travel time for the route and is also displayed in driving directions as service time. `Attr_TravelTime` is only referenced if `TravelTime` is used in the analysis as impedance or accumulate attribute. A zero or null value indicates that the incident requires no service time.
    
    However, when a distance-based cost attribute like `Miles` is used, it specifies the distance in miles that will be added to the total distance of the route between the incident and the closest facility. Generally the locations of the incidents are not exactly on the streets but are set back somewhat from the road. The `Attr_Miles` attribute can be used to model the distance between the actual incident location and its location on the street if it is important to include that distance in the total travel distance. `Attr_Miles` is only referenced if `Miles` is used in the analysis as impedance or accumulate attribute.
    

-   Cutoff\_\[Cost\]number (non-negative)default:null
    
    Specify the travel time or distance at which to stop searching for facilities for a given incident.
    
    If `Cutoff_[Cost]` is not set for an incident, the service will use the value specified as the `defaultCutoff` parameter. The default value for this attribute is null, which causes the service to use the value set for the `defaultCutoff` parameter. If the `Cutoff_[Cost]` attribute is set to a value other than `null`, the `defaultCutoff` value is overridden.
    

-   Bearingnumber (non-negative)nullable
    
    The direction in which a point is moving. The units are degrees and are measured clockwise from true north.
    
    This attribute is used in conjunction with the `BearingTol` attribute. Bearing data is usually sent automatically from a mobile device equipped with a GPS receiver. Try to include bearing data if you are loading an input location that is moving, such as a pedestrian or a vehicle. Using this attribute tends to prevent adding locations to the wrong edges, which can occur when a vehicle is near an intersection or an overpass, for example. Bearing also helps the solver determine the side of the street that the point is on.
    
    [Learn more about bearing and bearing tolerance](https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/bearing-and-bearing-tolerance.htm)
    
-   BearingTolnumber (range: 0 - 180)default:30nullable
    
    The bearing tolerance value creates a range of acceptable bearing values when locating moving points on an edge using the `Bearing` attribute.
    
    If the `Bearing` attribute value is within the range of acceptable values that are generated from the bearing tolerance on an edge, the point can be added as a network location there; otherwise, the closest point on the next-nearest edge is evaluated. The units are in degrees. A value of 30 means that when Network Analyst attempts to add a network location on an edge, a range of acceptable bearing values is generated 15 degrees to either side of the edge (left and right) and in both digitized directions of the edge.
    
    [Learn more about bearing and bearing tolerance](https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/bearing-and-bearing-tolerance.htm)
    
-   NavLatencynumber (non-negative)nullable
    
    Indicates how much cost is expected to elapse from the moment GPS information is sent from a moving vehicle to a server and the moment the processed route is received by the vehicle's navigation device.
    
    This attribute is only used in the solve process if the `Bearing` and `BearingTol` fields also have values; however, providing a `NavLatency` attribute value is optional, even when values are present in the `Bearing` and `BearingTol`.
    

## Optional parameters

### returnCFRoutes

`boolean`optional

Default value: _false_

Specify whether the service will return routes.

-   `true`—Routes are returned. The routes are available in the [`routes`](#routes) property of the JSON response. The shape of the routes depends on the value for the `outputLines` parameter.
-   `false`—Routes are not returned.

### travelMode

[`travelMode`](../routing-data-types/#travel_mode_object)optional

Choose the mode of transportation for the analysis.

[Travel modes](https://enterprise.arcgis.com/en/portal/latest/use/travel-modes-analysis-mv.htm) are [managed and configured](https://enterprise.arcgis.com/en/portal/latest/administer/windows/travel-modes.htm) in ArcGIS Enterprise by the administrator of your organization to better reflect the organization's workflows.

### travelDirection

`string`optional

Default value: _esriNATravelDirectionToFacility_

**Allowed values:** `esriNATravelDirectionFromFacility`,`esriNATravelDirectionToFacility`

Specify how the travel direction for the closest facility search will be measured.

This parameter can be specified using the following values:

-   `esriNATravelDirectionFromFacility` —The direction of travel is from facilities to incidents.
-   `esriNATravelDirectionToFacility` —The direction of travel is from incidents to facilities.

Each option may find different facilities, as the travel time along some streets may vary based on the travel direction and one-way restrictions. For instance, a facility may be a 10-minute drive from the incident while traveling from the incident to the facility, but while traveling from the facility to the incident, it may be a 15-minute drive because of different travel time in that direction.

Fire departments commonly use the `esriNATravelDirectionFromFacility` value for the parameter since they are concerned with the time it takes to travel from the fire station (facility) to the location of the emergency (incident). A retail store (facility) is more concerned with the time it takes the shoppers (incidents) to reach the store; retail stores commonly use the `esriNATravelDirectionToFacility` parameter value.

### defaultTargetFacilityCount

`integer`optional

Default value: _1_

Specify the number of closest facilities to find per incident.

This is useful in situations in which multiple fire engines may be required from different fire stations, such as a fire. You can specify, for example, to find the three nearest fire stations to a fire. The value for this parameter can be overridden on a per-incident basis by specifying a value for the `TargetFacilityCount` attribute when specifying the [`incidents`](#incidents) parameter.

### defaultCutoff

`number`optional

type:double (non-negative)

The travel time or travel distance value at which to stop searching for facilities for a given incident.

For example, while finding the closest hospitals from the site of an accident, a cutoff value of 15 minutes means that the tool will search for the closest hospital within 15 minutes from the incident. If the closest hospital is 17 minutes away, no routes will be returned in the output routes. A cutoff value is especially useful when searching for multiple facilities.

The unit for this parameter is based on the unit of the impedance attribute specified using the `impedanceAttributeName` parameter or the `impedanceAttributeName` value of the travel mode if a travel mode is specified . If the [`impedanceAttributeName`](#impedanceAttributeName) parameter is `TravelTime`, the `defaultCutoff` value is specified in minutes. Otherwise, the value is specified in miles or kilometers based on whether the `impedanceAttributeName` parameter is set to `Miles` or `Kilometers`, respectively.

The value for the `defaultCutoff` parameter can be overridden on a per-incident or facility basis by specifying a value for the `Cutoff_[Impedance]` attribute when specifying the [`incidents`](#incidents) or the [`facilities`](#facilities) parameter values.

### timeOfDay

[`datetime`](../routing-data-types/#datetime)optional

Specify the time and date to depart from or arrive at incidents or facilities. You can also specify a value of `now`, to set the depart or arrive time to current time.

Specifying a time of day results in more accurate estimations of travel times because the travel times account for the traffic conditions that are applicable for that date and time.

To use traffic in the analysis, set `impedanceAttributeName` to `TravelTime`, and assign a `timeOfDay` value.

The `timeOfDay` value represents the target start time or arrive time of the routes in the analysis. The time is specified as Unix time (milliseconds since midnight, January 1, 1970).

If a value of `now` is passed to the `timeOfDay` parameter, the travel begins at the current time. This will also override the `timeOfDayIsUTC` parameter value to be `true`. When `timeOfDay` is `now` and `timeOfDayIsUTC` is `true`, the travel will begin or end at input locations at the current time regardless of the time zone of the input locations.

If a time of day is not passed in, the service uses static road speeds based on average historical speeds or posted speed limits. It uses posted speeds in areas where historical traffic information isn't available.

If the `timeOfDay` specified is within 4 hours of the current time, live traffic will be used where available. Live traffic retrieves speeds based on phone probe records, sensors, and other data sources and reflects the current travel speeds and predicts speeds for the near future. If the `timeOfDay` specified is earlier than 4 hours or later than 4 hours from the current time, or the road does not have live traffic, typical traffic speeds will be used. Typical speeds are based on historical traffic patterns. The travel time data is aggregated in 15 minute intervals per day of week based on multiple years worth of data. So a road may have a different travel time at Monday at 8 am, Monday at 8:15 am, or Tuesday at 8 am. Since the variance is just at the day of week and time of day, the travel time is the same on a road for any Monday at 8 am, regardless of the month or year.

If your goal is to model typical travel conditions and avoid large variances from the average due to live traffic, it is recommended to use a date from the past to ensure it doesn't coincide with the 4 hour window from the current time. As an extreme example, you can even use dates from 1990.

The [Data Coverage page](https://www.arcgis.com/home/webmap/viewer.html?webmap=b7a893e8e1e04311bd925ea25cb8d7c7) shows the countries Esri currently provides traffic data for.

The service support two kinds of traffic: live and typical.

#### Typical traffic

To ensure the task uses typical traffic in locations where it is available, choose a time and day of the week, and then convert the day of the week to one of the following dates from 1990:

-   Monday—1/1/1990
-   Tuesday—1/2/1990
-   Wednesday—1/3/1990
-   Thursday—1/4/1990
-   Friday—1/5/1990
-   Saturday—1/6/1990
-   Sunday—1/7/1990

Set the time and date as Unix time in milliseconds. For example, to solve for 1:03 p.m. on Thursdays, set the time and date to 1:03 p.m., January 4, 1990; and convert to milliseconds (`631458180000`). Although the dates representing days of the week are from 1990, typical traffic is calculated from recent traffic trends—usually over the last two years worth of data.

All facilities and incidents must be in the same time zone when you are doing any of the following:

-   Specifying a start time and traveling from incident to facility
-   Specifying an end time and traveling from facility to incident
-   Specifying a start time and traveling from facility to incident
-   Specifying an end time and traveling from incident to facility

#### Live traffic

To use live traffic when and where it is available, choose a time and date and convert to Unix time.

Esri saves live traffic data for 4 hours and references predictive data extending 4 hours into the future. If the time and date you specify for this parameter is outside the 8-hour time window, or the travel time in the analysis continues past the predictive data window, the task falls back to typical traffic speeds.

Show examples

**Typical traffic on Thursdays**

13:03, January 4, 1990. Typical traffic on Thursdays at 1:03 p.m.



```
{ "timeOfDay": 631458180000 }
```

**Typical traffic on Sundays**

17:00, January 7, 1990. Typical traffic on Sundays at 5:00 p.m.



```
{ "timeOfDay": 631731600000 }
```

**Live traffic speed**

10:20, March 18, 2015. If the current time is between 6:20 a.m., March 18, 2015, and 2:20 p.m., March 18, 2015, live traffic speeds are referenced in the analysis; otherwise, typical traffic speeds are referenced.



```
{ "timeOfDay": 1426674000000 }
```

**Specify value of `now`**

The analysis begins at the current time and live traffic speeds are referenced in the analysis.



```
{ "timeOfDay": "now" }
```

### timeOfDayIsUTC

`boolean`optional

Default value: _false_

Specify the time zone or zones of the [`timeOfDay`](/rest/services-reference/enterprise/timeofday/) parameter.

-   `false`—The `timeOfDay` value refers to the time zone or zones in which the input points are located. This option causes the analysis to have rolling start times across time zones.
    
    Illustration of setting the value to `false` (use geographically Local time zone)
    
    Setting `timeOfDay` to 9:00 a.m., January 4, 1990 (631443600000 milliseconds); `timeOfDayIsUTC` to `false`; and submitting a valid request causes the drive times for points in the eastern time zone to start at 9:00 a.m. eastern Time and 9:00 a.m. central time for points in the central time zone. (The start times are offset by an hour in real or UTC time.)
    
    ![Time zone for time of day parameter is set to geographically local](/rest/services-reference/enterprise/static/c20141afe0eb3257d1f76967700f4d55/b06ae/TimeZoneForTimeOfDay_GeoLocal.png)
    
    Input: `startTime` is 9:00 a.m., January 4, 1990 (631443600000 milliseconds), and `startTimeIsUTC` is set to `false`
    
-   `true`—The `timeOfDay` value refers to coordinated universal time (UTC). The start times for all points are simultaneous, regardless of time zones.
    
    Illustration of setting the value to `true` (use UTC)
    
    Setting `timeOfDay` to 9:00 a.m., January 4, 1990 (631443600000 milliseconds); `timeOfDayIsUTC` to `true`, the start times for points in the eastern time zone is 4:00 a.m. eastern Time and 3:00 a.m. central time for those in the central time zone.
    
    ![Time zone for time of day parameter is set to UTC](/rest/services-reference/enterprise/static/0d86db2d1613bf9e4a060075c8d908ad/b06ae/TimeZoneForTimeOfDay_utc.png)
    
    Input: `startTime` is 9:00 a.m., January 4, 1990 (631443600000 milliseconds), and `startTimeIsUTC` is set to `true`
    

### timeOfDayUsage

`string`optional

Default value: _esriNATimeOfDayUseAsStartTime_

**Allowed values:** `esriNATimeOfDayUseAsStartTime`, `esriNATimeOfDayUseAsEndTime`

The `timeOfDayUsage` parameter value represents the arrival or departure time for the routes. This parameter can be specified using the following values:

-   `esriNATimeOfDayUseAsStartTime`—The service finds the best route considering the `timeOfDay` parameter value as the departure time from the facility or incident.
-   `esriNATimeOfDayUseAsEndTime`—The service considers the `timeOfDay` parameter value as the arrival time at the facility or incident. This value is useful if you want to know what time to depart from a location so that you arrive at the destination at the time specified in `timeOfDay`.

The parameter value is ignored if the `timeOfDay` parameter value is `none`.

### useHierarchy

`boolean`optional

Default value: _true_

Specify whether hierarchy will be used when finding the shortest paths.

-   `true`—Use hierarchy when travelling between facilities and incidents. When hierarchy is used, the service prefers higher-order streets (such as freeways) to lower-order streets (such as local roads) and can be used to simulate the driver preference of traveling on freeways instead of local roads even if that means a longer trip. This is especially true when finding routes to faraway locations, because drivers on long-distance trips tend to prefer traveling on freeways where stops, intersections, and turns can be avoided. Using hierarchy is computationally faster, especially for long-distance routes, since the service can determine the best route from a relatively smaller subset of streets.
-   `false`—Do not use hierarchy when travelling between facilities and incidents. When hierarchy is not used, the service considers all the streets and doesn't prefer higher-order streets when finding the route. This is often used when finding short-distance routes within a city.

### restrictUTurns

`string`optional

Default value: _esriNFSBAllowBacktrack_

**Allowed values:** `esriNFSBAllowBacktrack`, `esriNFSBAtDeadEndsAndIntersections`, `esriNFSBAtDeadEndsOnly`, `esriNFSBNoBacktrack`

Specify whether to restrict or permit the route from making U-turns at junctions.

To understand the available parameter values, a junction is a point where only two streets intersect each other. If three or more streets intersect at a point, it is called as an intersection. A cul-de-sac is a dead-end.

Expand to learn more about the available parameter values

This parameter can have the following values:

| Parameter Value | Description |
|---|---|
| esriNFSBAllowBacktrack | U-turns are permitted everywhere. Permitting U-turns implies that the vehicle can turn around at a junction and double back on the same street.U-turns are permitted at junctions with any number of adjacent streets. |
| esriNFSBAtDeadEndsAndIntersections | U-turns are prohibited at junctions where exactly two adjacent streets meet.U-turns are permitted only at intersections or dead ends. |
| esriNFSBAtDeadEndsOnly | U-turns are prohibited at all junctions and intersections and are permitted only at dead ends.U-turns are permitted only at dead ends. |
| esriNFSBNoBacktrack | U-turns are prohibited at all junctions, intersections, and dead-ends. Even when this parameter value is chosen, a route can still make U-turns at stops. To prohibit U-turns at a stop, you can set its CurbApproach property to the appropriate value (3). |

### impedanceAttributeName

`string`optional

**Allowed values:** `TravelTime`, `Minutes`, `TruckTravelTime`, `TruckMinutes`, `WalkTime`, `Miles`, `Kilometers`

Specify the impedance.

Impedance is a value that quantifies travel along the transportation network. Travel distance is an example of impedance; it quantifies the length of walkways and road segments. Similarly, drive time—the typical time it takes to drive a car along a road segment—is an example of impedance. Drive times may vary by type of vehicle—for instance, the time it takes for a truck to travel along a path tends to be longer than a car—so there can be many impedance values representing travel times for different vehicle types. Impedance values may also vary with time; live and typical traffic reference dynamic impedance values. Each walkway and road segment stores at least one impedance value. When performing a network analysis, the impedance values are used to calculate the best results, such as finding the shortest route—the route that minimizes impedance—between two points.

The parameter can be specified using the following values:

-   `TravelTime`—Historical and live traffic data is used. This option is good for modeling the time it takes automobiles to travel along roads at a specific time of day using live traffic speed data where available. When using `TravelTime`, you can optionally set the TravelTime::Vehicle Maximum Speed (km/h) attribute parameter to specify the physical limitation of the speed the vehicle is capable of traveling.
-   `Minutes`—Live traffic data is not used, but historical average speeds for automobiles data is used.
-   `TruckTravelTime`—Historical and live traffic data is used, but the speed is capped at the posted truck speed limit. This is good for modeling the time it takes for the trucks to travel along roads at a specific time. When using `TruckTravelTime`, you can optionally set the TruckTravelTime::Vehicle Maximum Speed (km/h) attribute parameter to specify the physical limitation of the speed the truck is capable of traveling.
-   `TruckMinutes`—Live traffic data is not used, but the smaller of the historical average speeds for automobiles and the posted speed limits for trucks are used.
-   `WalkTime`—The default is a speed of 5 km/hr on all roads and paths, but this can be configured through the WalkTime::Walking Speed (km/h) attribute parameter.
-   `Miles`—Length measurements along roads are stored in miles and can be used for performing analysis based on shortest distance.
-   `Kilometers`—Length measurements along roads are stored in kilometers and can be used for performing analysis based on shortest distance.

### accumulateAttributeNames

`string`optional

Specify whether the service will accumulate values other than the value specified for `impedanceAttributeName`.

For example, if `impedanceAttributeName` is set to `TravelTime`, the total travel time for the route will be calculated by the service. However, if you also want to calculate the total distance of the route in miles, you can specify `Miles` as the value for the `accumulateAttributeNames` parameter.

The parameter value is specified as a comma-separated list of names. The parameter values are the same as the `impedanceAttributeName` parameter. For example, `accumulateAttributeNames=Miles,Kilometers` indicates that the total cost of the route will also be calculated in miles and kilometers.

### restrictionAttributeNames

`[string]`optional

Specify whether the restrictions will be honored by the service.

A restriction represents a driving preference or requirement. In most cases, restrictions cause roads or pathways to be prohibited, but they can also cause them to be avoided or preferred. For instance, using the `Avoid Toll Roads` restriction will result in a route that will include toll roads only when it is required to travel on toll roads to visit a stop. Use `Height Restriction` to route around clearances that are lower than the height of the vehicle. If the vehicle is carrying corrosive materials, you can use the `Any Hazmat Prohibited` restriction to prevent hauling the materials along roads where it is marked as illegal to do so.

This parameter value is specified as a comma-separated list of restriction names. A value of `null` indicates that no restrictions will be used when finding the best route, but only when `travelMode` is set to `null`.

Expand to see the restriction names supported by the service

| Restriction name | Description |
|---|---|
| Any Hazmat Prohibited | The results will not include roads where transporting any kind of hazardous material is prohibited. |
| Avoid Carpool Roads | The results will avoid roads that are designated exclusively for car pool (high-occupancy) vehicles. |
| Avoid Express Lanes | The results will avoid roads designated as express lanes. |
| Avoid Ferries | The results will avoid ferries. |
| Avoid Gates | The results will avoid roads where there are gates, such as keyed access or guard-controlled entryways. |
| Avoid Limited Access Roads | The results will avoid roads that are limited-access highways. |
| Avoid Private Roads | The results will avoid roads that are not publicly owned and maintained. |
| Avoid Roads Unsuitable for Pedestrians | The results will avoid roads that are unsuitable for pedestrians. |
| Avoid Stairways | The results will avoid all stairways on a pedestrian-suitable route. |
| Avoid Toll Roads | The results will avoid all toll roads for automobiles. |
| Avoid Toll Roads for Trucks | The results will avoid all toll roads for trucks. |
| Avoid Truck Restricted Roads | The results will avoid roads where trucks are not allowed, except when making deliveries. |
| Avoid Unpaved Roads | The results will avoid roads that are not paved (for example, dirt, gravel, and so on). |
| Axle Count Restriction | The results will not include roads where trucks with the specified number of axles are prohibited. The number of axles can be specified using the Number of Axles restriction parameter. |
| Driving a Bus | The results will not include roads where buses are prohibited. Using this restriction will also ensure that the results will honor one-way streets. |
| Driving a Taxi | The results will not include roads where taxis are prohibited. Using this restriction will also ensure that the results will honor one-way streets. |
| Driving a Truck | The results will not include roads where trucks are prohibited. Using this restriction will also ensure that the results will honor one-way streets. |
| Driving an Automobile | The results will not include roads where automobiles are prohibited. Using this restriction will also ensure that the results will honor one-way streets. |
| Driving an Emergency Vehicle | The results will not include roads where emergency vehicles are prohibited. Using this restriction will also ensure that the results will honor one-way streets. |
| Height Restriction | The results will not include roads where the vehicle height exceeds the maximum allowed height for the road. The vehicle height can be specified using the Vehicle Height (meters) restriction parameter. |
| Kingpin to Rear Axle Length Restriction | The results will not include roads where the vehicle length exceeds the maximum allowed kingpin to rear axle for all trucks on the road. The length between the vehicle kingpin and the rear axle can be specified using the Vehicle Kingpin to Rear Axle Length (meters) restriction parameter. |
| Length Restriction | The results will not include roads where the vehicle length exceeds the maximum allowed length for the road. The vehicle length can be specified using the Vehicle Length (meters) restriction parameter. |
| Preferred for Pedestrians | The results will use preferred routes suitable for pedestrian navigation. |
| Riding a Motorcycle | The results will not include roads where motorcycles are prohibited. Using this restriction will also ensure that the results will honor one-way streets. |
| Roads Under Construction Prohibited | The results will not include roads that are under construction. |
| Semi or Tractor with One or More Trailers Prohibited | The results will not include roads where semis or tractors with one or more trailers are prohibited. |
| Single Axle Vehicles Prohibited | The results will not include roads where vehicles with single axles are prohibited. |
| Tandem Axle Vehicles Prohibited | The results will not include roads where vehicles with tandem axles are prohibited. |
| Through Traffic Prohibited | The results will not include roads where through traffic (nonlocal traffic) is prohibited. |
| Truck with Trailers Restriction | The results will not include roads where trucks with the specified number of trailers on the truck are prohibited. The number of trailers on the truck can be specified using the Number of Trailers on Truck restriction parameter. |
| Use Preferred Hazmat Routes | The results will prefer roads that are designated for transporting hazardous materials. |
| Use Preferred Truck Routes | The results will prefer roads that are designated as truck routes, such as roads that are part of the national network as specified by the National Surface Transportation Assistance Act in the United States, or roads that are designated as truck routes by the state or province, or roads that are preferred by truckers when driving in an area. |
| Walking | The results will not include roads where pedestrians are prohibited. |
| Weight Restriction | The results will not include roads where the vehicle weight exceeds the maximum allowed weight for the road. The vehicle weight can be specified using the Vehicle Weight (kilograms) restriction parameter. |
| Weight per Axle Restriction | The results will not include roads where the vehicle weight per axle exceeds the maximum allowed weight per axle for the road. The vehicle weight per axle can be specified using the Vehicle Weight per Axle (kilograms) restriction parameter. |
| Width Restriction | The results will not include roads where the vehicle width exceeds the maximum allowed width for the road. The vehicle width can be specified using the Vehicle Width (meters) restriction parameter. |

### attributeParameterValues

`[object]`optional

Specify additional values required by an attribute or restriction, such as to specify whether the restriction prohibits, avoids, or prefers travel on restricted roads. If the restriction is meant to avoid or prefer roads, you can further specify the degree to which they are avoided or preferred using this parameter. For example, you can choose to never use toll roads, avoid them as much as possible, or prefer them.

The parameter value is specified as an array of objects each having the following attributes:

-   `attributeName` —The name of the restriction or the impedance attribute.
-   `parameterName` —The name of the parameter associated with the restriction or impedance attribute. An attribute can have one or more `parameterName` values based on its intended use, which implies you may need multiple `attributeParameterValues` for a single attribute name.
-   `value` —The value for the `parameterName` that is used by the service when evaluating the restriction or impedance attribute.

When specifying the `attributeParameterValues` for restrictions, each restriction (listed as `attributeName`) has a `parameterName` value, `Restriction Usage`, that specifies whether the restriction prohibits, avoids, or prefers travel on the roads associated with the restriction and the degree to which the roads are avoided or preferred.

The `value` for the `Restriction Usage` `parameterName` can be assigned any of the following string values or their equivalent numeric values listed in the parentheses:

-   `PROHIBITED` (`-1` )—Travel on the roads that have the restriction is prohibited.
-   `AVOID_HIGH` (`5` )—It is very unlikely the service will include in the route the roads that are associated with the restriction.
-   `AVOID_MEDIUM` (`2` )—It is unlikely the service will include in the route the roads that are associated with the restriction.
-   `AVOID_LOW` (`1.3` )—It is somewhat unlikely the service will include in the route the roads that are associated with the restriction.
-   `PREFER_LOW` (`0.8` )—It is somewhat likely the service will include in the route the roads that are associated with the restriction.
-   `PREFER_MEDIUM` (`0.5` )—It is likely the service will include in the route the roads that are associated with the restriction.
-   `PREFER_HIGH` (`0.2` )—It is very likely the service will include in the route the roads that are associated with the restriction.

See the default Restriction Usage values for the restrictions

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

#### Syntax and code sample for attribute parameter values



```
[
    {
        "attributeName": "<attribute1>",
        "parameterName": "<parameter1>",
        "value": "<value1>"
    },
    {
        "attributeName": "<attribute2>",
        "parameterName": "<parameter2>",
        "value": "<value2>"
    }
]
```

This example shows how to specify the height and weight of the vehicle for use with the height and weight restrictions, respectively, along with a high preference to include the designated truck routes. This results in a route that does not include roads where the clearance under overpasses or through tunnels is less than the vehicle height. The route will also not include roads with load-limited bridges or local roads that prohibit heavy vehicles if the vehicle weight exceeds the maximum permissible weight. However, the route will include as many roads as possible that are designated as preferred truck routes.

The `Restriction Usage` parameter for `Height Restriction` and `Weight Restriction` are not specified, as the default value of `PROHIBITED` will be used for these restriction parameters.



```
attributeParameterValues=
[
    {
        "attributeName": "Height Restriction",
        "parameterName": "Vehicle Height (meters)",
        "value": 4.12
    },
    {
        "attributeName": "Weight Restriction",
        "parameterName": "Vehicle Weight (kilograms)",
        "value": 36287
    },
    {
        "attributeName": "Use Preferred Truck Routes",
        "parameterName": "Restriction Usage",
        "value": "Prefer_High"
    }
]
```

### barriers

[`locations`](../routing-data-types/#locations)[`feature`](../routing-data-types/#feature)[`layer`](../routing-data-types/#layer)required

Specify one or more points that will act as temporary restrictions or represent additional time or distance that may be required to travel on the underlying streets. For example, a point barrier can be used to represent a fallen tree along a street or a time delay spent at a railroad crossing.

When specifying point barriers, you can set properties for each, such as its name or barrier type.

Show attributes for `barriers`

#### Attributes for barriers

-   Namestringnullable
    
    The name of the barrier.
    

-   ObjectIDinteger (non-negative)nullable
    
    The object ID of the barrier. `ObjectID` is a unique identifier for the barrier. If you want to maintain a relationship between the input and output, set `preserveObjectID` to `true` . The `ObjectID` value of the input barrier is included in the output barrier (as the `ObjectID` field) and can be used to join additional information from analysis outputs to the attribute of the barriers. If the `ObjectID` value is not specified, a unique ID is automatically generated in the output.
    

-   SourceIDinteger (non-negative)nullable
    
    The numeric identifier of the network dataset source feature class on which the input point is located.
    
-   SourceOIDinteger (non-negative)nullable
    
    The object ID of the feature in the source on which the input point is located.
    
-   PosAlongnumber (non-negative)nullable
    
    The position along the digitized direction of the source line feature. This value is stored as a ratio. This attribute is null if the network location references a junction.
    
-   SideOfEdgeint enum
    
    **Allowed values:** `1`, `2`
    
    The side of the edge in relation to the digitized direction of the line feature.
    
    This attribute is limited to a domain of two values:
    
    -   `1`: Right Side
    -   `2`: Left Side

-   BarrierTypeint enumdefault:0
    
    Allowed values: `0`, `2`
    
    Specify whether the point barrier restricts travel completely or adds time or distance when it is crossed.
    
    The value for this attribute is specified as one of the following integers:
    
    -   `0`: Restriction. Prohibits travel through the barrier. The barrier is referred to as a restriction point barrier since it acts as a restriction.
        
        ![Two maps demonstrate how a restriction point barrier affects a route analysis.](/rest/services-reference/enterprise/static/0c5bca357e5d80699d6d41b4b00ea2fe/efc6e/Point_Barriers.png)
        
        _The first map shows the shortest path between two stops without any restriction point barriers. The second map has a road that is blocked by a fallen tree, so the shortest path between the same points is longer._
        
    
    -   `2`: Added Cost. Traveling through the barrier increases the travel time or distance by the amount specified in the `Attr_[Cost]` attributes. This barrier type is referred to as an added cost point barrier.
    
    ![Two maps demonstrate how added cost point barriers affect a route analysis.](/rest/services-reference/enterprise/static/846748e04d86767f61cd6e21256c4d3d/dea13/nac_barriers_apoint.png)
    
    _The map on the left shows the shortest path between two stops without any added cost point barrier. For the map on the right, the travel time from stop one to stop two would be the same whether going around the north end of the block or the south end; however, since crossing railroad tracks incurs a time penalty (modeled with added cost point barriers), the route with only one railroad crossing is chosen. The cost of crossing the barrier is added to the accumulated travel time of the resulting route._
    
-   FullEdgeint enumdefault:0
    
    Allowed values: `0`, `1`
    
    Specify how the restriction point barriers are applied to the edge elements during the analysis
    
    -   `0`:False—Permits travel on the edge up to the barrier but not through it.
    -   `1`:True—Restricts travel anywhere on the associated edge.

-   Attr\_\[Cost\]number (non-negative)default:0
    
    Indicates how the cost (time or distance) is added when the barrier is traversed. This attribute is applicable only for added cost point barriers. The attribute value must be greater than or equal to zero.
    

### polylineBarriers

[`feature`](../routing-data-types/#feature)[`layer`](../routing-data-types/#layer)required

Specify one or more lines that prohibit travel anywhere the lines intersect the streets. For example, a parade or protest that blocks traffic across several street segments can be modeled with a line barrier. A line barrier can also quickly fence off several roads from being traversed, thereby channeling possible routes away from undesirable parts of the street network.

![Two maps demonstrate how a line barrier affects finding a route between two stops.](/rest/services-reference/enterprise/static/ab802e7eeb3a6913f2f2328c109831ef/6b9fd/Polyline_Barriers.png)

_The first map displays the shortest path between two stops. The second map shows the shortest path when several streets are blocked by a polyline barrier._

When specifying line barriers, you can set the name of each barrier using the following attribute:

Show attributes for `polylineBarriers`

#### Attributes for polylineBarriers

-   Namestring (length: 500)nullable
    
    The name of the barrier.
    

-   ObjectIDinteger (non-negative)nullable
    
    The object ID of the line barrier. `ObjectID` is a unique identifier for the line barrier. If you want to maintain a relationship between the input and output, set `preserveObjectID` to `true`. The `ObjectID` value of the input line barrier is included in the output line barrier (as the `ObjectID` field) and can be used to join additional information from analysis outputs to the attribute of the line barriers. If the `ObjectID` value is not specified, a unique ID is automatically generated in the output.
    

-   SourceIDinteger (non-negative)nullable
    
    The numeric identifier of the network dataset source feature class on which the input point is located.
    
-   SourceOIDinteger (non-negative)nullable
    
    The object ID of the feature in the source on which the input point is located.
    
-   PosAlongnumber (non-negative)nullable
    
    The position along the digitized direction of the source line feature. This value is stored as a ratio. This attribute is null if the network location references a junction.
    
-   SideOfEdgeint enum
    
    Allowed values: `1`, `2`
    
    The side of the edge in relation to the digitized direction of the line feature.
    
    This attribute is limited to a domain of two values:
    
    -   `1`: Right Side
    -   `2`: Left Side
-   BarrierTypeint enumdefault:0
    
    Allowed values: `0`, `1`
    
    Specify whether the point barrier restricts travel completely or adds time or distance when it is crossed.
    
    The value for this attribute is specified as one of the following integers:
    
    -   `0`: Restriction. Prohibits travel through the barrier. The barrier is referred to as a restriction line barrier since it acts as a restriction.
    -   `1`: Scaled Cost. Scales the time or distance required to travel the underlying streets by a factor specified using the `Attr_[Cost]` attribute.
-   Attr\_\[Cost\]number (non-negative)default:0
    
    This attribute is specific to scaled-cost barriers. It is the factor by which the cost of edges underlying the barrier are multiplied.
    

Show example

This example shows how to add two lines as polyline barriers to restrict travel on the streets intersected by the lines. Barrier 1 is a single-part line feature composed of two points. Barrier 2 is a two-part line feature. The first part is composed of three points, and the second part is composed of two points.



```
{
  "spatialReference": {
    "wkid": 102100
  },
  "features": [
    {
      "geometry": {
        "paths": [
          [
            [-10804823.397, 3873688.372],
            [-10804811.152, 3873025.945]
          ]
        ]
      },
      "attributes": {
        "Name": "Barrier 1"
      }
    },
    {
      "geometry": {
```

Expand

### polygonBarriers

[`feature`](../routing-data-types/#feature)[`layer`](../routing-data-types/#layer)required

Specify polygons that either completely restrict travel or proportionately scale the time or distance required to travel on the streets intersected by the polygons.

When specifying polygon barriers, you can set properties for each, such as its name or barrier type, using the following attributes:

Show attributes for `polygonBarriers`

#### Attributes for polygonBarriers

-   Namestringnullable
    
    The name of the barrier.
    

-   ObjectIDinteger (non-negative)nullable
    
    The object ID of the polygon barrier. `ObjectID` is a unique identifier for the polygon barrier. If you want to maintain a relationship between the input and output, set `preserveObjectID` to `true`. The `ObjectID` value of the input polygon barrier is included in the output polygon barrier (as the `ObjectID` field) and can be used to join additional information from analysis outputs to the attribute of the polygon barriers. If the `ObjectID` value is not specified, a unique ID is automatically generated in the output.
    

-   SourceIDinteger (non-negative)nullable
    
    The numeric identifier of the network dataset source feature class on which the input point is located.
    
-   SourceOIDinteger (non-negative)nullable
    
    The object ID of the feature in the source on which the input point is located.
    
-   PosAlongnumber (non-negative)nullable
    
    The position along the digitized direction of the source line feature. This value is stored as a ratio. This attribute is null if the network location references a junction.
    
-   SideOfEdgeint enum
    
    Allowed values: `1`, `2`
    
    The side of the edge in relation to the digitized direction of the line feature.
    
    This attribute is limited to a domain of two values:
    
    -   `1`: Right Side
    -   `2`: Left Side

-   BarrierTypeint enumdefault:0
    
    Allowed values: `0`, `1`
    
    Specify polygons that either completely restrict travel or proportionately scale the time or distance required to travel on the streets intersected by the polygons.
    
    The value for this attribute can be specified as one of the following integers:
    
    -   `0`: Restriction. Prohibits traveling through any part of the barrier. The barrier is referred to as a restriction polygon barrier since it prohibits traveling on streets intersected by the barrier. One use of this type of barrier is to model floods covering areas of the street that make traveling on those streets impossible.
        
        ![Two maps demonstrate how a restriction polygon barrier affects finding a route between two stops.](/rest/services-reference/enterprise/static/d7c18ab2599cb4536e9672b0f7a2b34d/55811/Polygon_Barriers.png)
        
        _The first map depicts the shortest path between two stops. The second map shows a polygon barrier blocking flooded streets, so the shortest path between the same two stops is different._
        
    
    -   `1`: Scaled Cost. Scales the cost (such as travel time or distance) required to travel the underlying streets by a factor specified using the `Attr_[Cost]` attributes.
        
        If the streets are partially covered by the barrier, the travel time or distance is apportioned and then scaled. For example, a factor of 0.25 means that travel on underlying streets is expected to be four times faster than normal. A factor of 3.0 means it is expected to take three times longer than normal to travel on underlying streets. This barrier type is referred to as a scaled-cost polygon barrier. It can be used to model storms that reduce travel speeds in specific regions, for example.
        
    
    ![Two maps demonstrate how a scaled cost polygon barrier affects finding a route between two stops.](/rest/services-reference/enterprise/static/008f3eafc237f727a91ed0991bb9b16b/0a47e/nac_barriers_spolygon.png)
    
    _The first map shows a route that goes through inclement weather without regard for the effect that poor road conditions have on travel time. The second map shows a scaled polygon barrier that doubles the travel time of the roads covered by the storm. The route still passes through the southern tip of the storm since it is quicker to spend more time driving slowly through a small part of the storm rather than driving completely around it. The service uses the modified travel time in calculating the best route, and the modified travel time is reported as the total travel time in the response._
    

-   Attr\_\[Cost\]number (non-negative)default:0
    
    This is the factor by which the cost of the streets intersected by the barrier is multiplied. This attribute is applicable only for scaled cost barriers. The attribute value must be greater than zero.
    

Show example

This example shows how to add two polygons as barriers. The first polygon, Flood zone, is a restriction polygon barrier that prohibits travel on the underlying streets. The polygon is a single-part polygon feature composed of four points. The second polygon, Severe weather zone, is a scaled-cost polygon barrier that reduces the travel time on underlying streets to one-third of the original value. The polygon is a two-part polygon feature. Both parts are composed of four points.



```
{
  "spatialReference": {
    "wkid": 4326
  },
  "features": [
    {
      "geometry": {
        "rings": [
          [
            [-97.0634, 32.8442],
            [-97.0554, 32.84],
            [-97.0558, 32.8327],
            [-97.0638, 32.83],
            [-97.0634, 32.8442]
          ]
        ]
      },
      "attributes": {
        "Name": "Flood zone",
        "BarrierType": 0
```

Expand

### returnDirections

`boolean`optional

Default value: _true_

Specify whether the service will generate driving directions for each route.

-   `true`—Directions will be generated and configured based on the value of the [`directionsLanguage`](#directionslanguage), [`directionsOutputType`](#directionsoutputtype) [`directionsStyleName`](#directionsstylename), and [`directionsLengthUnits`](#directionslengthunits) parameter. The directions are available in the `directions` property of the JSON response.
-   `false`—Directions will not be generated.

### directionsLanguage

`string`optional

Default value: _en_

Specify the language that will be used when generating travel directions.

This parameter applies only when the [`returnDirections`](#returndirections) parameter is set to `true`.

Show all supported languages

The service supports generating directions in the following languages:

-   `ar`: Arabic
-   `bg`: Bulgarian
-   `bs`: Bosnian
-   `ca`: Catalan
-   `cs`: Czech
-   `da`: Danish
-   `de`: German
-   `el`: Greek
-   `en`: English
-   `es`: Spanish
-   `et`: Estonian
-   `fi`: Finnish
-   `fr`: French
-   `he`: Hebrew
-   `hr`: Croatian
-   `hu`: Hungarian
-   `id`: Indonesian
-   `it`: Italian
-   `ja`: Japanese
-   `ko`: Korean
-   `lt`: Lithuanian
-   `lv`: Latvian
-   `nb`: Norwegian
-   `nl`: Dutch
-   `pl`: Polish
-   `pt-BR`: Portuguese (Brazil)
-   `pt-PT`: Portuguese (Portugal)
-   `ro`: Romanian
-   `ru`: Russian
-   `sk`: Slovak
-   `sl`: Slovenian
-   `sr`: Serbian
-   `sv`: Swedish
-   `th`: Thai
-   `tr`: Turkish
-   `uk`: Ukrainian
-   `vi`: Vietnamese
-   `zh-CN`: Chinese (China)
-   `zh-HK`: Chinese (Hong Kong)
-   `zh-TW`: Chinese (Taiwan)

The service searches for an exact match for the specified language including any language localization. If no exact match is found, it tries to match the language family. If a match is still not found, the service returns the directions using the default language of the server's operating system. For example, if the directions language is specified as `es-MX` (Mexican Spanish), the service will return the directions in Spanish, as it supports the es language code, not `es-MX`.

### directionsOutputType

`string`optional

Default value: _esriDOTStandard_

**Allowed values:** `esriDOTComplete`,`esriDOTCompleteNoEvents`, `esriDOTInstructionsOnly`, `esriDOTStandard`, `esriDOTSummaryOnly`, `esriDOTFeatureSets`

Specify the content and verbosity of the driving directions.

This parameter applies only when the [`returnDirections`](#returndirections) parameter is set to `true` and can be specified using the following values:

-   `esriDOTComplete`—The directions output includes all directions properties.
-   `esriDOTCompleteNoEvents`—The directions output includes all directions properties except events.
-   `esriDOTInstructionsOnly`—The directions output includes text instructions, time, length and ETA. The directions do not include geometry.
-   `esriDOTStandard`—The directions output includes text instructions, time, length, ETA, and geometry. The directions do not include events, new types of strings (street names, signposts information), maneuver type, bearings, or turn angle.
-   `esriDOTSummaryOnly`—The directions output contains a summary (time and length). Detailed text instructions and geometry are not included.
-   `esriDOTFeatureSets`—Setting this value will output [`directionPoints`](#directionpoints) and [`directionLines`](#directionlines) output parameters. The directions output includes two feature sets: direction points and direction lines. The direction points set contains point features representing the direction maneuvers such as arriving to or departing from a stop, turning left or right, and other events along the route. This feature set also contains the route's turn-by-turn directions. The direction lines set contains line features for each segment of the route. This feature set can be used to visualize the turn-by-turn directions on a map.

### directionsStyleName

`string`optional

Default value: _NA Desktop_

**Allowed values:** `NA Desktop`, `NA Navigation`, `NA Campus`

Specify the name of the formatting style for the directions. This parameter can be specified using the following values:

-   `NA Desktop`—Generates turn-by-turn directions suitable for printing.
-   `NA Navigation`—Generates turn-by-turn directions designed for an in-vehicle navigation device.

-   `NA Campus`—Generates turn-by-turn walking directions designed for pedestrian routes.

This parameter applies only when the [`returnDirections`](#returndirections) parameter is set to `true`.

### directionsLengthUnits

`string`optional

Default value: _esriNAUMiles_

**Allowed values:** `esriNAUFeet`, `esriNAUKilometers`, `esriNAUMeters`, `esriNAUMiles`, `esriNAUNauticalMiles`, `esriNAUYards`

Specify the units for displaying travel distance in the driving directions. This parameter applies only when the [`returnDirections`](#returndirections) parameter is set to `true`.

### directionsTimeAttributeName

`string`optional

Default value: _TravelTime_

**Allowed values:** `TravelTime`, `Minutes`, `TruckTravelTimes`, `TruckMinutes`, `WalkTime`

Specify the time-based impedance attribute to display the duration of a maneuver, such as "`Go northwest on Alvarado St. for 5 minutes.`"

The units for all the time attributes is minutes.

-   `TravelTime`—Travel time for a car.
-   `Minutes`—Travel time for a car without using live traffic data.
-   `TruckTravelTime`—Travel time for a truck.
-   `TruckMinutes`—Travel time for a truck without using live traffic data.
-   `WalkTime`—Travel time for a pedestrian.

### outputLines

`string`optional

Default value: _esriNAOutputLineTrueShape_

**Allowed values:** `esriNAOutputLineTrueShape`, `esriNAOutputLineTrueShapeWithMeasure`, `esriNAOutputLineStraight`, `esriNAOutputLineNone`

Specify the type of route features that are output by the service. This parameter is applicable only if the [`returnCFRoutes`](#returncfroutes) parameter is set to `true`. The `outputLines` parameter can have one of the following values:

-   `esriNAOutputLineTrueShape`—Return the exact shape of the resulting route that is based on the underlying streets.
-   `esriNAOutputLineTrueShapeWithMeasure`—Return the exact shape of the resulting route that is based on the underlying streets and include route measurements that keep track of the cumulative travel time or travel distance along the route relative to the first stop. When this value is chosen for the `outputLines` parameter, each point in the route shape will include an m-value along with an x-value and a y-value. The m-value, also known as the measure value, indicates the accumulated travel time or travel distance at that point along the route. The m-values can be used to determine how far you have traveled from the start of the route or the remaining distance or time left to reach the destination. The m-values are in the same units as the impedance attribute.
-   `esriNAOutputLineStraight`—Return a straight line between the stops.

-   `esriNAOutputLineNone`—Do not return any shapes for the routes. This value can be useful when you are only interested in determining the total travel time or travel distance of the route. For example, if the application has calculated the route and after some time it will calculate the estimated time of arrival (ETA) to the destination, you can set the [`returnCFRoutes`](#returncfroutes) parameter to `true` and the `outputLines` parameter to `esriNAOutputLineNone`. The `routes` property of the JSON response will only contain the total travel time that can be used to determine the ETA. Since the route shape is not returned when using the `esriNAOutputLineNone` value, the response size will be considerably smaller.

### returnFacilities

`boolean`optional

Default value: _false_

Specify whether facilities will be returned by the service.

-   `true`—The facilities used as input will be returned as part of the `facilities` property in the JSON response.
-   `false`—The facilities are not returned.

If you specified the `facilities` parameter value using a REST query request to any ArcGIS Server feature, map, or geoprocessing service that returns a JSON feature set, you can set the `returnFacilities` parameter to `true` so you can draw the facility locations in the application. You can also set the `returnFacilities` property to `true` to determine whether the facilities were successfully located on the street network or had other errors by reviewing the `Status` property in the JSON response.

### returnIncidents

`boolean`optional

Default value: _false_

Specify whether incidents will be returned by the service.

-   `true`—The incidents used as input will be returned as part of the `incidents` property in the JSON response.
-   `false`—The incidents are not returned.

If you specified the `incidents` parameter value using a REST query request to any ArcGIS Server feature, map, or geoprocessing service that returns a JSON feature set, you can set the `returnIncidents` parameter to `true` so you can draw the incident locations in the application. You can also set the `returnIncidents` property to `true` to determine whether the incidents were successfully located on the street network or had other errors by reviewing the `Status` property in the JSON response.

### returnBarriers

`boolean`optional

Default value: _false_

Specify whether barriers will be returned by the service

-   `true`—The input point barriers are returned as part of the `barriers` property in the JSON response.
-   `false`—Point barriers are not returned.

For this parameter to take effect, you must also specify a value for the `barriers` parameter.

If you specified the [`barriers`](#barriers) parameter value using a REST query request to any ArcGIS Server feature, map, or geoprocessing service that returns a JSON feature set, you can set the `returnBarriers` parameter to `true` so you can draw the point barrier locations in the application. You can also set the `returnBarriers` property to `true` to see where the barriers were located on the street network or, if they weren't located, understand what the problem was by reviewing the `Status` property in the JSON response.

### returnPolylineBarriers

`boolean`optional

Default value: _false_

Specify whether polyline barriers will be returned by the service.

-   `true`—The input polyline barriers are returned as part of the `polylineBarriers` property in the JSON response.
-   `false`—Polyline barriers are not returned.

For this parameter to take effect, you must also specify a value for the [`polylineBarriers`](#polylinebarriers) parameter.

If you specified the `polylineBarriers` parameter value using a REST query request to any ArcGIS Server feature, map, or geoprocessing service that returns a JSON feature set, you can set the `returnPolylineBarriers` parameter to `true` so you can draw the polyline barrier locations in the application.

### returnPolygonBarriers

`boolean`optional

Default value: _false_

Specify whether polygon barriers will be returned by the service.

-   `true`—The input polygon barriers are returned as part of the `polygonBarriers` property in the JSON response.
-   `false`—Polygon barriers are not returned.

For this parameter to take effect, you must also specify a value for the [`polygonBarriers`](#polygonbarriers) parameter.

If you specified the `polygonBarriers` parameter value using a REST query request to any ArcGIS Server feature, map, or geoprocessing service that returns a JSON feature set, you can set the `returnPolygonBarriers` parameter to `true` so you can draw the polygon barrier locations in the application.

### returnTraversedEdges

`boolean`optional

Default value: _false_

Specify whether traversed edges will be returned by the service.

-   `true`—The traversed edges are returned as part of the JSON response.
-   `false`—The traversed edges are not returned.

When this parameter is set to `true`, the traversed edges are available in the [`traversedEdges`](#traversededges) property of the JSON response.

### returnTraversedJunctions

`boolean`optional

Default value: _false_

Specify whether traversed junctions will be returned by the service.

-   `true`—The traversed junctions are returned as part of the JSON response.
-   `false`—The traversed junctions are not returned.

When this parameter is set to `true` the traversed junctions are available in the [`traversedJunctions`](#traversedjunctions) property of the JSON response.

### returnTraversedTurns

`boolean`optional

Default value: _false_

Specify whether traversed turns will be returned by the service.

-   `true`—The traversed turns are returned as part of the JSON response.
-   `false`—The traversed turns are not returned.

When this parameter is set to `true`, the traversed turns are available in the [`traversedTurns`](#traversedturns) property of the JSON response.

### returnZ

`boolean`optional

Default value: _false_

Specify whether include z-values for the returned geometries if supported by the underlying network.

-   `true`—The output geometries will have a z-value.
-   `false`—No x-value is returned.

### ignoreInvalidLocations

`boolean`optional

Default value: _true_

Specify whether invalid input locations will be ignored.

-   `true`—Network locations that are unlocated will be ignored and the analysis will run using valid network locations only. The analysis will also continue if locations are on non-traversable elements or have other errors. This is useful if you know the network locations are not all correct, but you want to run the analysis with the network locations that are valid.
-   `false`—Invalid locations will not be ignored. Any invalid point in the request will cause the service to return a failure.

### outSR

[`context_object`](../routing-data-types/#context_object)required

This parameter contains additional settings that affect task operation, for example, the spatial reference of the output features.

### outputGeometryPrecision

`number`optional

Default value: _10_

Specify the simplification level for the route geometry returned by the service.

Simplification maintains critical points on a route, such as turns at intersections, to define the essential shape of the route and removes other points. The simplification distance you specify is the maximum allowable offset that the simplified line can deviate from the original line. Simplifying a line reduces the number of vertices that are part of the route geometry. This reduces the overall response size and also improves the performance for drawing the route shapes in applications.

The units are specified using the [`outputGeometryPrecisionUnits`](#outputgeometryprecisionunits) parameter.

### outputGeometryPrecisionUnits

`string`optional

Default value: _esriMeters_

**Allowed values:** `esriCentimeters`, `esriDecimalDegrees`, `esriDecimeters`, `esriFeet`, `esriInches`, `esriKilometers`, `esriMeters`, `esriMiles`, `esriMillimeters`, `esriNauticalMiles`, `esriPoints`, `esriYards`

Specify the units for the `outputGeometryPrecision` parameter value.

### geometryPrecision

`integer`optional

Specify the number of decimal places that will be used in the response geometries returned by the solve operation. This applies to x- and y-values only (not m- or z-values).



```
geometryPrecision = 3
```

### geometryPrecisionM

`integer`optional

Specify the number of decimal places that will be used in the response geometries returned by the solve operation. This applies to m-values only (not x-, y-, or z-values).



```
geometryPrecisionM = 3
```

### geometryPrecisionZ

`integer`optional

Specify the number of decimal places that will be used in the response geometries returned by the solve operation. This applies to z-values only (not x-, y-, or m-values).



```
geometryPrecisionZ = 3
```

### overrides

### preserveObjectID

`boolean`optional

Default value: _false_

Specify whether the object IDs specified for input locations such as facilities, incidents, or barriers will be preserved when the input locations are returned as output. This can be useful if you want to associate additional attributes with the output locations after the solve operation is successful and need a common key field to do the join.

For example, the input incidents are specified as the following JSON representation of a feature set:



```
{
  "spatialReference": {
    "wkid": 4326
  },
  "features": [
    {
      "geometry": {
        "x": -122.4079,
        "y": 37.78356
      },
      "attributes": {
        "ObjectID": 30,
        "Name": "Fire Station 34"
      }
    },
    {
      "geometry": {
        "x": -122.404,
        "y": 37.782
      },
```

Expand

If you solve a closest facility and specify `preserveObjectID=false`, the output incidents will have object IDs of 1, 2 and the output facilities will have object IDs 1,2, even though the input incidents have object IDs of 10, 20 and the input facilities have object IDs 30,40. However, if `preserveObjectID=true`, the output incidents and facilities will preserve the object ID from the inputs.

### returnEmptyResults

`boolean`optional

Default value: _false_

Specify whether the service will return empty results instead of the error property when the request fails.

-   `true`—The JSON response doesn't contain the error property when the request fails. All errors are returned in the messages property. The response JSON may contain an empty feature set or empty result for the properties you requested.
-   `false`—The JSON response only contains the error property when the request fails.

Typically when a request fails, the service will return a JSON response that contains the error property. In some cases, you might want to set `returnEmptyResults` to `true` so it always returns properties you requested instead of returning an error response to help handle the response in a more consistent way.

Even if the request fails, when you set `returnEmptyResults= true` and `returnStops= true`, you can return stops to investigate why some of them failed to locate.

### locateSettings

[`locateSettings`](../routing-data-types/#locate_settings_object)optional

Specify settings that affect how inputs are located, such as the maximum search distance to use when locating the inputs on the network or the network sources being used for locating.

You can specify locate settings and can override locate settings for individual features such as, incidents, facilities, barriers, polylineBarriers, and polygonBarriers through locator JSON object.

Show examples

#### Examples for locate settings

**Specify locate settings using a JSON structure**

This example shows how to specify locate settings so inputs are only located within 500 meters of the specified location. A small search tolerance like this can be helpful if you are solving using a walking travel mode and don't want inputs to be located farther than 500 meters from the original point location.



```
{
  "default": {
    "tolerance": 500,
    "toleranceUnits": "esriMeters",
    "allowAutoRelocate": true,
    "sources": [
      {
        "name": "Routing_Streets"
      }
    ]
  }
}
```

**Specify locate settings and locate settings overrides for some inputs using a JSON structure**

This example shows how to specify locate settings to prevent orders and depots from locating on highway ramps. The locate settings allow locating on the Routing\_Streets source. For orders and depots, the `overrides` option is used to specify a where clause for the Routing\_Streets source to prevent locating on highway ramps (a `ROAD_CLASS` attribute value of 3). With this `locate_settings` JSON, orders and depots cannot locate on highway ramps, but barriers can because they use the default locate settings, which do not include a where clause.



```
{
  "default": {
    "tolerance": 20,
    "toleranceUnits": "esriKilometers",
    "allowAutoRelocate": true,
    "sources": [
      {
        "name": "Routing_Streets"
      }
    ]
  },
  "overrides": {
    "orders": {
      "sources": [
        {
          "name": "Routing_Streets",
          "where": "ROAD_CLASS <> 3"
        }
      ]
    },
```

Expand

**Specify locate settings and locate settings overrides using a JSON structure so different inputs are located using different sources**

This example shows how to specify locate settings to locate inputs on the Routing\_Streets source feature class while permitting point barriers to only locate on the system junctions feature class (Routing\_ND\_Junctions).



```
{
  "default": {
    "tolerance": 20,
    "toleranceUnits": "esriKilometers",
    "allowAutoRelocate": true,
    "sources": [
      {
        "name": "Routing_Streets"
      }
    ]
  },
  "overrides": {
    "point_barriers": {
      "sources": [
        {
          "name": "Routing_ND_Junctions"
        }
      ]
    }
  }
```

Expand

## Response objects

The JSON response from the closest facility service is based on the following syntax. The actual properties returned in the response depend upon the request parameters. For example, the routes property is returned only if the `returnCFRoutes` parameter is set to `true` . If a request fails, the JSON response only contains the error property.

For a list of error codes and details, go to [Direct request error codes](/rest/services-reference/enterprise/naserver-error-codes/)

The examples in the subsequent section illustrate the response returned with specific request parameters.



```
{
  "routes": {
    "spatialReference": "{<spatialReference>}",
    "features": [
      {
        "attributes": {
          "<field1>": "value11",
          "<field2>": "value12"
        },
        "geometry": "{<polyline1>}"
      },
      {
        "attributes": {
          "<field1>": "value21",
          "<field2>": "value22"
        },
        "geometry": "{<polyline2>}"
      }
    ]
  },
```

Expand

On successful completion, the service returns the best route and travel directions between the incident and the chosen facility and the status indicating whether the analysis was successful using the following response objects:

### routes

[`feature`](../routing-data-types/#feature)optional

Provides access to the resulting route or routes between the facilities and the incidents.

Show attributes for output routes

-   ObjectIDinteger
    
    The system-managed ID field.
    

-   Namestring (length: 500)nullable
    
    The name of the closest facility route is based on the names of the associated facility and incident.
    
    The facility name is first if the value for the `travelDirection` property on the analysis object is set to `esriNATravelDirectionFromFacility`. For example, Facility 5 - Incident 3 indicates that the route travels from Facility 5 to Incident 3.
    
    If `esriNATravelDirectionToFacility` is specified as the value for the `travelDirection` property, the incident name is first, for example, Incident 3 — Facility 5 .
    
-   FacilityRankintegernullable
    
    The rank of the facility among all facilities found for the associated incident; the closest facility has a rank of 1.
    
-   FacilityIDintegernullable
    
    The unique ID of the facility the route visits.
    
    If you specify `preserveObjectID=false`, the value for this field will be a system-generated ID. If `preserveObjectID=True`, the value for this field will be the `ObjectID` of your associated input.
    

-   IncidentIDintegernullable
    
    The unique ID of the incident the route visits.
    
    If you specify `preserveObjectID=false`, the value for this field will be a system-generated ID. If `preserveObjectID=True`, the value for this field will be the `ObjectID` of your associated input.
    
-   FacilityCurbApproachint enumnullable
    
    **Possible values:** `1`, `2`
    
    The side of the vehicle the facility is on when arriving at or departing from the facility.
    
    -   `1`—Indicates the right side of vehicle
    -   `2`—Indicates the left side of vehicle
-   IncidentCurbApproachintegernullable
    
    **Possible values:** `1`, `2`
    
    The side of the vehicle the incident is on when arriving at or departing from the incident.
    
    -   `1`—Indicates the right side of vehicle
    -   `2`—Indicates the left side of vehicle

-   StartTime[datetime](../routing-data-types#datetime)nullable
    
    The start time of the route, reported in the time zone in which the first stop is located.
    
-   EndTime[datetime](../routing-data-types#datetime)nullable
    
    The end time of the route, reported in the time zone in which the last stop is located.
    
-   StartTimeUTC[datetime](../routing-data-types#datetime)nullable
    
    The start time of the route in coordinated universal time (UTC).
    
-   EndTimeUTC[datetime](../routing-data-types#datetime)nullable
    
    The end time of the route in coordinated universal time (UTC).
    

-   Total\_\[Cost\]number (non-negative)nullable
    
    The total distance, time, or other travel cost from the beginning of the first stop to the end of the last stop. The total travel cost and the `Attr_[Cost]` of the visited stops are included in this value.
    
    This field will be populated if the `[Cost]` part of this field is used as impedance attribute or accumulated attributes.
    

### facilities

[`feature`](../routing-data-types/#feature)optional

Provides access to the facilities that were closest to the incidents. It provides the location of the facilities and attribute information from the corresponding input facilities.

Show attributes for output facilities

-   ObjectIDinteger
    
    If you specify `preserveObjectID=false`, the value for this field will be a system-generated ID. If `preserveObjectID=True`, the value for this field will be the `ObjectID` of your associated input.
    

-   Namestring (length: 500)nullable
    
    The name of the facility. The values for this field are copied from the `Name` field on the input facilities.
    

-   SourceIDinteger (non-negative)nullable
    
    The numeric identifier of the network dataset source feature class on which the input point is located.
    
-   SourceOIDinteger (non-negative)nullable
    
    The object ID of the feature in the source on which the input point is located.
    
-   PosAlongnumber (non-negative)nullable
    
    The position along the digitized direction of the source line feature. This value is stored as a ratio. This attribute is null if the network location references a junction.
    
-   SideOfEdgeint enumnullable
    
    Allowed values: `1`, `2`
    
    The side of the edge in relation to the digitized direction of the line feature.
    
    This attribute is limited to a domain of two values:
    
    -   `1`: Right Side
    -   `2`: Left Side

-   CurbApproachintegernullable
    
    The direction a vehicle may arrive at and depart from the facility. The values for this field are copied from the `CurbApproach` field on the input facilities.
    

-   Statusint enum
    
    Indicates the status of the point with respect to its location on the network and the outcome of the analysis.
    
    Possible values:
    
    -   `0`: OK.The point was located on the network.
    -   `1`: Not Located. The point was not located on the network and was not included in the analysis.
    -   `2`: Network element not located. The network element identified by the point's network location fields cannot be found. This can occur when a network element where the point should be was deleted, and the network location was not recalculated.
    -   `3`: Element not traversable. The network element that the point is located on is not traversable. This can occur when the element is restricted by a restriction attribute.
    -   `4`: Invalid Field Values. Field values fall outside a range or coded-value domain. For example, a negative number exists where positive numbers are required.
    -   `5`: Not reached. The point cannot be reached by the solver. The point may be on a separate, disconnected area of the network from the other inputs, or barriers or restrictions prevent travel to or from the point.
    -   `6`: Time window violation. The point could not be reached within the designated time windows. This status only applies to network analysis types that support time windows.
    -   `7`: Not located on closest. The closest network location to the point is not traversable because of a restriction or barrier, so the point has been located on the closest traversable network feature instead. If time windows are used and the route arrives early or late, the value changes to 6 (Time window violation)

-   SnapXnumber (non-negative)
    
    The x-coordinate of the position on the network dataset where the point was located, in the coordinate system of the network dataset.
    
-   SnapYnumber (non-negative)
    
    The y-coordinate of the position on the network dataset where the point was located, in the coordinate system of the network dataset.
    
-   SnapZnumber (non-negative)
    
    The z-coordinate of the position on the network dataset where the point was located, in the coordinate system of the network dataset. The `SnapZ` attribute is 0 if the network is two-dimensional.
    
-   DistanceToNetworkInMetersnumber (non-negative)
    
    The distance in meters between the point's geographic location and the position where it was located on the network.
    

-   Attr\_\[Cost\]number (non-negative)nullable
    
    This field stores an extra cost for the network location.
    

-   Cutoff\_\[Cost\]number (non-negative)nullable
    
    While searching for the closest incident from a facility, a cutoff value for the impedance can be used. Any incident beyond the cutoff value will not be searched.
    
    If the Cutoff\_\[Cost\] value is not set for a facility, the analysis will use the [`defaultCutoff`](#defaultcutoff) value. If the `defaultCutoff` value is not set on the service, the closest incident will be found, regardless of how far it may be.
    

### incidents

[`feature`](../routing-data-types/#feature)optional

Provides access to the locations used as starting or ending points in a closest facility analysis.

Show attributes for output incidents

-   ObjectIDinteger
    
    If you specify `preserveObjectID=false`, the value for this field will be a system-generated ID. If `preserveObjectID=True`, the value for this field will be the `ObjectID` of your associated input.
    

-   Namestring (length: 500)nullable
    
    The name of the incident. The values for this field are copied from the `Name` field on the input incidents.
    
-   TargetFacilityCountstring (length: 500)nullable
    
    The number of facilities that need to be found for the given incident. The values for this field are copied from the `TargetFacilityCount` field on the input incident.
    

-   SourceIDinteger (non-negative)nullable
    
    The numeric identifier of the network dataset source feature class on which the input point is located.
    
-   SourceOIDinteger (non-negative)nullable
    
    The object ID of the feature in the source on which the input point is located.
    
-   PosAlongnumber (non-negative)nullable
    
    The position along the digitized direction of the source line feature. This value is stored as a ratio. This attribute is null if the network location references a junction.
    
-   SideOfEdgeint enumnullable
    
    Allowed values: `1`, `2`
    
    The side of the edge in relation to the digitized direction of the line feature.
    
    This attribute is limited to a domain of two values:
    
    -   `1`: Right Side
    -   `2`: Left Side

-   CurbApproachintegernullable
    
    The direction a vehicle may arrive at and depart from the incident. The values for this field are copied from the `CurbApproach` field on the input incident.
    

-   Statusint enum
    
    Indicates the status of the point with respect to its location on the network and the outcome of the analysis.
    
    Possible values:
    
    -   `0`: OK.The point was located on the network.
    -   `1`: Not Located. The point was not located on the network and was not included in the analysis.
    -   `2`: Network element not located. The network element identified by the point's network location fields cannot be found. This can occur when a network element where the point should be was deleted, and the network location was not recalculated.
    -   `3`: Element not traversable. The network element that the point is located on is not traversable. This can occur when the element is restricted by a restriction attribute.
    -   `4`: Invalid Field Values. Field values fall outside a range or coded-value domain. For example, a negative number exists where positive numbers are required.
    -   `5`: Not reached. The point cannot be reached by the solver. The point may be on a separate, disconnected area of the network from the other inputs, or barriers or restrictions prevent travel to or from the point.
    -   `6`: Time window violation. The point could not be reached within the designated time windows. This status only applies to network analysis types that support time windows.
    -   `7`: Not located on closest. The closest network location to the point is not traversable because of a restriction or barrier, so the point has been located on the closest traversable network feature instead. If time windows are used and the route arrives early or late, the value changes to 6 (Time window violation)

-   SnapXnumber (non-negative)
    
    The x-coordinate of the position on the network dataset where the point was located, in the coordinate system of the network dataset.
    
-   SnapYnumber (non-negative)
    
    The y-coordinate of the position on the network dataset where the point was located, in the coordinate system of the network dataset.
    
-   SnapZnumber (non-negative)
    
    The z-coordinate of the position on the network dataset where the point was located, in the coordinate system of the network dataset. The `SnapZ` attribute is 0 if the network is two-dimensional.
    
-   DistanceToNetworkInMetersnumber (non-negative)
    
    The distance in meters between the point's geographic location and the position where it was located on the network.
    

-   Attr\_\[Cost\]number (non-negative)nullable
    
    This field stores an extra cost for the network location.
    

-   Cutoff\_\[Cost\]number (non-negative)nullable
    
    The cutoff value indicates the farthest network distance to search for a facility. Any facility farther from the incident than the cutoff value will not be searched or included in the results.
    
    If the Cutoff\_\[Cost\] value is not set for an incident, the analysis will use the [`defaultCutoff`](#defaultcutoff) value. If the `defaultCutoff`value is not set on the service, the closest facility will be found, regardless of how far it may be.
    

### barriers

[`locations`](../routing-data-types/#locations)[`feature`](../routing-data-types/#feature)optional

Provides access to points that act as temporary restrictions or represent additional time or distance that may be required to travel on the underlying streets.

Show attributes for `barriers` output parameter

-   ObjectIDinteger
    
    If you specify `preserveObjectID=false`, the value for this field will be a system-generated ID. If `preserveObjectID=True`, the value for this field will be the `ObjectID` of your associated input.
    
-   Namestring (length: 500)
    
    The name of the barrier.
    

-   SourceIDinteger (non-negative)nullable
    
    The numeric identifier of the network dataset source feature class on which the input point is located.
    
-   SourceOIDinteger (non-negative)nullable
    
    The object ID of the feature in the source on which the input point is located.
    
-   PosAlongnumber (non-negative)nullable
    
    The position along the digitized direction of the source line feature. This value is stored as a ratio. This attribute is null if the network location references a junction.
    
-   SideOfEdgeint enumnullable
    
    Allowed values: `1`, `2`
    
    The side of the edge in relation to the digitized direction of the line feature.
    
    This attribute is limited to a domain of two values:
    
    -   `1`: Right Side
    -   `2`: Left Side

-   CurbApproachint enumdefault:0
    
    Possible values: `0`, `1`, `2`
    
    The direction of traffic that is affected by the barrier. The field value is specified as one of the following integers:
    
    -   `0`: Either side of vehicle. The barrier affects travel over the edge in both directions.
    -   `1`: Right side of vehicle. Vehicles are only affected if the barrier is on their right side during the approach. Vehicles that traverse the same edge but approach the barrier on their left side are not affected by the barrier.
    -   `2`: Vehicles are only affected if the barrier is on their left side during the approach. Vehicles that traverse the same edge but approach the barrier on their right side are not affected by the barrier.

-   Statusint enum
    
    Indicates the status of the point with respect to its location on the network and the outcome of the analysis.
    
    Possible values:
    
    -   `0`: OK.The point was located on the network.
    -   `1`: Not Located. The point was not located on the network and was not included in the analysis.
    -   `2`: Network element not located. The network element identified by the point's network location fields cannot be found. This can occur when a network element where the point should be was deleted, and the network location was not recalculated.
    -   `3`: Element not traversable. The network element that the point is located on is not traversable. This can occur when the element is restricted by a restriction attribute.
    -   `4`: Invalid Field Values. Field values fall outside a range or coded-value domain. For example, a negative number exists where positive numbers are required.
    -   `5`: Not reached. The point cannot be reached by the solver. The point may be on a separate, disconnected area of the network from the other inputs, or barriers or restrictions prevent travel to or from the point.
    -   `6`: Time window violation. The point could not be reached within the designated time windows. This status only applies to network analysis types that support time windows.
    -   `7`: Not located on closest. The closest network location to the point is not traversable because of a restriction or barrier, so the point has been located on the closest traversable network feature instead. If time windows are used and the route arrives early or late, the value changes to 6 (Time window violation)

-   FullEdgeint enum
    
    Possible values: `0`, `1`
    
    Point barriers are applied to the edge elements during the analysis. The field value is specified as one of the following integers
    
    -   `0`:False. Permits travel on the edge up to the barrier but not through it.
    -   `1`:True. Restricts travel anywhere on the associated edge.
-   BarrierTypeint enum
    
    Possible values: `0`, `2`
    
    Specify whether the point barrier restricts travel completely or adds time or distance when it is crossed. The value for this attribute is specified as one of the following integers:
    
    -   `0`:Restriction. Prohibits travel through the barrier. The barrier is referred to as a restriction point barrier since it acts as a restriction.
    -   `2`:Added Cost. Traveling through the barrier increases the travel time or distance by the amount specified in the `Attr_[Cost]` attribute.
-   Attr\_\[Cost\]number (non-negative)default:0
    
    This attribute is specific to added-cost barriers and is limited to values that are greater than or equal to zero. It indicates how much cost is added when the barrier is traversed.
    

### polylineBarriers

[`feature`](../routing-data-types/#feature)optional

Provides access to one or more lines that prohibit travel anywhere the lines intersect the streets.

Show attributes for `polylineBarriers` output parameter

-   ObjectIDinteger
    
    If you specify `preserveObjectID=false`, the value for this field will be a system-generated ID. If `preserveObjectID=True`, the value for this field will be the `ObjectID` of your associated input.
    
-   Namestring (length: 500)nullable
    
    The name of the barrier.
    
-   BarrierTypeint enum
    
    Possible values: `0`, `1`
    
    Indicates whether the barrier restricts travel completely or scales time or distance when it is crossed. The value for this attribute is specified as one of the following integers:
    
    -   `0`:Restriction. Prohibits travel through the barrier. The barrier is referred to as a restriction point barrier since it acts as a restriction.
    -   `1`:Scaled Cost. Scales the time or distance required to travel the underlying streets by a factor specified using the `Attr_[Cost]` attribute.
-   Attr\_\[Cost\]number (non-negative)
    
    This attribute is specific to scaled-cost barriers. It is the factor by which the cost of edges underlying the barrier are multiplied.
    

### polygonBarriers

[`feature`](../routing-data-types/#feature)optional

Provides access to polygons that either completely restrict travel or proportionately scale the time or distance required to travel on the streets intersected by the polygons.

Show attributes for `polygonBarriers` output parameter

-   ObjectIDinteger
    
    If you specify `preserveObjectID=false`, the value for this field will be a system-generated ID. If `preserveObjectID=True`, the value for this field will be the `ObjectID` of your associated input.
    
-   Namestring (length: 500)nullable
    
    The name of the barrier.
    
-   BarrierTypeint enum
    
    Possible values: `0`, `1`
    
    Indicates whether the barrier restricts travel completely or scales time or distance when it is crossed. The value for this attribute is specified as one of the following integers:
    
    -   `0`:Restriction. Prohibits travel through the barrier. The barrier is referred to as a restriction point barrier since it acts as a restriction.
    -   `1`:Scaled Cost. Scales the time or distance required to travel the underlying streets by a factor specified using the `Attr_[Cost]` attribute.
-   Attr\_\[Cost\]number (non-negative)
    
    This attribute is specific to scaled-cost barriers. It is the factor by which the cost of edges underlying the barrier are multiplied.
    

### traversedEdges

[`feature`](../routing-data-types/#feature)optional

Provides access to the edges that are traversed while solving a network analysis layer.

Show attributes for `traversedEdges` output parameter

-   ObjectIDinteger
    
    The system-managed ID field.
    
-   SourceIDinteger (non-negative)nullable
    
    The numeric identifier of the feature class the traversal element is referencing.
    
-   SourceOIDinteger (non-negative)nullable
    
    The object ID of the traversed source feature.
    
-   EIDinteger (non-negative)nullable
    
    The element ID (EID) of the traversed network edge. An `EID` uniquely describes a network element. The EID of a network element is independent of the object ID of the feature. One feature can be stored as many different elements in the network.
    
-   FromPositionintegernullable
    
    Specifies where the output `RouteEdges` feature begins in reference to the digitized direction of the underlying street feature.
    
    -   0 (zero) indicates that the line begins at the from point of the underlying street feature.
    -   1 indicates that the line begins at the to point of the street feature.
    -   A value between 0 and 1 indicates that the line begins at a point along the underlying street feature; for example, a value of 0.25 means the line begins 25 percent along the digitized direction of the underlying street feature.
-   ToPositionintegernullable
    
    Specifies where the output `RouteEdges` feature ends in reference to the digitized direction of the underlying street feature.
    
    -   0 indicates that the line ends at the from point of the underlying street feature.
    -   1 indicates that the line ends at the to point of the street feature.
    -   A value between 0 and 1 indicates that the line ends at a point along the underlying street feature; for example, a value of 0.25 means the line ends 25 percent along the digitized direction of the underlying street feature.
-   FromJunctionIDintegernullable
    
    The reference to the object ID of the junction in the `traversedJunctions` record set that is coincident with the start of the edge.
    
-   ToJunctionIDintegernullable
    
    The reference to the object ID of the junction in the `traversedJunctions` record set that is coincident with the end of the edge.
    
-   RouteIDintegernullable
    
    The object ID of the route in the output `routes` record set.
    
-   Attr\_\[Cost\]number (non-negative)
    
    The cost of the underlying edge. The units of this field are the same as the units of the cost attribute referred to in the field name.
    
    This field will be populated if the `[Cost]` part of this field is used as an impedance attribute or accumulated attributes.
    
-   Cumul\_\[Cost\]number (non-negative)
    
    The cumulative cost of the underlying network elements from the beginning of the route to the end of the edge represented by the line feature.
    
    The units of this field are the same as the units of the cost attribute referred to in the field name.
    
    This field will be populated if the `[Cost]` part of this field is used as an impedance attribute or accumulated attributes.
    
-   Attr\_\[Restriction\]int enum
    
    Possible values: `0`, `1`
    
    Indicates whether the traversed edge used the restriction attribute referred to in this field's name.
    
    -   `0`—The traversed edge didn't use the restriction.
    -   `1`—The traversed edge used the restriction.

### traversedJunctions

[`feature`](../routing-data-types/#feature)optional

Provides access to the junctions that are traversed while solving a network analysis layer.

Show attributes for `traversedJunctions` output parameter

-   ObjectIDinteger
    
    The system-managed ID field.
    
-   SourceIDinteger (non-negative)nullable
    
    The numeric identifier of the feature class the traversal element is referencing.
    
-   SourceOIDinteger (non-negative)nullable
    
    The object ID of the traversed source feature.
    
-   EIDinteger (non-negative)nullable
    
    The element ID (EID) of the traversed network element. An `EID` uniquely describes a network element. The EID of a network element is independent of the object ID of the feature. One feature can be stored as many different elements in the network.
    
    EID is -1 if the current record doesn't represent a junction. For example, it is -1 if the record represents a stop on a route.
    
-   RouteIDintegernullable
    
    The object ID of the route in the output `routes` record set.
    
-   Attr\_\[Cost\]number (non-negative)
    
    The cost of the underlying junction. The units of this field are the same as the units of the cost attribute referred to in the field name.
    
    This field will be populated if the `[Cost]` part of this field is used as an impedance attribute or accumulated attributes.
    
-   Cumul\_\[Cost\]number (non-negative)
    
    The cumulative cost of the underlying network elements from the beginning of the route through the location of the current point feature.
    
    The units of this field are the same as the units of the cost attribute referred to in the field name.
    
    This field will be populated if the `[Cost]` part of this field is used as an impedance attribute or accumulated attributes.
    
-   Attr\_\[Restriction\]int enum
    
    Possible values: `0`, `1`
    
    Indicates whether the traversed junction used the restriction attribute referred to in this field's name.
    
    -   `0`—The traversed junction didn't use the restriction.
    -   `1`—The traversed junction used the restriction.

### traversedTurns

[`feature`](../routing-data-types/#feature)optional

Provides access to the turns that are traversed while solving a network analysis layer.

Show attributes for `traversedTurns` output parameter

-   ObjectIDinteger
    
    The system-managed ID field.
    
-   SourceIDinteger (non-negative)nullable
    
    The numeric identifier of the feature class the traversal element is referencing.
    
-   SourceOIDinteger (non-negative)nullable
    
    The object ID of the traversed source feature.
    
-   EIDinteger (non-negative)nullable
    
    The element ID (EID) of the traversed network element. An `EID` uniquely describes a network element. The EID of a network element is independent of the object ID of the feature. One feature can be stored as many different elements in the network.
    
    EID is -1 if the record represents a traversed global turn.
    
-   FromEdgeIDintegernullable
    
    The object ID of the edge in the `traversedEdges` record set that is coincident with the turn.
    
-   ToEdgeIDintegernullable
    
    The object ID of the edge in the `traversedEdges` record set that is coincident with the end of the turn.
    
-   RouteIDintegernullable
    
    The object ID of the route in the output `routes` record set.
    
-   Attr\_\[Cost\]number (non-negative)
    
    The cost of the underlying turn. The units of this field are the same as the units of the cost attribute referred to in the field name.
    
    This field will be populated if the `[Cost]` part of this field is used as an impedance attribute or accumulated attributes.
    
-   Cumul\_\[Cost\]number (non-negative)
    
    The cumulative cost of the underlying network elements from the beginning of the route through the location of the current turn.
    
    The units of this field are the same as the units of the cost attribute referred to in the field name.
    
    This field will be populated if the `[Cost]` part of this field is used as an impedance attribute or accumulated attributes.
    
-   Attr\_\[Restriction\]int enum
    
    Possible values: `0`, `1`
    
    Indicates whether the traversed turn used the restriction attribute referred to in this field's name.
    
    -   `0`—The traversed turn didn't use the restriction.
    -   `1`—The traversed turn used the restriction.

### directions

[`feature`](../routing-data-types/#feature)optional

Provides access to the turn-by-turn directions for each resulting route.

Show attributes for output directions

-   RouteNamestring (length: 500)nullable
    
    The name of the route to which the driving action applies. This value is the same as the `Name` field of the output routes.
    

-   ArriveTime[datetime](../routing-data-types#datetime)nullable
    
    The time of day to initiate the given driving action. If the route spans multiple days, the date and time of day are displayed.
    

-   Typeintegernullable
    
    The type of maneuver that the directions feature represents or the type of the directions text. To determine whether `Type` refers to a maneuver type or a directions string type, review the `SubItemType` field value.
    
    `Type` can be used, for example, to assign an icon for direction text based on the maneuver type, or it can use a formatting style based on the directions string type when displaying the driving directions in the application.
    
    See Maneuver Types
    
    -   0: Unknown
    -   1: Arrive at Stop
    -   2: Go straight
    -   3: Bear left
    -   4: Bear right
    -   5: Turn left
    -   6: Turn right
    -   7: Make sharp left
    -   8: Make sharp right
    -   9: Make U-turn
    -   10: Take ferry
    -   11: Take roundabout
    -   12: Merge to highway
    -   13: Exit highway
    -   14: Go on another highway
    -   15: At fork keep center
    -   16: At fork keep left
    -   17: At fork keep right
    -   18: Depart stop
    -   19: Trip planning item
    -   20: End of ferry
    -   21: Ramp right
    -   22: Ramp left
    -   23: Turn left and immediately turn right
    -   24: Turn right and immediately turn left
    -   25: Turn right and immediately turn right
    -   26: Turn left and immediately turn left
    -   27: Pedestrian ramp
    -   28: Elevator
    -   29: Escalator
    -   30: Stairs
    -   31: Door passage
    
    See Directions String Types
    
    -   0: General directions string type
    -   1: Depart directions string type
    -   2: Arrive directions string type
    -   3: Length directions string type
    -   4: Time directions string type
    -   5: Time summary directions string type
    -   6: Time Window directions string type
    -   7: Violation Time directions string type
    -   8: Wait Time directions string type
    -   9: Service Time directions string type
    -   10: Estimated Arrival Time directions string type
    -   11: Cumulative Length directions string type
    -   12: Street name directions string type
    -   13: Alternate street name directions string type
    -   14: Sign branch information directions string type
    -   15: Sign toward information directions string type
    -   16: Cross street name directions string type
    -   17: Sign exit number directions string type
    
-   SubItemTypeintegernullable
    
    Indicated whether the `Type` field refers to an integer from the Directions String Types table or the Maneuver Types table.
    
    -   If the `SubItemType` value is 1, the Type field refers to the values from the Maneuver Types table.
    -   If the `SubItemType` value is 2, the Type field refers to the values from the Directions String Types table.
    -   If the `SubItemType` value is 3, the Type field refers to the values from the Directions String Types table.
-   Textstring (length: 500)nullable
    
    A text description of the travel directions.
    
-   ElaspsedTimeintegernullable
    
    The time elapsed in minutes from when the current driving direction starts until the next one starts, or until the route ends for the last driving direction.
    
-   DriveDistanceintegernullable
    
    The distance from where the current driving direction occurs to where the next one occurs, or to where the route ends for the last driving direction.
    
    The value is in the units specified by the [`distance_units`](#distance_units) parameter.
    
    This value is zero for driving directions that occur at the same location where the next one begins. For example, the `DriveDistance` value is 0 for the directions text at the start of the route.
    

**Example**

The following shows an example of the output directions.



```
{
  "paramName": "Output_Directions",
  "dataType": "GPFeatureRecordSetLayer",
  "value": {
    "displayFieldName": "",
    "geometryType": "esriGeometryPolyline",
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 4326
    },
    "fields": [
      {
        "name": "ObjectID",
        "type": "esriFieldTypeOID",
        "alias": "ObjectID"
      },
      {
        "name": "RouteName",
        "type": "esriFieldTypeString",
        "alias": "RouteName",
```

Expand

### directionPoints

[`feature`](../routing-data-types/#feature)optional

Specifies the output turn-by-turn directions for the routes calculated in the analysis, represented as point locations along the routes where specific direction events or maneuvers occur.

Show attributes for `directionPoints` output parameter

-   RouteIDintegernullable
    
    The `ObjectID` of the output `routes` feature with which this direction point is associated.
    
-   Sequenceintegernullable
    
    The sequence of the direction points for the route, starting with 1.
    
-   DirectionPointTypeintegernullable
    
    The type of direction event or maneuver described by the point, designated by one of the values below:
    
    Show values
    
    -   `0`: Unknown
    -   `1`: Header
    -   `50`: Arrival
    -   `51`: Departure
    -   `52`: Straight
    -   `100`: On Ferry
    -   `101`: Off Ferry
    -   `102`: Central Fork
    -   `103`: Roundabout
    -   `104`: U-Turn
    -   `150`: Door
    -   `151`: Stairs
    -   `152`: Elevator
    -   `153`: Escalator
    -   `154`: Pedestrian Ramp
    -   `200`: Left Fork
    -   `201`: Left Ramp
    -   `202`: Clockwise Roundabout
    -   `203`: Left-handed U-turn
    -   `204`: Bear left
    -   `205`: Left Turn
    -   `206`: Sharp Left
    -   `207`: Left Turn and immediate Left Turn
    -   `208`: Left Turn and immediate Right Turn
    -   `300`: Right Fork
    -   `301`: Right Ramp
    -   `302`: Counter-Clockwise Roundabout
    -   `303`: Right-handed U-turn
    -   `304`: Bear right
    -   `305`: Right Turn
    -   `306`: Sharp Right
    -   `307`: Right Turn and immediate Left Turn
    -   `308`: Right Turn and immediate Right Turn
    -   `400`: Up Elevator
    -   `401`: Up Escalator
    -   `402`: Up Stairs
    -   `500`: Down Elevator
    -   `501`: Down Escalator
    -   `502`: Down stairs
    -   `1000`: General Event
    -   `1001`: Landmark
    -   `1002`: Time Zone change
    -   `1003`: Traffic Event
    -   `1004`: Scaled Cost Barrier Event
    -   `1005`: Boundary Crossing
    -   `1006`: Restriction Violation
    

-   FacilityIDintegernullable
    
    The object ID of the facility with which this direction point is associated, if any. If the point does not represent a visit to a facility, the value is null.
    
-   IncidentIDintegernullable
    
    The object ID of the incident with which this direction point is associated, if any. If the point does not represent a visit to an incident, the value is null.
    

-   DisplayTextstring (length: 1024)nullable
    
    The directions text to display in the consuming application.
    
-   ArrivalTime[datetime](../routing-data-types#datetime)nullable
    
    The time the direction event occurs in coordinated universal time (UTC).
    
-   ArrivalUTCOffsetnumber (non-negative)nullable
    
    The difference in minutes between the local time at the maneuver location and UTC time shown in the `ArrivalTime` field.
    

-   Namestring (length: 1024)nullable
    
    The name of the direction point.
    
-   ExitNamestringnullable
    
    The highway exit name that appears in the directions instruction.
    

-   AlternateNamestringnullable
    
    The alternate source name that appears in the directions instruction.
    
-   IntersectingNamestringnullable
    
    The name of the intersecting or cross street that appears in the directions instruction.
    

-   BranchNamestringnullable
    
    The signpost branch name that appears in the directions instruction.
    
-   TowardNamestringnullable
    
    The signpost toward destination name that appears in the directions instruction.
    

-   Levelintegernullable
    
    The building level at which this direction event occurs. This value corresponds to the `Level` property defined in the network dataset used for the analysis. This is relevant for 3D routing.
    
-   ShortVoiceInstructionstring (length: 1024)nullable
    
    The shortened direction information that will be used for voice instructions. It provides turn actions or alerts.
    
-   VoiceInstructionstring (length: 1024)nullable
    
    The direction information that will be used for voice instructions. It provides the expanded abbreviations or plurals along with turn actions or alerts.
    
-   Azimuthnumber (non-negative)nullable
    
    The bearing in degrees of the vehicle departing this point. Zero indicates north. Null indicates that it is not applicable to this feature.
    

### directionLines

[`feature`](../routing-data-types/#feature)optional

Specifies the output route lines calculated in the analysis sliced to represent each route segment between `DirectionPoints` events or maneuver locations.

Show attributes for `directionLines` output parameter

-   DirectionPointIDintegernullable
    
    The ObjectID value of the feature in the `DirectionPoints` table with which this line is associated.
    
-   RouteIDintegernullable
    
    The `ObjectID` of the output `routes` feature with which this direction line is associated.
    
-   DirectionLineTypeintegernullable
    
    The type of direction situation described by this line, designated by one of the following values:
    
    Show values
    
    The type of direction of this line, designated by one of the following values:
    
    -   `0`: Unknown
    -   `1`: Segment
    -   `2`: Maneuver Segment
    -   `3`: Restriction Violation
    -   `4`: Scaled Cost Barrier Event
    -   `5`: Heavy Traffic
    -   `6`: Slow Traffic
    -   `7`: Moderate Traffic
    
-   Metersnumber (non-negative)nullable
    
    The length of the line segment measured in meters.
    
-   Minutesnumber (non-negative)nullable
    
    The travel time along the line segment in minutes.
    
-   FromLevelintegernullable
    
    The building level at which this direction event begins. This value corresponds to the `Level` property defined in the network dataset used for the analysis.
    
-   ToLevelintegernullable
    
    The building level at which this direction event ends. This value corresponds to the `Level` property defined in the network dataset used for the analysis.
    

## Examples

Below is an example of the service on how to find the closest facility near an incident.

### Find closest facility fire stations

This example shows how to find the two fire stations that can provide the quickest response to a fire at a given incident location within three minutes. You will also generate routes and driving directions for the firefighters.

Specify the four fire stations in the area as the `facilities` parameter. Use the JSON structure to specify the facilities parameter, as you want to specify the name of the fire station that can be used by the service when generating driving directions for the routes from the fire stations. The geometries are in the default spatial reference WGS84. Therefore, the spatialReference property is not specified.

Specify the longitude and latitude value for the fire location as the `incidents` parameter.

Since you need to find the two closest fire stations, specify `2` as the value for the `defaultTargetFacilityCount` parameter. To model the fire engines traveling from the stations to the fire (incident), specify `esriNATravelDirectionFromFacility` as the value for the `travelDirection` parameter. You need to search for fire stations that are within three minutes of the fire, so specify `3` as the value for the `defaultCutoff` parameter. Any fire stations outside the cutoff time are ignored by the service.

Because you need to generate driving directions and report the distance information within the directions in miles, specify the `returnDirections` parameter as `true` and the `directionsLengthUnits` parameter as `esriNAUMiles`. To get the route geometries, specify the `returnCFRoutes` parameter as `true`. Specify `102100` as the value for the `outSR` parameter so that the output routes are returned in the Web Mercator spatial reference and can be displayed on top of an ArcGIS Online basemap.



```
POST https://{{machineName}}/{{serverWebAdaptorName}}/rest/services/{{folderName}}/NetworkAnalysis/NAServer/ClosestFacility/solveClosestFacility HTTP/1.1
Content-Type: application/x-www-form-urlencoded


token=<ACCESS_TOKEN>
&f=json
&incidents=-122.4496,37.7467
&facilities={
    "features":
    [
    {"attributes":{
        "Name":"Station 11"
        },
        "geometry":{
        "x":-122.4267,
        "y":37.7486
        }
    },
    {"attributes":{
        "Name":"Station 20"
```

Expand

The response contains two route features representing the best route to travel from the two closest fire stations to the incident. The response includes the `routes` and `directions` properties because the `returnCFRoutes` and `returnDirections` parameters are set to `true` in the request.



```
{
  "messages": [],
  "routes": {
    "fieldAliases": {
      "ObjectID": "ObjectID",
      "FacilityID": "FacilityID",
      "FacilityRank": "FacilityRank",
      "Name": "Name",
      "IncidentCurbApproach": "IncidentCurbApproach",
      "FacilityCurbApproach": "FacilityCurbApproach",
      "IncidentID": "IncidentID",
      "Total_TravelTime": "Total_TravelTime",
      "Total_Kilometers": "Total_Kilometers",
      "Total_Miles": "Total_Miles",
      "Shape_Length": "Shape_Length"
    },
    "geometryType": "esriGeometryPolyline",
    "spatialReference": {
      "wkid": 102100,
      "latestWkid": 3857
```

Expand