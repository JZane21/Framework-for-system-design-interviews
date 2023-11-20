import { IFormEntity } from "../../domain/entities/IFormEntity";
import { IInterviewEntity } from "../../domain/entities/IInterviewEntity";
import { Form } from "../../domain/models/form";
import { FormDTO } from "../dtos/form.dto";

export const formToFormDTO = (form: Form): FormDTO => {
  return {
    id: form.id,
    title: form.title,
    description: form.description,
    topic: form.topic
  };
};

export const iFormEntityToFormDTO = (iFormEntity: IFormEntity): FormDTO => {
  return {
    id: iFormEntity.id,
    title: iFormEntity.title,
    description: iFormEntity.description,
    topic: iFormEntity.topic,
  }
};
