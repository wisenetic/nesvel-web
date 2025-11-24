import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import { AlertRuleForm } from "@/modules/alert/components/alert-rule-form";
import {
  alertRuleSchema,
  type AlertRuleFormValues,
} from "@/modules/alert/schema";

export default function CreateAlertRulePage() {
  const navigate = useNavigate();

  const form = useForm<AlertRuleFormValues>({
    refineCoreProps: {
      resource: "alerts",
    },
    // Cast resolver to any to satisfy react-hook-form + refine typing while
    // still getting proper runtime validation from zod.
    resolver: zodResolver(alertRuleSchema) as unknown,
    defaultValues: {
      name: "",
      detectionType: "fire",
      minConfidence: 70,
      emailEnabled: false,
      webhookEnabled: false,
      webhookUrl: "",
      enabled: true,
    },
  });

  const {
    refineCore: { onFinish },
  } = form;

  const handleSubmit = (values: AlertRuleFormValues) => {
    void onFinish(values as unknown);
  };

  return (
    <AlertRuleForm
      form={form}
      mode="create"
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  );
}
