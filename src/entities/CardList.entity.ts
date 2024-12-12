import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "../common/BaseEntity.entity";
import Board from "./Board.entity";
import Card from "./Card.entity";

@Entity("card_lists")
export default class CardList extends BaseEntity {

    @Column()
    boardId?: string;

    @ManyToOne(() => Board)
    board?: Board;

    @Column({ type: "int", default: 0 })
    index?: number;

    @Column()
    name?: string;

    @Column({ type: "char", length: 7, default: "#00B4D8" })
    color?: string;

    @OneToMany(() => Card, (c) => c.cardList)
    cards?: Card[];
}