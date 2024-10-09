import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User.entity";
import Workspace from "./Workspace.entity";

@Entity("workspace_invites")
export default class WorkspaceInvite {
   
    @PrimaryColumn()
    userId?: string;

    @PrimaryColumn()
    workspaceId?: string;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Workspace, { onDelete: "CASCADE" })
    @JoinColumn({ name: "workspaceId" })
    workspace?: Workspace;
}