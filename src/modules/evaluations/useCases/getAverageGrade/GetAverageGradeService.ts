import IEvaluationsRepository from "@modules/evaluations/repositories/IEvaluationsRepository";
import IWinesRepository from "@modules/wine/repositories/IWinesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetAverageGradeService {
  constructor(
    @inject("EvaluationsRepository")
    private evaluationsRepository: IEvaluationsRepository,
    @inject("WinesRepository")
    private winesRepository: IWinesRepository
  ) {}

  async execute(
    firstPrice: number,
    lastPrice: number
  ): Promise<
    Array<{
      wineId: number;
      name: string;
      website: string;
      averageGrade: number;
      date: string;
      price: number;
    }>
  > {
    const averageWinesGrades =
      await this.evaluationsRepository.averageEvaluation();

    const winePrices = await this.winesRepository.findLastPrices(
      firstPrice,
      lastPrice
    );

    return averageWinesGrades.map(wine => ({
      wineId: wine.wineId,
      name: wine.wines_name,
      website: wine.wines_website,
      averageGrade: +wine.avg,
      date: wine.wines_date,
      price: +winePrices.find(price => wine.wineId === price.wineId).max,
    }));
  }
}
