import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

/**
 * Props for the WizardStepper component.
 */
interface WizardStepperProps {
  /**
   * The current active step (1-indexed).
   */
  currentStep: number;

  /**
   * The total number of steps.
   */
  steps: Array<{ title: string; description?: string }>;

  /**
   * Callback when a step is clicked (optional).
   */
  onStepClick?: (step: number) => void;
}

/**
 * A component that displays a multi-step progress indicator.
 * 
 * @param {WizardStepperProps} props - The component props.
 * @returns {JSX.Element} The rendered stepper.
 */
export const WizardStepper: React.FC<WizardStepperProps> = ({
  currentStep,
  steps,
  onStepClick,
}) => {
  return (
    <div className="w-full py-4">
      <div className="relative flex items-center justify-between w-full">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-muted -z-10" />
        <div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div 
              key={index} 
              className="flex flex-col items-center cursor-pointer bg-background px-2"
              onClick={() => onStepClick?.(stepNumber)}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
                  isActive && "border-primary bg-primary text-primary-foreground",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  !isActive && !isCompleted && "border-muted-foreground bg-background text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <span>{stepNumber}</span>}
              </div>
              <span className={cn(
                "mt-2 text-xs font-medium transition-colors duration-300",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
