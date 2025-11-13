import { Video } from "lucide-react";

import { Button } from "@/core/components/ui/button";

import { useTranslation } from "@refinedev/core";

type NoCamerasProps = {
  onAdd?: () => void;
};

export default function NoCameras({ onAdd }: NoCamerasProps) {
  const { translate } = useTranslation();
  return (
    <div className="border rounded-xl py-16 flex flex-col items-center justify-center text-center bg-card/30">
      <Video className="mb-3 h-8 w-8 text-muted-foreground" />
      <div className="mb-1 text-base font-medium">
        {translate("camera.empty.title")}
      </div>
      <div className="mb-4 text-sm text-muted-foreground">
        {translate("camera.empty.description")}
      </div>
      <Button size="sm" onClick={onAdd}>
        {translate("camera.empty.add_button")}
      </Button>
    </div>
  );
}
