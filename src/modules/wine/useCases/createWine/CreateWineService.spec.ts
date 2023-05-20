import FakeWineRepository from "@modules/wine/repositories/fakes/FakeWinesRepository";
import CreateWineService from "./CreateWineService";

describe("CreateWineService", () => {
  let fakeWineRepository: FakeWineRepository;
  let createWineService: CreateWineService;

  beforeEach(() => {
    fakeWineRepository = new FakeWineRepository();
    createWineService = new CreateWineService(fakeWineRepository);
  });

  it("should create a wine succesfully with its properties", async () => {
    const mockDate = new Date();
    const OriginalDate = global.Date;
    jest.spyOn(global, "Date").mockImplementationOnce(args => {
      if (args) return new OriginalDate(args);
      return mockDate;
    });

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

    expect(await createWineService.execute(input)).toMatchObject({
      wine: {
        date: mockDate,
        id: "1",
        website: "www.hautbourgsauvignon.com",
      },
      wineProperties: [
        {
          id: "1",
          name: "name",
          value: "Domaine du Haut Bourg Sauvignon",
          wineId: "1",
        },
        { id: "2", name: "origin", value: "Valleé de la Loire", wineId: "1" },
        { id: "3", name: "color", value: "blanc", wineId: "1" },
        { id: "4", name: "year", value: 2022, wineId: "1" },
      ],
    });
  });
});
