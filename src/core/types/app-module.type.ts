import { type IconName } from "lucide-react/dynamic";
export type RoutePresentation = "page" | "drawer" | "modal";
export type PresentationConfig =
  | "page"
  | {
      view: "drawer" | "modal";
      className?: string;
      side?: "left" | "right" | "top" | "bottom";
    };

export type AppModule = {
  resource: {
    name: string;
    list?: string;
    create?: string;
    edit?: string;
    meta: {
      labelKey: string;
      icon?: IconName;
    };
  };
  routes: React.ReactNode;
  presentation?: Record<string, PresentationConfig>;
  priority?: number;
  hidden?: boolean;
  group?: string;
};
