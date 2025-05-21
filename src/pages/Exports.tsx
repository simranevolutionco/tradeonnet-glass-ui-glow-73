
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Truck, AlertCircle, CheckCircle, Clock } from "lucide-react";
import ExportDocumentUpload from "@/components/exports/ExportDocumentUpload";
import ExportTrackingPanel from "@/components/exports/ExportTrackingPanel";
import ExportFinancePanel from "@/components/exports/ExportFinancePanel";
import ExportLCApplication from "@/components/exports/ExportLCApplication";

const Exports = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  const handleStartNewLC = () => {
    setActiveTab("new-lc");
    toast({
      title: "Starting new LC application",
      description: "Please complete all required information"
    });
  };
  
  const handleUploadInvoice = () => {
    setActiveTab("documents");
    toast({
      title: "Upload Invoice",
      description: "Select or drag your invoice files"
    });
  };
  
  const handleTrackShipment = () => {
    setActiveTab("tracking");
    toast({
      title: "Tracking Shipment",
      description: "Viewing latest shipment status"
    });
  };
  
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Export Management</h1>
            <p className="text-muted-foreground">
              Manage your export letters of credit, documents, and shipments
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/50" onClick={handleUploadInvoice}>
              <Upload className="mr-2 h-4 w-4" /> Upload Invoice
            </Button>
            <Button className="bg-trade-purple hover:bg-trade-purple-dark" onClick={handleStartNewLC}>
              <FileText className="mr-2 h-4 w-4" /> Start New LC
            </Button>
          </div>
        </header>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="glassmorphism mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="new-lc">New LC</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glassmorphism hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Active LCs</span>
                    <Badge variant="secondary">3</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "ABC Electronics", status: "Documents Pending", progress: 70 },
                      { name: "XYZ Global", status: "Negotiation", progress: 40 },
                      { name: "MNO Trading", status: "Shipment Pending", progress: 25 },
                    ].map((lc, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{lc.name}</span>
                          <Badge variant={index === 0 ? "destructive" : "outline"}>
                            {lc.status}
                          </Badge>
                        </div>
                        <Progress value={lc.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="link" className="mt-4 w-full">
                    View All Export LCs
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="glassmorphism hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Document Status</span>
                    <Badge variant="destructive">Missing Documents</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Commercial Invoice</span>
                      </div>
                      <Badge variant="outline" className="bg-green-100">Approved</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Bill of Lading</span>
                      </div>
                      <Badge variant="outline" className="bg-green-100">Approved</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>Certificate of Origin</span>
                      </div>
                      <Badge variant="outline" className="bg-yellow-100">Under Review</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                        <span>Packing List</span>
                      </div>
                      <Badge variant="outline" className="bg-red-100">Missing</Badge>
                    </div>
                  </div>
                  
                  <Button className="mt-6 w-full" onClick={handleUploadInvoice}>
                    Upload Missing Documents
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="glassmorphism hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Shipment Tracking</span>
                    <Truck className="h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Latest Shipment:</p>
                    <p className="font-medium">Container #SH45892171</p>
                    <p>Destination: Rotterdam Port</p>
                    <div className="flex items-center mt-3">
                      <div className="w-full">
                        <Progress value={60} className="h-2" />
                        <div className="flex justify-between text-xs mt-1">
                          <span>Shanghai</span>
                          <span>At Sea</span>
                          <span>Rotterdam</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm mt-3">Estimated arrival: June 10, 2025</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full"
                    onClick={handleTrackShipment}
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    Track All Shipments
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-2 p-4 bg-white/20 rounded-md border border-white/30">
                    <AlertCircle className="h-6 w-6 text-amber-500" />
                    <h3 className="font-medium">Missing Documentation</h3>
                    <p className="text-sm">Your LC application for ABC Electronics requires a packing list document. This might delay processing.</p>
                    <Button variant="secondary" size="sm" className="mt-2" onClick={handleUploadInvoice}>Upload Now</Button>
                  </div>
                  
                  <div className="flex-1 space-y-2 p-4 bg-white/20 rounded-md border border-white/30">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <h3 className="font-medium">Export Finance Available</h3>
                    <p className="text-sm">Based on your export history, you qualify for pre-shipment finance up to $250,000.</p>
                    <Button variant="secondary" size="sm" className="mt-2">Check Rates</Button>
                  </div>
                  
                  <div className="flex-1 space-y-2 p-4 bg-white/20 rounded-md border border-white/30">
                    <Clock className="h-6 w-6 text-blue-500" />
                    <h3 className="font-medium">Document Negotiation</h3>
                    <p className="text-sm">XYZ Global LC documents are under negotiation. Estimated completion in 2 business days.</p>
                    <Button variant="secondary" size="sm" className="mt-2">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="new-lc">
            <ExportLCApplication />
          </TabsContent>
          
          <TabsContent value="documents">
            <ExportDocumentUpload />
          </TabsContent>
          
          <TabsContent value="tracking">
            <ExportTrackingPanel />
          </TabsContent>
          
          <TabsContent value="finance">
            <ExportFinancePanel />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Exports;
