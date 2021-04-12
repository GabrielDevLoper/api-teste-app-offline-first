import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { FuncionarioRepository } from "../repositories/FuncionarioRepository";
import { SetorRepository } from "../repositories/SetorRepository";
import * as yup from 'yup';
class FuncionarioController {

    async index(req: Request, res: Response){
        const funcionarioRepository = getCustomRepository(FuncionarioRepository);

        const funcionarios = await funcionarioRepository.find();

        return res.json(funcionarios);
    }

    async store(req: Request, res: Response){
        const { nome, cpf, data_nascimento, id_setor } = req.body;

        let schema = yup.object().shape({
            nome: yup.string().required("Nome é obrigatorio"),
            cpf: yup.string().required("Cpf obrigatorio"),
            data_nascimento: yup.string().required("data nascimento obrigatorio"),
            id_setor: yup.string().required("setor obrigatorio"),
        });

        try {
            await schema.validate(req.body);
        } catch (error) {
            throw new AppError(error, 200);
        }

        const funcionarioRepository = getCustomRepository(FuncionarioRepository);
        const setorRepository = getCustomRepository(SetorRepository);

        const existsFuncionario = await funcionarioRepository.findOne({cpf});

        const existsSetor = await setorRepository.findOne({id: id_setor});

        if(!existsSetor){
            throw new AppError("Setor não existe", 200)
        }

        if(existsFuncionario){
            throw new AppError("Funcionario já está cadastrado", 200)
        }

        const date = data_nascimento.split("/");
        const dateFormat = `${date[2]}-${date[1]}-${date[0]}`

        if(new Date(dateFormat).toDateString() == "Invalid Date"){
            throw new AppError("Data inserida inválida", 200)
        }
       
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