import {BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";
import { IsEmail, IsNotEmpty,  } from "class-validator";
import { Role } from "./Role";

@Entity("users")
class User {

    @PrimaryColumn()
    id: string;

    @Column()
    @IsNotEmpty({message: "Nome é obrigatório"})
    name: string;

    @Column({
        unique: true,
    })
    @IsEmail({}, {message: "Email incorreto!"})
    @IsNotEmpty({message: "O email é obrigatório"})
    email: string;

    @Column()
    password: string;

    @Column({
        default: false
    })
    status: boolean;

    @ManyToMany(() => Role)
    @JoinTable({
        name: "users_roles",
        joinColumns: [{name:"id_user"}],
        inverseJoinColumns: [{name: "id_role"}]
    })
    roles: Role[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    
    @BeforeInsert()
    generatedUuid(){
        this.id = uuid();
    }


    @BeforeInsert()
    @BeforeUpdate()
    async passwordHash(){
        this.password = await hash(this.password, 8);
    }
}

export { User };
