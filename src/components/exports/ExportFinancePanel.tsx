
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ChartBar, DollarSign, Calendar, CreditCard, CheckCircle } from "lucide-react";

const ExportFinancePanel = () => {
  return (
    <div className="space-y-6">
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>Export Finance Eligibility</CardTitle>
          <CardDescription>
            Based on your export history and credit profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground">Available Credit Line</div>
              <div className="font-semibold text-2xl">$350,000</div>
              <Progress value={75} className="h-1 mt-2" />
              <div className="flex justify-between text-xs mt-1">
                <span>Utilized: $112,500</span>
                <span>Available: $237,500</span>
              </div>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground">Interest Rate Range</div>
              <div className="font-semibold text-2xl">4.2% - 5.8%</div>
              <div className="text-xs mt-2">
                Based on your current risk profile
              </div>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground">Credit Score</div>
              <div className="font-semibold text-2xl">A-</div>
              <Progress value={85} className="h-1 mt-2 bg-white/20" />
              <div className="text-xs mt-1">
                Score updated on May 12, 2025
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="pre-shipment">
            <TabsList className="glassmorphism w-full">
              <TabsTrigger value="pre-shipment" className="flex-1">
                Pre-Shipment Finance
              </TabsTrigger>
              <TabsTrigger value="post-shipment" className="flex-1">
                Post-Shipment Finance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pre-shipment" className="mt-4 space-y-4">
              <div className="bg-trade-purple/10 p-4 rounded-lg border border-trade-purple/20">
                <div className="flex items-start">
                  <ChartBar className="h-5 w-5 text-trade-purple mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium text-trade-purple">AI Recommendation</div>
                    <p className="text-sm mt-1">
                      Based on your current LC for ABC Electronics, you qualify for pre-shipment finance 
                      up to $125,000 to cover manufacturing and packaging costs.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Packing Credit Loan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Amount</span>
                      <span className="font-medium">$125,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interest Rate</span>
                      <span className="font-medium">4.75% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span className="font-medium">0.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tenure</span>
                      <span className="font-medium">90 days</span>
                    </div>
                    <Separator />
                    <Button className="w-full">Apply Now</Button>
                    <div className="text-xs text-center text-muted-foreground">
                      Estimated approval: 2 business days
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Advance Against LC</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Amount</span>
                      <span className="font-medium">$100,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interest Rate</span>
                      <span className="font-medium">4.2% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span className="font-medium">0.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tenure</span>
                      <span className="font-medium">LC validity</span>
                    </div>
                    <Separator />
                    <Button variant="outline" className="w-full">Apply Now</Button>
                    <div className="text-xs text-center text-muted-foreground">
                      Estimated approval: 3 business days
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Document Checklist for Pre-Shipment Finance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">LC Copy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Purchase Order</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Proforma Invoice</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Export Order</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Manufacturing Plan</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Cost Estimation</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="post-shipment" className="mt-4 space-y-4">
              <div className="bg-trade-purple/10 p-4 rounded-lg border border-trade-purple/20">
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-trade-purple mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium text-trade-purple">AI Recommendation</div>
                    <p className="text-sm mt-1">
                      Once your goods are shipped, consider post-shipment finance to bridge the payment gap. 
                      Based on your export history, you qualify for export bill discounting at competitive rates.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Export Bill Discounting</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Amount</span>
                      <span className="font-medium">$125,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discounting Rate</span>
                      <span className="font-medium">LIBOR + 2.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span className="font-medium">0.25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tenure</span>
                      <span className="font-medium">Up to 180 days</span>
                    </div>
                    <Separator />
                    <Button className="w-full" disabled>Available After Shipment</Button>
                    <div className="text-xs text-center text-muted-foreground">
                      Upload shipping documents to proceed
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Export Bills for Collection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Amount</span>
                      <span className="font-medium">100% of invoice</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Collection Fee</span>
                      <span className="font-medium">0.15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Courier Fee</span>
                      <span className="font-medium">$50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Time</span>
                      <span className="font-medium">2-3 business days</span>
                    </div>
                    <Separator />
                    <Button variant="outline" className="w-full" disabled>Available After Shipment</Button>
                    <div className="text-xs text-center text-muted-foreground">
                      Upload shipping documents to proceed
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Document Checklist for Post-Shipment Finance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Commercial Invoice</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Bill of Lading/AWB</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Packing List</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Certificate of Origin</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Insurance Document</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Shipping Bill</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Repayment Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Loan Amount</div>
                <div className="font-medium">$100,000</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Interest Rate</div>
                <div className="font-medium">4.75% p.a.</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Tenure</div>
                <div className="font-medium">90 days</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Interest</div>
                <div className="font-medium">$1,187.50</div>
              </div>
            </div>
            
            <div className="bg-white/10 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <div className="text-sm font-medium">Repayment Date</div>
                </div>
                <div>August 19, 2025</div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <div className="text-sm font-medium">Repayment Amount</div>
                </div>
                <div className="font-medium">$101,187.50</div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              Adjust Calculation
            </Button>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Recent Finance Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                <div>
                  <div className="font-medium">Export Bill Discounting</div>
                  <div className="text-xs text-muted-foreground">
                    XYZ Global GmbH - April 12, 2025
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Repaid
                </Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                <div>
                  <div className="font-medium">Packing Credit</div>
                  <div className="text-xs text-muted-foreground">
                    MNO Traders Ltd - March 5, 2025
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Repaid
                </Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                <div>
                  <div className="font-medium">Advance Against LC</div>
                  <div className="text-xs text-muted-foreground">
                    PQR Electronics - February 18, 2025
                  </div>
                </div>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  Active
                </Badge>
              </div>
            </div>
            
            <Button variant="link" className="w-full mt-4">
              View All Finance History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExportFinancePanel;
