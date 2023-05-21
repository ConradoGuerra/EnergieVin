import Wine from "@modules/wine/infra/typeorm/entities/Wine";
import WinePrice from "@modules/wine/infra/typeorm/entities/WinePrice";
import WineProperty from "@modules/wine/infra/typeorm/entities/WineProperty";
import IWinesRepository from "@modules/wine/repositories/IWinesRepository";

interface IRequest {
  name: string;
  property: {
    origin: string;
    color: string;
    year: number;
  };
  price: number;
  website: string;
  date: Date;
}

export default class CreateWineService {
  constructor(private winesRepository: IWinesRepository) {}

  async execute(request: IRequest[]): Promise<any> {
    const wines = [];
    for await (let wineData of request) {
      const [hasWine] = await this.winesRepository.findByName(wineData.name);

      if (hasWine) {
        const winePrice = await this.winesRepository.createWinePrice({
          wineId: hasWine.id,
          price: wineData.price,
          date: wineData.date,
        });

        wines.push({ wine: hasWine, winePrice });
        continue;
      }

      const wine = await this.winesRepository.createWine({
        name: wineData.name,
        website: wineData.website,
        date: wineData.date,
      });

      const winePrice = await this.winesRepository.createWinePrice({
        wineId: wine.id,
        price: wineData.price,
        date: wineData.date,
      });

      const wineProperties = await this.winesRepository.createWineProperty({
        wineId: wine.id,
        wineProperty: wineData.property,
      });

      wines.push({ wine, winePrice, wineProperties });
    }
    return wines;
  }
}
