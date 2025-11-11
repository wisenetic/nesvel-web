import { apiDataProvider } from "./api-provider";
import { mockDataProvider } from "./mock-provider";

const MODE = import.meta.env.VITE_API_MODE;

export const getDataProvider = () => {
  if (MODE === "mock") {
    console.log("🧪 Using Mock Data Provider");
    return mockDataProvider;
  }

  console.log("🌐 Using Axios API Data Provider");
  return apiDataProvider;
};
