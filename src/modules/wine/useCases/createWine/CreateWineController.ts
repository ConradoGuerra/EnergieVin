import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateWineService from './CreateWineService';
import AppError from '@shared/errors/AppError';

export default class CreateWinesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const createWineService = container.resolve(CreateWineService);
      const wineCreated = await createWineService.execute(request.body);

      return response.status(201).json(wineCreated);
    } catch (error) {
      const appError = new AppError(error.message, 400);
      return response.status(appError.statusCode).send(appError.message);
    }
  }
}
