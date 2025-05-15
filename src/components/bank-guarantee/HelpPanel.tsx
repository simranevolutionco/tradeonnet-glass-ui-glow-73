
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface HelpPanelProps {
  onClose: () => void;
  projectType: string;
}

export const HelpPanel = ({ onClose, projectType }: HelpPanelProps) => {
  // These would be dynamically loaded based on projectType
  const helpItems = [
    {
      id: "what-is-bg",
      question: "What is a Bank Guarantee?",
      answer: "A Bank Guarantee is a financial instrument where a bank provides assurance to a beneficiary that if a specific party fails to meet its obligations, the bank will cover the loss up to the guaranteed amount."
    },
    {
      id: "performance-guarantee",
      question: "What is a Performance Guarantee?",
      answer: "A Performance Guarantee ensures that a contractor will complete the project according to the terms of the contract. If the contractor fails to meet their obligations, the beneficiary can claim compensation from the bank up to the guaranteed amount."
    },
    {
      id: "extend-or-pay",
      question: "What is an 'Extend or Pay' clause?",
      answer: "An 'Extend or Pay' clause requires the guarantor to either extend the validity of the guarantee or make payment to the beneficiary when requested. This protects the beneficiary from expiration of the guarantee before project completion."
    },
    {
      id: "on-demand",
      question: "What is an 'On-Demand' guarantee?",
      answer: "An 'On-Demand' guarantee allows the beneficiary to claim payment without having to prove a breach of contract. The bank pays on first demand, making this type of guarantee riskier for the applicant."
    },
    {
      id: "counter-indemnity",
      question: "What is Counter-Indemnity?",
      answer: "Counter-Indemnity is an undertaking given by the applicant to the issuing bank, promising to reimburse the bank for any payment made under the guarantee. This protects the bank from financial loss."
    }
  ];
  
  // Legal references would also be dynamically loaded
  const legalClauses = [
    {
      id: "invocation",
      title: "Standard Invocation Clause",
      text: "This guarantee may be invoked by the Beneficiary by way of a written demand statement delivered to the Bank, stating that the [APPLICANT] has failed to fulfill their contractual obligations as per the Contract dated [CONTRACT DATE]."
    },
    {
      id: "liability",
      title: "Liability Limitation Clause",
      text: "The Bank's liability under this Guarantee shall be limited strictly to the amount stated herein and shall not extend to any consequential or indirect losses suffered by the Beneficiary."
    },
    {
      id: "jurisdiction",
      title: "Jurisdiction Clause",
      text: "This Guarantee shall be governed by the laws of [JURISDICTION] and any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts of [JURISDICTION]."
    }
  ];
  
  return (
    <Card className="glass border border-white/40 shadow-lg h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Help Center</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="overflow-y-auto">
        <div className="mb-6">
          <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            {helpItems.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-b border-white/20">
                <AccordionTrigger className="text-sm py-3 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Relevant Legal Clauses</h3>
          <div className="space-y-3">
            {legalClauses.map((clause) => (
              <div 
                key={clause.id} 
                className="bg-white/10 border border-white/20 rounded-lg p-3"
              >
                <h4 className="text-sm font-medium">{clause.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{clause.text}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-white/20 pt-3">
        <div className="text-xs text-muted-foreground">
          This information is provided as guidance only and should not be considered legal advice. Please consult with your legal department for specific advice.
        </div>
      </CardFooter>
    </Card>
  );
};
