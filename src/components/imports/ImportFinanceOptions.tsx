
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, CreditCard, Building, Clock, Check, Shield, AlertCircle } from "lucide-react";

const ImportFinanceOptions = () => {
  return (
    <div className="space-y-6">
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>Import Finance Options</CardTitle>
          <CardDescription>
            Financial solutions to support your import business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="letter-of-credit">
            <TabsList className="glassmorphism w-full">
              <TabsTrigger value="letter-of-credit">Letter of Credit</TabsTrigger>
              <TabsTrigger value="buyers-credit">Buyer's Credit</TabsTrigger>
              <TabsTrigger value="import-finance">Import Finance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="letter-of-credit" className="mt-6 space-y-6">
              <div className="bg-trade-purple/10 p-4 rounded-lg border border-trade-purple/20">
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-trade-purple mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium text-trade-purple">What is a Letter of Credit?</div>
                    <p className="text-sm mt-1">
                      A Letter of Credit (LC) is a financial instrument issued by a bank that guarantees payment to the seller 
                      upon presentation of specified documents that comply with the terms and conditions of the LC.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Sight LC</CardTitle>
                    <CardDescription>Payment at document presentation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Opening Fee</span>
                      <span className="font-medium">0.75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amendment Fee</span>
                      <span className="font-medium">$100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Time</span>
                      <span className="font-medium">1-2 business days</span>
                    </div>
                    <div className="space-y-1 pt-2">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Immediate payment to seller</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Document verification</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full">Apply Now</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">Usance LC</CardTitle>
                      <Badge className="bg-green-500">Recommended</Badge>
                    </div>
                    <CardDescription>Deferred payment option</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Opening Fee</span>
                      <span className="font-medium">0.85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amendment Fee</span>
                      <span className="font-medium">$100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Time</span>
                      <span className="font-medium">1-2 business days</span>
                    </div>
                    <div className="space-y-1 pt-2">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Payment after 30/60/90 days</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Improved cash flow management</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full bg-trade-purple hover:bg-trade-purple-dark">Apply Now</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Standby LC</CardTitle>
                    <CardDescription>Security backup arrangement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Opening Fee</span>
                      <span className="font-medium">1.0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amendment Fee</span>
                      <span className="font-medium">$150</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Time</span>
                      <span className="font-medium">2-3 business days</span>
                    </div>
                    <div className="space-y-1 pt-2">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Payment security backup</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Only used if regular payment fails</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full" variant="outline">Apply Now</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-green-500 mr-2" />
                      <span className="font-medium">Payment Security</span>
                    </div>
                    <p className="text-sm">LC provides payment security to the seller and goods security to the buyer</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="font-medium">Document Verification</span>
                    </div>
                    <p className="text-sm">Bank verifies all documents to ensure compliance with trade terms</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-green-500 mr-2" />
                      <span className="font-medium">Flexible Payment Terms</span>
                    </div>
                    <p className="text-sm">Options for immediate or deferred payment to match your cash flow needs</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="buyers-credit" className="mt-6 space-y-6">
              <div className="bg-trade-purple/10 p-4 rounded-lg border border-trade-purple/20">
                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 text-trade-purple mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium text-trade-purple">What is Buyer's Credit?</div>
                    <p className="text-sm mt-1">
                      Buyer's Credit is a medium-term financial arrangement where a bank or financial institution in the exporter's 
                      country extends a loan directly to the importer to pay for the goods or services.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>First Global Bank</CardTitle>
                    <CardDescription>Buyer's Credit Program</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Interest Rate</div>
                        <div className="font-medium">LIBOR + 2.75%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Tenor</div>
                        <div className="font-medium">Up to 3 years</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Processing Fee</div>
                        <div className="font-medium">0.75%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Min. Transaction</div>
                        <div className="font-medium">$100,000</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Low interest rates</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Extended repayment periods</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Dedicated relationship manager</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-trade-purple hover:bg-trade-purple-dark">Request Terms</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Eastern Export Bank</CardTitle>
                    <CardDescription>Importer Financing Program</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Interest Rate</div>
                        <div className="font-medium">LIBOR + 2.5%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Tenor</div>
                        <div className="font-medium">Up to 5 years</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Processing Fee</div>
                        <div className="font-medium">1.0%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Min. Transaction</div>
                        <div className="font-medium">$250,000</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Competitive interest rates</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Longer tenor options</span>
                      </div>
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        <span className="text-sm">Higher minimum amount</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">Request Terms</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card>
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-trade-purple mt-0.5" />
                    <div>
                      <div className="font-medium">AI Lender Matching</div>
                      <p className="text-sm">
                        Our AI can analyze your import profile and match you with the best lenders for your specific 
                        needs. Complete your business profile to receive personalized recommendations.
                      </p>
                      <Button className="mt-3" size="sm">
                        Complete Business Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="import-finance" className="mt-6 space-y-6">
              <div className="bg-trade-purple/10 p-4 rounded-lg border border-trade-purple/20">
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-trade-purple mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium text-trade-purple">What is Import Finance?</div>
                    <p className="text-sm mt-1">
                      Import Finance provides working capital solutions to help importers bridge the gap between 
                      paying suppliers and receiving payment from customers, helping maintain healthy cash flow.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Import Loan</CardTitle>
                    <CardDescription>Short-term working capital</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interest Rate</span>
                      <span className="font-medium">7.5% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tenure</span>
                      <span className="font-medium">Up to 180 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span className="font-medium">0.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Collateral</span>
                      <span className="font-medium">Unsecured</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full">Apply Now</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">LC Backed Loan</CardTitle>
                    <CardDescription>Against Letter of Credit</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interest Rate</span>
                      <span className="font-medium">6.5% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tenure</span>
                      <span className="font-medium">LC validity + 30 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span className="font-medium">0.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Collateral</span>
                      <span className="font-medium">LC as security</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full">Apply Now</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Import Factoring</CardTitle>
                    <CardDescription>Receivables financing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Advance Rate</span>
                      <span className="font-medium">Up to 80%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Factoring Fee</span>
                      <span className="font-medium">1.5% - 2.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Setup Fee</span>
                      <span className="font-medium">$500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Collateral</span>
                      <span className="font-medium">Receivables</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full" variant="outline">Learn More</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="bg-amber-50/10 p-4 rounded-lg border border-amber-200/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-amber-500">Import Finance Eligibility</div>
                    <p className="text-sm mt-1">
                      Import finance options require a minimum of 2 years of business history and a good credit 
                      standing. Complete your business profile to check your eligibility for these financial products.
                    </p>
                    <Button variant="outline" className="mt-3" size="sm">
                      Check Eligibility
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportFinanceOptions;
