import FakeWineRepository from "@modules/wine/repositories/fakes/FakeWinesRepository";
import CreateWineService from "./CreateWineService";
import Wine from "@modules/wine/infra/typeorm/entities/Wine";
import WinePrice from "@modules/wine/infra/typeorm/entities/WinePrice";

describe("CreateWineService", () => {
  let fakeWineRepository: FakeWineRepository;
  let createWineService: CreateWineService;
  let mockedDate: Date;

  beforeAll(() => {
    mockedDate = new Date();
    const OriginalDate = global.Date;
    jest.spyOn(global, "Date").mockImplementationOnce(args => {
      if (args) return new OriginalDate(args);
      return mockedDate;
    });
  });

  beforeEach(() => {
    fakeWineRepository = new FakeWineRepository();
    createWineService = new CreateWineService(fakeWineRepository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should create a wine successfully with its price and properties", async () => {
    const input = {
      property: {
        name: "Domaine du Haut Bourg Sauvignon",
        origin: "Valleé de la Loire",
        color: "blanc",
        year: 2022,
      },
      price: 5.3,
      website: "www.hautbourgsauvignon.com",
    };

    const data = await createWineService.execute(input);

    expect(data.wine).toBeInstanceOf(Wine);
    expect(data.wine).toEqual(
      expect.objectContaining({
        id: "1",
        date: mockedDate,
        website: "www.hautbourgsauvignon.com",
      })
    );
    expect(data.winePrice).toBeInstanceOf(WinePrice);
    expect(data.winePrice).toEqual(
      expect.objectContaining({
        date: mockedDate,
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
          name: "name",
          value: "Domaine du Haut Bourg Sauvignon",
        },
        {
          id: "2",
          wineId: "1",
          name: "origin",
          value: "Valleé de la Loire",
        },
        {
          id: "3",
          wineId: "1",
          name: "color",
          value: "blanc",
        },
        { id: "4", wineId: "1", name: "year", value: 2022 },
      ])
    );
  });
});
