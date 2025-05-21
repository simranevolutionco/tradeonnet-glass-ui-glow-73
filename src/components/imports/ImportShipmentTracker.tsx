
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Truck, Ship, Calendar, Clock, Package, Anchor, MapPin, Search, AlertCircle, FileText } from "lucide-react";

const ImportShipmentTracker = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glassmorphism lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <span>Active Shipments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Input placeholder="Search shipments..." className="pr-8 w-60" />
                  <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                <Button size="sm">
                  Add Shipment
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              Track your import shipments in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="in-transit">
              <TabsList className="glassmorphism w-full">
                <TabsTrigger value="in-transit" className="flex-1">
                  In Transit (2)
                </TabsTrigger>
                <TabsTrigger value="customs" className="flex-1">
                  In Customs (1)
                </TabsTrigger>
                <TabsTrigger value="delivered" className="flex-1">
                  Delivered (3)
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="in-transit" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between flex-wrap gap-4">
                      <div className="flex-1 min-w-[250px]">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
                            <Ship className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">Shanghai Electronics Co.</div>
                            <div className="text-sm text-muted-foreground">
                              Shipment #IM78452
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mt-4">
                          <div>
                            <div className="text-xs text-muted-foreground">Origin</div>
                            <div className="text-sm">Shanghai, China</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Destination</div>
                            <div className="text-sm">Rotterdam, Netherlands</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">ETA</div>
                            <div className="text-sm">May 28, 2025</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-between items-end">
                        <Badge className="bg-blue-500">At Sea</Badge>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            Documents
                          </Button>
                          <Button size="sm">
                            <Truck className="h-3.5 w-3.5 mr-1" />
                            Track
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between flex-wrap gap-4">
                      <div className="flex-1 min-w-[250px]">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
                            <Ship className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">Global Components Ltd</div>
                            <div className="text-sm text-muted-foreground">
                              Shipment #IM78923
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mt-4">
                          <div>
                            <div className="text-xs text-muted-foreground">Origin</div>
                            <div className="text-sm">Tokyo, Japan</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Destination</div>
                            <div className="text-sm">Hamburg, Germany</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">ETA</div>
                            <div className="text-sm">June 04, 2025</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-between items-end">
                        <Badge className="bg-indigo-500">Departed Port</Badge>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            Documents
                          </Button>
                          <Button size="sm">
                            <Truck className="h-3.5 w-3.5 mr-1" />
                            Track
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="customs" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between flex-wrap gap-4">
                      <div className="flex-1 min-w-[250px]">
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-100 text-amber-800 p-2 rounded-full">
                            <Package className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">Tech Materials Inc.</div>
                            <div className="text-sm text-muted-foreground">
                              Shipment #IM77845
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mt-4">
                          <div>
                            <div className="text-xs text-muted-foreground">Origin</div>
                            <div className="text-sm">Seoul, South Korea</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Arrived</div>
                            <div className="text-sm">May 21, 2025</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Status</div>
                            <div className="text-sm text-amber-500">Duty Payment Pending</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-between items-end">
                        <Badge className="bg-amber-500">Customs Clearance</Badge>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            <AlertCircle className="h-3.5 w-3.5 mr-1" />
                            Resolve
                          </Button>
                          <Button size="sm">
                            <Package className="h-3.5 w-3.5 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="delivered" className="mt-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex justify-between flex-wrap gap-4">
                          <div className="flex-1 min-w-[250px]">
                            <div className="flex items-center gap-3">
                              <div className="bg-green-100 text-green-800 p-2 rounded-full">
                                <Package className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="font-medium">{
                                  i === 1 ? "Eastern Manufacturers" :
                                  i === 2 ? "Precision Tools Co." :
                                  "Quantum Supplies Ltd"
                                }</div>
                                <div className="text-sm text-muted-foreground">
                                  Shipment #{
                                    i === 1 ? "IM77542" :
                                    i === 2 ? "IM77231" :
                                    "IM76998"
                                  }
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 mt-4">
                              <div>
                                <div className="text-xs text-muted-foreground">Origin</div>
                                <div className="text-sm">{
                                  i === 1 ? "Guangzhou, China" :
                                  i === 2 ? "Munich, Germany" :
                                  "Taipei, Taiwan"
                                }</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Delivered</div>
                                <div className="text-sm">{
                                  i === 1 ? "May 18, 2025" :
                                  i === 2 ? "May 12, 2025" :
                                  "May 05, 2025"
                                }</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col justify-between items-end">
                            <Badge className="bg-green-500">Delivered</Badge>
                            <Button variant="outline" size="sm" className="mt-4">
                              <FileText className="h-3.5 w-3.5 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Detailed Tracking</CardTitle>
            <CardDescription>
              Real-time tracking information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="text-sm font-medium mb-2">Shipment Information</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tracking #</span>
                    <span className="font-medium">IM78452</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carrier</span>
                    <span className="font-medium">Ocean Line Express</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vessel</span>
                    <span className="font-medium">MS Eastern Star</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Container</span>
                    <span className="font-medium">OLEU1452786</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Route Information</div>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-5 border-l-2 border-dashed border-gray-300"></div>
                  <div className="space-y-6 relative">
                    <div className="flex">
                      <div className="w-10">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <MapPin className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Departed</div>
                        <div className="text-sm">Shanghai Port, China</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> May 15, 2025
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                          <Ship className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">In Transit</div>
                        <div className="text-sm">Pacific Ocean</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> Current Location
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10">
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                          <Anchor className="h-3 w-3 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">Port Arrival</div>
                        <div className="text-sm">Rotterdam, Netherlands</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> Expected: May 28, 2025
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10">
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                          <Package className="h-3 w-3 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">Customs Clearance</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> Expected: May 29-30, 2025
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10">
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                          <Truck className="h-3 w-3 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">Final Delivery</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> Expected: June 1, 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50/10 p-3 rounded-lg border border-amber-200/20">
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                  <div className="text-sm">
                    <span className="font-medium">Weather Alert:</span> Typhoon warning in the 
                    Pacific may cause slight delay. Monitoring situation.
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Set Delivery Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>Shipment Documents</CardTitle>
          <CardDescription>
            Required documents for shipment #IM78452
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 bg-white/10 rounded-lg flex justify-between">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-green-500" />
                <div>
                  <div className="font-medium">Commercial Invoice</div>
                  <div className="text-xs text-muted-foreground">Uploaded May 14</div>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100/50 text-green-800">
                Valid
              </Badge>
            </div>
            
            <div className="p-3 bg-white/10 rounded-lg flex justify-between">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-green-500" />
                <div>
                  <div className="font-medium">Packing List</div>
                  <div className="text-xs text-muted-foreground">Uploaded May 14</div>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100/50 text-green-800">
                Valid
              </Badge>
            </div>
            
            <div className="p-3 bg-white/10 rounded-lg flex justify-between">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-amber-500" />
                <div>
                  <div className="font-medium">Bill of Lading</div>
                  <div className="text-xs text-muted-foreground">Uploaded May 14</div>
                </div>
              </div>
              <Badge variant="outline" className="bg-amber-100/50 text-amber-800">
                Pending
              </Badge>
            </div>
            
            <div className="p-3 bg-white/10 rounded-lg flex justify-between">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-green-500" />
                <div>
                  <div className="font-medium">Certificate of Origin</div>
                  <div className="text-xs text-muted-foreground">Uploaded May 14</div>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100/50 text-green-800">
                Valid
              </Badge>
            </div>
            
            <div className="p-3 bg-white/10 rounded-lg flex justify-between">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-red-500" />
                <div>
                  <div className="font-medium">Import License</div>
                  <div className="text-xs text-muted-foreground">Required for customs</div>
                </div>
              </div>
              <Badge variant="outline" className="bg-red-100/50 text-red-800">
                Missing
              </Badge>
            </div>
            
            <div className="p-3 bg-white/10 rounded-lg flex justify-between">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-amber-500" />
                <div>
                  <div className="font-medium">Insurance Certificate</div>
                  <div className="text-xs text-muted-foreground">Expires May 30</div>
                </div>
              </div>
              <Badge variant="outline" className="bg-amber-100/50 text-amber-800">
                Update Soon
              </Badge>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button variant="outline" className="mr-2">
              Download All
            </Button>
            <Button>
              Upload Missing Documents
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportShipmentTracker;
