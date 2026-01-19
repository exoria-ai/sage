# Reverse Geocode

> Source: [/rest/services-reference/enterprise/reverse-geocode/](https://developers.arcgis.com/rest/services-reference/enterprise/reverse-geocode/)

**URL:**: https://<geocodeservice-url>/reverseGeocode

**Methods:**: GET

**Version Introduced:**: 9.3

## Description

The `reverseGeocode` operation is performed on a [geocode service resource](/rest/services-reference/enterprise/geocode-service/). The result of this operation is a reverse-geocoded address resource. This resource provides information about all the address fields pertaining to the reverse-geocoded address as well as its exact location.

The `reverseGeocode` operation determines the address at a particular x,y location. You pass the coordinates of a point location to the geocode service, and the service returns the address or place that is closest to the location.

## New at 11.3

-   When sharing a locator created with the Create Locator tool in ArcGIS Pro 3.3 or later, you must be signed in, with publisher or administrator privileges, with at least one federated server to [return the input location](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/tips-for-improving-geocoding-quality.htm#ESRI_SECTION1_AB63D0B2A9E44DB1ABABD9F8887A4F71) when reverse geocoding.
-   The `returnInputLocation` parameter specifies which coordinates should be returned in the X and Y output fields in the location object of the JSON response. The parameter requires a locator created in ArcGIS Pro 3.3 or later.

## New at 11.2

-   Polygon output fields added to a locator by the [Add Polygon Fields To Locator](https://pro.arcgis.com/en/pro-app/latest/tool-reference/geocoding/add-polygon-fields-to-locator.htm) tool in ArcGIS Pro 3.2 or later, will be returned within the `attributes` object of the `reverseGeocode` response as part of the output fields.

## New at 10.9

-   Maintaining [side offset](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/tips-for-improving-geocoding-quality.htm#ESRI_SECTION1_CBCA29056A7F4D7187049BECA6CC0B84), [end offset](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/tips-for-improving-geocoding-quality.htm#ESRI_SECTION1_1613A53EDD1344D7984C1DB3DB242297), and custom [intersection connectors](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/tips-for-improving-geocoding-quality.htm#ESRI_SECTION1_8BB6427CAC1B4CCD95BDF0619CA00DC2) settings requires a locator created in ArcGIS Pro 2.7 or later with the [Street Address](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/introduction-to-locator-roles.htm#ESRI_SECTION1_A88AD30450A14F2787939955C7C5BC12) role.
-   Support for `Subaddress` `featureTypes` requires a locator created in ArcGIS Pro 2.8 or later.

## New at 10.8

The `preferredLabelValues` parameter allows simple configuration of output fields returned in a response from the geocode service by specifying which address component values will be included in output fields.

## Request parameters

| Parameter | Details |
|---|---|
| location(Required) | The point from which to search for the closest address or place. The point can be represented as a simple, comma-separated syntax or as a JSON point object.The default spatial reference of the comma-separated syntax is the same as the data used to build the locator on which the geocode service is based.Use JSON formatting to specify another coordinate system for the input location. Specifically, set the spatial reference using its well-known ID (WKID) value. For a list of valid WKID values, see Using spatial references.Example 2 3 4 5 //simple syntax (with default WGS84 SR) location=-117.196,34.056 //JSON (with default WGS84 SR) location={x: 103.876722, y: 1.3330736} |
| token(Required) | Specifies a token that provides the identity of a user who has the necessary permissions to access the service. |
| outSR(Optional) | The spatial reference of the x,y coordinates returned by a geocode request. This is useful for applications using a map with a spatial reference different than that of the geocode service.The spatial reference can be specified as either a WKID or as a JSON spatial reference object. If outSR is not specified, the spatial reference of the output locations is the same as that of the service. The default spatial reference of the geocode service is the same as the data used to build the locator on which the geocode service is based.For a list of valid WKID values, see Using spatial references.Example outSR=102100 |
| langCode(Optional) | Sets the language in which geocode results are returned. Addresses and places in many countries are available in more than one language; in these cases, the langCode parameter can be used to specify which language to use for results returned by the findAddressCandidates operation. This is useful for ensuring that results are returned in the expected language. For example, a web application can be designed to get the browser language and pass it as the langCode parameter value in a findAddressCandidates request.See the table of supported countries for valid language code values in each country. Full language names cannot be used in the langCode parameter. Only one language code value can be included for the langCode parameter in a findAddressCandidates request.If the langCode parameter isn't included in a request, or if it is included but there are no matching features with the input language code, the resultant match is returned in the language code of the primary matched component from the input search string. Typically, this is either place-name or street name, depending on the search string.It is important to note that langCode is limited by the address data sources used to build the locator for the geocode service. This parameter will be ignored when not supported by the data.Example langCode=fr |
| featureTypes(Optional) | Limits the possible match types returned by the reverseGeocode operation. Valid values are listed in the feature type hierarchy table. Single or multiple values can be included in the request. If a single value is included, the search tolerance for the input feature type is 500 meters. If multiple values are included, the default search distances specified in the feature type hierarchy table are applied.Values: Subaddress \| PointAddress \| Parcel \|StreetAddress \| StreetInt \| StreetName \| POI \| DistanceMarker \| Locality \| PostalExamples 2 3 4 5 //Single featureTypes value featureTypes=PointAddress //mMultiple featureTypes values featureTypes=PointAddress,StreetAddress |
| locationType(Optional) | Specifies whether the output geometry of PointAddress and Subaddress matches will be the rooftop point or street entrance location. Valid values are rooftop and street . The default value is rooftop .Geocode results include one geometry object (the location object) that defines the location of the address, as well as two sets of x,y coordinate values within the attributes object X/Y and DisplayX/DisplayY . In most cases, for geocode results with PointAddress or Subaddress , the X/Y attribute values describe the coordinates of the address along the street, and the DisplayX/DisplayY values describe the rooftop, or building centroid, coordinates. By default, the geometry returned for geocode results represents the rooftop location of the address (if the rooftop location is available in the source data). This is useful for most spatial analysis and map display purposes. However, for routing scenarios, it may be better to use the street location because the rooftop location of some addresses may be offset from a street by a large distance. For these cases, the locationType parameter can be used to specify that the street entrance geometry should be returned.It is important to note that locationType is limited by the address data sources used to build the locator for the geocode service. Not all PointAddress and Subaddress features include rooftop and street location coordinates. For some addresses, only a rooftop location is available; for others, only a street location is provided by the data source. In these cases, the locationType parameter may not function as expected. For example, if only rooftop location coordinates are available for an address, the rooftop geometry will be returned for the geocoded address even when street is requested.Values: street \| rooftop |
| preferredLabelValues(Optional) | Allows simple configuration of output fields returned in a response from the geocode service by specifying which address component values will be included in output fields. A single value or a comma-delimited collection of values are supported as input. If the parameter is blank or excluded from a request, default address label formats will be used.A particular address may have multiple city names associated with it. In the United States for example, all addresses have a ZIP code (postal code) assigned to them. Each ZIP code has one or more associated locality names, which are known as postal cities. There is always one primary postal city value for each ZIP code. ZIP codes typically have no set boundaries, and the primary postal city name for the ZIP code that is assigned to an address may be different than the name of the local city that the address is in.Additional details:The preferredLabelValues parameter takes a comma-delimited collection of values as input.The parameter values correspond to two groups: a City group and a Street group, indicated by the suffix of the value name. The postalCity , localCity , and matchedCity values are part of the City group. The primaryStreet and matchedStreet values are part of the Street group.A geocode request can include one City value and one Street value, for example, preferredLabelValues=primaryStreet,postalCity .A request can only include one value per group. In other words, a request with preferredLabelValues=matchedCity,postalCity is invalid.Example: preferredLabelValues=matchedCity,primaryStreet |
| outFields(Optional) | The list of fields to be returned within the address object of the reverseGeocode JSON response. Descriptions for each of the reverseGeocode output fields are available in the Output fields section of this document. The reverseGeocode output fields are those for which "Supported request types" = "reverseGeocode" in the table.The reverseGeocode response consists of two objects: address and location. The location object includes the fields that are used for displaying reverse geocode results in a mapping application. The address object includes fields which provide details about the address or place returned for the reverseGeocode request, such as the full address, city, place name, and others. The outFields parameter is only relevant for the address object. The location object is not affected by it.By default, all possible output fields are returned in the response. In other words, passing outFields= (blank) in the request is functionally the same as passing outFields=*.Example that returns all output fields outFields=*Example that returns the specified fields only outFields=Match_addr,Addr_type,CountryCode |
| returnInputLocation(Optional) | The returnInputLocation parameter is a Boolean which can be used to specify which coordinates should be returned in the X and Y output fields within the location object of the JSON response. The default value is false.If true, then the coordinates which were included in the reverseGeocode request for the location parameter are returned in the X and Y output fields in the location object of the JSON response.If false, then the coordinates of the reverse geocoded location are returned in the X and Y output fields in the location object of the JSON response.Example returnInputLocation=true |
| f(Required) | The response format. The default response format is html .Values: html \| json \| pjson \| kmz |

## Reverse geocode details

The purpose of reverse geocoding is to answer the question What's near me? or more specifically, What's near this location? To best answer this question, the `reverseGeocode` operation returns the most relevant feature near an input location based on a prioritized hierarchy of feature types. With a few exceptions, the same feature types that can be returned by `findAddressCandidates` can also be returned by `reverseGeocode` . As long as the location is within the extent of the data used to build the locator on which the geocode service is based, a single feature is returned, even if the location is far from any streets or places. If there are no streets near the input location, large area features such as parks, universities, zoos, or airports may be returned. If the location isn't within the boundary of this type of feature, a postal code or administrative area (such as a city) is returned.

The hierarchy is summarized in the table below, ordered by descending priority. Unless otherwise noted, each feature type is only returned when the distance between the input location and the feature is within the tolerance specified in the Search tolerance column.

| Feature type | Search tolerance | Comments |
|---|---|---|
| StreetInt | 10 meters | Intersections are only returned when StreetInt is included in the request. |
| StreetAddress (near), DistanceMarker , or StreetName | 3 meters | Candidates of type StreetName are only returned if StreetName is included in the request. |
| POI centroid | 25 meters | A business or landmark that can be represented by a point. |
| Parcel centroid | 25 meters | A plot of land that can be represented by a point. |
| Subaddress | 10 meters | Subaddress candidates, which can be features such as apartments or floors in a building, are not returned if multiple subaddresses exist at the same x,y location and one of the following conditions is met:The subaddress units cannot be collapsed into a contiguous range.The subaddresses have different street address, postal code, or administrative zone values. |
| PointAddress | 50 meters | A PointAddress match is not returned if it is on the opposite side of the street as the input location, even if it is within 50 meters of the location. |
| StreetAddress (distant), DistanceMarker , or StreetName | 100 meters | Candidates of type StreetName are only returned if StreetName is included in the request. |
| POI area | Within boundary | A business or landmark that can be represented by an area, such as a large park or university. This is not available unless supported by the data used to build the locator on which the geocode service is based. |
| Parcel area | Within boundary | A plot of land that can be represented by an area, such as a parcel or tax lot. This is not available unless supported by the data used to build the locator on which the geocode service is based. |
| Postal or Locality area | Within boundary | If the input location intersects multiple boundaries, the feature with the smallest area is returned. |

The images below visualize the `reverseGeocode` feature type hierarchy.

The following image shows a section of a typical map on which a user may click or add points for reverse geocoding.

![Street map image showing location of reverse geocoding examples](/rest/services-reference/enterprise/static/483f1eeb9a034922be757f36f13ebcad/0b533/GUID-01F698DB-2076-4FB2-8298-327221288ACD-web.png)

The following image shows the same map with the available features for reverse geocoding highlighted: blue dots for `StreetInt` features, pink dots for POI centroids, green dots for `PointAddress` features, red lines for street segments, and a brown polygon representing a POI area feature.

![Features that can be reverse geocoded are highlighted.](/rest/services-reference/enterprise/static/6d1d675bfd7dfc07f39221e0b1c48b94/0b533/GUID-1619D08C-9515-45AC-B07C-3BCE3CB084C1-web.png)

In the following image, buffers have been created around the features based on the search tolerance values from the hierarchy table to illustrate the match types that would be returned for various `reverseGeocode` input locations. Refer to the examples below to see the expected matches for the input locations in the image.

![Buffers illustrating the search tolerance of different feature types for reverse geocoding](/rest/services-reference/enterprise/static/4bf3033fedadde502014aefaa70521c4/9fc4b/GUID-1BF30FC8-D072-4A96-8A31-EC3B633354C3-web.png)

For each number callout in the image above, there is a corresponding example with the same number.

### Example input location 1: Match to POI centroid returned

In this example, which corresponds to callout 1 in the image above, the input location is within the search tolerance of both POI and PointAddress features, but a match to the POI centroid is returned because it has a higher priority.

#### Request URL



```
https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=-117.205416,34.038074
```

#### JSON Response



```
{
  "address": {
    "Match_addr": "Premier ENT",
    "LongLabel": "Premier ENT, 255 Terracina Blvd, Redlands, CA, 92373, USA",
    "ShortLabel": "Premier ENT",
    "Addr_type": "POI",
    "Type": "Doctor",
    "PlaceName": "Premier ENT",
    "AddNum": "255",
    "Address": "255 Terracina Blvd",
    "Block": "",
    "Sector": "",
    "Neighborhood": "",
    "District": "",
    "City": "Redlands",
    "MetroArea": "",
    "Subregion": "San Bernardino County",
    "Region": "California",
    "Territory": "",
    "Postal": "92373",
    "PostalExt": "",
    "CountryCode": "USA"
  },
  "location": {
    "x": -117.20541599999996,
    "y": 34.038074000000051,
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 4326
    }
  }
}
```

### Example input location 2: Match to POI area returned

In this example, which corresponds to callout 2 in the image above, the input location is within a POI area feature, so a POI match is returned.

#### Request URL



```
https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=-117.20744088954731,34.0375903447169
```

#### JSON Response



```
{
  "address": {
    "Match_addr": "Redlands Community Hospital",
    "LongLabel": "Redlands Community Hospital, 350 Terracina Blvd, Redlands, CA, 92373, USA",
    "ShortLabel": "Redlands Community Hospital",
    "Addr_type": "POI",
    "Type": "Hospital",
    "PlaceName": "Redlands Community Hospital",
    "AddNum": "350",
    "Address": "350 Terracina Blvd",
    "Block": "",
    "Sector": "",
    "Neighborhood": "Live Oak Canyon",
    "District": "",
    "City": "Redlands",
    "MetroArea": "Inland Empire",
    "Subregion": "San Bernardino County",
    "Region": "California",
    "Territory": "",
    "Postal": "92373",
    "PostalExt": "",
    "CountryCode": "USA"
  },
  "location": {
    "x": -117.20744088954731,
    "y": 34.037590344716897,
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 4326
    }
  }
}
```

### Example input location 3: StreetAddress match returned

In this example, which corresponds to callout 3 in the image above, the input location intersects a POI area feature and a `StreetAddress` buffer. A `StreetAddress` match is returned since it has a higher priority than POI areas.

#### Request URL



```
https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=-117.20700637168703,34.03582108290202
```

#### JSON Response



```
{
  "address": {
    "Match_addr": "1764-1792 W Fern Ave, Redlands, California, 92373",
    "LongLabel": "1764-1792 W Fern Ave, Redlands, CA, 92373, USA",
    "ShortLabel": "1764-1792 W Fern Ave",
    "Addr_type": "StreetAddress",
    "Type": "",
    "PlaceName": "",
    "AddNum": "1764",
    "Address": "1764 W Fern Ave",
    "Block": "",
    "Sector": "",
    "Neighborhood": "Live Oak Canyon",
    "District": "",
    "City": "Redlands",
    "MetroArea": "Inland Empire",
    "Subregion": "San Bernardino County",
    "Region": "California",
    "Territory": "",
    "Postal": "92373",
    "PostalExt": "",
    "CountryCode": "USA"
  },
  "location": {
    "x": -117.20692023528862,
    "y": 34.03569657783153,
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 4326
    }
  }
}
```

### Example input location 4: PointAddress match returned

In this example, which corresponds to callout 4 in the image above, the input location is within the search tolerance of a `PointAddress` feature, so a `PointAddress` match is returned.

#### Request URL



```
https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=-117.20689908332648,34.03431629224423
```

#### JSON Response



```
{
  "address": {
    "Match_addr": "421 San Timoteo Canyon Rd, Redlands, California, 92373",
    "LongLabel": "421 San Timoteo Canyon Rd, Redlands, CA, 92373, USA",
    "ShortLabel": "421 San Timoteo Canyon Rd",
    "Addr_type": "PointAddress",
    "Type": "",
    "PlaceName": "",
    "AddNum": "421",
    "Address": "421 San Timoteo Canyon Rd",
    "Block": "",
    "Sector": "",
    "Neighborhood": "",
    "District": "",
    "City": "Redlands",
    "MetroArea": "",
    "Subregion": "San Bernardino County",
    "Region": "California",
    "Territory": "",
    "Postal": "92373",
    "PostalExt": "7821",
    "CountryCode": "USA"
  },
  "location": {
    "x": -117.20737997312443,
    "y": 34.034238985755593,
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 4326
    }
  }
}
```

### Example input location 5: Locality match returned

In this example, which corresponds to callout 5 in the image above, the input location is outside the tolerance of address and POI features, so the service returns a match to the smallest (by area) administrative or postal boundary feature that the location intersects. In this case, a match to the Live Oak Canyon neighborhood is returned.

#### Request URL



```
https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=-117.205794,34.035115
```

#### JSON Response



```
{
  "address": {
    "Match_addr": "Live Oak Canyon, Redlands, California",
    "LongLabel": "Live Oak Canyon, Redlands, CA, USA",
    "ShortLabel": "Live Oak Canyon",
    "Addr_type": "Locality",
    "Type": "Neighborhood",
    "PlaceName": "Live Oak Canyon",
    "AddNum": "",
    "Address": "",
    "Block": "",
    "Sector": "",
    "Neighborhood": "Live Oak Canyon",
    "District": "",
    "City": "Redlands",
    "MetroArea": "Inland Empire",
    "Subregion": "San Bernardino County",
    "Region": "California",
    "Territory": "",
    "Postal": "",
    "PostalExt": "",
    "CountryCode": "USA"
  },
  "location": {
    "x": -117.205794,
    "y": 34.035114999999998,
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 4326
    }
  }
}
```

### Example input location 6: StreetAddress match returned

In this example, which corresponds to callout 6 in the image above, the input location is within the tolerance of both `StreetInt` and `StreetAddress` features. Even though `StreetInt` has a higher priority than `StreetAddress` , a `StreetAddress` match is returned. This is because intersection matches are only returned by `reverseGeocode` if the request includes `StreetInt` . The `featureTypes` parameter is empty in this case.

#### Request URL



```
https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=-117.203741,34.036609
```

#### JSON Response



```
{
  "address": {
    "Match_addr": "400-470 Terracina Blvd, Redlands, California, 92373",
    "LongLabel": "400-470 Terracina Blvd, Redlands, CA, 92373, USA",
    "ShortLabel": "400-470 Terracina Blvd",
    "Addr_type": "StreetAddress",
    "Type": "",
    "PlaceName": "",
    "AddNum": "402",
    "Address": "402 Terracina Blvd",
    "Block": "",
    "Sector": "",
    "Neighborhood": "Live Oak Canyon",
    "District": "",
    "City": "Redlands",
    "MetroArea": "Inland Empire",
    "Subregion": "San Bernardino County",
    "Region": "California",
    "Territory": "",
    "Postal": "92373",
    "PostalExt": "",
    "CountryCode": "USA"
  },
  "location": {
    "x": -117.20378869939896,
    "y": 34.036582574473556,
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 4326
    }
  }
}
```

## Choose specific output features

Locators built with the [Create Locator](https://pro.arcgis.com/en/pro-app/latest/tool-reference/geocoding/create-locator.htm) geoprocessing tool are configured to return the most relevant address or place for a given `reverseGeocode` input location. However, as a developer of an application that uses reverse geocoding, you may want more control over reverse geocode results. For example, you may want users of your application to choose the features that are returned when they reverse geocode a location, or the search tolerances mentioned in the previous table aren't sufficient and you want more distant addresses to be returned. Maybe you want to return `StreetInt` matches. You can use the `featureTypes` parameter to satisfy such requirements by refining reverse geocoding results.

You can use the `featureTypes` parameter to specify one or more match types to be returned by a `reverseGeocode` request. If one value is included for `featureTypes` , the search tolerance is extended to 500 meters. If the `featureTypes` parameter includes multiple values, the search tolerances defined in the feature types hierarchy table above are used. Details for the logic used by the `featureTypes` parameter are described below.

### featureTypes match conditions

-   If `featureTypes` is blank, the match is based on the default feature type hierarchy and search tolerances defined in the feature type hierarchy table, excluding `StreetInt` . `StreetInt` matches are only returned if `StreetInt` is included in the `reverseGeocode` request.
    
-   If `featureTypes` includes a single value, a search tolerance of 500 meters is used and only the input feature type is searched for.
    
    -   If the input feature type exists within 500 meters of the input location, a match to that feature is returned.
    -   If there are no matches to the input feature type within 500 meters of the input location, no match is returned for the `reverseGeocode` request.
-   If `featureTypes` includes multiple values, the default search tolerances for the input feature types as defined in the feature type hierarchy table are used to determine the match.
    
    -   If the input location is within the search tolerance of only one of the input feature types, a match to that feature type is retuned.
    -   If the input location is within the search tolerance of multiple input feature types, a match to the input feature type with the highest priority is returned.
    -   If the input location is not within the search tolerance of any of the input feature types, no match is returned.

### featureTypes example 1: Reverse geocode an intersection

In this example, the `featureTypes` parameter is used to return a `StreetInt` match with a `reverseGeocode` request.

#### Request URL



```
https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/reverseGeocode?f=pjson&featureTypes=StreetInt&location=-117.203741,34.036609
```

#### JSON Response



```
{
  "address": {
    "Match_addr": "W Fern Ave & Terracina Blvd, Redlands, California, 92373",
    "LongLabel": "W Fern Ave & Terracina Blvd, Redlands, CA, 92373, USA",
    "ShortLabel": "W Fern Ave & Terracina Blvd",
    "Addr_type": "StreetInt",
    "Type": "",
    "PlaceName": "",
    "AddNum": "",
    "Address": "W Fern Ave & Terracina Blvd",
    "Block": "",
    "Sector": "",
    "Neighborhood": "Live Oak Canyon",
    "District": "",
    "City": "Redlands",
    "MetroArea": "Inland Empire",
    "Subregion": "San Bernardino County",
    "Region": "California",
    "Territory": "",
    "Postal": "92373",
    "PostalExt": "",
    "CountryCode": "USA"
  },
  "location": {
    "x": -117.20373988021336,
    "y": 34.036630049364923,
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 4326
    }
  }
}
```

### featureTypes example 2: Multiple input featureTypes values

A typical use case for the `featureTypes` parameter is to exclude matches to nonaddress features, which can be accomplished by setting `featureTypes` as `PointAddress` and `StreetAddress` . In this example, the input location is within the search tolerance of both POI and `PointAddress` features, but a match to `PointAddress` is returned because `featureTypes` is used to exclude the POI match.

#### Request URL



```
https://[myServerURL]/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=PointAddress,StreetAddress&location=-117.205453,34.037988
```

#### JSON Response



```
{
  "address": {
    "Match_addr": "257 Terracina Blvd, Redlands, California, 92373",
    "LongLabel": "257 Terracina Blvd, Redlands, CA, 92373, USA",
    "ShortLabel": "257 Terracina Blvd",
    "Addr_type": "PointAddress",
    "Type": "",
    "PlaceName": "",
    "AddNum": "257",
    "Address": "257 Terracina Blvd",
    "Block": "",
    "Sector": "",
    "Neighborhood": "",
    "District": "",
    "City": "Redlands",
    "MetroArea": "",
    "Subregion": "San Bernardino County",
    "Region": "California",
    "Territory": "",
    "Postal": "92373",
    "PostalExt": "",
    "CountryCode": "USA"
  },
  "location": {
    "x": -117.20538197886449,
    "y": 34.038152999262394,
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 4326
    }
  }
}
```