export default {
  alert: {
    title: "التنبيهات",
    list_title: "تهيئة التنبيهات",
    list_description: "إعداد قواعد التنبيه وإشعارات الاكتشاف",
    loading: "جارٍ تحميل التنبيهات...",
    empty: {
      description:
        "لا توجد أي قواعد تنبيه حالياً. أضف أول قاعدة لتلقي الإشعارات عند الاكتشاف.",
    },
    create: {
      title: "إنشاء قاعدة تنبيه",
      subtitle: "قم بتهيئة كيفية ووقت إرسال التنبيهات عند الاكتشاف",
      submit: "إنشاء قاعدة تنبيه",
    },
    edit: {
      title: "تعديل قاعدة التنبيه",
      subtitle: "حدّث إعدادات التنبيه لهذه القاعدة",
      submit: "تحديث قاعدة التنبيه",
    },
    show: {
      details_title: "تفاصيل قاعدة التنبيه",
      not_found: "لم يتم العثور على قاعدة التنبيه",
    },
    fields: {
      name: "اسم القاعدة",
      detection_type: "نوع الاكتشاف",
      min_confidence: "أدنى نسبة ثقة",
      email_notifications: "إشعارات البريد الإلكتروني",
      webhook_notifications: "إشعارات Webhook",
      webhook_url: "رابط Webhook",
      enabled: "تفعيل هذه القاعدة",
    },
    detectionType: {
      fire: "حريق",
      smoke: "دخان",
      person: "شخص",
      custom: "مخصص",
    },
    sections: {
      notification_methods: "طرق الإشعار",
    },
    help: {
      email_notifications: "إرسال التنبيهات إلى عناوين البريد الإلكتروني المكوّنة",
      webhook_notifications: "إرسال طلب POST إلى نقطة نهاية مخصّصة",
      enabled: "لن تعمل القاعدة إلا عند تفعيلها",
    },
    summary: {
      total_rules: "إجمالي القواعد",
      active_rules: "القواعد المفعّلة",
      disabled_rules: "القواعد المعطّلة",
      critical_alerts: "التنبيهات الحرجة",
    },
    actions: {
      add_rule: "إضافة قاعدة تنبيه",
      edit: "تعديل",
      delete: "حذف",
      confirm_delete_title: "حذف قاعدة التنبيه",
      confirm_delete_message:
        "هل أنت متأكد أنك تريد حذف هذه القاعدة؟ لا يمكن التراجع عن هذا الإجراء.",
      close: "إغلاق",
    },
    badges: {
      email: "بريد إلكتروني",
      webhook: "Webhook",
      no_notifications: "لا توجد إعدادات تنبيه",
    },
    status: {
      enabled: "مفعّل",
      disabled: "معطّل",
    },
    card: {
      subtitle: "قاعدة اكتشاف",
      min_confidence: "أدنى نسبة ثقة: {{value}}%",
    },
    placeholders: {
      name: "تنبيه حريق حرج",
      detection_type: "اختر نوع الاكتشاف",
      webhook_url: "https://example.com/alerts/webhook",
    },
    validation: {
      name_required: "اسم القاعدة مطلوب",
      detection_type_required: "نوع الاكتشاف مطلوب",
    },
  },
};
