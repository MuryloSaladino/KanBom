import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User.entity";
import Project from "./Project.entity";

@Entity("project_invite")
export default class ProjectInvite {

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