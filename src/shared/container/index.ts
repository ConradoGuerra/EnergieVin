import { container } from "tsyringe";
import "@modules/wine/providers";
import WinesRepository from "@modules/wine/infra/typeorm/repositories/WinesRepository";
import IWinesRepository from "@modules/wine/repositories/IWinesRepository";
import IUsersRepository from "@modules/user/repositories/IUsersRepository";
import UsersRepository from "@modules/user/infra/typeorm/repositories/UsersRepository";
import IEvaluationsRepository from "@modules/evaluations/repositories/IEvaluationsRepository";
import EvaluationsRepository from "@modules/evaluations/infra/typeorm/repositories/EvaluationsRepository";

container.registerSingleton<IWinesRepository>(
  "WinesRepository",
  WinesRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IEvaluationsRepository>(
  "EvaluationsRepository",
  EvaluationsRepository
);
