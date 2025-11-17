export default {
  alert: {
    title: "Alerts",
    list_title: "Alert Configuration",
    list_description: "Configure detection alerts and notification rules",
    loading: "Loading alerts...",
    empty: {
      description:
        "No alert rules configured yet. Add your first rule to get notified about detections.",
    },
    create: {
      title: "Create Alert Rule",
      subtitle: "Configure when and how you want to be notified about detections",
      submit: "Create Alert Rule",
    },
    edit: {
      title: "Edit Alert Rule",
      subtitle: "Update when and how you want to be notified about detections",
      submit: "Update Alert Rule",
    },
    show: {
      details_title: "Alert Rule Details",
      not_found: "Alert rule not found",
    },
    fields: {
      name: "Rule Name",
      detection_type: "Detection Type",
      min_confidence: "Minimum Confidence",
      email_notifications: "Email Notifications",
      webhook_notifications: "Webhook Notifications",
      webhook_url: "Webhook URL",
      enabled: "Enable this alert rule",
    },
    detectionType: {
      fire: "Fire",
      smoke: "Smoke",
      person: "Person",
      custom: "Custom",
    },
    sections: {
      notification_methods: "Notification Methods",
    },
    help: {
      email_notifications: "Send alerts to configured email addresses",
      webhook_notifications: "Send POST request to custom endpoint",
      enabled: "Rule will only trigger when enabled",
    },
    summary: {
      total_rules: "Total Rules",
      active_rules: "Active Rules",
      disabled_rules: "Disabled Rules",
      critical_alerts: "Critical Alerts",
    },
    actions: {
      add_rule: "Add Alert Rule",
      edit: "Edit",
      delete: "Delete",
      confirm_delete_title: "Delete alert rule",
      confirm_delete_message:
        "Are you sure you want to delete this alert rule? This action cannot be undone.",
      close: "Close",
    },
    badges: {
      email: "Email",
      webhook: "Webhook",
      no_notifications: "No notifications configured",
    },
    status: {
      enabled: "Enabled",
      disabled: "Disabled",
    },
    card: {
      subtitle: "Detection rule",
      min_confidence: "Min confidence: {{value}}%",
    },
    placeholders: {
      name: "Critical Fire Alert",
      detection_type: "Select detection type",
      webhook_url: "https://example.com/alerts/webhook",
    },
    validation: {
      name_required: "Rule name is required",
      detection_type_required: "Detection type is required",
    },
  },
};
