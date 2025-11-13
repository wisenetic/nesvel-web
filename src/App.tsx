import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
//import { BrowserRouter } from "react-router";
import { BrowserRouter } from "react-router-dom"; // <--- FIXED

import "./App.css";
import { Toaster } from "@/core/components/shared/notification/toaster";
import { useNotificationProvider } from "@/core/components/shared/notification/use-notification-provider";
import { i18nProvider } from "@/core/i18n/i18nProvider";
import { getDataProvider } from "@/core/providers/data-provider";
import { ThemeProvider } from "@/core/providers/theme-provider";
import { appResources } from "@/core/resources";
import { AppRoutes } from "@/core/router/app-routes";

import { authProvider } from "./core/providers/auth-provider";

function App() {
  const dataProvider = getDataProvider();

  //const { t, i18n } = useTranslation();
  // const i18nProvider = {
  //   translate: (key: string, params: object) => t(key, params),
  //   changeLocale: (lang: string) => i18n.changeLanguage(lang),
  //   getLocale: () => i18n.language,
  // };

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
              i18nProvider={i18nProvider} // vvv this already binds i18next!
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
