import { Condition, LogicGroup, LogicRule } from '../types/logic-types';
import { get } from 'react-hook-form';

/**
 * Evaluates a single logic rule against form values.
 * 
 * @param {LogicRule} rule - The rule to evaluate.
 * @param {any} values - The current form values.
 * @returns {boolean} True if the rule passes, false otherwise.
 */
const evaluateRule = (rule: LogicRule, values: any): boolean => {
  const fieldValue = get(values, rule.field);
  const targetValue = rule.value;

  switch (rule.op) {
    case 'eq':
      return fieldValue == targetValue; // Loose equality for string/number matching
    case 'neq':
      return fieldValue != targetValue;
    case 'gt':
      return Number(fieldValue) > Number(targetValue);
    case 'gte':
      return Number(fieldValue) >= Number(targetValue);
    case 'lt':
      return Number(fieldValue) < Number(targetValue);
    case 'lte':
      return Number(fieldValue) <= Number(targetValue);
    case 'contains':
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(targetValue);
      }
      return String(fieldValue || '').includes(String(targetValue));
    case 'regex':
      return new RegExp(targetValue).test(String(fieldValue || ''));
    case 'exists':
      return fieldValue !== null && fieldValue !== undefined && fieldValue !== '';
    case 'not_exists':
      return fieldValue === null || fieldValue === undefined || fieldValue === '';
    default:
      return false;
  }
};

/**
 * Recursively evaluates a condition (rule or group) against form values.
 * 
 * @param {Condition} condition - The condition to evaluate.
 * @param {any} values - The current form values.
 * @returns {boolean} True if the condition passes.
 */
export const evaluateCondition = (condition: Condition, values: any): boolean => {
  if ('and' in condition) {
    return (condition.and || []).every(subCondition => evaluateCondition(subCondition, values));
  }
  
  if ('or' in condition) {
    return (condition.or || []).some(subCondition => evaluateCondition(subCondition, values));
  }

  return evaluateRule(condition as LogicRule, values);
};
