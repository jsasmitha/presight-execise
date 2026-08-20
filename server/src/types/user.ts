import { FilterCount, Pagination, SortDirection } from "./common";

export type SortField = 'firstName' | 'lastName'| 'age' | 'nationality';

export interface User {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
  hobbies: string[];
}

export type UserWithoutHobbies = Omit<User, 'hobbies'>;

export interface UserQuery {
  search?: string;
  nationalities: string[];
  hobbies: string[];
  sortField: SortField;
  sortDirection: SortDirection;
  page: number;
  pageSize: number;
}

interface UserFilters {
  hobbies: FilterCount[];
  nationalities: FilterCount[];
}

export interface PaginatedUserResponse {
  users: User[];
  pagination: Pagination;
  filters: UserFilters;
}
