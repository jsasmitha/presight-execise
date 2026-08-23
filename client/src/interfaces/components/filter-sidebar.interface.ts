import { MultiSelectOption } from "../models/multi-select-option.interface";

export interface FilterSidebarProps {
  hobbies: MultiSelectOption<string>[];
  nationalities: MultiSelectOption<string>[];

  selectedHobbies: string[];
  selectedNationalities: string[];

  onHobbyChange: (hobbies: string[]) => void;
  onNationalityChange: (nationalities: string[]) => void;

  onResetFilters: () => void;
}
