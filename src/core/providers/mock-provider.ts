import type { DataProvider } from "@refinedev/core";

export const mockDataProvider: DataProvider = {
  getList: async (resource) => {
    const response = await fetch(`/mocks/${resource}.json`);
    const data = await response.json();
    return { data, total: data.length };
  },
  getOne: async (resource, { id }) => {
    const response = await fetch(`/mocks/${resource}.json`);
    const data = await response.json();
    const record = data.find((r: any) => r.id === id);
    return { data: record };
  },
  create: async () => ({ data: {} }),
  update: async () => ({ data: {} }),
  deleteOne: async () => ({ data: {} }),
};
