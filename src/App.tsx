import "./core/i18n/i18n"; // 👈 Important: initialize before app starts
import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";

import { BrowserRouter } from "react-router";
import "./App.css";
import { authProvider } from "./core/providers/auth-provider";
import { Toaster } from "@/core/components/shared/notification/toaster";
import { useNotificationProvider } from "@/core/components/shared/notification/use-notification-provider";
import { ThemeProvider } from "@/core/providers/theme-provider";
import { getDataProvider } from "@/core/providers/data-provider";
import { i18nProvider } from "@/core/i18n/i18nProvider";
import { appResources } from "@/core/resources";
import { AppRoutes } from "@/core/router/app-routes";

function App() {
  const dataProvider = getDataProvider();

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              authProvider={authProvider}
              i18nProvider={i18nProvider}
              resources={appResources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "j35ggW-mPJX5C-cuBY6x",
              }}
            >
              <AppRoutes />
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
