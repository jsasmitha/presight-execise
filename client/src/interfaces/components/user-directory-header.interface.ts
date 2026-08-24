import { SelectOption } from "@interfaces/models/select-option.interface";
import { Sort } from "@interfaces/models/sort.interface";

// Props interface for the UserDirectoryHeader component, which represents a header for the user directory with a title, search term, sorting options, and event handlers for search and sort changes
export interface UserDirectoryHeaderProps<T> {
  title: string;
  searchTerm: string;
  sort: Sort<T>;
  sortFieldOptions: SelectOption<T>[];

  onSearch: (searchTerm: string) => void;
  onSortChange: (sort: Sort<T>) => void;
}
