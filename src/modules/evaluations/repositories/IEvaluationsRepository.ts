import CreateEvaluationDTO from '../dtos/CreateEvaluationDTO';
import Evaluation from '../infra/typeorm/entities/Evaluation';

export default interface IEvaluationsRepository {
  createEvaluation(
    evaluationDTO: CreateEvaluationDTO
  ): Promise<Evaluation | void>;
  averageEvaluation(): Promise<
    {
      avg: string;
      wineId: number;
    }[]
  >;
}
