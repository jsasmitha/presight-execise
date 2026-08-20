import { Router } from "express";

import { userController } from "../container";

const router = Router();

router.get("/", userController.getUsers.bind(userController));

export default router;