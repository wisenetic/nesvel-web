import { useTranslation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import { DynamicForm, field, form } from "@/core/components/shared/dynamic-form";
import type { AlertRule } from "@/modules/alert/types";
import {
  alertRuleSchema,
  type AlertRuleFormValues,
} from "@/modules/alert/schema";

export default function CreateAlertRulePage() {
  const navigate = useNavigate();
  const { translate } = useTranslation();

  // Still use refine's useForm only for integration with the data provider
  const {
    refineCore: { onFinish },
  } = useForm<AlertRuleFormValues>({
    refineCoreProps: {
      resource: "alerts",
    },
  });

  const defaultValues: AlertRuleFormValues = {
    name: "",
    detectionType: "fire",
    minConfidence: 70,
    emailEnabled: false,
    webhookEnabled: false,
    webhookUrl: "",
    enabled: true,
  };

  const alertRuleCreateSchema = form({
    name: field.text({
      label: translate("alert.fields.name", "Rule Name"),
      placeholder: translate(
        "alert.placeholders.name",
        "Critical Fire Alert",
      ),
      required: true,
      description: translate(
        "alert.validation.name_required",
        "Rule name is required",
      ),
    }),
    detectionType: field.select({
      label: translate("alert.fields.detection_type", "Detection Type"),
      required: true,
      options: [
        { label: translate("alert.detectionType.fire", "Fire"), value: "fire" },
        { label: translate("alert.detectionType.smoke", "Smoke"), value: "smoke" },
        { label: translate("alert.detectionType.person", "Person"), value: "person" },
        { label: translate("alert.detectionType.custom", "Custom"), value: "custom" },
      ],
      description: translate(
        "alert.validation.detection_type_required",
        "Detection type is required",
      ),
    }),
    minConfidence: field.text({
      label: translate(
        "alert.fields.min_confidence",
        "Minimum Confidence",
      ),
      placeholder: "70",
      description: translate(
        "alert.help.min_confidence",
        "Enter a value between 0 and 100.",
      ),
    }),
    emailEnabled: field.switch({
      label: translate(
        "alert.fields.email_notifications",
        "Email Notifications",
      ),
      default: false,
      description: translate(
        "alert.help.email_notifications",
        "Send alerts to configured email addresses",
      ),
    }),
    webhookEnabled: field.switch({
      label: translate(
        "alert.fields.webhook_notifications",
        "Webhook Notifications",
      ),
      default: false,
      description: translate(
        "alert.help.webhook_notifications",
        "Send POST request to custom endpoint",
      ),
    }),
    webhookUrl: field.url({
      label: translate("alert.fields.webhook_url", "Webhook URL"),
      placeholder: translate(
        "alert.placeholders.webhook_url",
        "https://example.com/alerts/webhook",
      ),
      showWhen: { field: "webhookEnabled", op: "eq", value: true },
    }),
    enabled: field.switch({
      label: translate(
        "alert.fields.enabled",
        "Enable this alert rule",
      ),
      default: true,
      description: translate(
        "alert.help.enabled",
        "Rule will only trigger when enabled",
      ),
    }),
  }).withFormMeta({
    title: translate("alert.create.title", "Create Alert Rule"),
    description: translate(
      "alert.create.subtitle",
      "Configure when and how you want to be notified about detections",
    ),
    submitLabel: translate("alert.create.submit", "Create Alert Rule"),
  });

  const handleSubmit = (values: any) => {
    const payload: Partial<AlertRule> = {
      name: values.name ?? "",
      detectionType: values.detectionType ?? "fire",
      minConfidence: values.minConfidence
        ? Number(values.minConfidence)
        : 70,
      emailEnabled: Boolean(values.emailEnabled),
      webhookEnabled: Boolean(values.webhookEnabled),
      webhookUrl: values.webhookUrl ?? "",
      enabled: values.enabled ?? true,
      severity: "warning",
    };

    void onFinish(payload as unknown);
  };

  return (
    <div className="w-full max-w-2xl p-6 space-y-6">
      <DynamicForm
        schema={alertRuleCreateSchema}
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
