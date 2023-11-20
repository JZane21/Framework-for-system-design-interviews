import { InterviewFormRepository } from "../../domain/interfaces/interviewFormRepository";
import { Form } from "../../domain/models/form";
import { InterviewForm } from "../../domain/models/interviewForm";
import logger from "../../infrastructure/logger/logger";
import { interviewFormTointerviewFormDTO } from "../adapters/interviewFormAdapters";
import { InterviewFormDTO } from "../dtos/interviewForm.dto";

export class InterviewFormService {
  constructor(private interviewFormRepository: InterviewFormRepository) { }

  async getInterviewForms(): Promise<InterviewFormDTO[]> {
    logger.debug(`InterviewFormService: Trying to get interview forms`);
    const interviewForms = await this.interviewFormRepository.getInterviewForms();
    // const interviewFormsFromDB: InterviewFormDTO[] =
    //   interviewForms.map((interviewForm: InterviewForm) => interviewFormTointerviewFormDTO(interviewForm)) || [];
    return interviewForms;
  }

  async getInterviewFormByID(id: string): Promise<InterviewFormDTO | null> {
    logger.debug(`InterviewFormService: Trying to get interview form with id: ${id}`);
    const interviewForm = await this.interviewFormRepository.findById(id);
    if (!interviewForm) {
      logger.error(`InterviewFormService: Error trying to get interview form with id: ${id}`);
      return null;
    }
    return interviewFormTointerviewFormDTO(interviewForm);
  }

  async updateFormById(id: string, updatedData: Partial<InterviewForm>): Promise<InterviewFormDTO> {
    logger.debug(`InterviewFormService: Trying to updating interview form with id: ${id}`);
    return this.interviewFormRepository.updateInterviewForm(id, updatedData);
  }

  async deleteFormById(id: string): Promise<boolean> {
    logger.debug(`InterviewFormService: Trying to delete interview form with id: ${id}`);
    return this.interviewFormRepository.deleteInterviewForm(id);
  }
}