import { Column, Entity, OneToMany } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import Participant from "./Participant.entity";

@Entity("projects")
export default class Project extends BaseEntity {

    @Column({ type: "varchar", length: 50 })
    name?: string;

    @Column({ type: "varchar", length: 255 })
    thumbnail?: string;

    @OneToMany(() => Participant, (participant) => participant.project)
    participants?: Participant[];
}