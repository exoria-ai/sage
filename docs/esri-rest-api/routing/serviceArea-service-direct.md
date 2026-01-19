# /solveServiceArea

> Source: [/rest/services-reference/enterprise/routing/serviceArea-service-direct/](https://developers.arcgis.com/rest/services-reference/enterprise/routing/serviceArea-service-direct/)

If you publish routing services using [configure routing services](https://enterprise.arcgis.com/en/portal/latest/administer/windows/configure-routing-services.htm) dialog box from ArcGIS Enterprise portal website, or publish using [publish routing services](https://enterprise.arcgis.com/en/server/latest/develop/windows/publishing-routing-services.htm) command line utility, use the following endpoint to access the /solveServiceArea direct request. The `{{folderName}}` represents the folder in which the services are being published.

GETGETPOST



```
GET https://{{machineName}}/{{serverWebAdaptorName}}/rest/services/{{folderName}}/NetworkAnalysis/NAServer/ServiceArea/solveServiceArea
```

If you publish routing services using [ArcGIS Pro](https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/publish-standard-routing-services.htm), use the following endpoint to access the /solveServiceArea direct request. The `{{serviceName}}` represents the name of the routing services published from ArcGIS Pro. The `{{layerName}}` is the service area layer's name in the map used to publish the routing service.

GETGETPOST



```
GET https://{{machineName}}/{{serverWebAdaptorName}}/rest/services/{{serviceName}}/NAServer/{{layerName}}/solveServiceArea
```

The `/solveServiceArea` direct request finds the area that can be reached from the input location within a given travel time or travel distance. A service area is the area that encompasses all streets that can be accessed within a given distance or travel time from one or more locations, referred to as facilities. Service areas are generally used to visualize and measure the accessibility of facilities.

With the Service area service, you can find the area that can be reached from the input location within a given travel time or travel distance. A service area is the area that encompasses all streets that can be accessed within a given distance or travel time from one or more locations, referred to as facilities. Service areas are generally used to visualize and measure the accessibility of facilities.

For example, a three-minute drive-time polygon around a grocery store can determine which residents can reach the store within three minutes and are thus more likely to shop there. The service can also create multiple concentric service areas around one or more facilities that can show how accessibility changes with an increase in travel time or travel distance. It can be used, for example, to determine how many hospitals are within 5-, 10-, and 15-minute drive times of schools. When creating service areas based on travel times, the service can use traffic data, which can influence the area that can be reached during different times of the day.

The `solveServiceArea` operation is performed on a [network layer resource](/rest/services-reference/enterprise/network-layer/) of type service area (`layerType` is `esriNAServerServiceArea`).

## Parameters

| Name | Required | Type | Default | Description |
|---|---|---|---|---|
| f |  | string |  | The request response format, either json or pjson |
| token |  | string |  | An access token with the required privileges. |
| facilities |  | locations \| feature \| layer |  | Input locations around which service areas are generated. |
| travelMode |  | object |  | The mode of transportation for the analysis provided as a JSON object. |
| defaultBreaks |  | string | Minutes | The size and number of service areas to generate for each facility. |
| travelDirection |  | string | esriNATravelDirectionToFacility | Search for the closest facility as measured from the incident to the facility or from the facility to the incident. |
| timeOfDay |  | string |  | The time and date to depart from or arrive at facilities. |
| timeOfDayIsUTC |  | boolean | false | The time zone or zones of the timeOfDay parameter. |
| outputPolygons |  | string | esriNAOutputPolygonSimplified | The level of detail for the output service area polygons. |
| splitPolygonsAtBreaks |  | boolean | true | Specify whether multiple service areas around a facility are created as disks or rings. |
| overlapPolygons |  | boolean | true | Service areas from different facilities can overlap each other. |
| mergeSimilarPolygonRanges |  | boolean | false | Service areas from different facilities that have the same break value will be joined together or split at break values. |
| trimOuterPolygons |  | boolean | true | Service areas are trimmed. |
| trimPolygonDistance |  | integer | 100 | The distance within which the service area polygon will extend. |
| trimPolygonDistanceUnits |  | string | esriMeters | Units of the value specified in the trimPolygonDistance parameter. |
| restrictUTurns |  | string | esriNFSBAllowBacktrack | Restricts or allows a route to make U-turns at junctions. |
| useHierarchy |  | boolean | true | Hierarchy used when generating service areas. |
| impedanceAttributeName |  | string | TravelTime | The type of impedance, such as Minutes or Miles. |
| accumulateAttributeNames |  | string | Miles,Kilometers | Accumulates values other than the value set in the impedanceAttributeName parameter. |
| restrictionAttributeNames |  | string |  | The restrictions that should be honored by the service. |
| attributeParameterValues |  | [object] |  | Additional values required by an attribute or restriction. |
| barriers |  | locations \| feature \| layer |  | One or more points that act as temporary restrictions, additional time, or distance. |
| polylineBarriers |  | feature \| layer |  | One ore more lines that prohibit travel anywhere the lines intersect the streets. |
| polygonBarriers |  | feature \| layer |  | Polygons that either prohibit travel or proportionately scale the time or distance required to travel on the streets. |
| splitLinesAtBreaks |  | boolean | true | Service area lines split at break values. |
| outputLines |  | string | esriNAOutputLineNone | Create service area lines. |
| overlapLines |  | boolean | true | Service area lines from different facilities overlap each other. |
| returnFacilities |  | boolean | false | Returns facilities. |
| returnBarriers |  | boolean | false | Returns barriers. |
| returnPolylineBarriers |  | boolean | false | Returns polyline barriers. |
| returnPolygonBarriers |  | boolean | false | Returns polygon barriers. |
| returnZ |  | string |  | Include the z-values for the returned geometries if supported by the underlying network. |
| ignoreInvalidLocations |  | boolean | true | Ignores invalid input locations. |
| context |  | string |  | Additional settings that affect task operation |
| outputGeometryPrecision |  | number | 10 | Simplifies route geometry. |
| outputGeometryPrecisionUnits |  | string | esriMeters | The units for the value in the outputGeometryPrecision parameter. |
| geometryPrecision |  | string |  | The number of decimal places in the response geometries. Applies to x and y values only. |
| geometryPrecisionM |  | string |  | The number of decimal places in the response geometries. Applies to m-values only. |
| geometryPrecisionZ |  | string |  | The number of decimal places in the response geometries. Applies to z-values only. |
| overrides |  | string |  | For internal use only. |
| preserveObjectID |  | boolean | false | Preserves the object IDs from input locations when the input locations are returned as output. |
| returnEmptyResults |  | boolean | false | Returns empty results instead of the error property when a request fails. |
| locateSettings |  | object |  | Determines how input data are located. |
| includeSourceInformationOnLines |  | boolean | true | Include network source fields on the output saPolylines. |
| excludeSourcesFromPolygons |  | object |  | Array of network dataset edge sources to exclude when generating polygons. |

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

### facilities

[`locations`](../routing-data-types/#locations)[`feature`](../routing-data-types/#feature)[`layer`](../routing-data-types/#layer)required

Specify the input locations around which service areas are generated.

When specifying the facilities, you can set attributes for each as follows:

Show attributes for facilities

#### Attributes for facilities

-   Namestring (length: 500)nullable
    
    The name of the facility. If the name is not specified, a name is automatically generated at solve time.
    

-   ObjectIDinteger (non-negative)nullable
    
    The object ID of the facility. `ObjectID` is a unique identifier for the facility. If you want to maintain a relationship between input and output, set `preserveObjectID` to `true` , and the `ObjectID` value of the input facility is included in the output routes (as the FacilityID field). The `ObjectID` value is also included in the output facilities (as the `ObjectID` field) and can be used to join additional information from the analysis outputs to the attribute of the facilities. If the `ObjectID` value is not specified, a unique `ID` is automatically generated in the output.
    

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
    
    The `CurbApproach` attribute is designed to work with both types of national driving standards: right-hand traffic (United States) and left-hand traffic (United Kingdom). First, consider an facility on the left side of a vehicle. It is always on the left side regardless of whether the vehicle travels on the left or right half of the road. What may change with national driving standards is your decision to approach an facility from one of two directions, that is, so it ends up on the right or left side of the vehicle. For example, if you want to arrive at an facility and not have a lane of traffic between the vehicle and the facility, choose 1 (Right side of vehicle) in the United States and 2 (Left side of vehicle) in the United Kingdom.
    
    ![ Right side of vehicle with right-hand traffic](/rest/services-reference/enterprise/static/515ffdf72e51923c49d75b2ebf3a0bfb/9d635/CurbApproach_RightSide.png)
    
    _With right-hand traffic, the curb approach that leaves the vehicle closest to the facility is Right side of vehicle._
    
    ![ Left side of vehicle with left-hand traffic ](/rest/services-reference/enterprise/static/91b764b817a8c7d790ffa2b831fd6d9f/9d635/CurbApproach_LeftSideDriving.png)
    
    _With left-hand traffic, the curb approach that leaves the vehicle closest to the facility is Left side of vehicle._
    

-   Attr\_\[Cost\] (\*NEW)number (non-negative)default:0nullable
    
    The name of the attribute can be: `Attr_TravelTime`, `Attr_TruckTravelTime`, `Attr_Minutes`, `Attr_TruckMinutes`, `Attr_WalkTime`, `Attr_Miles`, `Attr_Kilometers`
    
    This attribute specifies how much additional time spent or distance traveled can occur at the facility.
    
    The value for this attribute is specified in the units of the cost attribute. For instance, `Attr_TravelTime` is in minutes.
    
    Use case
    
    You can add time to a facility to represent how long it takes to perform another task at the facility. Similarly, adding extra distance may be useful to account for a long driveway or other road that isn't represented by the network dataset.
    
    `Attr_[Cost]` is only referenced if cost is used in the analysis as impedance or accumulate attribute.
    
    For example, when a time-based cost attribute `TravelTime` is used, it specifies the amount of time for cars, in minutes, that will be considered as delay impedance for the facility. Adding a value to this attribute reduces the reach of the service area. The attribute value can be used to store the amount of time spent at the facility. For example, when calculating service areas that represent fire station response times, `Attr_TravelTime` can store the turnout time for each fire station, which is the time it takes a crew to don the appropriate protective equipment and exit the fire station. Assume `Fire Station 1` has a turnout time of two minutes and `Fire Station 2` has a turnout time of three minutes. If a 5-minute service area is calculated for both fire stations, the actual service area for Fire Station 1 would be three minutes (since two of the five minutes would be required as turnout time). Similarly, Fire Station 2 would have an actual service area of only two minutes.
    
    However, when a distance-based cost attribute like `Miles` is used, it specifies the distance in miles that will be considered as delay impedance for the facility. Adding a value to this attribute reduces the reach of the service area. Generally the locations of the facilities are not exactly on the streets but are set back somewhat from the road. This attribute value can be used to model the distance between the actual facility location and its location on the street if it is important to include that distance when generating service areas.
    

-   Breaks\_\[Cost\]number (non-negative)default:null
    
    Specify different break values for each facility.
    
    Given two facilities, this means that you can generate 5- and 10-minute or kilometer service areas for one facility and 6-, 9-, and 12-minute or kilometer service areas for another facility.
    
    If `Breaks_[Cost]` is not set for a facility or is `null`, the service will use the value specified for the `defaultBreaks` parameter. The value for the `Breaks_[Cost]` attribute allows you to override the `defaultBreaks` parameter value on a per-facility basis. The field values you provide are only referenced if the cost attribute referred to in the field name is used in the analysis as an impedance attribute; it is not used if the attribute is used in the analysis as an accumulate attribute.
    

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
    

**Example**

The example shows how to specify some attributes for the `facilities`.



```
{
  "features": [
    {
      "geometry": {
        "x": -0.1891,
        "y": 51.5254
      },
      "attributes": {
        "Name": "Fire Station 35"
      }
    },
    {
      "geometry": {
        "x": -0.1744,
        "y": 51.5353
      },
      "attributes": {
        "Name": "Fire Station 29"
      }
    }
```

Expand

## Optional parameters

### travelMode

[`travelMode`](../routing-data-types/#travel_mode_object)optional

Choose the mode of transportation for the analysis.

[Travel modes](https://enterprise.arcgis.com/en/portal/latest/use/travel-modes-analysis-mv.htm) are [managed and configured](https://enterprise.arcgis.com/en/portal/latest/administer/windows/travel-modes.htm) in ArcGIS Enterprise by the administrator of your organization to better reflect the organization's workflows.

### defaultBreaks

`string`optional

Specify the size and number of service areas to generate for each facility. The service generates time-based or distance-based service areas depending on the units for this parameter. If units are time-based, the service areas are generated based on travel time along underlying streets. If units are distance-based, the service areas are generated based on travel distances.

The unit for this parameter is based on the unit of the impedance attribute specified using the `impedanceAttributeName` parameter or the `impedanceAttributeName` value of the travel mode if the travel mode is specified. If the `impedanceAttributeName` parameter is set to `TravelTime` , the values specified as the `defaultBreaks` parameter are interpreted to be in `minutes`, and the service generates time-based service areas. Otherwise, the values are interpreted to be in `miles` or `kilometers` based on whether the `impedanceAttributeName` parameter is set to `Miles` or `Kilometers`, respectively, and the service generates distance-based service areas.

The parameter value is specified as a comma-separated list of doubles.

Multiple area breaks can be specified to create concentric service areas per facility. For example, to find 2-, 3-, and 5-mile service areas for each facility, specify `defaultBreaks=2,3,5`, separating the values using a comma and specify `Miles` for `impedanceAttributeName`.

### travelDirection

`string`optional

Default value: _esriNATravelDirectionFromFacility_

Specify whether the direction of travel used to generate the service area polygons is toward or away from the facilities.

This parameter is specified using the following values:

-   `esriNATravelDirectionFromFacility`—The service area is generated in the direction away from the facilities.
-   `esriNATravelDirectionToFacility`—The service area is generated in the direction toward the facilities.

The direction of travel may change the shape of the polygons because impedances on opposite sides of streets may differ or one-way restrictions may exist, such as one-way streets. The direction you should choose depends on the nature of your service area analysis. The service area for a pizza delivery store, for example, should be created away from the facility, whereas the service area of a hospital should be created toward the facility.

### timeOfDay

[`datetime`](../routing-data-types/#datetime)optional

Specify the time and date to depart from or arrive at facilities. You can also specify a value of `now`, to set the depart or arrive time to current time.

Specifying a time of day results in more accurate estimations of travel times because the travel times account for the traffic conditions that are applicable for that date and time.

To use traffic in the analysis, set `impedanceAttributeName` to `TravelTime`, and assign a `timeOfDay` value.

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
    

### outputPolygons

`string`optional

Default value: _esriNAOutputPolygonSimplified_

Specify the level of detail for the output service area polygons. The parameter can be specified using the following values:

-   `esriNAOutputPolygonNone`—Do not create service areas. This is useful when you don't want to generate areas around facilities but want to generate service area lines.
-   `esriNAOutputPolygonDetailed`—Create detailed service areas. Detailed service areas model the service areas more accurately and may result in islands of unreached areas in certain cases.
-   `esriNAOutputPolygonSimplified`—Create generalized service areas. Generalized service areas are fairly accurate for most cases. However, in some cases, creating generalized service areas may cover islands of unreached areas and would be undesirable if your goal is to find such islands.

If your facilities are in an urban area with a grid-like street network, the difference between generalized and detailed service areas would be minimal. However, if your facilities are in a region containing mountain and rural roads, the detailed service areas may present more accurate results than generalized service areas.

### splitPolygonsAtBreaks

`boolean`optional

Default value: _true_

Specify whether multiple service areas around a facility are created as disks or rings.

-   `true`—When creating multiple service areas around a facility, do not include the region covered by the smaller service area in the region covered by the larger service area. Use this option to find the area from one break to another. For example, If you create 5- and 10-minute service areas, the 10-minute service areas will exclude the area under the 5-minute service areas and will appear like rings.
-   `false`—When creating multiple service areas around a facility, create service areas going from the facility to the break. For example, If you create 5- and 10-minute service areas, the 10-minute service area will include the area under the 5-minute service area.

### overlapPolygons

`boolean`optional

Default value: _true_

Specify whether the service areas from different facilities can overlap each other.

-   `true`—The service areas can overlap each other.
-   `false`—A service area from one facility cannot overlap service areas from other facilities. With this option, the area inside any given service area is closer to the corresponding facility than any other facility.

This parameter will produce the same result with either value when only one facility is specified.

### mergeSimilarPolygonRanges

`boolean`optional

Default value: _false_

Specify whether the service areas from different facilities that have the same break value will be joined together or split at break values.

-   `true`—Service area polygons from multiple facilities with the same break value will be merged, resulting in a single polygon feature per break value.
-   `false`—Service area polygons from multiple facilities with the same break values will remain separate polygon features.

This parameter will produce the same result with either value when only one facility is specified.

### trimOuterPolygons

`boolean`optional

Default value: _true_

Specify whether the service areas are trimmed.

This is useful when finding service areas in places that have a very sparse street network and you don't want the service area to cover large areas where there are no street features.

-   `true`—The service areas will be trimmed.
-   `false`—The service areas will not be trimmed.

The parameter value is ignored when the [`useHierarchy`](#usehierarchy) parameter is set to `true` .

### trimPolygonDistance

`integer`optional

Default value: _100_

Specify the distance within which the service area polygon will extend from the road when no other reachable roads are nearby, similar to a line buffer size.

This parameter is applicable only if the [`trimOuterPolygons`](#trimouterpolygons) parameter is set to `true`. The parameter value is ignored when the [`useHierarchy`](#usehierarchy) parameter is set to `true` .

### trimPolygonDistanceUnits

`string`optional

Default value: _esriMeters_

**Allowed values:** `esriCentimeters`, `esriDecimalDegrees`, `esriDecimeters`, `esriFeet`, `esriInches`, `esriKilometers`, `esriMeters`, `esriMiles`, `esriMillimeters`, `esriNauticalMiles`, `esriPoints`, `esriYards`

Specify the units of the value specified in the [`trimPolygonDistance`](#trimpolygondistance) parameter.

This parameter is applicable only if the [`trimOuterPolygons`](#trimouterpolygons) parameter is set to `true`. The parameter value is ignored when the [`useHierarchy`](#usehierarchy) parameter is set to `true` .

### useHierarchy

`boolean`optional

Default value: _false_

Specify whether hierarchy will be used when generating service areas.

-   `true`—The service will use hierarchy. When generating hierarchical service areas, the service prefers higher-order streets, such as freeways, to lower-order streets, such as local roads. This means that if a facility is located on a local road (the lowest level in a hierarchy), the service spans out on the local roads in that area, but it tries to step up the hierarchy to secondary and primary roads. Once on secondary and primary roads, the service ignores local roads throughout the rest of the service area. Mainly because of this hierarchical approach, hierarchical service areas are generated much faster compared to nonhierarchical service areas, as the service has to generate service areas from a relatively smaller subset of streets. Hierarchical service areas can be used to simulate the driver preference of traveling on freeways instead of local roads even if that means a longer trip. However, the areas can overlap some lower-order roads that can't be reached within the given travel distance or travel time. Consequently, hierarchical service areas can be less accurate.
-   `false`—The service will not use hierarchy. This results in service areas that are measured along all the streets, regardless of hierarchy level, and tend to be higher quality compared to their hierarchical counterparts.

Some service parameters are not applicable when generating hierarchical service areas.

-   The `trimOuterPolygons`, `trimPolygonDistance`, and `trimPolygonDistanceUnits` parameters are ignored and, if specified, result in a warning message in the service response.
-   Generating detailed service areas, specified using a value of `esriNAOutputPolygonDetailed` for the `outputPolygons` parameter, is not supported and results in a failed request.
-   Generating service area lines, specified using `esriNAOutputLineTrueShape` or `esriNAOutputLineTrueShapeWithMeasure` for the `outputLines` parameter value, is not supported and results in a failed request.

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

### outputLines

`string`optional

Default value: _esriNAOutputLineNone_

Specify whether the service will create service area lines. This parameter is specified using the following values:

-   `esriNAOutputLineNone`—Do not create service area lines. This is useful when you don't want to create area lines around facilities but want to generate service areas.
-   `esriNAOutputLineTrueShape`—Create service area lines based on the streets that fall within the values specified for the `breakValues` parameter.
-   `esriNAOutputLineTrueShapeWithMeasure`—Create measures for the service area lines. This adds linear referencing information to the output lines to aid in the use of service area lines for functions such as dynamic segmentation for events.

### splitLinesAtBreaks

`boolean`optional

Default value: _true_

Specify whether the service area lines will be split at break values.

-   `true`—A service area line that intersects a break is split into two lines. This is useful if you want to visualize service area lines by break value.
-   `false`—Service area lines are not split at the boundaries of the breaks.

Setting this parameter has no effect when only one value is specified for the `defaultBreaks` parameter or `outputLines` is set to `esriNAOutputLineNone`.

### overlapLines

`boolean`optional

Default value: _true_

Specify whether the service area lines from different facilities can overlap each other.

-   `true`—Services area lines can overlap one another. With this option, if two facilities have service area lines that are coincident, there are two features there—one for each facility's service area line.
-   `false`—Service area lines from one facility cannot overlap those from another facility. With this option, if two facilities have service area lines that are coincident, there is only one service area line, and it is associated with the closest facility.

Setting this parameter has no effect when there is only one facility or `outputLines` is set to `esriNAOutputLineNone`.

### returnFacilities

`boolean`optional

Default value: _false_

Specify whether facilities are returned by the service.

-   `true`—The input facilities are returned as part of the `facilities` property in the JSON response.
-   `false`—The input facilities are not included in the results.

If you specified the `facilities` parameter value using a REST query request to any ArcGIS Server feature, map, or geoprocessing service that returns a JSON feature set, you can set the `returnFacilities` parameter to `true` so you can draw the facility locations in the application. You can also set the `returnFacilities` property to `true` to see where the facilities were located on the street network or if they weren't located, understand what the problem was by reviewing the `Status` property in the JSON response.

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

Specify whether the object IDs specified for input locations such as facilities or barriers will be preserved when the input locations are returned as output. This can be useful if you want to associate additional attributes with the output locations after the solve operation is successful and need a common key field to do the join.

For example, the input facilities are specified as the following JSON representation of a feature set:



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

If you solve a service area and specify `preserveObjectID=false`, the output facilities will have object IDs of 1, 2 even though the input facilities have object IDs of 10, 20. However, if `preserveObjectID=true`, the output facilities will preserve the object ID from the inputs.

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

You can specify locate settings and can override locate settings for individual features such as, facilities, barriers, polylineBarriers, and polygonBarriers through locator JSON object.

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

### includeSourceInformationOnLines

`boolean`optional

Default value: _true_

Specify whether the network source fields on the output `saPolylines` will be included.

-   `true`—The `saPolylines` property in the JSON response will include network source fields.
-   `false`—The `saPolylines` property in the JSON response will not include network source fields.

Setting this parameter has no effect if [`outputLines`](#outputlines) is set to `esriNAOutputLineNone`. You can set this to `false` if you don't need network source fields on [`saPolylines`](#sapolygons) and this will reduce the response size.

### excludeSourcesFromPolygons

`string`optional

Specify the array of network dataset edge sources to exclude when generating polygons. The property is set as an array of strings where each value is the name of the network edge source.

[Learn more about excluding edge sources from service area polygon generation](https://pro.arcgis.com/en/pro-app/latest/help/analysis/networks/service-area-analysis-layer.htm#ESRI_SECTION1_D36A18B15D704F0DBA9B4C766A4A2719)

## Response objects

The JSON response from the service area service is based on the following syntax. The actual properties returned in the response depend on the request parameters. For example, the `facilities` property is returned only if the `returnFacilities` parameter is set to `true` . If a request fails, the JSON response only contains the error property.

For a list of error codes and details, go to [Direct request error codes](/rest/services-reference/enterprise/naserver-error-codes/)

The examples in the subsequent section illustrate the response returned with specific request parameters.



```
{
  "saPolygons": {
    "spatialReference": "{<spatialReference>}",
    "features": [
      {
        "attributes": {
          "<field1>": "value11",
          "<field2>": "value12"
        },
        "geometry": "{<polygon1>}"
      },
      {
        "attributes": {
          "<field1>": "value21",
          "<field2>": "value22"
        },
        "geometry": "{<polygon2>}"
      }
    ]
  },
```

Expand

On successful completion, the service returns the service areas around the facilities. This data type supports the fields described below. In addition to these fields, the data type also includes all the fields from the input feature class used as facilities for the analysis when generating overlapping or non-overlapping polygons.

### saPolygons

[`feature`](../routing-data-types/#feature)optional

Provides access to polygon features that represent areas that can be reached from the input locations with a given travel time, travel distance, or travel cost.

Show attributes for output service area polygons

-   ObjectIDinteger
    
    The system-managed ID field.
    
-   FacilityIDintegernullable
    
    The unique identifier of the associated facility.
    
    If you specify `preserveObjectID=false`, the value for this field will be a system-generated ID. If `preserveObjectID=True`, the value for this field will be the ObjectID of your associated input.
    
    Multiple facilities can be associated with one service area when `mergeSimilarPolygonRanges` is set to `true`. `FacilityID` field values are set to null when service areas are merged.
    
-   Namestring (length: 500)nullable
    
    The name of the service area. It is based on the name of the associated facility and the cutoffs; for example, `Store1: 0.0 – 5.0` represents a service area that covers all traversable streets within five minutes of a facility named `Store1` .
    
    The break values are returned without the name of the facility, for example, `0.0 – 5.0`, when `mergeSimilarPolygonRanges` is set to `true` .
    
-   FromBreaknumber (non-negative)
    
    The lower bound of the service area's impedance cutoff range. The unit for this field is based on the unit of the impedance attribute set for the analysis.
    
-   ToBreaknumber (non-negative)
    
    The upper bound of the service area's impedance cutoff range. The value is in the same units as the `FromBreak` field values.
    

### saPolylines

[`feature`](../routing-data-types/#feature)optional

Stores the resultant service areas as linear features and covers the streets, or network edges, that can be reached within the given time, distance, or other travel-cost cutoff. Lines are a truer representation of a service area than polygons since service area analyses are based on measurements along the network lines.

Show attributes for output service area polylines

-   ObjectIDinteger
    
    The system-managed ID field.
    
-   FacilityIDintegernullable
    
    The unique identifier of the associated facility.
    
    If you specify `preserveObjectID=false`, the value for this field will be a system-generated ID. If `preserveObjectID=True`, the value for this field will be the ObjectID of your associated input.
    
-   SourceIDinteger (non-negative)nullable
    
    Each service area line traverses a feature from a network source feature class—a feature class used to create the network dataset on which the service area analysis is performed. This field specifies the unique ID of the source feature class the traversed feature is a part of.
    
-   SourceOIDinteger (non-negative)nullable
    
    The ObjectID value of the traversed street feature. Summarizing the values for this field can provide useful information such as the number of times a particular street feature is included from the facilities.
    
-   FromPositionnumber (non-negative)
    
    Specifies where along the underlying source feature the service area line begins.
    
    A value of 0 (zero) indicates that the service area line begins at the from point of the underlying source feature. A value of 1 indicates that the service area line begins at the to point of the underlying source feature. A value between 0 and 1 indicates that the line begins at a point along the underlying source feature; for example, a value of 0.25 means the line begins 25 percent along the digitized direction of the underlying source feature.
    
-   ToPositionnumber (non-negative)
    
    Specifies where along the underlying source feature the service area line ends.
    
    A value of 0 (zero) indicates that the service area line ends at the from point of the underlying source feature. A value of 1 indicates that the service area line ends at the to point of the underlying source feature. A value between 0 and 1 indicates that the line ends at a point along the underlying source feature; for example, a value of 0.25 means the line ends 25 percent along the digitized direction of the underlying source feature.
    
-   FromCumul\_\[Cost\]number (non-negative)nullable
    
    This field contains the cumulative cost of the path from the facility to the beginning of the line feature. For instance, `FromCumul_Miles`, where `Miles` is the travel cost. The cost of the adjacent junction at the beginning of the line is included in this value. This field is generated for the cost attribute and any accumulation attributes.
    
-   ToCumul\_\[Cost\]number (non-negative)nullable
    
    This field contains the cumulative cost of the path from the facility to the end of the line feature. For instance, `ToCumul_Miles`, where `Miles` is the travel cost. The cost of the adjacent junction at the end of the line is excluded from this value. This field is generated for the cost attribute and any accumulation attributes.
    

### facilities

[`feature`](../routing-data-types/#feature)optional

Provides access to the attributes of the facilities that are used in the service area analysis. You can use the attributes from this data type, such as the `Status` field, to determine why a facility was not used in the analysis.

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
    
    This field stores the additional time, distance, or other travel cost for the facility. Adding a value to this field reduces the reach of the service area.
    
    If you're finding the service areas for three facilities using `TravelTime` as the cost, the `Attr_TravelTime` field can be used to store the amount of time spent at the facility.
    
    For example, when calculating service areas that represent fire station response times, `Attr_TravelTime` can store the turnout time, which is the time it takes a crew to put on the appropriate protective equipment and exit the fire station, for each fire station. Assume Fire Station 1 has a turnout time of one minute and Fire Station 2 has a turnout time of three minutes. If a five-minute service area is calculated for both fire stations, the actual service area for Fire Station 1 is four minutes (since one of the five minutes would be required as turnout time). Similarly, Fire Station 2 has a service area of only two minutes from the fire station.
    
    The value you enter affects the analysis only when the \[Cost\] part of the field name (`Attr_[Cost]`) is used as impedance attribute or accumulate attribute for the analysis.
    

-   Breaks\_\[Cost\]number (non-negative)nullable
    
    You can store different polygon break values for each service area facility in the `Breaks_[Cost]` field. Given two facilities, this means you can generate 5- and 10- minute service area polygons for one facility and 6-, 9-, and 12- minute polygons for another facility.
    
    The value for the `Breaks_[Cost]` attribute overrides the `defaultBreaks` parameter value. If `Breaks_[Cost]` is not set for a facility, the service will use the value specified as the `defaultBreaks` parameter.
    

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
    

## Examples

Below is an example of the service showing how to calculate drive-time polygons around a store.

### Calculate 5-, 10-, and 15-minute drive-time polygons around store locations

This example shows how to calculate the 5-, 10-, and 15-minute drive-time polygons around a store. The store location is specified as the `facilities` parameter using the longitude and latitude values. The drive-time polygons must be drawn on an ArcGIS Online basemap that uses the Web Mercator spatial reference. Therefore, the `outSR` parameter is specified with a value of `102100` to return polygon geometries in the appropriate spatial reference. The default values for all the other parameters are appropriate for this request and are not specified.



```
POST https://{{machineName}}/{{serverWebAdaptorName}}/rest/services/{{folderName}}/NetworkAnalysis/NAServer/ServiceArea/solveServiceArea HTTP/1.1
Content-Type: application/x-www-form-urlencoded

token=<ACCESS_TOKEN>
&f=json
&facilities=-122.253,37.757
&outSR=102100
```



```
{
  "messages": [],
  "saPolygons": {
    "fieldAliases": {
      "ObjectID": "ObjectID",
      "FacilityID": "FacilityID",
      "Name": "Name",
      "FromBreak": "FromBreak",
      "ToBreak": "ToBreak",
      "Shape_Length": "Shape_Length",
      "Shape_Area": "Shape_Area"
    },
    "geometryType": "esriGeometryPolygon",
    "spatialReference": {
      "wkid": 102100,
      "latestWkid": 3857
    },
    "features": [
      {
        "attributes": {
```

Expand