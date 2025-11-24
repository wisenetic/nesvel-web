export default {
  rule: {
    title: "Rules",
    list_title: "Rules Engine",
    list_description: "Configure detection rules with advanced conditions",
    loading: "Loading rules...",
    empty: {
      description:
        "No rules configured yet. Create your first rule to start automating alerts.",
    },
    create: {
      title: "Create New Rule",
      subtitle: "Configure detection rules with cameras, models, and conditions",
      submit: "Create Rule",
    },
    edit: {
      title: "Edit Rule",
      subtitle: "Update detection rule configuration and conditions",
      submit: "Update Rule",
    },
    show: {
      details_title: "Rule Details",
      not_found: "Rule not found",
    },
    fields: {
      name: "Rule Name",
      description: "Description",
      camera: "Camera",
      model: "AI Model",
      priority: "Priority",
      conditions: "Conditions",
      severity: "Severity",
      enabled: "Enable this rule",
    },
    severity: {
      critical: "Critical",
      high: "High",
      medium: "Medium",
      low: "Low",
    },
    help: {
      enabled: "Rule will only execute when enabled",
    },
    conditions_ui: {
      tab_basic: "Basic Info",
      tab_conditions: "Conditions",
      geofencing_title: "Geofencing",
      geofencing_description: "Define polygon zones for detection",
      schedule_title: "Time Schedule",
      schedule_description: "Set active hours for detection",
      schedule_schedules: "Schedules",
      schedule_add: "Add schedule",
      schedule_empty: "No schedules configured yet",
      schedule_days: "Active days",
      schedule_start: "Start time",
      schedule_end: "End time",
      schedule_helper: "Rule will only run during selected days and hours",
      confidence_title: "Confidence Threshold",
      confidence_description: "Minimum detection confidence level",
      confidence_label: "Minimum Confidence",
      confidence_helper:
        "Only detections with confidence ≥ {{value}}% will trigger this rule",
      class_filter_title: "Object Class Filter",
      class_filter_description: "Specify which object types to detect",
      class_filter_allowed: "Allowed Object Classes",
      class_filter_detecting: "Detecting: {{classes}}",
    },
    summary: {
      total_rules: "Total Rules",
      active_rules: "Active Rules",
      cameras_monitored: "Cameras Monitored",
      models_used: "Models Used",
    },
    actions: {
      add_rule: "Create Rule",
      edit: "Edit Rule",
      delete: "Delete",
      view_details: "View details",
      close: "Close",
      confirm_delete_title: "Delete rule",
      confirm_delete_message:
        "Are you sure you want to delete this rule? This action cannot be undone.",
    },
    status: {
      enabled: "Enabled",
      disabled: "Disabled",
    },
    conditions: {
      active: "active",
    },
    placeholders: {
      name: "Fire Detection - Warehouse",
      description:
        "Monitor area for fire and smoke using high-accuracy detection model",
      camera: "Camera 5",
      model: "Fire Detection Model v2",
      severity: "Select severity",
    },
    validation: {
      name_required: "Rule name is required",
    },
  },
};
