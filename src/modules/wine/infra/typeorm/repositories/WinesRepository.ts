import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm";
import Wine from "../entities/Wine";
import WinePrice from "../entities/WinePrice";
import WineProperty from "../entities/WineProperty";
import IWinesRepository from "@modules/wine/repositories/IWinesRepository";
import CreateWineDTO from "@modules/wine/dtos/CreateWineDTO";
import CreateWinePropertyDTO from "@modules/wine/dtos/CreateWinePropertyDTO";
import CreateWinePriceDTO from "@modules/wine/dtos/CreateWinePriceDTO";

export default class WinesRepository implements IWinesRepository {
  private wineRepository: Repository<Wine>;
  private winePriceRepository: Repository<WinePrice>;
  private winePropertyRepository: Repository<WineProperty>;

  constructor() {
    this.wineRepository = AppDataSource.getRepository(Wine);
    this.winePriceRepository = AppDataSource.getRepository(WinePrice);
    this.winePropertyRepository = AppDataSource.getRepository(WineProperty);
  }

  async createWine(wineDTO: CreateWineDTO): Promise<Wine> {
    const wine = this.wineRepository.create(wineDTO);
    await this.wineRepository.save(wine);
    return wine;
  }

  async createWineProperty(
    createWinePropertyDTO: CreateWinePropertyDTO
  ): Promise<Array<WineProperty>> {
    const wineProperties = Object.keys(createWinePropertyDTO.wineProperty).map(
      propertyName => {
        return this.winePropertyRepository.create({
          value: createWinePropertyDTO.wineProperty[propertyName],
          name: propertyName,
          wineId: createWinePropertyDTO.wineId,
        });
      }
    );

    wineProperties.map(
      async wineProperty => await this.winePropertyRepository.save(wineProperty)
    );

    return wineProperties;
  }

  async createWinePrice(
    createWinePriceDTO: CreateWinePriceDTO
  ): Promise<WinePrice> {
    const winePrice = this.winePriceRepository.create({
      ...createWinePriceDTO,
      wineId: createWinePriceDTO.wineId,
    });
    await this.winePriceRepository.save(winePrice);
    return winePrice;
  }

  async findAllWines(): Promise<Wine[]> {
    return this.wineRepository.find();
  }

  async findWineById(wineId: number): Promise<
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
  > {
    return this.wineRepository
      .createQueryBuilder("wine")
      .leftJoinAndSelect(
        "wine_properties",
        "wineProperty",
        "wineProperty.wineId = wine.id"
      )
      .where(`wine.Id = ${wineId}`)
      .getRawMany();
  }

  async findWinePricesById(id: number, limit = 0): Promise<WinePrice[]> {
    return this.winePriceRepository
      .createQueryBuilder("winePrices")
      .where(`winePrices.wineId = ${id}`)
      .orderBy("winePrices.date", "DESC")
      .limit(limit)
      .getMany();
  }

  async findByName(wineName: string): Promise<Wine[]> {
    return this.wineRepository.find({ where: { name: wineName } });
  }
}
