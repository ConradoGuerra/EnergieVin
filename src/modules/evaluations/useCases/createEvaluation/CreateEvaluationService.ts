import Evaluation from '@modules/evaluations/infra/typeorm/entities/Evaluation';
import IEvaluationsRepository from '@modules/evaluations/repositories/IEvaluationsRepository';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

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
    @inject('EvaluationsRepository')
    private evaluationsRepository: IEvaluationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(request: IRequest): Promise<Evaluation | void | string> {
    const user = await this.usersRepository.findById(request.userId);
    if (user.specialist) {
      return this.evaluationsRepository.createEvaluation(request);
    }

    return 'This user is not a specialist.';
  }
}
