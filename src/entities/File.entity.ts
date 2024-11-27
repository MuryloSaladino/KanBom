import { Column, Entity } from "typeorm";
import BaseEntity from "../common/BaseEntity.entity";

@Entity("files")
export default class FileEntity extends BaseEntity {

    @Column()
    url?: string;

    @Column()
    publicId?: string;
}