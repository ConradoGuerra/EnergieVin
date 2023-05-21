import CreateUserController from '@modules/user/useCases/createUser/CreateUserController';
import { Router } from 'express';

const createUserController = new CreateUserController();
const users = Router();
users.post('/', createUserController.handle);

export default users;
