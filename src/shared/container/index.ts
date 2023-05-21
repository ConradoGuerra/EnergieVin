import { container } from "tsyringe";
import "@modules/wine/providers";
import WinesRepository from "@modules/wine/infra/typeorm/repositories/WinesRepository";
import IWinesRepository from "@modules/wine/repositories/IWinesRepository";
import IUsersRepository from "@modules/user/repositories/IUsersRepository";
import UsersRepository from "@modules/user/infra/typeorm/repositories/UsersRepository";

container.registerSingleton<IWinesRepository>(
  "WinesRepository",
  WinesRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
