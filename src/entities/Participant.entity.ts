import { Column, Entity, JoinTable, ManyToMany, ManyToOne, RelationId } from "typeorm";
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

    @ManyToOne(() => User, (user) => user.participations, { cascade: true })
    user?: User;

    @RelationId((participant:Participant) => participant.user)
    userId?: string;

    @ManyToOne(() => Project, (project) => project.participants, { cascade: true })
    project?: Project;

    @RelationId((participant:Participant) => participant.project)
    projectId?: string;
}