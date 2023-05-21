import { Request, Response } from 'express';
import { container } from 'tsyringe';
import BulkCreateWineService from './BulkCreateWineService';

export default class BulkCreateWinesController {
  async handle(_request: Request, response: Response): Promise<Response> {
    const bulkCreateWineService = container.resolve(BulkCreateWineService);
    const wines = await bulkCreateWineService.execute();

    return response.json(wines);
  }
}
