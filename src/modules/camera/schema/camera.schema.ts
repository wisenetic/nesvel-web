import { z } from "zod";

export const cameraSchema = z.object({
  name: z.string().min(1, "Camera name is required"),
  location: z
    .string()
    .max(256, "Location is too long")
    .optional()
    .or(z.literal("")),
  streamUrl: z.string().min(1, "RTSP URL is required"),
});

export type CameraFormValues = z.infer<typeof cameraSchema>;
