import type { Request, Response } from "express";

import { UserService } from "@services/user.service";
import {
  parseSearchQuery,
  parseArray,
  parseSortDirection,
  parseInteger,
} from "@utils/parse.utils";
import { parseSortField } from "@utils/user-query.utils";
import { UserQuery } from "@models/user";

export class UserController {
  constructor(private readonly _userService: UserService) {}

  //  Handles the GET request to retrieve a paginated list of users based on query parameters.
  //  It parses the query parameters, constructs a UserQuery object, and invokes the UserService to fetch the users.
  //  The response is sent back in JSON format with appropriate status codes.
  getUsers(req: Request, res: Response): void {
    try {
      const query: UserQuery = {
        search: parseSearchQuery(req.query.search),
        nationalities: parseArray(req.query.nationalities),
        hobbies: parseArray(req.query.hobbies),
        sortField: parseSortField(req.query.sortField),
        sortDirection: parseSortDirection(req.query.sortDirection),
        page: parseInteger(req.query.page, 1),
        pageSize: parseInteger(req.query.pageSize, 10, 100),
      };

      const result = this._userService.getUsers(query);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }
}
