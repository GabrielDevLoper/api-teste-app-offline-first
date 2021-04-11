import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { PermissionRepository } from "../repositories/PermissionRepository";

class PermissionController {
    async index(req: Request, res: Response) {
        const permissionRepository = getCustomRepository(PermissionRepository);

        const permissions = await permissionRepository.find();

        return res.json(permissions);
    }

    async store(req: Request, res: Response){
        const { name, description } = req.body;

        const permissionRepository = getCustomRepository(PermissionRepository);

        const permissionAlreadyExist = await permissionRepository.findOne({name});

        if(permissionAlreadyExist){
            throw new AppError("Permission already exists", 400)
        }

        const permission = permissionRepository.create({
            name,
            description
        });

        await permissionRepository.save(permission);

        return res.json({message: "Permission created"});
    }
}

export default new PermissionController();