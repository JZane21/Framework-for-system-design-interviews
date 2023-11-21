import { QuestionAnswer } from "../../domain/models/questionAnswer";
import { QuestionAnswerDTO } from "../../app/dtos/questionAnswer.dto";
import { IQuestionAnswerEntity } from "../../domain/entities/IQuestionAnswerEntity";
import { CreateQuestionAnswerDTO } from "../../app/dtos/create.questionAnswer.dto";

export const questionAnswerToQuestionAnswerDTO = (questionAnswer: QuestionAnswer): QuestionAnswerDTO => {
  return {
    id: questionAnswer.id,
    answers: [...questionAnswer.answer],
    rightAnswer: questionAnswer.rightAnswer,
  };
};

export const createQuestionAnswerDTOToIQuestionAnswerEntity = (createQuestionAnswerDto: CreateQuestionAnswerDTO): IQuestionAnswerEntity => {
  return {
    answers: [...createQuestionAnswerDto.answers],
    rightAnswer: createQuestionAnswerDto.rightAnswer,
    question: null,
  };
};
