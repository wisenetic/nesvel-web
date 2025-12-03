import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import { FieldWrapper } from './field-wrapper';
import { IFieldConfig } from '../interfaces/field-config.interface';

/**
 * Props for the SwitchField component.
 */
interface SwitchFieldProps {
  /**
   * The configuration for the switch field.
   */
  config: IFieldConfig;
}

/**
 * A component that renders a toggle switch.
 * 
 * @param {SwitchFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered switch.
 */
export const SwitchField: React.FC<SwitchFieldProps> = ({ config }) => {
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
        defaultValue={config.defaultValue || false}
        render={({ field }) => (
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={config.disabled}
          />
        )}
      />
    </FieldWrapper>
  );
};
