// Type for the sort order, which can be either ascending ("asc") or descending ("desc")
export type SortOrder = "asc" | "desc";

// Interface for the sort options, which includes the field to sort by and the sort direction
export interface Sort<T> {
  sortField: T;
  sortDirection: SortOrder;
}
