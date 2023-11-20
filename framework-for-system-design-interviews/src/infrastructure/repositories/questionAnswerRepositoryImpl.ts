import { QuestionAnswerDTO } from "../../app/dtos/questionAnswer.dto";
import { QuestionAnswerRepository } from "../../domain/interfaces/questionAnswerRepository";
import { QuestionAnswer } from "../../domain/models/questionAnswer";

export class QuestionAnswerRepositoryImpl implements QuestionAnswerRepository {
  findById(id: string): Promise<QuestionAnswerDTO> {
    throw new Error("Method not implemented.");
  }
  getQuestionAnswers(): Promise<QuestionAnswerDTO[]> {
    throw new Error("Method not implemented.");
  }
  createQuestionAnswer(question: QuestionAnswer): Promise<QuestionAnswerDTO> {
    throw new Error("Method not implemented.");
  }
  updateQuestionAnswer(id: string, updatedData: Partial<QuestionAnswer>): Promise<QuestionAnswerDTO> {
    throw new Error("Method not implemented.");
  }
  deleteQuestionAnswer(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}