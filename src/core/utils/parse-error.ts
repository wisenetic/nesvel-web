import type { AxiosError } from "axios";

export function parseErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  ) {
    return (error as any).message;
  }

  if ((error as AxiosError)?.response) {
    const axiosErr = error as AxiosError<{ message?: string }>;
    return (
      axiosErr.response?.data?.message ||
      axiosErr.message ||
      "Unknown network error"
    );
  }

  return "Unknown error occurred";
}
