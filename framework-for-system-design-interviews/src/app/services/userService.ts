import { UserDTO } from "../dtos/userDTO";
import { CreateUserDTO } from "../dtos/createUserDTO";

import { IUserEntity } from "../../domain/entities/IUserEntity";
import { ICacheService } from "../../domain/interfaces/cacheRepository";
import { RoleRepository } from "../../domain/interfaces/roleRepository";
import { UserRepository } from "../../domain/interfaces/userRepositoy";

import { User } from "../../domain/models/user";
import logger from "../../infrastructure/logger/logger";

export class UserService{
    constructor(private userRepository:UserRepository, private roleRepository: RoleRepository){}

    async getUserById(id:string):Promise<UserDTO | null>{
        const user = await this.userRepository.findById(id)
        if(!user) return null
        const userResponse:UserDTO ={
            id: user.id,
            username: user.username,
            email: user.email,
            role:user.role,
            interview: user.interview,
            answers:user.answers
        }
        logger.info("Usuario obtenido con exito:")
        logger.debug(JSON.stringify(userResponse));
        return userResponse
        
    }

    async createUser(userDto: CreateUserDTO): Promise<User> {
        const role = await this.roleRepository.findById(userDto.roleId);
        logger.info('Role en createUserService:');
        logger.debug(role)
        if (!role) {
            throw new Error('Rol no encontrado');
        }


        const userEntity: IUserEntity = {
            username: userDto.username,
            email: userDto.email,
            passwordHash: userDto.password,
            role,
            answers:userDto.answers
        };
        const newUser = new User(userEntity);

        return this.userRepository.createUser(newUser);
    }

    async deleteUser(userId: string): Promise<void> {
        logger.debug(`UserService: Intentando eliminar al usuario con ID: ${userId}`);
        await this.userRepository.deleteUser(userId);
    }

    async updateUser(userId: string, updateData: Partial<CreateUserDTO>): Promise<User> {
        logger.debug(`UserService: Intentando actualizar al usuario con ID: ${userId}`);
        return this.userRepository.updateUser(userId, updateData);
    }

}