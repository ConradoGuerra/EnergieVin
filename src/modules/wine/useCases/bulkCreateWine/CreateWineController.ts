import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateWineService from "./CreateWineService";

export default class CreateWinesController {
  async handle(response: Response): Promise<Response> {
    const createWineService = container.resolve(CreateWineService);
    const wineCreated = await createWineService.execute();

    return response.json(wineCreated);
  }
}
