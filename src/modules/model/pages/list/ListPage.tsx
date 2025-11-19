import { useMemo } from "react";

import { useList, useTranslation } from "@refinedev/core";
import { useLocation, useNavigate } from "react-router";

import { PageHeader } from "@/core/components/shared/page-header";
import { StatsOverview } from "@/core/components/shared/stats/StatsOverview";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import type { Model } from "@/modules/model/types";
import { Brain, Layers3, Rocket, Sparkles } from "lucide-react";

const categoryToneClasses: Record<
  Model["category"],
  { badge: string }
> = {
  safety: {
    badge: "bg-red-50 text-red-700 border-red-200",
  },
  analytics: {
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  security: {
    badge: "bg-sky-50 text-sky-700 border-sky-200",
  },
  healthcare: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

export default function ModelListPage() {
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { result, query } = useList<Model>({
    resource: "models",
  });

  const models = useMemo(() => result?.data ?? [], [result]);

  const stats = useMemo(() => {
    const total = models.length;
    const active = models.filter((m) => m.status === "active").length;
    const categories = new Set(models.map((m) => m.category));
    const avgAccuracy =
      total > 0
        ? Math.round(
            models.reduce((sum, m) => sum + (m.accuracy ?? 0), 0) / total,
          )
        : 0;

    return { total, active, categories: categories.size, avgAccuracy };
  }, [models]);

  const handleOpen = (id: string) => {
    navigate(`/models/show/${id}`, {
      state: { background: location },
    });
  };

  if (query.isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {translate("model.loading", "Loading models...")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={translate("model.list_title", "Models")}
        description={translate(
          "model.list_description",
          "Discover and activate AI models for your vision system",
        )}
      />

      <StatsOverview
        items={[
          {
            label: translate("model.summary.total_models", "Total Models"),
            value: stats.total,
            icon: <Layers3 className="size-5" />,
          },
          {
            label: translate("model.summary.active_models", "Active Models"),
            value: stats.active,
            tone: "success",
            icon: <Rocket className="size-5 text-emerald-500" />,
          },
          {
            label: translate("model.summary.categories", "Categories"),
            value: stats.categories,
            icon: <Brain className="size-5" />,
          },
          {
            label: translate("model.summary.avg_accuracy", "Avg. Accuracy"),
            value: `${stats.avgAccuracy}%`,
            icon: <Sparkles className="size-5" />,
          },
        ]}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {models.map((model) => {
          const categoryTone = categoryToneClasses[model.category];

          return (
            <Card
              key={model.id}
              className="relative flex cursor-pointer flex-col justify-between rounded-2xl border bg-background p-4 shadow-sm transition hover:shadow-md md:p-5"
              onClick={() => handleOpen(model.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-2xl md:size-11">
                    <span aria-hidden>{model.emoji}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold md:text-lg">
                      {model.name}
                    </h3>
                    <p className="text-xs text-muted-foreground md:text-sm">
                      {model.description}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">
                          {translate("model.fields.category", "Category")}:
                        </span>
                        <Badge
                          variant="outline"
                          className={`border text-[11px] ${categoryTone.badge}`}
                        >
                          {translate(
                            `model.category_labels.${model.category}` as const,
                            model.category,
                          )}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">
                          {translate("model.fields.accuracy", "Accuracy")}:
                        </span>
                        <span>{model.accuracy}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className="rounded-full bg-blue-600 px-3 py-1 text-[11px] font-medium text-white shadow md:text-xs"
                >
                  {translate(`model.status.${model.status}` as const, "Active")}
                </Badge>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs md:text-sm">
                <div className="space-y-0.5">
                  <div className="text-muted-foreground">
                    {translate("model.fields.pricing", "Pricing")}
                  </div>
                  <div className="font-semibold">
                    ${""}
                    {model.pricePerMonth.toFixed(2)}
                    <span className="text-xs font-normal text-muted-foreground">
                      /{translate("model.per_month", "month")}
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="rounded-full px-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen(model.id);
                  }}
                >
                  {translate("model.actions.view_details", "View details")}
                </Button>
              </div>
            </Card>
          );
        })}

        {!models.length && (
          <div className="rounded-lg border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
            {translate(
              "model.empty.description",
              "No models available yet. They will appear here once configured.",
            )}
          </div>
        )}
      </div>
    </div>
  );
}
