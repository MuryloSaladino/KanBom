import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User.entity";
import BaseEntity from "./BaseEntity.entity";

@Entity("teams")
export default class Team extends BaseEntity {

    @Column({ type: "varchar", length: 50 })
    name?: string;

    @ManyToOne(() => User, { onDelete: "SET NULL", nullable: true })
    owner?: string;
}