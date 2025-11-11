import { useTranslation } from "react-i18next";

import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Plus } from "lucide-react";

export const CameraList = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("camera.list_title")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("camera.list_description")}
          </p>
        </div>
        <Button size="lg">
          <Plus /> {t("camera.add_button")}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((card: any) => (
          <Card>
            <CardContent>
              <div className="flex items-center justify-between"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
