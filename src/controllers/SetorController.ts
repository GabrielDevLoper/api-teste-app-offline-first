import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SetorRepository } from "../repositories/SetorRepository";

interface BodyProps {
    nome: string;
}

class SetorController {

    async index(req: Request, res: Response){
        const setorRepository = getCustomRepository(SetorRepository);

        const setores = await setorRepository.find();

        return res.json(setores);
    }

    async store(req: Request, res: Response){
        const { nome } = req.body as BodyProps;

        const setorRepository = getCustomRepository(SetorRepository);
    

        const existsSetor = await setorRepository.findOne({nome:  nome.toLowerCase()});

        if(existsSetor){
            throw new AppError("Setor ja existe", 400)
        }

        const setor = setorRepository.create({
            nome: nome.toLowerCase(),
            
        });

        await setorRepository.save(setor);

        return res.json(setor);
    }

}

export default new SetorController();