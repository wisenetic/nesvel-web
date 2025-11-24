import { useList, useTranslation } from "@refinedev/core";
import { Brain, Layers3, Rocket, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import { PageHeader } from "@/core/components/shared/page-header";
import { StatsOverview } from "@/core/components/shared/stats/StatsOverview";
import { ModelCard } from "@/modules/model/components/model-card";
import type { Model } from "@/modules/model/types";

export default function ModelListPage() {
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { result, query } = useList<Model>({
    resource: "models",
  });

  const models = useMemo(() => result.data ?? [], [result]);

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
    void navigate(`/models/show/${id}`, {
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
        {models.map((model) => (
          <ModelCard key={model.id} model={model} onOpen={handleOpen} />
        ))}

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
