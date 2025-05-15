
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface TransactionCardProps {
  title: string;
  type: string;
  reference: string;
  amount: string;
  status: string;
  aiPrediction: string;
}

const TransactionCard = ({ title, type, reference, amount, status, aiPrediction }: TransactionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getStatusColor = () => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Under Review":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Awaiting Approval":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };
  
  return (
    <Card 
      className="glass card-hover relative overflow-hidden border border-white/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{type} | {reference}</CardDescription>
          </div>
          <Badge className={`${getStatusColor()} glassmorphism`}>{status}</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="text-xl font-semibold">{amount}</p>
          </div>
          
          <div className={`bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 ${isHovered ? "scale-110 bg-trade-purple/20" : ""}`}>
            <div className="h-8 w-8 flex items-center justify-center">
              {type === "Letter of Credit" && "LC"}
              {type === "Bank Guarantee" && "BG"}
              {type === "Remittance" && "RM"}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t border-white/20 pt-4">
        <div className="text-sm text-trade-purple-dark">
          <span className="font-medium">AI:</span> {aiPrediction}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={`transition-all duration-300 ${isHovered ? "translate-x-1" : ""}`}
        >
          Details
          <ArrowRight className={`ml-2 h-4 w-4 transition-all duration-300 ${isHovered ? "translate-x-1" : ""}`} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionCard;
