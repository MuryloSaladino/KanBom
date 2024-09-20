import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import UserDetails from "./UserDetails.entity";
import { hashSync } from "bcryptjs";
import Participant from "./Participant.entity";
import Member from "./Member.entity";

@Entity("users")
export default class User extends BaseEntity {

    @Column({ type: "varchar", length: 50 })
    email?: string;

    @Column({ type: "varchar", length: 255, select: false })
    password?: string;

    @OneToOne(() => UserDetails, { nullable: false, cascade: true })
    @JoinColumn()
    details?: UserDetails;

    @OneToMany(() => Participant, (participation) => participation.user)
    participations?: Participant[];

    @OneToMany(() => Member, (member) => member.user)
    isMemberIn?: Member[];

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password!)
    }
}