import { PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";
import { IAuthorizationEntity } from "../../domain/entities/IAuthotizationEntity";
import { IUserEntity } from "../../domain/entities/IUserEntity";

export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @JoinColumn({ name: 'roleId' })
  role: IAuthorizationEntity;
}