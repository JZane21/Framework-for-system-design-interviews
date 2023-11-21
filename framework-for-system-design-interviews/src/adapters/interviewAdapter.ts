import { IInterviewEntity } from "../domain/entities/IInterviewEntity";
import { Interview } from "../domain/models/interview";
import { CreateInterviewDTO } from "../app/dtos/create.interview.dto";
import { InterviewDTO } from "../app/dtos/interview.dto";

export const interviewToInterviewDTO = (interview: Interview): InterviewDTO => {
  return {
    id: interview.id,
    title: interview.title,
    description: interview.description,
    questions: interview.questions
  };
};

export const iInterviewEntityToInterviewDTO = (iInterviewEntity: IInterviewEntity): InterviewDTO => {
  return {
    id: iInterviewEntity.id,
    title: iInterviewEntity.title,
    description: iInterviewEntity.description,
    questions: [...iInterviewEntity.questions]
  };
};

export const createInterviewDTOToIInterviewEntity = (createInterviewDto: CreateInterviewDTO): IInterviewEntity => {
  return {
    title: createInterviewDto.title,
    description: createInterviewDto.description,
    questions: [],
  };
};

