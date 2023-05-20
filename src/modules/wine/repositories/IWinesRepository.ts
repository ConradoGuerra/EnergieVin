import CreateWineDTO from "../dtos/CreateWineDTO";
import Wine from "../infra/typeorm/entities/Wine";

export default interface IWinesRepository {
  create(wineDTO: CreateWineDTO): Promise<Wine>;
}
