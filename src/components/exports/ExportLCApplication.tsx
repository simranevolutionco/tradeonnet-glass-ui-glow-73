
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileUp, FileCheck, Check, X, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  applicant: z.string().min(2, { message: "Applicant name is required" }),
  beneficiary: z.string().min(2, { message: "Beneficiary name is required" }),
  lcType: z.string(),
  currency: z.string(),
  amount: z.string().min(1, { message: "Amount is required" }),
  expiryDate: z.string(),
  termsOfPayment: z.string(),
  goodsDescription: z.string().min(10, { message: "Please provide a detailed description" }),
  shipmentTerms: z.string(),
  specialConditions: z.string().optional(),
});

const ExportLCApplication = () => {
  const [step, setStep] = useState(1);
  const [uploadedInvoice, setUploadedInvoice] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicant: "",
      beneficiary: "Your Company Ltd.",
      lcType: "sight",
      currency: "USD",
      amount: "",
      expiryDate: "",
      termsOfPayment: "at_sight",
      goodsDescription: "",
      shipmentTerms: "FOB",
      specialConditions: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "LC Application Submitted",
      description: "Your application has been submitted successfully"
    });
  };
  
  const handleInvoiceUpload = () => {
    setUploadedInvoice(true);
    // Simulate AI reading the invoice
    setTimeout(() => {
      form.setValue("amount", "125,000.00");
      form.setValue("goodsDescription", "Electronic components including 500 units of semiconductor chips, model XC2540, packed in anti-static packaging.");
      form.setValue("applicant", "ABC Electronics GmbH");
      
      toast({
        title: "Invoice Processed",
        description: "AI has extracted and filled relevant fields from your invoice"
      });
    }, 1000);
  };
  
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  
  const getLcTypeRecommendation = () => {
    // This would normally be based on AI analysis of trade history
    return (
      <div className="text-xs bg-trade-purple/10 p-2 rounded-md mt-1">
        <span className="font-medium text-trade-purple">AI Suggestion:</span> Based on your previous exports to this region, a Sight LC is recommended.
      </div>
    );
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Export Letter of Credit Application</CardTitle>
            <CardDescription>
              Apply for a new export LC or use an AI-generated template
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-8 border-b border-white/20">
              <div className={`pb-2 px-4 ${step === 1 ? 'border-b-2 border-trade-purple' : ''}`}>
                1. Basic Information
              </div>
              <div className={`pb-2 px-4 ${step === 2 ? 'border-b-2 border-trade-purple' : ''}`}>
                2. Shipment Details
              </div>
              <div className={`pb-2 px-4 ${step === 3 ? 'border-b-2 border-trade-purple' : ''}`}>
                3. Review & Submit
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                  <>
                    <div className="bg-white/10 p-4 rounded-lg border border-white/20 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Upload Invoice for Auto-Fill</h3>
                          <p className="text-sm text-muted-foreground">
                            Our AI will extract key information from your invoice
                          </p>
                        </div>
                        
                        {!uploadedInvoice ? (
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleInvoiceUpload}
                          >
                            <FileUp className="mr-2 h-4 w-4" />
                            Upload Invoice
                          </Button>
                        ) : (
                          <div className="flex items-center text-green-500">
                            <FileCheck className="mr-2 h-5 w-5" />
                            <span>Invoice Uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="beneficiary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Beneficiary (Your Company)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              The exporter who will receive payment
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="applicant"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Applicant (Buyer)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              The importer who will make payment
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lcType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LC Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select LC type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sight">Sight LC</SelectItem>
                                <SelectItem value="usance">Usance LC</SelectItem>
                                <SelectItem value="transferable">Transferable LC</SelectItem>
                                <SelectItem value="standby">Standby LC</SelectItem>
                                <SelectItem value="revolving">Revolving LC</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              The type of letter of credit
                            </FormDescription>
                            {getLcTypeRecommendation()}
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="termsOfPayment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Terms of Payment</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment terms" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="at_sight">At Sight</SelectItem>
                                <SelectItem value="30_days">30 Days</SelectItem>
                                <SelectItem value="60_days">60 Days</SelectItem>
                                <SelectItem value="90_days">90 Days</SelectItem>
                                <SelectItem value="180_days">180 Days</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Currency</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="USD">USD - US Dollar</SelectItem>
                                <SelectItem value="EUR">EUR - Euro</SelectItem>
                                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                                <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                
                {step === 2 && (
                  <>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="goodsDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Goods Description</FormLabel>
                            <FormControl>
                              <Textarea rows={5} {...field} />
                            </FormControl>
                            <FormDescription>
                              Detailed description of goods as per invoice
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="shipmentTerms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Shipment Terms</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select terms" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="FOB">FOB - Free on Board</SelectItem>
                                  <SelectItem value="CIF">CIF - Cost, Insurance & Freight</SelectItem>
                                  <SelectItem value="CFR">CFR - Cost and Freight</SelectItem>
                                  <SelectItem value="EXW">EXW - Ex Works</SelectItem>
                                  <SelectItem value="DAP">DAP - Delivered at Place</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                        <h3 className="font-medium mb-3">Required Documents</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>Commercial Invoice (3 originals, 3 copies)</span>
                          </div>
                          <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>Packing List (1 original, 2 copies)</span>
                          </div>
                          <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>Bill of Lading (Full set)</span>
                          </div>
                          <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>Certificate of Origin (1 original, 2 copies)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 border border-dashed rounded-sm mr-2"></div>
                            <span>Insurance Certificate (if applicable)</span>
                          </div>
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="specialConditions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Conditions</FormLabel>
                            <FormControl>
                              <Textarea rows={3} {...field} />
                            </FormControl>
                            <FormDescription>
                              Any additional conditions or requirements
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                      <h3 className="font-medium mb-4">Review LC Application</h3>
                      
                      <div className="grid grid-cols-2 gap-y-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Beneficiary</div>
                          <div>{form.getValues("beneficiary")}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">Applicant</div>
                          <div>{form.getValues("applicant")}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">LC Type</div>
                          <div className="capitalize">{form.getValues("lcType")} LC</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">Terms of Payment</div>
                          <div className="capitalize">
                            {form.getValues("termsOfPayment").replace("_", " ")}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">Currency & Amount</div>
                          <div>{form.getValues("currency")} {form.getValues("amount")}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">Expiry Date</div>
                          <div>{form.getValues("expiryDate")}</div>
                        </div>
                        
                        <div className="col-span-2 mt-2">
                          <div className="text-sm text-muted-foreground">Goods Description</div>
                          <div className="text-sm">{form.getValues("goodsDescription")}</div>
                        </div>
                        
                        <div className="col-span-2 mt-2">
                          <div className="text-sm text-muted-foreground">Shipment Terms</div>
                          <div>{form.getValues("shipmentTerms")}</div>
                        </div>
                        
                        {form.getValues("specialConditions") && (
                          <div className="col-span-2 mt-2">
                            <div className="text-sm text-muted-foreground">Special Conditions</div>
                            <div className="text-sm">{form.getValues("specialConditions")}</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-green-50/20 p-4 rounded-md mt-6 border border-green-200/20">
                        <div className="flex">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <div>
                            <div className="font-medium text-green-500">UCP 600 Compliance Check</div>
                            <p className="text-sm mt-1">
                              AI has verified this LC application meets UCP 600 requirements with no compliance issues.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-trade-purple hover:bg-trade-purple-dark">
                        Submit LC Application
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between pt-4 border-t border-white/20">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {step < 3 && (
                    <Button type="button" onClick={nextStep}>
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <Card className="glassmorphism sticky top-6">
          <CardHeader>
            <CardTitle>LC Preview</CardTitle>
            <CardDescription>
              Draft preview of your LC application
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="bg-white/10 p-4 rounded-lg border border-white/20 space-y-4">
              <div>
                <div className="uppercase text-xs text-muted-foreground">Issuing Bank</div>
                <div>First International Bank</div>
              </div>
              
              <div>
                <div className="uppercase text-xs text-muted-foreground">Beneficiary</div>
                <div>{form.getValues("beneficiary") || "Not specified"}</div>
              </div>
              
              <div>
                <div className="uppercase text-xs text-muted-foreground">Applicant</div>
                <div>{form.getValues("applicant") || "Not specified"}</div>
              </div>
              
              <div>
                <div className="uppercase text-xs text-muted-foreground">LC Type</div>
                <div className="capitalize">{form.getValues("lcType") || "Not specified"} LC</div>
              </div>
              
              <div>
                <div className="uppercase text-xs text-muted-foreground">Amount</div>
                <div>{form.getValues("currency")} {form.getValues("amount") || "0.00"}</div>
              </div>
              
              <div>
                <div className="text-xs text-muted-foreground mt-4">Goods Description</div>
                <div className="text-xs">
                  {form.getValues("goodsDescription") || "Not yet provided"}
                </div>
              </div>
              
              {form.getValues("goodsDescription") && (
                <div className="bg-green-50/10 p-3 rounded-md border border-green-200/10">
                  <div className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <div className="text-xs">
                      <span className="text-green-500 font-medium">AI Validation:</span> Description meets requirements for specificity and matches commercial invoice details.
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Estimated Fees</div>
                <div>{form.getValues("currency") === "USD" ? "$" : "€"}320.00</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Processing Time</div>
                <div>2-3 business days</div>
              </div>
              
              <div className="bg-amber-50/10 p-3 rounded-md border border-amber-200/10">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  <div>
                    <span className="text-amber-500 font-medium">Reminder:</span> Ensure all document details match exactly to avoid discrepancies during negotiation.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExportLCApplication;
