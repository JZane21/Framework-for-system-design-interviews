import { IAuthorizationEntity } from "./IAuthotizationEntity";

export interface IUserEntity {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: IAuthorizationEntity;
}