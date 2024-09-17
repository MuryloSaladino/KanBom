import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { stringToRole, UserRole } from "../enums/UserRole";

@Entity("users")
export default class User {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ type: "varchar", length: 50 })
    email?: string;

    @Column({ type: "varchar", transformer: {
        to: (value:UserRole) => value.toString(),
        from: (value:string) => stringToRole(value)
    }})
    role?: UserRole;
}