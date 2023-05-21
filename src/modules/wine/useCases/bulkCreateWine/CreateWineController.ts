import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateWineService from "./CreateWineService";

export default class CreateWinesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createWineService = container.resolve(CreateWineService);
    const wineCreated = await createWineService.execute(request.body);

    return response.json(wineCreated);
  }
}
