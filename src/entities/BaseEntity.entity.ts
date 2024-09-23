import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

export default abstract class BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt?: Date;
}