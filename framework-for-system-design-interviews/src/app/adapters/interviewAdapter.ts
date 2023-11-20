import { IInterviewEntity } from "../../domain/entities/IInterviewEntity";
import { Interview } from "../../domain/models/interview";
import { CreateInterviewDTO } from "../dtos/create.interview.dto";
import { InterviewDTO } from "../dtos/interview.dto";

export const interviewToInterviewDTO = (interview: Interview): InterviewDTO => {
  return {
    id: interview.id,
    title: interview.title,
    description: interview.description,
  };
};

export const iInterviewEntityToInterviewDTO = (iInterviewEntity: IInterviewEntity): InterviewDTO => {
  return {
    id: iInterviewEntity.id,
    title: iInterviewEntity.title,
    description: iInterviewEntity.description,
  };
};

export const createInterviewDTOToIInterviewEntity = (createInterviewDto: CreateInterviewDTO): IInterviewEntity => {
  return {
    title: createInterviewDto.title,
    description: createInterviewDto.description,
  };
};
