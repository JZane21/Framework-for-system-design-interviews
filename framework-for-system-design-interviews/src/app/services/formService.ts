import { FormRepository } from "../../domain/interfaces/formRepository";
import { Form } from "../../domain/models/form";
import logger from "../../infrastructure/logger/logger";
import { formToFormDTO } from "../adapters/formAdapters";
import { CreateFormDTO } from "../dtos/create.form.dto";
import { FormDTO } from "../dtos/form.dto";

export class FormService {
  constructor(private formRepository: FormRepository) { }

  async getForms(): Promise<FormDTO[]> {
    logger.debug(`FormService: Trying to get forms`);
    const forms = await this.formRepository.getForms();
    const formsFromDB: FormDTO[] = forms.map((form: Form) => formToFormDTO(form)) || [];
    return formsFromDB;
  }

  async getFormByID(id: string): Promise<FormDTO | null> {
    logger.debug(`FormService: Trying to get form with id: ${id}`);
    const form = await this.formRepository.findById(id);
    if (!form) {
      logger.error(`FormService: Error trying to get form with id: ${id}`);
      return null;
    }
    return formToFormDTO(form);
  }

  async updateFormById(id: string, updatedData: Partial<Form>): Promise<FormDTO> {
    logger.debug(`FormService: Trying to updating form with id: ${id}`);
    return this.formRepository.updateForm(id, updatedData);
  }

  async deleteFormById(id: string): Promise<boolean> {
    logger.debug(`FormService: Trying to delete form with id: ${id}`);
    return this.formRepository.deleteForm(id);
  }
}