import { Statement } from "better-sqlite3";

import db from "@db/database";
import { Hobby, UserHobby } from "@models/hobby";

export class HobbyRepository {
  private readonly _findAllHobbiesStmt: Statement<[], Hobby>;

  constructor() {
    this._findAllHobbiesStmt = db.prepare(`
      SELECT id, name
      FROM hobbies
      ORDER BY name ASC
    `);
  }

  // Retrieves all hobbies from the database, ordered by name in ascending order.
  findAllHobbies(): Hobby[] {
    return this._findAllHobbiesStmt.all();
  }

  // Retrieves the hobbies associated with a list of user IDs, ordered by hobby name in ascending order.
  findHobbyByIds(userIds: number[]): UserHobby[] {
    if (!userIds.length) {
      return [];
    }

    const placeholders = userIds.map(() => "?").join(",");
    const query = `
      SELECT uh.user_id AS userId, h.name AS hobby
      FROM user_hobbies uh
      INNER JOIN hobbies h ON uh.hobby_id = h.id
      WHERE uh.user_id IN (${placeholders})
      ORDER BY h.name ASC
    `;

    return db.prepare(query).all(...userIds) as UserHobby[];
  }
}
