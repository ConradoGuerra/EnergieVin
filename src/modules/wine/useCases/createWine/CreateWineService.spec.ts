import FakeWineRepository from '@modules/wine/repositories/fakes/FakeWinesRepository';
import CreateWineService from './CreateWineService';
import Wine from '@modules/wine/infra/typeorm/entities/Wine';
import WinePrice from '@modules/wine/infra/typeorm/entities/WinePrice';

describe('CreateWineService', () => {
  let fakeWineRepository: FakeWineRepository;
  let createWineService: CreateWineService;

  beforeEach(() => {
    fakeWineRepository = new FakeWineRepository();
    createWineService = new CreateWineService(fakeWineRepository);
  });

  it('should create a wine successfully with its price and properties', async () => {
    const input = {
      property: {
        origin: 'Valleé de la Loire',
        color: 'blanc',
        year: 2022,
      },
      name: 'Domaine du Haut Bourg Sauvignon',
      price: 5.3,
      website: 'www.hautbourgsauvignon.com',
      date: new Date('2023-05-21 10:00:00'),
    };

    const data = await createWineService.execute(input);

    expect(data.wine).toBeInstanceOf(Wine);
    expect(data.wine).toEqual(
      expect.objectContaining({
        id: '1',
        name: 'Domaine du Haut Bourg Sauvignon',
        date: new Date('2023-05-21 10:00:00'),
        website: 'www.hautbourgsauvignon.com',
      })
    );
    expect(data.winePrice).toBeInstanceOf(WinePrice);
    expect(data.winePrice).toEqual(
      expect.objectContaining({
        date: new Date('2023-05-21 10:00:00'),
        id: '1',
        price: 5.3,
        wineId: '1',
      })
    );
    expect(data.wineProperties).toEqual(
      expect.arrayContaining([
        {
          id: '1',
          wineId: '1',
          name: 'origin',
          value: 'Valleé de la Loire',
        },
        {
          id: '2',
          wineId: '1',
          name: 'color',
          value: 'blanc',
        },
        { id: '3', wineId: '1', name: 'year', value: 2022 },
      ])
    );
  });

  it('should create a second price if the wine\'s properties be the same', async () => {
    const wine1 = {
      property: {
        origin: 'Valleé de la Loire',
        color: 'blanc',
        year: 2022,
      },
      name: 'Domaine du Haut Bourg Sauvignon',
      price: 5.3,
      website: 'www.hautbourgsauvignon.com',
      date: new Date('2023-05-21'),
    };

    const result = await createWineService.execute(wine1);

    const wine2 = {
      property: {
        origin: 'Valleé de la Loire',
        color: 'blanc',
        year: 2022,
      },
      name: 'Domaine du Haut Bourg Sauvignon',
      price: 5.3,
      website: 'www.hautbourgsauvignon.com',
      date: new Date('2023-05-22'),
    };

    await createWineService.execute(wine2);

    const wines = await fakeWineRepository.findAllWines();
    const prices = await fakeWineRepository.findWinePricesById(result.wine.id);

    expect(wines.length).toBe(1);
    expect(prices.length).toBe(2);
  });
});
