import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SetorRepository } from "../repositories/SetorRepository";

class SetorController {

    async index(req: Request, res: Response){
        const setorRepository = getCustomRepository(SetorRepository);

        const setores = await setorRepository.find();

        return res.json(setores);
    }

    async store(req: Request, res: Response){
        const { nome } = req.body;

        const setorRepository = getCustomRepository(SetorRepository);

        const existsSetor = await setorRepository.findOne({nome});

        if(existsSetor){
            throw new AppError("Product already exists", 400)
        }

        const setor = setorRepository.create({
            nome,
            
        });

        await setorRepository.save(setor);

        return res.json(setor);
    }

}

export default new SetorController();