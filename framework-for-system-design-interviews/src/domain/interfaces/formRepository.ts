import { FormDTO } from "../../app/dtos/form.dto";
import { Form } from "../models/form";

export interface FormRepository {
  findById(id: string): Promise<FormDTO | null>;
  getForms(): Promise<Form[]>;
  createForm(form: Form): Promise<FormDTO>;
  updateForm(id: string, updatedData: Partial<Form>): Promise<FormDTO>;
  deleteForm(id: string): Promise<boolean>;
}