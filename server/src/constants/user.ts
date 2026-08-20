import { SortField } from "../types/user"

export const USER_SORT_FIELD_MAP: Readonly <Record<SortField, string>> = {
  firstName: "first_name",
  lastName: "last_name",
  age: "age",
  nationality: "nationality"
};