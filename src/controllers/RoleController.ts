import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { PermissionRepository } from "../repositories/PermissionRepository";
import { RoleRepository } from "../repositories/RoleRepository";

class RoleController {
    async index(req: Request, res: Response) {
        const roleRepository = getCustomRepository(RoleRepository);
        const roles = await roleRepository.find();

        return res.json(roles)
    }
    async store(req: Request, res: Response){
        const { name, description, permissions } = req.body;

        const roleRepository = getCustomRepository(RoleRepository);
        const permissionRepository = getCustomRepository(PermissionRepository);

        const roleAlreadyExist = await roleRepository.findOne({name});

        if(roleAlreadyExist){
            throw new AppError("role already exists", 400)
        }

        const existsPermissions = await permissionRepository.findByIds(permissions);

        const role = roleRepository.create({
            name,
            description,
            permission: existsPermissions
        });

        await roleRepository.save(role);

        return res.json(role);
    }
}

export default new RoleController();