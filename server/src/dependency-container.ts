import { UserController } from "@controllers/user.controller";
import { HobbyRepository } from "@repositories/hobby.repository";
import { UserRepository } from "@repositories/user.repository";
import { UserService } from "@services/user.service";

const userRepository = new UserRepository();
const hobbyRepository = new HobbyRepository();

const userService = new UserService(userRepository, hobbyRepository);

export const userController = new UserController(userService);
