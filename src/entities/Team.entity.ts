import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import User from "./User.entity";
import BaseEntity from "./common/BaseEntity.entity";
import Member from "./Member.entity";

@Entity("teams")
export default class Team extends BaseEntity {

    @Column({ type: "varchar", length: 50 })
    name?: string;

    @Column()
    ownerId?: string;

    @ManyToOne(() => User, { onDelete: "SET NULL", nullable: true })
    @JoinColumn({ name: "ownerId" })
    owner?: User;

    @OneToMany(() => Member, (member) => member.team)
    members?: Member[];
}