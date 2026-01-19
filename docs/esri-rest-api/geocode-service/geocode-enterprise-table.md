# Geocode Enterprise Table

> Source: [/rest/services-reference/enterprise/geocode-enterprise-table/](https://developers.arcgis.com/rest/services-reference/enterprise/geocode-enterprise-table/)

**URL:**: https://<geocodeservice-url>/geocode-enterprise-table

**Methods:**: GET

**Version Introduced:**: 10.9

The `GeocodeEnterpriseTable` task geocodes columns from an Oracle, SQL Server or Postgres database table and appends location information for the addresses or places in the table, such as X and Y coordinate values, match address, score and other geocoding output fields to the original input table. Before using this task, you must first register the database that contains the table you want to geocode, by using ArcGIS Server Manager. For more information about registering your database in Server Manager, see [Registering your data with Server Manager](https://enterprise.arcgis.com/en/server/latest/manage-data/windows/registering-your-data-with-arcgis-server-using-manager.htm).

## Request URL



```
https://<analysis-url>/GeocodeEnterpriseTable/submitJob
```

## Request parameters

| Parameter | Description |
|---|---|
| geocodeParameters(Required) | This includes parameters that help parse the table, as well the field lengths and a field mapping. This JSON is the output from AnalyzeGeocodeInput . It is important to inspect the field mapping and adjust it accordingly before submitting your job, otherwise your geocode results may not be accurate. It is recommended that you use the output from AnalyzeGeocodeInput , and modify the field mapping instead of constructing this JSON by hand and passing it in.Syntax values:field_info : A list of triples with the field names of your input table, its field type (usually TEXT ), and its allowed length (usually 255 ).column_names : Submit the column names of your data in the format of a comma-delimited string.file_type : Should always be table .column_delimiter : Should always be empty string "" .text_qualifier : Should always be empty string "" .field_mapping : Field mapping between each input field and candidate fields on the geocoding service. Do not include ObjectID in this mapping.header_row_exists : Should always be true .Example 2 3 4 5 geocodeParameters={"field_info": "[[\"OBJECTID\", \"TEXT\", 255], [\"CUSTOMER\", \"TEXT\", 255], [\"ADDRESS\", \"TEXT\", 255], [\"CITY\", \"TEXT\", 255], [\"STATE\", \"TEXT\", 255], [\"ZIP\", \"TEXT\", 255]]", "column_names": "OBJECTID,CUSTOMER,ADDRESS,CITY,STATE,ZIP", "file_type": "table", "column_delimiter": "", "text_qualifier": "", "field_mapping": "[[\"ADDRESS\", \"Address\"], [\"CITY\", \"City\"], [\"CUSTOMER\", \"\"], [\"STATE\", \"Region\"], [\"ZIP\", \"Postal\"]]", "header_row_exists": true} |
| geocodeServiceURL(Required) | Enter the REST URL of the geocode service that you want to geocode your addresses or places against. The URL must end in geocodeServer and allow batch requests. This can be a utility service or a locator that is anonymously accessible. The geocode service must be configured to allow batch geocoding. For more information, see Configuring batch geocoding |
| outputType(Required) | Specifies the output type that is returned.Values: append |
| egdbTable(Required) | The path and fully qualified table name in the enterprise geodatabase that contains the addresses and places to be geocoded.The database must be registered your database with ArcGIS Server before a table from the database can be used by this tool. For more information about registering your database with ArcGIS Server in ArcGIS Server Manager, see Registering your data with Server Manager.Syntax values:path : The name of the registered database connection in ArcGIS Server Manager.tableName : The fully qualified table name.Syntax egdbTable={"path":"SQL", "tableName":"DBO.CA_MOVIES"} |
| sourceCountry(Optional) | This parameter will limit geocoding to the country or countries specified. Specifying the country where the addresses or places are from in the tableName will improve the accuracy of geocoding in most cases. If a field representing countries in the tableName is mapped to the input Country field from the geocode service in field_mapping , the country value from the tableName will override the sourceCountry parameter.This is limited to the specified country or countries and when no sourceCountry is specified, geocoding is performed against all supported countries of the locator. The input value can be specified as either 2-character or 3-character country codes in a comma-separated list. See the Supported Country Codes column for the input value to use.Example sourceCountry=US |
| category(Optional) | Limits the types of places the geocode service searches, which eliminates false positive matches and potentially speeds up the search process. When no category is used, geocoding is performed against all supported categories. In general, the parameter can be used for the following:Limit matches to specific place types or address levelsAvoid fallback matches to unwanted address levelsDisambiguate coordinate searchesSee the ArcGIS REST API web help for details about category filtering.Example category=POI |
| outputFields(Optional) | Specifies which geocode service output fields are appended to the tableName .Parameter options:Create a comma separated list of the output fields you want returned.An empty string, which is equivalent to * , returns all available output fields.The keyword NONE returns the Shape X and Shape Y fields. The original field names from the tableName parameters are maintained with their original field names.Example score,match_addr,x,y |
| outputName(Optional) | If provided, the task will create a feature service of the results. You define the name of the service. If an outputName value is not provided, the task will return a feature collection.Syntax: { "serviceProperties": { "name": "<service name>" } }In ArcGIS Online or ArcGIS Enterprise 10.9.1 and later, you can overwrite an existing feature service by providing the itemId value of the existing feature service and setting the overwrite property to true. Including the serviceProperties parameter is optional. As described in the Feature output topic, you must either be the owner of the feature service or have administrative privileges to perform the overwrite.Syntax: { "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } }or { "serviceProperties": { "name": "<existing service name>" }, "itemProperties": { "itemId": "<itemID of the existing feature service>", "overwrite": true } } |
| context(Optional) | The Context parameter contains the following additional settings that affect task operation:Extent (extent)—A bounding box that defines the analysis area. Only input features that intersect the bounding box will be analyzed.Output spatial reference (outSR)—The output features will be projected into the output spatial reference.Syntax: { "extent" : {extent}, "outSR" : {spatial reference} } |
| locatorParameters(Optional) | This parameter takes a dictionary that can contain any or all of the following optional geocoding parameters:locationType : Specifies the preferred output geometry for PointAddress and Subaddress matches. The options for this parameter are rooftop , which is the location that represents the rooftop, parcel centroid for the address, or front door and street , which is the side of street or street entrance location that can be used for routing. If the preferred location does not exist in the data, the default location of street will be returned instead. For geocode results with Addr_type=PointAddress , the x,y attribute values describe the coordinates of the address along the street, while the DisplayX and DisplayY values describe the rooftop or building centroid coordinates. See the ArcGIS REST API web help for details about the locationType parameter for geocodeAddresses .sourceCountry : Limits search to the specified country or countries. When no sourceCountry is specified, geocoding is performed against all supported countries of the locator. Including this parameter in the dictionary will overwrite the sourceCountry parameter if it was used already. Not all geocode services support sourceCountry .category : Limits the types of places the geocode service searches, which eliminates false positive matches and potentially speeds up the search process. When no category is used, geocoding is performed against all supported categories. Not all geocode services support category . Including this parameter in the dictionary will overwrite the category parameter value if it was used already.Syntax { "locationType": "rooftop", "sourceCountry": "US", "category": "POI" } |
| f | The response format. The default response format is html .Values: html \| json |

## Response

When you submit a request, the service assigns a unique job ID for the transaction.

Syntax



```
{
  "jobId": "<unique job identifier>",
  "jobStatus": "<job status>"
}
```

After the initial request is submitted, you can use `jobId` to periodically check the status of the job and messages as described in [Checking job status](/rest/services-reference/enterprise/checking-job-status-1/). Once the job has successfully completed, use `jobId` to retrieve the results. To track the status, you can make a request in the following form:



```
https://<analysis-url>/GeocodeEnterpriseTable/jobs/<jobId>
```

## Access results

When the status of the job request is `esriJobSucceded` , you can access the results of the analysis by making a request in the following form:



```
https://<analysis-url>/GeocodeEnterpriseTable/jobs/<jobId>/results/<output parameter name>?token=<your token>&f=json
```

| Parameter | Description |
|---|---|
| geocodingStatistics | geocodingStatistics output JSON includes statistics about the batch geocoding job. The result has properties for parameter name, data type, and value. The value contains the JSON of percentages for matched, unmatched, and tied records in the batch geocoding job. It may also contain "Dropped Records", an additional list of ObjectIDs for the records that were unable to be processed. { "paramName": "geocodingStatistics", "dataType": "GPString", "value": { "Matched": "992 Matched (99.1%)", "Unmatched": "0 Unmatched (0.0%)", "Tied": "8 Tied (0.8%)" } } |