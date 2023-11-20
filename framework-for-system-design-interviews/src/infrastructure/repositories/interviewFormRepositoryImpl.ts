import { InterviewFormDTO } from "../../app/dtos/interviewForm.dto";
import { InterviewFormRepository } from "../../domain/interfaces/interviewFormRepository";
import { InterviewForm } from "../../domain/models/interviewForm";

export class InterviewFormRepositoryImpl implements InterviewFormRepository {
  findById(id: string): Promise<InterviewFormDTO> {
    throw new Error("Method not implemented.");
  }
  getInterviewForms(): Promise<InterviewFormDTO[]> {
    throw new Error("Method not implemented.");
  }
  createInterviewForm(interviewForm: InterviewForm): Promise<InterviewFormDTO> {
    throw new Error("Method not implemented.");
  }
  updateInterviewForm(id: string, updatedData: Partial<InterviewForm>): Promise<InterviewFormDTO> {
    throw new Error("Method not implemented.");
  }
  deleteInterviewForm(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}