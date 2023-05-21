import User from '@modules/user/infra/typeorm/entities/User';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id?: number;
  name: string;
  specialist: boolean;
  date: Date;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(request: IRequest): Promise<User> {
    return this.usersRepository.createUser(request);
  }
}
