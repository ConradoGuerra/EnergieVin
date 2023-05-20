import CreateWineDTO from "@modules/wine/dtos/CreateWineDTO";
import Wine from "@modules/wine/infra/typeorm/entities/Wine";
import IWinesRepository from "../IWinesRepository";
import WineProperty from "@modules/wine/infra/typeorm/entities/WineProperty";
import CreateWinePropertyDTO from "@modules/wine/dtos/CreateWinePropertyDTO";
import CreateWinePriceDTO from "@modules/wine/dtos/CreateWinePriceDTO";
import WinePrice from "@modules/wine/infra/typeorm/entities/WinePrice";
import WineDataDTO from "@modules/wine/dtos/WineCompleteDTO";
import WinePropertyDTO from "@modules/wine/dtos/WinePropertyDTO";

export default class FakeWineRepository implements IWinesRepository {
  private wines: Wine[] = [];
  private wineProperties: WineProperty[] = [];
  private winePrices: WinePrice[] = [];

  async createWine(wineDTO: CreateWineDTO): Promise<Wine> {
    const wine = new Wine();

    wine.id = (this.wines.length + 1).toString();
    Object.assign(wine, {}, wineDTO);
    this.wines.push(wine);

    return wine;
  }

  async createWineProperty(
    createWinePropertyDTO: CreateWinePropertyDTO
  ): Promise<Array<WineProperty>> {
    Object.keys(createWinePropertyDTO.wineProperty).map(
      (propertyName, index) => {
        const wineProperty = new WineProperty({
          id: (index + 1).toString(),
          wineId: createWinePropertyDTO.wineId,
          name: propertyName,
          value: createWinePropertyDTO.wineProperty[propertyName],
        });

        this.wineProperties.push(wineProperty);
      }
    );
    return this.wineProperties;
  }

  async createWinePrice(
    createWinePriceDTO: CreateWinePriceDTO
  ): Promise<WinePrice> {
    const winePrice = new WinePrice({
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

  async findWinePricesById(wineId: string): Promise<WinePrice[]> {
    return this.winePrices.filter(price => price.wineId === wineId);
  }

  async findByProperties(winePropertyDTO: WinePropertyDTO): Promise<Wine> {
    const [wineId] = this.wineProperties
      .filter(item => {
        const wineId = item.wineId;
        return Object.entries(winePropertyDTO).every(([key, value]) => {
          const matchingItem = this.wineProperties.find(
            item => item.wineId === wineId && item.name === key
          );
          return matchingItem && matchingItem.value === value;
        });
      })
      .map(item => item.wineId);

    return this.wines.find(wine => wine.id === wineId);
  }
}
