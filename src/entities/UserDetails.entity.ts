import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import FileEntity from "./File.entity";

@Entity("user_details")
export default class UserDetails {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ type: "date" })
    birthdate?: string;

    @Column({ type: "varchar", length: 50 })
    firstName?: string;

    @Column({ type: "varchar", length: 150 })
    lastName?: string;

    @OneToOne(() => FileEntity, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn()
    picture?: FileEntity;
}