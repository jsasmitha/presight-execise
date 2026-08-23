import {
  PaginatedUserResponse,
  User,
  UserQuery,
} from "../interfaces/models/user.interface";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getUsers(
  query: UserQuery,
): Promise<PaginatedUserResponse> {
  const queryParams = new URLSearchParams();
  if (query.search) {
    queryParams.set("search", query.search);
  }
  if (query.nationalities.length > 0) {
    queryParams.set("nationalities", query.nationalities.join(","));
  }
  if (query.hobbies.length > 0) {
    queryParams.set("hobbies", query.hobbies.join(","));
  }
  queryParams.set("sortField", query.sortField);
  queryParams.set("sortDirection", query.sortDirection);
  queryParams.set("page", query.page.toString());
  queryParams.set("pageSize", query.pageSize.toString());

  const response = await fetch(`/api/users?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }
  return response.json();
}
