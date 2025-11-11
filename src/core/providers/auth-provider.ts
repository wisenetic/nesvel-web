import type { AuthProvider } from "@refinedev/core";
import { parseErrorMessage } from "@/core/utils/parse-error";
import {
  login,
  logout,
  refreshAccessToken,
  getUser,
  getAccessToken,
} from "@/core/api/auth.service";

export const authProvider: AuthProvider = {
  // 🔐 Called when user submits login form
  login: async ({ email, password }) => {
    try {
      await login({ email, password });
      return { success: true, redirectTo: "/" };
    } catch (error: unknown) {
      const message = parseErrorMessage(error);
      return {
        success: false,
        error: {
          message,
          name: "Auth Error",
        },
      };
    }
  },

  // 🚪 Called when user logs out
  logout: async () => {
    await logout();
    return { success: true, redirectTo: "/login" };
  },

  // ✅ Called before accessing protected routes
  check: async () => {
    const token = getAccessToken();
    if (!token) {
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        return {
          authenticated: false,
          redirectTo: "/login",
          logout: true,
        };
      }
    }
    return { authenticated: true };
  },

  // 👤 (Optional) Used for displaying user info in the header
  getIdentity: async () => {
    const user = getUser();
    return user
      ? {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        }
      : null;
  },

  // 🔐 (Optional) For role-based permission handling
  getPermissions: async () => {
    const user = getUser();
    return user?.role || "user";
  },

  /**
   * -------------------------------------------------------------
   * REQUIRED METHOD: onError (Refine v5+)
   * -------------------------------------------------------------
   * Handles global auth-related errors. Called automatically when
   * a DataProvider or hook throws an error (like 401 or 403).
   * You can decide whether to log out or just ignore it.
   */
  onError: async (error) => {
    console.warn("[AuthProvider:onError]", error?.message || error);

    // If token expired or user unauthorized → logout user
    if (
      error?.status === 401 ||
      error?.response?.status === 401 ||
      error?.message?.toLowerCase().includes("unauthorized")
    ) {
      // ✅ must return a valid OnErrorResponse
      return Promise.resolve({ logout: true, redirectTo: "/login" });
    }

    // ✅ still must return a valid OnErrorResponse (empty)
    return Promise.resolve({});
  },
};
