import { Column, Entity } from "typeorm";

@Entity("projects")
export default class Project {

    @Column({ type: "varchar", length: 50 })
    name?: string;

    @Column({ type: "varchar", length: 255 })
    thumbnail?: string;
}