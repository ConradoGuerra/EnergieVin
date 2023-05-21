import { Repository } from 'typeorm';
import { AppDataSource } from '@shared/infra/typeorm';
import IEvaluationsRepository from '@modules/evaluations/repositories/IEvaluationsRepository';
import Evaluation from '../entities/Evaluation';
import CreateEvaluationDTO from '@modules/evaluations/dtos/CreateEvaluationDTO';

export default class EvaluationsRepository implements IEvaluationsRepository {
  private evaluationRepository: Repository<Evaluation>;

  constructor() {
    this.evaluationRepository = AppDataSource.getRepository(Evaluation);
  }

  async createEvaluation(
    evaluationDTO: CreateEvaluationDTO
  ): Promise<void | Evaluation> {
    evaluationDTO.date = new Date();
    const hasEvaluation = await this.evaluationRepository
      .createQueryBuilder('evaluation')
      .where(
        `evaluation.wineId = ${evaluationDTO.wineId} AND evaluation.userId = ${evaluationDTO.userId}`
      )
      .getRawMany();

    if (hasEvaluation.length) {
      await this.evaluationRepository.update(
        {
          userId: evaluationDTO.userId,
          wineId: evaluationDTO.wineId,
        },
        evaluationDTO
      );

      return;
    }
    const evaluation = this.evaluationRepository.create(evaluationDTO);

    await this.evaluationRepository.save(evaluation);
    return evaluation;
  }

  async averageEvaluation(): Promise<
    {
      avg: string;
      wineId: number;
    }[]
    > {
    const hasEvaluation = await this.evaluationRepository
      .createQueryBuilder('evaluation')
      .select('AVG(evaluation.grade), evaluation.wineId')
      .groupBy('evaluation.wineId')
      .getRawMany();

    return hasEvaluation;
  }
}
