import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from './CreateUserService';

export default class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute(request.body);

    return response.json(user);
  }
}
