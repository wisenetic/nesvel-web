import { field, form, fieldGroup } from '../builder';

/**
 * Pre-built schema to demonstrate advanced conditional logic.
 */
export const logicDemoFormSchema = form({
  role: field.select({
    label: 'Select Role',
    options: [
      { label: 'User', value: 'user' },
      { label: 'Admin', value: 'admin' },
      { label: 'Manager', value: 'manager' },
    ],
    default: 'user',
  }),
  
  // Show only if role is 'admin'
  adminCode: field.text({
    label: 'Admin Access Code',
    required: true,
    showWhen: { field: 'role', op: 'eq', value: 'admin' },
  }),

  // Show if role is 'manager' OR 'admin'
  department: field.select({
    label: 'Department',
    options: [
      { label: 'Sales', value: 'sales' },
      { label: 'Engineering', value: 'engineering' },
    ],
    showWhen: {
      or: [
        { field: 'role', op: 'eq', value: 'manager' },
        { field: 'role', op: 'eq', value: 'admin' },
      ],
    },
  }),

  // Complex nested logic: Show if (Engineering AND Admin) OR (Sales AND Manager)
  budgetApproval: field.checkbox({
    label: 'Has Budget Approval Authority',
    showWhen: {
      or: [
        {
          and: [
            { field: 'department', op: 'eq', value: 'engineering' },
            { field: 'role', op: 'eq', value: 'admin' },
          ],
        },
        {
          and: [
            { field: 'department', op: 'eq', value: 'sales' },
            { field: 'role', op: 'eq', value: 'manager' },
          ],
        },
      ],
    },
  }),
}).withFormMeta({
  title: 'Logic Engine Demo',
  submitLabel: 'Submit',
});
