import { Column, PrimaryGeneratedColumn } from "typeorm";
import { IQuestionEntity } from "../../domain/entities/IQuestionEntity";

export class QuestionEntity implements IQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  statement: string;
}