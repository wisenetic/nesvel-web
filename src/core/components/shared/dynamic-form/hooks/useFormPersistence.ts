import { useEffect, useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

/**
 * Configuration options for form persistence.
 */
interface PersistenceOptions {
  /**
   * Unique key to identify the form data in storage.
   */
  formId: string;
  
  /**
   * Whether auto-save is enabled.
   * @default false
   */
  autoSave?: boolean;
  
  /**
   * Auto-save interval in milliseconds.
   * @default 5000
   */
  autoSaveInterval?: number;
}

/**
 * Custom hook to handle saving and restoring form data using local storage.
 * Uses native localStorage API instead of external library.
 * 
 * @param {UseFormReturn<any>} formMethods - The form methods from react-hook-form.
 * @param {PersistenceOptions} options - Configuration options.
 * @returns {Object} Methods to manually save, load, and clear data.
 */
export const useFormPersistence = (
  formMethods: UseFormReturn<any>,
  options: PersistenceOptions
) => {
  const { getValues, reset } = formMethods;
  const storageKey = `form_draft_${options.formId}`;
  
  const [hasSavedData, setHasSavedData] = useState(false);

  // Check if there's saved data on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(storageKey);
      setHasSavedData(!!savedData);
    } catch (error) {
      console.error('Failed to check saved data:', error);
    }
  }, [storageKey]);

  /**
   * Manually saves the current form values to local storage.
   */
  const saveDraft = useCallback(() => {
    try {
      const values = getValues();
      localStorage.setItem(storageKey, JSON.stringify(values));
      setHasSavedData(true);
      toast.success('Draft saved successfully');
    } catch (error) {
      console.error('Failed to save draft:', error);
      toast.error('Failed to save draft');
    }
  }, [getValues, storageKey]);

  /**
   * Loads saved data into the form.
   */
  const loadDraft = useCallback(() => {
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        reset(parsedData);
        toast.info('Draft loaded');
        return parsedData;
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
      toast.error('Failed to load draft');
    }
    return null;
  }, [storageKey, reset]);

  /**
   * Clears the saved draft from storage.
   */
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
      setHasSavedData(false);
    } catch (error) {
      console.error('Failed to clear draft:', error);
    }
  }, [storageKey]);

  // Handle Auto-save
  useEffect(() => {
    if (!options.autoSave) return;

    const intervalId = setInterval(() => {
      const values = getValues();
      // Only save if form is dirty to avoid overwriting with empty initial state unnecessarily
      if (formMethods.formState.isDirty) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(values));
          setHasSavedData(true);
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    }, options.autoSaveInterval || 5000);

    return () => clearInterval(intervalId);
  }, [options.autoSave, options.autoSaveInterval, getValues, storageKey, formMethods.formState.isDirty]);

  return {
    saveDraft,
    loadDraft,
    clearDraft,
    hasSavedData,
    savedDataTimestamp: null,
  };
};
