export type ModelStatus = "active" | "beta" | "inactive";

export type ModelCategory = "safety" | "analytics" | "security" | "healthcare";

export type Model = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  status: ModelStatus;
  category: ModelCategory;
  accuracy: number; // percentage 0-100
  pricePerMonth: number; // USD price per month
  latencyMs: number;
  fps: number;
  gpu: string;
  memory: string;
  minResolution: string;
  minFps: number;
  features: string[];
};
