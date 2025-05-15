
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Stepper } from "@/components/bank-guarantee/Stepper";
import { ProjectTypeSelector } from "@/components/bank-guarantee/ProjectTypeSelector";
import { ClauseBuilder } from "@/components/bank-guarantee/ClauseBuilder";
import { PreviewPanel } from "@/components/bank-guarantee/PreviewPanel";
import { SubmitSection } from "@/components/bank-guarantee/SubmitSection";
import { HelpPanel } from "@/components/bank-guarantee/HelpPanel";
import { Card, CardContent } from "@/components/ui/card";
import { ActiveBGCard } from "@/components/bank-guarantee/ActiveBGCard";
import { toast } from "@/hooks/use-toast";

const BankGuarantee = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [showHelpPanel, setShowHelpPanel] = useState(false);
  
  const steps = [
    "Project Details",
    "Clause Selection",
    "Document Upload",
    "Review & Submit"
  ];
  
  const handleProjectTypeSelect = (type: string) => {
    setSelectedProjectType(type);
    toast({
      title: "AI Suggestion",
      description: `Based on your selection, we've auto-suggested appropriate clauses for ${type} projects.`,
    });
    setCurrentStep(1);
  };
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const toggleHelpPanel = () => {
    setShowHelpPanel(!showHelpPanel);
  };
  
  return (
    <MainLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-trade-purple to-trade-purple-dark bg-clip-text text-transparent">
            Bank Guarantee Application
          </h1>
        </div>
        
        <Stepper steps={steps} currentStep={currentStep} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="glass border border-white/40 shadow-lg h-full">
              <CardContent className="p-6">
                {currentStep === 0 && (
                  <ProjectTypeSelector onSelect={handleProjectTypeSelect} />
                )}
                
                {currentStep === 1 && (
                  <ClauseBuilder projectType={selectedProjectType} onNext={nextStep} onBack={prevStep} />
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium">Upload Required Documents</h2>
                    <p className="text-muted-foreground">
                      Please upload the necessary documents for your Bank Guarantee application.
                    </p>
                    <div className="h-64 border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center">
                      <p className="text-center text-muted-foreground">
                        Drag and drop your documents here or click to browse
                      </p>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button onClick={prevStep} className="px-4 py-2 border border-white/40 rounded-md bg-white/20 hover:bg-white/30 transition-all">
                        Back
                      </button>
                      <button onClick={nextStep} className="px-4 py-2 bg-trade-purple hover:bg-trade-purple-dark text-white rounded-md transition-all">
                        Continue
                      </button>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <SubmitSection onBack={prevStep} />
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            {showHelpPanel ? (
              <HelpPanel onClose={toggleHelpPanel} projectType={selectedProjectType} />
            ) : (
              <>
                <PreviewPanel 
                  projectType={selectedProjectType} 
                  currentStep={currentStep} 
                  onOpenHelp={toggleHelpPanel} 
                />
                
                <div className="mt-6">
                  <ActiveBGCard />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BankGuarantee;
