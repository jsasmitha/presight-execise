import { UserSortField } from "../interfaces/components/user-directory.interface";
import { User } from "../interfaces/models/user.interface";

export function parseArray(value: string | null): string[] {
  if (!value) {
    return [];
  }
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseUserSortField(value: string | null): UserSortField {
  switch (value) {
    case "firstName":
    case "lastName":
    case "age":
    case "nationality":
      return value;
    default:
      return "firstName"; // Default sort field
  }
}
