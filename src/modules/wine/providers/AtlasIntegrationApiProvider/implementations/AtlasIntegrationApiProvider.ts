import WineDataRequestConfig from "@config/wineData";
import HttpClient from "@shared/infra/providers/HttpClient/implementations/HttpClient";
import IHttpClient from "@shared/infra/providers/HttpClient/models/IHttpClient";
import { IWineDataApiProvider } from "../models/IWineDataApiProvider";
import { IWineDataDTO } from "../dtos/IWineDataDTO";

export default class WineDataApiProvider implements IWineDataApiProvider {
  private httpClient: IHttpClient = new HttpClient();
  async getWinesData(): Promise<Array<IWineDataDTO>> {
    try {
      const { wineDataRequestConfig } = WineDataRequestConfig;

      const { data: componentScoresReport } = await this.httpClient.get(
        wineDataRequestConfig.url()
      );

      return componentScoresReport.analysis;
    } catch (error) {
      console.log(error);
    }
  }
}
