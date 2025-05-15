
import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { AlertTriangle } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import HelpTooltip from "@/components/ui/help-tooltip";

interface ClauseBuilderProps {
  projectType: string;
  onNext: () => void;
  onBack: () => void;
}

interface ClauseType {
  id: string;
  title: string;
  description: string;
  defaultText: string;
  suggested: boolean;
  required: boolean;
  riskLevel?: "low" | "medium" | "high";
  riskDescription?: string;
}

export const ClauseBuilder = ({ projectType, onNext, onBack }: ClauseBuilderProps) => {
  // These clauses would normally be loaded dynamically based on projectType
  const initialClauses: ClauseType[] = [
    {
      id: "beneficiary",
      title: "Beneficiary Details",
      description: "Specifies the party in whose favor the guarantee is issued",
      defaultText: "This Bank Guarantee is issued in favor of [BENEFICIARY NAME], with registered address at [ADDRESS].",
      suggested: true,
      required: true,
    },
    {
      id: "amount",
      title: "Guarantee Amount",
      description: "The maximum amount the bank is liable to pay",
      defaultText: "The Bank hereby guarantees to pay the Beneficiary a sum not exceeding [AMOUNT IN FIGURES] (Amount in Words) upon receipt of the Beneficiary's complying demand.",
      suggested: true,
      required: true,
    },
    {
      id: "validity",
      title: "Validity Period",
      description: "The time period during which the guarantee can be invoked",
      defaultText: "This Bank Guarantee shall remain valid and enforceable until [END DATE], after which it shall become null and void.",
      suggested: true,
      required: true,
    },
    {
      id: "invocation",
      title: "Invocation Clause",
      description: "Conditions under which the guarantee can be invoked",
      defaultText: "The guarantee shall be invoked by the Beneficiary by way of a written demand stating that the [APPLICANT] has failed to fulfill their contractual obligations.",
      suggested: true,
      required: true,
    },
    {
      id: "reducingValue",
      title: "Reducing Value Clause",
      description: "Allows for reduction of the guarantee amount over time",
      defaultText: "The value of this guarantee shall automatically reduce to [PERCENTAGE]% after completion of [MILESTONE] as certified by [AUTHORITY].",
      suggested: projectType === "performance",
      required: false,
    },
    {
      id: "extendOrPay",
      title: "Extend or Pay Clause",
      description: "Allows beneficiary to demand extension or payment",
      defaultText: "If the validity of this guarantee is not extended 30 days before expiry, the Bank shall pay the guaranteed sum to the Beneficiary.",
      suggested: projectType === "performance" || projectType === "advance",
      required: false,
      riskLevel: "medium",
      riskDescription: "This clause may lead to payment even without contractor default",
    },
    {
      id: "onDemand",
      title: "Unconditional On-Demand Clause",
      description: "Makes the guarantee payable on first demand without proof",
      defaultText: "This guarantee is unconditional and the Bank shall pay upon first demand without contest or dispute and without reference to the [APPLICANT].",
      suggested: false,
      required: false,
      riskLevel: "high",
      riskDescription: "High risk of unfair invocation without evidence of default",
    }
  ];
  
  const [selectedClauses, setSelectedClauses] = useState<Record<string, boolean>>(
    initialClauses.reduce((acc, clause) => {
      acc[clause.id] = clause.suggested;
      return acc;
    }, {} as Record<string, boolean>)
  );
  
  const [editableClauses, setEditableClauses] = useState<Record<string, string>>(
    initialClauses.reduce((acc, clause) => {
      acc[clause.id] = clause.defaultText;
      return acc;
    }, {} as Record<string, string>)
  );
  
  const handleClauseToggle = (id: string) => {
    setSelectedClauses(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleClauseEdit = (id: string, value: string) => {
    setEditableClauses(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const getProjectTypeTitle = () => {
    switch(projectType) {
      case "performance": return "Performance Guarantee";
      case "bid": return "Bid Bond";
      case "advance": return "Advance Payment Guarantee";
      case "retention": return "Retention Money Guarantee";
      default: return "Bank Guarantee";
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium flex items-center">
          Clause Builder for {getProjectTypeTitle()}
          <HelpTooltip 
            text="Our AI has suggested clauses based on your project type. Review and edit as needed." 
            className="ml-2" 
          />
        </h2>
        <p className="text-muted-foreground mt-1">
          Select and customize clauses for your Bank Guarantee
        </p>
      </div>
      
      <Accordion type="multiple" defaultValue={initialClauses.filter(c => c.suggested).map(c => c.id)}>
        {initialClauses.map((clause) => (
          <AccordionItem 
            key={clause.id} 
            value={clause.id}
            className={`
              border border-white/20 mb-3 rounded-lg overflow-hidden
              ${selectedClauses[clause.id] ? "bg-white/20" : "bg-white/10"} 
              transition-all duration-300
            `}
          >
            <div className="flex justify-between items-center px-4">
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex items-center">
                  <span className="font-medium">{clause.title}</span>
                  {clause.required && (
                    <Badge variant="outline" className="ml-2 text-xs bg-white/30">
                      Required
                    </Badge>
                  )}
                  {clause.riskLevel && (
                    <Badge 
                      className={`ml-2 text-xs ${
                        clause.riskLevel === "high" 
                          ? "bg-red-500/70" 
                          : clause.riskLevel === "medium" 
                            ? "bg-amber-500/70" 
                            : "bg-green-500/70"
                      }`}
                    >
                      {clause.riskLevel} risk
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              {!clause.required && (
                <Toggle
                  pressed={selectedClauses[clause.id]}
                  onPressedChange={() => handleClauseToggle(clause.id)}
                  className="mr-2"
                >
                  {selectedClauses[clause.id] ? "Included" : "Excluded"}
                </Toggle>
              )}
            </div>
            
            <AccordionContent className="px-4 pb-4">
              <div className="text-sm text-muted-foreground mb-3">{clause.description}</div>
              
              {clause.riskLevel && clause.riskDescription && (
                <div className="flex items-center bg-amber-500/10 border border-amber-500/30 rounded-md p-3 mb-3">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-sm">{clause.riskDescription}</span>
                </div>
              )}
              
              <textarea
                className="w-full p-3 rounded-md border border-white/30 bg-white/10 focus:ring-1 focus:ring-trade-purple min-h-[100px] text-sm"
                value={editableClauses[clause.id]}
                onChange={(e) => handleClauseEdit(clause.id, e.target.value)}
                disabled={!selectedClauses[clause.id]}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="px-4 py-2 border border-white/40 rounded-md bg-white/20 hover:bg-white/30 transition-all">
          Back
        </button>
        <button onClick={onNext} className="px-4 py-2 bg-trade-purple hover:bg-trade-purple-dark text-white rounded-md transition-all">
          Continue
        </button>
      </div>
    </div>
  );
};
