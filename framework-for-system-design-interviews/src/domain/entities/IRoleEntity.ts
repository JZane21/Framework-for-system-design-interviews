import { IAuthorizationEntity } from "./IAuthotizationEntity";

export interface IRoleEntity {
  id?: string;
  roleName: string;
  description: string;
  authorization: IAuthorizationEntity;
}