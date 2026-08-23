import { SortDirection } from "@models/common";

// Parses the sort direction query parameter, ensuring it is either "asc" or "desc".
// If the value is not valid, it defaults to "asc".
export function parseSortDirection(value: unknown): SortDirection {
  return value === "desc" ? "desc" : "asc";
}

// Parses the search query parameter, ensuring it is a string and trimming any whitespace.
// If the value is not a string, it returns an empty string.
export function parseSearchQuery(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }
  return "";
}

// Parses a comma-separated string into an array of trimmed strings.
// If the value is not a string, it returns an empty array.
// This is used for parsing the nationalities and hobbies query parameters.
export function parseArray(value: unknown): string[] {
  if (typeof value !== "string") {
    return [];
  }
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

// Parses an integer from the query parameter, ensuring it is a positive integer.
// If the value is not a valid integer or is less than or equal to zero, it returns the provided default value.
// If a maxValue is provided, it ensures the returned value does not exceed that maximum.
export function parseInteger(
  value: unknown,
  defaultValue: number,
  maxValue?: number,
): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return defaultValue;
  }
  return maxValue !== undefined ? Math.min(parsed, maxValue) : parsed;
}
