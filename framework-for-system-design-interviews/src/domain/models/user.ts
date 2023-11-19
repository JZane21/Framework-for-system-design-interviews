import { IAuthorizationEntity } from "../entities/IAuthotizationEntity";
import { IUserEntity } from "../entities/IUserEntity";
import { v4 as uuidv4 } from 'uuid';

export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: IAuthorizationEntity;

  constructor(userEntity: IUserEntity) {
    this.id = userEntity.id || uuidv4();
    this.username = userEntity.username;
    this.email = userEntity.email;
    this.password = userEntity.password;
    this.role = userEntity.role;
  }
}