import FakeWineRepository from "@modules/wine/repositories/fakes/FakeWinesRepository";
import CreateWineService from "./CreateWineService";

describe("CreateWineService", () => {
  let fakeWineRepository: FakeWineRepository;
  let createWineService: CreateWineService;

  beforeEach(() => {
    fakeWineRepository = new FakeWineRepository();
    createWineService = new CreateWineService(fakeWineRepository);
  });

  it("should create a wine succesfully", async () => {
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

    const wine = await createWineService.execute(input);

    expect(wine).toHaveProperty("id");
  });
});
