import Wine from "@modules/wine/infra/typeorm/entities/Wine";
import WinePrice from "@modules/wine/infra/typeorm/entities/WinePrice";
import WineProperty from "@modules/wine/infra/typeorm/entities/WineProperty";
import IWinesRepository from "@modules/wine/repositories/IWinesRepository";

interface IRequest {
  property: {
    [key: string]: unknown;
  };
  price: number;
  website: string;
}

export default class CreateWineService {
  constructor(private winesRepository: IWinesRepository) {}

  async execute(request: IRequest): Promise<{
    wine: Wine;
    winePrice: WinePrice;
    wineProperties: WineProperty[];
  }> {
    const wine = await this.winesRepository.createWine({
      website: request.website,
      date: new Date(),
    });

    const winePrice = await this.winesRepository.createWinePrice({
      wineId: wine.id,
      price: request.price,
      date: wine.date,
    });

    delete request.price;

    const wineProperties = await this.winesRepository.createWineProperty({
      wineId: wine.id,
      wineProperty: request.property,
    });

    return { wine, winePrice, wineProperties };
  }
}
