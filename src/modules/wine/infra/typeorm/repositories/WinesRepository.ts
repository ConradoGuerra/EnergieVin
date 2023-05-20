import { FindOptionsWhere, In, Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm";
import Wine from "../entities/Wine";
import WinePrice from "../entities/WinePrice";
import WineProperty from "../entities/WineProperty";
import IWinesRepository from "@modules/wine/repositories/IWinesRepository";
import CreateWineDTO from "@modules/wine/dtos/CreateWineDTO";
import CreateWinePropertyDTO from "@modules/wine/dtos/CreateWinePropertyDTO";
import CreateWinePriceDTO from "@modules/wine/dtos/CreateWinePriceDTO";
import WinePropertyDTO from "@modules/wine/dtos/WinePropertyDTO";

export default class WinesRepository implements IWinesRepository {
  private wineRepository: Repository<Wine>;
  private winePriceRepository: Repository<WinePrice>;
  private winePropertyRepository: Repository<WineProperty>;
  private wineId: unknown;

  constructor() {
    this.wineRepository = AppDataSource.getRepository(Wine);
    this.winePriceRepository = AppDataSource.getRepository(WinePrice);
    this.winePropertyRepository = AppDataSource.getRepository(WineProperty);
  }

  async createWine(wineDTO: CreateWineDTO): Promise<Wine> {
    const wine = this.wineRepository.create(wineDTO);
    await this.wineRepository.save(wine);
    this.wineId = wine.id;
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
          wineId: this.wineId,
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
    this.wineId = createWinePriceDTO.wineId;
    const winePrice = this.winePriceRepository.create({
      ...createWinePriceDTO,
      wineId: this.wineId,
    });
    await this.winePriceRepository.save(winePrice);
    return winePrice;
  }

  async findAllWines(): Promise<Wine[]> {
    return this.wineRepository.find();
  }

  async findWinePricesById(wineId: string): Promise<WinePrice[]> {
    return this.winePriceRepository.find({
      where: { wineId: wineId } as FindOptionsWhere<unknown>,
    });
  }

  async findByProperties(winePropertyDTO: WinePropertyDTO): Promise<Wine> {
    const keys = Object.keys(winePropertyDTO);
    const values = Object.values(winePropertyDTO);
    return this.wineRepository
      .createQueryBuilder("wines")
      .innerJoinAndSelect("wine_properties.wineId", "wine")
      .where(`wine_properties.name in (${keys})`)
      .andWhere(`wine_properties.value in (${values})`)
      .getOne();
  }
}
