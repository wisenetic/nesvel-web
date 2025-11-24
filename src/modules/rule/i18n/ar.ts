export default {
  rule: {
    title: "القواعد",
    list_title: "محرك القواعد",
    list_description: "تهيئة قواعد الكشف مع شروط متقدمة",
    loading: "جارٍ تحميل القواعد...",
    empty: {
      description:
        "لا توجد أي قواعد حتى الآن. أنشئ أول قاعدة لبدء أتمتة التنبيهات.",
    },
    create: {
      title: "إنشاء قاعدة جديدة",
      subtitle: "تهيئة قواعد الكشف باستخدام الكاميرات والنماذج والشروط",
      submit: "إنشاء القاعدة",
    },
    edit: {
      title: "تعديل القاعدة",
      subtitle: "حدّث إعدادات القاعدة وشروطها",
      submit: "تحديث القاعدة",
    },
    show: {
      details_title: "تفاصيل القاعدة",
      not_found: "لم يتم العثور على القاعدة",
    },
    fields: {
      name: "اسم القاعدة",
      description: "الوصف",
      camera: "الكاميرا",
      model: "نموذج الذكاء الاصطناعي",
      priority: "الأولوية",
      conditions: "الشروط",
      severity: "درجة الأهمية",
      enabled: "تفعيل هذه القاعدة",
    },
    severity: {
      critical: "حرجة",
      high: "مرتفعة",
      medium: "متوسطة",
      low: "منخفضة",
    },
    help: {
      enabled: "لن يتم تنفيذ القاعدة إلا عند تفعيلها",
    },
    conditions_ui: {
      tab_basic: "المعلومات الأساسية",
      tab_conditions: "الشروط",
      geofencing_title: "الأسلاك الجغرافية",
      geofencing_description: "تحديد مناطق متعددة الأضلاع للكشف",
      schedule_title: "الجدول الزمني",
      schedule_description: "تعيين ساعات العمل النشطة للكشف",
      confidence_title: "حد الثقة",
      confidence_description: "أدنى مستوى لثقة الكشف",
      confidence_label: "أدنى نسبة ثقة",
      confidence_helper:
        "لن تُفعّل القاعدة إلا للكشوفات ذات الثقة ≥ {{value}}٪",
      class_filter_title: "تصفية فئات الأجسام",
      class_filter_description: "تحديد أنواع الأجسام المطلوب اكتشافها",
      class_filter_allowed: "الفئات المسموح بها",
      class_filter_detecting: "يتم الاكتشاف لـ: {{classes}}",
    },
    summary: {
      total_rules: "إجمالي القواعد",
      active_rules: "القواعد المفعّلة",
      cameras_monitored: "الكاميرات المراقَبة",
      models_used: "النماذج المستخدمة",
    },
    actions: {
      add_rule: "إنشاء قاعدة",
      edit: "تعديل القاعدة",
      delete: "حذف",
      view_details: "عرض التفاصيل",
      close: "إغلاق",
      confirm_delete_title: "حذف القاعدة",
      confirm_delete_message:
        "هل أنت متأكد من حذف هذه القاعدة؟ لا يمكن التراجع عن هذا الإجراء.",
    },
    status: {
      enabled: "مفعّلة",
      disabled: "معطّلة",
    },
    conditions: {
      active: "مفعّلة",
    },
    placeholders: {
      name: "كشف الحريق - المستودع",
      description:
        "مراقبة المنطقة للكشف عن الحريق والدخان باستخدام نموذج كشف عالي الدقة",
      camera: "كاميرا 5",
      model: "نموذج كشف الحريق الإصدار 2",
      severity: "اختر درجة الأهمية",
    },
    validation: {
      name_required: "اسم القاعدة مطلوب",
    },
  },
};
