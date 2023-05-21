import IEvaluationsRepository from '@modules/evaluations/repositories/IEvaluationsRepository';
import IWinesRepository from '@modules/wine/repositories/IWinesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class GetAverageGradeService {
  constructor(
    @inject('EvaluationsRepository')
    private evaluationsRepository: IEvaluationsRepository,
    @inject('WinesRepository')
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
      averageGrade: number | null;
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

    return winePrices
      .map(wine => {
        const hasAverage = averageWinesGrades.find(
          average => average.wineId === wine.wineId
        );
        return {
          wineId: wine.wineId,
          name: wine.wines_name,
          website: wine.wines_website,
          averageGrade: hasAverage ? +hasAverage.avg : null,
          date: wine.wines_date,
          price: +wine.max,
        };
      })
      .sort((A, B) => B.averageGrade - A.averageGrade);
  }
}
