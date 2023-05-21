import WinePrice from '@modules/wine/infra/typeorm/entities/WinePrice';
import IWinesRepository from '@modules/wine/repositories/IWinesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class GetWinePricesService {
  constructor(
    @inject('WinesRepository')
    private winesRepository: IWinesRepository
  ) {}

  async execute(
    wineId: number,
    limit: number
  ): Promise<{
    wine: {
      wineId: number;
      name: string;
      webSite: string;
      date: Date;
      properties: any;
    };
    prices: WinePrice[];
  }> {
    try {
      const wine = await this.winesRepository.findWineById(wineId);
      const prices = await this.winesRepository.findWinePricesById(
        wineId,
        limit
      );
      const wineReduced = wine.reduce(
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
        { wineId, name: '', webSite: '', date: new Date(), properties: {} }
      );
      return { wine: wineReduced, prices };
    } catch (error) {
      console.log(error);
    }
  }
}
