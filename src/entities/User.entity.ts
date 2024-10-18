import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import BaseEntity from "./common/BaseEntity.entity";
import UserDetails from "./UserDetails.entity";
import { hashSync } from "bcryptjs";
import Member from "./Member.entity";
import Notification from "./Notification.entity";

@Entity("users")
export default class User extends BaseEntity {

    @Column({ type: "varchar", length: 50, unique: true })
    email?: string;

    @Column({ type: "varchar", length: 255, select: false })
    password?: string;

    @OneToOne(() => UserDetails, { nullable: false, cascade: true, onDelete: "CASCADE" })
    @JoinColumn()
    details?: UserDetails;

    @OneToMany(() => Member, (m) => m.user)
    memberIn?: Member[];

    @OneToMany(() => Notification, (n) => n.user)
    notifications?: Member[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = hashSync(this.password!)
    }
}