import { v4 as uuidv4 } from 'uuid';
import { IInterviewEntity } from '../entities/IInterviewEntity';
import { Question } from './question';
import { IQuestionEntity } from '../entities/IQuestionEntity';

export class Interview {
  id: string;
  title: string;
  description: string;
  questions: IQuestionEntity[];

  constructor(inteviewEntity: IInterviewEntity) {
    this.id = inteviewEntity.id || uuidv4();
    this.title = inteviewEntity.title;
    this.description = inteviewEntity.description;
    this.questions = inteviewEntity.questions;
  }
}