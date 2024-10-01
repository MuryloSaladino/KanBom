import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "./common/BaseEntity.entity";
import User from "./User.entity";

@Entity("notifications")
export default class Notification extends BaseEntity {

    @Column({ type: "text" })
    content?: string;

    @ManyToOne(() => User, (user) => user.notifications)
    user?: User;
}
