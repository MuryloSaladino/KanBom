import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import User from "./User.entity";
import BaseEntity from "./common/BaseEntity.entity";
import Member from "./Member.entity";

@Entity("teams")
export default class Team extends BaseEntity {

    @Column({ type: "varchar", length: 50 })
    name?: string;

    @ManyToOne(() => User, { onDelete: "SET NULL", nullable: true })
    owner?: User;

    @RelationId((team:Team) => team.owner)
    ownerId?: string;

    @OneToMany(() => Member, (member) => member.team)
    members?: Member[];
}