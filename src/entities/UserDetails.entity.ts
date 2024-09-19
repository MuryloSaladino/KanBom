import { Column, Entity } from "typeorm";
import BaseEntity from "./BaseEntity.entity";

@Entity("user_details")
export default class UserDetails extends BaseEntity {

    @Column({ type: "datetime" })
    birthdate?: string;

    @Column({ type: "varchar", length: 50 })
    firstName?: string;

    @Column({ type: "varchar", length: 150 })
    lastName?: string;

    @Column({ type: "varchar", length: 1024, nullable: false })
    profilePicture?: string | null;
}