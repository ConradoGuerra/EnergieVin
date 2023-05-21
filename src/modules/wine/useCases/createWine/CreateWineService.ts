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

  async execute(request: IRequest): Promise<{
    wine: Wine;
    winePrice: WinePrice;
    wineProperties?: WineProperty[];
  }> {
    const [hasWine] = await this.winesRepository.findByName(request.name);

    if (hasWine) {
      const winePrice = await this.winesRepository.createWinePrice({
        wineId: hasWine.id,
        price: request.price,
        date: hasWine.date,
      });

      return { wine: hasWine, winePrice };
    }

    const wine = await this.winesRepository.createWine({
      name: request.name,
      website: request.website,
      date: new Date(),
    });

    const winePrice = await this.winesRepository.createWinePrice({
      wineId: wine.id,
      price: request.price,
      date: wine.date,
    });

    const wineProperties = await this.winesRepository.createWineProperty({
      wineId: wine.id,
      wineProperty: request.property,
    });

    return { wine, winePrice, wineProperties };
  }
}
