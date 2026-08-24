import { Sort } from "@interfaces/models/sort.interface";
import { UserSortField } from "@interfaces/models/user.interface";

// Interface for the filters used in the useUsers hook, which manages user filtering and sorting based on search term, hobbies, nationalities, and sort options
export interface UseUsersFilters {
  searchTerm: string;
  hobbies: string[];
  nationalities: string[];
  sort: Sort<UserSortField>;
}
