import { SelectOption } from "../models/select-option.interface";
import { Sort } from "../models/sort.interface";

export interface SortControlsProps<T extends string> {
  value: Sort<T>;
  fieldOptions: SelectOption<T>[];
  onSortChange: (sort: Sort<T>) => void;
}
