import { UserSortField } from "../interfaces/components/user-directory.interface";
import { SelectOption } from "../interfaces/models/select-option.interface";

export const USER_SORT_FIELDS: SelectOption<UserSortField>[] = [
  { value: "firstName", label: "First Name" },
  { value: "lastName", label: "Last Name" },
  { value: "age", label: "Age" },
  { value: "nationality", label: "Nationality" },
];
