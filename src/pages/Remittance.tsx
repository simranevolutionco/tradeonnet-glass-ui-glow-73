
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Stepper } from "@/components/bank-guarantee/Stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HelpTooltip from "@/components/ui/help-tooltip";
import { ArrowRight, ChartBar, Euro, InfoIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockBeneficiaries = [
  { id: "1", name: "Global Supplies Ltd", account: "DE89370400440532013000", country: "Germany" },
  { id: "2", name: "Asian Traders Co", account: "HK02678912345612345", country: "Hong Kong" },
  { id: "3", name: "Americas Export Inc", account: "US12345678901234567890", country: "United States" },
];

const Remittance = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [purpose, setPurpose] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { toast } = useToast();

  const steps = ["Beneficiary", "Details", "Review", "Submit"];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit logic
      toast({
        title: "Remittance submitted successfully",
        description: "Your remittance has been submitted and is being processed.",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getBeneficiaryDetails = () => {
    return mockBeneficiaries.find(b => b.id === selectedBeneficiary);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="beneficiary">Select Beneficiary</Label>
              <Select value={selectedBeneficiary} onValueChange={setSelectedBeneficiary}>
                <SelectTrigger className="w-full glassmorphism">
                  <SelectValue placeholder="Select a beneficiary" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Recent Beneficiaries</SelectLabel>
                    {mockBeneficiaries.map((ben) => (
                      <SelectItem key={ben.id} value={ben.id}>
                        {ben.name} ({ben.country})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                <span className="text-trade-purple inline-flex items-center">
                  <InfoIcon className="h-3 w-3 mr-1" />
                  AI Tip: Your recent transactions suggest these beneficiaries
                </span>
              </p>
            </div>

            {selectedBeneficiary && (
              <Card className="glassmorphism">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Beneficiary Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{getBeneficiaryDetails()?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account:</span>
                      <span className="font-medium">{getBeneficiaryDetails()?.account}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Country:</span>
                      <span className="font-medium">{getBeneficiaryDetails()?.country}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input 
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="glassmorphism"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-full glassmorphism">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Remittance</Label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger className="w-full glassmorphism">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="goods">Payment for Goods</SelectItem>
                  <SelectItem value="services">Payment for Services</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {purpose === 'goods' && (
                <p className="text-xs text-muted-foreground">
                  <span className="text-trade-purple inline-flex items-center">
                    <InfoIcon className="h-3 w-3 mr-1" /> 
                    AI Suggestion: Based on your transaction history, this is likely for Invoice #45678
                  </span>
                </p>
              )}
            </div>

            {amount && currency && (
              <Card className="bg-white/10 border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <ChartBar className="h-5 w-5 mr-2" />
                    Exchange Rate Prediction
                  </CardTitle>
                  <CardDescription>
                    AI predicts best transfer timing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gradient-to-r from-purple-100 to-white/20 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground">Current Rate:</p>
                      <p className="text-2xl font-bold">{currency === 'EUR' ? '€1 = $1.089' : '$1 = €0.918'}</p>
                      <p className="text-trade-purple text-sm">
                        AI predicts 0.5% rate improvement tomorrow
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Review Remittance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-white/20">
                    <span className="text-muted-foreground">Beneficiary:</span>
                    <span className="font-medium">{getBeneficiaryDetails()?.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/20">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">
                      {currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency === 'GBP' ? '£' : '¥'}{amount}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/20">
                    <span className="text-muted-foreground">Purpose:</span>
                    <span className="font-medium">
                      {purpose === 'goods' ? 'Payment for Goods' :
                       purpose === 'services' ? 'Payment for Services' :
                       purpose === 'investment' ? 'Investment' : 'Other'}
                    </span>
                  </div>
                </div>
                
                <div className="bg-white/20 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <InfoIcon className="h-4 w-4 text-trade-purple mr-2" />
                    <h3 className="font-medium">Transaction Details</h3>
                  </div>
                  
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex justify-between py-1 border-b border-white/10 cursor-help">
                        <span className="text-muted-foreground">Transaction Fee:</span>
                        <span>€12.00</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Fee Breakdown</h4>
                        <p className="text-sm text-muted-foreground">Base fee: €8.00</p>
                        <p className="text-sm text-muted-foreground">Swift charge: €4.00</p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex justify-between py-1 border-b border-white/10 cursor-help">
                        <span className="text-muted-foreground">Estimated Processing Time:</span>
                        <span>1-2 Business Days</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <p className="text-sm">
                        Transfers to {getBeneficiaryDetails()?.country} typically settle within 1-2 business days 
                        based on your previous transactions.
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                  
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Total Amount:</span>
                    <span className="font-semibold">
                      {currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency === 'GBP' ? '£' : '¥'}
                      {parseFloat(amount || "0") + 12}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center">
                  <Checkbox id="terms" className="mr-2" />
                  <label 
                    htmlFor="terms" 
                    className="text-sm text-muted-foreground"
                  >
                    I confirm the details are correct and authorize this remittance
                  </label>
                </div>
              </CardFooter>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Remittance Submitted</h2>
            <p className="text-muted-foreground">
              Your remittance of {currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency === 'GBP' ? '£' : '¥'}{amount} to {getBeneficiaryDetails()?.name} has been submitted.
            </p>
            <Card className="glassmorphism">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-medium">RM-{new Date().getFullYear()}-{Math.floor(10000 + Math.random() * 90000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium text-amber-600">Processing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Completion:</span>
                  <span className="font-medium">{new Date(Date.now() + 86400000).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
            <Button
              className="bg-gradient-to-r from-trade-purple to-trade-purple-dark"
              onClick={() => {
                toast({
                  title: "Success",
                  description: "Returning to dashboard"
                });
                window.location.href = "/dashboard";
              }}
            >
              Return to Dashboard
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">New Remittance</h1>
            <p className="text-muted-foreground">Send funds internationally with secure processing</p>
          </div>
          
          <Stepper steps={steps} currentStep={currentStep} />
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/30 p-6 shadow-lg">
            {renderStepContent()}
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-trade-purple to-trade-purple-dark"
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !selectedBeneficiary) ||
                (currentStep === 1 && (!amount || !currency || !purpose))
              }
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : "Submit Remittance"}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Remittance;
