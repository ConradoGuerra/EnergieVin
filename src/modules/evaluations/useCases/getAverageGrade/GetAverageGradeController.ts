import { Request, Response } from "express";
import { container } from "tsyringe";
import GetAverageGradeService from "./GetAverageGradeService";

export default class GetAverageGradeController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { firstPrice, lastPrice } = request.query;
      const getAverageGradeService = container.resolve(GetAverageGradeService);
      const evaluation = await getAverageGradeService.execute(
        +firstPrice,
        +lastPrice
      );

      return response.json(evaluation);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
