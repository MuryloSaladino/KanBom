import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Card from "./Card.entity";

export type TAttachment = "file" | "photo" | "link";

@Entity("card_attachments")
export default class CardAttachment {

    @Column()
    url?: string;
    
    @Column()
    title?: string;

    @Column({ type: "varchar" })
    type?: TAttachment;

    @Column()
    cardId?: string;

    @ManyToOne(() => Card, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "cardId" })
    card?: Card;
}