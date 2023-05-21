import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateEvaluationService from "./CreateEvaluationService";

export default class CreateEvaluationController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const createEvaluationService = container.resolve(
        CreateEvaluationService
      );
      const evaluation = await createEvaluationService.execute(request.body);

      return response.json(evaluation);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
