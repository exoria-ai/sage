# Commit

> Source: [/rest/services-reference/enterprise/commit/](https://developers.arcgis.com/rest/services-reference/enterprise/commit/)

**URL:**: https://<root>/<serviceName>/<serviceType>/uploads/<itemID>/commit

**Methods:**: POST

**Version Introduced:**: 10.0

## Description

This operation commits multiple parts of a item into a single item and completes the upload of items that are uploaded in parts.

See section [limiting Upload file size and file types](/rest/services-reference/enterprise/uploads/) to learn more about default file size and file type limitations imposed for uploads.

Users can provide arguments to the commit operation as query parameters. The parameter details are provided in the parameters table below.

## Request parameters

| Parameter | Details |
|---|---|
| f | Description: The response format. The default response format is html.Values: html \| json |
| parts | Description: A comma separated ordered list of all partIDs that make an item. If parts is not provided the default order of the parts is used.Syntax:parts=<partID 1>,<partID 2>,<partID 3>,<partID N>Example:parts=5,6,10,12 |
| checksum | Description: The expected checksum value of the committed item. If the checksum does not match, the item will not be commited. This parameter is optional. |

## Example usage

Example: Commit an item



```
https://organization.example.com/<context>/rest/services/911CallsHotspot/GPServer/uploads/icb0817bf-53c7-45d9-9487-3b87b6cba253/commit
```

## JSON Response syntax



```
{
 "success": <true|false>,
 "item": {
  "itemID": "<itemID>",
  "itemName": "<itemName>",
  "description": <Description>,
    "date": <date>,
  "committed": <true|false>
 }
}
```

## JSON Response example



```
{
     "success": true,
	 "item": {
        "itemID": "i912f0648-a455-4d08-ae95-44eb5b82de2e",
        "itemName": "lakeImagery",
        "description": "Lake Tahoe",
        "date": 1246060800000,
        "committed": true
    }
}
```