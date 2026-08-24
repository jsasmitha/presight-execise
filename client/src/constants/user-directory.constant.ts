import { UserSortField } from "@interfaces/models/user.interface";
import { SelectOption } from "@interfaces/models/select-option.interface";

// Constants for user sorting options used in the user directory
export const USER_SORT_FIELDS: SelectOption<UserSortField>[] = [
  { value: "firstName", label: "First Name" },
  { value: "lastName", label: "Last Name" },
  { value: "age", label: "Age" },
  { value: "nationality", label: "Nationality" },
];
