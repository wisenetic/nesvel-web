export default {
  camera: {
    title: "الكاميرات",
    list_title: "الكاميرات",
    list_description: "إدارة كاميرات IP وتدفقات RTSP",
    add_button: "إضافة كاميرا",
    edit_button: "تعديل الكاميرا",
    delete_confirm: "هل أنت متأكد أنك تريد حذف هذه الكاميرا؟",
    delete: "حذف",
    loading: "جارٍ التحميل...",
    select_all: "تحديد الكل",
    filters: {
      all_status: "كل الحالات",
      all_locations: "كل المواقع",
    },
    mode: {
      info: "معلومات",
      live: "مباشر",
    },
    grid: {
      placeholder: "3x3",
    },
    placeholder: {
      no_camera: "لا توجد كاميرا",
    },
    tooltip: {
      fullscreen: "ملء الشاشة",
      snapshot: "لقطة",
    },
    actions: {
      view: "عرض",
      edit: "تحرير",
      download: "تنزيل",
      delete: "حذف",
      close: "إغلاق",
    },
    rec: "REC",
    select_camera: "تحديد الكاميرا",
    player: {
      rtsp_unsupported:
        "لا يمكن تشغيل RTSP مباشرة في المتصفح. يرجى توفير رابط HLS (.m3u8) أو WebRTC أو MJPEG.",
      hls_not_supported:
        "تنسيق HLS غير مدعوم في هذا المتصفح. جرّب Safari أو ثبّت مُشغلًا.",
      hls_missing: "مكتبة hls.js غير متاحة. ثبّتها بالأمر: pnpm add hls.js",
      unsupported_url:
        "رابط بث غير مدعوم. يرجى توفير HLS (.m3u8) أو MP4/WebM أو MJPEG.",
    },
    empty: {
      title: "لا توجد كاميرات مُكوَّنة",
      description: "أضف أول كاميرا لبدء المراقبة",
      add_button: "+ إضافة كاميرا",
    },
    summary: {
      total: "إجمالي الكاميرات",
      online: "متصلة",
      offline: "غير متصلة/خطأ",
      recording: "تسجيل",
    },
    metrics: {
      fps: "إطارات/ث",
      bitrate: "معدل البت",
      latency: "الكمون",
      detections_today: "الكشف اليوم",
      active_rules: "القواعد النشطة",
      uptime: "مدة التشغيل",
    },
    stream: {
      recording: "تسجيل",
      not_recording: "غير مسجل",
      rtsp_label: "رابط RTSP:",
      storage_placeholder: "2.4 جيجابايت / 50 جيجابايت",
    },
    fields: {
      id: "معرّف الكاميرا",
      location: "الموقع",
      rtsp_url: "رابط RTSP",
      status: "الحالة",
      resolution: "الدقة",
      last_seen: "آخر ظهور",
    },
    show: {
      details_title: "تفاصيل الكاميرا",
      not_found: "لم يتم العثور على الكاميرا",
    },
    status: {
      online: "متصلة",
      offline: "غير متصلة",
      error: "خطأ",
      recording: "تسجيل",
    },
  },
};
