import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User.entity";
import Workspace from "./Workspace.entity";
import NoIdBaseEntity from "./common/NoIdBaseEntity.entity";
import Card from "./Card.entity";

@Entity("card_participations")
export default class CardParticipations extends NoIdBaseEntity {

    @PrimaryColumn()
    userId?: string;

    @PrimaryColumn()
    cardId?: string;

    @ManyToOne(() => User, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Card, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "cardId" })
    card?: Card;
}