import BulkCreateWinesController from '@modules/wine/useCases/bulkCreateWine/BulkCreateWineController';
import CreateWinesController from '@modules/wine/useCases/createWine/CreateWineController';
import GetWineController from '@modules/wine/useCases/getWine/GetWineController';
import GetWinePricesController from '@modules/wine/useCases/getWinePrices/GetWinePricesController';
import GetWinesController from '@modules/wine/useCases/getWines/GetWinesController';
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

const bulkCreateWinesController = new BulkCreateWinesController();
const getWinePricesController = new GetWinePricesController();
const getWinesController = new GetWinesController();
const getWineController = new GetWineController();
const createWineController = new CreateWinesController();

const wines = Router();
wines.get('/', getWinesController.handle);
wines.get('/:wineId', getWineController.handle);
wines.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().trim().required().min(4).max(100),
      price: Joi.number().required().greater(0),
      website: Joi.string().trim().required().min(4).max(100),
      date: Joi.date(),
      property: {
        origin: Joi.string().trim().required().min(4).max(100),
        color: Joi.string().trim().required().min(0).max(100),
        year: Joi.date(),
      },
    },
  }),
  createWineController.handle,
);
wines.post('/bulk-create', bulkCreateWinesController.handle);
wines.get('/prices/:wineId', getWinePricesController.handle);

export default wines;
