import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User.entity";
import Workspace from "./Workspace.entity";
import NoIdBaseEntity from "../common/NoIdBaseEntity.entity";

@Entity("members")
export default class Member extends NoIdBaseEntity {

    @PrimaryColumn()
    userId?: string;

    @PrimaryColumn()
    workspaceId?: string;

    @ManyToOne(() => User, (u) => u.memberIn, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Workspace, (w) => w.members, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "workspaceId" })
    workspace?: Workspace;
}