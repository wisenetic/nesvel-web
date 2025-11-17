import { useTranslation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import AlertRuleForm, {
  type AlertRuleFormValues,
} from "@/modules/alert/components/AlertRuleForm";
import type { AlertRule } from "@/modules/alert/types";

export default function EditAlertRulePage() {
  const navigate = useNavigate();
  const { translate } = useTranslation();

  const {
    refineCore: { onFinish, query },
    ...form
  } = useForm<AlertRuleFormValues>({
    refineCoreProps: {
      resource: "alerts",
    },
  });

  const handleSubmit = (values: AlertRuleFormValues) => {
    const payload: Partial<AlertRule> = {
      name: values.name ?? "",
      detectionType: values.detectionType ?? "fire",
      minConfidence: values.minConfidence ?? 70,
      emailEnabled: Boolean(values.emailEnabled),
      webhookEnabled: Boolean(values.webhookEnabled),
      webhookUrl: values.webhookUrl ?? "",
      enabled: values.enabled ?? true,
      severity: values.severity ?? "warning",
    };

    onFinish(payload as any);
  };

  if (query?.isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {translate("alert.loading", "Loading alerts...")}
      </div>
    );
  }

  return (
    <AlertRuleForm
      form={form}
      mode="edit"
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
      footerSlot={null}
    />
  );
}
