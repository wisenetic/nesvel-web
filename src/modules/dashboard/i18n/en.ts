export default {
  dashboard: {
    title: "Dashboard",
    list_title: "Dashboard",
    list_description: "AI vision system overview, detections, and camera health.",
    loading: "Loading dashboard data...",
    metrics: {
      active_cameras: "Active Cameras",
      fire_detections: "Fire Detections",
      smoke_detections: "Smoke Detections",
      unacknowledged_alerts: "Unacknowledged Alerts",
    },
    charts: {
      detections_24h: "Detection Trends (24h)",
      detections_24h_desc: "Real-time detection events by type.",
      camera_status_distribution: "Camera Status Distribution",
      camera_status_distribution_desc: "Current status of all cameras.",
      top_detection_types: "Top Detection Types",
      top_detection_types_desc: "Most frequent detection types across the system.",
      alert_severity_breakdown: "Alert Severity Breakdown",
      alert_severity_breakdown_desc: "Distribution of alerts by severity.",
      weekly_detection_heatmap: "Weekly Detection Heatmap",
      weekly_detection_heatmap_desc: "Detections by day and time of day.",
    },
    recent_detections: {
      title: "Recent Detections",
      description: "Latest fire, smoke, and object detection events.",
      columns: {
        type: "Type",
        camera: "Camera",
        time: "Time",
        status: "Status",
      },
      status: {
        new: "New",
        acknowledged: "Acknowledged",
      },
      empty:
        "No detections yet. They will appear here once events are captured.",
    },
    camera_status: {
      title: "Camera Status",
      description: "Overview of all connected cameras.",
      columns: {
        camera: "Camera",
        location: "Location",
        status: "Status",
        action: "Action",
      },
      actions: {
        view_stream: "View Stream",
      },
    },
    status: {
      online: "Online",
      error: "Error",
    },
    severity: {
      critical: "Critical",
      warning: "Warning",
      info: "Info",
    },
    time_of_day: {
      night: "Night",
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
    },
  },
};
