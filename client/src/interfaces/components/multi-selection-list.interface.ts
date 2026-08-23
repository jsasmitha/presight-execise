import { MultiSelectOption } from "../models/multi-select-option.interface";

export interface MultiSelectionListProps<T> {
  items: MultiSelectOption<T>[];
  selectedItems: T[];
  onSelectionChange: (selectedItems: T[]) => void;
}
