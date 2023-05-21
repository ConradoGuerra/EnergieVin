import CreateEvaluationController from '@modules/evaluations/useCases/createEvaluation/CreateEvaluationController';
import GetAverageGradeController from '@modules/evaluations/useCases/getAverageGrade/GetAverageGradeController';
import { Router } from 'express';

const createEvaluationController = new CreateEvaluationController();
const getAverageGradeController = new GetAverageGradeController();

const evaluations = Router();
evaluations.post('/', createEvaluationController.handle);
evaluations.get('/average', getAverageGradeController.handle);

export default evaluations;
