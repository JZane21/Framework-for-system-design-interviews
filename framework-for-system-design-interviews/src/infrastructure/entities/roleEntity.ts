import { PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";
import { IAuthorizationEntity } from "../../domain/entities/IAuthotizationEntity";
import { IRoleEntity } from "../../domain/entities/IRoleEntity";

export class RoleEntity implements IRoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  roleName: string;

  @Column({ type: 'varchar' })
  description: string;

  @JoinColumn({ name: 'authorizationId' })
  authorization: IAuthorizationEntity;

}