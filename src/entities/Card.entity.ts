import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import CardList from "./CardList.entity";
import BaseEntity from "../common/BaseEntity.entity";
import CardParticipation from "./CardParticipation.entity";
import CardLabel from "./CardLabel.entity";
import CardLog from "./CardLog.entity";
import CardComment from "./CardComment.entity";

@Entity("cards")
export default class Card extends BaseEntity {

    @Column()
    cardListId?: string;

    @ManyToOne(() => CardList)
    cardList?: CardList;

    @Column()
    description?: string;

    @Column({ type: "text" })
    detailedDescription?: string;

    @Column({ type: "date", nullable: true })
    startDate?: Date | null;
    
    @Column({ type: "date", nullable: true })
    finishDate?: Date | null;

    @OneToMany(() => CardParticipation, (cd) => cd.card)
    participations?: CardParticipation[];

    @OneToMany(() => CardLabel, (cl) => cl.card)
    labels?: CardLabel[];

    @OneToMany(() => CardLog, (cl) => cl.card)
    logs?: CardLog[];

    @OneToMany(() => CardComment, (cc) => cc.card)
    comments?: CardComment[];
}