import { IAuthorizationEntity } from "../entities/IAuthotizationEntity";
import { IRoleEntity } from "../entities/IRoleEntity";
import { v4 as uuidv4 } from 'uuid';

export class Role {
  id: string;
  roleName: string;
  description: string;
  authorization: IAuthorizationEntity;

  constructor(roleEntity: IRoleEntity) {
    this.id = roleEntity.id || uuidv4();
    this.roleName = roleEntity.roleName;
    this.description = roleEntity.roleName;
    this.authorization = roleEntity.authorization;
  }
}