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
import type { ICamera } from "@/modules/camera/types";

export default function CameraCreatePage() {
  const navigate = useNavigate();
  const { translate } = useTranslation();

  const {
    refineCore: { onFinish },
    ...form
  } = useForm<ICamera>({
    refineCoreProps: {
      resource: "cameras",
    },
  });

  const handleSubmit = (values: Partial<ICamera>) => {
    onFinish({
      name: values.name ?? "",
      location: values.location,
      streamUrl: values.streamUrl ?? "",
    } as any);
  };

  return (
    <div className="w-full max-w-xl p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">
          {translate("camera.create.title", "Add New Camera")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {translate(
            "camera.create.subtitle",
            "Configure camera details and RTSP stream URL",
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
                "camera.create.validation.name_required",
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
                      "camera.create.placeholders.name",
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
                      "camera.create.placeholders.location",
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
                "camera.create.validation.stream_required",
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
                      "camera.create.placeholders.streamUrl",
                      "rtsp://admin:password@192.168.1.100:554/stream1",
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
              {translate("camera.create.submit", "Add Camera")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
