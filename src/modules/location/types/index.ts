export type LocationType = "site" | "building" | "floor" | "zone";

export interface LocationNode {
  id: string;
  name: string;
  type: LocationType;
  parentId: string | null;
  depth: number;
  orderIndex: number;
}
