import { SortOrder } from "./sort.interface";

// Interface representing a user in the system, including properties such as id, avatar, first name, last name, age, nationality, and hobbies
export interface User {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
  hobbies: string[];
}

// Interface representing the count of a specific filter value, used for displaying filter options with their respective counts
interface FilterCount {
  value: string;
  count: number;
}

// Interface for the response from the API when fetching users, which includes the list of users, pagination information, and available filters with their counts
export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}

// Interface for the query parameters used when fetching users, which includes search term, selected nationalities and hobbies, sort options, and pagination information
export interface UserQuery {
  search?: string;
  nationalities: string[];
  hobbies: string[];
  sortField: UserSortField;
  sortDirection: SortOrder;
  page: number;
  pageSize: number;
}

// Interface for the response from the API when fetching users, which includes the list of users, pagination information, and available filters with their counts
export interface PaginatedUserResponse {
  users: User[];
  pagination: Pagination;
  filters: {
    hobbies: FilterCount[];
    nationalities: FilterCount[];
  };
}

// Type representing the fields by which users can be sorted in the user directory
export type UserSortField = "firstName" | "lastName" | "age" | "nationality";
