import type { Request, Response } from "express";

import { UserService } from "../services/user.service";
import { SortDirection } from "../types/common";
import { SortField, UserQuery } from "../types/user";

export class UserController {
  constructor(private readonly _userService: UserService) {}

  // Handles the GET request to retrieve a paginated list of users based on query parameters. It parses the query parameters, constructs a UserQuery object, and invokes the UserService to fetch the users. The response is sent back in JSON format with appropriate status codes.
  getUsers(req: Request, res: Response): void {
    try {
      const query: UserQuery = {
        search: this._parseSearchQuery(req.query.search),
        nationalities: this._parseArray(req.query.nationalities),
        hobbies: this._parseArray(req.query.hobbies),
        sortField: this._parseSortField(req.query.sortField),
        sortDirection: this._parseSortDirection(req.query.sortDirection),
        page: this._parseInteger(req.query.page, 1),
        pageSize: this._parseInteger(req.query.pageSize, 10, 100),
      };

      const result = this._userService.getUsers(query);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  // Parses the search query parameter, ensuring it is a string and trimming any whitespace. If the value is not a string, it returns an empty string.
  private _parseSearchQuery(value: unknown): string {
    if (typeof value === "string") {
      return value.trim();
    }
    return "";
  }

  // Parses a comma-separated string into an array of trimmed strings. If the value is not a string, it returns an empty array. This is used for parsing the nationalities and hobbies query parameters.
  private _parseArray(value: unknown): string[] {
    if (typeof value !== "string") {
      return [];
    }
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  // Parses the sort field query parameter, ensuring it is one of the valid SortField values. If the value is not valid, it defaults to "firstName".
  private _parseSortField(value: unknown): SortField {
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

  // Parses the sort direction query parameter, ensuring it is either "asc" or "desc". If the value is not valid, it defaults to "asc".
  private _parseSortDirection(value: unknown): SortDirection {
    return value === "desc" ? "desc" : "asc";
  }

  // Parses an integer from the query parameter, ensuring it is a positive integer. If the value is not a valid integer or is less than or equal to zero, it returns the provided default value. If a maxValue is provided, it ensures the returned value does not exceed that maximum.
  private _parseInteger(
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
}
