# search: Search

**Category:** portal
**URL:** https://developers.arcgis.com/rest/users-groups-and-items/search/

## Service Info

- **Parameter:** Details
- **q:** The query string used to search.See Search reference for advanced options.Example:Use dark colors for code blocksCopy1
q=redlands+map
- **bbox:** The bounding box for a spatial search defined as minx, miny, maxx, or maxy. Spatial search is an overlaps/intersects function of the query bbox and the extent of the document. Documents that have no extent (for example, .mxd, .3ds, and .lyr) will not be found when doing a bbox search. The document extent is assumed to be in the WGS84 geographic coordinate system.Example:Use dark colors for code blocksCopy1
bbox=-118,32,-116,34
- **filter:** Structured filtering is accomplished by specifying a field name followed by a colon and the term you are searching for with double quotation marks. It allows the passing in of application-level filters based on the context. Use an exact keyword match of the expected value for the specified field. Partially matching the filter keyword will not return meaningful results.See Search reference for advanced options.Example:Use dark colors for code blocksCopy1
filter=type:"Web map"
- **categories:** A JSON array or comma-separated list of up to eight organization content categories to search items. The exact full path of each category is required, and an OR relationship between the categories must be specified. Each request allows a maximum of eight categories parameters with an AND relationship between the various categories parameters called.Example (search for items with the water or forest category in the United States):Use dark colors for code blocksCopy1
2
3
//JSON array
categories: ["/Categories/Water", "/Categories/Forest"]
categories: ["/Region/US"]Note/ are reserved and can't be used in the category names. If commas are included in the categories, the user must use JSON format.
- **categoryFilters:** A comma-separated list of up to three category terms to search for items that have matching categories. Up to two categoryFilters parameters are allowed per request. This parameter cannot be used with the categories parameter to search in a request.Example:Use dark colors for code blocksCopy1
2
//Search for items with categories that include basemap or ocean
categoryFilters=basemap, ocean
- **start:** The result number of the first entry in the result set response. The index number is 1-based. The default value of start is 1 (in other words, the first search result). The start parameter, along with the num parameter, can be used to paginate the search results.Example:Use dark colors for code blocksCopy1
2
//Returns the 11th result as the first entry in the response
start=11
- **num:** The maximum number of results to be included in the result set response. The default value is 10, and the maximum allowed value is 100. The num parameter, along with the start parameter, can be used to paginate the search results.NoteThe actual number of returned results may be fewer than the num value. This happens when the number of results remaining after start is fewer than the num value. num must be 0 if you are interested in the total item counts or aggregations matching a query with countFields and countSize values specified. Do not include results and aggregations in the same request; the results array will be empty when num=0.Example:Use dark colors for code blocksCopy1
2
//Returns a max of 50 results in the response
num=50
- **sortField:** The field to sort by. You can also sort by multiple fields (comma separated). Sort field names are not case sensitive.Supported sort field names are title, created, type, owner, modified, avgrating, numratings, numcomments, numviews, and scorecompleteness.
- **sortOrder:** Describes whether the results are returned in ascending or descending order. The default is ascending.NoteThis applies when working with sortField.Values: asc | desc
- **countFields:** A comma-separated list of fields to count. The maximum count fields allowed per request is three. Supported count fields are type, access, contentstatus, and categories.Example:Use dark colors for code blocksCopy1
countFields=categories, access
- **countSize:** The maximum number of field values to count for each countFields field. The default value is 10, and the maximum number allowed is 200.Example:Use dark colors for code blocksCopy1
countSize=200
- **exclude:** Excludes fields from the search results. The maximum number of fields that can be excluded is 20.Example:Use dark colors for code blocksCopy1
exclude=title,culture,numViews
- **displaySublayers:** Returns feature layers for a hosted feature service. The default is false.Values: true | false
- **enriched:** Introduced at ArcGIS Enterprise 11.1. Specifies whether the search results will include both literal and relevant matches or only literal matches. A literal match is defined as having the search criteria be present in an item's title or tag. A related match is defined as having a term related to the search criteria being present in an item's tag. If true, the search results will include both literal and relevant matches. If false, search results will include only those that are a literal match for the search criteria. Searches that do not include this parameter will only return literal matches.Values: true | false
- **MeanPixelSize:** An integer representing mean size of image pixels, in meters. The formula used to calculate this:
(PixelSizeX + PixelSizeY) / 2 * unitToMeterFactor.Example to find single-band imagery based on resolution (meters):Use dark colors for code blocksCopy1
type: "Image Service" AND MeanPixelSize:[0 TO 1]
- **BandCount:** An integer representing the number of bands in the imagery.Example to find imagery based on band count:Use dark colors for code blocksCopy1
2
3
type: "Image Service" AND bandcount:1   //Single band

type: "Image Service" AND bandcount:[3 TO 20]   //Multi-band
- **displayServiceProperties:** Displays image service properties. The default is false.Values: true | false
- **f:** The response format. The default format is html.Values: html | json | pjson

## Description

The search operation searches for content items in the portal. The searches are performed using a high-performance index that indexes the most popular fields of an item.

The search index is updated whenever users add, update, or delete content. There may be a lag between the time that the content is updated and the time it's reflected in the search results.

The results of a search only contain items that the user has permission to access. A search requires at least one of the following parameters be specified: q, bbox, or categories.

See Search reference for information about the syntax of the query, additional fields, advanced filters, and tips for crafting better searches.

## Request Parameters

## Response

## Examples

```json
1
https://org.arcgis.com/sharing/rest/search?q=park&f=pjson
```

```json
1
https://organization.example.com/<context>/sharing/rest/search?q=transit&enriched=true&f=pjson
```

