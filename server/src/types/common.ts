
export type SortDirection = 'asc' | 'desc';

export interface FilterCount {
  value: string;
  count: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface CountResult {
  count: number;
}