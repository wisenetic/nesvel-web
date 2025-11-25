export default {
  detection: {
    title: "Detections",
    list_title: "Detections",
    list_description: "View and manage all AI detection events.",
    loading: "Loading detections...",
    empty: {
      description:
        "No detections to display yet. They will appear here when events are detected.",
    },
    fields: {
      camera: "Camera",
      time: "Time",
      confidence: "Confidence",
      status: "Status",
      type: "Type",
      class: "Class",
    },
    status: {
      new: "New",
      acknowledged: "Acknowledged",
    },
    types: {
      person: "Person",
      smoke: "Smoke",
      fire: "Fire",
      vehicle: "Vehicle",
      other: "Other",
    },
    filters: {
      label: "Filter and narrow down detection events",
      all_types: "All Types",
      all_status: "All Status",
      reset: "Reset",
    },
    actions: {
      view_details: "View Details",
      acknowledge: "Acknowledge",
    },
    summary: {
      total: "Total Detections",
      new: "New",
      acknowledged: "Acknowledged",
      critical: "Critical Alerts",
    },
  },
};
