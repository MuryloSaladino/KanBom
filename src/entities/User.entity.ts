import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity.entity";

@Entity("users")
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    userId?: string;

    @Column({ type: "varchar", length: 50 })
    email?: string;

    @Column({ type: "varchar", length: 255 })
    password?: string;
}