import { useTranslation } from "@refinedev/core";

import { Badge } from "@/core/components/ui/badge";
import { Card } from "@/core/components/ui/card";
import type { Model } from "@/modules/model/types";

const categoryToneClasses: Record<Model["category"], { badge: string }> = {
  safety: {
    badge:
      "border-red-300/60 bg-red-100/40 text-red-700 dark:border-red-500/60 dark:bg-red-500/10 dark:text-red-300",
  },
  analytics: {
    badge:
      "border-purple-300/60 bg-purple-100/40 text-purple-700 dark:border-purple-500/60 dark:bg-purple-500/10 dark:text-purple-300",
  },
  security: {
    badge:
      "border-sky-300/60 bg-sky-100/40 text-sky-700 dark:border-sky-500/60 dark:bg-sky-500/10 dark:text-sky-300",
  },
  healthcare: {
    badge:
      "border-emerald-300/60 bg-emerald-100/40 text-emerald-700 dark:border-emerald-500/60 dark:bg-emerald-500/10 dark:text-emerald-300",
  },
};

const statusToneClasses: Record<Model["status"], string> = {
  active:
    "border-emerald-400/70 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/70 dark:bg-emerald-500/15 dark:text-emerald-300",
  beta: "border-amber-400/70 bg-amber-500/10 text-amber-700 dark:border-amber-400/70 dark:bg-amber-500/15 dark:text-amber-300",
  inactive:
    "border-border bg-background text-muted-foreground dark:border-border dark:bg-background dark:text-muted-foreground",
};

export type ModelCardProps = {
  model: Model;
  onOpen: (id: string) => void;
};

export const ModelCard = ({ model, onOpen }: ModelCardProps) => {
  const { translate } = useTranslation();
  const categoryTone = categoryToneClasses[model.category];
  const statusTone = statusToneClasses[model.status];

  return (
    <Card
      className="relative flex cursor-pointer flex-col justify-between rounded-2xl border bg-card p-4 shadow-sm transition hover:-translate-y-px hover:shadow-md md:p-5"
      onClick={() => {
        onOpen(model.id);
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center text-2xl md:size-11">
            <span aria-hidden>{model.emoji}</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold md:text-lg">{model.name}</h3>
            <p className="text-xs text-muted-foreground md:text-sm">
              {model.description}
            </p>
          </div>
        </div>

        <Badge
          variant="outline"
          className={`rounded-full border px-3 py-1 text-[11px] font-medium md:text-xs ${statusTone}`}
        >
          {translate(`model.status.${model.status}` as const, "Active")}
        </Badge>
      </div>

      <div className="mt-4 space-y-2 text-xs md:text-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-muted-foreground">
            {translate("model.fields.category", "Category")}
          </span>
          <Badge
            variant="outline"
            className={`border text-[11px] font-medium md:text-xs ${categoryTone.badge}`}
          >
            {translate(
              `model.category_labels.${model.category}` as const,
              model.category,
            )}
          </Badge>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-muted-foreground">
            {translate("model.fields.accuracy", "Accuracy")}
          </span>
          <span className="font-semibold">{model.accuracy}%</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-muted-foreground">
            {translate("model.fields.pricing", "Pricing")}
          </span>
          <span className="font-semibold">
            ${""}
            {model.pricePerMonth.toFixed(2)}
            <span className="ml-1 text-[11px] font-normal text-muted-foreground">
              /{translate("model.per_month", "month")}
            </span>
          </span>
        </div>
      </div>
    </Card>
  );
};
