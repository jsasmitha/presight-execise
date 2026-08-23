import { UserSortField } from "../components/user-directory.interface";
import { Sort, SortOrder } from "./sort.interface";

export interface User {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
  hobbies: string[];
}

interface FilterCount {
  value: string;
  count: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}

export interface UserQuery {
  search?: string;
  nationalities: string[];
  hobbies: string[];
  sortField: UserSortField;
  sortDirection: SortOrder;
  page: number;
  pageSize: number;
}

export interface PaginatedUserResponse {
  users: User[];
  pagination: Pagination;
  filters: {
    hobbies: FilterCount[];
    nationalities: FilterCount[];
  };
}
