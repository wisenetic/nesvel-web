/**
 * Evaluates a condition against a set of values.
 * 
 * @param {Function} condition - The condition function to evaluate.
 * @param {any} values - The current form values.
 * @returns {boolean} The result of the evaluation.
 */
export const evaluateCondition = (
  condition: ((values: any) => boolean) | undefined,
  values: any
): boolean => {
  if (!condition) return true;
  try {
    return condition(values);
  } catch (error) {
    console.warn('Condition evaluation failed:', error);
    return true;
  }
};
