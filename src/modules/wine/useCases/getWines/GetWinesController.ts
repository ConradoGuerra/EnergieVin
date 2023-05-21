import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetWinesService from './GetWinesService';

export default class GetWinesController {
  async handle(_request: Request, response: Response): Promise<Response> {
    const getWinesService = container.resolve(GetWinesService);
    const wines = await getWinesService.execute();

    return response.json(wines);
  }
}
