import { MultiSelectOption } from "../models/multi-select-option.interface";
import { SelectOption } from "../models/select-option.interface";

export interface FilterSectionProps {
  title: string;
  items: MultiSelectOption<string>[];
  selectedItems: string[];
  searchPlaceholder?: string;

  onChange: (selectedItems: string[]) => void;
}
