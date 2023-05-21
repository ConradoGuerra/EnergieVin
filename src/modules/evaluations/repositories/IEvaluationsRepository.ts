import CreateEvaluationDTO from "../dtos/CreateEvaluationDTO";
import Evaluation from "../infra/typeorm/entities/Evaluation";

export default interface IEvaluationsRepository {
  createEvaluation(
    evaluationDTO: CreateEvaluationDTO
  ): Promise<Evaluation | void>;
  averageEvaluation(): Promise<
    {
      wines_id: number;
      wines_name: string;
      wines_website: string;
      wines_date: string;
      avg: string;
      wineId: number;
    }[]
  >;
}
