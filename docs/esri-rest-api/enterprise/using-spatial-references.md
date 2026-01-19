# Using spatial references

> Source: [/rest/services-reference/enterprise/using-spatial-references/](https://developers.arcgis.com/rest/services-reference/enterprise/using-spatial-references/)

## Description

Features on a map refer to the actual locations of the objects they represent in the real world. The positions of objects on the earth's spherical surface are measured in degrees of latitude and longitude, also known as geographic coordinates. Though latitude and longitude can locate exact positions on the surface of the earth, they are not uniform units of measure; only along the equator does the distance represented by one degree of longitude approximate the distance represented by one degree of latitude. To overcome measurement difficulties, data is often transformed from the three-dimensional geographic coordinate system to the two-dimensional planar surface in a projected coordinate system. Projected coordinate systems describe the distance from an origin (0,0) along two separate axes: a horizontal x-axis representing east-west and a vertical y-axis representing north-south.

Because the earth is round and maps are flat, getting information from the curved surface to a flat one involves a mathematical formula called a map projection. A map projection transforms latitude and longitude to x,y coordinates in a projected coordinate system.

The term coordinate system, which includes both geographic and projected coordinate systems, is used to describe the information about the projection, as well as other specifics such as datum, units, and meridians.

Datum transformations are available for projecting spatial data from one geographic coordinate system to another. For a complete list of supported transformations, including WKIDs and WKTs, see the following:

### Coordinate systems PDFs

Each coordinate system is defined by both a well-known ID (WKID) and a definition strings (WKT1 and WKT2). For a complete list of supported IDs and their corresponding definition strings, see the following:

-   [Geographic coordinate systems](/rest/services-reference/enterprise/9a5525f236fab9515bd76f6dd198ef1a/gcs_pdf_11.5.pdf)
-   [Projected coordinate systems](/rest/services-reference/enterprise/43b51ca910d5d49ba01f1d5cc720fd5a/pcs_pdf_11.5.pdf)
-   [Vertical coordinate systems](/rest/services-reference/enterprise/a5d64c1f49a1df8d169aa5eed203dc1b/vcs_pdf_11.5.pdf)
-   [Geocentric coordinate systems](/rest/services-reference/enterprise/cfd580ff3a563b46dd308c4074038378/geocs_pdf_11.5.pdf)
-   [Compound coordinate systems](/rest/services-reference/enterprise/ebdae3219d7a8e0bef76e56e0eff5e28/ccs_pdf_11.5.pdf)

### Transformation PDFs

-   [Geographic datum transformations](/rest/services-reference/enterprise/2e971d19c164b92b2da4a62c1c4154a6/gtf_pdf_11.5.pdf)
-   [Vertical datum transformations](/rest/services-reference/enterprise/f18292bcc0abb5fb3a3a399482adc27f/vtf_pdf_11.5.pdf)
-   [Mobile datum transformations](/rest/services-reference/enterprise/4bc2d5d5855abc529081a21f0b8d7ce0/mtf_pdf_legacy.pdf)