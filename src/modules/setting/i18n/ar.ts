export default {
  setting: {
    title: "الإعدادات",
    page_title: "الإعدادات",
    page_description:
      "إدارة تفضيلات لوحة التحكم، الإشعارات، التخزين، وإعدادات الأمان.",
    sections: {
      appearance: {
        title: "المظهر",
        description: "تخصيص شكل ولوحة التحكم.",
        theme_mode_label: "وضع الثيم",
        theme_mode_helper: "الوضع الحالي",
        language_label: "اللغة",
      },
      notifications: {
        title: "الإشعارات",
        description: "تهيئة كيفية استلام التنبيهات والإشعارات.",
        browser_notifications_label: "إشعارات المتصفح",
        browser_notifications_description:
          "استقبال إشعارات سطح المكتب للتنبيهات الحرجة.",
        sound_alerts_label: "التنبيهات الصوتية",
        sound_alerts_description:
          "تشغيل صوت عند اكتشاف حريق أو دخان.",
        daily_email_label: "ملخص بريد إلكتروني يومي",
        daily_email_description:
          "استقبال ملخص يومي لأحداث الاكتشاف.",
      },
      data_storage: {
        title: "البيانات والتخزين",
        description: "إدارة الاحتفاظ بالبيانات وتفضيلات التخزين.",
        auto_cleanup_label: "تنظيف البيانات تلقائيًا",
        auto_cleanup_description:
          "حذف أحداث الاكتشاف الأقدم من",
        save_snapshots_label: "حفظ لقطات الاكتشاف",
        save_snapshots_description:
          "تخزين لقطات الصور لأحداث الاكتشاف.",
        storage_usage_label: "استخدام التخزين",
        detection_records: "سجلات الاكتشاف",
        image_snapshots: "لقطات الصور",
        total_used: "الاستخدام الكلي",
        of_capacity: "من أصل",
      },
      security: {
        title: "الأمان",
        description: "إدارة إعدادات الأمان والتحكم بالوصول.",
        two_factor_label: "المصادقة الثنائية",
        two_factor_description:
          "إضافة طبقة إضافية من الأمان لحسابك.",
        session_timeout_label: "انتهاء الجلسة تلقائيًا",
        session_timeout_description:
          "تسجيل الخروج تلقائيًا بعد فترة من عدم النشاط.",
        active_sessions_label: "الجلسات النشطة",
        current_session_label: "الجلسة الحالية",
      },
      system_info: {
        title: "معلومات النظام",
        description: "معلومات حول نظام الرؤية بالذكاء الاصطناعي.",
        application_name: "اسم التطبيق",
        version: "الإصدار",
        build_date: "تاريخ البناء",
        environment: "بيئة العمل",
        edge_platform: "منصة الحافة",
        cloud_provider: "موفر السحابة",
        view_docs: "عرض الوثائق",
        check_updates: "التحقق من التحديثات",
      },
    },
  },
};
