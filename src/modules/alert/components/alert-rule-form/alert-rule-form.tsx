import { useTranslation } from "@refinedev/core";
import { type UseFormReturnType } from "@refinedev/react-hook-form";
import { Flame, Sparkles, PersonStanding, AlarmSmoke } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/core/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Slider } from "@/core/components/ui/slider";
import { Switch } from "@/core/components/ui/switch";
import type { DetectionType } from "@/modules/alert/types";

import type { AlertRuleFormValues } from "../../schema/alert-rule.schema";

export type AlertRuleFormProps = {
  form: UseFormReturnType<any, any, AlertRuleFormValues>;
  mode: "create" | "edit";
  onSubmit: (values: AlertRuleFormValues) => void;
  onCancel: () => void;
  footerSlot?: ReactNode;
};

const detectionTypeOptions: {
  value: DetectionType;
  label: string;
  icon: ReactNode;
}[] = [
  {
    value: "fire",
    label: "alert.detectionType.fire",
    icon: <Flame className="h-4 w-4" />,
  },
  {
    value: "smoke",
    label: "alert.detectionType.smoke",
    icon: <AlarmSmoke className="h-4 w-4" />,
  },
  {
    value: "person",
    label: "alert.detectionType.person",
    icon: <PersonStanding className="h-4 w-4" />,
  },
  {
    value: "custom",
    label: "alert.detectionType.custom",
    icon: <Sparkles className="h-4 w-4" />,
  },
];

export function AlertRuleForm({
  form,
  mode,
  onSubmit,
  onCancel,
  footerSlot,
}: AlertRuleFormProps) {
  const { translate } = useTranslation();

  const title =
    mode === "create"
      ? translate("alert.create.title", "Create Alert Rule")
      : translate("alert.edit.title", "Edit Alert Rule");

  const subtitle =
    mode === "create"
      ? translate(
          "alert.create.subtitle",
          "Configure when and how you want to be notified about detections",
        )
      : translate(
          "alert.edit.subtitle",
          "Update when and how you want to be notified about detections",
        );

  const submitLabel =
    mode === "create"
      ? translate("alert.create.submit", "Create Alert Rule")
      : translate("alert.edit.submit", "Update Alert Rule");

  return (
    <div className="w-full max-w-2xl p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Rule name */}
          <FormField
            control={form.control}
            name="name"
            rules={{
              required: translate(
                "alert.validation.name_required",
                "Rule name is required",
              ),
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translate("alert.fields.name", "Rule Name")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder={translate(
                      "alert.placeholders.name",
                      "Critical Fire Alert",
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Detection type & confidence slider */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="detectionType"
              rules={{
                required: translate(
                  "alert.validation.detection_type_required",
                  "Detection type is required",
                ),
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("alert.fields.detection_type", "Detection Type")}
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value as DetectionType | undefined}
                      onValueChange={(val) => {
                        field.onChange(val);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={translate(
                            "alert.placeholders.detection_type",
                            "Select detection type",
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {detectionTypeOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.icon} {translate(opt.label)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minConfidence"
              rules={{
                min: 0,
                max: 100,
              }}
              render={({ field }) => {
                const value =
                  typeof field.value === "number" ? field.value : 70;

                return (
                  <FormItem>
                    <div className="flex items-center justify-between mb-2">
                      <FormLabel>
                        {translate(
                          "alert.fields.min_confidence",
                          "Minimum Confidence",
                        )}
                      </FormLabel>
                      <span className="text-xs text-muted-foreground font-medium">
                        {value}%
                      </span>
                    </div>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[value]}
                        onValueChange={(vals) => {
                          field.onChange(vals[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          {/* Notification methods */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">
              {translate(
                "alert.sections.notification_methods",
                "Notification Methods",
              )}
            </h3>

            <div className="space-y-3">
              {/* Email notifications */}
              <FormField
                control={form.control}
                name="emailEnabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border px-4 py-3">
                    <div className="space-y-0.5">
                      <FormLabel>
                        {translate(
                          "alert.fields.email_notifications",
                          "Email Notifications",
                        )}
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        {translate(
                          "alert.help.email_notifications",
                          "Send alerts to configured email addresses",
                        )}
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Webhook notifications */}
              <FormField
                control={form.control}
                name="webhookEnabled"
                render={({ field }) => (
                  <FormItem className="rounded-lg border px-4 py-3 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <FormLabel>
                          {translate(
                            "alert.fields.webhook_notifications",
                            "Webhook Notifications",
                          )}
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          {translate(
                            "alert.help.webhook_notifications",
                            "Send POST request to custom endpoint",
                          )}
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>

                    <FormField
                      control={form.control}
                      name="webhookUrl"
                      render={({ field: urlField }) => (
                        <FormItem className="mt-2">
                          <FormLabel className="text-xs text-muted-foreground">
                            {translate(
                              "alert.fields.webhook_url",
                              "Webhook URL",
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...urlField}
                              value={urlField.value ?? ""}
                              disabled={!field.value}
                              placeholder={translate(
                                "alert.placeholders.webhook_url",
                                "https://example.com/alerts/webhook",
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Enable rule switch */}
          <FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border px-4 py-3">
                <div className="space-y-0.5">
                  <FormLabel>
                    {translate(
                      "alert.fields.enabled",
                      "Enable this alert rule",
                    )}
                  </FormLabel>
                  <p className="text-xs text-muted-foreground">
                    {translate(
                      "alert.help.enabled",
                      "Rule will only trigger when enabled",
                    )}
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

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

export default AlertRuleForm;
