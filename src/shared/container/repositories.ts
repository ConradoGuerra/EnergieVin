import { container } from "tsyringe";
import WinesRepository from "@modules/wine/infra/typeorm/repositories/WinesRepository";
import IWinesRepository from "@modules/wine/repositories/IWinesRepository";

container.registerSingleton<IWinesRepository>(
  "WinesRepository",
  WinesRepository
);
