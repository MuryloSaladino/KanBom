import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: "varchar", length: 1024, nullable: true, default: null })
    profilePicture?: string | null;
}