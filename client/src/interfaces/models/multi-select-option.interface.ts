// Interface for a multi-select option, which represents an option in a multi-select dropdown with a value, label, and optional count of selected items
export interface MultiSelectOption<T> {
  value: T;
  label: string;
  count?: number;
}
