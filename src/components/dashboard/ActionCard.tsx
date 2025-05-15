
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Action {
  label: string;
  href: string;
}

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  variant: "primary" | "secondary" | "tertiary";
  actions: Action[];
}

const ActionCard = ({ title, description, icon: Icon, variant, actions }: ActionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "from-trade-purple to-trade-purple-dark text-white";
      case "secondary":
        return "from-trade-purple-light to-trade-purple-soft text-foreground";
      case "tertiary":
        return "from-purple-100 to-indigo-100 text-foreground";
      default:
        return "from-trade-purple to-trade-purple-dark text-white";
    }
  };
  
  return (
    <Card 
      className={`overflow-hidden card-hover border-white/30 ${isHovered ? "shadow-lg" : "shadow-md"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${getVariantClasses()} opacity-20`} />
      
      <CardHeader className="relative">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          
          <div className={`p-3 rounded-full bg-white/30 backdrop-blur-sm transition-all duration-300 ${isHovered ? "scale-110" : ""}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <ul className="space-y-2">
          {actions.map((action, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                className={`w-full justify-between text-left hover:bg-white/30 ${isHovered ? "translate-x-1" : ""} transition-all duration-300`}
                onClick={() => navigate(action.href)}
              >
                {action.label}
                <ArrowRight className={`h-4 w-4 transition-all duration-300 ${isHovered ? "translate-x-1" : ""}`} />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ActionCard;
