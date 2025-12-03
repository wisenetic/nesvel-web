import { useTranslation } from "@refinedev/core";
import { MapPinIcon, PencilIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/core/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import type { LocationNode } from "../types";
import { LocationTypeBadge } from "./LocationTypeBadge";

interface LocationDetailsPanelProps {
  selected: LocationNode | null;
  parentPath: LocationNode[];
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function LocationDetailsPanel({
  selected,
  parentPath,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: LocationDetailsPanelProps) {
  const { translate } = useTranslation();

  if (!selected) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <MapPinIcon className="size-4 text-muted-foreground" />
            {translate("location.details.empty_title", "Select a location")}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {translate(
            "location.details.empty_description",
            "Choose a site, building, floor, or zone from the tree to see details.",
          )}
        </CardContent>
      </Card>
    );
  }

  const breadcrumb = [...parentPath, selected];

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col gap-3 border-b border-border/60 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <span>{selected.name}</span>
              <LocationTypeBadge type={selected.type} />
            </CardTitle>
            <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              {breadcrumb.map((node, idx) => (
                <span key={node.id} className="flex items-center gap-1">
                  {idx > 0 && <span className="text-border">/</span>}
                  <span>{node.name}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              onClick={onMoveUp}
              title="Move up"
            >
              <span className="text-xs font-semibold">↑</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={onMoveDown}
              title="Move down"
            >
              <span className="text-xs font-semibold">↓</span>
            </Button>
            <Button size="icon" variant="outline" onClick={onEdit}>
              <PencilIcon className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2Icon className="size-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-4 text-sm">
        <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
          <InfoRow
            label={translate("location.details.fields.id", "ID")}
            value={selected.id}
          />
          <InfoRow
            label={translate("location.details.fields.type", "Type")}
            value={translate(`location.types.${selected.type}`, selected.type)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="text-sm font-medium text-foreground break-all">{value}</div>
    </div>
  );
}
