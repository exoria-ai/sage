# Suggest

> Source: [/rest/services-reference/enterprise/suggest/](https://developers.arcgis.com/rest/services-reference/enterprise/suggest/)

**URL:**: https://<geocodeservice-url>/suggest

**Methods:**: GET

**Version Introduced:**: 10.3

## Description

The `suggest` operation is performed on a [geocode service resource](/rest/services-reference/enterprise/geocode-service/). The result of this operation is a resource representing a list of suggested matches for the input text. This resource provides the matching text as well as a unique ID value, which links a suggestion to a specific place or address.

All geocode services support `suggest` if the locator on which the geocode service is based was built using the [Create Locator](https://pro.arcgis.com/en/pro-app/latest/tool-reference/geocoding/create-locator.htm) geoprocessing tool and is published to ArcGIS Server 10.6 or later. The `suggest` operation is also supported for geocode services based on a locator that was built using the [Create Feature Locator](https://pro.arcgis.com/en/pro-app/latest/tool-reference/geocoding/create-feature-locator.htm) geoprocessing tool and is published to ArcGIS Server 10.8 or later.

The `suggest` operation allows character-by-character autocomplete suggestions to be generated for user input in a client application. This capability facilitates the interactive search experience by reducing the number of characters that need to be typed before a suggested match is obtained. A client application can provide a list of suggestions that is updated with each character typed until the expected address appears in the list.

For example, if you want to find 27488 Stanford Ave, Bowden, North Dakota, you can type `27488 stanfo` , and the complete street address is returned as an item in the suggestion list. If you are looking for a Disney park but don't know the proper name or address, you can also find it using `suggest` .

Most of the search types that can be made with the `findAddressCandidates` operation can also be made with suggestions. Specifically, the following types of searches are supported by the `suggest` operation:

-   Subaddress
    
    -   `3700 Dean Dr #1700, Ventura, Ca`
    -   `3700 Dean Dr, Unit 1705, Ventura, Ca`
-   Partial subaddress (part of the subaddress name is provided)
    
    -   `3700 Dean Dr #2, Ventura, Ca`
    -   `3700 Dean Dr, Unit 25`
-   Base address (subaddress summary or list of subaddresses after typing the base address)
    
    -   3700 Dean Dr, Ventura, Ca
-   Street addresses (including street name)
    
    -   `27488 Stanford Ave, Bowden, North Dakota`
    -   `380 New York St, Redlands, CA 92373`
-   Street intersections
    
    -   `New York St and W Redlands Blvd, Redlands, CA`
    -   `Jacques Veltmanstraat & Pieter Calandlaan, Amsterdam, NLD`
-   Points of interest (POI) by name
    
    -   `Disneyland`
    -   `Starbucks`
    -   `Mount Everest`
-   POI by type
    
    -   `amusement park`
    -   `coffee`
    -   `gas station`
-   Administrative place-names, such as city, county, state, province, or country names
    
    -   `Seattle`
    -   `State of Mahārāshtra`
    -   `Liechtenstein`
-   Postal codes
    
    -   `92591`
    -   `TW9 1DN`

Additionally, the `suggest` operation uses the same proximity algorithm as the `findAddressCandidates` operation.

## New at 11.2

The `returnCollections` parameter prevents collections from being returned in `suggest` responses from locators that support the POI role and have been built with the Create Locator tool in ArcGIS Pro 3.2 or later.

## New at 11.0

-   You can type part of the house number value for an address to return valid `suggest` candidates, such as `'s-Gravensloot 11,3444BJ` for the address 's-Gravensloot 115, 3444BJ, Woerden. The locator must support the [Point Address](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/introduction-to-locator-roles.htm#GUID-BA06C3FE-2210-4634-9E61-CA5BAA6E2E5E) role and been built with the [Create Locator](https://pro.arcgis.com/en/pro-app/latest/tool-reference/geocoding/create-locator.htm) tool in ArcGIS Pro 3.0 or later. The [**Show suggestions for partial house number**](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/tips-for-improving-geocoding-quality.htm#ESRI_SECTION2_3CD117B17C6643499C0739CDFF232040) setting must also be enabled in the **Suggest Options** section of the **Geocode options** page of the**Locator Properties** dialog box to use this functionality. However, this property is not supported for all countries.
-   If there are multiple subaddresses at an address, you can type the base address and a summary of the subaddress units at the address is returned as a suggestion or a list of subaddresses is returned. The locator that is based on the Point Address role that supports [subaddresses](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/introduction-to-locator-roles.htm#ESRI_SECTION2_F7EA996B99834714B77BFD8BD339821A) must be built with the Create Locator tool in ArcGIS Pro 3.0 or later. The [**Show summary of subaddresses with base address suggestion**](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/tips-for-improving-geocoding-quality.htm#ESRI_SECTION2_617CA424A1C04E0CB0689F015B9E2250) or [**Suggest when base address is typed**](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/tips-for-improving-geocoding-quality.htm#LI_F0983FC10A8746B18A13A2FBA4753689) setting must also be enabled in the **Suggest Options** section of the **Geocode options** page of the **Locator Properties** dialog box to use the functionality.
-   The Suggestions for partial subaddresses property is now called **Suggest as partial unit is typed** in ArcGIS Pro 3.0 or later and must be enabled to return valid subaddress `suggest` candidates after typing part of the subaddress name with or without an indicator.

## New at 10.9.1

If there are multiple subaddresses at an address, you can type part of the subaddress name with or without an indicator to return a list of valid subaddress `suggest` candidates. The locator that is based on the [Point Address](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/introduction-to-locator-roles.htm#GUID-BA06C3FE-2210-4634-9E61-CA5BAA6E2E5E) role that supports [subaddresses](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/introduction-to-locator-roles.htm#ESRI_SECTION2_F7EA996B99834714B77BFD8BD339821A) must be built with the [Create Locator](https://pro.arcgis.com/en/pro-app/latest/tool-reference/geocoding/create-locator.htm) tool in ArcGIS Pro 2.9 or later. The **Suggestions for partial subaddreses** setting must also be enabled on the **Locator Properties** dialog box to use this functionality.

## New at 10.8

The `preferredLabelValues` parameter allows simple configuration of suggestion labels returned in a response from the geocode service by specifying which address component values should be included in the label. If the parameter is blank or excluded from a request, the default address formats are used.

## Request parameters

| Parameter | Details |
|---|---|
| text(Required) | The input text provided, which is used by the suggest operation to generate a list of possible matches.Example text=starbu |
| location(Optional) | Defines an origin point that is used to prefer or boost geocoding candidates based on their proximity to the location. Candidates near the location are prioritized relative to those farther away. This is useful in mobile applications when a user wants to search for places in the vicinity of their current GPS location, or in mapping applications when users want to search for places near the center of the map.The location can be represented with a simple comma-separated syntax (x,y), or as a JSON point object. If the comma-separated syntax is used, the spatial reference of the coordinates must be WGS84; otherwise, the spatial reference of the point coordinates can be defined in the JSON object.Example 2 3 4 5 //simple syntax (WGS84) location=-117.196,34.056 //JSON with spatial reference location= { "x": -13046165.572, "y": 4036389.847, "spatialReference": { "wkid": 102100 } } |
| category(Optional) | A place or address type that can be used to filter suggest results. The parameter supports input of single-category values or multiple comma-separated values. The category parameter must be passed in a request with the text parameter.Example category=Address,Postal |
| searchExtent(Optional) | A set of bounding box coordinates that limit the search area for suggestions to a specific region. This is especially useful for applications in which a user will search for places and addresses within the current map extent.You can specify the spatial reference of the searchExtent coordinates, which is necessary if the map's spatial reference is different than that of the geocode service; otherwise, the spatial reference of the coordinates is assumed to be the same as that of the geocode service. The spatial reference of the geocode service is the same as the reference data that was used to build the locator on which the geocode service is based.The input can be either a comma-separated list of coordinates defining the bounding box or a JSON envelope object. The spatial reference of the bounding box coordinates can be included if an envelope object is used.Example 2 3 4 5 //coordinates defining the bounding box searchExtent=-104,35.6,-94.32,41 //JSON envelope object searchExtent= { "xmin" : -109.55, "ymin" : 25.76, "xmax" : -86.39, "ymax" : 49.94, "spatialReference" : {"wkid" : 4326} } |
| maxSuggestions(Optional) | The maximum number of suggestions returned by the suggest operation, up to the maximum number allowed by the service. If a maxSuggestions value is not included in the suggest request, the default value is 5. The maximum suggestions value can be modified in the source address locator.Example maxSuggestions=10 |
| countryCode(Optional) | Limits the returned suggestions to values in a particular country. Valid two- and three-character country code values for each country are available in geocode coverage.Example countryCode=USA |
| preferredLabelValues(Optional) | Allows simple configuration of suggestion labels returned in a response from the geocode service by specifying which address component values should be included in the label. A single value is supported as input. If the parameter is blank or excluded from a request, the default address formats are used.A particular address may have multiple city names associated with it. In the United States for example, all addresses have a ZIP code (postal code) assigned to them. Each ZIP code has one or more associated locality names, which are known as postal cities. There is always one primary postal city value for each ZIP code. ZIP codes typically have no set boundaries, and the primary postal city name for the ZIP code that is assigned to an address may be different than the name of the local city that the address is in.Additional details:The preferredLabelValues parameter takes a comma-delimited collection of values as input.The parameter values correspond to two groups: a City group and a Street group, indicated by the suffix of the value name. The postalCity , localCity , and matchedCity values are part of the City group. The primaryStreet and matchedStreet values are part of the Street group.A geocode request can include one City value and one Street value, for example, preferredLabelValues=primaryStreet,postalCity .A request can only include one value per group. In other words, a request with preferredLabelValues=matchedCity,postalCity is invalid. |
| returnCollections(Optional) | The returnCollections parameter can be used to prevent collections from being returned in suggest responses. The default value is true , which means that collections are included in suggest responses by default.Example: Disable collections in suggest responses returnCollections=false |
| partialHouseNumber(optional) | Introduced at ArcGIS Enterprise 12.0. The partialHouseNumber parameter allows PointAddress suggestions to be returned when only a partial house number is included in the input. For example, if partialHouseNumber is set as true and the text value is "Verlengde Nieuwstraat 12", the following PointAddress suggestions are returned: 2 3 4 5 Verlengde Nieuwstraat 121, 3011 GX Rotterdam, NLD Verlengde Nieuwstraat 123, 3011 GX Rotterdam, NLD Verlengde Nieuwstraat 125, 3011 GX Rotterdam, NLD Verlengde Nieuwstraat 127, 3011 GX Rotterdam, NLD Verlengde Nieuwstraat 129, 3011 GX Rotterdam, NLDThe default value is false.Values: true \| false |
| partialSubaddress(optional) | Introduced at ArcGIS Enterprise 12.0. The partialSubaddress parameter allows subaddress suggestions to be returned when only a partial subunit is included in the input. For example, if partialSubbaddress is set as true and the text value is "333 S Hope St #5", the following subaddress suggestions are returned: 2 3 4 5 333 S Hope St, Suite 50, Los Angeles, CA, 90071, USA 333 S Hope St, Suite 51, Los Angeles, CA, 90071, USA 333 S Hope St, Suite 52, Los Angeles, CA, 90071, USA 333 S Hope St, Suite 53, Los Angeles, CA, 90071, USA 333 S Hope St, Suite 54, Los Angeles, CA, 90071, USAThe default value is false.Values: true \| false |
| subaddressSummary(optional) | Introduced at ArcGIS Enterprise 12.0.When the subaddressSummary parameter is set as true, information about the count or range of subaddresses that belong to a requested PointAddress is included in the response.In most cases the summary is represented as a range of subaddresses. For example, if subaddressSummary is set as true and the text value is "865 S Figueroa St", the following suggestion is returned: 865 S Figueroa St (Suite 10-3500), Los Angeles, CA, 90017, USAIf the subaddresses have different unit types (such as "Apt 1" and "Suite 100"), or if they include multiple subunit components (such as units and levels), then the summary is represented as a count. For example: 900 Wilshire Blvd (190 units), Los Angeles, CA, 90017, USAThe default value is false.Values: true \| false |
| subaddressAfterBaseAddress(optional) | Introduced at ArcGIS Enterprise 12.0. When the subaddressAfterBaseAddress parameter is set as true, a list of subaddresses that belong to a requested PointAddress is returned. The subaddresses are ordered after the base PointAddress. For example, if subaddressAfterBaseAddress is set as true and the text value is "805 N Dalton Ave, Azusa", the following suggestions are returned: 2 3 4 5 16014 Adelante St, Irwindale, CA, 91702, USA 16014 Adelante St, Suite A, Irwindale, CA, 91702, USA 16014 Adelante St, Suite B, Irwindale, CA, 91702, USA 16014 Adelante St, Suite C, Irwindale, CA, 91702, USA 16014 Adelante St, Suite D, Irwindale, CA, 91702, USAThe default value is false. Values: true \| false |
| f(Required) | The response format. The default response format is html .Values: html \| json \| pjson |

## Suggest output

The response returned by a `suggest` request is composed of an array of suggestions; each suggestion contains the suggestion `text` value, a `magicKey` value, and the `isCollection` flag. A maximum of five suggestions are included in the suggestions array.

### Output properties

#### text

The suggestion text can be used in a client application to populate a list of suggestions as a user enters characters in a search text box.

It can also be included with `magicKey` in a [`findAddressCandidates`](/rest/services-reference/enterprise/find-address-candidates/) request to quickly retrieve a geosearch candidate.

Example:



```
"text": Starbucks, 1265 Alabama St, Redlands, California
```

#### magicKey

An ID attribute value that, along with the `text` attribute, links a suggestion to an address or place.

After a `suggest` request is made, the typical workflow is to pass the `text` (as the `SingleLine` parameter value) and `magicKey` values in a `findAddressCandidates` request, which retrieves the result in less time than passing in only a `SingleLine` value.

Example:



```
"magicKey": JS91CYhQDS5vDPhvSMyGZby0YFbaUDoaM5bHMoFF
```

#### isCollection

A Boolean parameter that indicates whether the suggestion item represents a collection of places, as opposed to a specific place.

If `isCollection = true` for a suggestion item, it means the item represents a search term for a common place-name or POI category. For example, suggestion items such as `Starbucks` , `McDonald's` , `Gas Station` , and `Airport` will have `isCollection = true` .

If `isCollection = false` , the suggestion item represents a specific place-name or address. For example, suggestion items such as `Disneyland` and `380 New York St, Redlands, CA` will have `isCollection = false` .

This flag can be used by application developers to apply different behavior to cases in which `isCollection` is `true` versus cases in which `isCollection` is `false` .

Example (for POI categories and common place-names):



```
"isCollection": true
```

Example (for street addresses, postal codes, admin places, and POIs):



```
"isCollection": false
```

### Work with suggestions

In broad terms, the suggestions engine compares tokens in the input text with indexed terms for each address and place in the service, and returns the closest matches. The input parameters included in the request affect the results. For instance, including the `location` parameter in the request influences the results to favor places near the defined location.

The `suggest` operation is intended to be used by a client application to provide a list of suggested matches as a user enters text in a search box. With each character entered in the search box, the list of suggestions updates, until one of the suggestions matches.

When the user selects a suggestion, the `text` and `magicKey` values for that suggestion can be passed with a [`findAddressCandidates`](/rest/services-reference/enterprise/find-address-candidates/) request as the values for the `SingleLine` and `magicKey` input parameters, respectively:

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?SingleLine="<text1>"&magicKey="<magicKey1>"&f=json`

#### Use proximity with suggestions

As with the `findAddressCandidates` request, `suggest` allows location values to be passed with the request to prioritize places that are closest to the specified location.

Using the `location` parameter, you can define an area of influence for your searches. The `location` value represents the center point of the area, which spans a radius of 50,000 meters. Features closest to the input location appear higher in the list of suggestions. Results that are within the area of influence receive a greater boost than those outside the area.

To understand how the use of proximity influences `suggest` results, consider the following example. If the map location is in Las Vegas, and a user types `Treas` in a search box, the returned suggestions are all related to Treasure Island Hotel and Casino in Las Vegas.

#### Example: Get suggestions using location

Request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceURL]/GeocodeServer/suggest?text=treas&location=-115.172783,36.114789&f=pjson`

Suggest JSON response



```
{
 "suggestions": [
  {
   "text": "Treasure Island, 3300 Las Vegas Blvd S, Las Vegas, NV, 89109, USA",
   "magicKey": "dHA9MCNsb2M9MzE5Mjk3NiNsbmc9MzMjcGw9MzUzNTAzI2xicz0xNDozNzMxNjQ2NA==",
   "isCollection": false
  },
  {
   "text": "Treasure Island-Las Vegas, 3300 Las Vegas Blvd S, Las Vegas, NV, 89109, USA",
   "magicKey": "dHA9MCNsb2M9MzE5Mjk3NiNsbmc9MzMjcGw9MzUzNTQ0I2xicz0xNDozNzMxNjU2Mg==",
   "isCollection": false
  },
  {
   "text": "Treasure Island Parking, Mel Torme Way, Las Vegas, NV, 89109, USA",
   "magicKey": "dHA9MCNsb2M9MzE5Mjk4OCNsbmc9MzMjcGw9MzUzNTg2I2xicz0xNDozNzMxNjUzMA==",
   "isCollection": false
  },
  {
   "text": "Treasure Island, Las Vegas, NV, 89109, USA",
   "magicKey": "dHA9MCNsb2M9MzE5Mjk0NyNsbmc9MzMjcGw9MzUzMzY0I2xicz0xNDozNzMxNjQ2NA==",
   "isCollection": false
  },
  {
   "text": "Treasure Island Parking, Industrial Rd, Las Vegas, NV, 89109, USA",
   "magicKey": "dHA9MCNsb2M9MzE5Mjk0OCNsbmc9MzMjcGw9MzUzMzc1I2xicz0xNDozNzMxNjUzMA==",
   "isCollection": false
  }
 ]
}
```

If the user enters the same text in the search box but is zoomed out to an extent for which proximity search is not used, and the `location` parameter is not passed in the `suggest` request, only admin places whose names begin with Treas are returned in the suggestions list.

#### Example: Get suggestions without location

Request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/suggest?text=treas&f=pjson`

Suggest JSON response



```
{
 "suggestions": [
  {
   "text": "Treasure Bay, Islands, HKG",
   "magicKey": "dHA9MCNsb2M9MzYzMzA4ODYjbG5nPTMzI3BsPTI0Mjc2NTY0I2xicz0xNDozNzMxNjAzOA==",
   "isCollection": false
  },
  {
   "text": "Treasure Court, Yuen Long, HKG",
   "magicKey": "dHA9MCNsb2M9MzYzMzE4ODYjbG5nPTMzI3BsPTI0Mjc3MTM0I2xicz0xNDozNzMxNjI3Mw==",
   "isCollection": false
  },
  {
   "text": "Treasure Garden, Sha Tin, HKG",
   "magicKey": "dHA9MCNsb2M9MzYzMjUxMTUjbG5nPTMzI3BsPTI0MjczNjYyI2xicz0xNDozNzMxNjM0Ng==",
   "isCollection": false
  },
  {
   "text": "Treasure Spot Garden Ii, Sha Tin, HKG",
   "magicKey": "dHA9MCNsb2M9MzYzMjUzNjkjbG5nPTMzI3BsPTI0MjczOTE2I2xicz0xNDozNzMxNjcyMQ==",
   "isCollection": false
  },
  {
   "text": "Treasure Spot Palace, Sha Tin, HKG",
   "magicKey": "dHA9MCNsb2M9MzYzMjUyMzgjbG5nPTMzI3BsPTI0MjczNzg1I2xicz0xNDozNzMxNjcyMg==",
   "isCollection": false
  }
 ]
}
```

It is important to note that proximity search does not filter out results that are far from the input location—it is intended to influence the sort order of results so the most locationally relevant matches are returned first. For example, if your location is in Seattle and you type `Mount Ver` , the first suggestion in the list is Mount Vernon, Washington, United States. The second is Mount Vernon, Westchester County, New York, United States. Even though Mount Vernon in New York is far from Seattle, it is still returned because it is the second most relevant candidate based on its distance from the location and its rank. To limit suggestions to a specific area, use the `searchExtent` parameter.

#### Limit suggestions to a specified area

Unlike the `location` parameter, the `searchExtent` parameter filters out suggestions for places that are outside the specified area. To confine suggestions to a localized area, such as the current map extent, you can use `searchExtent` to define a bounding rectangle to search within. Bounding rectangle coordinates can be entered as a simple comma-separated string in the format <lower left corner>,<upper right corner>. If this simple format is used, the coordinates must be in the default spatial reference of the geocode service.

To see how `searchExtent` affects suggestions, consider the following example. Assume that a user of your app has zoomed the map to the extent of Kansas City, Missouri, and enters `Main St` in the search box. If the map extent is passed as the `searchExtent` parameter in a `suggest` request, only suggestions beginning with Main St in Kansas City are returned.

#### Example: Get suggestions using searchExtent

Request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/suggest?text=main%20st&category=&searchExtent=-94.602026,39.083630,-94.570151,39.109774&location=&f=pjson`

Suggest JSON response



```
{
 "suggestions": [
  {
   "text": "Main St, Kansas City, MO, 64106, USA",
   "magicKey": "dHA9MCNsb2M9NzM2NjAyMSNsbmc9MzMjbGJzPTEwOTo0OTU5NTU0OQ==",
   "isCollection": false
  },
  {
   "text": "Main St, Kansas City, MO, 64105, USA",
   "magicKey": "dHA9MCNsb2M9NzM2NjAzNCNsbmc9MzMjbGJzPTEwOTo0OTU5NTU0OQ==",
   "isCollection": false
  },
  {
   "text": "Main St, Kansas City, MO, 64108, USA",
   "magicKey": "dHA9MCNsb2M9NzM2NDYwOSNsbmc9MzMjbGJzPTEwOTo0OTU5NTU0OQ==",
   "isCollection": false
  },
  {
   "text": "Main Street Parking Garage, 1026 Main St, Kansas City, MO, 64105, USA",
   "magicKey": "dHA9MCNsb2M9NzM2NzYyMCNsbmc9MzMjcGw9OTIwMTQ5I2xicz0xNDoyMjcyNDM1Mw==",
   "isCollection": false
  }
 ]
}
```

You can specify a spatial reference for `searchExtent` , which is necessary if your map uses a different spatial reference than the geocode service. For example, the default ArcGIS.com basemaps use a Web Mercator spatial reference (WKID = 102100) with coordinates in meters. The `searchExtent` must be passed as a [JSON envelope object](/rest/services-reference/enterprise/geometry-objects/#envelope) if the coordinates are in a spatial reference other than that of the geocode service. The following request URL uses the previous example of Main St in Kansas City but specifies the bounding rectangle with Web Mercator coordinates.

#### Example: Get suggestions using searchExtent with a JSON envelope object

Request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/suggest?text=main%20st&searchExtent=%7B%22xmin%22%3A-10531043%2C%22ymin%22%3A4733652%2C%22xmax%22%3A-10527501%2C%22ymax%22%3A4737408%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D&outSR=102100&f=pjson`

Suggest JSON response



```
{
 "suggestions": [
  {
   "text": "Main St, Kansas City, MO, 64106, USA",
   "magicKey": "dHA9MCNsb2M9NzM2NjAyMSNsbmc9MzMjbGJzPTEwOTo0OTU5NTU0OQ==",
   "isCollection": false
  },
  {
   "text": "Main St, Kansas City, MO, 64105, USA",
   "magicKey": "dHA9MCNsb2M9NzM2NjAzNCNsbmc9MzMjbGJzPTEwOTo0OTU5NTU0OQ==",
   "isCollection": false
  },
  {
   "text": "Main St, Kansas City, MO, 64108, USA",
   "magicKey": "dHA9MCNsb2M9NzM2NDYwOSNsbmc9MzMjbGJzPTEwOTo0OTU5NTU0OQ==",
   "isCollection": false
  },
  {
   "text": "Main Street Parking Garage, 1026 Main St, Kansas City, MO, 64105, USA",
   "magicKey": "dHA9MCNsb2M9NzM2NzYyMCNsbmc9MzMjcGw9OTIwMTQ5I2xicz0xNDoyMjcyNDM1Mw==",
   "isCollection": false
  }
 ]
}
```

### Use the isCollection property

The `isCollection` property is a Boolean flag that indicates the type of suggestion item returned by a `suggest` request. When `isCollection = true` , the suggestion item represents a general search term for a POI type or a common place-name corresponding to multiple locations, such as Hotel, Clothing Store, or McDonald's. When `isCollection = false` , the suggestion item represents the name of a discrete address or place, such as Paris, France, Disneyland, or 380 New York St, Redlands, CA.

In general, when a suggestion `text` and `magicKey` pair for which `isCollection = true` is sent in a [`findAddressCandidates`](/rest/services-reference/enterprise/find-address-candidates/) request, multiple candidates are returned with the same name (Starbucks) or category (Coffee Shop); typically, all of the candidates are equally relevant to the search. When `isCollection = false` , there may be one or more candidates returned; if there are multiple candidates, the first one is usually the best match and the most relevant to the search.

Consider the following example. A user of a mapping app is zoomed in to the extent of Sydney, Australia, and types `coffee` in a search box.

#### Example: Use isCollection

Request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/suggest?text=coffee&location=151.229129,-33.879741&f=pjson`

Suggest JSON response



```
{
 "suggestions": [
  {
   "text": "Coffee",
   "magicKey": "dHA9MiNubT1Db2ZmZWUjc3o9MTUxLjIyOTEyOTotMzMuODc5NzQxMDAwMDAwMDAzI2NzPTcw",
   "isCollection": true
  },
  {
   "text": "Coffee Tea & Me, 87 Macleay St, Potts Point, Sydney, New South Wales, 2011, AUS",
   "magicKey": "dHA9MCNsb2M9MjcwNTA3OTQjbG5nPTMzI3BsPTE2NTU4Nzg1I2xicz0xNDoxMDMxNzg3Mw==",
   "isCollection": false
  },
  {
   "text": "Coffee Bar by Espresso'd, Arnold Pl, Darlinghurst, Sydney, New South Wales, 2010, AUS",
   "magicKey": "dHA9MCNsb2M9MjcwNjcwNDMjbG5nPTMzI3BsPTE2NTgxMDU3I2xicz0xNDoxMDMxMTQ4OQ==",
   "isCollection": false
  },
  {
   "text": "Coffee Tea & Me, 224 Oxford St, Bondi Junction, Sydney, New South Wales, 2022, AUS",
   "magicKey": "dHA9MCNsb2M9MjcwMzg0MjYjbG5nPTMzI3BsPTE2NTQyNjczI2xicz0xNDoxMDMxNzg3Mw==",
   "isCollection": false
  },
  {
   "text": "Coffee Dozo, 84 Mary St, Surry Hills, Sydney, New South Wales, 2010, AUS",
   "magicKey": "dHA9MCNsb2M9MjcwNDM5MjAjbG5nPTMzI3BsPTE2NTQ4OTk0I2xicz0xNDoxMDMxMzEzNw==",
   "isCollection": false
  }
 ]
}
```

In this example, `isCollection = true` for the first suggestion item, Coffee Shop. The `text` and `magicKey` for this item correspond to a search for places of POI category Coffee Shop within approximately 5,000 meters of a location in Sydney, Australia. The `text` and `magicKey` combinations of the rest of the items for which `isCollection = false` represent the names of coffee shops that are within 5,000 meters of the location.

When the `text` and `magicKey` combination of the item for which `isCollection = true` is sent to the geocode service in a [`findAddressCandidates`](/rest/services-reference/enterprise/find-address-candidates/) request with `maxLocations=10` , several coffee shops are returned.

#### Example: Use suggest result in a findAddressCandidates request when isCollection = true

Request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeingServiceName]/GeocodeServer/findAddressCandidates?singleLine=Coffee&magicKey=dHA9MiNubT1Db2ZmZWUjc3o9MTUxLjIyOTEyOTotMzMuODc5NzQxMDAwMDAwMDAzI2NzPTcw&maxLocations=10&outFields=Match_addr,Place_addr,Type&f=pjson`

`findAddressCandidates` JSON response



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "Cafe Green Bay",
   "location": {
    "x": 151.2278500000001,
    "y": -33.87797999999998
   },
   "score": 100,
   "attributes": {
    "Match_addr": "Cafe Green Bay",
    "Type": "Coffee Shop",
    "Place_addr": "50 McLachlan Ave, Darlinghurst, Sydney, New South Wales, 2010"
   },
   "extent": {
    "xmin": 151.22285000000011,
    "ymin": -33.882979999999982,
    "xmax": 151.2328500000001,
    "ymax": -33.872979999999977
   }
  },
  {
   "address": "Stranger Espresso",
   "location": {
    "x": 151.22705000000008,
    "y": -33.878289999999936
   },
   "score": 100,
   "attributes": {
    "Match_addr": "Stranger Espresso",
    "Type": "Coffee Shop",
    "Place_addr": "66 McLachlan Ave, Darlinghurst, Sydney, New South Wales, 2010"
   },
   "extent": {
    "xmin": 151.22205000000008,
    "ymin": -33.883289999999938,
    "xmax": 151.23205000000007,
    "ymax": -33.873289999999933
   }
  },
...
```

If `maxLocations=10` had not been explicitly passed in the `findAddressCandidates` request, up to 50 candidates would have been returned, because the `findAddressCandidates` operation returns all matching candidates (up to the maximum allowed by the service) in the absence of the `maxLocations` parameter. Also note that the JSON response shown here has been truncated to preserve space.

If the `text` and `magicKey` combination of any of the items for which `isCollection = false` are passed in a `findAddressCandidates` request, only a single candidate is returned.

#### Example: Use suggest result in a findAddressCandidates request when isCollection = false

Request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?singleLine=Coffee%20Tea%20&%20Me,%2087%20Macleay%20St,%20Potts%20Point,%20Sydney,%20New%20South%20Wales,%202011,%20AUS&magicKey=dHA9MCNsb2M9MjcwNTA3OTQjbG5nPTMzI3BsPTE2NTU4Nzg1I2xicz0xNDoxMDMxNzg3Mw&f=pjson`

`findAddressCandidates` JSON response



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "Coffee Tea & Me",
   "location": {
    "x": 151.22490000000005,
    "y": -33.871059999999943
   },
   "score": 100,
   "attributes": {

   },
   "extent": {
    "xmin": 151.21990000000005,
    "ymin": -33.876059999999946,
    "xmax": 151.22990000000004,
    "ymax": -33.866059999999941
   }
  }
 ]
}
```

A developer can use the `isCollection` property to properly handle cases such as this in their application. Specifically, for cases where `isCollection = true` , the `maxLocations` parameter should be included in the corresponding `findAddressCandidates` request and set to 5 or greater. Often, there are more than 5 or even 10 matches for such cases, so consider implementing pagination in the application to show the user more results. For cases in which `isCollection = false` , the `maxLocations` parameter should be set to 1.

### Disabling collections

If collections are not needed for your application, you can use the `returnCollections` parameter to prevent them from being returned in `suggest` responses. Specifically, if `returnCollections=false` is included in a `suggest` request, only suggestion items with `isCollection = false` are returned in the response. Collections are returned by default for `suggest` , so `returnCollections=false` must be included in the `suggest` request to disable this feature.

#### Example: Disable collections by using `returnCollections=false` with input text `w` and location in Washington, DC (`location=-77.043,38.91` )

Request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/suggest?text=w&location=-77.043,38.91&returnCollections=false&f=pjson`

Suggest JSON response



```
{
 "suggestions": [
  {
   "text": "White House, 1600 Pennsylvania Ave NW, Washington, DC, 20500, USA",
   "magicKey": "dHA9MCN0dj02NGZmOGI5YSNsb2M9MjY4NjEyOCNsbmc9NTUjcGw9MjM0MTUwOCNsYnM9MTQ6NTM0MzM3MTQjbG49RWFnbGVMb2NhdG9y",
   "isCollection": false
  },
  {
   "text": "Washington, DC, USA",
   "magicKey": "dHA9MCN0dj02NGZmOGI5YSNsb2M9MjY4MTA4NyNsbmc9NTUjcGw9MjMzNzMyMyNsYnM9MTQ6NTMxMTExMjQjbG49RWFnbGVMb2NhdG9y",
   "isCollection": false
  },
  {
   "text": "Washington Monument, 2 15th St NW, Washington, DC, 20024, USA",
   "magicKey": "dHA9MCN0dj02NGZmOGI5YSNsb2M9MjY4NjI3OSNsbmc9NTUjcGw9MjM0MTY3NSNsYnM9MTQ6NTMxMTMyODgjbG49RWFnbGVMb2NhdG9y",
   "isCollection": false
  },
  {
   "text": "Walt Disney World Resort, 3111 World Dr, Orlando, FL, 32830, USA",
   "magicKey": "dHA9MCN0dj02NGZmOGI5YSNsb2M9Mjk5NTc3NCNsbmc9NTUjcGw9MjQ0ODU3MCNsYnM9MTQ6NTI5MzU2NjEjbG49RWFnbGVMb2NhdG9y",
   "isCollection": false
  },
  {
   "text": "Winter Park Resort, 85 Parsenn Rd, Winter Park, CO, 80482, USA",
   "magicKey": "dHA9MCN0dj02NGZmOGI5YSNsb2M9MjI4MDI1NSNsbmc9NTUjcGw9MTk2MTczOSNsYnM9MTQ6NTM1NzIzNjIjbG49RWFnbGVMb2NhdG9y",
   "isCollection": false
  }
 ]
}
```

### Specify the number of suggestions

Depending on the use cases of your application, the default number of suggestions returned by a `suggest` request (5) may be too few, or too many. You can use the `maxSuggestions` parameter to set the number of suggestions.

#### Example: Choose the number of suggestions to return with maxSuggestions (with input text esri)

Request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/suggest?text=esri&maxSuggestions=8&f=pjson`

Suggest JSON response



```
{
 "suggestions": [
  {
   "text": "Esri, 380 New York St, Redlands, CA, 92373, USA",
   "magicKey": "dHA9MCNsb2M9ODU5NTQxMyNsbmc9MzMjcGw9MTA2ODg0MyNsYnM9MTQ6MTM2OTkzMjY=",
   "isCollection": false
  },
  {
   "text": "Esri Australia Pty. Ltd. – Brisbane Office, 111 Elizabeth Street, Brisbane, Queensland, 4000, AUS",
   "magicKey": "dHA9MCNsb2M9Mjc1MzAwMjUjbG5nPTMzI3BsPTE2ODQ4OTcwI2xicz0xNDoxMzY5OTMzMg==",
   "isCollection": false
  },
  {
   "text": "Esri Canada Ltd., 12 Concorde Place, Toronto, Ontario, M3C 3R8, CAN",
   "magicKey": "dHA9MCNsb2M9MTUzNDc3OTAjbG5nPTMzI3BsPTcyNzA2MzgjbGJzPTE0OjEzNjk5MzY0",
   "isCollection": false
  },
  {
   "text": "Esri Chile S.A., Apoquindo 6550, Las Condes, Santiago, 7560903, CHL",
   "magicKey": "dHA9MCNsb2M9MzEyNzQxNzMjbG5nPTE0MCNwbD0yMDExMDQwNiNsYnM9MTQ6MTM2OTkzNjg=",
   "isCollection": false
  },
  {
   "text": "Esri Deutschland GmbH, Ring Straße 7, 85402, Kranzberg, Bayern, DEU",
   "magicKey": "dHA9MCNsb2M9MTg1MTI3MDkjbG5nPTQ0I3BsPTk1MzkzODIjbGJzPTE0OjEzNjk5Mzc2",
   "isCollection": false
  },
  {
   "text": "Esri España Soluciones Geoespaciales S.L., Calle Emilio Muñoz 35, 28037, Simancas, Madrid, ESP",
   "magicKey": "dHA9MCNsb2M9MzUxOTY2NDEjbG5nPTE0MCNwbD0yMzQ4OTQ3MCNsYnM9MTQ6MTM2OTkzODE=",
   "isCollection": false
  },
  {
   "text": "Esri Finland Oy, Bertel Jungin Aukio 3, 02600, Espoo, FIN",
   "magicKey": "dHA9MCNsb2M9MzUzMTcxMDkjbG5nPTM5I3BsPTIzNjA0NjY0I2xicz0xNDoxMzY5OTM4Mw==",
   "isCollection": false
  },
  {
   "text": "Esri Ireland, Ashtown, Dublin, IRL",
   "magicKey": "dHA9MCNsb2M9Mzk1MDAwMjgjbG5nPTMzI3BsPTM5NTgzMTA5I2xicz0xNDoxMzY5OTM5Ng==",
   "isCollection": false
  }
 ]
}
```

### Category filtering

The `suggest` operation supports filtering searches by category values, which represent address and place types. By including the `category` parameter in a `suggest` request, you can avoid false positive matches to unexpected place and address types due to ambiguous searches.

For example, a user may type `Bear` in a search box, expecting the service to return Bear Mountain ski resort as a suggestion. However, there are many populated places in the world with Bear in their name, and this is reflected in the suggestions.

#### Example: Get suggestions for Bear without category

Request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/suggest?text=bear&category=&f=pjson`

JSON response



```
{
 "suggestions": [
  {
   "text": "Bear, DE, USA",
   "magicKey": "dHA9MCNsb2M9ODIyMTkzMCNsbmc9MzMjcGw9MTAyODUyMCNsYnM9MTQ6NzIxNjc0Ng==",
   "isCollection": false
  },
  {
   "text": "Bear Creek Twp, MI, USA",
   "magicKey": "dHA9MCNsb2M9NTI5OTk0MCNsbmc9MzMjcGw9NjIxMTkxI2xicz0xNDo3MjE3NDA3",
   "isCollection": false
  },
  {
   "text": "Bear Valley Springs, CA, USA",
   "magicKey": "dHA9MCNsb2M9MzY0Mzk3OSNsbmc9MzMjcGw9NDI2MTgzI2xicz0xNDo3MjE4Nzkx",
   "isCollection": false
  },
  {
   "text": "Bear Creek Twp, PA, USA",
   "magicKey": "dHA9MCNsb2M9NjY3OTg0NiNsbmc9MzMjcGw9ODM3MzIxI2xicz0xNDo3MjE3NDA3",
   "isCollection": false
  },
  {
   "text": "Bear Creek, PA, USA",
   "magicKey": "dHA9MCNsb2M9NjY3NTQ1NyNsbmc9MzMjcGw9ODM2NzIxI2xicz0xNDo3MjE3MTAy",
   "isCollection": false
  }
 ]
}
```

The solution for this case is to pass the `category` parameter in the request. By including `category=Ski Resort` in the request, all places that are not ski resorts are bypassed by the search, and only ski resorts whose names begin with Bear are returned.

#### Example: Get suggestions for Bear with category=Ski Resort

Request URL

`https://[myServiceURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/suggest?text=bear&category=Ski%20Resort&f=pjson`

JSON response



```
{
 "suggestions": [
  {
   "text": "Bear Creek Mountain Resort, 101 Doe Mountain Ln, Macungie, PA, 18062, USA",
   "magicKey": "dHA9MCNsb2M9NjY4NTkxMiNsbmc9MzMjcGw9ODM4Mjc1I2xicz0xNDo3MjE3Mjcz",
   "isCollection": false
  },
  {
   "text": "Bear Mountain, 43101 Goldmine Dr, Big Bear Lake, CA, 92315, USA",
   "magicKey": "dHA9MCNsb2M9MzI3NDk1NSNsbmc9MzMjcGw9MzYxNjIzI2xicz0xNDo3MjE4MDgw",
   "isCollection": false
  },
  {
   "text": "Bear Paw Ski Bowl, Beaver Creek Rd, Havre, MT, 59501, USA",
   "magicKey": "dHA9MCNsb2M9NDE2Mzk1NiNsbmc9MzMjcGw9NDgzOTQ0I2xicz0xNDo3MjE4MjUy",
   "isCollection": false
  },
  {
   "text": "Bear Peak, Grand Summit Rd, Bartlett, NH, 03812, USA",
   "magicKey": "dHA9MCNsb2M9NjU0MTgwOCNsbmc9MzMjcGw9ODE2MTI1I2xicz0xNDo3MjE4MjYz",
   "isCollection": false
  },
  {
   "text": "Bear Valley Mountain Resort, Mt Reba Rd, Markleeville, CA, 96120, USA",
   "magicKey": "dHA9MCNsb2M9MzgwMjM1MCNsbmc9MzMjcGw9NDQ0NzgxI2xicz0xNDo3MjE4NzYx",
   "isCollection": false
  }
 ]
}
```