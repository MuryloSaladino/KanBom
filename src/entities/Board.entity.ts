import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "../common/BaseEntity.entity";
import Workspace from "./Workspace.entity";
import Label from "./Label.entity";
import CardList from "./CardList.entity";
import BoardRole from "./BoardRole.entity";

@Entity("boards")
export default class Board extends BaseEntity {

    @Column({ type: "varchar", length: 50 })
    name?: string;

    @Column({ type: "char", length: 7, default: "#00B4D8" })
    color?: string;

    @Column()
    workspaceId?: string;

    @ManyToOne(() => Workspace, (w) => w.boards, { onDelete: "CASCADE" })
    @JoinColumn({ name: "workspaceId" })
    workspace?: Workspace;

    @OneToMany(() => Label, (l) => l.board)
    labels?: Label[];

    @OneToMany(() => CardList, (cl) => cl.board)
    lists?: CardList[];

    @OneToMany(() => BoardRole, (br) => br.board)
    participants?: BoardRole[];
}
