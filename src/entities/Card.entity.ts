import { Column, Entity, ManyToOne } from "typeorm";
import CardList from "./CardList.entity";
import BaseEntity from "./common/BaseEntity.entity";

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
}