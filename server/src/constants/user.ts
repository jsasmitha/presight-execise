import { SortField } from "@models/user";

// Defines a mapping between the SortField enum values and their corresponding database column names.
export const USER_SORT_FIELD_MAP: Readonly<Record<SortField, string>> = {
  firstName: "first_name",
  lastName: "last_name",
  age: "age",
  nationality: "nationality",
};
