import { IRoleEntity } from "../../domain/entities/IRoleEntity";
import { RoleRepository } from "../../domain/interfaces/roleRepository";
import { Role } from "../../domain/models/role";
import logger from "../../infrastructure/logger/logger";
import { CreateRoleDTO } from "../dtos/createRoleDTO";

export class RoleService {
    constructor(private roleRepository: RoleRepository) { }

    async createRole(roleDto: CreateRoleDTO): Promise<Role> {
        const roleEntity: IRoleEntity = {
            roleName: roleDto.roleName,
            description: roleDto.description
        };
        const newRole = new Role(roleEntity);
        return this.roleRepository.createRole(newRole);
    }

    async getRoleById(id: string): Promise<CreateRoleDTO | null> {
        const role = await this.roleRepository.findById(id);
        if (!role) { return null; }
        const roleResponse: CreateRoleDTO = {
            id: role.id,
            roleName: role.roleName,
            description: role.description,
        }
        return roleResponse;
    }
}