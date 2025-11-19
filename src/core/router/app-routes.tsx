import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router";
import { useLocation } from "react-router";
import { Outlet, Route, Routes } from "react-router";

import { Layout } from "@/core/components/layout";
import { ErrorComponent } from "@/core/components/layout/error-component";
import { ForgotPasswordForm } from "@/core/components/shared/form/forgot-password-form";
import { SignInForm } from "@/core/components/shared/form/sign-in-form";
import { SignUpForm } from "@/core/components/shared/form/sign-up-form";
import { appModules } from "@/core/modules";

import { RouteController } from "./route-controller";

export const AppRoutes = () => {
  const location = useLocation();
  const state = location.state as { background?: Location };
  const background = state?.background;

  return (
    <>
      {/* MAIN ROUTING (background layer) */}
      <Routes location={background ?? location}>
        <Route
          element={
            <Authenticated fallback={<CatchAllNavigate to="/login" />}>
              <Layout>
                <Outlet />
              </Layout>
            </Authenticated>
          }
        >
          <Route index element={<NavigateToResource resource="dashboard" />} />

          {appModules.map((mod) => (
            <Route
              key={mod.resource.name}
              path={`/${mod.resource.name}/*`}
              element={mod.routes}
            />
          ))}

          <Route path="*" element={<ErrorComponent />} />
        </Route>

        {/* PUBLIC ROUTES */}
        <Route
          element={
            <Authenticated fallback={<Outlet />}>
              <NavigateToResource />
            </Authenticated>
          }
        >
          <Route path="/login" element={<SignInForm />} />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        </Route>
      </Routes>

      {/* OVERLAY ROUTING (drawer/modal layer) */}
      <Routes location={location}>
        <Route>
          {appModules.map((mod) => (
            <Route
              key={mod.resource.name + "-overlay"}
              path={`/${mod.resource.name}/*`}
              element={<RouteController />}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
};
