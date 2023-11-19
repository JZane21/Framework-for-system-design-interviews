import { IQuestionEntity } from "../entities/IQuestionEntity";
import { v4 as uuidv4 } from 'uuid';

export class Question {
  id: string;
  statement: string;

  constructor(questionEntity: IQuestionEntity) {
    this.id = questionEntity.id || uuidv4();
    this.statement = questionEntity.statement;
  }
}