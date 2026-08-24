import { SelectOption } from "@interfaces/models/select-option.interface";
import { Sort } from "@interfaces/models/sort.interface";

// Props interface for the SortControls component, which represents sorting controls with a selected sort value, available field options, and an event handler for sort changes
export interface SortControlsProps<T extends string> {
  value: Sort<T>;
  fieldOptions: SelectOption<T>[];
  onSortChange: (sort: Sort<T>) => void;
}
