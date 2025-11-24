import { useShow, useTranslate } from "@refinedev/core";
import { Activity, Gauge, Zap } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router";

import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import { Separator } from "@/core/components/ui/separator";
import type { Model } from "@/modules/model/types";

export default function ModelShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslate();

  const { query } = useShow<Model>({
    resource: "models",
    id,
  });

  const model = query.data?.data;

  if (query.isLoading)
    return <div className="p-6">{t("model.loading", "Loading models...")}</div>;
  if (!model)
    return (
      <div className="p-6">{t("model.show.not_found", "Model not found")}</div>
    );

  const handleClose = () => {
    if (location.state?.background) {
      void navigate(-1);
      return;
    }

    void navigate("/models");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-12 items-center justify-center text-3xl md:size-14">
            <span aria-hidden>{model.emoji}</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold md:text-2xl">{model.name}</h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {model.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="rounded-full border px-3 py-1 text-xs font-medium text-foreground/80 dark:text-foreground shadow-sm"
          >
            {t(`model.status.${model.status}` as const, "Active")}
          </Badge>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            ✕
          </Button>
        </div>
      </div>

      {/* Performance summary row */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <PerformanceCard
          icon={
            <Activity
              className="size-5 text-primary dark:text-primary"
              aria-hidden="true"
            />
          }
          label={t("model.fields.accuracy", "Accuracy")}
          value={`${model.accuracy}%`}
        />
        <PerformanceCard
          icon={
            <Zap
              className="size-5 text-primary/80 dark:text-primary/80"
              aria-hidden="true"
            />
          }
          label={t("model.fields.latency", "Latency")}
          value={`${model.latencyMs}ms`}
        />
        <PerformanceCard
          icon={
            <Gauge
              className="size-5 text-primary/80 dark:text-primary/80"
              aria-hidden="true"
            />
          }
          label={t("model.fields.fps", "FPS")}
          value={`${model.fps}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Left column: About + Features */}
        <div className="space-y-4 md:col-span-2">
          <Card className="space-y-3 p-4 md:p-5">
            <h3 className="text-base font-semibold md:text-lg">
              {t("model.show.about_title", "About This Model")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t(
                "model.show.about_body",
                "State-of-the-art deep learning model for real-time video analytics.",
              )}
            </p>
          </Card>

          <Card className="space-y-3 p-4 md:p-5">
            <h3 className="text-base font-semibold md:text-lg">
              {t("model.show.features_title", "Key Features")}
            </h3>
            <ul className="space-y-2 text-sm">
              {model.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 rounded-xl bg-muted/60 px-3 py-2"
                >
                  <span className="mt-0.5 text-primary">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Right column: Requirements + Pricing */}
        <div className="space-y-4">
          <Card className="space-y-3 p-4 md:p-5">
            <h3 className="text-base font-semibold md:text-lg">
              {t("model.show.requirements_title", "System Requirements")}
            </h3>
            <div className="space-y-2 text-sm">
              <InfoRow label={t("model.fields.gpu", "GPU")} value={model.gpu} />
              <InfoRow
                label={t("model.fields.memory", "Memory")}
                value={model.memory}
              />
              <InfoRow
                label={t("model.fields.min_resolution", "Min Resolution")}
                value={model.minResolution}
              />
              <InfoRow
                label={t("model.fields.min_fps", "Min FPS")}
                value={String(model.minFps)}
              />
            </div>
          </Card>

          <Card className="space-y-3 p-4 md:p-5">
            <h3 className="text-base font-semibold md:text-lg">
              {t("model.show.pricing_title", "Pricing")}
            </h3>
            <div className="space-y-1">
              <div className="text-3xl font-semibold text-foreground">
                ${""}
                {model.pricePerMonth.toFixed(2)}
                <span className="text-sm font-normal text-muted-foreground">
                  /{t("model.per_month", "month")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t(
                  "model.show.pricing_subtext",
                  "Includes unlimited detections, 24/7 support, and free updates.",
                )}
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-3 md:flex-row md:justify-end md:gap-2">
        <Button size="lg" className="w-full md:w-auto">
          {t("model.actions.activate", "Activate Model")}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full md:w-auto"
          onClick={handleClose}
        >
          {t("model.actions.close", "Close")}
        </Button>
      </div>
    </div>
  );
}

const PerformanceCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Card className="rounded-xl border bg-card px-4 py-3">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <span className="text-base font-semibold md:text-lg">{value}</span>
    </div>
  </Card>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);
