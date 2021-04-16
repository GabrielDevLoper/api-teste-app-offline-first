import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
    async index(req: Request, res: Response) {
        await UserService.index(req, res);

    }

    async store(req: Request, res: Response){
        await UserService.store(req, res);
    }

    async show(req: Request, res: Response){

    }

    async update(req: Request, res: Response){

    }

    async delete(req: Request, res: Response) {
        
    }

}

export default new UserController();