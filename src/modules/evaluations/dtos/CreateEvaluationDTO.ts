export default interface CreateEvaluationDTO {
  id?: number;
  userId: number;
  wineId: number;
  grade: number;
  date: Date;
}
