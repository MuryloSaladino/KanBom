import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User.entity";
import Project from "./Project.entity";
import { TParticipantRole } from "../types/projects.types";

@Entity("project_invites")
export default class ProjectInvite {

    @Column({ type: "varchar", length: 20 })
    role?: TParticipantRole;

    @PrimaryColumn()
    userId?: string;

    @PrimaryColumn()
    projectId?: string;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Project, { onDelete: "CASCADE" })
    @JoinColumn({ name: "projectId" })
    project?: Project;
}