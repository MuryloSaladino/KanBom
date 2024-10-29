import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import CardList from "./CardList.entity";
import BaseEntity from "./common/BaseEntity.entity";
import CardParticipations from "./CardParticipation.entity";

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

    @OneToMany(() => CardParticipations, (cd) => cd.card)
    participations?: CardParticipations[];
}