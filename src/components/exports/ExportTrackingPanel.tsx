import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, Package, Anchor, Ship, MapPin, Calendar, Clock } from "lucide-react";
import { AlertTriangle } from "lucide-react";

const ExportTrackingPanel = () => {
  return (
    <div className="space-y-6">
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              <span>Shipment Tracking</span>
            </div>
            <Badge className="bg-blue-500">In Transit</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-xs text-muted-foreground">Shipment ID</div>
                <div className="font-medium">SH45892171</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-xs text-muted-foreground">Vessel</div>
                <div className="font-medium">MS Pacific Voyager</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-xs text-muted-foreground">Container</div>
                <div className="font-medium">MSCU7592413</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2 z-0"></div>
              <div className="relative z-10 flex justify-between">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mb-2">
                    <Package className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-xs font-medium">Departed</div>
                  <div className="text-xs text-muted-foreground">May 15</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mb-2">
                    <Anchor className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-xs font-medium">Cleared Customs</div>
                  <div className="text-xs text-muted-foreground">May 17</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mb-2 animate-pulse">
                    <Ship className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-xs font-medium">At Sea</div>
                  <div className="text-xs text-muted-foreground">Current</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-2">
                    <Anchor className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-medium">Port Arrival</div>
                  <div className="text-xs text-muted-foreground">Jun 8</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-2">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-medium">Delivered</div>
                  <div className="text-xs text-muted-foreground">Jun 10</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg space-y-2">
              <div className="text-sm font-medium">Shipment Timeline</div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-800 p-1 rounded-full">
                    <Package className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="font-medium">Departed Shanghai Port</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> May 15, 2025
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Container loaded and cleared for international shipping
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-800 p-1 rounded-full">
                    <Anchor className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="font-medium">Customs Clearance Completed</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> May 17, 2025
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Export documentation verified and approved by customs
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-800 p-1 rounded-full">
                    <Ship className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="font-medium">In Transit - Pacific Ocean</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> Current
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Vessel MS Pacific Voyager en route to Rotterdam
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="document-status">
        <TabsList className="glassmorphism">
          <TabsTrigger value="document-status">Document Status</TabsTrigger>
          <TabsTrigger value="shipment-details">Shipment Details</TabsTrigger>
          <TabsTrigger value="lc-requirements">LC Requirements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="document-status" className="mt-4">
          <Card className="glassmorphism">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <Package className="h-4 w-4 text-green-800" />
                    </div>
                    <div>
                      <div className="font-medium">Commercial Invoice</div>
                      <div className="text-xs text-muted-foreground">
                        Uploaded on May 10, 2025
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Accepted
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <Package className="h-4 w-4 text-green-800" />
                    </div>
                    <div>
                      <div className="font-medium">Bill of Lading</div>
                      <div className="text-xs text-muted-foreground">
                        Uploaded on May 12, 2025
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Accepted
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-1 rounded-full">
                      <Package className="h-4 w-4 text-amber-800" />
                    </div>
                    <div>
                      <div className="font-medium">Certificate of Origin</div>
                      <div className="text-xs text-muted-foreground">
                        Uploaded on May 14, 2025
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800">
                    Under Review
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-1 rounded-full">
                      <Package className="h-4 w-4 text-red-800" />
                    </div>
                    <div>
                      <div className="font-medium">Packing List</div>
                      <div className="text-xs text-red-400">
                        Required for document negotiation
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-red-100 text-red-800">
                    Missing
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipment-details" className="mt-4">
          <Card className="glassmorphism">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Shipper</div>
                    <div className="font-medium">YourCompany Ltd.</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Origin</div>
                    <div className="font-medium">Shanghai, China</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Vessel</div>
                    <div className="font-medium">MS Pacific Voyager</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Departure Date</div>
                    <div className="font-medium">May 15, 2025</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Consignee</div>
                    <div className="font-medium">ABC Electronics GmbH</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Destination</div>
                    <div className="font-medium">Rotterdam, Netherlands</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Container Number</div>
                    <div className="font-medium">MSCU7592413</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Estimated Arrival</div>
                    <div className="font-medium">June 10, 2025</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="text-sm font-medium mb-2">Cargo Details</div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Description</div>
                      <div className="font-medium">Electronic Components</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">HS Code</div>
                      <div className="font-medium">8541.40</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Gross Weight</div>
                      <div className="font-medium">5,250 kg</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Volume</div>
                      <div className="font-medium">24 CBM</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Packages</div>
                      <div className="font-medium">125 Cartons</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lc-requirements" className="mt-4">
          <Card className="glassmorphism">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-sm">
                  The following documents are required as per the Letter of Credit terms:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <Package className="h-3 w-3 text-green-800" />
                    </div>
                    <div>
                      <div className="font-medium">Commercial Invoice - 3 originals, 3 copies</div>
                      <div className="text-xs text-muted-foreground">
                        Must include full description of goods, unit prices and total amount
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <Package className="h-3 w-3 text-green-800" />
                    </div>
                    <div>
                      <div className="font-medium">Bill of Lading - Full set of originals</div>
                      <div className="text-xs text-muted-foreground">
                        Clean on board, marked "freight prepaid" and notify party as per LC
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-amber-100 p-1 rounded-full mt-0.5">
                      <Package className="h-3 w-3 text-amber-800" />
                    </div>
                    <div>
                      <div className="font-medium">Certificate of Origin - 1 original, 2 copies</div>
                      <div className="text-xs text-muted-foreground">
                        Issued by Chamber of Commerce, showing goods originating from China
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-red-100 p-1 rounded-full mt-0.5">
                      <Package className="h-3 w-3 text-red-800" />
                    </div>
                    <div>
                      <div className="font-medium">Packing List - 1 original, 2 copies</div>
                      <div className="text-xs text-muted-foreground">
                        Detailed packing specifications including weights and dimensions
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50/20 p-4 rounded-lg border border-amber-200/20 mt-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-amber-500">AI Alert: Document Discrepancy Risk</div>
                      <p className="text-sm mt-1">
                        The Certificate of Origin is still under review due to a potential discrepancy in the product description. 
                        This might delay document negotiation if not resolved promptly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportTrackingPanel;
