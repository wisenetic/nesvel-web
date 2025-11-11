import type {
  DataProvider,
  BaseRecord,
  GetListResponse,
  GetOneResponse,
  CreateResponse,
  UpdateResponse,
  DeleteOneResponse,
  GetListParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteOneParams,
} from "@refinedev/core";

/**
 * Mock DataProvider with explicit param types to avoid implicit any issues.
 * Supports filtering, sorting, pagination.
 */
export const mockDataProvider: DataProvider = {
  // --- LIST ---
  async getList<TData extends BaseRecord = BaseRecord>(
    params: GetListParams,
  ): Promise<GetListResponse<TData>> {
    const { resource, pagination, sorters, filters } = params;
    const response = await fetch(`/mocks/${resource}/${resource}.json`);
    const data: TData[] = await response.json();
    let records = Array.isArray(data) ? data : [];

    // Filtering
    if (filters && filters.length > 0) {
      filters.forEach(({ field, operator, value }) => {
        if (value === undefined || value === null) return;
        switch (operator) {
          case "eq":
            records = records.filter((r) => r[field as keyof TData] === value);
            break;
          case "ne":
            records = records.filter((r) => r[field as keyof TData] !== value);
            break;
          case "contains":
            records = records.filter((r) =>
              String(r[field as keyof TData])
                .toLowerCase()
                .includes(String(value).toLowerCase()),
            );
            break;
          case "gte":
            records = records.filter(
              (r) => (r[field as keyof TData] as any) >= value,
            );
            break;
          case "lte":
            records = records.filter(
              (r) => (r[field as keyof TData] as any) <= value,
            );
            break;
          default:
            break;
        }
      });
    }

    // Sorting (first sorter only)
    if (sorters && sorters.length > 0) {
      const { field, order } = sorters[0];
      records = [...records].sort((a, b) => {
        const av = a[field as keyof TData] as any;
        const bv = b[field as keyof TData] as any;
        if (av === bv) return 0;
        return av > bv ? (order === "asc" ? 1 : -1) : order === "asc" ? -1 : 1;
      });
    }

    // Pagination
    const current = pagination?.current ?? 1;
    const pageSize = pagination?.pageSize ?? 10;
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    const paginated = records.slice(start, end);

    return {
      data: paginated,
      total: records.length,
    };
  },

  // --- GET ONE ---
  async getOne<TData extends BaseRecord = BaseRecord>(
    params: GetOneParams,
  ): Promise<GetOneResponse<TData>> {
    const { resource, id } = params;
    const response = await fetch(`/mocks/${resource}/${resource}.json`);
    const data: TData[] = await response.json();
    const record = data.find((r) => r.id === id) as TData;
    return { data: record };
  },

  // --- CREATE ---
  async create<TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: CreateParams<TVariables>,
  ): Promise<CreateResponse<TData>> {
    const { resource, variables } = params;
    const id = crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 9);
    const newRecord = { id, ...(variables as object) } as unknown as TData;
    // Note: if you want persistence across calls, add in-memory mutation logic here
    return { data: newRecord };
  },

  // --- UPDATE ---
  async update<TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: UpdateParams<TVariables>,
  ): Promise<UpdateResponse<TData>> {
    const { resource, id, variables } = params;
    const updated = { id, ...(variables as object) } as unknown as TData;
    return { data: updated };
  },

  // --- DELETE ONE ---
  async deleteOne<TData extends BaseRecord = BaseRecord>(
    params: DeleteOneParams,
  ): Promise<DeleteOneResponse<TData>> {
    const { resource, id } = params;
    // return deleted id
    return { data: { id } as unknown as TData };
  },

  // The rest of the DataProvider methods (getMany, updateMany, etc.) can be added if needed:
  // getMany, createMany, updateMany, deleteMany, getApiUrl, custom, etc.
};
