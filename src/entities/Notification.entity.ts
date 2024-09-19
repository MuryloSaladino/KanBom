import { Column, Entity } from "typeorm";
import BaseEntity from "./BaseEntity.entity";

// @Entity("notifications")
export default class Notification extends BaseEntity {

    @Column({ type: "json" })
    source?: string;
}
