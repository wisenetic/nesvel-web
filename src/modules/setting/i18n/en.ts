export default {
  setting: {
    title: "Settings",
    page_title: "Settings",
    page_description:
      "Manage your dashboard preferences, notifications, storage, and security.",
    sections: {
      appearance: {
        title: "Appearance",
        description: "Customize the look and feel of your dashboard.",
        theme_mode_label: "Theme mode",
        theme_mode_helper: "Currently using",
        language_label: "Language",
      },
      notifications: {
        title: "Notifications",
        description: "Configure how you receive alerts and notifications.",
        browser_notifications_label: "Browser Notifications",
        browser_notifications_description:
          "Receive desktop notifications for critical alerts.",
        sound_alerts_label: "Sound Alerts",
        sound_alerts_description:
          "Play a sound when fire or smoke is detected.",
        daily_email_label: "Daily Email Digest",
        daily_email_description:
          "Receive a daily summary of detection events.",
      },
      data_storage: {
        title: "Data & Storage",
        description: "Manage data retention and storage preferences.",
        auto_cleanup_label: "Automatic data cleanup",
        auto_cleanup_description:
          "Automatically delete detection events older than",
        save_snapshots_label: "Save Detection Snapshots",
        save_snapshots_description:
          "Store image snapshots of detection events.",
        storage_usage_label: "Storage Usage",
        detection_records: "Detection Records",
        image_snapshots: "Image Snapshots",
        total_used: "Total used",
        of_capacity: "of",
      },
      security: {
        title: "Security",
        description: "Manage security and access control settings.",
        two_factor_label: "Two-Factor Authentication",
        two_factor_description:
          "Add an extra layer of security to your account.",
        session_timeout_label: "Auto Session Timeout",
        session_timeout_description:
          "Automatically log out after inactivity.",
        active_sessions_label: "Active Sessions",
        current_session_label: "Current Session",
      },
      system_info: {
        title: "System Information",
        description: "About this AI vision system.",
        application_name: "Application Name",
        version: "Version",
        build_date: "Build Date",
        environment: "Environment",
        edge_platform: "Edge Platform",
        cloud_provider: "Cloud Provider",
        view_docs: "View Documentation",
        check_updates: "Check for Updates",
      },
    },
  },
};
