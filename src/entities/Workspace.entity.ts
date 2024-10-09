import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import User from "./User.entity";
import BaseEntity from "./common/BaseEntity.entity";
import Member from "./Member.entity";
import Board from "./Board.entity";

@Entity("workspaces")
export default class Workspace extends BaseEntity {

    @Column({ type: "varchar", length: 50 })
    name?: string;

    @Column()
    ownerId?: string;

    @ManyToOne(() => User, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "ownerId" })
    owner?: User;

    @OneToMany(() => Member, (m) => m.team)
    members?: Member[];

    @OneToMany(() => Board, (b) => b.workspace)
    boards?: Board[];
}