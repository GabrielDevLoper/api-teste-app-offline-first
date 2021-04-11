import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../repositories/UserRepository";

class SessionController {
    async auth(req: Request, res: Response){
        const { email, password } = req.body;

        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({
            email
        },
        {
            relations: ["roles"]
        }
        );

        if(!user){
            throw new AppError("User not found", 404);
        }

        const comparePassword = await compare(password, user.password);

        if(!comparePassword){
            throw new AppError("Incorrect password or email", 400);
        }

        const roles = user.roles.map(roles => roles.name);

        const token = sign({ roles }, process.env.TOKEN_SECRET, {
            subject: user.id,
            expiresIn: "1d"
        });

        delete user.password;

        return res.json({
            user,
            token
        });
    }
}

export default new SessionController();