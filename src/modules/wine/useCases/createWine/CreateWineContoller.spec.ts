import app from '@shared/infra/http/app';
import request from 'supertest';
import { container } from 'tsyringe';
import FakeWinesRepository from '@modules/wine/repositories/fakes/FakeWinesRepository';
import CreateWineService from './CreateWineService';

describe('CreateWineContoller', () => {
  let fakeWinesRepository: FakeWinesRepository;
  let createWineService: CreateWineService;

  beforeEach(() => {
    fakeWinesRepository = new FakeWinesRepository();
    createWineService = new CreateWineService(fakeWinesRepository);
    jest.spyOn(container, 'resolve').mockImplementationOnce(() => {
      return createWineService;
    });
  });

  it('should return status 201 when a wine is created', async () => {
    const response = await request(app)
      .post('/wines')
      .send({
        name: 'Domaine du Haut Bourg Sauvignon',
        property: {
          origin: 'Valleé de la Loire',
          color: 'blanc',
          year: 2022,
        },
        price: 23,
        website: 'www.hautbourgsauvignon.com',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.wine).toHaveProperty('id');
  });

  it('should return status 400 when an error occur when a wine is created', async () => {
    jest.spyOn(createWineService, 'execute').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });

    const response = await request(app).post('/wines').send({});

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Mocked error');
  });
});
