import { useTranslation } from "@refinedev/core";
import { UseFormReturnType } from "@refinedev/react-hook-form";
import {
  Activity,
  AlertTriangle,
  ArrowDownUp,
  Clock3,
  Filter,
  MapPin,
  ShieldCheck,
  Target,
} from "lucide-react";
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
import { Textarea } from "@/core/components/ui/textarea";
import { Switch } from "@/core/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Slider } from "@/core/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/components/ui/tabs";
import type { RuleFormValues } from "@/modules/rule/schema";

export type RuleFormProps = {
  form: UseFormReturnType<any, any, RuleFormValues>;
  mode: "create" | "edit";
  onSubmit: (values: RuleFormValues) => void;
  onCancel: () => void;
  footerSlot?: ReactNode;
};

const severityOptions = [
  { value: "critical", labelKey: "rule.severity.critical", icon: AlertTriangle },
  { value: "high", labelKey: "rule.severity.high", icon: Activity },
  { value: "medium", labelKey: "rule.severity.medium", icon: ArrowDownUp },
  { value: "low", labelKey: "rule.severity.low", icon: ShieldCheck },
] as const;

export function RuleForm({ form, mode, onSubmit, onCancel, footerSlot }: RuleFormProps) {
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

            <TabsContent value="basic" className="space-y-6">
          {/* Name & description */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate("rule.fields.name", "Rule Name")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder={translate(
                      "rule.placeholders.name",
                      "Fire Detection - Warehouse",
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translate("rule.fields.description", "Description")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    className="min-h-[80px] resize-none"
                    placeholder={translate(
                      "rule.placeholders.description",
                      "Monitor area for fire and smoke using high-accuracy detection model",
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Camera & model */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="cameraName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("rule.fields.camera", "Camera")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder={translate(
                        "rule.placeholders.camera",
                        "Camera 5",
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="modelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("rule.fields.model", "AI Model")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder={translate(
                        "rule.placeholders.model",
                        "Fire Detection Model v2",
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Priority & conditions */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("rule.fields.priority", "Priority")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      min={0}
                      max={1000}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="conditionsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("rule.fields.conditions", "Conditions")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Severity select */}
          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translate("rule.fields.severity", "Severity")}
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={translate(
                          "rule.placeholders.severity",
                          "Select severity",
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {severityOptions.map(({ value, labelKey, icon: Icon }) => (
                        <SelectItem key={value} value={value}>
                          <span className="inline-flex items-center gap-1">
                            <Icon className="size-3" />
                            {translate(labelKey)}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Enabled switch */}
          <FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border px-4 py-3">
                <div className="space-y-0.5">
                  <FormLabel>
                    {translate("rule.fields.enabled", "Enable this rule")}
                  </FormLabel>
                  <p className="text-xs text-muted-foreground">
                    {translate(
                      "rule.help.enabled",
                      "Rule will only execute when enabled",
                    )}
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

            </TabsContent>

            {/* Conditions tab */}
            <TabsContent value="conditions" className="space-y-4">
              {/* Geofencing */}
              <FormField
                control={form.control}
                name="geofencingEnabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-xl border px-4 py-4 md:px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <MapPin className="size-4 text-sky-600" />
                        {translate(
                          "rule.conditions_ui.geofencing_title",
                          "Geofencing",
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {translate(
                          "rule.conditions_ui.geofencing_description",
                          "Define polygon zones for detection",
                        )}
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Time schedule */}
              <FormField
                control={form.control}
                name="scheduleEnabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-xl border px-4 py-4 md:px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Clock3 className="size-4 text-indigo-600" />
                        {translate(
                          "rule.conditions_ui.schedule_title",
                          "Time Schedule",
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {translate(
                          "rule.conditions_ui.schedule_description",
                          "Set active hours for detection",
                        )}
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Confidence threshold */}
              <FormField
                control={form.control}
                name="confidenceEnabled"
                render={({ field }) => (
                  <FormItem className="rounded-xl border px-4 py-4 md:px-6 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Target className="size-4 text-blue-600" />
                          {translate(
                            "rule.conditions_ui.confidence_title",
                            "Confidence Threshold",
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {translate(
                            "rule.conditions_ui.confidence_description",
                            "Minimum detection confidence level",
                          )}
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>

                    <FormField
                      control={form.control}
                      name="minConfidence"
                      render={({ field: confField }) => (
                        <FormItem className="space-y-2">
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-xs font-medium text-muted-foreground">
                              {translate(
                                "rule.conditions_ui.confidence_label",
                                "Minimum Confidence",
                              )}
                            </FormLabel>
                            <span className="text-xs font-medium">
                              {minConfidence}%
                            </span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={1}
                              value={[minConfidence]}
                              onValueChange={(vals) =>
                                confField.onChange(vals[0])
                              }
                              className="w-full"
                            />
                          </FormControl>
                          <p className="text-[11px] text-muted-foreground">
                            {translate(
                              "rule.conditions_ui.confidence_helper",
                              "Only detections with confidence ≥ {{value}}% will trigger this rule",
                            ).replace("{{value}}", String(minConfidence))}
                          </p>
                        </FormItem>
                      )}
                    />
                  </FormItem>
                )}
              />

              {/* Object class filter */}
              <FormField
                control={form.control}
                name="classFilterEnabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-xl border px-4 py-4 md:px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Filter className="size-4 text-purple-600" />
                        {translate(
                          "rule.conditions_ui.class_filter_title",
                          "Object Class Filter",
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {translate(
                          "rule.conditions_ui.class_filter_description",
                          "Specify which object types to detect",
                        )}
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </TabsContent>
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
