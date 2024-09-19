import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import UserDetails from "./UserDetails.entity";

@Entity("users")
export default class User extends BaseEntity {

    @Column({ type: "varchar", length: 50 })
    email?: string;

    @Column({ type: "varchar", length: 255 })
    password?: string;

    @OneToOne(() => UserDetails, { nullable: false })
    @JoinColumn()
    details?: UserDetails;
}