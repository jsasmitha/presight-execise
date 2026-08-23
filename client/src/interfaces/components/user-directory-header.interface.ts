import { SelectOption } from "../models/select-option.interface";
import { Sort } from "../models/sort.interface";

export interface UserDirectoryHeaderProps<T> {
  title: string;
  searchTerm: string;
  sort: Sort<T>;
  sortFieldOptions: SelectOption<T>[];

  onSearch: (searchTerm: string) => void;
  onSortChange: (sort: Sort<T>) => void;
}
