import { USER_SORT_FIELD_MAP } from "@constants/user";
import db from "@db/database";
import { CountResult, FilterCount } from "@models/common";
import { SqlParameter, WhereClauseResult } from "@models/database";
import { UserQuery, UserWithoutHobbies } from "@models/user";

export class UserRepository {
  // Builds the WHERE clause and parameters for filtering by first name, last name, and full name.
  private _buildSearchClause(
    query: UserQuery,
    conditions: string[],
    params: SqlParameter[],
  ): void {
    if (!query.search) {
      return;
    }

    const searchTerm = `%${query.search.toLowerCase()}%`;
    conditions.push(`
      (
        LOWER(u.first_name) LIKE ? 
        OR LOWER(u.last_name) LIKE ? 
        OR LOWER(u.first_name || ' ' || u.last_name) LIKE ?
      )
    `);
    params.push(searchTerm, searchTerm, searchTerm);
  }

  // Builds the WHERE clause and parameters for filtering by nationality
  private _buildNationalityClause(
    query: UserQuery,
    conditions: string[],
    params: SqlParameter[],
  ): void {
    if (!query.nationalities.length) {
      return;
    }

    const placeholders = query.nationalities.map(() => "?").join(",");
    conditions.push(`u.nationality IN (${placeholders})`);
    params.push(...query.nationalities);
  }

  // Builds the WHERE clause and parameters for filtering by all selected hobbies
  private _buildHobbyClause(
    query: UserQuery,
    conditions: string[],
    params: SqlParameter[],
  ): void {
    if (!query.hobbies.length) {
      return;
    }

    const placeholders = query.hobbies.map(() => "?").join(", ");
    conditions.push(`
      u.id IN (
        SELECT uh.user_id
        FROM user_hobbies uh
        INNER JOIN hobbies h ON uh.hobby_id = h.id
        WHERE h.name IN (${placeholders})
        GROUP BY uh.user_id
        HAVING COUNT(DISTINCT h.name) = ?
      )
    `);
    params.push(...query.hobbies, query.hobbies.length);
  }

  // Combines all active filters into a SQL WHERE clause and prepares the corresponding parameters for the query.
  private _buildWhereClause(query: UserQuery): WhereClauseResult {
    const conditions: string[] = [];
    const params: SqlParameter[] = [];

    this._buildSearchClause(query, conditions, params);
    this._buildNationalityClause(query, conditions, params);
    this._buildHobbyClause(query, conditions, params);

    return {
      where: conditions.length ? `WHERE ${conditions.join(" AND ")}` : "",
      params,
    };
  }

  // Retrieves a paginated list of users based on the provided query filters, sorting, and pagination parameters.
  findUsers(query: UserQuery): UserWithoutHobbies[] {
    const { where, params } = this._buildWhereClause(query);

    const offset = (query.page - 1) * query.pageSize;

    const sortColumn = USER_SORT_FIELD_MAP[query.sortField];

    const sortDirection =
      query.sortDirection.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const sql = `
      SELECT u.id, u.avatar, u.first_name AS firstName, u.last_name AS lastName, u.age, u.nationality
      FROM users u
      ${where}
      ORDER BY u.${sortColumn} ${sortDirection},
      u.id ASC
      LIMIT ? OFFSET ?
    `;

    return db
      .prepare(sql)
      .all(...params, query.pageSize, offset) as UserWithoutHobbies[];
  }

  // Counts the total number of users that match the provided query filters.
  countUsers(query: UserQuery): number {
    const { where, params } = this._buildWhereClause(query);

    const sql = `
      SELECT COUNT(*) AS count
      FROM users u
      ${where}
    `;

    const result = db.prepare(sql).get(...params) as CountResult;
    return result.count;
  }

  // Retrieves the top 20 hobbies based on the number of users associated with each hobby, filtered by the provided query parameters.
  findTopHobbies(query: UserQuery): FilterCount[] {
    const { where, params } = this._buildWhereClause(query);

    const sql = `
      SELECT h.name AS value, COUNT(DISTINCT u.id) AS count
      FROM users u
      INNER JOIN user_hobbies uh ON u.id = uh.user_id
      INNER JOIN hobbies h ON uh.hobby_id = h.id
      ${where}
      GROUP BY h.id, h.name
      ORDER BY count DESC, h.name ASC
      LIMIT 20
    `;

    return db.prepare(sql).all(...params) as FilterCount[];
  }

  // Retrieves the top 20 nationalities based on the number of users associated with each nationality, filtered by the provided query parameters.
  findTopNationalities(query: UserQuery): FilterCount[] {
    const { where, params } = this._buildWhereClause(query);

    const sql = `
      SELECT u.nationality AS value, COUNT(*) AS count
      FROM users u
      ${where}
      GROUP BY u.nationality
      ORDER BY count DESC, u.nationality ASC
      LIMIT 20
    `;

    return db.prepare(sql).all(...params) as FilterCount[];
  }
}
