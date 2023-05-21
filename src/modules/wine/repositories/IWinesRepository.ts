import CreateWineDTO from '../dtos/CreateWineDTO';
import CreateWinePriceDTO from '../dtos/CreateWinePriceDTO';
import CreateWinePropertyDTO from '../dtos/CreateWinePropertyDTO';
import Wine from '../infra/typeorm/entities/Wine';
import WinePrice from '../infra/typeorm/entities/WinePrice';
import WineProperty from '../infra/typeorm/entities/WineProperty';

export default interface IWinesRepository {
  createWine(wineDTO: CreateWineDTO): Promise<Wine>;
  createWinePrice(createWinePriceDTO: CreateWinePriceDTO): Promise<WinePrice>;
  createWineProperty(
    createWinePropertyDTO: CreateWinePropertyDTO
  ): Promise<WineProperty[]>;
  findAllWines(): Promise<Wine[]>;
  findWineById(wineId: number): Promise<
    Array<{
      wine_id: number;
      wine_name: string;
      wine_website: string;
      wine_date: Date;
      wineProperty_id: number;
      wineProperty_name: string;
      wineProperty_value: string;
      wineProperty_wineId: number;
    }>
  >;
  findWinePricesById(wineId: number, limit: number): Promise<WinePrice[]>;
  findByName(wineName: string): Promise<Wine[]>;
  findLastPrices(
    firstPrice: number,
    lastPrice: number
  ): Promise<
    {
      wines_id: number;
      wines_name: string;
      wines_website: string;
      wines_date: string;
      wineId: number;
      max: string;
    }[]
  >;
}
