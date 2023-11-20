import { FormDTO } from "../../app/dtos/form.dto";
import { FormRepository } from "../../domain/interfaces/formRepository";
import { Form } from "../../domain/models/form";

export class FormRepositoryImpl implements FormRepository {
  findById(id: string): Promise<FormDTO> {
    throw new Error("Method not implemented.");
  }
  getForms(): Promise<Form[]> {
    throw new Error("Method not implemented.");
  }
  createForm(form: Form): Promise<FormDTO> {
    throw new Error("Method not implemented.");
  }
  updateForm(id: string, updatedData: Partial<Form>): Promise<FormDTO> {
    throw new Error("Method not implemented.");
  }
  deleteForm(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}