import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Timestamp } from "typeorm";
import User from "./User.entity";

@Entity("user_details")
export default class UserDetails {

    @PrimaryColumn()
    userId?: string;

    @OneToOne(() => User, { cascade: true })
    @JoinColumn({ name: "userId" })
    user?: User;

    @Column({ type: "timestamp" })
    birthdate?: Timestamp;

    @Column({ type: "varchar", length: 50 })
    firstName?: string;

    @Column({ type: "varchar", length: 150 })
    lastName?: string;

    @Column({ type: "varchar", length: 1024 })
    profilePicture?: string
}