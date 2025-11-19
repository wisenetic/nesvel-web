import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import RuleForm from "@/modules/rule/components/rule-form/RuleForm";
import { ruleSchema, type RuleFormValues } from "@/modules/rule/schema";
import type { Rule } from "@/modules/rule/types";

export default function RuleEditPage() {
  const navigate = useNavigate();
  const { translate } = useTranslation();

  const {
    refineCore: { onFinish, query },
    ...form
  } = useForm<RuleFormValues>({
    refineCoreProps: {
      resource: "rules",
    },
    resolver: zodResolver(ruleSchema) as any,
  });

  const handleSubmit = (values: RuleFormValues) => {
    const payload: Partial<Rule> = {
      name: values.name,
      description: values.description || undefined,
      cameraName: values.cameraName || undefined,
      modelName: values.modelName || undefined,
      priority: values.priority,
      conditionsCount: values.conditionsCount,
      severity: values.severity,
      enabled: values.enabled,
      geofencingEnabled: values.geofencingEnabled,
      scheduleEnabled: values.scheduleEnabled,
      confidenceEnabled: values.confidenceEnabled,
      minConfidence: values.minConfidence,
      classFilterEnabled: values.classFilterEnabled,
    };

    onFinish(payload as any);
  };

  if (query?.isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {translate("rule.loading", "Loading rules...")}
      </div>
    );
  }

  return (
    <RuleForm
      form={form}
      mode="edit"
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  );
}
