# Vector Tile

> Source: [/rest/services-reference/enterprise/vector-tile/](https://developers.arcgis.com/rest/services-reference/enterprise/vector-tile/)

**URL:**: https://<root>/<serviceName>/VectorTileServer/tile/<level>/<row>/<column>.pbf

**Methods:**: GET

**Version Introduced:**: 10.4

## Description

This resource represents a single vector tile for the map. The bytes for the tile at the specified level, row, and column are returned in PBF format. If a tile is not found, an HTTP status code of 404 (Not found) is returned.

## Example usage

Note: This is an example URL only and is not an active link to an existing attachment.

`https://services.myserver.com/arcgis/rest/services/Hosted/World/VectorTileServer/tile/0/0/0.pbf`