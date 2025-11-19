export type RoutePresentation = "page" | "drawer" | "modal";
export type PresentationConfig =
  | "page"
  | {
      view: "drawer" | "modal";
      className?: string;
      side?: "left" | "right" | "top" | "bottom";
    };

export type AppModule = {
  resource: { name: string; [key: string]: unknown };
  routes: React.ReactNode;
  presentation?: Record<string, PresentationConfig>;
  priority?: number;
  hidden?: boolean;
  group?: string;
};
