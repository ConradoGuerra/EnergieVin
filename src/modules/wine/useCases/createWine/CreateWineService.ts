import Wine from "@modules/wine/infra/typeorm/entities/Wine";
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

  async execute(
    request: IRequest
  ): Promise<{ wine: Wine; wineProperties: WineProperty[] }> {
    const wine = await this.winesRepository.createWine({
      website: request.website,
      date: new Date(),
    });

    const winePropertyData = {
      wineId: wine.id,
      wineProperty: request.property,
    };

    const wineProperties = await this.winesRepository.createWineProperty(
      winePropertyData
    );

    return { wine, wineProperties };
  }
}
