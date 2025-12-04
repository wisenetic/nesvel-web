import React, { ReactNode, useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IFormSchema } from '../interfaces/form-schema.interface';
import { FieldRenderer } from './field-renderer';
import { Button } from '@/core/components/ui/button';
import { Loader2, Save, RotateCcw, ArrowLeft, ArrowRight } from 'lucide-react';
import { useFormPersistence } from '../hooks/useFormPersistence';
import { WizardStepper } from './wizard-stepper';

/**
 * Props for the DynamicForm component.
 */
interface DynamicFormProps {
  /**
   * The schema defining the form structure and validation.
   */
  schema: IFormSchema;

  /**
   * Callback function to handle form submission.
   */
  onSubmit: SubmitHandler<any>;

  /**
   * Initial values for the form fields.
   */
  defaultValues?: Record<string, any>;

  /**
   * Custom text for the submit button.
   */
  submitLabel?: string;

  /**
   * Additional CSS classes for the form container.
   */
  className?: string;

  /**
   * Configuration for form persistence (Save Draft).
   */
  persistence?: {
    enabled: boolean;
    formId: string;
    autoSave?: boolean;
  };

  /**
   * Mode of the form: 'standard' or 'wizard'.
   */
  mode?: 'standard' | 'wizard';

  /**
   * Optional extra actions to render next to the primary submit/next button.
   * Useful for adding a Cancel/Close button aligned with the submit button.
   */
  extraActions?: ReactNode;

  /**
   * Whether to show the horizontal divider above the footer actions.
   * Defaults to true.
   */
  showFooterBorder?: boolean;
}

/**
 * The main component for rendering a dynamic form based on a schema.
 * It handles form state, validation, submission, optional persistence, and wizard mode.
 * 
 * @param {DynamicFormProps} props - The component props.
 * @returns {JSX.Element} The rendered form.
 */
export const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  onSubmit,
  defaultValues,
  submitLabel,
  className,
  persistence,
  mode = 'standard',
  extraActions,
  showFooterBorder = true,
}) => {
  const methods = useForm({
    resolver: zodResolver(schema.validationSchema),
    defaultValues: defaultValues || {},
    mode: 'onChange', // Enable real-time validation for wizard steps
  });

  const { handleSubmit, formState: { isSubmitting, isValid, isDirty }, trigger } = methods;
  const [currentStep, setCurrentStep] = useState(1);

  // Initialize persistence hook - always call it but with default values if not enabled
  const persistenceOptions = {
    formId: persistence?.formId || 'default-form',
    autoSave: persistence?.enabled ? persistence.autoSave : false,
  };
  
  const { saveDraft, loadDraft, hasSavedData, clearDraft } = useFormPersistence(methods, persistenceOptions);

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
    if (persistence?.enabled) {
      clearDraft(); // Clear draft on successful submission
    }
  };

  // Wizard Logic
  const totalSteps = schema.meta?.steps?.length || 1;
  const isLastStep = currentStep === totalSteps;

  const nextStep = async () => {
    // Validate fields in current step before proceeding
    const fieldsInStep = Object.values(schema.fields)
      .filter(f => (f.step || 1) === currentStep)
      .map(f => f.name);
    
    const isStepValid = await trigger(fieldsInStep);
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Filter fields for current step in wizard mode
  const visibleFields = mode === 'wizard' 
    ? Object.values(schema.fields).filter(field => (field.step || 1) === currentStep)
    : Object.values(schema.fields);

  const footerClassName = `flex justify-between pt-4 mt-6${showFooterBorder ? ' border-t' : ''}`;
 
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={className}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              {schema.meta?.title && (
                <h2 className="text-2xl font-bold tracking-tight">{schema.meta.title}</h2>
              )}
              {schema.meta?.description && (
                <p className="text-muted-foreground">{schema.meta.description}</p>
              )}
            </div>
            
            {/* Persistence Controls */}
            {persistence?.enabled && (
              <div className="flex gap-2">
                {hasSavedData && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={loadDraft}
                    title="Load saved draft"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Resume Draft
                  </Button>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={saveDraft}
                  disabled={!isDirty}
                  title="Save current progress"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
              </div>
            )}
          </div>

          {/* Wizard Stepper */}
          {mode === 'wizard' && schema.meta?.steps && (
            <WizardStepper 
              steps={schema.meta.steps} 
              currentStep={currentStep} 
            />
          )}

          <div className="grid gap-6">
            {visibleFields.map((field) => (
              <FieldRenderer key={field.name} config={field} />
            ))}
          </div>

          <div className={footerClassName}>
            {mode === 'wizard' && currentStep > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            ) : (
              <div></div> // Spacer
            )}

            <div className="flex items-center gap-2">
              {extraActions}
              {mode === 'wizard' && !isLastStep ? (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting || (schema.meta?.disableOnInvalid && !isValid)}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {submitLabel || schema.meta?.submitButton?.text || 'Submit'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
