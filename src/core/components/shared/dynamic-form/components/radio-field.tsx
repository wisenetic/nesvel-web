import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FieldWrapper } from './field-wrapper';
import { IFieldConfig } from '../interfaces/field-config.interface';

/**
 * Props for the RadioField component.
 */
interface RadioFieldProps {
  /**
   * The configuration for the radio field.
   */
  config: IFieldConfig;
}

/**
 * A component that renders a group of radio buttons.
 * 
 * @param {RadioFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered radio group.
 */
export const RadioField: React.FC<RadioFieldProps> = ({ config }) => {
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
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex flex-col space-y-1"
          >
            {config.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={String(option.value)} id={`${config.name}-${option.value}`} />
                <Label htmlFor={`${config.name}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
    </FieldWrapper>
  );
};
