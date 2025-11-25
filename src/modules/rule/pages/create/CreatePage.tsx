import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import RuleForm from "@/modules/rule/components/rule-form/RuleForm";
import { ruleSchema, type RuleFormValues } from "@/modules/rule/schema";
import type { Rule } from "@/modules/rule/types";

export default function RuleCreatePage() {
  const navigate = useNavigate();

  const form = useForm<RuleFormValues>({
    refineCoreProps: {
      resource: "rules",
    },
    resolver: zodResolver(ruleSchema) as any,
    defaultValues: {
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
    },
  });

  const {
    refineCore: { onFinish },
  } = form;

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

    void onFinish(payload as unknown);
  };

  return (
    <RuleForm
      form={form}
      mode="create"
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  );
}
