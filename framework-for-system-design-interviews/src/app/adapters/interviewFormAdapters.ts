import { InterviewForm } from "../../domain/models/interviewForm";
import { InterviewFormDTO } from "../dtos/interviewForm.dto";
import { iFormEntityToFormDTO } from "./formAdapters";
import { iInterviewEntityToInterviewDTO } from "./interviewAdapter";

export const interviewFormTointerviewFormDTO = (interviewForm: InterviewForm): InterviewFormDTO => {
  return {
    id: interviewForm.id,
    interview: iInterviewEntityToInterviewDTO(interviewForm.interview),
    form: iFormEntityToFormDTO(interviewForm.form),
  };
};