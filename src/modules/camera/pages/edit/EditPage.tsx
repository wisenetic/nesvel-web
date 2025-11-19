import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

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
import { cameraSchema, type CameraFormValues } from "@/modules/camera/schema";
import type { ICamera } from "@/modules/camera/types";

export default function CameraEditPage() {
  const navigate = useNavigate();
  const { translate } = useTranslation();

  const {
    refineCore: { onFinish, query },
    ...form
  } = useForm<CameraFormValues>({
    refineCoreProps: {
      resource: "cameras",
    },
    resolver: zodResolver(cameraSchema) as any,
  });

  const handleSubmit = (values: CameraFormValues) => {
    onFinish({
      name: values.name,
      location: values.location || undefined,
      streamUrl: values.streamUrl,
    } as Partial<ICamera> as any);
  };

  if (query?.isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {translate("camera.loading", "Loading...")}
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">
          {translate("camera.edit.title", "Edit Camera")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {translate(
            "camera.edit.subtitle",
            "Update camera details and RTSP stream URL",
          )}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            rules={{
              required: translate(
                "camera.edit.validation.name_required",
                "Camera name is required",
              ),
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translate("camera.fields.name", "Camera Name")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder={translate(
                      "camera.edit.placeholders.name",
                      "Front Entrance",
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translate("camera.fields.location", "Location")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder={translate(
                      "camera.edit.placeholders.location",
                      "Building A, Floor 1",
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="streamUrl"
            rules={{
              required: translate(
                "camera.edit.validation.stream_required",
                "RTSP URL is required",
              ),
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translate("camera.fields.rtsp_url", "RTSP URL")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder={translate(
                      "camera.edit.placeholders.streamUrl",
                      "rtsp://192.168.1.100:554/stream",
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              {translate("buttons.cancel", "Cancel")}
            </Button>
            <Button type="submit">
              {translate("camera.edit.submit", "Update Camera")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
