import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./common/BaseEntity.entity";
import User from "./User.entity";

@Entity("notifications")
export default class Notification extends BaseEntity {

    @Column({ type: "text" })
    content?: string;

    @Column()
    userId?: string;

    @ManyToOne(() => User, (user) => user.notifications)
    @JoinColumn({ name: "userId" })    
    user?: User;
}
