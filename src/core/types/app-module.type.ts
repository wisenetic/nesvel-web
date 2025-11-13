export type RoutePresentation = "page" | "drawer" | "modal";

export type AppModule = {
  resource: {
    name: string;

    list?: string;
    show?: string;
    edit?: string;
    create?: string;

    [key: string]: any;
  };

  routes: React.ReactNode;

  presentation?: {
    list?: RoutePresentation;
    show?: RoutePresentation;
    edit?: RoutePresentation;
    create?: RoutePresentation;

    [customKey: string]: RoutePresentation | undefined;
  };

  priority?: number;
  hidden?: boolean;
  group?: string;
};
