
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FileText, Clock, AlertTriangle } from "lucide-react";

export const ActiveBGCard = () => {
  // Mock data for active bank guarantees
  const activeGuarantees = [
    {
      id: "BG0012345",
      type: "Performance Guarantee",
      amount: "₹ 12,50,000",
      beneficiary: "Metro Rail Corporation",
      expiryDate: "2023-12-15",
      status: "Active",
      daysLeft: 45,
    },
    {
      id: "BG0012344",
      type: "Bid Bond",
      amount: "₹ 5,00,000",
      beneficiary: "State Highway Authority",
      expiryDate: "2023-10-30",
      status: "Expiring Soon",
      daysLeft: 15,
    }
  ];
  
  return (
    <Card className="glass border border-white/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <FileText className="mr-2 h-5 w-5 text-trade-purple" />
          Active Bank Guarantees
        </CardTitle>
        <CardDescription>Your current active guarantees</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="space-y-3">
          {activeGuarantees.map((bg) => (
            <HoverCard key={bg.id}>
              <HoverCardTrigger asChild>
                <div 
                  className={`
                    p-3 rounded-lg border transition-all duration-300
                    ${bg.daysLeft <= 30 
                      ? "border-amber-500/40 bg-amber-500/10" 
                      : "border-white/30 bg-white/20 hover:bg-white/30"
                    }
                    cursor-pointer hover:shadow-lg hover:-translate-y-0.5
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm">{bg.type}</h4>
                      <p className="text-xs text-muted-foreground">{bg.beneficiary}</p>
                    </div>
                    <div className="text-sm font-medium">{bg.amount}</div>
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{bg.daysLeft} days left</span>
                    </div>
                    
                    {bg.daysLeft <= 30 && (
                      <div className="flex items-center text-xs text-amber-500">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        <span>Expiring soon</span>
                      </div>
                    )}
                  </div>
                </div>
              </HoverCardTrigger>
              
              <HoverCardContent className="w-80 p-3">
                <div className="space-y-2">
                  <h4 className="font-medium">{bg.type} - {bg.id}</h4>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Beneficiary:</span>
                      <span>{bg.beneficiary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span>{bg.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expiry Date:</span>
                      <span>{new Date(bg.expiryDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Days Remaining:</span>
                      <span>{bg.daysLeft}</span>
                    </div>
                  </div>
                  
                  {bg.daysLeft <= 30 && (
                    <div className="bg-amber-500/10 text-amber-600 p-2 rounded text-xs">
                      This bank guarantee is expiring soon. Consider extending it before expiry to avoid penalties.
                    </div>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="text-xs text-muted-foreground">
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>Last updated: Today at 10:30 AM</span>
        </div>
      </CardFooter>
    </Card>
  );
};
