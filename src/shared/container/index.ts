import { container } from "tsyringe";
import "@modules/wine/providers";
import WinesRepository from "@modules/wine/infra/typeorm/repositories/WinesRepository";
import IWinesRepository from "@modules/wine/repositories/IWinesRepository";

container.registerSingleton<IWinesRepository>(
  "WinesRepository",
  WinesRepository
);
