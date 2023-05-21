import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetWineService from './GetWineService';

export default class GetWineController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { wineId } = request.params;
    const getWineService = container.resolve(GetWineService);
    const wines = await getWineService.execute(+wineId);

    return response.json(wines);
  }
}
