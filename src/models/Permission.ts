import {BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("permissions")
export class Permission {

    @PrimaryColumn()
    id: string;

    @Column({ unique: true})
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    async generatedUuid(){
        this.id = uuid();
    }

}
