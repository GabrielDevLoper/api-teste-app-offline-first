import { EntityRepository, Repository } from "typeorm";
import { Funcionario } from "../models/Funcionario";


@EntityRepository(Funcionario)
class FuncionarioRepository extends Repository<Funcionario> {

}


export { FuncionarioRepository };