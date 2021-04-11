import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { validate } from "class-validator";
import { RoleRepository } from "../repositories/RoleRepository";

class UserService {
    async index(req: Request, res: Response) {

    }

    async store(req: Request, res: Response){
        const { name, email, password, roles } = req.body;

        const userRepository = getCustomRepository(UserRepository);
        const roleRepository = getCustomRepository(RoleRepository);

        const userAlreadyExist = await userRepository.findOne({
            email
        });

        if(userAlreadyExist){
            throw new AppError("User already exists", 400);
        }

        const existsRoles = await roleRepository.findByIds(roles);

        const user = userRepository.create({
            name,
            email,
            password,
            roles: existsRoles
        });

        const errors = await validate(user);

        if(errors.length != 0){
            const validator = errors.map(error => error.constraints)
            return res.json(validator);
        }

        await userRepository.save(user);

        return res.status(201).json({message: "User successfully registered"});
    }

    async show(req: Request, res: Response){

    }

    async update(req: Request, res: Response){

    }

    async delete(req: Request, res: Response) {
        
    }

}

export default new UserService();