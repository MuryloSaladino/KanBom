import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import UserDetails from "./UserDetails.entity";
import { hashSync } from "bcryptjs";
import Participant from "./Participant.entity";
import Member from "./Member.entity";
import Notification from "./Notification.entity";

@Entity("users")
export default class User extends BaseEntity {

    @Column({ type: "varchar", length: 50, unique: true })
    email?: string;

    @Column({ type: "varchar", length: 255 })
    password?: string;

    @OneToOne(() => UserDetails, { nullable: false, cascade: true })
    @JoinColumn()
    details?: UserDetails;

    @OneToMany(() => Participant, (participation) => participation.user)
    participations?: Participant[];

    @OneToMany(() => Member, (member) => member.user)
    memberIn?: Member[];

    @OneToMany(() => Notification, (notification) => notification.user)
    notifications?: Member[];

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password!)
    }

    public hideFields(): User {
        return { ...this, password: undefined }
    }
}