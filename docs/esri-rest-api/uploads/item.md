# Item

> Source: [/rest/services-reference/enterprise/item/](https://developers.arcgis.com/rest/services-reference/enterprise/item/)

**URL:**: https://<root>/<serviceName>/<serviceType>/uploads/<itemId>

**Methods:**: GET

**Version Introduced:**: 10.0

## Description

This resource represents an item that has been uploaded or registered with the server. If an item consists of multiple parts, the `committed` parameter in the response is set to `true` once the upload of individual parts is complete and the item is committed.

## Request parameters

| Parameter | Details |
|---|---|
| f | The response format. The default response format is html.Values: html \| json |

## Example usage

Example: Item resource



```
https://organization.example.com/<context>/rest/services/911CallsHotspot/GPServer/uploads/icb0817bf-53c7-45d9-9487-3b87b6cba253
```

## JSON Response syntax



```
{
 "itemID": "<itemID>",
 "itemName": "<itemName>",
 "description": "<description>",
 "date": <date>,
 "committed": <true|false>
}
```

## JSON Response example



```
{
 "itemID": "i912f0648-a455-4d08-ae95-44eb5b82de2e",
 "itemName": "us45120.tif",
 "description": "This is a sample imagery",
 "date": 1246060800000,
 "committed": true
}
```