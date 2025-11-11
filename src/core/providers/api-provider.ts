import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import type { DataProvider } from "@refinedev/core";

const API_URL = import.meta.env.VITE_API_URL;
const REFRESH_URL = `${API_URL}/auth/refresh`;

/**
 * Local token helpers
 */
const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");
const setAccessToken = (token: string) =>
  localStorage.setItem("access_token", token);
const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

/**
 * Axios instance
 */
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

/**
 * Flag + queue to handle multiple 401s concurrently
 */
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

/**
 * Request interceptor — inject token
 */
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Response interceptor — handle 401 + refresh
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue other 401 requests while refresh is happening
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("Missing refresh token");

        const { data } = await axios.post(REFRESH_URL, {
          refresh_token: refreshToken,
        });

        const newAccessToken = data.access_token;
        setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);
        isRefreshing = false;

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

/**
 * Refine DataProvider using Axios
 */
export const apiDataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { data } = await api.get(`/${resource}`, { params });
    return { data, total: Array.isArray(data) ? data.length : data.total ?? 0 };
  },
  getOne: async (resource, { id }) => {
    const { data } = await api.get(`/${resource}/${id}`);
    return { data };
  },
  create: async (resource, { variables }) => {
    const { data } = await api.post(`/${resource}`, variables);
    return { data };
  },
  update: async (resource, { id, variables }) => {
    const { data } = await api.put(`/${resource}/${id}`, variables);
    return { data };
  },
  deleteOne: async (resource, { id }) => {
    const { data } = await api.delete(`/${resource}/${id}`);
    return { data };
  },
};
