import {BeforeInsert, BeforeRemove, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";
import { IsEmail, IsNotEmpty,  } from "class-validator";
import { Role } from "./Role";
import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util'


const s3 = new aws.S3();

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
        nullable: true
    })
    key: string;

    @Column({
        nullable: true
    })
    url: string;

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
    profileImg(){
        if(!this.url){
            this.url = `${process.env.APP_URL}/files/${this.key}`;
        }
    }

    @BeforeRemove()
    removeImgAws() {
        if(process.env.STORAGE_TYPE === 's3'){
            return s3.deleteObject({
                Bucket: 'upload-node-react',
                Key: this.key,
            }).promise();
        }/* esta condição else faz com que apague tbm as imagens que ficam armazenada localmente na pasta tmp/uploads*/else{
            return promisify(fs.unlink)(path.resolve(__dirname, '..','..', 'tmp', 'uploads', this.key));
        }
    }

    @BeforeInsert()
    @BeforeUpdate()
    async passwordHash(){
        this.password = await hash(this.password, 8);
    }
}

export { User };
