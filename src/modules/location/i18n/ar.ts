export default {
  location: {
    title: "المواقع",
    list_title: "المواقع",
    list_description: "إدارة المواقع والمباني والطوابق والمناطق.",
    loading: "جارٍ تحميل المواقع...",
    types: {
      site: "موقع",
      building: "مبنى",
      floor: "طابق",
      zone: "منطقة",
    },
    empty: {
      title: "لا توجد مواقع محددة",
      description:
        "استخدم النظام الخلفي أو بيانات التهيئة لإضافة المواقع والمباني والمناطق.",
    },
    form: {
      create_title: "إضافة موقع",
      edit_title: "تعديل موقع",
      create_subtitle: "إنشاء موقع أو مبنى أو طابق أو منطقة جديدة.",
      edit_subtitle: "تحديث بيانات الموقع والهيكل الهرمي.",
      create_submit: "إنشاء",
      edit_submit: "حفظ التغييرات",
      fields: {
        name: "الاسم",
        type: "النوع",
        parent: "الموقع الأب",
      },
      placeholders: {
        name: "المبنى A - الطابق 1",
        type: "اختر النوع",
        parent: "اختر الموقع الأب (اختياري)",
      },
      parent: {
        root: "بدون أب (موقع رئيسي)",
      },
      validation: {
        name_required: "حقل الاسم مطلوب",
      },
    },
    details: {
      empty_title: "اختر موقعًا",
      empty_description:
        "اختر موقعًا أو مبنى أو طابقًا أو منطقة من الجدول لعرض التفاصيل.",
      add_child: "إضافة فرع",
      fields: {
        id: "المعرّف",
        type: "النوع",
        depth: "العمق",
        order: "الترتيب",
      },
      delete_confirm_title: "حذف الموقع",
      delete_confirm_message:
        "هل أنت متأكد أنك تريد حذف هذا الموقع؟ سيتم إزالته من الهيكل في هذه الجلسة فقط.",
      delete_confirm_cancel: "إلغاء",
      delete_confirm_confirm: "حذف",
    },
  },
};
