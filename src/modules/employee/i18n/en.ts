export default {
  employee: {
    title: "Employees",
    list_title: "Security Personnel",
    list_description: "Manage security employees and work assignments",
    loading: "Loading employees...",
    empty: {
      description:
        "No employees configured yet. Add your first employee to start assigning work.",
    },
    search_placeholder: "Search employees...",
    summary: {
      total_employees: "Total Employees",
      active: "Active",
      on_duty: "On Duty",
      on_leave: "On Leave",
    },
    fields: {
      full_name: "Full Name",
      employee_id: "Employee ID",
      email: "Email",
      phone: "Phone",
      role: "Role",
      shift: "Shift",
      location: "Location",
      status: "Status",
    },
    status: {
      active: "Active",
      on_duty: "On Duty",
      on_leave: "On Leave",
    },
    role: {
      security_guard: "Security Guard",
      supervisor: "Supervisor",
      manager: "Manager",
    },
    shift: {
      morning: "Morning (6AM - 2PM)",
      evening: "Evening (2PM - 10PM)",
      night: "Night (10PM - 6AM)",
    },
    actions: {
      add_employee: "Add Employee",
      edit: "Edit",
      delete: "Delete",
      close: "Close",
    },
    create: {
      title: "Add New Employee",
      subtitle: "Add a new security employee to the system",
      submit: "Add Employee",
    },
    edit: {
      title: "Edit Employee",
      subtitle: "Update employee details and assignments",
      submit: "Save Changes",
    },
    show: {
      not_found: "Employee not found",
    },
    placeholders: {
      status: "Select status",
      role: "Select role",
      shift: "Select shift",
      location: "Building A - Main Entrance",
    },
  },
};
