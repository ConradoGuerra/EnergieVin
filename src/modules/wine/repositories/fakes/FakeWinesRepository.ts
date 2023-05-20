import CreateWineDTO from "@modules/wine/dtos/CreateWineDTO";
import Wine from "@modules/wine/infra/typeorm/entities/Wine";
import IWinesRepository from "../IWinesRepository";
import WineProperty from "@modules/wine/infra/typeorm/entities/WineProperty";
import { CreateWinePropertyDTO } from "@modules/wine/dtos/CreateWinePropertyDTO";
import CreateWinePriceDTO from "@modules/wine/dtos/CreateWinePriceDTO";
import WinePrice from "@modules/wine/infra/typeorm/entities/WinePrice";

export default class FakeWineRepository implements IWinesRepository {
  private wines: Wine[] = [];
  private wineProperties: WineProperty[] = [];
  private winePrice: WinePrice[] = [];

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
      id: (this.winePrice.length + 1).toString(),
      wineId: createWinePriceDTO.wineId,
      price: createWinePriceDTO.price,
      date: createWinePriceDTO.date,
    });

    this.winePrice.push(winePrice);

    return winePrice;
  }
}
