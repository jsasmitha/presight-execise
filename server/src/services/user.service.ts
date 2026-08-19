import { HobbyRepository } from "../repositories/hobby.repository";
import { UserRepository } from "../repositories/user.repository";
import { PaginatedUserResponse, UserQuery } from "../types/user";

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hobbyRepository: HobbyRepository,
  ) {}

  // Retrieves a paginated list of users based on the provided query filters, sorting, and pagination parameters. It also fetches the associated hobbies for each user and prepares the response with pagination details and available filters.
  getUsers(query: UserQuery): PaginatedUserResponse[] {
    const usersRow = this.userRepository.findUsers(query);

    const hobbies = this.hobbyRepository.findHobbyByIds(
      usersRow.map((user) => user.id),
    );

    const hobbyUserMap = new Map<number, string[]>();
    hobbies.forEach((hobby) => {
      const userHobbies = hobbyUserMap.get(hobby.user_id) || [];
      userHobbies.push(hobby.hobby);
      hobbyUserMap.set(hobby.user_id, userHobbies);
    });

    const users = usersRow.map((user) => ({
      ...user,
      hobbies: hobbyUserMap.get(user.id) || [],
    }));

    const total = this.userRepository.countUsers(query);

    const totalPages = Math.ceil(total / query.pageSize);

    return [
      {
        users,
        pagination: {
          page: query.page,
          pageSize: query.pageSize,
          total,
          totalPages,
          hasNext: query.page < totalPages,
          hasPrevious: query.page > 1,
        },
        filters: {
          hobbies: this.userRepository.findTopHobbies(query),
          nationalities: this.userRepository.findTopNationalities(query),
        },
      },
    ];
  }
}
