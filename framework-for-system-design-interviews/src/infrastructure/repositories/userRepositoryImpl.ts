import { UserRepository } from "../../domain/interfaces/userRepositoy";
import { User } from "../../domain/models/user";
import { AppDataSource } from "../config/dataSource";
import { UserEntity } from "../entities/userEntity";
import bcrypt from 'bcrypt'
import logger from "../logger/logger";

export class UserRepositoryImpl implements UserRepository{
    async findById(id:string):Promise<User|null>{
        const userRepository = AppDataSource.getRepository(UserEntity)
        const user = await userRepository.findOne({
            where:{id},
            relations: ['role']
        })
        return user ? new User(user) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const userRepository = AppDataSource.getRepository(UserEntity);
        const user = await userRepository.findOne({
            where: { email },
            relations: ['role']
        });
        return user ? new User(user) : null;
    }

    async createUser(user: User): Promise<User> {
        const userRepository = AppDataSource.getRepository(UserEntity);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.passwordHash, salt);
        const userEntity = userRepository.create({
            username: user.username,
            email: user.email,
            passwordHash: hash,
            role: user.role,
            
            answers:user.answers
        });
        logger.debug(JSON.stringify(userEntity)) //debug userEntity          

        const userResponse = await userRepository.save(userEntity);

        return new User({
            id: userResponse.id,
            username: userResponse.username,
            email: userResponse.email,
            passwordHash: userResponse.passwordHash,
            role: userResponse.role,
            answers:userResponse.answers

        });
    }

    async deleteUser(id: string): Promise<void> {

        const repository = AppDataSource.getRepository(UserEntity);
        const user = await repository.findOneBy({ id });

        if (!user) {
            logger.error(`UserRepository: Error al eliminar al usuario con ID: ${id}.`);
            throw new Error('Usuario no encontrado');
        }

        await repository.remove(user);
    }

    async updateUser(id: string, updateData: Partial<User>): Promise<User> {
        const repository = AppDataSource.getRepository(UserEntity);
        const user = await repository.findOneBy({ id });

        if (!user) {
            logger.error(`UserRepository: Error al modificar al usuario con ID: ${id}.`);
            throw new Error('Usuario no encontrado');
        }

        // if (user.role.id !== updateData.roleId)
        // get role a partir del updateData.roleId
        // if (!role) 
        // user.role = role

        repository.merge(user, updateData);
        const updatedUser = await repository.save(user);
        logger.debug("updateUser de userRepositoyImpl:" + JSON.stringify(updatedUser))
        return updatedUser;
    }
}