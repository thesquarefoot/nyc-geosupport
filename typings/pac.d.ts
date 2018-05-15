type STREET = {
  boro: string;                            // Borough Code
  sc10: string;                            // 10 Digit Street Code
  streetName: string;                      // Street Name
};
type BBL = 
  string | {
    boro: string;                            // Borough
  block: string;                           // Tax Block
  lot: string;                             // Tax Lot
}
;
type UNIT = {
  unitt: string;                           // Output unit type V16.4
  uniti: string;                           // Output unit identifier
};
type INWA1 = {
  funcCode: string;                        // Function Code
  hseNbrDisp: string;                      // House nbr in Disp form
  hseNbrHns: string;                       // House nbr in Sort form
  lohseNbrDisp: string;                    // Lo House nbr in Disp form
  lohseNbrHns: string;                     // Lo House nbr in Sort form
  sti: STREET[];                           // Street Information
  bbli: BBL;                               // Borough-Block-Lot
  
  bldId: string;                           // Building Id Number (BIN)
  compDirection: string;                   // Compass Direction
  compDirection2: string;                  // Compass Direction-Fn 3S
  node: string;                            // Node input for Fn2
  platformInd: string;                     // Must be equal to 'C'
  zipin: string;                           // Input Zip Code
  unit: string;                            // Input unit V16.4
  
  longWaFlag: string;                      // Long Work Area 2 Flag Next 2 fields not impl
  hseNbrJustify: string;                   // Hse Nbr Justification Flg
  hnl: string;                             // Hse Nbr Normalization len
  hseNbrOverFlag: string;                  // Reserved for GSS Use
  snl: string;                             // Street Name Norm Length
  stNameNorm: string;                      // Street Name Normalization Format Flag
  expandedFormat: string;                  // Expanded Format Flag
  roadbedrequest: string;                  // Roadbed Request Switch
  res01: string;                           // Reserved for Internal Use
  segauxSwitch: string;                    // Request Auxiliary Segment Information
  browseFlag: string;                      // Determines if browse displays all or some names
  realStreetOnly: string;                  // Display real streets only
  tpadSwitch: string;                      // TPAD read for PAD process
  modeSwitch: string;                      // Mode Flag X = Extended WA2
  wtoSwitch: string;                       // WTOs Switch N = No WTOs should be issued
  
};
type OUTWA1 = {
  boroName: string;                        // Boro Name of First Street
  hseNbrDisp: string;                      // House nbr in Normalized Display form
  hseNbrHns: string;                       // House number in Sort Form
  sto: STREET[];                           // Street Information
  bblo: BBL;                               // Boro(len=1), Block(len=5) and Lot (len=4)-Normalizd
  
  loHseNbrDisp: string;                    // low Hse nbr - display
  loHseNbrHns: string;                     // low Hse nbr - sort form
  bin: string;                             // Building Id Number
  attrbytes: string;                       // NAP Identification Number
  reasonCode2: string;                     // 2nd Reason Code
  reasonCodeQual2: string;                 // 2nd Reason Code Qualifier
  warnCode2: string;                       // 2nd Warning Return Code
  retCode2: string;                        // 2nd GeoSupport Return Cod
  msg2: string;                            // 2nd GeoSupport Message
  node: string;                            // Node output for Fn 2
  units: UNIT;                             // Output unit Sort V16.4
  unitd: string;                           // Output unit Display V16.4
  
  napIdNbr: string;                        // NAP Id Nbr - Not Impl.
  intUse1: string;                         // Internal Use Only
  reasonCode: string;                      // Reason Code
  reasonCodeQual: string;                  // Reason Code Qualifier
  warnCode: string;                        // Warning Ret. Code-NotImpl
  retCode: string;                         // GeoSupport Return Code
  msg: string;                             // GeoSupport Message
  nbrNames: string;                        // Nbr of Sreet Names
  b7Sc: string[];                          // 10 Boro+7-digit st codes
  stNames: string[];                       // Up to 10 Street Names
};
type C_WA1 = INWA1 & OUTWA1 & {
  input: INWA1;
  output: OUTWA1;
};
type LION = {
  lionBoro: string;                        // LION Borough Code Differs from GeoSupport Borough Codes
  face: string;                            // Face Code
  seq: string;                             // Sequence Number
};
type St_list = {
  nbrSts: string;                          // Number of streets
  b5Sc: string[];                          // Boro+5 Street Code
};
type TPAD_LIST = {
  bin: string;                             // BIN
  status: string;                          // Status of BIN
};
type TPADLST = {
  tpadlist: TPAD_LIST[];                   // or BINs + Status Byte
  fill: string;
};
type ADDR_RANGE = {
  loHseNbr: string;                        // Low House Nbr-Disply form
  hiHseNbr: string;                        // Hi House Nbr-Display form
  b5Sc: string;                            // Boro & 5 digit Str Code
  lgc: string;                             // DCP Preferred Street LGC
  bldId: string;                           // BIN of address range
  sosInd: string;                          // Side of Street Indicator
  adrType: string;                         // Address type - P=NAP, B=NAB, Blank=Normal
  tpadBinStatus: string;                   // Status of Job
  
};
type ADDR_RANGE_1AX = {
  loHseNbr: string;                        // Low House Nbr-Disply form
  hiHseNbr: string;                        // Hi House Nbr-Display form
  b5Sc: string;                            // Boro & 5 digit Str Code
  lgc: string;                             // DCP Preferred Street LGC
  bldId: string;                           // BIN of address range
  sosInd: string;                          // Side of Street Indicator
  adrType: string;                         // Address type (Blank = Normal)
  tpadBinStatus: string;                   // Status of BIN from TPAD
  stName: string;                          // Street Name
  
};
type ADDR_RANGE_AP = {
  loHseNbr: string;                        // Low House Nbr-Disply form
  hiHseNbr: string;                        // Hi House Nbr-Display form
  b5Sc: string;                            // Boro & 5 digit Str Code
  lgc: string;                             // DCP Preferred Street LGC
  bldId: string;                           // BIN of address range
  sosInd: string;                          // Side of Street Indicator
  adrType: string;                         // Address type - V=VANITY Blank=Normal
  
  
};
type ADDR_RANGE_APX = {
  loHseNbr: string;                        // Low House Nbr-Disply form
  hiHseNbr: string;                        // Hi House Nbr-Display form
  b5Sc: string;                            // Boro & 5 digit Str Code
  lgc: string;                             // DCP Preferred Street LGC
  bldId: string;                           // BIN of address range
  sosInd: string;                          // Side of Street Indicator
  adrType: string;                         // Address type - V=VANITY Blank=Normal
  
  stName: string;                          // Street Name
  
};
type SANBORN = {
  sanbornBoro: string;                     // Sanborn Borough Code
  sanbornVol: string;                      // Sanborn Volume
  sanbornPage: string;                     // Sanborn Page
};
type SEGSIDE = {
  comDist: string;                         // Community District
  loHseNbr: string;                        // Low House Nbr-Disply form
  hiHseNbr: string;                        // Hi House Nbr-Display form
  
  iaei: string;                            // Interim Ass'tance Elig Indicator
  zipCode: string;                         // Zip code for Street seg.
  healthArea: string;                      // Health Area
  policeBoroCom: string;                   // Police Patrl Boro Command
  policePre: string;                       // Police Precinct
  fireDivisn: string;                      // Fire Division
  fireBat: string;                         // Fire Battalion
  fireCoType: string;                      // Fire Company Type
  fireCoNbr: string;                       // Fire Company Number
  comSchlDist: string;                     // Community School District
  dynamBlk: string;                        // Atomic Polygon (was Dynamic Block)
  ed: string;                              // ED
  ad: string;                              // AD
  policePatBoro: string;                   // Police Patrol Borough
  
  boro: string;                            // Used for the NTA name
  cenTract90: string;                      // 1990 Census Tract
  cenTract10: string;                      // 2010 Census Tract
  cenBlk10: string;                        // 2010 Census Block
  cenBlk10Sufx: string;                    // 2010 Census Block Suffix 2010 Suffix Not Implement
  cenTract2000: string;                    // 2000 Census Tract
  cenBlk2000: string;                      // 2000 Census Block
  cenBlk2000Sufx: string;                  // 2000 Census Block Suffix
  
  nta: string;                             // Neighborhood Tabulation Area
  
};
type CROSS_STRS = {
  mhRiFlag: string;                        // Marble Hill/Rikers Island Alternative Boro flag
  len: string;                             // Len in ft from prev node
  gapFlag: string;                         // Gap Flag
  nodeNbr: string;                         // Node Number of Intersect
  nbrStreets: string;                      // Nbr streets intersecting
  b7Sc: string[];                          // Lowest B7SC at Intersect is first and 2nd Lowest B7SC is next. Remaining B7SC's in no particular order.
};
type C_WA2_F1 = {
  
  contParityInd: string;                   // Continuous Parity Ind. or Duplicate Address Ind.
  loHseNbr: string;                        // Lo House nbr in Sort form
  hiHseNbr: string;                        // Hi House Nbr in Sort form
  lgc: string;                             // DCP or BOE Preferred LGC
  st: St_list[];                           // 1=Low and 2=High Nbr of cross streets at low house nbr end of st B5SCs of lo end cross st
  key: LION;                               // LION Key - 10 Characters
  sagrFlag: string;                        // Special Address Generated Record flag
  sosInd: string;                          // Side of Street Indicator
  segLen: string;                          // Segment Length in Feet
  coord: string[];                         // 1 = X coordinate, 2 = Y coordinate, 3 = Z coordinate, Not Imp
  iaei: string;                            // Interim Ass'tance Elig Indicator
  mhRiFlag: string;                        // Marble Hill/Rikers Island Alternative Borough flag
  dotSlca: string;                         // DOT St Lght Contractr Are
  comDist: string;                         // Community District Position 0 contains the CD Boro Code & Pos 1 & 2, the district number
  zipCode: string;                         // Zip code for st seg Following seven fields used for Function 1E only
  ed: string;                              // Election District
  ad: string;                              // Assembly District
  spedFlag: string;                        // Split Elect District Flag
  congressDist: string;                    // Congressional District
  stateSenDist: string;                    // State Senatorial District
  civilCourt: string;                      // Civil Court District
  cityCouncil: string;                     // City Council District
  healthCent: string;                      // Health Center Dictr
  healthArea: string;                      // Health Area
  sanitDist: string;                       // Sanitation District
  sanitSubSect: string;                    // Sanit Collect Scheduling Section and Subsection
  sanitRegPickUp: string;                  // Regular Pick up
  sanitRecycle: string;                    // Recycle pick up
  policeBoroCom: string;                   // Police Patrol Boro Commnd
  policePre: string;                       // Police Precinct
  fireDivisn: string;                      // Fire Division
  fireBat: string;                         // Fire Battalion
  fireCoType: string;                      // Fire Company Type
  fireCoNbr: string;                       // Fire Company Number
  fillerScsd: string;                      // Was Split Com School District Flag
  comSchlDist: string;                     // Community School District
  dynamBlk: string;                        // Atomic Polygon (was Dynamic Block)
  policePatBoro: string;                   // Police Patrol Borough
  featureType: string;                     // Feature Type Code
  segmenttypecode: string;                 // Segment Type Code
  alx: string;                             // Segment split by Alley(s) A=Split by Alley(s) X=Cross Streets Modified
  coincidentSegCnt: string;                // Coincident Segment Counter
  
  boroOfCenTract: string;                  // boro of Census Tract used
  cenTract90: string;                      // 1990 Census Tract
  cenTract10: string;                      // 2010 Census Tract
  cenBlk10: string;                        // 2010 Census Block
  cenBlk10Sufx: string;                    // 2010 Census Block Suffix 2010 Suffix Not Implement
  cenTract2000: string;                    // 2000 Census Tract
  cenBlk2000: string;                      // 2000 Census Block
  cenBlk2000Sufx: string;                  // 2000 Census Block Suffix
  nta: string;                             // Neighborhood Tabulation Area
  sanitSnowPriority: string;               // Sanitation Street Snow Priority (P,S,T,V)
  sanitOrgPickUp: string;                  // Organics Pick up
  sanitBulkPickUp: string;                 // Bulk Pick Up V16.4
  hurricaneZone: string;                   // Hurricane Evacuation Zone
  
  trueHns: string;                         // Underlying HNS
  trueB7Sc: string;                        // True Boro 7 Street Code
  segId: string;                           // Segment Identifier
  curvFlag: string;                        // Curve Flag
};
type C_WA2_F1V = C_WA2_F1 & {
  
  intUse: string;                          // valid on street lgcs
  boeLgc: string;                          // BOE LGC Pointer
  segAzm: string;                          // Segment Azimuth
  segOrient: string;                       // Segment Orientation
  segCoord: string;                        // Spatial Coordinates of Segment
  ccCoord: string[];                       // Spatial Coordinates of Center of Curvature
  radius: string;                          // Radius of Circle
  ccSos: string;                           // Center of Curvature Side of Street Flag
  nodeAngles: string[];                    // Angle to FROM & TO Nodes
  nodes: string[];                         // LION Node Numbers of FROM and TO nodes
  lionKey: LION;                           // LION Key for Vanity Addresses
  lionSosInd: string;                      // LION SoS Indicator
  splitLowHn: string;                      // Split Low House Number
  trafficDir: string;                      // Traffic Direction
  turnRestricts: string;                   // Turn restrictions
  curveFraction: string;
  roadwayType: string;                     // Roadway Type
  physicalId: string;
  genericId: string;
  
  
  bikeLane2: string;                       // Bike Lane has 2 bytes numeric value
  
  status: string;
  strWidth: string;
  strWidthIrregular: string;               // Yes or No
  bikeLane: string;
  fcc: string;                             // Federal Classification Cd
  rowType: string;
  lgcsAdditional: string[];                // additional lgcs for on st
};
type C_WA2_F1EX = C_WA2_F1V & {
  
  legacySegid: string;
  fromPreferredLgcs: string[];
  toPreferredLgcs: string[];
  fromAdditionalLgcs: string[];
  toAdditionalLgcs: string[];
  noXStCalcFlg: string;                    // No Cross Street Calculation Flag
  indivSegLen: string;                     // Individual Segment Length Used with Above Flag
  ntaName: string;                         // Neighborhood Tabulation Area Name
  uspsCityName: string;                    // USPS Preferred City Name
  latitude: string;                        // Latitude calc from X-Y
  longitude: string;                       // Longitude calc from X-Y
  segFromNode: string;                     // Segment from node
  segToNode: string;                       // Segment to node
  segFromXyz: string[];                    // XYZ coord (segment from)
  segToXyz: string[];                      // XYZ coord (segment to)
  blockfaceId: string;                     // NEW location V16.1 because of length changed
  nbrTravelLanes: string;                  // nbr of traveling lanes
  nbrParkLanes: string;                    // nbr of parking lanes
  nbrTotalLanes: string;                   // total nbr of lanes
  strWidthMax: string;                     // street width maximum
  
  reasonCode: string;                      // Reason Code
  reasonCodeQual: string;                  // Reason Code Qualifier
  warnCode: string;                        // Warning Return Code
  retCode: string;                         // GeoSupport Return Code
  nbrNamesLo: string;                      // Nbr of St Names Low End
  b7ScLo: string[];                        // 5(Boro+7-digit) st codes
  nbrNamesHi: string;                      // Nbr of St Names High End
  b7ScHi: string[];                        // 5 Boro+7-digit st codes
  stNamesLo: string[];                     // Up to 5 St Names Low End
  stNamesHi: string[];                     // Up to 5 St Names High End
  boeB5Sc: string;                         // BOE Preffered B7SC
  boeLgc: string;                          // BOE Preffered B7SC
  boeStName: string;                       // BOE Preffered Street Name
  
};
type C_WA2_F1AX = {
  
  contParityInd: string;                   // Continuous Parity Ind or Duplicate Address Ind
  loHseNbr: string;                        // Low House Number-Sort Frm
  bbl: BBL;                                // Borough-Block-Lot
  
  rpadScc: string;                         // RPAD Self_Check Code(SCC)
  
  rpadLucc: string;                        // RPAD Land Use Class. Code
  corner: string;                          // Corner Code
  nbrBlds: string;                         // Nbr of buildings on lot
  nbrStr: string;                          // Nbr Street Frontages
  interFlag: string;                       // Interior Lot Flag
  vacantFlag: string;                      // Vacant Lot Flag
  irregFlag: string;                       // Irregularly-Shaped Lot Fl
  mhRiFlag: string;                        // Marble Hill/Rikers Island
  adrRangeOverflow: string;                // Addr Rnge Lst Ovrflow Flg
  strollKey: string;                       // Strolling key Not Implem
  
  resInternalUse: string;                  // Reserved for Internal Use
  bldId: string;                           // Building Ident. Number (BIN) of Input Address of Existing Building, If any
  condoFlag: string;                       // Condominium Flag
  
  condoId: string;                         // RPAD Condo Id Number
  condoUnitId: string;                     // Condo Unit Id Nbr-Not Imp
  condoBillBbl: BBL;                       // Condo Billing BBL
  
  condoScc: string;                        // Self-Check Code
  condoLoBbl: BBL;                         // Low BBL of Condo
  
  condoHiBbl: BBL;                         // High BBL of Condo
  
  
  coOpNbr: string;                         // Co-op Number
  san: SANBORN;                            // Sanborn Information
  businessArea: string;                    // Business Area
  taxMapNbr: string;                       // Tax Map Nbr-Sect and Vol
  
  
  latitude: string;                        // Latitude calc from X-Y
  longitude: string;                       // Longitude calc from X-Y
  coord: string[];                         // 1 = X coordinate-Annotat 2 = Y coordinate-Annotat
  bidId: string;                           // Business Improvement District ID (BID)
  tpadBinStatus: string;                   // Status of Demolition job on Existing BIN of Input Address
  tpadNewBin: string;                      // BIN for New Building
  tpadNewBinStatus: string;                // Status of New Buildng BIN
  tpadConflictFlag: string;                // From TPAD
  
  intUse: string;                          // Internal Use
  reasonCode: string;                      // Reason Code
  reasonCodeQual: string;                  // Reason Code Qualifier
  warnCode: string;                        // Warning Return Code
  retCode: string;                         // GeoSupport Return Code
  
  nbrAddr: string;                         // Nbr of Addr Ranges or Nbr of BINs in List
  addrRange1Ax: ADDR_RANGE_1AX[];
};
type C_WA2_F1B = C_WA2_F1EX & C_WA2_F1AX & {
  
  
};
type C_WA2_F1A = {
  
  contParityInd: string;                   // Continuous Parity Ind or Duplicate Address Ind
  loHseNbr: string;                        // Low House Number-Sort Frm
  bbl: BBL;                                // Borough-Block-Lot
  
  rpadScc: string;                         // RPAD Self_Check Code(SCC)
  
  rpadLucc: string;                        // RPAD Land Use Class. Code
  corner: string;                          // Corner Code
  nbrBlds: string;                         // Nbr of buildings on lot
  nbrStr: string;                          // Nbr Street Frontages
  interFlag: string;                       // Interior Lot Flag
  vacantFlag: string;                      // Vacant Lot Flag
  irregFlag: string;                       // Irregularly-Shaped Lot Fl
  mhRiFlag: string;                        // Marble Hill/Rikers Island
  adrRangeOverflow: string;                // Addr Rnge Lst Ovrflow Flg
  strollKey: string;                       // Strolling key
  
  resInternalUse: string;                  // Reserved for Internal Use
  bldId: string;                           // Building Ident. Number (BIN) of Input Address of Existing Building, If any
  condoFlag: string;                       // Condominium Flag
  
  condoId: string;                         // RPAD Condo Id Number
  condoUnitId: string;                     // Condo Unit Id Nbr-Not Impl
  condoBillBbl: BBL;                       // Condo Billing BBL
  
  condoScc: string;                        // Self-Check Code
  condoLoBbl: BBL;                         // Low BBL of Condo
  
  condoHiBbl: BBL;                         // High BBL of Condo
  
  
  coOpNbr: string;                         // Co-op Number
  san: SANBORN;                            // Sanborn Information
  businessArea: string;                    // Business Area
  taxMapNbr: string;                       // Tax Map Nbr-Sect and Vol
  
  
  latitude: string;                        // Latitude calc from X-Y
  longitude: string;                       // Longitude calc from X-Y
  coord: string[];                         // 1 = X coordinate-Annotat 2 = Y coordinate-Annotat
  bidId: string;                           // Business Improvement Dist District ID (BID)
  tpadBinStatus: string;                   // Existing BIN of Input Addr
  tpadNewBin: string;                      // BIN for New Building job
  tpadNewBinStatus: string;                // Status of New Buildng BIN
  tpadConflictFlag: string;                // From TPAD
  
  intUse: string;                          // Internal Use
  nbrAddr: string;                         // Nbr of Addr Ranges or Nbr of BINs in List
  bar: 
    ADDR_RANGE[] | TPADLST | string[]
;
};
type C_WA2_FAP = {
  
  contParityInd: string;                   // Continuous Parity Ind or Duplicate Address Ind
  loHseNbr: string;                        // Low House Number-Sort Frm
  bbl: BBL;                                // Borough-Block-Lot
  
  filRpadScc: string;                      // filler for func AP
  
  filRpadLucc: string;                     // fillers for func AP
  filCorner: string;                       // fillers for func AP
  nbrBlds: string;                         // Nbr of buildings on lot
  filNbrStr: string;                       // fillers for func AP
  filInterFlag: string;                    // filler for func AP
  filVacantFlag: string;                   // filler for func AP
  filIrregFlag: string;                    // filler for func AP
  filMhRiFlag: string;                     // filler for func AP
  filAdrRangeOverflow: string;             // filler for func AP
  filStrollKey: string;                    // fillers for func AP
  
  resInternalUse: string;                  // Reserved for Internal Use
  bldId: string;                           // Building Ident. Number (BIN) of Input Address of Existing Building,
  condoFlag: string;                       // Condominium Flag
  
  condoId: string;                         // RPAD Condo Id Number
  fillerUnitId: string;                    // Condo Unit Id Nbr-Not Impl
  condoBillBbl: BBL;                       // Condo Billing BBL
  
  filCondoScc: string;                     // filler for func AP
  condoLoBbl: BBL;                         // Low BBL of Condo
  
  condoHiBbl: BBL;                         // High BBL of Condo
  
  
  coOpNbr: string;                         // Co-op Number
  filSanborn: string;                      // fillers for func AP
  filBusinessArea: string;                 // fillers for func AP
  filTaxMapNbr: string;                    // fillers for func AP
  
  
  latitude: string;                        // Latitude calc from X-Y
  longitude: string;                       // Longitude calc from X-Y
  coord: string[];                         // 1 = X coordinate from AP 2 = Y coordinate from AP
  filBidId: string;                        // fillers for func AP
  filTpadBinStatus: string;                // fillers for func AP
  filTpadNewBin: string;                   // fillers for func AP
  filTpadNewBinStatus: string;             // filler for func AP
  filTpadConflictFlag: string;             // filler for func AP
  apId: string;                            // Address Point Id
  intUse: string;                          // Internal Use
  nbrAddr: string;                         // Nbr of Addr = 0001
  bar: 
    ADDR_RANGE_AP[] | string | string[]
;
};
type C_WA2_FAPX = {
  
  contParityInd: string;                   // Continuous Parity Ind or Duplicate Address Ind
  loHseNbr: string;                        // Low House Number-Sort Frm
  bbl: BBL;                                // Borough-Block-Lot
  
  filRpadScc: string;                      // filler for func AP
  
  filRpadLucc: string;                     // fillers for func AP
  filCorner: string;                       // fillers for func AP
  nbrBlds: string;                         // Nbr of buildings on lot
  filNbrStr: string;                       // fillers for func AP
  filInterFlag: string;                    // filler for func AP
  filVacantFlag: string;                   // filler for func AP
  filIrregFlag: string;                    // filler for func AP
  filMhRiFlag: string;                     // filler for func AP
  filAdrRangeOverflow: string;             // filler for func AP
  filStrollKey: string;                    // fillers for func AP
  
  resInternalUse: string;                  // Reserved for Internal Use
  bldId: string;                           // Building Ident. Number (BIN) of Input Address of Existing Building,
  condoFlag: string;                       // Condominium Flag
  
  condoId: string;                         // RPAD Condo Id Number
  fillerUnitId: string;                    // Condo Unit Id Nbr-Not Impl
  condoBillBbl: BBL;                       // Condo Billing BBL
  
  filCondoScc: string;                     // filler for func AP
  condoLoBbl: BBL;                         // Low BBL of Condo
  
  condoHiBbl: BBL;                         // High BBL of Condo
  
  
  coOpNbr: string;                         // Co-op Number
  filSanborn: string;                      // fillers for func AP
  filBusinessArea: string;                 // fillers for func AP
  filTaxMapNbr: string;                    // fillers for func AP
  
  
  latitude: string;                        // Latitude calc from X-Y
  longitude: string;                       // Longitude calc from X-Y
  coord: string[];                         // 1 = X coordinate from AP 2 = Y coordinate from AP
  filBidId: string;                        // fillers for func AP
  filTpadBinStatus: string;                // fillers for func AP
  filTpadNewBin: string;                   // fillers for func AP
  filTpadNewBinStatus: string;             // filler for func AP
  filTpadConflictFlag: string;             // filler for func AP
  apId: string;                            // Address Point Id
  intUse: string;                          // Internal Use
  reasonCode: string;                      // Reason Code
  reasonCodeQual: string;                  // Reason Code Qualifier
  warnCode: string;                        // Warning Return Code
  retCode: string;                         // GeoSupport Return Code
  
  nbrAddr: string;                         // Nbr of Addr = 0001
  addrRangeApx: ADDR_RANGE_APX[];
};
type C_WA2_F2 = {
  
  repCnt: string;                          // Intersection Replication Counter
  lgc: string[];                           // Preferred LGCs
  inter: St_list;                          // Number of Intersecting St B5SCs of Intersection St
  dupComp: string;                         // Duplicate compass Directn
  atomicPolygon: string;                   // Atomic Polygon added V131
  
  lionNodeNbr: string;                     // LION Node Number
  coord: string[];                         // 1 = X coordinate, 2 = Y coordinate, 3 = Z coordinate, Not Imp
  san: SANBORN[];                          // Sanborn Information
  mhRiFlag: string;                        // Marble Hill/Rikers Island
  dotSlca: string;                         // DOT St Lght Contractr Are
  comDist: string;                         // Community District
  zipCode: string;                         // Zip code for st segment
  healthArea: string;                      // Health Area
  policeBoroCom: string;                   // Police Patrol Boro Commnd
  policePre: string;                       // Police Precinct
  fireSector: string;                      // Fire Sector
  fireBat: string;                         // Fire Battalion
  fireCoType: string;                      // Fire Company Type
  fireCoNbr: string;                       // Fire Company Number
  comSchlDist: string;                     // Community School District
  cenTract10: string;                      // 2010 Census Tract
  cenTract90: string;                      // 1990 Census Tract
  levelCodes: string;                      // Level codes
  policePatBoro: string;                   // Police Patrol Borough
  ad: string;                              // Assembly District
  congressDist: string;                    // Congressional District
  stateSenDist: string;                    // State Senatorial District
  civilCourt: string;                      // Civil Court District
  cityCouncil: string;                     // City Council District
  cdEligible: string;                      // CD Eligibility
  dupIntersectDistance: string;            // Distance in Feet Betwn Duplicate Intersects not implemented
  cenTract2000: string;                    // 2000 Census Tract
  healthCenDist: string;                   // Health Cent Distr
  sanitDist: string;                       // Sanitation District
  sanitSubSect: string;                    // Sanit Collect Scheduling Section and Subsection
  
};
type C_WA2_F2W = C_WA2_F2 & {
  
  
  lgcsFirstIntersct: string[];             // Up to 4 LGC's for 1st intersecting street;
  lgcsSecondIntersct: string[];            // Up to 4 LGC's for 2nd intersecting street;
  turnRestricts: string;                   // Up to 10 Turn restrictns
  prefLgcList: string[];                   // Preferd LGCs for Str list
  trueRepCnt: string;                      // True Int Replication Cntr
  dupNodeList: string[];                   // 140 *Node list for dup str code
  b7ScList: string;                        // 3200 *B7SC lists for Node list
  reasonCode: string;                      // Reason Code
  reasonCodeQual: string;                  // future use
  warnCode: string;                        // Warning Return Code
  retCode: string;                         // GeoSupport Return Code
  latitude: string;                        // Latitude calc from X-Y
  longitude: string;                       // Longitude calc from X-Y
  
};
type C_WA2_F3 = {
  
  dupKeyFlag: string;                      // Duplicate Key Flag or Continuous Parity Flag
  locStatSeg: string;                      // Locational Status of Seg
  cntyBndInd: string;                      // County Boundary Indicat
  lgc: string[];                           // Preferred LGCs
  st: St_list[];                           // 1=Low and 2=High Nbr of cross sts at low house nbr end of street B5SCs of lo end X sts
  xStreetReversalFlag: string;             // X St Reversal Flag
  key: LION;                               // LION Key
  genrFlag: string;                        // Generated Record Flag
  segLen: string;                          // Segment Length in Feet
  segAzm: string;                          // Segment Azimuth
  segOrient: string;                       // Segment Orientation
  mhRiFlag: string;                        // Marble Hill/Rikers Island Alternative Boro flag
  fromNode: string;                        // From node
  toNode: string;                          // To node
  sanitSnowPriority: string;               // Sanitation Street Snow Priority (P,S,T,V)
  
  segId: string;                           // Segment Identifier
  dotSlca: string;                         // DOT St Lght Contractr Are
  curveFlag: string;                       // Curve Flag
  dogLeg: string;                          // Dog leg flag
  featureType: string;                     // Feature Type Code
  segmenttypecode: string;                 // Segment Type Code
  coincidentSegCnt: string;                // Coincident Segment Counter
  
  side: SEGSIDE[];                         // 1 = Left Side of street 2 = Right Side of street
};
type C_WA2_F3_AUXSEG = C_WA2_F3 & {
  
  
  segCnt: string;                          // Number of Segments
  segments: string[];                      // Segment Ids
};
type C_WA2_F3X = C_WA2_F3 & {
  
  lgcList: string[];                       // List of LGC's
  fromLgcs: string[];                      // List of from LGC's
  toLgcs: string[];                        // List of to LGC's
  leftHcd: string;                         // Left Health Center District
  rightHcd: string;                        // Right Health Center District
  fillerCsd: string;
  trafficDir: string;                      // Traffic Direction
  roadwayType: string;
  physicalId: string;
  genericId: string;
  
  
  streetStatus: string;
  strWidth: string;                        // Street Width
  strWidthIrr: string;                     // Irregular Width Y or N
  bikeLane: string;
  fcc: string;                             // Federal Classification Cd
  rowType: string;
  lgc5: string;
  lgc6: string;
  lgc7: string;
  lgc8: string;
  lgc9: string;
  legacyId: string;
  ntaNameLeft: string;                     // Neighborhood Tabulation Area Name (Left)
  ntaNameRight: string;                    // Neighborhood Tabulation Area Name (Right)
  fromCoord: string[];                     // 1 = X Coordinate 2 = Y Coordinate
  toCoord: string[];                       // 1 = X Coordinate 2 = Y Coordinate
  fromLatitude: string;                    // Latitude of from intersct.
  fromLongitude: string;                   // Longitude of from intersct
  toLatitude: string;                      // Latitude of to intersect.
  toLongitude: string;                     // Longitude of to intersect.
  leftBlockfaceId: string;                 // NEW location of blockface id
  rightBlockfaceId: string;
  nbrTravelLanes: string;                  // nbr of traveling lanes
  nbrParkLanes: string;                    // nbr of parking lanes
  nbrTotalLanes: string;                   // total nbr of lanes
  bikeLane2: string;                       // Bike Lane has 2 bytes numeric value
  strWidthMax: string;                     // street width maximum
  
};
type C_WA2_F3X_AUXSEG = C_WA2_F3X & {
  
  
  segCnt: string;                          // Number of Segments
  segments: string[];                      // Segment Ids
};
type C_WA2_F3C = {
  
  dupKeyFlag: string;                      // Duplicate Key Flag or Continuous Parity Flag
  locStatSeg: string;                      // Locational Status of Seg
  cntyBndInd: string;                      // County Boundary Indicat
  lgc: string[];                           // Preferred LGCs
  st: St_list[];                           // 1=Low and 2=High Nbr of cross sts at low house nbr end of street B5SCs of lo end Cross sts
  xStreetReversalFlag: string;             // X St Reversal Flag
  key: LION;                               // LION key
  genrFlag: string;                        // Generated Record Flag
  segLen: string;                          // Segment Length in Feet
  segAzm: string;                          // Segment Azimuth
  segOrient: string;                       // Segment Orientation
  mhRiFlag: string;                        // Marble Hill/Rikers Island Alternative Boro flag
  fromNode: string;                        // From node
  toNode: string;                          // To Node
  sanitSnowPriority: string;               // Sanitation Street Snow Priority (P,S,T,V)
  
  segId: string;                           // Segment Identifier
  dotSlca: string;                         // DOT St Lght Contractr Are
  sosInd: string;                          // Side of Street Indicator
  curveFlag: string;                       // Curve Flag
  featureType: string;                     // Feature Type Code
  segmenttypecode: string;                 // Segment Type Code
  coincidentSegCnt: string;                // Coincident Segment Counter
  
  req: SEGSIDE;                            // Geographic Information for
};
type C_WA2_F3C_AUXSEG = C_WA2_F3C & {
  
  
  segCnt: string;                          // Number of Segments
  segments: string[];                      // Segment ids
};
type C_WA2_F3CX = C_WA2_F3C & {
  
  lgcList: string[];                       // List of LGC's
  fromLgcs: string[];                      // List of from LGC's
  toLgcs: string[];                        // List of to LGC's
  leftHcd: string;                         // Left Health Center Distr
  rightHcd: string;                        // Right Health Center Distr
  fillCsd: string;                         // Filler
  trafficDir: string;                      // Traffic Direction
  roadwayType: string;
  physicalId: string;
  genericId: string;
  
  
  streetStatus: string;
  strWidth: string;                        // Street Width
  strWidthIrr: string;                     // Irregular Width Y or N
  bikeLane: string;
  fcc: string;                             // Federal Classification Cd
  rowType: string;
  lgc5: string;
  lgc6: string;
  lgc7: string;
  lgc8: string;
  lgc9: string;
  legacyId: string;
  ntaName: string;                         // Neighborhood Tabulation Area Name
  fromCoord: string[];                     // 1 = X Coordinate 2 = Y Coordinate
  toCoord: string[];                       // 1 = X Coordinate 2 = Y Coordinate
  fromLatitude: string;                    // Latitude of from intersct.
  fromLongitude: string;                   // Longitude of from intersct
  toLatitude: string;                      // Latitude of to intersct.
  toLongitude: string;                     // Longitude of to intersct.
  blockfaceId: string;                     // NEW location of this field because of length changed
  nbrTravelLanes: string;                  // nbr of traveling lanes
  nbrParkLanes: string;                    // nbr of parking lanes
  nbrTotalLanes: string;                   // total nbr of lanes
  bikeLane2: string;                       // Bike Lane has 2 bytes numeric value
  strWidthMax: string;                     // street width maximum
  
};
type C_WA2_F3CX_AUXSEG = C_WA2_F3CX & {
  
  
  segCnt: string;                          // Number of Segments
  segments: string[];                      // Segment Ids
};
type C_WA2_F3S = {
  
  nbrXStr: string;                         // Nbr of Cross sts in list
  crossStrs: CROSS_STRS[];                 // Cross Street structure
};
