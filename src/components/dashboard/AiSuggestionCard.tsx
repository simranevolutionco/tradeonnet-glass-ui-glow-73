
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar, ArrowRight } from "lucide-react";

const AiSuggestionCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="glass card-hover border border-white/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-trade-purple/10 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-trade-purple/10 rounded-full translate-y-1/3 -translate-x-1/4" />
      
      <CardHeader>
        <CardTitle className="flex items-center">
          <ChartBar className="mr-2 h-5 w-5 text-trade-purple" />
          AI Finance Suggestions
        </CardTitle>
        <CardDescription>Based on your trade pipeline</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-white/30 border border-white/40">
            <div className="flex items-center mb-2">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <p className="font-medium">Pre-shipment Finance Opportunity</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on your upcoming shipment to ABC Electronics, you're eligible for up to $75,000 in pre-shipment finance.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-white/30 border border-white/40">
            <div className="flex items-center mb-2">
              <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
              <p className="font-medium">FX Rate Alert</p>
            </div>
            <p className="text-sm text-muted-foreground">
              USD/EUR rate is favorable for your upcoming payment. Consider locking in the current rate.
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="ghost" 
          className={`w-full justify-between transition-all duration-300 hover:bg-white/30 ${
            isHovered ? "translate-x-1" : ""
          }`}
        >
          Explore All Finance Options
          <ArrowRight className={`h-4 w-4 transition-all duration-300 ${isHovered ? "translate-x-1" : ""}`} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AiSuggestionCard;
