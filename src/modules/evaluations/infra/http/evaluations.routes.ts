import CreateEvaluationController from "@modules/evaluations/useCases/createEvaluation/CreateEvaluationController";
import { Router } from "express";

const createEvaluationController = new CreateEvaluationController();

const evaluations = Router();
evaluations.post("/", createEvaluationController.handle);

export default evaluations;
