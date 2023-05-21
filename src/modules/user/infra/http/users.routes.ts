import CreateUserController from "@modules/user/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();

import { Router } from "express";

const users = Router();
users.post("/", createUserController.handle);

export default users;
