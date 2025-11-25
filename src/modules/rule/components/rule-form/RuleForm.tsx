import { useTranslation } from "@refinedev/core";
import { type UseFormReturnType } from "@refinedev/react-hook-form";
import type { ReactNode } from "react";

import { RuleBasicTab } from "./RuleBasicTab";
import { RuleConditionsTab } from "./RuleConditionsTab";

import { Button } from "@/core/components/ui/button";
import { Form } from "@/core/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/core/components/ui/tabs";
import type { RuleFormValues } from "@/modules/rule/schema";

export type RuleFormProps = {
  form: UseFormReturnType<any, any, RuleFormValues>;
  mode: "create" | "edit";
  onSubmit: (values: RuleFormValues) => void;
  onCancel: () => void;
  footerSlot?: ReactNode;
};

export function RuleForm({
  form,
  mode,
  onSubmit,
  onCancel,
  footerSlot,
}: RuleFormProps) {
  const { translate } = useTranslation();

  const title =
    mode === "create"
      ? translate("rule.create.title", "Create Rule")
      : translate("rule.edit.title", "Edit Rule");

  const subtitle =
    mode === "create"
      ? translate(
          "rule.create.subtitle",
          "Configure detection rules with advanced conditions",
        )
      : translate(
          "rule.edit.subtitle",
          "Update detection rule configuration and conditions",
        );

  const submitLabel =
    mode === "create"
      ? translate("rule.create.submit", "Create Rule")
      : translate("rule.edit.submit", "Update Rule");

  const minConfidence = form.watch("minConfidence") ?? 70;

  return (
    <div className="w-full max-w-2xl p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="basic" className="flex-1">
                {translate("rule.conditions_ui.tab_basic", "Basic Info")}
              </TabsTrigger>
              <TabsTrigger value="conditions" className="flex-1">
                {translate("rule.conditions_ui.tab_conditions", "Conditions")}
              </TabsTrigger>
            </TabsList>

            <RuleBasicTab form={form} />
            <RuleConditionsTab form={form} minConfidence={minConfidence} />
          </Tabs>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              {translate("buttons.cancel", "Cancel")}
            </Button>
            <Button type="submit">{submitLabel}</Button>
          </div>

          {footerSlot}
        </form>
      </Form>
    </div>
  );
}

export default RuleForm;
