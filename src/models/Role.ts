import {BeforeInsert, AfterRemove ,Column, Entity, JoinTable, ManyToMany, PrimaryColumn} from "typeorm";
import { v4 as uuid } from "uuid";
import { Permission } from "./Permission";

@Entity("roles")
export class Role {
    
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: "permissions_roles",
        joinColumns: [{name:"id_role"}],
        inverseJoinColumns: [{name: "id_permission"}]
    })
    permission: Permission[]

    @BeforeInsert()
    async generatedUuid(){
        this.id = uuid();
    }

    
}
