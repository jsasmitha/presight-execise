import { MultiSelectOption } from "@interfaces/models/multi-select-option.interface";

// Props interface for the FilterSidebar component, which represents a sidebar containing filter sections for hobbies and nationalities
export interface FilterSidebarProps {
  hobbies: MultiSelectOption<string>[];
  nationalities: MultiSelectOption<string>[];

  selectedHobbies: string[];
  selectedNationalities: string[];

  onHobbyChange: (hobbies: string[]) => void;
  onNationalityChange: (nationalities: string[]) => void;

  onResetFilters: () => void;
}
