import { UserSortField } from "@interfaces/models/user.interface";

// Utility function to parse a comma-separated string into an array of trimmed strings, filtering out any empty values
export function parseArray(value: string | null): string[] {
  if (!value) {
    return [];
  }
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

// Utility function to parse a user sort field from a string, returning a valid UserSortField or defaulting to "firstName" if the value is invalid
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
