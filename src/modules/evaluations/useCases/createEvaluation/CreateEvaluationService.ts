import Evaluation from "@modules/evaluations/infra/typeorm/entities/Evaluation";
import IEvaluationsRepository from "@modules/evaluations/repositories/IEvaluationsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id?: number;
  userId: number;
  wineId: number;
  grade: number;
  date: Date;
}

@injectable()
export default class CreateEvaluationService {
  constructor(
    @inject("EvaluationsRepository")
    private EvaluationsRepository: IEvaluationsRepository
  ) {}

  async execute(request: IRequest): Promise<Evaluation | void> {
    return this.EvaluationsRepository.createEvaluation(request);
  }
}
