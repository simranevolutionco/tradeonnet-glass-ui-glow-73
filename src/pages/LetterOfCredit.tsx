
import { useState } from 'react';
import { 
  ChevronRight, 
  AlertCircle, 
  CheckCircle, 
  FileText, 
  Upload, 
  Clock, 
  HelpCircle 
} from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card';
import { useToast } from "@/hooks/use-toast";

const LCTypes = [
  { id: 'standby', name: 'Standby LC', description: 'Security against non-performance', recommended: true },
  { id: 'commercial', name: 'Commercial LC', description: 'Standard trade payment guarantee' },
  { id: 'revolving', name: 'Revolving LC', description: 'Multiple shipments without reapplication' },
  { id: 'transferable', name: 'Transferable LC', description: 'Can be transferred to another beneficiary' },
];

const LetterOfCreditPage = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState('standby');
  const [invoiceUploaded, setInvoiceUploaded] = useState(false);
  const [formData, setFormData] = useState({
    applicant: 'Your Company Ltd.',
    beneficiary: 'ABC Electronics Corp.',
    amount: '50,000.00',
    currency: 'USD',
    expiryDate: '2025-08-15',
    partialShipment: 'Not Allowed',
    transhipment: 'Allowed',
  });
  
  const [issues, setIssues] = useState([
    { id: 1, text: 'Missing HS Code in commercial invoice', severity: 'warning' },
    { id: 2, text: 'Port of discharge details incomplete', severity: 'error' },
  ]);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Simulate file upload and AI processing
      setTimeout(() => {
        setInvoiceUploaded(true);
        toast({
          title: "Invoice Uploaded",
          description: "AI has auto-filled 8 fields based on your invoice",
          variant: "default",
        });
      }, 1500);
    }
  };
  
  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    toast({
      title: "LC Type Selected",
      description: "AI recommendation based on your previous 3 applications",
      variant: "default",
    });
  };
  
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === step 
                  ? 'bg-trade-purple text-white' 
                  : currentStep > step 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white border border-trade-purple text-trade-purple'
              }`}
            >
              {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
            </div>
            {step < 4 && (
              <div className={`w-24 h-1 ${currentStep > step ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Select Letter of Credit Type</h2>
            <p className="text-muted-foreground">
              Choose the type of LC that best fits your trade requirements.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LCTypes.map((type) => (
                <div 
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`glassmorphism p-4 rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 ${
                    selectedType === type.id ? 'border-trade-purple' : 'border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                    {type.recommended && (
                      <span className="bg-trade-purple/20 text-trade-purple text-xs px-2 py-1 rounded">
                        AI Recommended
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-6">
              <div className="flex items-start">
                <HelpCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">AI Insight</p>
                  <p className="text-sm text-blue-700">
                    Based on your trade history with ABC Electronics Corp., we recommend a Standby LC 
                    due to your established relationship and previous transaction patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Upload Documents & Details</h2>
            <p className="text-muted-foreground">
              Upload your invoice for AI to auto-fill details and validate against UCP600 rules.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div 
                  className="glassmorphism border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center h-52 hover:border-trade-purple transition-all"
                  onClick={() => document.getElementById('invoice-upload')?.click()}
                >
                  {!invoiceUploaded ? (
                    <>
                      <Upload className="h-12 w-12 text-muted-foreground mb-3" />
                      <p className="font-medium">Upload Commercial Invoice</p>
                      <p className="text-sm text-muted-foreground">Click or drag & drop</p>
                      <p className="text-xs text-muted-foreground mt-2">PDF, JPG or PNG (max 10MB)</p>
                      <input 
                        id="invoice-upload" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileUpload}
                      />
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
                      <p className="font-medium">Invoice Uploaded</p>
                      <p className="text-sm text-green-600">8 fields auto-filled</p>
                    </>
                  )}
                </div>
                
                <div className="glassmorphism p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">UCP600 Compliance Check</h3>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      2 Issues Found
                    </span>
                  </div>
                  
                  <ul className="space-y-2">
                    {issues.map(issue => (
                      <li 
                        key={issue.id} 
                        className={`text-sm p-2 rounded-md flex items-start ${
                          issue.severity === 'error' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
                        }`}
                      >
                        <AlertCircle className="h-4 w-4 mr-2 mt-0.5" />
                        {issue.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="glassmorphism p-4 rounded-lg">
                  <h3 className="font-medium mb-3">LC Details</h3>
                  
                  <div className="space-y-3">
                    {Object.entries(formData).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </div>
                        <div className="text-sm font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Review & Preview</h2>
            <p className="text-muted-foreground">
              Review your Letter of Credit details and estimated fees.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card className="glassmorphism hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      LC Draft Preview
                    </CardTitle>
                    <CardDescription>
                      The Letter of Credit will appear as shown below
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white/80 p-4 rounded-md shadow-sm border border-gray-200">
                      <div className="text-center mb-4">
                        <h3 className="font-bold text-lg">STANDBY LETTER OF CREDIT</h3>
                        <p className="text-sm">V Bank | Ref: LC/2025/0042</p>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <p><span className="font-medium">Applicant:</span> {formData.applicant}</p>
                        <p><span className="font-medium">Beneficiary:</span> {formData.beneficiary}</p>
                        <p><span className="font-medium">Amount:</span> {formData.currency} {formData.amount}</p>
                        <p><span className="font-medium">Expiry Date:</span> {formData.expiryDate}</p>
                        <p><span className="font-medium">Partial Shipment:</span> {formData.partialShipment}</p>
                        <p><span className="font-medium">Transhipment:</span> {formData.transhipment}</p>
                        <p className="text-xs text-muted-foreground mt-4">This is a preview. The final LC will include additional terms and conditions.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Important</p>
                      <p className="text-sm text-yellow-700">
                        Review for any discrepancies. Our AI shows 2 potential issues that require your attention 
                        before submission. Incorrect information may lead to LC rejection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Card className="glassmorphism hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">Fee Calculation</CardTitle>
                    <CardDescription>
                      Estimated fees for this LC
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Issuance Fee</span>
                        <span className="font-medium">$250.00</span>
                      </div>
                      <div className="flex justify-between">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <span className="text-sm flex items-center cursor-help">
                              Commission <HelpCircle className="h-3 w-3 ml-1" />
                            </span>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <p className="text-sm">0.25% per quarter of the LC value</p>
                          </HoverCardContent>
                        </HoverCard>
                        <span className="font-medium">$125.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">SWIFT Charges</span>
                        <span className="font-medium">$50.00</span>
                      </div>
                      <div className="border-t border-gray-200 my-2"></div>
                      <div className="flex justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-bold">$425.00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glassmorphism hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">Timeline</CardTitle>
                    <CardDescription>
                      Estimated processing time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-trade-purple mr-2" />
                      <div>
                        <p className="font-medium">2-3 Business Days</p>
                        <p className="text-xs text-muted-foreground">
                          AI prediction based on current bank processing times
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-semibold">Application Submitted</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your Letter of Credit application has been submitted successfully. 
              You can track the status of your application in the dashboard.
            </p>
            
            <div className="glassmorphism p-6 max-w-md mx-auto rounded-lg mt-6">
              <h3 className="font-medium mb-3">Application Details</h3>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Reference Number:</span>
                  <span className="font-medium">LC/2025/0042</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Submission Date:</span>
                  <span className="font-medium">May 15, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Under Review</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Completion:</span>
                  <span className="font-medium">May 18, 2025</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = "/dashboard"}
                className="mr-2"
              >
                Back to Dashboard
              </Button>
              <Button onClick={() => window.location.href = "/documents"}>
                Upload Supporting Documents
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Apply for Letter of Credit</h1>
          <p className="text-muted-foreground">
            Complete the form below to apply for a new Letter of Credit. 
            Our AI will guide you through the process.
          </p>
        </div>
        
        {renderStepIndicator()}
        
        <div className="glassmorphism rounded-xl p-6 mb-6">
          {renderStepContent()}
        </div>
        
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <Button 
              variant="outline" 
              onClick={prevStep}
              className="flex items-center"
            >
              Previous Step
            </Button>
          )}
          
          <div className="ml-auto">
            {currentStep < 4 ? (
              <Button onClick={nextStep} className="flex items-center">
                Next Step <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button variant="outline" onClick={() => window.location.href = "/dashboard"}>
                Return to Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LetterOfCreditPage;
