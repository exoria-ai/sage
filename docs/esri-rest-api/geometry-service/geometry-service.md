# Geometry Service

> Source: [/rest/services-reference/enterprise/geometry-service/](https://developers.arcgis.com/rest/services-reference/enterprise/geometry-service/)

**URL:**: https://<root>/Utilities/Geometry/GeometryServer/

**Methods:**: GET

**Operations:**: Areas and Lengths, Auto Complete, Buffer, Convex Hull, Cut, Densify, Difference, Distance, Find Transformations, From GeoCoordinateString, Generalize, Intersect, Label Points, Lengths, Offset, Project, Relation, Reshape, Simplify, To GeoCoordinateString, Trim/Extend, Union

**Version Introduced:**: 9.3

## Description

A `Geometry Service` contains utility methods that provide access to sophisticated and frequently used geometric operations. An ArcGIS Server site can only expose one geometry service with the static name Geometry.

Use a geometry service to do the following:

-   Buffer, project, and simplify geometry.
-   Calculate areas and lengths for geometry.
-   Determine spatial relations and label points.
-   Determine distances between geometries.
-   Apply Union, Intersection, and Difference operations between geometries.
-   Autocomplete, generalize, reshape, offset, trim or extend, and compute convex hulls of geometries.
-   Convert to or from geographic coordinate strings.

## Supported operations

The `Geometry Service` resource is primarily a processing and algorithmic resource that supports operations related to geometries.

The `Geometry Service` resource has the following operations:

| Operation | Details |
|---|---|
| Areas and Lengths | Calculates areas and perimeter lengths for each polygon specified in the input array. |
| Auto Complete | Simplifies the process of constructing polygons that are adjacent to other polygons. |
| Buffer | Returns an array of polygons at the specified distances for the input geometry. An option is available to union buffer polygons at each distance. |
| Convex Hull | Returns the convex hull of the input geometry. |
| Cut | Splits the input polyline or polygon where it crosses a cutting polyline. |
| Densify | Densifies geometries by plotting intermediate points between existing vertices. |
| Difference | Constructs the set-theoretic difference between an array of geometries and another geometry. |
| Distance | Calculates the distance between two geometries. |
| Find Transformations | Gets a list of geographic transformations. |
| From GeoCoordinateString | Converts a list of strings in a well-known format to x,y coordinates. |
| Generalize | Returns generalized (Douglas-Peucker) versions of the input geometries. |
| Intersect | Constructs the set-theoretic intersection between an array of geometries and another geometry. |
| Label Points | Calculates an interior point for each polygon specified in the input array. |
| Lengths | Calculates the length of each polyline specified in the input array. |
| Offset | Constructs the offset of the given input polyline based on an offset distance. |
| Project | Returns an array of projected geometries. |
| Relation | Determines the pairs of geometries from the input geometry arrays that participate in the specified spatial relation. |
| Reshape | Reshapes a polyline or a part of a polygon using a reshaping line. |
| Simplify | Returns an array of topologically correct geometries. |
| To GeoCoordinateString | Converts a list of coordinates into strings in a well-known format based on the specified conversion type. |
| Trim/Extend | Trims or extends each polyline specified in the input array using the user-specified guide polylines. |
| Union | Constructs the set-theoretic union of the input geometries. |

## Request parameters

| Parameter | Details |
|---|---|
| f | Description: The response format. The default response format is html .Values: html \| json |

## Example usage

URL for the geometry service on sampleserver6.

[https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/Utilities/Geometry/GeometryServer](https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer)

## JSON Response syntax



```
{"serviceDescription" : "<serviceDescription>"}
```

## JSON Response example



```
{"serviceDescription" : "Test Geometry Service Description"}
```