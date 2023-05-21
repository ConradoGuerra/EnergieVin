import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm";
import IUsersRepository from "@modules/user/repositories/IUsersRepository";
import User from "../entities/User";
import CreateUserDTO from "@modules/user/dtos/CreateUserDTO";

export default class UsersRepository implements IUsersRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(userDTO: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create(userDTO);
    await this.userRepository.save(user);
    return user;
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}
