import { QuestionAnswer } from "../../domain/models/questionAnswer";
import { QuestionAnswerDTO } from "../dtos/questionAnswer.dto";

export const questionAnswerToQuestionAnswerDTO = (questionAnswer: QuestionAnswer): QuestionAnswerDTO => {
  return {
    id: questionAnswer.id,
    answer: questionAnswer.answer,
    rightAnswer: questionAnswer.rightAnswer,
  };
};