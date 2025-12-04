import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/core/components/ui/input';
import { Textarea } from '@/core/components/ui/textarea';
import { FieldWrapper } from './field-wrapper';
import { IFieldConfig } from '../interfaces/field-config.interface';
import { Progress } from '@/core/components/ui/progress';

/**
 * Props for the TextField component.
 */
interface TextFieldProps {
  /**
   * The configuration for the field.
   */
  config: IFieldConfig;
}


/**
 * A component for rendering text-based input fields (text, email, password, etc.).
 * Includes optional password strength meter, input masking, character counter,
 * read-only mode, autocomplete, and ARIA attributes.
 * 
 * @param {TextFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export const TextField: React.FC<TextFieldProps> = ({ config }) => {
  const { register, formState: { errors }, watch, control } = useFormContext();
  const error = errors[config.name]?.message as string | undefined;
  const value = watch(config.name) || '';
  const [strength, setStrength] = useState(0);

  // Extract component props
  const {
    readOnly,
    autocomplete,
    ariaLabel,
    ariaDescribedBy,
    prefix,
    suffix,
    maxLength,
    showCharCount,
  } = config.componentProps || {};

  useEffect(() => {
    if (config.type === 'password' && config.strengthMeter && value) {
      // Simple strength calculation
      let score = 0;
      if (value.length > 6) score += 20;
      if (value.length > 10) score += 20;
      if (/[A-Z]/.test(value)) score += 20;
      if (/[0-9]/.test(value)) score += 20;
      if (/[^A-Za-z0-9]/.test(value)) score += 20;
      setStrength(score);
    } else {
      setStrength(0);
    }
  }, [value, config.type, config.strengthMeter]);

  const getStrengthColor = (score: number) => {
    if (score <= 20) return 'bg-destructive';
    if (score <= 40) return 'bg-orange-500';
    if (score <= 60) return 'bg-yellow-500';
    if (score <= 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  // Determine if textarea
  const isTextarea = config.type === 'textarea';

  // Render input with prefix/suffix wrapper
  const renderInput = (field: any) => {
    const inputProps = {
      id: config.name,
      type: config.type === 'textarea' ? undefined : config.type,
      placeholder: config.placeholder,
      disabled: config.disabled,
      readOnly: readOnly,
      autoComplete: autocomplete,
      maxLength: maxLength,
      'aria-label': ariaLabel || config.label,
      'aria-describedby': ariaDescribedBy || (config.description ? `${config.name}-description` : undefined),
      'aria-required': config.required,
      'aria-invalid': !!error,
      className: 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      ...field,
    };

    let inputElement;

    if (isTextarea) {
      // Textarea
      inputElement = <Textarea {...inputProps} />;
    } else {
      // Regular input
      inputElement = <Input {...inputProps} />;
    }

    // Wrap with prefix/suffix if needed
    if (prefix || suffix) {
      return (
        <div className="flex items-center gap-2">
          {prefix && (
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {prefix}
            </span>
          )}
          <div className="flex-1">{inputElement}</div>
          {suffix && (
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {suffix}
            </span>
          )}
        </div>
      );
    }

    return inputElement;
  };

  return (
    <FieldWrapper
      label={config.label}
      id={config.name}
      error={error}
      description={config.description}
      required={config.required}
      className={config.colSpan ? `col-span-${config.colSpan}` : ''}
      tooltip={config.componentProps?.tooltip}
    >
      <div className="space-y-2">
        {renderInput(register(config.name))}
        
        {/* Password Strength Meter */}
        {config.type === 'password' && config.strengthMeter && value && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Password Strength</span>
              <span>{strength}%</span>
            </div>
            <Progress value={strength} className="h-1" indicatorClassName={getStrengthColor(strength)} />
          </div>
        )}

        {/* Character Counter */}
        {showCharCount && maxLength && (
          <div className="text-xs text-muted-foreground text-right">
            {value.length} / {maxLength}
          </div>
        )}
      </div>
    </FieldWrapper>
  );
};
