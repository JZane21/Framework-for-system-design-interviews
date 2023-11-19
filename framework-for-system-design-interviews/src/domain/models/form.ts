import { IFormEntity } from "../entities/IFormEntity";
import { v4 as uuidv4 } from 'uuid';

export class Form {
  id: string;
  title: string;
  description: string;
  topic: string;

  constructor(formEntity: IFormEntity) {
    this.id = formEntity.id || uuidv4();
    this.title = formEntity.title;
    this.description = formEntity.description;
    this.topic = formEntity.topic;
  }
}