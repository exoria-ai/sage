# Solano County: Agentic AI + GIS Power User Strategy

## Executive Summary

This document outlines a prioritized strategy for deploying AI-enabled GIS tools (like Sage) across Solano County departments through a "Power User" model. This approach mirrors successful GIS adoption strategies from the late 1990s/early 2000s (e.g., College Station's ArcView 3.2 rollout) but adapted for the agentic AI era.

### The Core Insight

**Then (ArcView 3.2 era):** Power users needed to learn complex desktop software, understand data structures, and translate between "GIS-speak" and departmental workflows. Training took months; licenses were expensive.

**Now (Agentic AI era):** The barrier to entry has collapsed. A departmental power user doesn't need to master ArcGIS Pro—they need to know:
1. What questions their department needs answered
2. What data exists (or should exist)
3. How to prompt an AI agent effectively

---

## Alignment with Current County Initiatives

The FY2025-26 Recommended Budget shows Solano County has already laid groundwork for this approach:

### Existing AI Foundation (DoIT, p. 268-269)
- **AI Policy:** "Updated security policies (including Artificial Intelligence [AI] guidelines)"
- **AI Deployment:** "Deployed Microsoft Co-Pilot to enhance productivity"
- **Data Infrastructure:** Data Services division with Business Analytics, Business Intelligence, Data Warehousing
- **Investment:** $2.3M Microsoft 365 contract (the platform Co-Pilot runs on)

### Existing GIS Foundation (DoIT, p. 268-269)
- GIS sits within DoIT's "Regional Services" division
- Recent accomplishments:
  - "Delivered GIS training"
  - "Established interagency data-sharing"
  - "Developed a Spatial Data Governance Framework"
  - Achieved 3DEP program inclusion for LiDAR/elevation data
  - Contributing to statewide Streets GIS data system

### Training Infrastructure (Employee Development, p. 234-236)
- Budget: ~$947K, 3 FTEs
- 31,506 training slots utilized in FY24/25
- Tuition reimbursement program available
- NeoGov Learning Management System implementation planned for FY25/26
- Already creates department-specific training plans

---

## The Power User Model: Old vs. New

| Old Model (1990s-2000s) | New Model (2025+) |
|-------------------------|-------------------|
| Train users on ArcMap/ArcGIS Pro | Train users on prompting GIS-enabled AI agents |
| Buy departmental workstations with GIS licenses | Provide web-based agent access (no license cost per seat) |
| Power users create maps/analysis for their department | Power users orchestrate AI agents + validate/refine outputs |
| Central GIS maintains all authoritative data | Central GIS maintains data governance; agents consume via APIs |
| Months of training to proficiency | Days to weeks with guided use cases |
| One power user serves 20-30 colleagues | One power user can multiply their impact 10x with AI assistance |

### Why This Solves Real Problems

From the budget narrative, DoIT faces:
> "Filling vacant positions has been challenging, as the skill sets are in demand in the broader hiring marketplace making it difficult to compete for talent."

Power users + AI agents are a **force multiplier** that doesn't require hiring more GIS analysts. It distributes capability while maintaining central data governance.

---

## Prioritized Ranking: Departments for AI-GIS Power Users

### TIER 1: HIGHEST IMPACT (Immediate Candidates)

---

#### 1. Resource Management — Planning Services Division

| Metric | Value |
|--------|-------|
| Budget | $3.8M |
| Staff | 10 FTEs |
| GIS Intensity | ★★★★★ |

**Why #1:**
- Every task is inherently spatial: use permits, subdivisions, zoning clearances, General Plan, CEQA review
- Annual workload: 9 use permits, 12 minor use permits, 10 admin permits, 604 building permit reviews, 316 business license reviews
- Already interfaces with: flood zones, zoning, Williamson Act, ALUC, Suisun Marsh
- Current pain: Only 10 staff doing policy planning AND current planning AND environmental review

**Sage Use Cases:**
- **Permit intake:** Address → APN → Zoning → Flood → Fire → Checklist in seconds
- **Notification lists:** Buffer query → Owner list → Mailing labels
- **Board/PC staff reports:** Parcel context auto-generated
- **General Plan consistency checks:** Instant zoning/GP alignment verification

**Ideal Power User Profile:** Senior Planner or Planning Technician who processes most permit applications

**Sample Interaction:**
```
User: "What's the zoning and flood status for 4500 Suisun Valley Road?"

Sage: [Geocodes address, queries zoning, queries flood zone, renders map]
      "This parcel (APN 0027-081-100) is zoned SV-A (Suisun Valley Agricultural)
      in unincorporated Solano County. It's in FEMA Flood Zone X (minimal flood
      hazard). The property is 12.4 acres. Here's the map: [link]"
```

---

#### 2. Resource Management — Building & Safety / Code Enforcement

| Metric | Value |
|--------|-------|
| Budget | $2.4M combined |
| Staff | 10 FTEs |
| GIS Intensity | ★★★★★ |

**Why #2:**
- 3,176 building inspections/year, 838 permits issued
- 128 code complaints investigated (zoning, junk/debris, inop vehicles, illegal businesses)
- **Floodplain Administrator** role = direct FEMA/flood zone queries are core function
- Field-intensive: inspectors need mobile parcel lookups

**Sage Use Cases:**
- **Permit application screening:** Is address in flood zone? Fire hazard zone? Correct zoning for proposed use?
- **Code enforcement triage:** Pull parcel/owner info, zoning, verify if use is permitted
- **Damage assessments (fire/flood/earthquake):** Rapid parcel identification and owner notification
- **Floodplain determinations:** Instant SFHA status checks

**Ideal Power User Profile:** Code Enforcement Officer or Senior Building Inspector

**Sample Interaction:**
```
User: "Someone reported an illegal auto repair shop at 2100 Rockville Road.
       What can you tell me about this property?"

Sage: [Geocodes, pulls parcel details, zoning, checks permitted uses]
      "APN 0132-050-040, 2.1 acres, zoned A-20 (Agricultural). Auto repair
      is NOT a permitted use in A-20 zones (see County Code 28.71). Owner
      of record: [name]. This appears to be a valid code violation for
      unpermitted commercial use in an agricultural zone."
```

---

#### 3. Sheriff/OES — Office of Emergency Services

| Metric | Value |
|--------|-------|
| Budget | ~$167M total Sheriff (OES embedded) |
| Staff | 556 total |
| GIS Intensity | ★★★★☆ |

**Why #3:**
- EOC activations increasing: floods, wildfires, PSPS events
- Dispatch services need real-time location context
- Coordinates with fire districts, cities, H&SS during disasters
- Budget notes: "enhanced emergency response through updated data layers and drone-based mapping"

**Budget Challenge (p. 329):**
> "Emergency Operations Center (EOC) activations have significantly increased with more frequent flooding, wildfires, and Public Safety Power Shutoffs (PSPS). During activations... routine work of OES staff, including grants management, training and exercises, volunteer recruitment, and public outreach activities are greatly curtailed."

**Sage Use Cases:**
- **Incident mapping:** Address → Location → Jurisdiction → Nearest resources
- **Evacuation planning:** Parcels in flood/fire zones → Notification lists with owner contacts
- **Resource staging:** Facility lookups, district boundaries, shelter locations
- **Post-disaster damage assessment support:** Affected parcel lists by hazard zone

**Ideal Power User Profile:** OES Coordinator or Emergency Services Analyst

**Sample Interaction:**
```
User: "We need to notify all property owners within 1000 feet of the levee
       breach at Grizzly Island Road. How many parcels and can you generate a list?"

Sage: [Geocodes location, runs buffer query, retrieves owner information]
      "Found 47 parcels within 1000 feet. 12 are in Flood Zone AE (high risk).
      Here's the notification list with owner names, mailing addresses, and
      APNs. [Renders buffer map showing affected parcels]"
```

---

### TIER 2: HIGH IMPACT (Strong Candidates)

---

#### 4. Assessor's Office

| Metric | Value |
|--------|-------|
| Budget | $11.2M |
| Staff | 49 FTEs |
| GIS Intensity | ★★★★☆ |

**Why Tier 2:**
- 23,300 parcels reviewed annually from recorded documents → 15,000 reappraisal events
- Prop 8 processing: 4,500 properties requiring market value analysis
- 370 assessment appeals requiring parcel-level defense
- Already uses spatial logic (comparable sales, neighborhood analysis)

**Budget Note (p. 179):**
> "Responded timely to a high volume of customer inquiries due to pending changes in ownership, real estate market activity, and changes in market values."

**Sage Use Cases:**
- **Comparable sales analysis:** Find parcels within radius with similar size/zoning
- **Appeal preparation:** Parcel context including flood/fire factors that affect value
- **Prop 19 transfers:** Cross-county base year transfers need location verification
- **Mass appraisal support:** Neighborhood delineation, market area analysis

**Ideal Power User Profile:** Senior Appraiser or Assessment Analyst

---

#### 5. Agricultural Commissioner / Weights & Measures

| Metric | Value |
|--------|-------|
| Budget | $7.5M |
| Staff | 28 FTEs |
| GIS Intensity | ★★★★☆ |

**Why Tier 2:**
- 590+ properties surveyed for pest eradication (glassy-winged sharpshooter)
- 834 parcels treated in eradication efforts
- 330 agricultural fields inspected (4,809 acres) for phytosanitary certifications
- 24,127 monitoring trap checks at 2,462 locations
- Strategic Initiative for Agriculture underway (SALC grant) — explicitly developing "agricultural land use plans"

**Budget Note (p. 387):**
> "In 2024, the department commenced work on a county Strategic Initiative for Agriculture, consistent with Board of Supervisors established priorities, supported by a Sustainable Agricultural Lands Conservation (SALC) program grant."

**Sage Use Cases:**
- **Pest treatment tracking:** Parcel-level treatment history and status
- **Inspection routing:** Optimize field visits by geographic clustering
- **Williamson Act monitoring:** Contract status lookups, preserve boundaries
- **Agricultural preserve mapping:** Land conservation planning support

**Ideal Power User Profile:** Senior Agricultural Biologist

---

#### 6. Public Works — Engineering & Operations

| Metric | Value |
|--------|-------|
| Budget | $44.9M |
| Staff | 75 FTEs |
| GIS Intensity | ★★★★☆ |

**Why Tier 2:**
- 576 miles of roads, 94 bridges, 51 large culverts maintained
- 58 miles of drainage channels (Water Agency contract)
- Encroachment permits, grading permits, transportation permits issued
- Illegal dumping cleanup: $250K/year — needs location tracking and hotspot analysis
- Pavement Condition Index tracking (currently at 80 "very good")

**Budget Challenge (p. 421):**
> "The cleanup of illegally dumped roadside solid waste continues to impact the availability of road crews to perform other road repair and maintenance projects. Over the past five years, the cost to Public Works continues to increase, with an expected annual cost of approximately $250,000."

**Sage Use Cases:**
- **Permit routing:** Is this road county-maintained? What supervisor district?
- **Work order triage:** Address → Road segment → Maintenance history
- **Illegal dumping hotspot analysis:** Map incidents, identify patterns
- **Bridge/culvert inspection scheduling:** Geographic optimization

**Ideal Power User Profile:** Engineering Technician or Road Supervisor

---

### TIER 3: MODERATE IMPACT (Good Candidates)

---

#### 7. Environmental Health Services

| Metric | Value |
|--------|-------|
| Budget | $6.9M |
| Staff | 21 FTEs |
| GIS Intensity | ★★★☆☆ |

**Why Tier 3:**
- 3,151 routine inspections (food, housing, pools, body art)
- 702 hazardous materials inspections
- 178 solid waste facility inspections
- Well permits (100), septic permits (96), small water systems (10)
- Stormwater inspections (339 retail food/hazmat businesses)

**Sage Use Cases:**
- Inspection routing optimization
- Well/septic permit screening: Parcel size, flood zone status
- Groundwater Sustainability Agency coordination
- Contaminated site proximity searches

**Ideal Power User Profile:** Environmental Health Specialist

---

#### 8. Health & Social Services — Employment & Eligibility

| Metric | Value |
|--------|-------|
| Budget | $172M+ (H&SS total) |
| Staff | 600+ |
| GIS Intensity | ★★☆☆☆ |

**Why Tier 3:**
- 33,344 CalFresh families, 6,802 IHSS clients
- Housing Support Program: 437 families served, needs housing locator services
- Home Safe Program: APS clients homeless/at-risk
- High volume but less parcel-specific (more address/client based)

**Sage Use Cases:**
- Client address verification and service area determination
- Housing resource proximity searches (shelters, services)
- Homelessness point-in-time count support
- Service delivery optimization by geography

**Ideal Power User Profile:** Program Analyst or Housing Navigator

---

### TIER 4: SUPPORTING ROLE

These departments would benefit from access to AI-GIS tools but are not primary power user candidates:

| Department | Notes |
|------------|-------|
| **Auditor-Controller** | Property tax allocation, but consumes Assessor data |
| **Tax Collector/County Clerk** | Tax sale parcels, but primarily transactional |
| **Recorder** | Document recording by APN, but archival focus |
| **District Attorney** | Case locations occasionally relevant |
| **Probation** | Client addresses, reentry planning |

---

## Implementation Strategy

### Phase 1: Pilot (Months 1-3)
**Target:** Resource Management — Planning Services

- Identify power user (Senior Planner or Planning Tech)
- Deploy Sage or similar tool for permit intake workflow
- Document time savings and error reduction
- Refine prompts and use cases based on real-world feedback

### Phase 2: Expand Core (Months 4-6)
**Target:** Building/Code Enforcement + OES

- Train additional power users
- Develop department-specific prompt libraries
- Integrate with existing notification/reporting workflows
- Establish feedback loop with central GIS team

### Phase 3: Scale (Months 7-12)
**Target:** Assessor, Ag Commissioner, Public Works

- Roll out to Tier 2 departments
- Develop cross-departmental use cases (e.g., disaster response involving OES + Building + H&SS)
- Create self-service training modules in NeoGov LMS
- Measure and report ROI to leadership

### Phase 4: Mature (Year 2+)
- Extend to Tier 3 departments
- Advanced agentic workflows (multi-step automation)
- Integration with enterprise systems (permitting, work orders, case management)
- Power user community of practice

---

## Budget Considerations

### Minimal New Costs
- **Power users are existing staff** with enhanced capabilities (no new FTEs required)
- **AI/agent costs** potentially absorbable within existing DoIT contracts or cloud services
- **Training costs** within existing Employee Development budget (~$950K)

### Potential Funding Sources
- Existing DoIT budget (already deploying Co-Pilot)
- Employee Development training allocation
- Grant funding (ARPA successor programs, state digital equity funds)
- Department-specific grants (SALC for Ag, EMPG for OES)

### ROI Metrics to Track
- Time saved per permit/inspection/case
- Reduction in errors (wrong zoning, missed flood zones)
- Notification list generation time
- Staff satisfaction and adoption rates

---

## Alignment with DoIT Leadership

Timothy P. Flanagan (CIO) has already demonstrated:
1. **AI policy readiness** — Guidelines adopted
2. **AI tool deployment** — Co-Pilot rollout
3. **GIS investment** — Spatial Data Governance Framework, interagency sharing
4. **Training commitment** — GIS training delivered

The power user model extends these investments by:
- Creating demand-side capacity (power users who can consume GIS/AI services)
- Reducing pressure on central DoIT staff
- Demonstrating measurable value for AI investments
- Building organizational AI literacy incrementally

---

## Summary: Power User Deployment Priority

| Priority | Department/Division | Power User Role | First Use Case |
|----------|--------------------|-----------------|--------------------|
| 1 | Resource Mgmt — Planning | Senior Planner | Permit intake automation |
| 2 | Resource Mgmt — Building/Code | Code Enforcement Officer | Complaint triage |
| 3 | Sheriff/OES | OES Coordinator | Evacuation zone queries |
| 4 | Assessor | Senior Appraiser | Comparable sales |
| 5 | Ag Commissioner | Sr. Ag Biologist | Pest treatment tracking |
| 6 | Public Works | Engineering Tech | Encroachment permits |
| 7 | Environmental Health | EH Specialist | Inspection routing |
| 8 | H&SS Employment/Eligibility | Program Analyst | Housing resource search |

---

## Appendix: Budget Source References

All data sourced from **Solano County FY2025-26 Recommended Budget**:

- Department of Information Technology: pp. 267-275
- Employee Development & Training: pp. 234-236
- Resource Management: pp. 392-396
- Sheriff/Coroner & OES: pp. 328-334
- Assessor: pp. 179-180
- Agricultural Commissioner: pp. 387-388
- Public Works: pp. 421-426
- Health & Social Services: pp. 466-475

---

*Document prepared for Solano County GIS/IT strategic planning discussions.*
