import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "./common/BaseEntity.entity";
import Board from "./Board.entity";

@Entity("card_lists")
export default class CardList extends BaseEntity {

    @Column()
    boardId?: string;

    @ManyToOne(() => Board)
    board?: Board;

    @Column()
    name?: string;

    @Column({ type: "char", length: 7, default: "#00B4D8" })
    color?: string;
}