import { UserSortField } from "../components/user-directory.interface";
import { Sort } from "../models/sort.interface";

export interface UseUsersFilters {
  searchTerm: string;
  hobbies: string[];
  nationalities: string[];
  sort: Sort<UserSortField>;
}
