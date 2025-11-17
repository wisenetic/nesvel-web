export default {
  camera: {
    title: "Cameras",
    list_title: "Cameras",
    list_description: "Manage IP cameras and RTSP streams",
    add_button: "Add Camera",
    edit_button: "Edit Camera",
    delete_confirm: "Are you sure you want to delete this camera?",
    delete: "Delete",
    loading: "Loading...",
    select_all: "Select All",
    filters: {
      all_status: "All Status",
      all_locations: "All Locations",
    },
    mode: {
      info: "Info",
      live: "Live",
    },
    grid: {
      placeholder: "3x3",
    },
    placeholder: {
      no_camera: "No camera",
    },
    tooltip: {
      fullscreen: "Fullscreen",
      snapshot: "Snapshot",
    },
    actions: {
      view: "View",
      edit: "Edit",
      download: "Download",
      delete: "Delete",
      close: "Close",
    },
    rec: "REC",
    select_camera: "Select camera",
    player: {
      rtsp_unsupported:
        "RTSP is not playable directly in browsers. Please expose an HLS (.m3u8), WebRTC, or MJPEG URL for this stream.",
      hls_not_supported:
        "HLS is not supported in this browser. Try Safari or install a player.",
      hls_missing: "hls.js not available. Install it with: pnpm add hls.js",
      unsupported_url:
        "Unsupported stream URL. Please provide HLS (.m3u8), MP4/WebM, or MJPEG.",
    },
    empty: {
      title: "No cameras configured",
      description: "Add your first camera to start monitoring",
      add_button: "+ Add Camera",
    },
    summary: {
      total: "Total Cameras",
      online: "Online",
      offline: "Offline/Error",
      recording: "Recording",
    },
    metrics: {
      fps: "FPS",
      bitrate: "Bitrate",
      latency: "Latency",
      detections_today: "Detections Today",
      active_rules: "Active Rules",
      uptime: "Uptime",
    },
    stream: {
      recording: "Recording",
      not_recording: "Not recording",
      rtsp_label: "RTSP URL:",
      storage_placeholder: "2.4 GB / 50 GB",
    },
    fields: {
      id: "Camera ID",
      location: "Location",
      rtsp_url: "RTSP URL",
      status: "Status",
      resolution: "Resolution",
      last_seen: "Last Seen",
    },
    show: {
      details_title: "Camera Details",
      not_found: "Camera not found",
    },
    status: {
      online: "Online",
      offline: "Offline",
      error: "Error",
      recording: "Recording",
    },
  },
};
