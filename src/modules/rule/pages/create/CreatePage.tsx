import { useTranslation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import { DynamicForm, field, form } from "@/core/components/shared/dynamic-form";
import { type RuleFormValues } from "@/modules/rule/schema";
import type { Rule } from "@/modules/rule/types";

export default function RuleCreatePage() {
  const navigate = useNavigate();
  const { translate } = useTranslation();

  const {
    refineCore: { onFinish },
  } = useForm<RuleFormValues>({
    refineCoreProps: {
      resource: "rules",
    },
  });

  const defaultValues: RuleFormValues = {
    name: "",
    description: "",
    cameraName: "",
    modelName: "",
    priority: 100,
    conditionsCount: 2,
    severity: "high",
    enabled: true,
    geofencingEnabled: false,
    scheduleEnabled: false,
    confidenceEnabled: true,
    minConfidence: 70,
    classFilterEnabled: false,
  };

  const ruleCreateSchema = form({
    name: field.text({
      label: translate("rule.fields.name", "Rule Name"),
      placeholder: translate(
        "rule.placeholders.name",
        "Fire Detection - Warehouse",
      ),
      required: true,
      description: translate(
        "rule.validation.name_required",
        "Rule name is required",
      ),
    }),
    description: field.textarea({
      label: translate("rule.fields.description", "Description"),
      placeholder: translate(
        "rule.placeholders.description",
        "Monitor area for fire and smoke using high-accuracy detection model",
      ),
      required: false,
    }),
    cameraName: field.text({
      label: translate("rule.fields.camera", "Camera"),
      placeholder: translate(
        "rule.placeholders.camera",
        "Camera 5 - Warehouse - Section 1",
      ),
      required: false,
    }),
    modelName: field.text({
      label: translate("rule.fields.model", "AI Model"),
      placeholder: translate(
        "rule.placeholders.model",
        "Fire Detection Model v2",
      ),
      required: false,
    }),
    priority: field.text({
      label: translate("rule.fields.priority", "Priority"),
      placeholder: "100",
      description: translate(
        "rule.fields.priority_helper",
        "Higher priority rules are evaluated first",
      ),
    }),
    conditionsCount: field.text({
      label: translate("rule.fields.conditions_count", "Conditions"),
      placeholder: "2",
    }),
    severity: field.select({
      label: translate("rule.fields.severity", "Severity"),
      required: true,
      options: [
        { label: translate("rule.severity.critical", "Critical"), value: "critical" },
        { label: translate("rule.severity.high", "High"), value: "high" },
        { label: translate("rule.severity.medium", "Medium"), value: "medium" },
        { label: translate("rule.severity.low", "Low"), value: "low" },
      ],
    }),
    enabled: field.switch({
      label: translate("rule.fields.enabled", "Enable this rule"),
      default: true,
      description: translate(
        "rule.help.enabled",
        "Rule will only execute when enabled",
      ),
    }),
    geofencingEnabled: field.switch({
      label: translate(
        "rule.conditions_ui.geofencing_title",
        "Geofencing",
      ),
      default: false,
      description: translate(
        "rule.conditions_ui.geofencing_description",
        "Define polygon zones for detection",
      ),
    }),
    scheduleEnabled: field.switch({
      label: translate(
        "rule.conditions_ui.schedule_title",
        "Time Schedule",
      ),
      default: false,
      description: translate(
        "rule.conditions_ui.schedule_description",
        "Set active hours for detection",
      ),
    }),
    confidenceEnabled: field.switch({
      label: translate(
        "rule.conditions_ui.confidence_title",
        "Confidence Threshold",
      ),
      default: true,
      description: translate(
        "rule.conditions_ui.confidence_description",
        "Minimum detection confidence level",
      ),
    }),
    minConfidence: field.text({
      label: translate(
        "rule.conditions_ui.confidence_label",
        "Minimum Confidence",
      ),
      placeholder: "70",
      description: translate(
        "rule.conditions_ui.confidence_helper",
        "Only detections with confidence above this value will trigger",
      ),
      showWhen: { field: "confidenceEnabled", op: "eq", value: true },
    }),
    classFilterEnabled: field.switch({
      label: translate(
        "rule.conditions_ui.class_filter_title",
        "Object Class Filter",
      ),
      default: false,
      description: translate(
        "rule.conditions_ui.class_filter_description",
        "Specify which object types to detect",
      ),
    }),
  }).withFormMeta({
    title: translate("rule.create.title", "Create Rule"),
    description: translate(
      "rule.create.subtitle",
      "Configure detection rules with advanced conditions",
    ),
    submitLabel: translate("rule.create.submit", "Create Rule"),
  });

  const handleSubmit = (values: any) => {
    const payload: Partial<Rule> = {
      name: values.name,
      description: values.description || undefined,
      cameraName: values.cameraName || undefined,
      modelName: values.modelName || undefined,
      priority: values.priority ? Number(values.priority) : 100,
      conditionsCount: values.conditionsCount
        ? Number(values.conditionsCount)
        : 2,
      severity: values.severity,
      enabled: Boolean(values.enabled),
      geofencingEnabled: Boolean(values.geofencingEnabled),
      scheduleEnabled: Boolean(values.scheduleEnabled),
      confidenceEnabled: Boolean(values.confidenceEnabled),
      minConfidence: values.minConfidence
        ? Number(values.minConfidence)
        : 70,
      classFilterEnabled: Boolean(values.classFilterEnabled),
    };

    void onFinish(payload as unknown);
  };

  return (
    <div className="w-full max-w-2xl p-6 space-y-6">
      <DynamicForm
        schema={ruleCreateSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        className="space-y-4"
        showFooterBorder={false}
        extraActions={(
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border bg-background px-3 py-1 text-sm font-medium text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground"
            onClick={() => navigate(-1)}
          >
            {translate("buttons.cancel", "Cancel")}
          </button>
        )}
      />
    </div>
  );
}
