import {BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryColumn, Unique, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid";
import { Setor } from "./Setor";

@Entity("funcionarios")
export class Funcionario {
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    data_nascimento: Date;

    @Column({ unique:true})
    cpf: string;

    @ManyToOne(() => Setor)
    id_setor: Setor;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    generatedUuid(){
        this.id = uuid();
    }

}
