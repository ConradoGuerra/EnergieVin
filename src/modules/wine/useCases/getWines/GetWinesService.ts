import Wine from "@modules/wine/infra/typeorm/entities/Wine";
import IWinesRepository from "@modules/wine/repositories/IWinesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetWinesService {
  constructor(
    @inject("WinesRepository")
    private winesRepository: IWinesRepository
  ) {}

  async execute(): Promise<Wine[]> {
    return this.winesRepository.findAllWines();
  }
}
