import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export default abstract class NoIdBaseEntity {

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt?: Date;
}