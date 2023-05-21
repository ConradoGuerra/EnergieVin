import CreateWineDTO from '@modules/wine/dtos/CreateWineDTO';
import Wine from '@modules/wine/infra/typeorm/entities/Wine';
import IWinesRepository from '../IWinesRepository';
import WineProperty from '@modules/wine/infra/typeorm/entities/WineProperty';
import CreateWinePropertyDTO from '@modules/wine/dtos/CreateWinePropertyDTO';
import CreateWinePriceDTO from '@modules/wine/dtos/CreateWinePriceDTO';
import WinePrice from '@modules/wine/infra/typeorm/entities/WinePrice';
import WinePropertyDTO from '@modules/wine/dtos/WinePropertyDTO';

export default class FakeWinesRepository implements IWinesRepository {
  private wines: Wine[] = [];
  private wineProperties: WineProperty[] = [];
  private winePrices: WinePrice[] = [];

  async createWine(wineDTO: CreateWineDTO): Promise<Wine> {
    const wine = new Wine();

    wine.id = this.wines.length + 1;
    Object.assign(wine, {}, wineDTO);
    this.wines.push(wine);

    return wine;
  }

  async createWineProperty(
    createWinePropertyDTO: CreateWinePropertyDTO
  ): Promise<Array<WineProperty>> {
    Object.keys(createWinePropertyDTO.wineProperty).map(
      (propertyName, index) => {
        const wineProperty = new WineProperty();
        Object.assign(
          wineProperty,
          {},
          {
            id: (index + 1).toString(),
            wineId: createWinePropertyDTO.wineId,
            name: propertyName,
            value: createWinePropertyDTO.wineProperty[propertyName],
          }
        );

        this.wineProperties.push(wineProperty);
      }
    );
    return this.wineProperties;
  }

  async createWinePrice(
    createWinePriceDTO: CreateWinePriceDTO
  ): Promise<WinePrice> {
    const winePrice = new WinePrice();
    Object.assign(winePrice, {
      id: (this.winePrices.length + 1).toString(),
      wineId: createWinePriceDTO.wineId,
      price: createWinePriceDTO.price,
      date: createWinePriceDTO.date,
    });

    this.winePrices.push(winePrice);

    return winePrice;
  }

  async findAllWines(): Promise<Wine[]> {
    return this.wines;
  }

  async findWinePricesById(wineId: number): Promise<WinePrice[]> {
    return this.winePrices.filter(price => price.wineId === wineId);
  }

  async findByName(wineName: string): Promise<Wine[]> {
    return this.wines.filter(wine => wine.name === wineName);
  }

  findWineById(wineId: number): Promise<
    {
      wine_id: number;
      wine_name: string;
      wine_website: string;
      wine_date: Date;
      wineProperty_id: number;
      wineProperty_name: string;
      wineProperty_value: string;
      wineProperty_wineId: number;
    }[]
  > {
    throw new Error('Method not implemented.');
  }
}
