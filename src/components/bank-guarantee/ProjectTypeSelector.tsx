
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Building, Truck, Clock } from "lucide-react";
import HelpTooltip from "@/components/ui/help-tooltip";

interface ProjectTypeItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tooltip: string;
}

interface ProjectTypeSelectorProps {
  onSelect: (type: string) => void;
}

export const ProjectTypeSelector = ({ onSelect }: ProjectTypeSelectorProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const projectTypes: ProjectTypeItem[] = [
    {
      id: "performance",
      title: "Performance Guarantee",
      description: "Guarantees fulfillment of contractual obligations",
      icon: FileText,
      tooltip: "Typically required for construction, services, or supply contracts"
    },
    {
      id: "bid",
      title: "Bid Bond",
      description: "Ensures seriousness in bidding process",
      icon: Building,
      tooltip: "Required before submitting tender or bids for projects"
    },
    {
      id: "advance",
      title: "Advance Payment Guarantee",
      description: "Secures advance payments made before work begins",
      icon: Truck,
      tooltip: "Used when client provides advance payment for supplies or services"
    },
    {
      id: "retention",
      title: "Retention Money Guarantee",
      description: "Replaces retention money held by employer",
      icon: Clock,
      tooltip: "Common in construction projects with hold-back payments"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium flex items-center">
          Select Project Type 
          <HelpTooltip 
            text="AI will suggest the appropriate format and clauses based on your selection" 
            className="ml-2" 
          />
        </h2>
        <p className="text-muted-foreground mt-1">
          Choose the type of project that best fits your requirements
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectTypes.map((type) => {
          const Icon = type.icon;
          const isHovered = hoveredItem === type.id;
          
          return (
            <Card 
              key={type.id}
              className={`
                border border-white/40 transition-all duration-300 cursor-pointer
                ${isHovered 
                  ? "bg-white/30 shadow-lg -translate-y-1" 
                  : "bg-white/20 hover:bg-white/30"}
              `}
              onMouseEnter={() => setHoveredItem(type.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => onSelect(type.id)}
            >
              <CardContent className="p-6 flex items-start">
                <div 
                  className={`
                    mr-4 p-3 rounded-full 
                    ${isHovered 
                      ? "bg-trade-purple text-white" 
                      : "bg-white/30"}
                    transition-colors duration-300
                  `}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`font-medium ${isHovered ? "text-trade-purple" : ""}`}>
                    {type.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                  <div 
                    className={`
                      text-xs mt-2 text-trade-purple opacity-0 transform translate-y-2
                      ${isHovered ? "opacity-100 translate-y-0" : ""}
                      transition-all duration-300
                    `}
                  >
                    Click to select
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
