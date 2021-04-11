import {BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid";
import { Funcionario } from "./Funcionario";

@Entity("setores")
export class Setor {
    @PrimaryColumn()
    id: string;

    @Column({ unique:true })
    nome: string;

    @OneToMany(() => Funcionario, funcionario => funcionario.id_setor)
    funcionarios: Funcionario[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @BeforeInsert()
    generatedUuid(){
        this.id = uuid();
    }

}
