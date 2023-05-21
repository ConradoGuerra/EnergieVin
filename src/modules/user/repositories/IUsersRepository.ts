import CreateUserDTO from "../dtos/CreateUserDTO";
import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {
  createUser(userDTO: CreateUserDTO): Promise<User>;
}
