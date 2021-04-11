import { EntityRepository, Repository } from "typeorm";
import { Setor } from "../models/Setor";


@EntityRepository(Setor)
class SetorRepository extends Repository<Setor> {

}


export { SetorRepository };