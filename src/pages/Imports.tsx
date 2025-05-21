
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileText, AlertTriangle, CheckCircle, Import, FileUp, Truck, Calculator } from "lucide-react";
import ImportDocumentValidator from "@/components/imports/ImportDocumentValidator";
import ImportDutyCalculator from "@/components/imports/ImportDutyCalculator";
import ImportFinanceOptions from "@/components/imports/ImportFinanceOptions";
import ImportShipmentTracker from "@/components/imports/ImportShipmentTracker";
import ImportSupportChat from "@/components/imports/ImportSupportChat";

const Imports = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSupport, setShowSupport] = useState(false);
  const { toast } = useToast();
  
  const handleUploadDocuments = () => {
    setActiveTab("documents");
    toast({
      title: "Upload Documents",
      description: "Upload your import documents for validation"
    });
  };
  
  const handleCalculateDuties = () => {
    setActiveTab("duties");
    toast({
      title: "Duty Calculator",
      description: "Estimate import duties and taxes"
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Import Management</h1>
            <p className="text-muted-foreground">
              Track and manage your imports, documents, and customs clearance
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="bg-white/50"
              onClick={handleCalculateDuties}
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Duties
            </Button>
            <Button 
              className="bg-trade-purple hover:bg-trade-purple-dark"
              onClick={handleUploadDocuments}
            >
              <FileUp className="mr-2 h-4 w-4" />
              Upload Documents
            </Button>
          </div>
        </header>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="glassmorphism mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="shipments">Shipments</TabsTrigger>
            <TabsTrigger value="duties">Duty Calculator</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="glassmorphism hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Active Imports</span>
                    <Badge>4</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { 
                        supplier: "Shanghai Electronics Co.", 
                        status: "Documents Under Review", 
                        alert: "Missing Certificate of Origin"
                      },
                      { 
                        supplier: "Global Components Ltd", 
                        status: "Shipment En Route", 
                        alert: null
                      },
                      { 
                        supplier: "Tech Materials Inc.", 
                        status: "Customs Clearance", 
                        alert: "Pending duty payment"
                      },
                      { 
                        supplier: "Eastern Manufacturers", 
                        status: "Warehouse Processing", 
                        alert: null
                      },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2 p-3 bg-white/10 rounded-lg">
                        <div className="flex justify-between">
                          <span className="font-medium">{item.supplier}</span>
                          <Badge variant="outline" className={item.alert ? "bg-amber-100/50 text-amber-800" : ""}>{item.status}</Badge>
                        </div>
                        {item.alert && (
                          <div className="flex items-center text-xs text-amber-500">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            <span>{item.alert}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glassmorphism hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Document Status</span>
                    <Badge variant="destructive">Action Required</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        <span>Commercial Invoice</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-100/50 text-amber-800">Mismatch with PO</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Packing List</span>
                      </div>
                      <Badge variant="outline" className="bg-green-100/50 text-green-800">Verified</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Bill of Lading</span>
                      </div>
                      <Badge variant="outline" className="bg-green-100/50 text-green-800">Verified</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                        <span>Certificate of Origin</span>
                      </div>
                      <Badge variant="outline" className="bg-red-100/50 text-red-800">Missing</Badge>
                    </div>
                  </div>
                  
                  <Button className="mt-6 w-full" onClick={handleUploadDocuments}>
                    Resolve Document Issues
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="glassmorphism hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Upcoming Arrivals</span>
                    <Truck className="h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2 p-3 bg-white/10 rounded-lg">
                      <div>
                        <span className="font-medium">Shipment #IM78452</span>
                        <div className="text-xs text-muted-foreground">
                          Shanghai Electronics Co.
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span>ETA: May 28, 2025</span>
                        <Badge>Tomorrow</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 p-3 bg-white/10 rounded-lg">
                      <div>
                        <span className="font-medium">Shipment #IM78923</span>
                        <div className="text-xs text-muted-foreground">
                          Global Components Ltd
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span>ETA: June 04, 2025</span>
                        <Badge variant="outline">In 7 Days</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full"
                    onClick={() => setActiveTab("shipments")}
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    Track All Shipments
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>AI Purchase Order Matching</CardTitle>
                <CardDescription>
                  Our AI automatically matches your Purchase Orders with received shipping documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-trade-purple/20 p-2 rounded-full mr-3">
                        <Import className="h-5 w-5 text-trade-purple" />
                      </div>
                      <div>
                        <div className="font-medium">PO #: 2025-0482-SM</div>
                        <div className="text-sm text-muted-foreground">
                          Shanghai Electronics Co. - $45,680
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500">Partial Match</Badge>
                      <Button variant="outline" size="sm" onClick={handleUploadDocuments}>
                        Review
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-trade-purple/20 p-2 rounded-full mr-3">
                        <Import className="h-5 w-5 text-trade-purple" />
                      </div>
                      <div>
                        <div className="font-medium">PO #: 2025-0491-GC</div>
                        <div className="text-sm text-muted-foreground">
                          Global Components Ltd - $23,450
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500">Perfect Match</Badge>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("shipments")}>
                        Track
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50/10 p-4 rounded-lg border border-amber-200/20 mt-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-amber-500">PO Mismatch Alert</div>
                      <p className="text-sm mt-1">
                        The commercial invoice from Shanghai Electronics (INV-SE-28954) shows a quantity 
                        discrepancy with your PO. Received: 450 units, Ordered: 500 units.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2" onClick={handleUploadDocuments}>
                        Resolve Issue
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle className="text-lg">Import Finance Options</CardTitle>
                  <CardDescription>
                    Financial solutions for your import transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                      <div>
                        <div className="font-medium">Buyers Credit</div>
                        <div className="text-xs text-muted-foreground">
                          For PO #: 2025-0482-SM
                        </div>
                      </div>
                      <Badge className="bg-green-500">Available</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                      <div>
                        <div className="font-medium">Import LC</div>
                        <div className="text-xs text-muted-foreground">
                          For new orders over $20,000
                        </div>
                      </div>
                      <Badge className="bg-green-500">Available</Badge>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full"
                    onClick={() => setActiveTab("finance")}
                  >
                    Explore Finance Options
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle className="text-lg">Duty Estimator</CardTitle>
                  <CardDescription>
                    Calculate import duties and taxes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="text-sm text-muted-foreground">Upcoming Payment (May 28)</div>
                      <div className="font-medium">$5,481.60</div>
                    </div>
                    
                    <div className="py-3">
                      <div className="text-xs text-muted-foreground mb-1">Breakdown</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Basic Customs Duty:</div>
                        <div className="text-right">$3,654.40</div>
                        <div>Additional Duty:</div>
                        <div className="text-right">$912.60</div>
                        <div>GST:</div>
                        <div className="text-right">$914.60</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="mt-4 w-full bg-trade-purple hover:bg-trade-purple-dark"
                    onClick={handleCalculateDuties}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Custom Duties
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <ImportDocumentValidator />
          </TabsContent>
          
          <TabsContent value="shipments">
            <ImportShipmentTracker />
          </TabsContent>
          
          <TabsContent value="duties">
            <ImportDutyCalculator />
          </TabsContent>
          
          <TabsContent value="finance">
            <ImportFinanceOptions />
          </TabsContent>
        </Tabs>
      </div>
      
      {showSupport ? (
        <ImportSupportChat onClose={() => setShowSupport(false)} />
      ) : (
        <Button
          onClick={() => setShowSupport(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-gradient-to-r from-trade-purple to-trade-purple-dark shadow-lg"
        >
          <AlertTriangle className="h-6 w-6" />
        </Button>
      )}
    </MainLayout>
  );
};

export default Imports;
