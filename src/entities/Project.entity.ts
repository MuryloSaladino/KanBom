import { Column, Entity } from "typeorm";
import BaseEntity from "./BaseEntity.entity";

@Entity("projects")
export default class Project extends BaseEntity {

    @Column({ type: "varchar", length: 50 })
    name?: string;

    @Column({ type: "varchar", length: 255 })
    thumbnail?: string;
}