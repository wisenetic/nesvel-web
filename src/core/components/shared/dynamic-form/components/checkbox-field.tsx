import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox } from '@/core/components/ui/checkbox';
import { Label } from '@/core/components/ui/label';
import { cn } from '@/core/lib/utils';
import { IFieldConfig } from '../interfaces/field-config.interface';

/**
 * Props for the CheckboxField component.
 */
interface CheckboxFieldProps {
  /**
   * The configuration for the field.
   */
  config: IFieldConfig;
}

/**
 * A component for rendering a checkbox field.
 * 
 * @param {CheckboxFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export const CheckboxField: React.FC<CheckboxFieldProps> = ({ config }) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[config.name]?.message as string | undefined;

  return (
    <div className={cn('flex flex-col gap-2', config.colSpan ? `col-span-${config.colSpan}` : '')}>
      <div className="flex items-center space-x-2">
        <Controller
          control={control}
          name={config.name}
          defaultValue={config.defaultValue || false}
          render={({ field }) => (
            <Checkbox
              id={config.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={config.disabled}
            />
          )}
        />
        <Label
          htmlFor={config.name}
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            error && 'text-destructive'
          )}
        >
          {config.label}
          {config.required && <span className="text-destructive ml-1">*</span>}
        </Label>
      </div>
      
      {config.description && !error && (
        <p className="text-sm text-muted-foreground ml-6">{config.description}</p>
      )}
      
      {error && (
        <p className="text-sm font-medium text-destructive ml-6">{error}</p>
      )}
    </div>
  );
};
