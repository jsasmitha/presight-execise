export type SortOrder = "asc" | "desc";

export interface Sort<T> {
  sortField: T;
  sortDirection: SortOrder;
}
