import { useTranslation } from "@refinedev/core";
import { type UseFormReturnType } from "@refinedev/react-hook-form";
import { Clock3, Filter, MapPin, Plus, Target } from "lucide-react";

import { Button } from "@/core/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import { Slider } from "@/core/components/ui/slider";
import { Switch } from "@/core/components/ui/switch";
import { TabsContent } from "@/core/components/ui/tabs";
import { RuleFormValues } from "@/modules/rule/schema";

export type RuleConditionsTabProps = {
  form: UseFormReturnType<any, any, RuleFormValues>;
  minConfidence: number;
};

const SCHEDULE_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DEFAULT_SCHEDULE_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

type UiSchedule = {
  days: string[];
  start: string;
  end: string;
};

const createDefaultSchedule = (): UiSchedule => ({
  days: [...DEFAULT_SCHEDULE_DAYS],
  start: "09:00",
  end: "18:00",
});

const OBJECT_CLASS_OPTIONS = [
  "person",
  "vehicle",
  "fire",
  "smoke",
  "bicycle",
  "motorcycle",
  "truck",
  "bus",
  "animal",
] as const;

export const RuleConditionsTab = ({ form, minConfidence }: RuleConditionsTabProps) => {
  const { translate } = useTranslation();

  return (
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
                {translate("rule.conditions_ui.geofencing_title", "Geofencing")}
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
        render={({ field }) => {
          const enabled = !!field.value;
          const schedules =
            (form.watch("schedules" as any) as UiSchedule[] | undefined) ?? [];

          const ensureDefaultSchedules = (current: UiSchedule[]) => {
            if (!current.length) {
              const next = [createDefaultSchedule()];
              form.setValue("schedules" as any, next, {
                shouldDirty: true,
              });
              return next;
            }
            return current;
          };

          const handleToggleEnabled = (value: boolean) => {
            field.onChange(value);
            if (value) {
              const current =
                (form.getValues("schedules" as any) as UiSchedule[] | undefined) ?? [];
              ensureDefaultSchedules(current);
            }
          };

          const handleAddSchedule = () => {
            const current =
              (form.getValues("schedules" as any) as UiSchedule[] | undefined) ?? [];
            const base = ensureDefaultSchedules(current);
            const next = [...base, createDefaultSchedule()];
            form.setValue("schedules" as any, next, {
              shouldDirty: true,
            });
          };

          const handleRemoveSchedule = (index: number) => {
            const current =
              (form.getValues("schedules" as any) as UiSchedule[] | undefined) ?? [];
            const next = current.filter((_, i) => i !== index);
            form.setValue("schedules" as any, next, {
              shouldDirty: true,
            });
          };

          const handleUpdateSchedule = (
            index: number,
            updater: (schedule: UiSchedule) => UiSchedule,
          ) => {
            const current =
              (form.getValues("schedules" as any) as UiSchedule[] | undefined) ?? [];
            const next = current.map((s, i) => (i === index ? updater(s) : s));
            form.setValue("schedules" as any, next, {
              shouldDirty: true,
            });
          };

          const effectiveSchedules = enabled
            ? ensureDefaultSchedules(schedules)
            : schedules;

          return (
            <FormItem className="rounded-xl border px-4 py-4 md:px-6 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock3 className="size-4 text-foreground" />
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
                    checked={enabled}
                    onCheckedChange={handleToggleEnabled}
                  />
                </FormControl>
              </div>

              {enabled && (
                <div className="space-y-3 pt-1">
                  {effectiveSchedules.length === 0 ? (
                    <p className="text-[11px] text-muted-foreground">
                      {translate(
                        "rule.conditions_ui.schedule_empty",
                        "No schedules configured yet",
                      )}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {effectiveSchedules.map((schedule, index) => (
                        <div
                          key={index}
                          className="rounded-lg border bg-card px-3 py-3 text-xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                <p className="text-[11px] font-medium text-foreground">
                                  {translate(
                                    "rule.conditions_ui.schedule_label",
                                    "Schedule",
                                  )}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                <div className="space-y-1">
                                  <p className="text-[11px] font-medium text-muted-foreground">
                                    {translate(
                                      "rule.conditions_ui.schedule_start",
                                      "Start time",
                                    )}
                                  </p>
                                  <Input
                                    type="time"
                                    value={schedule.start}
                                    onChange={(e) => {
                                      handleUpdateSchedule(index, (s) => ({
                                        ...s,
                                        start: e.target.value,
                                      }));
                                    }}
                                    className="h-8"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[11px] font-medium text-muted-foreground">
                                    {translate(
                                      "rule.conditions_ui.schedule_end",
                                      "End time",
                                    )}
                                  </p>
                                  <Input
                                    type="time"
                                    value={schedule.end}
                                    onChange={(e) => {
                                      handleUpdateSchedule(index, (s) => ({
                                        ...s,
                                        end: e.target.value,
                                      }));
                                    }}
                                    className="h-8"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <p className="text-[11px] font-medium text-muted-foreground">
                                  {translate(
                                    "rule.conditions_ui.schedule_days",
                                    "Days of Week",
                                  )}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {SCHEDULE_DAYS.map((day) => {
                                    const isSelected = schedule.days.includes(day);
                                    return (
                                      <button
                                        key={day}
                                        type="button"
                                        onClick={() => {
                                          handleUpdateSchedule(index, (s) => ({
                                            ...s,
                                            days: s.days.includes(day)
                                              ? s.days.filter((d) => d !== day)
                                              : [...s.days, day],
                                          }));
                                        }}
                                        className={`rounded-full border px-3 py-1 text-[11px] transition 
                                          ${
                                            isSelected
                                              ? "border-primary bg-primary text-primary-foreground"
                                              : "border-border bg-background text-foreground hover:bg-muted"
                                          }`}
                                      >
                                        {day}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                handleRemoveSchedule(index);
                              }}
                              className="mt-1 size-6 text-muted-foreground hover:text-destructive"
                            >
                              <span className="text-lg leading-none">×</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleAddSchedule}
                    className="flex w-full items-center justify-center gap-2 border-dashed text-xs"
                  >
                    <Plus className="size-4" />
                    {translate(
                      "rule.conditions_ui.schedule_add",
                      "Add schedule",
                    )}
                  </Button>

                  <p className="text-[11px] text-muted-foreground">
                    {translate(
                      "rule.conditions_ui.schedule_helper",
                      "Rule will only run during selected days and hours",
                    )}
                  </p>
                </div>
              )}
            </FormItem>
          );
        }}
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

            {field.value && (
              <FormField
                control={form.control}
                name="minConfidence"
                render={({ field: confField }) => (
                  <FormItem className="mt-3 space-y-2">
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
                        onValueChange={(vals) => {
                          confField.onChange(vals[0]);
                        }}
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
            )}
          </FormItem>
        )}
      />

      {/* Object class filter */}
      <FormField
        control={form.control}
        name="classFilterEnabled"
        render={({ field }) => {
          const enabled = !!field.value;
          const selected =
            (form.watch("objectClasses" as any) as string[] | undefined) ?? [];

          const toggleClass = (value: string) => {
            const current =
              (form.getValues("objectClasses" as any) as
                string[] | undefined) ?? [];
            const next = current.includes(value)
              ? current.filter((v) => v !== value)
              : [...current, value];
            form.setValue("objectClasses" as any, next, {
              shouldDirty: true,
            });
          };

          return (
            <FormItem className="rounded-xl border px-4 py-4 md:px-6 space-y-3">
              <div className="flex items-center justify-between">
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
                    checked={enabled}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>

              {enabled && (
                <div className="space-y-2 pt-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    {translate(
                      "rule.conditions_ui.class_filter_allowed",
                      "Allowed Object Classes",
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {OBJECT_CLASS_OPTIONS.map((value) => {
                      const isSelected = selected.includes(value);
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            toggleClass(value);
                          }}
                          className={`rounded-full border px-3 py-1 text-xs transition 
                            ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-foreground hover:bg-muted"
                            }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {translate(
                      "rule.conditions_ui.class_filter_detecting",
                      "Detecting: {{classes}}",
                    ).replace(
                      "{{classes}}",
                      selected.length ? selected.join(", ") : "none",
                    )}
                  </p>
                </div>
              )}
            </FormItem>
          );
        }}
      />
    </TabsContent>
  );
};
