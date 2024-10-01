import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Role, roleToString, stringToRole } from "../enums/Role";
import User from "./User.entity";
import Project from "./Project.entity";
import NoIdBaseEntity from "./common/NoIdBaseEntity.entity";

@Entity("participants")
export default class Participant extends NoIdBaseEntity {

    @Column({ 
        type: "varchar",
        length: 20,
        transformer: { to: roleToString, from: stringToRole }
    })
    role?: Role;

    @PrimaryColumn()
    userId?: string;

    @PrimaryColumn()
    projectId?: string;
    
    @ManyToOne(() => User, (user) => user.participations, { cascade: true })
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Project, (project) => project.participants, { cascade: true })
    @JoinColumn({ name: "projectId" })
    project?: Project;

}