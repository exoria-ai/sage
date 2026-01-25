# Video 2 Transcript: Interactive Map Demo

**Video Title:** Web GIS Application Development
**Duration:** ~10-12 minutes
**Topic:** Modern React-based map viewer with tag-based configuration, smart search, and multiple map presets

---

## INTRO (0:00-0:45)

Next I want to show you the interactive map. When SAGE finds a parcel or identifies a location, it can hand off to the map for visual exploration.

Before I start clicking around, let me explain what I was trying to accomplish. Solano County already has some great mapping applications. The new Land Use viewer launched in October is quite good. But I do think there's room for consolidation. One place where you can switch maps without switching applications.

There's also work I'd want to do that doesn't exist yet. LiDAR visualization and analysis on the web. Integrated oblique imagery that doesn't require switching to a dedicated Sanborn viewer. This is a modern React application built from scratch using the Esri JavaScript API. The sky is the limit for where we can take this.

---

## VECTOR TILES + LABELS (0:45-1:30)

152,000 parcels rendering as vector tiles. At county scale, feature layers bog down. Vector tiles render instantly, and we pair them with a hidden parcel feature layer for search and click interactions, which vector tiles don't support.

Watch the labels as I zoom. Large agricultural parcels show APNs even from a distance. Smaller parcels only label when you're closer. This is done with separate label classes that trigger at different scales based on parcel size.

---

## PRESET SWITCHING (1:30-2:30)

Now watch the dropdown. Planning preset. Notice the map stays at the same location. The extent persists between configurations. Different layers, same view.

Hazards map. This is a new map I built using the existing hazard layers currently split across apps. Fire, flood, and seismic data in one view. Useful for permit review or property research where you need to check multiple hazard types at once.

One application. Multiple configurations. One codebase. Switching maps becomes as easy as switching layers. We get a lot of customization without needing to build and maintain separate mapping apps.

---

## SEARCH (2:30-3:30)

Let's find a property. People know their address. They don't always know their parcel number. Addresses autocomplete against the county's wonderful address points layer.

Now by APN. One thing I figured out quickly was that APN formatting in Solano is complicated. I coded the location search to accept multiple formats automatically.

Spaces work too. Or dashes, or missing leading and trailing zeros. The system normalizes input.

---

## CLICK PARCEL (3:30-4:15)

Now let's click a parcel. The popup pulls from that hidden feature layer I mentioned. APN, address, acreage, zoning, assessed value—all in one place.

A really impressive amount of detail that Solano maintains on the parcel. And by identifying on the hidden parcel feature layer, we can still see this while getting vector tile speed.

---

## LAYER GROUPS + AERIALS (4:15-5:15)

To enable us to have far more layers in the map viewer, I implemented intelligent grouping in the table of contents. Groups can be optionally set to an exclusive mode, where only one layer in the group can be visible at a time.

Watch the aerials. Turn on 2004, 2025 turns off automatically. Radio button behavior—half the clicks. This behavior is driven by a tag in the layer name. The application reads those tags at runtime. No hardcoded layer IDs, no brittle configuration files.

---

## DERIVED LAYERS (5:15-6:15)

Here's a derived layer I generated. Land value per square foot, calculated from Aumentum assessed land values divided by parcel area. Blue is lower, red is higher.

There is a treasure trove of Aumentum data that you have already merged with your parcel data. This is just one example of an additional way we can use it.

School districts. I couldn't find this layer published anywhere, so I asked SAGE to generate it. She downloaded the parcel data, dissolved on the district attribute. Then I published it as a new feature layer and added it to the map.

---

## PLANNING MAP DETAIL (6:15-7:15)

Let me show you the Planning map in more detail. Look at the layer panel. City Zoning expands to show all seven cities. Benicia, Dixon, Fairfield, Rio Vista, Suisun, Vacaville, Vallejo. Same structure for City General Plans. The county and all incorporated areas in one map.

This subfolder structure lets us include a lot more layers without overwhelming the user. Fifty layers would be unusable as a flat list. Organized into collapsible groups, it stays manageable.

Click on a zone in Vacaville. Get the zoning designation right there. No need to visit seven different city websites. This makes it much more feasible to put data from both incorporated and unincorporated areas together in the same map.

---

## LEGEND + BASEMAP (7:15-7:45)

Quick note—there's a legend panel. Expands to show symbology for all visible layers. County zoning categories, city boundaries, whatever's currently on.

Basemap selector. We also have a list of standard third-party Esri basemaps. Streets, terrain, or a neutral gray for when the data layers need to stand out.

---

## ARCGIS ONLINE (7:45-9:00)

Let me show you what's behind this. Standard ArcGIS Online, which we can easily replicate in the Solano GIS Enterprise Portal setup on Azure.

Four web maps. There is a Solano basemap that acts as a master template. All layers from all services are configured here. This lets us quickly duplicate it, edit it to purpose, and deploy a new map viewer in the application. Then with the change of a single line of code, we can deploy an additional map to end users.

Let's look inside the Parcel map. Look at the layer names. Parcels bracket vector tiles. Aerials bracket exclusive. Tags in the layer name drive application behavior.

This makes it easy for all staff to configure how the map application behaves. The custom code looks for tags and, if present, reconfigures the viewer to handle those layers or groups of layers specially. This lets us implement new behavior that Esri does not support out of the box, but in a way that is still easy to maintain.

---

## INFOGRAPHIC: ARCHITECTURE (9:00-9:30)

So here's what I built. One React application pointing at four different web maps. Parcels, Planning, Hazards, and a base template. Each map is just a configuration. Same codebase, same deployment, same maintenance burden. Adding a fifth map means creating a web map in Portal and adding one line to a config file.

---

## INFOGRAPHIC: VECTOR TILES (9:30-10:00)

This was one of the key technical decisions. Feature layers give you full interactivity—clicks, popups, queries—but they struggle at scale. Vector tiles render fast because they're pre-cached and GPU accelerated, but they don't support search and identify.

For the parcel layer, we use both. Vector tiles for display, a hidden feature layer for interactions. The application pairs them automatically when it sees the vector tiles tag.

---

## INFOGRAPHIC: WORKFLOW (10:00-10:30)

And this is the operational benefit. Traditional workflow—analyst requests a change, developer modifies code, QA tests, someone deploys. Three people, at least a week.

Tag-based workflow—analyst renames a layer, saves. Done. The person who understands the data controls how it behaves. That's fewer bottlenecks and faster iteration.

---

## CLOSING (10:30-12:00)

This is the kind of work I want to do—building tools that make the rest of the team more effective. I'd welcome the chance to talk through how this could fit into what you're already doing, and I appreciate you taking the time to review this.

---

## Technical Summary

### Architecture
- **Framework:** React + ArcGIS JavaScript SDK 4.x
- **Configuration:** Tag-based, driven by layer names in ArcGIS Online/Portal
- **Map Presets:** Parcels, Planning, Hazards (easily extensible)
- **Performance:** Vector tiles for display, hidden feature layers for interactions

### Key Innovations

| Feature | Implementation | Benefit |
|---------|---------------|---------|
| **Vector Tile + Feature Layer Pairing** | `[VECTOR_TILE]` tag auto-pairs layers | Fast rendering + full interactivity |
| **Exclusive Layer Groups** | `[EXCLUSIVE]` tag creates radio buttons | One aerial year at a time |
| **Flexible APN Search** | Input normalization | Users don't need to know format |
| **Multi-City Zoning** | Nested layer structure | County + 7 cities in one map |

### Operational Model

**Before (Traditional):**
1. Analyst requests change
2. Developer modifies code
3. QA tests
4. Deploy to production
5. Timeline: ~1 week, 3 people

**After (Tag-Based):**
1. Analyst renames layer in Portal
2. Done
3. Timeline: 30 seconds, 1 person

---

*Transcript of demo video recorded January 2026 for Solano County IT Analyst Principal (GIS) position.*
