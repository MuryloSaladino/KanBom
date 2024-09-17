import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ type: "varchar", length: 50 })
    username?: string;
}