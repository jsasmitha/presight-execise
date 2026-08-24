import { MultiSelectOption } from "@interfaces/models/multi-select-option.interface";

// Props interface for the MultiSelectionList component, which represents a list of selectable options with multi-selection capability
export interface MultiSelectionListProps<T> {
  items: MultiSelectOption<T>[];
  selectedItems: T[];
  onSelectionChange: (selectedItems: T[]) => void;
}
