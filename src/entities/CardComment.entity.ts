import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "../common/BaseEntity.entity";
import User from "./User.entity";
import Card from "./Card.entity";

@Entity("card_comments")
export default class CardComment extends BaseEntity {

    @Column({ type: "text" })
    text?: string;

    @Column()
    userId?: string;

    @Column()
    cardId?: string;

    @ManyToOne(() => User, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Card, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "cardId" })
    card?: Card;
}