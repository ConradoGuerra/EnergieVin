import FakeWineRepository from "@modules/wine/repositories/fakes/FakeWinesRepository";
import BulkCreateWineService from "./BulkCreateWineService";
import Wine from "@modules/wine/infra/typeorm/entities/Wine";
import WinePrice from "@modules/wine/infra/typeorm/entities/WinePrice";
import FakeWineDataApiProvider from "@modules/wine/providers/WineDataApiProvider/fakes/FakeWineDataApiProvider";

describe("BulkCreateWineService", () => {
  let fakeWineRepository: FakeWineRepository;
  let bulkCreateWineService: BulkCreateWineService;
  let fakeWineDataApiProvider: FakeWineDataApiProvider;

  beforeEach(() => {
    fakeWineRepository = new FakeWineRepository();
    fakeWineDataApiProvider = new FakeWineDataApiProvider();
    bulkCreateWineService = new BulkCreateWineService(
      fakeWineRepository,
      fakeWineDataApiProvider
    );
  });

  it("should create a wine successfully with its price and properties", async () => {
    jest
      .spyOn(fakeWineDataApiProvider, "getWinesData")
      .mockImplementationOnce(async () => {
        return [
          {
            property: {
              origin: "Valleé de la Loire",
              color: "blanc",
              year: 2022,
            },
            name: "Domaine du Haut Bourg Sauvignon",
            price: 5.3,
            website: "www.hautbourgsauvignon.com",
            date: new Date("2023-05-21 10:00:00"),
          },
        ];
      });

    const [data] = await bulkCreateWineService.execute();

    expect(data.wineCreated).toBeInstanceOf(Wine);
    expect(data.wineCreated).toEqual(
      expect.objectContaining({
        id: "1",
        name: "Domaine du Haut Bourg Sauvignon",
        date: new Date("2023-05-21 10:00:00"),
        website: "www.hautbourgsauvignon.com",
      })
    );
    expect(data.winePrice).toBeInstanceOf(WinePrice);
    expect(data.winePrice).toEqual(
      expect.objectContaining({
        date: new Date("2023-05-21 10:00:00"),
        id: "1",
        price: 5.3,
        wineId: "1",
      })
    );
    expect(data.wineProperties).toEqual(
      expect.arrayContaining([
        {
          id: "1",
          wineId: "1",
          name: "origin",
          value: "Valleé de la Loire",
        },
        {
          id: "2",
          wineId: "1",
          name: "color",
          value: "blanc",
        },
        { id: "3", wineId: "1", name: "year", value: 2022 },
      ])
    );
  });

  it("should create a second price if the wine's name be the same", async () => {
    const winesData = [
      {
        property: {
          origin: "Valleé de la Loire",
          color: "blanc",
          year: 2022,
        },
        name: "Domaine du Haut Bourg Sauvignon",
        price: 5.3,
        website: "www.hautbourgsauvignon.com",
        date: new Date("2023-05-21"),
      },
      {
        property: {
          origin: "Valleé de la Loire",
          color: "blanc",
          year: 2022,
        },
        name: "Domaine du Haut Bourg Sauvignon",
        price: 5.3,
        website: "www.hautbourgsauvignon.com",
        date: new Date("2023-05-22"),
      },
    ];

    jest
      .spyOn(fakeWineDataApiProvider, "getWinesData")
      .mockImplementationOnce(async () => winesData);

    const [result] = await bulkCreateWineService.execute();

    const wines = await fakeWineRepository.findAllWines();
    const prices = await fakeWineRepository.findWinePricesById(
      result.wineCreated.id
    );

    expect(wines.length).toBe(1);
    expect(prices.length).toBe(2);
  });

  it("should create a second wine if the wine's name it is not the same", async () => {
    const winesData = [
      {
        property: {
          origin: "Valleé de la Loire",
          color: "blanc",
          year: 2022,
        },
        name: "Domaine du Haut Bourg Sauvignon",
        price: 5.3,
        website: "www.hautbourgsauvignon.com",
        date: new Date("2023-05-21"),
      },
      {
        property: {
          origin: "Valleé de la Loire2",
          color: "blanc",
          year: 2022,
        },
        name: "Domaine du Haut Bourg Sauvignon2",
        price: 5.3,
        website: "www.hautbourgsauvignon.com",
        date: new Date("2023-05-22"),
      },
    ];
    jest
      .spyOn(fakeWineDataApiProvider, "getWinesData")
      .mockImplementationOnce(async () => winesData);

    const [result] = await bulkCreateWineService.execute();

    const wines = await fakeWineRepository.findAllWines();
    const prices = await fakeWineRepository.findWinePricesById(
      result.wineCreated.id
    );

    expect(wines.length).toBe(2);
    expect(prices.length).toBe(1);
  });
});
