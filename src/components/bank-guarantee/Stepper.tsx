
import React from "react";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center relative">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center 
                  transition-all duration-300 z-10
                  ${isCompleted 
                    ? "bg-trade-purple text-white" 
                    : isActive 
                      ? "bg-white/50 border-2 border-trade-purple" 
                      : "bg-white/30 border border-white/40"}
                `}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              
              <span 
                className={`
                  mt-2 text-sm font-medium
                  ${isCompleted || isActive ? "text-trade-purple" : "text-muted-foreground"}
                `}
              >
                {step}
              </span>
              
              {index < steps.length - 1 && (
                <div 
                  className={`
                    absolute top-5 left-10 w-[calc(100%-1.25rem)] h-0.5
                    ${index < currentStep ? "bg-trade-purple" : "bg-white/30"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
