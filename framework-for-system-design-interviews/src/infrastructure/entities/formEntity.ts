import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IFormEntity } from "../../domain/entities/IFormEntity";

@Entity()
export class FormEntity implements IFormEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'varchar' })
  description!: string;

  @Column({ type: 'varchar' })
  topic!: string;
}