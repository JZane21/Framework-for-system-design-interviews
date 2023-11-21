import { IQuestionAnswerEntity } from "../../domain/entities/IQuestionAnswerEntity";

import { QuestionAnswerRepository } from "../../domain/interfaces/questionAnswerRepository";
import { QuestionAnswerDTO } from "../dtos/questionAnswer.dto";
import { QuestionAnswer } from "../../domain/models/questionAnswer";
import { CreateQuestionAnswerDTO } from "../dtos/create.questionAnswer.dto";
import { InterviewRepository } from "../../domain/interfaces/interviewRepository";
import { loggerPrinter } from "../../infrastructure/utils/loggerPrinter";
import { QuestionRepository } from "../../domain/interfaces/questionRepository";
import { QuestionDTO } from "../dtos/question.dto";
import { IQuestionEntity } from "../../domain/entities/IQuestionEntity";

export class QuestionAnswerService {
  ;
  constructor(private questionAnswerRepository: QuestionAnswerRepository, private interviewRepository: InterviewRepository, private questionRepository: QuestionRepository) { }

  private SECTION: string = "QuestionAnswerService";

  async getQuestionAnswers(isRecruiter: boolean): Promise<QuestionAnswerDTO[]> {
    try {
      loggerPrinter(this.SECTION, "Getting QuestionAnswers.", "debug");
      const QuestionAnswers = await this.questionAnswerRepository.getQuestionAnswers(isRecruiter);
      loggerPrinter(this.SECTION, "Gotten QuestionAnswers.", "info");
      return QuestionAnswers;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting QuestionAnswers: ${error}`, "error");
      return [];
    }
  }

  async getQuestionAnswerByID(id: string, isRecruiter: boolean): Promise<QuestionAnswerDTO | null> {
    try {
      loggerPrinter(this.SECTION, `Getting QuestionAnswer with id: ${id}.`, "debug");
      const QuestionAnswer = await this.questionAnswerRepository.findById(id, isRecruiter);
      if (!QuestionAnswer) {
        loggerPrinter(this.SECTION, `QuestionAnswer didn't find with id: ${id}.`, "error");
        return null;
      }
      loggerPrinter(this.SECTION, `Gotten QuestionAnswer with id: ${id}.`, "info");
      return QuestionAnswer;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting QuestionAnswer with id: ${id}: ${error}.`, "error");
      return null;
    }
  }

  async createQuestionAnswer(createQuestionAnswerDto: CreateQuestionAnswerDTO, isRecruiter: boolean): Promise<QuestionAnswerDTO> {
    try {
      loggerPrinter(this.SECTION, "Creating QuestionAnswer", "debug.");
      const question: QuestionDTO = await this.questionRepository.findById(createQuestionAnswerDto.questionId, isRecruiter);
      const interview = await this.interviewRepository.findById(question.interview?.id, isRecruiter);
      const iQuestion: IQuestionEntity = {
        id: question.id,
        statement: question.statement,
        interview: interview,
        correctAnswer: null
      };
      const QuestionAnswerEntity: IQuestionAnswerEntity = {
        answers: createQuestionAnswerDto.answers,
        rightAnswer: createQuestionAnswerDto.rightAnswer,
        question: iQuestion,
      };
      const newQuestionAnswer: QuestionAnswer = new QuestionAnswer(QuestionAnswerEntity);
      const answer = await this.questionAnswerRepository.createQuestionAnswer(newQuestionAnswer);

      // const iiQuestion: IQuestionEntity = {
      //   id: question.id,
      //   statement: question.statement,
      //   interview: interview,
      //   correctAnswer: answer
      // };

      // const answerNoDTO: IQuestionAnswerEntity = {
      //   answers: answer.answers,
      //   rightAnswer: answer.rightAnswer,
      //   question: answer
      // };

      // await this.questionRepository.updateQuestion(question.id, {
      //   id: question.id,
      //   statement: question.statement,
      //   interview: interview,
      //   correctAnswer: answerNoDTO,
      // });

      loggerPrinter(this.SECTION, "Created QuestionAnswer.", "info");
      return answer;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while creating QuestionAnswer: ${error}.`, "error");
      return null;
    }
  }

  async updateFormById(id: string, updatedData: Partial<QuestionAnswer>): Promise<QuestionAnswerDTO> {
    try {
      loggerPrinter(this.SECTION, `Updating QuestionAnswer with id: ${id}`, "debug");
      const answer = await this.questionAnswerRepository.updateQuestionAnswer(id, updatedData);
      loggerPrinter(this.SECTION, `Updated QuestionAnswer with id: ${id}.`, "info");
      return answer;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while updating QuestionAnswer with id: ${id}: ${error}.`);
      return null;
    }
  }

  async deleteFormById(id: string): Promise<boolean> {
    try {
      loggerPrinter(this.SECTION, `Deleting QuestionAnswer with id: ${id}.`, "debug");
      const answer = await this.questionAnswerRepository.deleteQuestionAnswer(id);
      loggerPrinter(this.SECTION, `Deleted QuestionAnswer with id: ${id}.`, "info");
      return answer;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while deleting QuestionAnswer with id: ${id}: ${error}.`, "error");
      return false;
    }
  }
}