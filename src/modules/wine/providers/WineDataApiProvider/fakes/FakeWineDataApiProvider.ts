import { IWineDataDTO } from "../dtos/IWineDataDTO";
import { IWineDataApiProvider } from "../models/IWineDataApiProvider";

export default class FakeWineDataApiProvider implements IWineDataApiProvider {
  private wineData: Array<IWineDataDTO> = [];

  public async getWinesData(): Promise<Array<IWineDataDTO>> {
    return this.wineData;
  }
}
