import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_MODE = import.meta.env.VITE_API_MODE || "api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";
const USER_KEY = "auth_user";

console.info(
  `[AuthService] Running in ${API_MODE.toUpperCase()} mode — ${
    API_MODE === "mock" ? "using /public/mocks/users.json" : API_URL
  }`,
);
/* -------------------------------------------------------------
 * TOKEN HELPERS
 * ------------------------------------------------------------- */
export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

export const setTokens = (tokens: AuthTokens) => {
  localStorage.setItem(ACCESS_KEY, tokens.access_token);
  localStorage.setItem(REFRESH_KEY, tokens.refresh_token);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

/* -------------------------------------------------------------
 * MOCK IMPLEMENTATION
 * ------------------------------------------------------------- */
async function mockLogin(payload: LoginPayload): Promise<AuthTokens> {
  const res = await fetch("/mocks/auth/users.json");
  const users = await res.json();
  const user = users.find(
    (u: any) => u.email === payload.email && u.password === payload.password,
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Simulate tokens
  const tokens = {
    access_token: `mock_access_token_${user.id}`,
    refresh_token: `mock_refresh_token_${user.id}`,
  };

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  setTokens(tokens);

  return tokens;
}

async function mockLogout() {
  clearTokens();
}

async function mockRefreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  const newToken = "mock_access_token_refreshed";
  localStorage.setItem(ACCESS_KEY, newToken);
  return newToken;
}

/* -------------------------------------------------------------
 * API IMPLEMENTATION (Axios)
 * ------------------------------------------------------------- */

async function apiLogin(payload: LoginPayload): Promise<AuthTokens> {
  const { data } = await axios.post(`${API_URL}/auth/login`, payload);
  setTokens(data);
  if (data.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }
  return data;
}

async function apiLogout() {
  try {
    await axios.post(`${API_URL}/auth/logout`, {
      refresh_token: getRefreshToken(),
    });
  } catch (err) {
    console.warn("Logout failed or not implemented:", err);
  } finally {
    clearTokens();
  }
}

async function apiRefreshAccessToken(): Promise<string | null> {
  const refresh_token = getRefreshToken();
  if (!refresh_token) return null;

  try {
    const { data } = await axios.post(`${API_URL}/auth/refresh`, {
      refresh_token,
    });

    if (data.access_token) {
      localStorage.setItem(ACCESS_KEY, data.access_token);
      return data.access_token;
    }
    return null;
  } catch (err) {
    console.error("Refresh token failed:", err);
    clearTokens();
    return null;
  }
}

/* -------------------------------------------------------------
 * UNIFIED PUBLIC API
 * ------------------------------------------------------------- */
export const login = async (payload: LoginPayload): Promise<AuthTokens> => {
  return API_MODE === "mock" ? mockLogin(payload) : apiLogin(payload);
};

export const logout = async () => {
  return API_MODE === "mock" ? mockLogout() : apiLogout();
};

export const refreshAccessToken = async (): Promise<string | null> => {
  return API_MODE === "mock"
    ? mockRefreshAccessToken()
    : apiRefreshAccessToken();
};

export const getUser = (): any | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};
