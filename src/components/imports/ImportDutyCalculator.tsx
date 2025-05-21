
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Download, HelpCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { HelpTooltip } from "@/components/ui/help-tooltip";

const ImportDutyCalculator = () => {
  const [productCategory, setProductCategory] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [hsCode, setHsCode] = useState("");
  const [importValue, setImportValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calculationResults, setCalculationResults] = useState<any>(null);
  const { toast } = useToast();
  
  const handleCalculate = () => {
    if (!productCategory || !countryOfOrigin || !importValue) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate AI calculation
    const value = parseFloat(importValue.replace(/,/g, ""));
    
    // Different rates based on product and country
    let basicDutyRate = 0;
    if (productCategory === "electronics") {
      basicDutyRate = countryOfOrigin === "china" ? 0.08 : 0.06;
    } else if (productCategory === "textiles") {
      basicDutyRate = countryOfOrigin === "china" ? 0.12 : 0.09;
    } else if (productCategory === "machinery") {
      basicDutyRate = countryOfOrigin === "china" ? 0.075 : 0.05;
    } else {
      basicDutyRate = countryOfOrigin === "china" ? 0.10 : 0.07;
    }
    
    const basicDuty = value * basicDutyRate;
    const additionalDuty = value * 0.02;
    const gst = (value + basicDuty + additionalDuty) * 0.18;
    const totalDuty = basicDuty + additionalDuty + gst;
    const landedCost = value + totalDuty;
    
    setCalculationResults({
      basicDuty: basicDuty.toFixed(2),
      basicDutyRate: `${(basicDutyRate * 100).toFixed(1)}%`,
      additionalDuty: additionalDuty.toFixed(2),
      additionalDutyRate: "2.0%",
      gst: gst.toFixed(2),
      gstRate: "18.0%",
      totalDuty: totalDuty.toFixed(2),
      effectiveRate: `${((totalDuty / value) * 100).toFixed(1)}%`,
      landedCost: landedCost.toFixed(2)
    });
    
    toast({
      title: "Duty Calculation Complete",
      description: `Estimated duties: $${totalDuty.toFixed(2)}`,
    });
  };
  
  // AI suggestion for HS code based on product category
  const suggestHsCode = (category: string) => {
    if (category === "electronics") {
      setHsCode("8517.62.90");
      toast({
        title: "AI Suggestion",
        description: "HS code suggested based on product category",
      });
    } else if (category === "textiles") {
      setHsCode("6204.32.00");
    } else if (category === "machinery") {
      setHsCode("8481.80.99");
    } else if (category === "chemicals") {
      setHsCode("2933.39.90");
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Import Duty Calculator</CardTitle>
            <CardDescription>
              Calculate estimated duties, taxes, and landed cost for your imports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="calculator" className="space-y-6">
              <TabsList className="glassmorphism">
                <TabsTrigger value="calculator">Basic Calculator</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="calculator" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="product-category" className="text-sm">
                        Product Category
                      </Label>
                      <Select 
                        value={productCategory} 
                        onValueChange={(value) => {
                          setProductCategory(value);
                          suggestHsCode(value);
                        }}
                      >
                        <SelectTrigger id="product-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="textiles">Textiles & Apparel</SelectItem>
                          <SelectItem value="machinery">Machinery & Equipment</SelectItem>
                          <SelectItem value="chemicals">Chemicals & Plastics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="country-of-origin" className="text-sm">
                        Country of Origin
                      </Label>
                      <Select value={countryOfOrigin} onValueChange={setCountryOfOrigin}>
                        <SelectTrigger id="country-of-origin">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="china">China</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="eu">European Union</SelectItem>
                          <SelectItem value="japan">Japan</SelectItem>
                          <SelectItem value="korea">South Korea</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label 
                        htmlFor="hs-code" 
                        className="text-sm flex items-center justify-between"
                      >
                        <div>
                          HS Code
                          <HelpTooltip content="Harmonized System code used for classification of goods in international trade" />
                        </div>
                        {productCategory && !hsCode && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => suggestHsCode(productCategory)} 
                            className="text-xs h-auto py-1 px-2"
                          >
                            Suggest HS Code
                          </Button>
                        )}
                      </Label>
                      <Input
                        id="hs-code"
                        value={hsCode}
                        onChange={(e) => setHsCode(e.target.value)}
                        placeholder="e.g. 8517.62.90"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="import-value" className="text-sm">
                        Import Value (USD)
                      </Label>
                      <Input
                        id="import-value"
                        value={importValue}
                        onChange={(e) => setImportValue(e.target.value)}
                        placeholder="e.g. 10000"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="quantity" className="text-sm">
                      Quantity/Units (optional)
                    </Label>
                    <Input
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 100"
                    />
                  </div>
                </div>
                
                <Button onClick={handleCalculate} className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Import Duties
                </Button>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-6">
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm text-center">
                    Advanced options will be available soon. For complex calculations,
                    please contact our customs advisory team.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {calculationResults && (
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Duty Calculation Results</CardTitle>
              <CardDescription>
                Based on the information provided
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Import Value</div>
                    <div className="font-medium text-xl">${importValue}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>Basic Customs Duty</span>
                        <HelpTooltip content="Standard duty rate applied on CIF value of goods" />
                      </div>
                      <div className="text-right">
                        <div>${calculationResults.basicDuty}</div>
                        <div className="text-xs text-muted-foreground">
                          Rate: {calculationResults.basicDutyRate}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>Additional Duty</span>
                        <HelpTooltip content="Supplementary duty based on product category" />
                      </div>
                      <div className="text-right">
                        <div>${calculationResults.additionalDuty}</div>
                        <div className="text-xs text-muted-foreground">
                          Rate: {calculationResults.additionalDutyRate}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>GST/VAT</span>
                        <HelpTooltip content="Tax applied on value of goods plus all duties" />
                      </div>
                      <div className="text-right">
                        <div>${calculationResults.gst}</div>
                        <div className="text-xs text-muted-foreground">
                          Rate: {calculationResults.gstRate}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-white/20">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Total Duty & Taxes</div>
                      <div className="font-medium">${calculationResults.totalDuty}</div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <div>Effective Rate</div>
                      <div>{calculationResults.effectiveRate}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-trade-purple/10 p-4 rounded-lg">
                  <div className="mb-4">
                    <div className="text-sm font-medium text-trade-purple mb-1">Landed Cost</div>
                    <div className="flex justify-between">
                      <div className="text-sm">Import Value</div>
                      <div>${importValue}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm">+ Total Duties & Taxes</div>
                      <div>${calculationResults.totalDuty}</div>
                    </div>
                    <div className="flex justify-between mt-2 font-medium">
                      <div>= Total Landed Cost</div>
                      <div>${calculationResults.landedCost}</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 p-3 rounded-lg mt-4">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 text-trade-purple mr-2 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-medium">AI Note:</span> This calculation is an estimate based on current rates. Actual charges may vary based on precise classification and valuation by customs.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="lg:col-span-1">
        <Card className="glassmorphism sticky top-6">
          <CardHeader>
            <CardTitle>HS Code Finder</CardTitle>
            <CardDescription>
              Find the correct HS code for your products
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="product-search" className="text-sm">
                Search Product Description
              </Label>
              <div className="relative">
                <Input id="product-search" placeholder="e.g. mobile phone parts" />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-0 top-0 h-10"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-sm font-medium mb-2">HS Code Information</div>
              <p className="text-sm">
                Harmonized System (HS) codes are standardized numerical codes used to classify traded products.
                Using the correct HS code is crucial for determining:
              </p>
              <ul className="text-sm mt-2 space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                  <span>Applicable duty rates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                  <span>Import restrictions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                  <span>Documentation requirements</span>
                </li>
              </ul>
            </div>
            
            {productCategory && (
              <div className="bg-blue-50/10 p-4 rounded-lg border border-blue-200/20">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <div className="font-medium text-blue-500">HS Code Suggestion</div>
                    <p className="text-sm mt-1">
                      {productCategory === "electronics" && "For electronic components and devices, common HS codes start with 85. For semiconductor parts, consider codes in 8541 range."}
                      {productCategory === "textiles" && "For textile products, common HS codes start with 61-63. For cotton apparel, consider codes in 6204 range."}
                      {productCategory === "machinery" && "For industrial machinery, common HS codes start with 84. For valves and similar parts, consider codes in 8481 range."}
                      {productCategory === "chemicals" && "For chemical products, common HS codes start with 29. For organic chemicals, consider codes in 2933 range."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImportDutyCalculator;
