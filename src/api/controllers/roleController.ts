import { Request, Response, Router } from 'express';
import logger from '../../infrastructure/logger/logger';
import { RoleService } from '../../app/services/roleService';

export class RoleController {
    public router: Router;
    private roleService: RoleService;

    constructor(roleService: RoleService) {
        this.roleService = roleService;
        this.router = Router();
        this.routes();
    }


    public async getRoleById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const userDto = await this.roleService.getRoleById(id);

        if (!userDto) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }

        res.json(userDto);
    }


    public routes() {
        this.router.get('/:id', this.getRoleById.bind(this));
    }
}