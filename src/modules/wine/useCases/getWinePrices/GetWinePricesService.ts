import Wine from "@modules/wine/infra/typeorm/entities/Wine";
import WinePrice from "@modules/wine/infra/typeorm/entities/WinePrice";
import IWinesRepository from "@modules/wine/repositories/IWinesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetWinePricesService {
  constructor(
    @inject("WinesRepository")
    private winesRepository: IWinesRepository
  ) {}

  async execute(
    wineId: number,
    limit: number
  ): Promise<{
    wine: Wine;
    prices: WinePrice[];
  }> {
    try {
      const wine = await this.winesRepository.findWineById(wineId);
      const prices = await this.winesRepository.findWinePricesById(
        wineId,
        limit
      );

      return { wine, prices };
    } catch (error) {
      console.log(error);
    }
  }
}
