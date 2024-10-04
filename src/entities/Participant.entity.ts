import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User.entity";
import Project from "./Project.entity";
import NoIdBaseEntity from "./common/NoIdBaseEntity.entity";
import { TParticipantRole } from "../types/projects.types";

@Entity("participants")
export default class Participant extends NoIdBaseEntity {

    @Column({ type: "varchar", length: 20 })
    role?: TParticipantRole;

    @PrimaryColumn()
    userId?: string;

    @PrimaryColumn()
    projectId?: string;
    
    @ManyToOne(() => User, (user) => user.participations, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Project, (project) => project.participants, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "projectId" })
    project?: Project;

}