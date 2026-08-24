import { MultiSelectOption } from "@interfaces/models/multi-select-option.interface";

// Props interface for the FilterSection component, which represents a section of filters with selectable options
export interface FilterSectionProps {
  title: string;
  items: MultiSelectOption<string>[];
  selectedItems: string[];
  searchPlaceholder?: string;

  onChange: (selectedItems: string[]) => void;
}
