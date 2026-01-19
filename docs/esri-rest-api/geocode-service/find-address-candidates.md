# Find Address Candidates

> Source: [/rest/services-reference/enterprise/find-address-candidates/](https://developers.arcgis.com/rest/services-reference/enterprise/find-address-candidates/)

**URL:**: https://<geocodeservice-url>/findAddressCandidates

**Methods:**: GETPOST

**Version Introduced:**: 9.3

## Description

The `findAddressCandidates` operation is performed on a [geocode service resource](/rest/services-reference/enterprise/geocode-service/). The result of this operation is a resource representing the list of address candidates. This resource provides information about candidates, including the address, location, and match score. Locators published using ArcGIS Server 10 or later support the `singleLine` address field for the `findAddressCandidates` operation. Single-field input is easier because the address parsing is done for you; however, multifield input may provide faster responses and more precise results.

There are several options for refining or restricting search results:

-   Specify output fields to return in the geocoding response with the `outFields` parameter.
-   Specify the spatial reference of candidates with the `outSR` parameter.
-   Limit the number of candidates with the `maxLocations` parameter.
-   Confine the search results to a specified area with the `searchExtent` parameter.
-   Use the `location` parameter to prefer local candidates, which will then be returned higher in the candidates list.
-   Filter search results using the `category` parameter.
-   Specify the language of geosearch candidates with the `langCode` parameter.
-   Specify rooftop or street location for PointAddress candidates with the `locationType` parameter.
-   Choose the type of city name or street name to be included in output fields with the `preferredLabelValues` parameter.

## New at 11.3

-   When sharing a locator based on the [Street Address](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/introduction-to-locator-roles.htm#ESRI_SECTION1_A88AD30450A14F2787939955C7C5BC12) role created with the Create Locator tool in ArcGIS Pro 3.3 or later, you must be signed in, with publisher or administrator privileges, with at least one federated server to search for a [street between two cross streets](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/introduction-to-locator-roles.htm#ESRI_SECTION2_F3D2807694AA4A588DF21E9884DB4159).
-   Locators created in ArcGIS Pro 3.3 or later that support the Street Address role locator support searching for a location on the street that is between two cross streets. The `Addr_type` value returned for this type of search is `StreetBetween`.

## New at 11.2

-   Locators created with the [Create Locator](https://pro.arcgis.com/en/pro-app/latest/tool-reference/geocoding/create-locator.htm) tool based on the Point Address, Parcel, or POI role or created with the [Create Feature Locator](https://pro.arcgis.com/en/pro-app/latest/tool-reference/geocoding/create-feature-locator.htm) tool using z-aware point features in ArcGIS Pro 3.2 or later will return candidates with z-coordinates.
-   Polygon output fields added to a locator by the Add Polygon Fields To Locator tool in ArcGIS Pro 3.2 or later, will be returned within the `attributes` object of the response `findAddressCandidate` as part of the `outFields` .

## New at 10.9

-   Maintaining [side offset](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/tips-for-improving-geocoding-quality.htm#ESRI_SECTION1_CBCA29056A7F4D7187049BECA6CC0B84), [end offset](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/tips-for-improving-geocoding-quality.htm#ESRI_SECTION1_1613A53EDD1344D7984C1DB3DB242297), and custom [intersection connectors](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/tips-for-improving-geocoding-quality.htm#ESRI_SECTION1_8BB6427CAC1B4CCD95BDF0619CA00DC2) settings requires a locator created in ArcGIS Pro 2.7 or later with the [Street Address](https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/introduction-to-locator-roles.htm#ESRI_SECTION1_A88AD30450A14F2787939955C7C5BC12) role.

## New at 10.8

The `preferredLabelValues` parameter allows simple configuration of output fields returned in a response from the geocoding service by specifying which address component values should be included in output fields.

## Request parameters

The `findAddressCandidates` operation has only one required parameter: `f` . However, you also need to include address or place information in the request, which can be done by passing the name as a single line or as multiple fields of text. To access single-line functionality, the `SingleLine` parameter is required. To access multifield functionality instead, any combination of the `address` , `neighborhood` , `city` , `region` , `subregion` , `countryCode` , and `postal` parameters is required.

| Parameter | Details |
|---|---|
| address , address2 , address3(Optional) | The full street address of a place (excluding administrative divisions and postal codes) may consist of multiple components, such as building name, street, and subunit (apartment). Web forms and written correspondence typically use multiple fields or lines to designate these components. The findAddressCandidates operation supports three address parameters which can be used to represent the different components of a street address: address , address2 , and address3 . If you want to geocode the address Beetham Tower, 301 Deansgate, Suite 4208, Manchester, England using multiple input fields, you can set address=Beetham Tower , address2=301 Deansgate , and address3=Suite 4208 .The address parameter is a string that represents the first line of a street address. In most cases, this field will be used for street name and house number input, but it can also be used to input building name or place-name.The address2 parameter is a string that represents the second line or a street address. This can include street name/house number, building name, place-name, or subunit.The address3 parameter is a string that represents the third line of a street address. This can include street name/house number, building name, place-name, or subunit.For additional example usage, see Address parameter syntax and examples. |
| neighborhood(Optional) | The smallest administrative division associated with an address, typically a neighborhood or a section of a larger populated place. A neighborhood is a subdivision of a city.Example of a neighborhood in Mexico (colonia): neighborhood=Herrera |
| city(Optional) | The next largest administrative division associated with an address, typically a city or municipality. A city is a subdivision of a subregion or a region.Example of a city in the United States: city=Los Angeles |
| subregion(Optional) | The next largest administrative division associated with an address. Depending on the country, a subregion can represent a county, state, or province.Example of a subregion (department) in France: subregion=Vienne |
| region(Optional) | The largest administrative division associated with an address, typically a state or province.Example of a region in the United States (state): region=Florida |
| postal(Optional) | The standard postal code for an address, typically a three- to six-digit alphanumeric code.Example: postal=92373 |
| postalExt(Optional) | A postal code extension, such as the United States Postal Service ZIP+4 code, which provides finer resolution or higher accuracy when also passing the postal parameter.Example: postalExt=1112 |
| countryCode(Optional) | A value representing the country in a multifield geocoding request. Providing this value increases geocoding speed. Acceptable values include the full country name in English or the official language of the country, the two-character country code, or the three-character country code. A list of supported countries and codes is available in the Geocode coverage topic.Example: countryCode=USA |
| singleLine(Optional) | Specifies the location to be geocoded. This can be a street address, place-name, postal code, or point of interest (POI). The input address components must be formatted as a single string.Example: singleLine=380 New York St, Redlands, California 92373 |
| category(Optional) | A place or address type that can be used to filter findAddressCandidate results. This parameter supports input of single category values or multiple, comma-separated values. The category parameter can be passed either in a request with the singleLine or multiline address parameters. It can also be passed in a request on its own without the singleLine or multiline address parameters. See Category filtering for complete parameter details.Example: category=Address,Postal |
| outFields(Optional) | The list of fields to be returned within the attributes object of the response. The address , location (x/y coordinates of the match location), score , extent , and spatialReference objects are returned in the response by default. If the outFields parameter is excluded from the request, or if it is included but no fields are specified, the attributes object in the corresponding response is blank.Examples: 2 3 4 5 //Return specified fields outFields=AddNum,StName,City //Return all fields outFields=* |
| maxLocations(Optional) | The maximum number of locations to be returned by a search, up to the maximum number allowed by the service. If not specified, all matching candidates up to the service maximum are returned.Example: maxLocations=10 |
| outSR(Optional) | The spatial reference of the x/y coordinates returned by a geocode request. This is useful for applications using a map with a spatial reference different than that of the geocode service.The spatial reference can be specified as either a well-known ID (WKID) or a JSON spatial reference object. If outSR is not specified, the spatial reference of the output locations is the same as that of the service. For a list of valid WKID values, see Using spatial references.Example: (102100 is the WKID for the Web Mercator projection); outSR=102100 |
| searchExtent(Optional) | A set of bounding box coordinates that limit the search area to a specific region. This is especially useful for applications in which a user will search for places and addresses within the current map extent.You can specify the spatial reference of the searchExtent coordinates, which is necessary if the map spatial reference is different than that of the geocoding service; otherwise, the spatial reference of the map coordinates is assumed to be the same as that of the geocoding service.The input can be either a comma-separated list of coordinates defining the bounding box or a JSON envelope object. The spatial reference of the bounding box coordinates can be included if an envelope object is used.Examples: 2 3 4 5 //coordinates defining the bounding box searchExtent=-104,35.6,-94.32,41 //JSON envelope object searchExtent= { "xmin" : -109.55, "ymin" : 25.76, "xmax" : -86.39, "ymax" : 49.94, "spatialReference" : {"wkid" : 4326} } |
| location(Optional) | Defines an origin point that is used to prefer or boost geocoding candidates based on their proximity to the location. Candidates near the location are prioritized relative to those farther away. This is useful in mobile applications where a user wants to search for places in the vicinity of their current GPS location, or in mapping applications where users want to search for places near the center of the map.The location can be represented with a simple comma-separated syntax (x,y), or as a JSON point object. If the comma-separated syntax is used, the spatial reference of the coordinates must be the same as the spatial reference of the locator on which the geocode service is based; otherwise, the spatial reference of the point coordinates can be defined in the JSON object.Examples: 2 //Simple syntax (default SR) location=-117.196,34.056 |
| magicKey(Optional) | The findAddressCandidates operation retrieves results quicker when you pass in valid singleLine and magicKey values than when you don't pass in magicKey . However, to get these advantages, you need to make a prior request to suggest , which provides a magicKey .The suggest operation is often called on to improve the user experience of search boxes by analyzing partial text and providing complete names of places, addresses, points of interest, and so on. For instance, typing Mbu in a search box offers Mbuji-Mayi, Democratic Republic of the Congo as a suggestion, so the user doesn't need to type the complete name.Looking at the suggestion process from another perspective, as the user types, the suggest operation performs a text search, which is a redundant part of the overall search that the findAddressCandidates operation can also perform. The user chooses a place-name or type, narrowing the results to a specific record. The results from suggest include text and magicKey values that contain the information the user chose; passing these values from suggest into findAddressCandidates results in faster and more accurate operations.In summary, using the magicKey parameter in findAddressCandidates is a two-step process:Make a request to suggest . The response includes text and magicKey properties.Make a request to findAddressCandidates and pass in the text and magicKey values returned from suggest as the SingleLine and magicKey input parameters, respectively. The magicKey parameter will not function correctly if passed alone. Both magicKey and SingleLine must be included in a findAddressCandidates request so the output matches the selected suggestion.Example: magicKey=JS91CYhQDS5vDPhvSMyGZby0YFbaUDoaM5bHMoFF |
| matchOutOfRange(Optional) | A Boolean that specifies whether StreetAddress matches should be returned even when the input house number is outside of the house number range defined for the input street. Out of range matches have Addr_type=StreetAddressExt . The geometry of such matches is a point corresponding to the end of the street segment where the range value is closest to the input house number. If matchOutOfRange is not specified in a request, its value is set to true by default.With matchOutOfRange , better spatial accuracy is provided for inexact street address searches. Most street segments are assigned house number ranges. For example, Main Street may include house numbers from 2-100 on one side of the street and 1-99 on the other. A user may search for a house number that is not within this range, such as 109 Main Street . If matchOutOfRange=false is passed in this request, the geocode service will return a StreetName-level match to Main Street , with geometry corresponding to the centerline of a street segment that most closely matches the input values. StreetName matches can be ambiguous because there may be multiple street segments with the same name that equally match the input. However, if matchOutOfRange=true in this case, a more precise geometry is returned to the specific side of the segment of Main Street with house number range 1-99.Values: true \| false |
| locationType(Optional) | Specifies whether the output geometry of PointAddress and Subaddress matches should be the rooftop point or street entrance location. Valid values are rooftop and street . The default value is rooftop .Geocode results include one geometry object (the location object) that defines the location of the address, as well as two sets of X/Y coordinate values within the attributes object: X/Y , and DisplayX/DisplayY . In most cases, for geocode results with Addr_type=PointAddress or Subaddress , the X/Y attribute values describe the coordinates of the address along the street, while the DisplayX/DisplayY values describe the rooftop, or building centroid, coordinates. By default, the geometry returned for geocode results represents the rooftop location of the address (if the rooftop location is available in the source data). This is useful for most spatial analysis and map display purposes. However, for routing scenarios, it may be desirable to use the street location because the rooftop location of some addresses may be offset from a street by a large distance. For these cases, the locationType parameter can be used to specify that the street entrance geometry should be returned.It is important to note that locationType is limited by the address data sources used to build the locator for the geocoding service. Not all PointAddress and Subaddress features include rooftop and street location coordinates. For some addresses, only a rooftop location is available; for others, only a street location is provided by the data source. For cases such as this, the locationType parameter may not function as expected. For example, if only rooftop location coordinates are available for an address, the rooftop geometry will be returned for the geocoded address even when locationType=streetis requested.Values: street \| rooftop |
| langCode(Optional) | Sets the language in which geocode results are returned. Addresses and places in many countries are available in more than one language; in these cases, the langCode parameter can be used to specify which language should be used for results returned by the findAddressCandidates operation. This is useful for ensuring that results are returned in the expected language. For example, a web application could be designed to get the browser language and pass it as the langCode parameter value in a findAddressCandidates request.See the table of supported countries for valid language code values in each country. Full language names cannot be used in the langCode parameter. Only one language code value can be included for the langCode parameter in a findAddressCandidates request.If the langCode parameter isn't included in a request, or if it is included but there are no matching features with the input language code, the resultant match is returned in the language code of the primary matched component from the input search string. Typically, this is either place-name or street name, depending on the search string.It is important to note that langCode is limited by the address data sources used to build the locator for the geocoding service. This parameter will be ignored when not supported by the data.Example: langCode=fr |
| sourceCountry(Optional) | Limits the candidates returned by the findAddressCandidates operation to the specified country or countries for either single-field or multifield requests. For example, if sourceCountry=USA is included in the request, it is assumed that the address is in the United States, so only matching addresses in USA are returned. Using this parameter prevents potential unexpected results in other countries for ambiguous searches.Acceptable values include the three-character country code. A list of supported countries and codes is available in Geocode coverage. Multiple country codes can be specified to limit results to more than one country.Example: sourceCountry=FRA,DEU,ESP |
| preferredLabelValues(Optional) | Allows simple configuration of output fields returned in a response from the geocoding service by specifying which address component values should be included in output fields. Supports a single value or a comma-delimited collection of values as input. If the parameter is blank or excluded from a request, default address label formats will be used.A particular address may have multiple city names associated with it. In the United States for example, all addresses have a ZIP code (postal code) assigned to them. Each ZIP code has one or more associated locality names, which are known as postal cities. There is always one primary postal city value for each ZIP code. ZIP codes typically have no set boundaries, and the primary postal city name for the ZIP code that is assigned to an address may be different than the name of the local city that the address is within.Additional details:The preferredLabelValues parameter takes a comma-delimited collection of values as input.The parameter values correspond to two groups: a City group and a Street group, indicated by the suffix of the value name. The postalCity , localCity , and matchedCity values are part of the City group. The primaryStreet and matchedStreet values are part of the Street group.A geocode request can include one City value and one Street value, for instance: preferredLabelValues=primaryStreet,postalCity .A request can only include one value per group. In other words, a request with preferredLabelValues=matchedCity,postalCity is invalid.Example: preferredLabelValues=matchedCity,primaryStreet |
| searchWithin(optional) | Introduced at ArcGIS Enterprise 12.0. The searchWithin parameter is used to specify the feature types for a collection of places that should be returned for a geocoded object. For example, searchWithin may be used to return all addresses that exist within a postal code, or all businesses located at a particular address.Collections can be returned for geocoded PointAddress and PostalExt records only.For geocoded PointAddress records, collections of Subaddresses or POIs (or both) are supported.For geocoded PostalExt results, collections of Point Addresses, Subaddresses, or POIs (or any combination of these) are supported for Great Britain or the Netherlands country locators.These are the supported parameter values:PointAddress- Return all records of type PointAddress which are associated with a geocoded object of type PostalExt.Subaddress- Return all records of type Subaddress which are associated with a geocoded object of type PostalExt or type PointAddress.POI- Return all records of type POI which are associated with a geocoded object of type PostalExt or type PointAddress.The searchWithin parameter also supports pagination. Because there may be hundreds or thousands of places that exist at or within a geocoded location, the searchWithin parameter is used along with the start and num parameters to break up large collections into manageable result sets, or pages, of 50 or fewer candidates. This is accomplished by passing consecutive requests to the geocode service with different start values.To support pagination, the JSON response includes the following properties at the end of the response when a collection is returned for a searchWithin request:total- The total count of candidates in the collection, including the geocoded object.start- The value that was passed in the request for the start parameter.num- The number of candidates in the page.nextStart- The value that should be used for the start parameter in the subsequent findAddressCandidates request.Example: Single feature type searchWithin=POIExample: Multiple feature types searchWithin=PointAddress,Subaddress,POI |
| start(Optional) | Introduced at ArcGIS Enterprise 12.0. The start parameter defines the result number to be returned as the first candidate in a response page. This parameter is used along with the searchWithin and num parameters to page through large result sets of more than 50 candidates. The default value of start is 1.The start parameter only functions when included in a request along with the searchWithin parameter.Example start=51 |
| num(Optional) | Introduced at ArcGIS Enterprise 12.0. The num parameter defines the number of candidates to be included in each response page. This parameter is used along with the searchWithin and start parameters to page through large result sets of more than 50 candidates. The default value of num is 50. Valid values include any integer between 1 and 50. If a value larger than 50 is specified, no more than 50 candidates are returned in the response.The num parameter only functions when included in a request along with the searchWithin parameter.Example num=20 |
| matchID(Optional) | Introduced at ArcGIS Enterprise 12.0. The matchID parameter allows you to search for an ID string value that represents an address or place. A matchID output field is also included in the findAddressCandidates response. The value for the matchID parameter can be obtained from a findAddressCandidates response and then be passed in a request at a later time. In most cases the matchID value for a particular address will be constant across releases of the geocode service.Example matchID=AQFV9QAAmeQBAJUBBAAAAAAMD05FVyBZT1JLIFNUUkVFVBUDMzgwZgNFTkc |
| returnMatchNarrative(Optional) | Introduced at ArcGIS Enterprise 12.0. The returnMatchNarrative parameter is used to return detailed information about how a geocoding result was obtained by describing the way that each portion of an input string in a findAddressCandidates request was processed, or classified, by the geocode service. This information is included in the findAddressCandidates response as an additional JSON object called match-narrative.To illustrate the type of information that is provided by returnMatchNarrative, if "380 New York Street, Redlands" is searched for, the match-narrative object describes which part of the input was matched as house number ("380"), which part was matched as street name ("New York"), and so on.Within the match-narrative object each part of the input search string is represented with a sub-object, the order of which corresponds to that of the input parts. Each sub-object includes the following properties:field- The address component that the input part was matched to. For example, in "380 New York Street, Redlands", "380" is matched as house number; the field value for this part is HouseNUmber: "field": "HouseNumber"input- The part of the input string that is being described. In the "380 New York Street, Redlands" example, this would be the input value for "380": "input": "380"datum- The value in the geocode service reference data that the input part matched to. In the "380 New York Street, Redlands" example, this would be the datum value for "380": "datum": "380"narrative-code- A code that describes how the input part was matched. In the "380 New York Street, Redlands" example, this would be the narrative-code value for "380": "narrative-code": "cm"narrative-desc- A more detailed description of how the input part was matched. In the "380 New York Street, Redlands" example, this would be the narrative-desc value for "380": "narrative-desc": "classified+matched"This is how the complete match-narrative sub-object for "380" in "380 New York Street, Redlands" would appear: { "field": "HouseNumber", "input": "380", "datum": "380", "narrative-code": "cm", "narrative-desc": "classified+matched" }Example returnMatchNarrative=true |
| comprehensiveZoneMatch(Optional) | Introduced at ArcGIS Enterprise 12.0. A Boolean that allows you to disable matching to inexact administrative zones or postal codes present in a findAddressCandidates request.By default the ArcGIS Geocoding service supports fuzzy matching of administrative zones (neighborhoods, districts, and cities) and postal codes when such values are present in searches for addresses and places. This is because admin zone and postal boundaries are often ambiguous, and a person may not know the exact neighborhood or postal code of the address they want to geocode.If this fuzzy matching is not desired, you can set comprehensiveZoneMatch as false in the request. Strict matching of admin zones and postal codes is used, and heavier penalties are applied to the result if the input admin or postal values aren't exactly matched.Values: true \| false |
| f(Required) | The response format. The default response format is html .Values: html \| json \|pjson \| kmz |

## Search for street addresses

You can search for a street address, street name, or street intersection using the findAddressCandidates operation. For best results, you should include as much location information as possible in the search in addition to the street address.

You can pass the address components in a single parameter or separated into multiple parameters. Examples of each are shown. Note that in each case, the JSON response is the name for both the single- and multiple-parameter requests.

### Example: Find a street address (380 New York Street, Redlands, CA 92373)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?SingleLine=380%20New%20York%20Street%2C%20Redlands%2C%20CA%2092373&category=&outFields=*&forStorage=false&f=pjson`

Multifield request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?Address=380%20new%20york%20st&City=redlands&Region=CA&Postal=92373&outFields=*&forStorage=false&f=pjson`

JSON response



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "380 New York St, Redlands, California, 92373",
   "location": {
    "x": -117.19487199429184,
    "y": 34.057237000231282
   },
   "score": 100,
   "attributes": {
    "Loc_name": "World",
    "Status": "M",
    "Score": 100,
    "Match_addr": "380 New York St, Redlands, California, 92373",
    "LongLabel": "380 New York St, Redlands, CA, 92373, USA",
    "ShortLabel": "380 New York St",
    "Addr_type": "PointAddress",
    "Type": "",
    "PlaceName": "",
    "Place_addr": "380 New York St, Redlands, California, 92373",
    "Phone": "",
    "URL": "",
    "Rank": 20,
    "AddBldg": "",
    "AddNum": "380",
    "AddNumFrom": "",
    "AddNumTo": "",
    "AddRange": "",
    "Side": "",
    "StPreDir": "",
    "StPreType": "",
    "StName": "New York",
    "StType": "St",
    "StDir": "",
    "BldgType": "",
    "BldgName": "",
    "LevelType": "",
    "LevelName": "",
    "UnitType": "",
    "UnitName": "",
    "SubAddr": "",
    "StAddr": "380 New York St",
    "Block": "",
    "Sector": "",
    "Nbrhd": "",
    "District": "",
    "City": "Redlands",
    "MetroArea": "",
    "Subregion": "San Bernardino County",
    "Region": "California",
    "RegionAbbr": "CA",
    "Territory": "",
    "Zone": "",
    "Postal": "92373",
    "PostalExt": "",
    "Country": "USA",
    "LangCode": "ENG",
    "Distance": 0,
    "X": -117.19568252432872,
    "Y": 34.057237000231282,
    "DisplayX": -117.19487199429184,
    "DisplayY": 34.057237000231282,
    "Xmin": -117.19587199429185,
    "Xmax": -117.19387199429184,
    "Ymin": 34.056237000231285,
    "Ymax": 34.05823700023128,
    "ExInfo": ""
   },
   "extent": {
    "xmin": -117.19587199429185,
    "ymin": 34.056237000231285,
    "xmax": -117.19387199429184,
    "ymax": 34.05823700023128
   }
  }
 ]
}
```

## Search for intersections

An intersection is where two streets cross each other. An intersection search consists of the intersecting street names plus the containing administrative division or postal code. For example, `redlands blvd and new york st 92373` is a valid intersection search, as is `redlands blvd & new york st redlands ca` . For street intersection matches, `Addr_type=StreetInt` .

There are several types of intersections that can be found. A typical simple intersection is formed by two street segments crossing each other. An example of this is `W Park Ave and Tennessee St, Redlands, CA` .

### Example: Find a simple street intersection (W Park Ave and Tennessee St, Redlands, CA)

![Simple intersection example](/rest/services-reference/enterprise/static/155ab8ec82bf10301cfb268bde8ae552/0b533/GUID-BED1D8F7-4083-4A14-A969-AA30FDC8CAC2-web.png)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?f=pjson&outFields=Addr_type&forStorage=false&SingleLine=W%20Park%20Ave%20and%20Tennessee%20St,%20Redlands,%20CA`

Multifield request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?f=pjson&outFields=Addr_type&forStorage=false&Address=W%20Park%20Ave%20and%20Tennessee%20St&City=Redlands&Region=CA`

JSON response



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "W Park Ave & Tennessee St, Redlands, California, 92373",
   "location": {
    "x": -117.20007992219183,
    "y": 34.059230049168335
   },
   "score": 100,
   "attributes": {
    "Addr_type": "StreetInt"
   },
   "extent": {
    "xmin": -117.20107992219184,
    "ymin": 34.058230049168337,
    "xmax": -117.19907992219183,
    "ymax": 34.060230049168332
   }
  }
 ]
}
```

You can also find intersections between streets that aren't physically connected. This includes cases where streets are separated by elevation, such as a highway overpass crossing over another street. An example of this is `Pacific Hwy and W Washington St, San Diego, CA 92140` , which is the intersection of a highway overpass and the street below.

![Highway overpass intersection example](/rest/services-reference/enterprise/static/cb011806f1351f27df842c917fa9dfdf/0b533/GUID-06CABDF3-4D12-4D51-99DE-7FBBD3009FA6-web.png)

An intersection can also be formed by two disconnected streets when one street ends close to another, such as a cul-de-sac or a dead end. In cases such as this, if the streets are within a certain distance of each other, the geocode service returns a StreetInt match when they are searched for. This near-intersection tolerance is currently 60 meters. An example of this type of near-intersection is `Rua Ferdinando Ferreira @ Avenida Comendador Franco, Curitiba, BRA` .

![Near-intersection example](/rest/services-reference/enterprise/static/4fece5b1118bcc33234377b8623bb2d8/0b533/GUID-D6721E94-EEBD-4415-A1E6-9386A2719C11-web.png)

Another type of supported disconnected intersection occurs at roundabouts. A roundabout is formed when two or more streets connect to a circular roadway, which is often unnamed. The participating streets typically don't connect directly to each other, but when they are searched for and are within the near-intersection tolerance, the service returns a StreetInt match. An example of a roundabout intersection is `Rue Jean Laurent & Avenue Jean Mermoz, Le Vésinet, FRA` .

![Roundabout intersection example](/rest/services-reference/enterprise/static/8a13e55507d44a5934644f5e87203bd7/0b533/GUID-AF639668-0DC1-4E12-AA79-3CDECAB76E92-web.png)

Sometimes there may be multiple possible matches for an intersection search. This typically occurs when divided roads cross each other. A divided road consists of two street segments separated by a median. In a scenario such as this, there could be up to four equivalent intersection matches consisting of the same street names at different locations. Geocoding uses an ambiguous intersection tolerance with such searches to remove redundant intersection candidates from the response. The ambiguous intersection tolerance is currently 30 meters. Specifically, if there are multiple intersection candidates with the same street names and different locations, and if they are within 30 meters of each other, the service returns only one of the candidates. An example of an ambiguous intersection search is `Cambie St and W King Edward Ave, Vancouver, British Columbia` . In this case, there are three potential intersection candidates with the same street names. Because the locations are within the ambiguous intersection tolerance, only one intersection candidate is returned.

![Ambiguous intersection example](/rest/services-reference/enterprise/static/041c580beb2dbc382a8d8cc9fbc600ab/c0cb9/GUID-44C87DD1-C903-4BEF-96DC-B9DD197AF13C-web.png)

## Search for POIs

A POI is a point location that can represent a cultural or geographic landmark, business, or administrative division. For example, you can find amusement parks, museums, schools, restaurants, hotels, gas stations, or other types of businesses or landmarks; geographic features, such as mountains, lakes, rivers, or deserts; or administrative places, such as neighborhoods, cities, states, counties, or countries. The `findAddressCandidates` operation supports geocoding POIs by name or by type.

As with street addresses, you can search for POIs with `findAddressCandidates` using the single-field or multifield approach.

### Single-field POI search

To search for POIs with single-field search, use the `SingleLine` parameter. In general, valid `SingleLine` POI search strings can be formatted in variations of three basic structures:

1.  <name or type> <optional connector> <zone>
2.  <zone> <name or type>
3.  <name or type> <address> <zone>

Where

-   <name or type> = A place-name, such as Disneyland, Starbucks, or Niagara Falls; or a type, such as amusement parks, waterfalls, or coffee shops.
-   <zone> = A postal code or administrative boundary—such as neighborhood, city, subregion, region, country, or any combination thereof—that provides a spatial boundary to the search. It can be included in the search to limit matching candidates but is not required.
-   <optional connector> = `in` or `at` ; this is not required for the search.
-   <address> = A street name, such as `Main St` , or a complete street address, such as `590 N Main St` .

Examples of valid SingleLine search strings include the following:

Business name searches

-   Starbucks San Diego
-   Starbucks in San Diego
-   San Diego Starbucks
-   Starbucks 92101
-   Starbucks 5th Ave San Diego
-   Reuben H Fleet Science Center, 1875 El Prado, San Diego, CA, 92101, USA

Type searches

-   coffee shops San Diego
-   coffee shops in San Diego CA
-   San Diego coffee shops
-   coffee shops 92101
-   coffee shops 5th Ave San Diego

### Multifield POI search

When searching for POIs using multifield input, the name or type of the POI must be passed as the value for the `address` parameter. The zone information can be passed in the `postal` , `neighborhood` , `city` , `subregion` , `region` , and `countryCode` parameters. If searching for POI and address, the address should be passed as the value for the `address2` parameter.

### General information

It is important to note that instead of providing a zone, you can limit searches to a specific area by using the `searchExtent` . You can also influence the sorting of match candidates according to their proximity to a location with the `location` parameter.

As with address searches, the quality of POI search results is dependent on the amount and quality of information in the search string. If you only search for `hotels` without qualifying information, such as zone, search extent, or location, your results will not be meaningful. Adding supplemental information to the search string—the more specific the better—will result in more accurate and relevant matches.

### Example: Find a business name (Starbucks Sydney, AUS)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?SingleLine=starbucks%20sydney%20AUS&outFields=type,city,region&maxLocations=1&forStorage=false&f=pjson`

Multifield request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?Address=starbucks&Neighborhood=&City=sydney&Subregion=&Region=&CountryCode=AUS&outFields=type,city,region&maxLocations=1&forStorage=false&f=pjson`



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "Starbucks",
   "location": {
    "x": 151.20555000000002,
    "y": -33.86513999999994
   },
   "score": 100,
   "attributes": {
    "type": "Coffee Shop",
    "city": "Sydney",
    "region": "New South Wales"
   },
   "extent": {
    "xmin": 151.20055000000002,
    "ymin": -33.870139999999942,
    "xmax": 151.21055000000001,
    "ymax": -33.860139999999937
   }
  }
 ]
}
```

## Search for administrative place-names

The `findAddressCandidates` operation supports single-field and multifield searches for administrative place-names. This includes searches for neighborhoods, cities, counties, states, provinces, or countries.

### Example: Find a city name (London)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?SingleLine=London&forStorage=false&f=pjson`

Multifield request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?address=London&f=pjson`



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "London, England",
   "location": {
    "x": -0.1272099999999341,
    "y": 51.506420000000048
   },
   "score": 100,
   "attributes": {

   },
   "extent": {
    "xmin": -0.4402099999999341,
    "ymin": 51.193420000000046,
    "xmax": 0.1857900000000659,
    "ymax": 51.819420000000051
   }
  },
  {
   "address": "London, Ontario",
   "location": {
    "x": -81.246239999999943,
    "y": 42.986900000000048
   },
   "score": 100,
   "attributes": {

   },
   "extent": {
    "xmin": -81.379239999999939,
    "ymin": 42.853900000000046,
    "xmax": -81.113239999999948,
    "ymax": 43.119900000000051
   }
  },]
}
```

## Search for postal codes

The `findAddressCandidates` operation supports searches for postal codes and postal code extensions. When searching for postal codes, it is important to note that the same code can be valid in more than one country; for best results, it may be necessary to include additional information with the postal code, such as city or country.

### Example: Find a postal code (20002 USA)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?singleLine=20002%20USA&outFields=addr_type&f=pjson`

Multifield request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?postal=20002&countryCode=USA&outFields=addr_type&f=pjson`



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "20002, Washington, District of Columbia",
   "location": {
    "x": -76.989979999999946,
    "y": 38.897450000000049
   },
   "score": 100,
   "attributes": {
    "addr_type": "Postal"
   },
   "extent": {
    "xmin": -77.036979999999943,
    "ymin": 38.850450000000052,
    "xmax": -76.942979999999949,
    "ymax": 38.944450000000046
   }
  }
 ]
}
```

## Search for coordinates

Locators built with the [Create Locator](https://pro.arcgis.com/en/pro-app/latest/tool-reference/geocoding/create-locator.htm) tool support searches for coordinates. The output is a geometry point with a match address that is the same as the input coordinates. This is different than reverse geocoding, in which input x/y coordinates are resolved to a matching street address. The following types of coordinate search are supported:

-   x/y coordinates; x refers to longitude (east-west coordinates), and y refers to latitude (north-south coordinates).
-   Military Grid Reference System (MGRS) coordinates.
-   United States National Grid (USNG) coordinates.

### Example: Find MGRS / USNG coordinates (18SUH6789043210)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?f=pjson&outFields=Addr_type&maxLocations=1&forStorage=false&SingleLine=18SUH6789043210`

Multifield request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?f=pjson&outFields=Addr_type&maxLocations=1&forStorage=false&Address=18SUH6789043210`

JSON response



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "18SUH6789043210",
   "location": {
    "x": -76.511416672563271,
    "y": 38.327287449633403
   },
   "score": 100,
   "attributes": {
    "Addr_type": "MGRS"
   },
   "extent": {
    "xmin": -76.512416672563276,
    "ymin": 38.326287449633405,
    "xmax": -76.510416672563267,
    "ymax": 38.3282874496334
   }
  }
 ]
}
```

Input x/y coordinates can be formatted in several ways:

-   Coordinates can be input in either <longitude>,<latitude> or <latitude>,<longitude> order, and can be separated with either a comma or a space.
-   Coordinates can be input in decimal degrees (DD) or degrees minutes seconds (DMS) format.
-   Quadrants can be signified by using a minus sign (-) before the numeric value to signify the western or southern quadrants, or by using E, W, N, or S directional indicators before or after the numeric values.
-   DMS coordinates can be separated with ° (degrees), ' (minutes), and " (seconds) symbols.

-   DMS coordinates can also be separated with the letters d (degrees), m (minutes), and s (seconds).

## Specify output fields

The `findAddressCandidates` operation allows you to specify individual output fields or return all output fields. The `outFields` parameter is used for this. To return all supported output fields, set `outFields=*` ; if you only want to return the default output fields, `outFields` does not need to be passed in the request. To return specific fields, pass the desired field names as comma-separated values, such as `outFields=PlaceName,Type,City,Country` , which returns the name, feature type, city, and country for a POI search.

### Example: Specify individual outfields for a POI search (PlaceName,Type,City,Country)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?singleLine=coffee%20shops%20austin&outFields=PlaceName,Type,City,Country&f=pjson`

JSON response



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "Starbucks",
   "location": {
    "x": -97.805182999999943,
    "y": 30.476892000000078
   },
   "score": 100,
   "attributes": {
    "Type": "Coffee Shop",
    "PlaceName": "Starbucks",
    "City": "Austin",
    "Country": "USA"
   },
   "extent": {
    "xmin": -97.806182999999947,
    "ymin": 30.475892000000076,
    "xmax": -97.804182999999938,
    "ymax": 30.477892000000079
   }
  },
```

## Search for street blocks

The `findAddressCandidates` operation supports searches for a group of house numbers representing one or more city blocks. The `Addr_type` value returned for this type of search is `StreetMidBlock`. The location of such a feature is the approximated midpoint of the street segments that include the house numbers represented by the block number or block range. A `StreetMidBlock` match is more precise than a `StreetName` match, and less precise than a `StreetAddress` match.

A single block, or a range of blocks, may be searched for. Here are some examples of StreetMidBlock searches:

-   100 block of New York St, Redlands, CA
-   1600 blk E Cliff Dr, El Paso
-   200-500 block Taylor St, San Francisco
-   1700-1900 blk of Locust St, Philadelphia, Pennsylvania

For a StreetMidBlock match to be returned, the input text must follow this general syntax:

`<number or range> block | block of <street name>`

`StreetMidBlock` matching is useful for situations in which an exact address is unknown, such as emergency reporting. For example, a bystander witnessing an emergency may know the name of the street they're on and the general house numbers in their vicinity, but not the exact house number—emergency responders can use the block information to quickly find the approximate location of the incident.

It's also useful for workflows in which anonymity is required for privacy concerns, such as crime data analysis by law enforcement agencies. In such cases, when law enforcement personnel respond to an incident, the street block where the incident occurred can be recorded instead of a person's complete address.

### Example: Find a single block number (100 block of New York St, Redlands, CA)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=100%20block%20of%20New%20York%20St%2C%20Redlands%2C%20CA&outFields=Addr_type&f=pjson`

Multifield request URL

`https://[myServerURL]/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=100%20block%20of%20New%20York%20St&city=Redlands&region=CA&outFields=addr_type&f=pjson`



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "100 Block of New York St, Redlands, California, 92373",
   "location": {
    "x": -117.195554966703,
    "y": 34.054124985942
   },
   "score": 100,
   "attributes": {
    "Addr_type": "StreetMidBlock"
   },
   "extent": {
    "xmin": -117.196567077114,
    "ymin": 34.052789870158,
    "xmax": -117.19455638044,
    "ymax": 34.055594477321
   }
  },
```

## Search for a street between two cross streets

The `findAddressCandidates` operation supports searching for a street between two intersecting cross streets. The `Addr_type` value returned for this type of search is `StreetBetween`. The location of such a feature is along the matched street at the midpoint between the cross streets. The precision of a `StreetBetween` match is greater than a `StreetName` match, less than a `StreetAddress` match, and equal to a `StreetMidBlock` match.

Here are some examples of StreetBetween searches:

-   Conway Dr between Sheridan Ave and E El Norte Pkwy, Escondido, CA
-   I-10 bt exit 75 and exit 76, Redlands, CA
-   Pinckney btw Joy & Anderson, Boston

For a `StreetBetween` match to be returned, the input text must follow this general syntax:

`<street name> between | btw | bt <cross street 1> and <cross street 2>`

Similar to `StreetMidBlock`, `StreetBetween` matching is useful for situations in which an exact address or location is unknown, such as emergency reporting. For example, a person involved in an incident may know the name of the street they're on and the nearby intersecting streets but not an exact address — emergency responders can use this information to quickly find the approximate location of the incident.

### Example: Find a street between two cross streets (Conway Dr between Sheridan Ave and E El Norte Pkwy, Escondido, CA)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleline=Conway%20Dr%20between%20Sheridan%20Ave%20and%20E%20El%20Norte%20Pkwy%2C%20Escondido%2C%20CA&outFields=Addr_type&f=pjson`

Multifield request URL

`https://[myServerURL]/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=Conway%20Dr%20between%20Sheridan%20Ave%20and%20E%20El%20Norte%20Pkwy&city=Escondido&region=CA&outFields=Addr_type&f=pjson`



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "Conway Dr between Sheridan Ave and E El Norte Pkwy, Escondido, California, 92027",
   "location": {
    "x": -117.074839704239,
    "y": 33.147686155582
   },
   "score": 100,
   "attributes": {
    "Addr_type": "StreetBetween"
   },
   "extent": {
    "xmin": -117.075839704239,
    "ymin": 33.146686155582,
    "xmax": -117.073839704239,
    "ymax": 33.148686155582
   }
  },
```

## Specify output fields

The `findAddressCandidates` operation allows you to specify individual output fields or return all output fields. The `outFields` parameter is used for this. If you want to return all supported output fields, set `outFields=*`; if you only want to return the default output fields, `outFields` does not need to be passed in the request. If you want to return specific fields, pass the desired field names as comma-separated values, such as `outFields=PlaceName,Type,City,Country`, which returns the name, feature type, city, and country for a POI search.

### EXample: Specify individual outfields for a POI search (PlaceName,Type,City,Country)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=coffee%20shops%20austin&outFields=PlaceName%2CType%2CCity%2CCountry&f=pjson`

JSON response



```
{
  "spatialReference": {
    "wkid": 4326,
    "latestWkid": 4326
  },
  "candidates": [
    {
      "address": "Caribou Coffee",
      "location": {
        "x": -92.985396,
        "y": 43.684369
      },
      "score": 100,
      "attributes": {
        "Type": "Coffee Shop",
        "PlaceName": "Caribou Coffee",
        "City": "Austin",
        "Country": "USA"
      },
      "extent": {
        "xmin": -92.986396,
        "ymin": 43.683369,
        "xmax": -92.984396,
        "ymax": 43.685369
      }
    }
  ]
}
```

## Specify the output spatial reference

By default, your geocode service returns candidate geometry in the spatial reference of the data on which it was built. You can specify a different spatial reference for output coordinates by using the `outSR` parameter. This is necessary if you have a mapping application in which you display geocoding candidates and the map spatial reference is not the same as the reference data of your locator. For example, the ArcGIS.com basemaps use a Web Mercator spatial reference, with coordinates in meters. To display geocoding candidates correctly in such a map, you would need to set `outSR=102100` , which is the well-known ID (WKID) of the Web Mercator spatial reference.

For a list of valid WKID values, see [Using spatial references](/rest/services-reference/enterprise/using-spatial-references/).

### Example: Specify output coordinates in Web Mercator spatial reference (380 new york st redlands ca)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?singleLine=380%20new%20york%20st%20redlands%20ca&outSR=102100&f=pjson`

Multifield request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?address=380%20new%20york%20st&city=redlands&region=ca&outSR=102100&f=pjson`

JSON response



```
{
  "spatialReference": {
    "wkid": 102100,
    "latestWkid": 3857
  },
  "candidates": [
    {
      "address": "380 New York St, Redlands, California, 92373",
      "location": {
        "x": -13046073.473987445,
        "y": 4036490.1486023655
      },
      "score": 100,
      "attributes": {},
      "extent": {
        "xmin": -13046184.793478239,
        "ymin": 4036355.7832219717,
        "xmax": -13045962.154496653,
        "ymax": 4036624.5155679826
      }
    }
  ]
}
```

## Specify the maximum number of candidates

The `maxLocations` parameter allows you to specify the maximum number of candidates to be returned by a search, up to the maximum number of candidates allowed by the geocoding service. As an example, if you set `maxLocations=10` , `findAddressCandidates` will return the top 10 candidates for the search. If no value is specified for `maxLocations` , `findAddressCandidates` returns all matching candidates.

### Example: Specify the maximum number of candidates for a POI search (Starbucks in San Diego)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?singleLine=starbucks%20in%20san%20diego&outFields=PlaceName,City,Country&maxLocations=2&f=pjson`

Multifield request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?address=starbucks&city=san%20diego&outFields=PlaceName,City,Country&maxLocations=2&f=pjson`

JSON response



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "Starbucks",
   "location": {
    "x": -117.25457299999999,
    "y": 32.794458000000077
   },
   "score": 100,
   "attributes": {
    "PlaceName": "Starbucks",
    "City": "San Diego",
    "Country": "USA"
   },
   "extent": {
    "xmin": -117.255573,
    "ymin": 32.793458000000079,
    "xmax": -117.25357299999999,
    "ymax": 32.795458000000075
   }
  },
  {
   "address": "Starbucks",
   "location": {
    "x": -117.25463599999995,
    "y": 32.794477000000029
   },
   "score": 100,
   "attributes": {
    "PlaceName": "Starbucks",
    "City": "San Diego",
    "Country": "USA"
   },
   "extent": {
    "xmin": -117.25563599999995,
    "ymin": 32.793477000000031,
    "xmax": -117.25363599999994,
    "ymax": 32.795477000000027
   }
  }
 ]
}
```

## Search within an extent

The `findAddressCandidates` operation allows spatial filtering of search results by using the `searchExtent` parameter. To confine a search to a localized area, something that is especially useful in a mobile application, you can define a bounding rectangle to search within. No candidates outside of the rectangle are returned. Bounding rectangle coordinates can be entered as a simple comma-separated string in the format <lower left corner>,<upper right corner>. If the simple format is used, the coordinates must be in the default spatial reference of the geocode service, which is the same as the data upon which it was built. The `searchExtent` parameter can be used with all supported search types (street address, POI, admin place, postal code).

### Example: Find POIs using searchExtent with default spatial reference (McDonald's)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?singleLine=mcdonalds&outFields=city,type&searchExtent=-117.172026,32.706517,-117.152498,32.725514&f=pjson`

Multifield request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?address=mcdonalds&outFields=city,type&searchExtent=-117.172026,32.706517,-117.152498,32.725514&f=pjson`



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "McDonald's",
   "location": {
    "x": -117.15405899999996,
    "y": 32.718697000000077
   },
   "score": 100,
   "attributes": {
    "type": "Fast Food",
    "city": "San Diego"
   },
   "extent": {
    "xmin": -117.15505899999997,
    "ymin": 32.717697000000079,
    "xmax": -117.15305899999996,
    "ymax": 32.719697000000075
   }
  }
 ]
}
```

You can specify a spatial reference for the `searchExtent` , which is necessary if your map uses a different spatial reference than the geocode service. For example, the default ArcGIS.com basemaps use a Web Mercator spatial reference (WKID = 102100), with coordinates in meters. The `searchExtent` must be passed as a [JSON envelope object](/rest/services-reference/enterprise/geometry-objects/#envelope) if the coordinates are in a spatial reference other than that of the geocode service.

Requests that include `searchExtent` can also include zone information (that is, city, state, and country). If the extent defined for `searchExtent` is large enough to encompass multiple cities, it may be necessary to include the city name in the search to achieve optimal results. For example, if the `searchExtent` covers the Dallas-Fort Worth metropolitan region, and you search for `Starbucks` , there could be matches returned in Dallas or Fort Worth or any of their suburbs. If you specifically want to find Starbucks in Garland, for example, this needs to be specified in the search.

You can also search for street addresses within an extent. When the `searchExtent` parameter is defined for an address search, city and postal code can be omitted from the search and valid matches can still be found. However, if the `searchExtent` is large, it is possible for a street address to occur multiple times within the extent, and it may be necessary to refine the search by including city, state, postal code, or other distinguishing information. Additionally, if the search includes a city or postal code that is outside the `searchExtent` , no matches will be returned.

## Proximity searches

Geocoding results are typically sorted according to their relevance to the search and their relative importance. However, with some applications, especially mobile apps, users are more concerned with finding features closest to their current location. For this reason, the `findAddressCandidates` operation supports prioritization of candidates based on their distance from a specified point. By passing in the `location` parameter, you can define an area of influence for your searches. The `location` value represents the center point of the area, which spans a radius of 50,000 meters. Features closest to the input location show up higher in the list of candidates. Results that are within the area of influence area receive a greater boost than those outside the area.

It is important to note that proximity search does not filter results that are farther than 50,000 meters from the input location—it is intended to influence the sort order of results so the most locationally relevant candidates are returned first. For instance, if your location is in Las Vegas, and you search for Golden Nugget, the first candidate is Golden Nugget in Las Vegas. The second is Golden Nugget in Biloxi, Mississippi. So even though Golden Nugget in Biloxi is much farther away than the 50,000 meters, it is still returned because it is the second most relevant (closest) candidate. In general, the number of candidates returned by a proximity search is only limited by the `maxLocations` parameter.

### Example: Find a place-name using a proximity search (Golden Nugget)

Single-field request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?singleLine=golden%20nugget&outFields=City,Region,Country&maxLocations=10&location=-115.172783,36.114789&f=pjson`

Multifield request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?address=golden%20nugget&outFields=City,Region,Country&maxLocations=10&location=-115.172783,36.114789&f=pjson`

JSON response



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "Golden Nugget",
   "location": {
    "x": -115.14472999999998,
    "y": 36.170330000000035
   },
   "score": 100,
   "attributes": {
    "City": "Las Vegas",
    "Region": "Nevada",
    "Country": "USA"
   },
   "extent": {
    "xmin": -115.14972999999998,
    "ymin": 36.165330000000033,
    "xmax": -115.13972999999999,
    "ymax": 36.175330000000038
   }
  },
  {
   "address": "Golden Nugget",
   "location": {
    "x": -88.860549999999989,
    "y": 30.39047000000005
   },
   "score": 100,
   "attributes": {
    "City": "Biloxi",
    "Region": "Mississippi",
    "Country": "USA"
   },
   "extent": {
    "xmin": -88.865549999999985,
    "ymin": 30.385470000000051,
    "xmax": -88.855549999999994,
    "ymax": 30.395470000000049
   }
  },
```

If you only want to return candidates within a specific area, and sort the candidates according to their proximity to a location, you need to define a search extent by passing the `searchExtent` parameter in the request along with the `location` parameter. Consider the Golden Nugget example again. If your location is in Las Vegas and you want to confine your search results to places named Golden Nugget that are within the map extent, you would need to construct a request with the following parameters:

-   `SingleLine` (or `address` ): Golden Nugget
-   `location` : -115.144989,36.167361
-   `searchExtent` : -115.161912,36.158764,-115.126925,36.179793

## Category filtering

The `findAddressCandidates` operation supports filtering searches by category values, which represent address and place types. By including the `category` parameter in a `findAddressCandidates` request, you can avoid false positive matches to unexpected place and address types due to ambiguous searches.

For example, a user may search for June, expecting the service to match to June Mountain ski resort. However, there are many places in the world named June, so the search returns several cities named June.

The solution for this case is to pass the `category`

parameter in the request. By including `category=Ski Resort` in the request, all places that are not ski resorts are bypassed by the search, and only ski resorts whose names begin with June are returned.

### Example: Search for June with `category=Ski Resort`

Request URL

`https://[myServerURL]/arcgis/rest/services/[myGeocodeServiceName]/GeocodeServer/findAddressCandidates?singleLine=June&category=Ski%20Resort&outFields=PlaceName,Type,Place_Addr,City,Region&maxLocations=5&forStorage=false&f=pjson`



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "June Mountain",
   "location": {
    "x": -119.08940999999999,
    "y": 37.770690000000059
   },
   "score": 90.709999999999994,
   "attributes": {
    "Type": "Ski Resort",
    "PlaceName": "June Mountain",
    "Place_Addr": "3819 CA-158, June Lake, California, 93529",
    "City": "June Lake",
    "Region": "California"
   },
   "extent": {
    "xmin": -119.09440999999998,
    "ymin": 37.765690000000056,
    "xmax": -119.08440999999999,
    "ymax": 37.775690000000061
   }
  }
 ]
}
```

## Return a collection of features using `searchWithin`

The `searchWithin` parameter allows you to return a collection of features that are associated with a geocoded location via a `findAddressCandidates` request. For example, a customer may want to view all addresses within a postal code, or all businesses located at a particular address. The parameter also supports pagination—the ability to page through large result sets consisting of hundreds or even thousands of candidates.

The workflow to return a collection of features requires three parameters to be included in a `findAddressCandidates` request: `searchWithin`, `start`, and `num`.

-   The `searchWithin` parameter is used to specify the types of linked places which should be returned for the geocoded object, such as "POI", "Subaddress", or "PointAddress".
-   The `start` and `num` parameters are used for paging through large result sets.
    -   Use the `start` parameter to define the result number of the first candidate in a particular page.
    -   Use the `num` parameter to define the number of candidates to be included in each page (up to 50).

When used together in a `findAddressCandidates` request, the `searchWithin`, `start`, and `num` parameters allow you to view a collection of all of the places which exist at a particular location. Large collections consisting of hundreds of places can be broken up into manageable result sets, or pages, of 50 or fewer candidates. This is accomplished by passing consecutive requests to the ArcGIS Geocoding service with different start values.

### Example: Search for PostalExt and return all PointAddress records within it

If you want to see all of the `PointAddress` records that exist within `PostalExt` "1033 SC, Amsterdam", with 5 addresses per page, use the following parameters in a `findAddressCandidates` request. Notice in the response that the geocoded `PostalExt` record is the top candidate. The geocoded object is always the first candidate in the list, followed by the collection objects.



```
singleline=1033 SC, Amsterdam
searchWithin=PointAddress
start=1
num=5
```



```
GET https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=1033 SC, Amsterdam&searchWithin=PointAddress&start=1&num=5&outFields=Addr_type&forStorage=false&f=pjson&token=<ACCESS_TOKEN>
```



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "1033 SC, Amsterdam",
   "location": {
    "x": 4.892927764399,
    "y": 52.404557611982
   },
   "score": 100,
   "attributes": {
    "Addr_type": "PostalExt"
   },
   "extent": {
    "xmin": 4.888927764399,
    "ymin": 52.400557611982,
    "xmax": 4.896927764399,
    "ymax": 52.408557611982
   }
  },
  {
   "address": "Kraanspoor 1, 1033 SC Amsterdam",
   "location": {
    "x": 4.889707185742,
    "y": 52.405622490871
   },
   "score": 100,
   "attributes": {
    "Addr_type": "PointAddress"
   },
   "extent": {
    "xmin": 4.888707185742,
    "ymin": 52.404622490871,
    "xmax": 4.890707185742,
    "ymax": 52.406622490871
   }
  },
  {
   "address": "Kraanspoor 3, 1033 SC Amsterdam",
   "location": {
    "x": 4.889816401941,
    "y": 52.405523123408
   },
   "score": 100,
   "attributes": {
    "Addr_type": "PointAddress"
   },
   "extent": {
    "xmin": 4.888816401941,
    "ymin": 52.404523123408,
    "xmax": 4.890816401941,
    "ymax": 52.406523123408
   }
  },
  {
   "address": "tt. Vasumweg 4, 1033 SC Amsterdam",
   "location": {
    "x": 4.898629302577,
    "y": 52.401902937517
   },
   "score": 100,
   "attributes": {
    "Addr_type": "PointAddress"
   },
   "extent": {
    "xmin": 4.897629302577,
    "ymin": 52.400902937517,
    "xmax": 4.899629302577,
    "ymax": 52.402902937517
   }
  },
  {
   "address": "Kraanspoor 5, 1033 SC Amsterdam",
   "location": {
    "x": 4.889519095835,
    "y": 52.405476436208
   },
   "score": 100,
   "attributes": {
    "Addr_type": "PointAddress"
   },
   "extent": {
    "xmin": 4.888519095835,
    "ymin": 52.404476436208,
    "xmax": 4.890519095835,
    "ymax": 52.406476436208
   }
  }
 ],
 "total": 175,
 "start": 1,
 "num": 5,
 "nextStart": 6
}
```

### Search for PostalExt `1033 SC, Amsterdam` and return all PointAddress records within it (second page)

To show the next page of results, send another `findAddressCandidates` request and change the start value to `6`. This tells the service to return PointAddress results beginning at candidate 6 in the response. Use the following parameters for this request:



```
singleline=1033 SC, Amsterdam
searchWithin=PointAddress
start=6
num=5
```



```
GET https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=1033 SC, Amsterdam&searchWithin=PointAddress&start=6&num=5&outFields=Addr_type&forStorage=false&f=pjson&token=<ACCESS_TOKEN>
```



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "Kraanspoor 7, 1033 SC Amsterdam",
   "location": {
    "x": 4.889461595979,
    "y": 52.405340481738
   },
   "score": 100,
   "attributes": {
    "Addr_type": "PointAddress"
   },
   "extent": {
    "xmin": 4.888461595979,
    "ymin": 52.404340481738,
    "xmax": 4.890461595979,
    "ymax": 52.406340481738
   }
  },
  {
   "address": "tt. Vasumweg 10, 1033 SC Amsterdam",
   "location": {
    "x": 4.897697821678,
    "y": 52.4024203524
   },
   "score": 100,
   "attributes": {
    "Addr_type": "PointAddress"
   },
   "extent": {
    "xmin": 4.896697821678,
    "ymin": 52.4014203524,
    "xmax": 4.898697821678,
    "ymax": 52.4034203524
   }
  },
  {
   "address": "Kraanspoor 11, 1033 SC Amsterdam",
   "location": {
    "x": 4.889037304041,
    "y": 52.405049252512
   },
   "score": 100,
   "attributes": {
    "Addr_type": "PointAddress"
   },
   "extent": {
    "xmin": 4.888037304041,
    "ymin": 52.404049252512,
    "xmax": 4.890037304041,
    "ymax": 52.406049252512
   }
  },
  {
   "address": "Kraanspoor 13, 1033 SC Amsterdam",
   "location": {
    "x": 4.888994723972,
    "y": 52.405072051289
   },
   "score": 100,
   "attributes": {
    "Addr_type": "PointAddress"
   },
   "extent": {
    "xmin": 4.887994723972,
    "ymin": 52.404072051289,
    "xmax": 4.889994723972,
    "ymax": 52.406072051289
   }
  },
  {
   "address": "Kraanspoor 15, 1033 SC Amsterdam",
   "location": {
    "x": 4.888692053449,
    "y": 52.404241991418
   },
   "score": 100,
   "attributes": {
    "Addr_type": "PointAddress"
   },
   "extent": {
    "xmin": 4.887692053449,
    "ymin": 52.403241991418,
    "xmax": 4.889692053449,
    "ymax": 52.405241991418
   }
  }
 ],
 "total": 175,
 "start": 6,
 "num": 5,
 "nextStart": 11
}
```

### JSON response for `searchWithin` requests

You can use the [properties](/rest/services-reference/enterprise/find-address-candidates/#searchwithin-response-json-object) in the JSON response to determine the value to use for the `start` parameter in each request, and to know when the total number of features in a particular collection has been reached.

Refer to the first example above. These are the collection properties in the response for that example:



```
"total": 175,
 "start": 1,
 "num": 5,
 "nextStart": 6
```

The value of `175` for the `total` property means that there are 175 total candidates, including the parent PostalExt record and 174 associated PointAddress records. The `start` property reflects what was passed in the request for the parameters of the same name. The `num` property shows the number of candidates in the response. The `nextStart` property is the key for determining what value to pass in the following request in order to see the next page of results. In this case, `"nextStart": 6` means that the value for the `start` parameter in the subsequent request should be `6`.

As we see in example 2 above, `start=6` was used in the request. Here's what the collection properties look like in the response:



```
"total": 175,
 "start": 6,
 "num": 5,
 "nextStart": 11
```

The `nextStart` value automatically increments to the value that should be used for the `start` parameter in the subsequent request.

### Search for PostalExt \`1033 SC, Amsterdam' (last page)

When all candidates have been paged through and the last page is reached, the `nextStart` value is `-1`. This indicates that there are no more candidates in the result set and no more requests need to be sent to the service. We can see this if we set `start=176` in a request using the previous example.

Use the following parameters:



```
singleline=1033 SC, Amsterdam
searchWithin=PointAddress
start=176
num=5
```



```
GET https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=1033 SC, Amsterdam&searchWithin=PointAddress&start=176&num=5&outFields=Addr_type&forStorage=false&f=pjson&token=<ACCESS_TOKEN>
```



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "1033 SC, Amsterdam",
   "location": {
    "x": 4.892927764399,
    "y": 52.404557611982
   },
   "score": 100,
   "attributes": {
    "Addr_type": "PostalExt"
   },
   "extent": {
    "xmin": 4.888927764399,
    "ymin": 52.400557611982,
    "xmax": 4.896927764399,
    "ymax": 52.408557611982
   }
  }
 ],
 "total": 175,
 "start": 176,
 "num": 0,
 "nextStart": -1
}
}
```

In this case we see `"nextStart": -1` in the collection properties in the response, meaning there are no more candidates to page through:



```
"total": 175,
 "start": 176,
 "num": 0,
 "nextStart": -1
```

Additionally, notice that the response for this example only includes a single PostalExt candidate; no PointAddresses are returned. This is because the `start` value passed in the request exceeded the total collection count. If the `start` value in the request exceeds the total number of candidates in the collection, then the response will only include the geocoded candidate.

## Implementing MatchID values

Every address and place that can be geocoded by the ArcGIS Geocoding service has an ID value associated with it, which is known as the `MatchID`. By including `outFields=MatchID` (or `outFields=*`) in a `findAddressCandidates` request, you can obtain the `MatchID` value for any search that you perform with the service. A `MatchID` value for a particular address will typically remain the same across releases of the ArcGIS Geocoding service, unless the address or its location changes significantly.

A typical use case for the `MatchID` output field is to determine if different input strings refer to the same address. For example, you may want to know if the following user input searches represent the same place:

404 S Figueroa St, Los Angeles  
404 Figueroa Ave, 90071

You can search for each of them using the ArcGIS Geocoding service and then compare their `MatchID` values.

### Example: Get MatchID values



```
GET https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=404 S Figueroa St, Los Angeles&outFields=MatchID&maxLocations=1&forStorage=false&f=pjson&token=<ACCESS_TOKEN>
```



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "404 S Figueroa St, Los Angeles, California, 90071",
   "location": {
    "x": -118.255968633227,
    "y": 34.053265738326
   },
   "score": 100,
   "attributes": {
    "MatchID": "AQEw8QAAleQBAJUBBAAAAAAMFVNPVVRIIEZJR1VFUk9BIFNUUkVFVBUDNDA0ZgNFTkc"
   },
   "extent": {
    "xmin": -118.256968633227,
    "ymin": 34.052265738326,
    "xmax": -118.254968633227,
    "ymax": 34.054265738326
   }
  }
 ]
}
```

### Get MatchID for "404 Figueroa Ave, 90071"



```
GET https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=404 Figueroa Ave, 90071&outFields=MatchID&maxLocations=1&forStorage=false&f=pjson&token=<ACCESS_TOKEN>
```



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "404 S Figueroa St, Los Angeles, California, 90071",
   "location": {
    "x": -118.255968633227,
    "y": 34.053265738326
   },
   "score": 91.08,
   "attributes": {
    "MatchID": "AQEw8QAAleQBAJUBBAAAAAAMFVNPVVRIIEZJR1VFUk9BIFNUUkVFVBUDNDA0ZgNFTkc"
   },
   "extent": {
    "xmin": -118.256968633227,
    "ymin": 34.052265738326,
    "xmax": -118.254968633227,
    "ymax": 34.054265738326
   }
  }
 ]
}
```

In the two examples above, the `MatchID` value for `404 S Figueroa St, Los Angeles` and `404 Figueroa Ave, 90071` is `AQEw8QAAleQBAJUBBAAAAAAMFVNPVVRIIEZJR1VFUk9BIFNUUkVFVBUDNDA0ZgNFTkc`, indicating that these searches refer to the same address.

### Search using MatchID

You can also search for a `MatchID` value by including it in the `matchID` parameter in a `findAddressCandidates` request. This is useful for detecting changes to an address. For example, with a previous release of the ArcGIS Geocoding service, a search for "355 S Grand Ave, Los Angeles, CA, 90071" resulted in a `StreetAddress` match, meaning that the Geocoding service did not include a rooftop address record (`PointAddress`) for this location. You can search for the `MatchID` value associated with this address using the current version of the ArcGIS Geocoding service to see if a rooftop address record is now present.



```
GET https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?matchID=AQEz8QAAlOQBAJUBBAAAAAAMElNPVVRIIEdSQU5EIEFWRU5VRRUDMzU1ZgNFTkc&outFields=Addr_type,MatchID&maxLocations=1&forStorage=false&f=pjson&token=<ACCESS_TOKEN>
```



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "355 S Grand Ave, Los Angeles, California, 90071",
   "location": {
    "x": -118.252735481715,
    "y": 34.052336771997
   },
   "score": 100,
   "attributes": {
    "Addr_type": "PointAddress",
    "MatchID": "AQEz8QAAlOQBAJUBBAAAAAAMElNPVVRIIEdSQU5EIEFWRU5VRRUDMzU1ZgNFTkc"
   },
   "extent": {
    "xmin": -118.253735481715,
    "ymin": 34.051336771997,
    "xmax": -118.251735481715,
    "ymax": 34.053336771997
   }
  }
 ]
}
```

### Store primary names in MatchID with returnPrimaryMatchID

Some streets or places may be known by multiple names. In these cases one name is designated as primary, and the others are considered alternate, or secondary, names. The name stored in the `MatchID` value corresponds to what was matched to in the request. For instance, "LA" is an alternate name for "Los Angeles". If "LA" is geocoded, then "LA" is the name stored in `MatchID`. When the `MatchID` value is subsequently searched for, the output address labels include the name "LA". If you want to store the primary name in the `MatchID` value instead, you can set the `returnPrimaryMatchID` parameter as `true` in geocoding requests.

The following examples illustrate how this parameter can be used.

#### Geocode a location with returnPrimaryMatchID



```
GET https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleline=LA, California&returnPrimaryMatchID=true&outFields=Match_addr,PlaceName,MatchID&maxLocations=1&forStorage=false&f=pjson&token=<ACCESS_TOKEN>
```



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "LA, California",
   "location": {
    "x": -118.243344,
    "y": 34.052238
   },
   "score": 100,
   "attributes": {
    "Match_addr": "LA, California",
    "PlaceName": "LA",
    "MatchID": "AQw88QAAlOQBAJUBBMdUKnQOC0xPUyBBTkdFTEVTZgNFTkc"
   },
   "extent": {
    "xmin": -118.530344,
    "ymin": 33.765238,
    "xmax": -117.956344,
    "ymax": 34.339238
   }
  }
 ]
}
```

#### Geocode MatchID value without returnPrimaryMatchID



```
GET https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?matchID=AQw88QAAlOQBAJUBBMdUKnQOC0xPUyBBTkdFTEVTZgNFTkc&outFields=Match_addr,PlaceName,MatchID&maxLocations=1&forStorage=false&f=pjson&token=<ACCESS_TOKEN>
```



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "Los Angeles, California",
   "location": {
    "x": -118.243344,
    "y": 34.052238
   },
   "score": 100,
   "attributes": {
    "Match_addr": "Los Angeles, California",
    "PlaceName": "Los Angeles",
    "MatchID": "AQw88QAAlOQBAJUBBMdUKnQOC0xPUyBBTkdFTEVTZgNFTkc"
   },
   "extent": {
    "xmin": -118.530344,
    "ymin": 33.765238,
    "xmax": -117.956344,
    "ymax": 34.339238
   }
  }
 ]
}
```

### Returning and using PotentialID values

The new `PotentialID` output field is related to `MatchID` and `match-narrative`. While `PotentialID` is similar to `MatchID`, it includes additional information about classified but unmatched subunit components in a request. A `PotentialID` value is produced when the following conditions are met:

-   The request includes `returnMatchNarrative` as `true`.
-   There are classified but unmatched subunit values in the input.
-   The result is a `PointAddress` or `StreetAddress`.

If the above conditions are not met, the `PotentialID` output field is blank.

You can pass the `PotentialID` value in a request using the `matchID` parameter in a future release of the ArcGIS Geocoding service to see if higher precision results can be obtained. If the subunit components are still unavailable for the input address when you search for a `PotentialID`, then no match is returned.

##### Example: Return PotentialID for unmatched subunits



```
GET https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleline=380 New York St bldg M office 125, Redlands&returnMatchNarrative=true&outFields=Match_addr,MatchID,PotentialID&maxLocations=1&forStorage=false&f=pjson&token=<ACCESS_TOKEN>
```



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "380 New York St, Redlands, California, 92373",
   "location": {
    "x": -117.194835113918,
    "y": 34.057241819826
   },
   "score": 100,
   "attributes": {
    "Match_addr": "380 New York St, Redlands, California, 92373",
    "MatchID": "AQFV9QAAmeQBAJUBBAAAAAAMD05FVyBZT1JLIFNUUkVFVBUDMzgwZgNFTkc",
    "PotentialID": "AQBV9QAAmeQBAJUBBAAAAAAMD05FVyBZT1JLIFNUUkVFVBUDMzgwHAkwOjEyNXwyOk1mA0VORw"
   },
   "extent": {
    "xmin": -117.195835113918,
    "ymin": 34.056241819826,
    "xmax": -117.193835113918,
    "ymax": 34.058241819826
   },
   "match": {
    "match-narrative": [
     {
      "field": "HouseNumber",
      "input": "380",
      "datum": "380",
      "narrative-code": "cm",
      "narrative-desc": "classified+matched"
     },
     {
      "field": "StreetName",
      "input": "NEW YORK",
      "datum": "New York",
      "narrative-code": "cm",
      "narrative-desc": "classified+matched"
     },
     {
      "field": "StreetType",
      "input": "ST",
      "datum": "ST",
      "narrative-code": "cm",
      "narrative-desc": "classified+matched"
     },
     {
      "field": "Building",
      "input": "BLDG M",
      "datum": "",
      "narrative-code": "c",
      "narrative-desc": "classified"
     },
     {
      "field": "Unit",
      "input": "OFFICE 125",
      "datum": "",
      "narrative-code": "c",
      "narrative-desc": "classified"
     },
     {
      "field": "PostalCity",
      "input": "REDLANDS",
      "datum": "Redlands",
      "narrative-code": "cm",
      "narrative-desc": "classified+matched"
     }
    ]
   }
  }
 ]
}
```

## Return details about geocoding results with match-narrative

The detail provided by the `match-narrative` object allows you to have a better understanding about how the ArcGIS Geocoding service derives geocode matches. Additionally, it can potentially be used to look for patterns and improve address input, or to trigger actions in custom applications.

Below is an example of a `match-narrative` scenario with an explanation about what the information means for the following address: 380 New York Street level 2 office 37b, Redlends, CA, 92567

This is what the `match-narrative` object looks like:



```
GET https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=380 New York Street level 2 office 37b, Redlends, CA, 92567&returnMatchNarrative=true&outFields=Addr_type,ExInfo&maxLocations=1&forStorage=false&f=pjson&token=<ACCESS_TOKEN>
```



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "380 New York St, Redlands, California, 92373",
   "location": {
    "x": -117.194790019279,
    "y": 34.057264995788
   },
   "score": 96,
   "attributes": {
    "Addr_type": "PointAddress",
    "ExInfo": "92567"
   },
   "extent": {
    "xmin": -117.195790019279,
    "ymin": 34.056264995788,
    "xmax": -117.193790019279,
    "ymax": 34.058264995788
   },
   "match": {
    "match-narrative": [
     {
      "field": "HouseNumber",
      "input": "380",
      "datum": "380",
      "narrative-code": "cm",
      "narrative-desc": "classified+matched"
     },
     {
      "field": "StreetName",
      "input": "NEW YORK",
      "datum": "New York",
      "narrative-code": "cm",
      "narrative-desc": "classified+matched"
     },
     {
      "field": "StreetType",
      "input": "STREET",
      "datum": "ST",
      "narrative-code": "cma",
      "narrative-desc": "classified+matched+aliased"
     },
     {
      "field": "Level",
      "input": "LEVEL 2",
      "datum": "",
      "narrative-code": "c",
      "narrative-desc": "classified"
     },
     {
      "field": "Unit",
      "input": "OFFICE 37B",
      "datum": "",
      "narrative-code": "c",
      "narrative-desc": "classified"
     },
     {
      "field": "PostalCity",
      "input": "REDLENDS",
      "datum": "Redlands",
      "narrative-code": "cmi",
      "narrative-desc": "classified+matched+inexact"
     },
     {
      "field": "Region",
      "input": "CA",
      "datum": "CA",
      "narrative-code": "cm",
      "narrative-desc": "classified+matched"
     },
     {
      "field": "Unidentified",
      "input": "92567",
      "datum": "",
      "narrative-code": "",
      "narrative-desc": ""
     }
    ]
   }
  }
 ]
}
```

| Input value | Match narrative explanation |
|---|---|
| 380 | Classified as House Number address component and matched to reference data house number value "380". |
| New York | Classified as Street Name address component and matched to reference data street name value "New York" |
| Street | Classified as Street Type address component and matched to reference data street type value "St" as an alias. |
| level 2 | Classified as Level address component but not matched to any value in the reference data. |
| office 37b | Classified as Unit address component but not matched to any value in the reference data. |
| Redlends | Classified as City address component and matched to city value "Redlands" in the reference data with a spelling error. |
| CA | Classified as Region address component and matched to region value "CA" in the reference data. |
| 92567 | Unrecognized as any address component associated with the geocoded address and unmatched. Unidentified input values are included in the ExInfo output field. |

## Match narrative code descriptions

The following table provides descriptions of the possible values for the `narrative-code` and `narrative-desc` properties.

| narrative-code | narrative-desc | Description | Example |
|---|---|---|---|
| c | classified | Input word or part was recognized as an address value from the reference data, an alias, or an indicator of some kind. |  |
| m | matched | Input word or part was matched to an address value in the reference data. |  |
| i | inexact | Input word or part is spelled differently than what it matched to. | Input word "Avanue" matches to reference data street type value "Avenue". |
| p | partial | The input part matched to a portion of a value in the reference data. | Input part "110356" partially matches to reference data postal code value "110350" |
| s | splitting | Indicates that a match was made to a value in the reference data by splitting one word from the input into multiple words, or by concatenating multiple words from the input into a single word. | Input word "Mountainview" matches to street name value "Mountain View" in the reference data. |
| a | aliased | The input part matched to an alias of a reference data value. | Input word "Boulevard" matches as an alias of reference data street type value "Blvd". |
| r | repositioned | Indicates that the input word was matched to a value in the reference data but in the wrong part of the overall address. | "North" is positioned as a prefix directional in input string "North Main Street" but matches to reference data value "Main Street North", which is a suffix directional. |
| d | different | Indicates that the input part was recognized as a particular address component but matched to a different reference data value for that component. | Input word "Street" matched to reference data street type value "Road". |
| n | nearby | Indicates that the input part matched to a postal code or administrative zone which is adjacent to the postal or zone that the geocoded address is actually within. | Input value "92026" matched to adjacent postal code "92027". |
| e | extrapolated | Indicates that the input part matched outside of the house number range for a StreetAddress record in the reference data. | Input value "280" matches to house number range "200-240" in the reference data. |

## Disable fuzzy zone matching

The ArcGIS Geocoding service supports fuzzy matching to administrative zones (neighborhoods, districts, cities) or postal codes in requests which may not be exactly the same as the values associated with the geocoded address. If strict matching is preferred, you can set `comprehensiveZoneMatch` as `false` in a request to disable fuzzy matching.

Fuzzy zone matching is indicated by `narrative-code` value `n` in the `match-narrative` object. See the `narrative-code` [description](#nearby-narrative-codes) for more details.

Look at the examples below to see how disabling fuzzy zone matching affects geocoding results.

### Example: Search using comprehensiveZoneMatch



```
GET https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=380 New York St, 92374&comprehensiveZoneMatch=true&outFields=Score,Addr_type&maxLocations=1&forStorage=false&f=pjson&token=<ACCESS_TOKEN>
```



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "380 New York St, Redlands, California, 92373",
   "location": {
    "x": -117.194835113918,
    "y": 34.057241819826
   },
   "score": 98.3,
   "attributes": {
    "Score": 98.3,
    "Addr_type": "PointAddress"
   },
   "extent": {
    "xmin": -117.195835113918,
    "ymin": 34.056241819826,
    "xmax": -117.193835113918,
    "ymax": 34.058241819826
   }
  }
 ]
}
```

### Example: Search without using comprehensiveZoneMatch



```
GET https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=380 New York St, 92374&comprehensiveZoneMatch=false&outFields=Score,Addr_type&maxLocations=1&forStorage=false&f=pjson&token=<ACCESS_TOKEN>
```



```
{
 "spatialReference": {
  "wkid": 4326,
  "latestWkid": 4326
 },
 "candidates": [
  {
   "address": "New York St, Redlands, California, 92374",
   "location": {
    "x": -117.195540331044,
    "y": 34.064537763377
   },
   "score": 93.82,
   "attributes": {
    "Score": 93.82,
    "Addr_type": "StreetName"
   },
   "extent": {
    "xmin": -117.196540331044,
    "ymin": 34.063537763377,
    "xmax": -117.194540331044,
    "ymax": 34.065537763377
   }
  }
 ]
}
```