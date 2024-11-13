import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import NoIdBaseEntity from "../common/NoIdBaseEntity.entity";
import Card from "./Card.entity";
import Label from "./Label.entity";

@Entity("card_labels")
export default class CardLabel extends NoIdBaseEntity {

    @PrimaryColumn()
    labelId?: string;

    @PrimaryColumn()
    cardId?: string;

    @ManyToOne(() => Label, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "labelId" })
    label?: Label;

    @ManyToOne(() => Card, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "cardId" })
    card?: Card;
}