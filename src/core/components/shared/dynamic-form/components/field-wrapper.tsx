import React from 'react';
import { Label } from '@/core/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/core/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import { AsyncIndicator } from './async-indicator';

/**
 * Props for the FieldWrapper component.
 */
interface FieldWrapperProps {
  /**
   * The label text for the field.
   */
  label: string;

  /**
   * The ID of the input element (for accessibility).
   */
  id: string;

  /**
   * Error message to display, if any.
   */
  error?: string;

  /**
   * Help text or description to display below the field.
   */
  description?: string;

  /**
   * Whether the field is required (adds an asterisk).
   */
  required?: boolean;

  /**
   * Whether the field is currently validating asynchronously.
   */
  isLoading?: boolean;

  /**
   * Tooltip text to display on hover (contextual help).
   */
  tooltip?: string;

  /**
   * The input component to wrap.
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes for the wrapper.
   */
  className?: string;
}

/**
 * A wrapper component that provides a consistent layout for form fields,
 * including labels, error messages, descriptions, tooltips, and async validation indicators.
 * 
 * @param {FieldWrapperProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  id,
  error,
  description,
  required,
  isLoading,
  tooltip,
  children,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor={id} className={cn(error && 'text-destructive')}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center"
                  aria-label="Help"
                >
                  <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        {isLoading && <AsyncIndicator status="loading" message="Checking..." />}
      </div>
      
      <div className="relative">
        {children}
      </div>
      
      {description && !error && (
        <p id={`${id}-description`} className="text-sm text-muted-foreground">{description}</p>
      )}
      
      {error && (
        <p className="text-sm font-medium text-destructive" role="alert">{error}</p>
      )}
    </div>
  );
};
