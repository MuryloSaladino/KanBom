import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User.entity";
import BaseEntity from "./BaseEntity.entity";
import Member from "./Member.entity";

@Entity("teams")
export default class Team extends BaseEntity {

    @Column({ type: "varchar", length: 50 })
    name?: string;

    @ManyToOne(() => User, { onDelete: "SET NULL", nullable: true })
    owner?: string;

    @OneToMany(() => Member, (member) => member.team)
    members?: Member[];
}