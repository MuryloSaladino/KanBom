import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import UserDetails from "./UserDetails.entity";
import { hashSync } from "bcryptjs";

@Entity("users")
export default class User extends BaseEntity {

    @Column({ type: "varchar", length: 50 })
    email?: string;

    @Column({ type: "varchar", length: 255, select: false })
    password?: string;

    @OneToOne(() => UserDetails, { nullable: false, cascade: true })
    @JoinColumn()
    details?: UserDetails;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password!)
    }
}