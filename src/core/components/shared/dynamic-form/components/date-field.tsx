import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FieldWrapper } from './field-wrapper';
import { IFieldConfig } from '../interfaces/field-config.interface';

/**
 * Props for the DateField component.
 */
interface DateFieldProps {
  /**
   * The configuration for the date field.
   */
  config: IFieldConfig;
}

/**
 * A component that renders a date picker.
 * 
 * @param {DateFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered date picker.
 */
export const DateField: React.FC<DateFieldProps> = ({ config }) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[config.name]?.message as string | undefined;

  return (
    <FieldWrapper
      label={config.label}
      id={config.name}
      error={error}
      description={config.description}
      required={config.required}
      className={config.colSpan ? `col-span-${config.colSpan}` : ''}
    >
      <Controller
        control={control}
        name={config.name}
        defaultValue={config.defaultValue}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
                disabled={config.disabled}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </FieldWrapper>
  );
};
