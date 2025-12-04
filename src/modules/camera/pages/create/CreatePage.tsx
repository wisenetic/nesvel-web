import { useTranslation } from "@refinedev/core";
import { useNavigate } from "react-router";

import { DynamicForm, form, field } from "@/core/components/shared/dynamic-form";
import { cameraSchema, type CameraFormValues } from "@/modules/camera/schema";
import type { ICamera } from "@/modules/camera/types";

export default function CameraCreatePage() {
  const navigate = useNavigate();
  const { translate } = useTranslation();

  const handleSubmit = (values: CameraFormValues) => {
    // TODO: wire to refine onFinish if needed, preserving previous behaviour
    console.log("Camera create submit", values);
  };

  const cameraCreateSchema = form({
    name: field.text({
      label: translate("camera.fields.name", "Camera Name"),
      placeholder: translate(
        "camera.create.placeholders.name",
        "Front Entrance",
      ),
      required: true,
      description: translate(
        "camera.create.validation.name_required",
        "Camera name is required",
      ),
    }),
    location: field.text({
      label: translate("camera.fields.location", "Location"),
      placeholder: translate(
        "camera.create.placeholders.location",
        "Building A, Floor 1",
      ),
      required: false,
    }),
    streamUrl: field.text({
      label: translate("camera.fields.rtsp_url", "RTSP URL"),
      placeholder: translate(
        "camera.create.placeholders.streamUrl",
        "rtsp://admin:password@192.168.1.100:554/stream1",
      ),
      required: true,
      description: translate(
        "camera.create.validation.stream_required",
        "RTSP URL is required",
      ),
    }),
  }).withFormMeta({
    title: translate("camera.create.title", "Add New Camera"),
    description: translate(
      "camera.create.subtitle",
      "Configure camera details and RTSP stream URL",
    ),
    submitLabel: translate("camera.create.submit", "Add Camera"),
  });

  return (
    <div className="w-full max-w-xl p-6 space-y-6">
      <DynamicForm
        schema={cameraCreateSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          name: "",
          location: "",
          streamUrl: "",
        }}
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
