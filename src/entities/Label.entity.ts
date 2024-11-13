import { Column, Entity, ManyToOne } from "typeorm";
import Board from "./Board.entity";
import BaseEntity from "../common/BaseEntity.entity";

@Entity("labels")
export default class Label extends BaseEntity {

    @Column()
    boardId?: string;

    @ManyToOne(() => Board)
    board?: Board;

    @Column({ type: "varchar", length: 15 })
    description?: string;

    @Column({ type: "char", length: 7 })
    color?: string;
}