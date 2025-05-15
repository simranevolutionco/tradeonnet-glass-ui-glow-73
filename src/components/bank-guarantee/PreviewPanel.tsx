
import { HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PreviewPanelProps {
  projectType: string;
  currentStep: number;
  onOpenHelp: () => void;
}

export const PreviewPanel = ({ projectType, currentStep, onOpenHelp }: PreviewPanelProps) => {
  // This would normally be based on the selected clauses and project details
  const previewText = `BANK GUARANTEE

THIS DEED OF GUARANTEE made this [DATE] day of [MONTH], [YEAR] by [BANK NAME], a banking company registered under the Companies Act and having its registered office at [BANK ADDRESS] (hereinafter referred to as "the Bank")

IN FAVOR OF

[BENEFICIARY NAME], having its registered office at [BENEFICIARY ADDRESS] (hereinafter referred to as "the Beneficiary")

WHEREAS [APPLICANT NAME] (hereinafter referred to as "the Applicant") has entered into a contract with the Beneficiary dated [CONTRACT DATE] (hereinafter referred to as "the Contract") for [PROJECT DESCRIPTION].

AND WHEREAS the Applicant is required to furnish a Bank Guarantee for the sum of [AMOUNT IN FIGURES] (Amount in Words) as performance security.

NOW THIS DEED WITNESSETH AS FOLLOWS:

1. The Bank hereby guarantees to pay the Beneficiary a sum not exceeding [AMOUNT IN FIGURES] (Amount in Words) upon receipt of the Beneficiary's complying demand.

2. This Bank Guarantee shall remain valid and enforceable until [END DATE], after which it shall become null and void.

3. ...
`;

  // AI explanation would be dynamic based on the project type and current step
  const getAIExplanation = () => {
    switch (currentStep) {
      case 0:
        return "Select your project type to receive AI-suggested clauses tailored to your specific needs.";
      case 1:
        return "Our AI has analyzed your project type and suggested appropriate clauses with risk assessments.";
      case 2:
        return "Upload all required documents. AI will validate completeness and compliance with regulatory requirements.";
      case 3:
        return "Review all details before submission. AI has verified your application and estimated approval timeline.";
      default:
        return "Our AI assistant will guide you through the Bank Guarantee application process.";
    }
  };
  
  return (
    <Card className="glass border border-white/40 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Preview</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/30 hover:bg-white/50 btn-hover" 
            onClick={onOpenHelp}
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            Need Help?
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="bg-white/10 border border-white/30 rounded-lg p-4 h-[300px] overflow-auto mb-4 text-sm">
          <pre className="whitespace-pre-wrap">{previewText}</pre>
        </div>
        
        <div className="bg-trade-purple/10 border border-trade-purple/30 rounded-lg p-3 mt-4">
          <h4 className="text-sm font-medium text-trade-purple-dark flex items-center">
            <span className="bg-trade-purple text-white p-1 rounded text-xs mr-2">AI</span>
            Smart Assistant
          </h4>
          <p className="text-sm mt-1 text-muted-foreground">{getAIExplanation()}</p>
        </div>
      </CardContent>
    </Card>
  );
};
