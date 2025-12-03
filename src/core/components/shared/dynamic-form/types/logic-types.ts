/**
 * Supported comparison operators for conditional logic.
 */
export type LogicOperator = 
  | 'eq'       // Equal
  | 'neq'      // Not Equal
  | 'gt'       // Greater Than
  | 'gte'      // Greater Than or Equal
  | 'lt'       // Less Than
  | 'lte'      // Less Than or Equal
  | 'contains' // String/Array contains
  | 'regex'    // Regular Expression match
  | 'exists'   // Value is not null/undefined/empty
  | 'not_exists'; // Value is null/undefined/empty

/**
 * A single condition rule.
 */
export interface LogicRule {
  field: string;
  op: LogicOperator;
  value?: any;
}

/**
 * A group of conditions combined with AND/OR logic.
 */
export interface LogicGroup {
  and?: (LogicRule | LogicGroup)[];
  or?: (LogicRule | LogicGroup)[];
}

/**
 * Type alias for a condition, which can be a single rule or a group.
 */
export type Condition = LogicRule | LogicGroup;
