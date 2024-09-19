import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import { Role, roleToString, stringToRole } from "../enums/Role";
import User from "./User.entity";
import Project from "./Project.entity";

@Entity("participants")
export default class Participant extends BaseEntity {

    @Column({ 
        type: "varchar",
        length: 20,
        transformer: { to: roleToString, from: stringToRole }
    })
    role?: Role;

    @ManyToOne(() => User)
    user?: User;

    @ManyToOne(() => Project)
    project?: Project;
}