import Wine from "@modules/wine/infra/typeorm/entities/Wine";
import IWinesRepository from "@modules/wine/repositories/IWinesRepository";

interface IRequest {
  property: {
    name: string;
    origin: string;
    color: string;
    year: number;
  };
  price: number;
  website: string;
}

export default class CreateWineService {
  constructor(private winesRepository: IWinesRepository) {}

  async execute(request: IRequest): Promise<Wine> {
    const wineData = {
      id: "1",
      name: request.property.name,
      properties: request.property.color,
      price: request.price,
      website: request.website,
      date: new Date(),
    };
    return this.winesRepository.create(wineData);
  }
}
