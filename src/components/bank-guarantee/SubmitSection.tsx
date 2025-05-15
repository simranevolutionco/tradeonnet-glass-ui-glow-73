
import { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface SubmitSectionProps {
  onBack: () => void;
}

export const SubmitSection = ({ onBack }: SubmitSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Application Submitted",
        description: "Your Bank Guarantee application has been successfully submitted.",
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      {!isSubmitted ? (
        <>
          <div>
            <h2 className="text-xl font-medium">Review & Submit</h2>
            <p className="text-muted-foreground mt-1">
              Please review all details before submitting your application
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/10 border border-white/30 rounded-lg p-4">
              <h3 className="font-medium">Application Summary</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Project Type:</span>
                  <span>Performance Guarantee</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span>₹ 5,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Beneficiary:</span>
                  <span>City Development Authority</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Validity Period:</span>
                  <span>12 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Documents:</span>
                  <span className="text-trade-purple">3 uploaded</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 border border-white/30 rounded-lg p-4">
              <h3 className="font-medium flex items-center">
                <Clock className="h-4 w-4 mr-1 text-trade-purple" />
                Estimated Processing Time
              </h3>
              <p className="text-sm mt-1">
                Based on your application details and market conditions, our AI estimates:
              </p>
              <div className="mt-3 flex items-center space-x-4">
                <div className="text-2xl font-semibold text-trade-purple">2-3</div>
                <div className="text-sm text-muted-foreground">business days</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <Button
              variant="outline"
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30"
              disabled={isSubmitting}
            >
              Back
            </Button>
            
            <Button
              onClick={handleSubmit}
              className="bg-trade-purple hover:bg-trade-purple-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">Submitting</span>
                  <Progress value={60} className="w-20 h-2" />
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </>
      ) : (
        <div className="py-8 flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-xl font-semibold">Application Submitted</h2>
          <p className="text-muted-foreground mt-2 text-center max-w-md">
            Your Bank Guarantee application has been successfully submitted. We'll notify you once it's processed.
          </p>
          
          <div className="bg-white/10 border border-white/30 rounded-lg p-4 w-full mt-6">
            <h3 className="font-medium flex items-center">
              <Clock className="h-4 w-4 mr-1 text-trade-purple" />
              Status Timeline
            </h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mr-3">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium">Application Submitted</p>
                  <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-white/50 flex items-center justify-center mr-3">
                  <span className="text-xs">2</span>
                </div>
                <div>
                  <p className="font-medium">Bank Review</p>
                  <p className="text-sm text-muted-foreground">Expected by tomorrow</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-white/50 flex items-center justify-center mr-3">
                  <span className="text-xs">3</span>
                </div>
                <div>
                  <p className="font-medium">BG Issuance</p>
                  <p className="text-sm text-muted-foreground">Expected in 2-3 days</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={() => navigate('/dashboard')} 
              className="bg-trade-purple hover:bg-trade-purple-dark"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
