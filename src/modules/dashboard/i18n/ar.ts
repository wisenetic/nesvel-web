export default {
  dashboard: {
    title: "لوحة التحكم",
    list_title: "لوحة التحكم",
    list_description:
      "نظرة عامة على نظام الرؤية بالذكاء الاصطناعي وحالة الكاميرات والتنبيهات.",
    loading: "جاري تحميل بيانات لوحة التحكم...",
    metrics: {
      active_cameras: "الكاميرات النشطة",
      fire_detections: "اكتشافات الحريق",
      smoke_detections: "اكتشافات الدخان",
      unacknowledged_alerts: "التنبيهات غير المعتمدة",
    },
    charts: {
      detections_24h: "اتجاهات الاكتشاف (آخر 24 ساعة)",
      detections_24h_desc: "أحداث الاكتشاف في الوقت الفعلي حسب النوع.",
      camera_status_distribution: "توزيع حالة الكاميرات",
      camera_status_distribution_desc: "الحالة الحالية لجميع الكاميرات.",
      top_detection_types: "أكثر أنواع الاكتشاف شيوعًا",
      top_detection_types_desc: "أكثر أنواع الاكتشاف تكرارًا في النظام.",
      alert_severity_breakdown: "توزيع شدة التنبيهات",
      alert_severity_breakdown_desc: "توزيع التنبيهات حسب مستوى الشدة.",
      weekly_detection_heatmap: "مخطط حراري أسبوعي للاكتشافات",
      weekly_detection_heatmap_desc: "عدد الاكتشافات حسب اليوم وفترة اليوم.",
    },
    recent_detections: {
      title: "أحدث الاكتشافات",
      description: "أحدث أحداث اكتشاف الحريق والدخان والأجسام.",
      columns: {
        type: "النوع",
        camera: "الكاميرا",
        time: "الوقت",
        status: "الحالة",
      },
      status: {
        new: "جديد",
        acknowledged: "تم الاعتماد",
      },
      empty: "لا توجد اكتشافات حتى الآن. ستظهر هنا عند تسجيل أحداث جديدة.",
    },
    camera_status: {
      title: "حالة الكاميرات",
      description: "نظرة عامة على جميع الكاميرات المتصلة.",
      columns: {
        camera: "الكاميرا",
        location: "الموقع",
        status: "الحالة",
        action: "الإجراء",
      },
      actions: {
        view_stream: "عرض البث",
      },
    },
    status: {
      online: "متصلة",
      error: "خطأ",
    },
    severity: {
      critical: "حرج",
      warning: "تحذير",
      info: "معلومات",
    },
    time_of_day: {
      night: "الليل",
      morning: "الصباح",
      afternoon: "بعد الظهر",
      evening: "المساء",
    },
  },
};
