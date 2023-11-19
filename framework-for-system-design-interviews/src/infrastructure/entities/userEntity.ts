import { PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { IAuthorizationEntity } from "../../domain/entities/IAuthotizationEntity";
import { IUserEntity } from "../../domain/entities/IUserEntity";
import { RoleEntity } from "./roleEntity";

export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'roleId' })
  role: IAuthorizationEntity;
}