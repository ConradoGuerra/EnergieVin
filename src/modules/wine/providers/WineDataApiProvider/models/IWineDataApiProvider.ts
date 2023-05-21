import { IWineDataDTO } from '../dtos/IWineDataDTO';

export interface IWineDataApiProvider {
  getWinesData(): Promise<Array<IWineDataDTO>>;
}
