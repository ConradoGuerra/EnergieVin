import IWinesRepository from "@modules/wine/repositories/IWinesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetWineService {
  constructor(
    @inject("WinesRepository")
    private winesRepository: IWinesRepository
  ) {}

  async execute(wineId: number): Promise<{
    wineId: number;
    name: string;
    webSite: string;
    date: Date;
    properties: any;
  }> {
    const wine = await this.winesRepository.findWineById(wineId);
    return wine.reduce(
      (prev, curr) => {
        return {
          wineId: curr.wine_id,
          name: curr.wine_name,
          webSite: curr.wine_website,
          date: curr.wine_date,
          properties: {
            ...prev.properties,
            [curr.wineProperty_name]: curr.wineProperty_value,
          },
        };
      },
      { wineId, name: "", webSite: "", date: new Date(), properties: {} }
    );
  }
}
