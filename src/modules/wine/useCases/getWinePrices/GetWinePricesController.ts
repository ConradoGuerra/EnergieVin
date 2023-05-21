import { Request, Response } from "express";
import { container } from "tsyringe";
import GetWinePricesService from "./GetWinePricesService";

export default class GetWinePricesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { wineId } = request.params;
    const { limit } = request.query;
    const getWinePricesService = container.resolve(GetWinePricesService);
    const winePrices = await getWinePricesService.execute(+wineId, +limit);

    return response.json(winePrices);
  }
}
