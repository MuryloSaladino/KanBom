import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User.entity";
import Project from "./Project.entity";
import { Role, roleToString, stringToRole } from "../enums/Role";

@Entity("project_invite")
export default class ProjectInvite {

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

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Project)
    @JoinColumn({ name: "projectId" })
    project?: Project;
}