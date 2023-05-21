import { IWineDataApiProvider } from "@modules/wine/providers/WineDataApiProvider/models/IWineDataApiProvider";
import IWinesRepository from "@modules/wine/repositories/IWinesRepository";
import { inject } from "tsyringe";

export default class CreateWineService {
  constructor(
    @inject("winesRepository")
    private winesRepository: IWinesRepository,
    @inject("WineDataApiProvider")
    private wineDataApiProvider: IWineDataApiProvider
  ) {}

  async execute(): Promise<any> {
    const wineData = await this.wineDataApiProvider.getWinesData();
    const wines = [];
    for await (let wine of wineData) {
      const [hasWine] = await this.winesRepository.findByName(wine.name);

      if (hasWine) {
        const winePrice = await this.winesRepository.createWinePrice({
          wineId: hasWine.id,
          price: wine.price,
          date: wine.date,
        });

        wines.push({ wine: hasWine, winePrice });
        continue;
      }

      const wineCreated = await this.winesRepository.createWine({
        name: wine.name,
        website: wine.website,
        date: wine.date,
      });

      const winePrice = await this.winesRepository.createWinePrice({
        wineId: wineCreated.id,
        price: wine.price,
        date: wine.date,
      });

      const wineProperties = await this.winesRepository.createWineProperty({
        wineId: wineCreated.id,
        wineProperty: wine.property,
      });

      wines.push({ wineCreated, winePrice, wineProperties });
    }
    return wines;
  }
}
