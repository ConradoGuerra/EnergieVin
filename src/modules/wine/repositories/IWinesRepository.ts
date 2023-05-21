import CreateWineDTO from "../dtos/CreateWineDTO";
import CreateWinePriceDTO from "../dtos/CreateWinePriceDTO";
import CreateWinePropertyDTO from "../dtos/CreateWinePropertyDTO";
import WinePropertyDTO from "../dtos/WinePropertyDTO";
import Wine from "../infra/typeorm/entities/Wine";
import WinePrice from "../infra/typeorm/entities/WinePrice";
import WineProperty from "../infra/typeorm/entities/WineProperty";

export default interface IWinesRepository {
  createWine(wineDTO: CreateWineDTO): Promise<Wine>;
  createWinePrice(createWinePriceDTO: CreateWinePriceDTO): Promise<WinePrice>;
  createWineProperty(
    createWinePropertyDTO: CreateWinePropertyDTO
  ): Promise<WineProperty[]>;
  findAllWines(): Promise<Wine[]>;
  findWinePricesById(wineId: number): Promise<WinePrice[]>;
  findByName(wineName: string): Promise<Wine[]>;
}
