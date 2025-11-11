import { Outlet, Route, Routes } from "react-router";
import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router";
import { Layout } from "@/core/components/layout";
import { ErrorComponent } from "@/core/components/layout/error-component";

import { ForgotPasswordForm } from "@/core/components/shared/form/forgot-password-form";
import { SignInForm } from "@/core/components/shared/form/sign-in-form";
import { SignUpForm } from "@/core/components/shared/form/sign-up-form";

import { appModules } from "@/core/modules";
// import { Login } from "@/modules/auth/pages/login.page";
// import { Register } from "@/modules/auth/pages/register.page";
// import { ForgotPassword } from "@/modules/auth/pages/forgot-password.page";

export const AppRoutes = () => (
  <Routes>
    {/* Authenticated layout */}
    <Route
      element={
        <Authenticated
          key="authenticated-inner"
          fallback={<CatchAllNavigate to="/login" />}
        >
          <Layout>
            <Outlet />
          </Layout>
        </Authenticated>
      }
    >
      <Route index element={<NavigateToResource resource="dashboard" />} />
      {/* ✅ Each module defines its own react-router-dom <Routes> */}
      {appModules.map((mod) => (
        <Route
          key={mod.resource.name}
          path={`/${mod.resource.name}/*`}
          element={mod.routes}
        />
      ))}
      <Route path="*" element={<ErrorComponent />} />
    </Route>
    {/* Public routes */}
    <Route
      element={
        <Authenticated key="authenticated-outer" fallback={<Outlet />}>
          <NavigateToResource />
        </Authenticated>
      }
    >
      <Route path="/login" element={<SignInForm />} />
      <Route path="/register" element={<SignUpForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
    </Route>
  </Routes>
);
