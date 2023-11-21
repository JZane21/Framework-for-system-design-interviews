import { QuestionDTO } from "../../app/dtos/question.dto";
import { Question } from "../models/question";
export interface QuestionRepository {
  findById(id: string, isRecruiter: boolean): Promise<QuestionDTO | null>;
  getQuestions(isRecruiter: boolean): Promise<QuestionDTO[]>;
  createQuestion(question: Question): Promise<QuestionDTO>;
  updateQuestion(id: string, updatedData: Partial<Question>): Promise<QuestionDTO>;
  deleteQuestion(id: string): Promise<boolean>;
}