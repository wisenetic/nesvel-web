import { useList, useTranslation } from "@refinedev/core";
import { type UseFormReturnType } from "@refinedev/react-hook-form";
import { Activity, AlertTriangle, ArrowDownUp, ShieldCheck } from "lucide-react";

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
import { TabsContent } from "@/core/components/ui/tabs";
import { Textarea } from "@/core/components/ui/textarea";
import type { ICamera } from "@/modules/camera/types";
import type { Model } from "@/modules/model/types";
import type { RuleFormValues } from "@/modules/rule/schema";

export type RuleBasicTabProps = {
  form: UseFormReturnType<any, any, RuleFormValues>;
};

const severityOptions = [
  {
    value: "critical",
    labelKey: "rule.severity.critical",
    icon: AlertTriangle,
  },
  { value: "high", labelKey: "rule.severity.high", icon: Activity },
  { value: "medium", labelKey: "rule.severity.medium", icon: ArrowDownUp },
  { value: "low", labelKey: "rule.severity.low", icon: ShieldCheck },
] as const;

const FALLBACK_CAMERA_NAMES = [
  "Camera 1 - Building A - Floor 1",
  "Camera 2 - Building A - Floor 2",
  "Camera 3 - Building B - Entrance",
  "Camera 4 - Building B - Parking Lot",
  "Camera 5 - Warehouse - Section 1",
  "Camera 6 - Warehouse - Section 2",
  "Camera 7 - Factory Floor - North",
  "Camera 8 - Factory Floor - South",
  "Camera 9 - Building A - Floor 1",
];

const FALLBACK_MODEL_NAMES = [
  "Fire Detection Model v2",
  "Smoke Detection Pro",
  "AI Motion Detection",
  "Crowd Detection & Counting",
  "Vehicle Detection & Classification",
  "PPE Compliance Detection",
  "Perimeter Intrusion Detection",
  "Fall Detection (Elderly Care)",
  "Weapon Detection (Beta)",
];

export const RuleBasicTab = ({ form }: RuleBasicTabProps) => {
  const { translate } = useTranslation();

  // Load cameras and models for dropdowns
  const { data: cameraResult } = useList<ICamera>({
    resource: "cameras",
    pagination: { pageSize: 100 },
  });
  const cameras = cameraResult?.data ?? [];
  const cameraNames = (
    cameras.length
      ? cameras.map((c) => c.name).filter(Boolean)
      : FALLBACK_CAMERA_NAMES
  ) as string[];

  const { data: modelResult } = useList<Model>({
    resource: "models",
    pagination: { pageSize: 100 },
  });
  const models = modelResult?.data ?? [];
  const modelNames = (
    models.length
      ? models.map((m) => m.name).filter(Boolean)
      : FALLBACK_MODEL_NAMES
  ) as string[];

  const minConfidence = form.watch("minConfidence") ?? 70;

  return (
    <TabsContent value="basic" className="space-y-6">
      {/* Name & description */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {translate("rule.fields.name", "Rule Name")}
            </FormLabel>
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
                className="min-h-20 resize-none"
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
                <Select
                  value={field.value || ""}
                  onValueChange={(val) => {
                    field.onChange(val);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={translate(
                        "rule.placeholders.camera",
                        "Camera 5 - Warehouse - Section 1",
                      )}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {cameraNames.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
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
          name="modelName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {translate("rule.fields.model", "AI Model")}
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value ?? ""}
                  onValueChange={(val) => {
                    field.onChange(val);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={translate(
                        "rule.placeholders.model",
                        "Fire Detection Model v2",
                      )}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {modelNames.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Priority - horizontal slider */}
      <FormField
        control={form.control}
        name="priority"
        render={({ field }) => {
          const priorityValue =
            typeof field.value === "number" && !Number.isNaN(field.value)
              ? field.value
              : 0;

          return (
            <FormItem className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel className="text-xs font-medium text-muted-foreground">
                  {translate("rule.fields.priority", "Priority")}
                </FormLabel>
                <span className="text-xs font-medium">{priorityValue}</span>
              </div>
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[priorityValue]}
                  onValueChange={(vals) => {
                    field.onChange(vals[0]);
                  }}
                  className="w-full"
                />
              </FormControl>
              <p className="text-[11px] text-muted-foreground">
                {translate(
                  "rule.fields.priority_helper",
                  "Higher priority rules are evaluated first",
                )}
              </p>
              <FormMessage />
            </FormItem>
          );
        }}
      />

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
                onValueChange={(val) => {
                  field.onChange(val);
                }}
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
  );
};
