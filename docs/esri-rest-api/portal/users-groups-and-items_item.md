# items/[itemID]: Item

**Category:** portal
**URL:** https://developers.arcgis.com/rest/users-groups-and-items/item/

## Service Info

- **Parameter:** Details
- **[Common Parameters]:** For a complete listing, see Common parameters.
- **f:** The response format. The default format is html.Values: html | json | pjson

## Description

An individual item resource returns the information for a specific organization item. An item is a unit of content in the organization. Each item has a unique identifier and a well-known URL that is independent of the owner of the item. An item can have associated JSON data that's available via the item data resource. For example, an item of type Map Package returns the actual bits corresponding to the map package via the item data resource.

The numViews is incremented when an item is opened.

## Request Parameters

## Response

## Examples

```json
1
https://www.arcgis.com/sharing/rest/content/items/10ba62fe50864339a8a3e0f18ca85506?f=pjson
```

```json
1
https://organization.example.com/<context>/sharing/rest/content/items/10ba62fe50864339a8a3e0f18ca85506?f=pjson
```

```json
1
2
3
4
5
6
7
8
9
10
[
  [
    -117.78452081090789,
    33.46744709844458
  ],
  [
    -72.31511555464664,
    42.11377951830049
  ]
]
```

