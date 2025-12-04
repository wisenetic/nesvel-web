import { useTranslation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import { DynamicForm, form, field } from "@/core/components/shared/dynamic-form";
import { cameraSchema, type CameraFormValues } from "@/modules/camera/schema";
import type { ICamera } from "@/modules/camera/types";

export default function CameraEditPage() {
  const navigate = useNavigate();
  const { translate } = useTranslation();

  const {
    refineCore: { query },
  } = useForm<CameraFormValues>({
    refineCoreProps: {
      resource: "cameras",
    },
  });

  const handleSubmit = (values: CameraFormValues) => {
    // TODO: wire to refine onFinish if needed, preserving previous behaviour
    console.log("Camera edit submit", values);
  };

  if (query?.isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {translate("camera.loading", "Loading...")}
      </div>
    );
  }

  const cameraEditSchema = form({
    name: field.text({
      label: translate("camera.fields.name", "Camera Name"),
      placeholder: translate(
        "camera.edit.placeholders.name",
        "Front Entrance",
      ),
      required: true,
      description: translate(
        "camera.edit.validation.name_required",
        "Camera name is required",
      ),
    }),
    location: field.text({
      label: translate("camera.fields.location", "Location"),
      placeholder: translate(
        "camera.edit.placeholders.location",
        "Building A, Floor 1",
      ),
      required: false,
    }),
    streamUrl: field.text({
      label: translate("camera.fields.rtsp_url", "RTSP URL"),
      placeholder: translate(
        "camera.edit.placeholders.streamUrl",
        "rtsp://192.168.1.100:554/stream",
      ),
      required: true,
      description: translate(
        "camera.edit.validation.stream_required",
        "RTSP URL is required",
      ),
    }),
  }).withFormMeta({
    title: translate("camera.edit.title", "Edit Camera"),
    description: translate(
      "camera.edit.subtitle",
      "Update camera details and RTSP stream URL",
    ),
    submitLabel: translate("camera.edit.submit", "Update Camera"),
  });

  return (
    <div className="w-full max-w-xl p-6 space-y-6">
      <DynamicForm
        schema={cameraEditSchema}
        onSubmit={handleSubmit}
        defaultValues={query?.data?.data as Partial<ICamera>}
        className="space-y-4"
        showFooterBorder={false}
        extraActions={(
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border bg-background px-3 py-1 text-sm font-medium text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground"
            onClick={() => navigate(-1)}
          >
            {translate("buttons.cancel", "Cancel")}
          </button>
        )}
      />
    </div>
  );
}
