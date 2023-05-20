import CreateWineDTO from "../dtos/CreateWineDTO";
import { CreateWinePropertyDTO } from "../dtos/CreateWinePropertyDTO";
import Wine from "../infra/typeorm/entities/Wine";
import WineProperty from "../infra/typeorm/entities/WineProperty";

export default interface IWinesRepository {
  createWine(wineDTO: CreateWineDTO): Promise<Wine>;
  createWineProperty(
    createWinePropertyDTO: CreateWinePropertyDTO
  ): Promise<WineProperty[]>;
}
