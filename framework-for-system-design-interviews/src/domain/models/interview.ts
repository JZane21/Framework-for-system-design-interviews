import { v4 as uuidv4 } from 'uuid';
import { IInterviewEntity } from '../entities/IInterviewEntity';

export class Interview {
  id: string;
  title: string;
  description: string;

  constructor(inteviewEntity: IInterviewEntity) {
    this.id = inteviewEntity.id || uuidv4();
    this.title = inteviewEntity.title;
    this.description = inteviewEntity.description;
  }
}