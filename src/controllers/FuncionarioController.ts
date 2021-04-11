import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { FuncionarioRepository } from "../repositories/FuncionarioRepository";
import { SetorRepository } from "../repositories/SetorRepository";

class FuncionarioController {

    async index(req: Request, res: Response){
        const funcionarioRepository = getCustomRepository(FuncionarioRepository);

        const funcionarios = await funcionarioRepository.find();

        return res.json(funcionarios);
    }

    async store(req: Request, res: Response){
        const { nome, cpf, data_nascimento, id_setor } = req.body;

        const funcionarioRepository = getCustomRepository(FuncionarioRepository);
        const setorRepository = getCustomRepository(SetorRepository);

        const existsFuncionario = await funcionarioRepository.findOne({cpf});

        const existsSetor = await setorRepository.findOne({id: id_setor});

        if(!existsSetor){
            throw new AppError("Setor not already exists", 404)
        }

        if(existsFuncionario){
            throw new AppError("Funcionario already exists", 400)
        }

        const date = data_nascimento.split("/");
        const dateFormat = `${date[2]}-${date[1]}-${date[0]}`

        const funcionario = funcionarioRepository.create({
            nome,
            cpf,
            data_nascimento: new Date(dateFormat),
            id_setor: existsSetor
        });

        await funcionarioRepository.save(funcionario);

        return res.json(funcionario);
    }

}

export default new FuncionarioController();