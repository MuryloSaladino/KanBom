import { Entity, ManyToOne } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import User from "./User.entity";
import Project from "./Project.entity";

@Entity("project_invite")
export default class ProjectInvite extends BaseEntity {

    @ManyToOne(() => User)
    user?: User;

    @ManyToOne(() => Project)
    project?: Project;
}