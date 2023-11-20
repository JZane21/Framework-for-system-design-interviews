import { QuestionAnswerRepository } from "../../domain/interfaces/questionAnswerRepository";
import logger from "../../infrastructure/logger/logger";
import { QuestionAnswerDTO } from "../dtos/questionAnswer.dto";

export class QuestionAnswer {
  constructor(private questionAnswerRepository: QuestionAnswerRepository) { }

  async getQuestionAnswers(): Promise<QuestionAnswerDTO[]> {
    logger.debug(`QuestionAnswerervice: Trying to get questions answers`);
    const QuestionAnswers = await this.questionAnswerRepository.getQuestionAnswers();
    // const QuestionAnswerFromDB: QuestionAnswerDTO[] =
    //   QuestionAnswer.map((questionAnswer: QuestionAnswer) => questionAnswerToQuestionAnswerDTO(questionAnswer)) || [];
    return QuestionAnswers;
  }

  async getQuestionAnswerByID(id: string): Promise<QuestionAnswerDTO | null> {
    logger.debug(`QuestionAnswerervice: Trying to get question answer with id: ${id}`);
    const questionAnswerDTO = await this.questionAnswerRepository.findById(id);
    if (!questionAnswerDTO) {
      logger.error(`QuestionAnswerService: Error trying to get question answer with id: ${id}`);
      return null;
    }
    return questionAnswerDTO;
  }

  async updateQuestionAnswerById(id: string, updatedData: Partial<QuestionAnswer>): Promise<QuestionAnswerDTO> {
    logger.debug(`QuestionAnswerService: Trying to updating question answer with id: ${id}`);
    return this.questionAnswerRepository.updateQuestionAnswer(id, updatedData);
  }

  async deleteQuestionAnswerById(id: string): Promise<boolean> {
    logger.debug(`QuestionAnswerService: Trying to delete question answer with id: ${id}`);
    return this.questionAnswerRepository.deleteQuestionAnswer(id);
  }
}