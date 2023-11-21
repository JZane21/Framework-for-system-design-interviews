import { RoleRepository } from "../../domain/interfaces/roleRepository";
import logger from "../../infrastructure/logger/logger";
import { RoleDTO } from "../dtos/roleDTO";

export class RoleService {
    constructor(private roleRepository: RoleRepository) { }

    async getRoleById(id: string): Promise<RoleDTO | null> {
        const role = await this.roleRepository.findById(id);
        if (!role) { return null; }
        const roleResponse: RoleDTO = {
            id: role.id,
            roleName: role.roleName,
            description: role.description,
        }
        return roleResponse;
    }
}