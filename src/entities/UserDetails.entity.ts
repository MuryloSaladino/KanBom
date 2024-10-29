import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import User from "./User.entity";

@Entity("user_details")
export default class UserDetails {

    @PrimaryColumn()
    userId?: string;
    
    @OneToOne(() => User, (u) => u.details)
    @JoinColumn({ name: "userId" })
    user?: User;

    @Column({ type: "date" })
    birthdate?: string;

    @Column({ type: "varchar", length: 50 })
    firstName?: string;

    @Column({ type: "varchar", length: 150 })
    lastName?: string;

    @Column({ type: "varchar", length: 1024, nullable: true, default: null })
    profilePicture?: string | null;
}