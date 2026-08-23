import { SortField } from "@models/user";

// Parses the sort field query parameter, ensuring it is one of the valid SortField values.
// If the value is not valid, it defaults to "firstName".
export function parseSortField(value: unknown): SortField {
  const validFields: SortField[] = [
    "firstName",
    "lastName",
    "age",
    "nationality",
  ];
  return typeof value === "string" && validFields.includes(value as SortField)
    ? (value as SortField)
    : "firstName";
}
