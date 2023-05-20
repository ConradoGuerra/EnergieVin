import CreateWineDTO from "@modules/wine/dtos/CreateWineDTO";
import Wine from "@modules/wine/infra/typeorm/entities/Wine";
import IWinesRepository from "../IWinesRepository";

export default class FakeWineRepository implements IWinesRepository {
  private wines: Wine[] = [];
  async create(wineDTO: CreateWineDTO): Promise<Wine> {
    const wine = new Wine();
    Object.assign(wine, {}, wineDTO);
    this.wines.push(wine);
    return wine;
  }
}
