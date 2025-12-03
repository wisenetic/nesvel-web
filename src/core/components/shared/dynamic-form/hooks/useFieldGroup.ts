import { useState, useCallback } from 'react';
import { IFieldGroup } from '../interfaces/field-group.interface';

/**
 * Custom hook for managing field group state, such as collapse/expand.
 * 
 * @param {IFieldGroup} group - The field group configuration.
 * @returns {Object} The group state and handlers.
 */
export const useFieldGroup = (group: IFieldGroup) => {
  const [isExpanded, setIsExpanded] = useState(!group.collapsible);

  const toggleExpand = useCallback(() => {
    if (group.collapsible) {
      setIsExpanded((prev) => !prev);
    }
  }, [group.collapsible]);

  return {
    isExpanded,
    toggleExpand,
    label: group.label,
    layout: group.layout,
  };
};
