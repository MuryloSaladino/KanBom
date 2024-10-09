import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./common/BaseEntity.entity";
import Workspace from "./Workspace.entity";

@Entity("boards")
export default class Board extends BaseEntity {

    @Column({ type: "varchar", length: 50 })
    name?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    thumbnail?: string | null;

    @Column()
    workspaceId?: string;

    @ManyToOne(() => Workspace, (w) => w.boards, { onDelete: "CASCADE" })
    @JoinColumn({ name: "workspaceId" })
    workspace?: Workspace;
}