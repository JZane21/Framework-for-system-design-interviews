import { createQuestionAnswerDTOToIQuestionAnswerEntity } from "../../adapters/questionAnswerAdapters";
import { IQuestionAnswerEntity } from "../../domain/entities/IQuestionAnswerEntity";
import { QuestionAnswerRepository } from "../../domain/interfaces/questionAnswerRepository";
import { QuestionAnswer } from "../../domain/models/questionAnswer";
import logger from "../../infrastructure/logger/logger";
import { CreateQuestionAnswerDTO } from "../dtos/create.questionAnswer.dto";
import { QuestionAnswerDTO } from "../dtos/questionAnswer.dto";

export class QuestionAnswerService {
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

  async createQuestionAnswer(createQuestionAnswerDto: CreateQuestionAnswerDTO): Promise<QuestionAnswerDTO> {
    logger.debug(`QuestionAnswerService: Trying to create an QuestionAnswer`);
    const question = createQuestionAnswerDTOToIQuestionAnswerEntity(createQuestionAnswerDto);
    // const QuestionAnswerEntity: IQuestionAnswerEntity = createQuestion;

    // const newQuestionAnswer: QuestionAnswer = new QuestionAnswer(QuestionAnswerEntity);

    // return await this.createQuestionAnswer(newQuestionAnswer);
    return null;
  }
}
