import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import User from "./User.entity";

@Entity("notifications")
export default class Notification extends BaseEntity {

    @Column({ type: "nvarchar", length: "MAX" })
    source?: string;

    @ManyToOne(() => User, (user) => user.notifications)
    user?: User;
}
