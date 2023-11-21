import { IQuestionEntity } from "../../domain/entities/IQuestionEntity";

import { QuestionRepository } from "../../domain/interfaces/questionRepository";
import { QuestionDTO } from "../dtos/question.dto";
import { Question } from "../../domain/models/question";
import { CreateQuestionDTO } from "../dtos/create.question.dto";
import { InterviewRepository } from "../../domain/interfaces/interviewRepository";
import { QuestionAnswerRepository } from "../../domain/interfaces/questionAnswerRepository";
import { loggerPrinter } from "../../infrastructure/utils/loggerPrinter";

export class QuestionService {
  ;
  constructor(private questionRepository: QuestionRepository, private interviewRepository: InterviewRepository) { }

  private SECTION: string = "QuestionService";

  async getQuestions(isRecruiter: boolean): Promise<QuestionDTO[]> {
    try {
      loggerPrinter(this.SECTION, "Getting Questions.", "debug");
      const Questions = await this.questionRepository.getQuestions(isRecruiter);
      loggerPrinter(this.SECTION, "Gotten Questions.", "info");
      return Questions;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting Questions: ${error}`, "error");
      return [];
    }
  }

  async getQuestionByID(id: string, isRecruiter: boolean): Promise<QuestionDTO | null> {
    try {
      loggerPrinter(this.SECTION, `Getting Question with id: ${id}.`, "debug");
      const Question = await this.questionRepository.findById(id, isRecruiter);
      if (!Question) {
        loggerPrinter(this.SECTION, `Question didn't find with id: ${id}.`, "error");
        return null;
      }
      loggerPrinter(this.SECTION, `Gotten Question with id: ${id}.`, "info");
      return Question;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while getting Question with id: ${id}: ${error}.`, "error");
      return null;
    }
  }

  async createQuestion(createQuestionDto: CreateQuestionDTO, isRecruiter: boolean): Promise<QuestionDTO> {
    try {
      loggerPrinter(this.SECTION, "Creating Question", "debug.");
      const QuestionEntity: IQuestionEntity = {
        statement: createQuestionDto.statement,
        interview: await this.interviewRepository.findById(createQuestionDto.interviewId, isRecruiter),
        correctAnswer: null,
      };
      const newQuestion: Question = new Question(QuestionEntity);
      const answer = await this.questionRepository.createQuestion(newQuestion);
      loggerPrinter(this.SECTION, "Created Question.", "info");
      return answer;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while creating Question: ${error}.`, "error");
      return null;
    }
  }

  async updateFormById(id: string, updatedData: Partial<Question>): Promise<QuestionDTO> {
    try {
      loggerPrinter(this.SECTION, `Updating Question with id: ${id}`, "debug");
      const answer = await this.questionRepository.updateQuestion(id, updatedData);
      loggerPrinter(this.SECTION, `Updated Question with id: ${id}.`, "info");
      return answer;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while updating Question with id: ${id}: ${error}.`);
      return null;
    }
  }

  async deleteFormById(id: string): Promise<boolean> {
    try {
      loggerPrinter(this.SECTION, `Deleting Question with id: ${id}.`, "debug");
      const answer = await this.questionRepository.deleteQuestion(id);
      loggerPrinter(this.SECTION, `Deleted Question with id: ${id}.`, "info");
      return answer;
    } catch (error) {
      loggerPrinter(this.SECTION, `Error while deleting Question with id: ${id}: ${error}.`, "error");
      return false;
    }
  }
}