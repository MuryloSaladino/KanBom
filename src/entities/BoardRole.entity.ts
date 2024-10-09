import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User.entity";
import Board from "./Board.entity";
import NoIdBaseEntity from "./common/NoIdBaseEntity.entity";
import { TBoardRole } from "../types/boards.types";

@Entity("board_roles")
export default class BoardRole extends NoIdBaseEntity {

    @Column({ type: "varchar", length: 20 })
    role?: TBoardRole;

    @PrimaryColumn()
    userId?: string;

    @PrimaryColumn()
    boardId?: string;
    
    @ManyToOne(() => User, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Board, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "boardId" })
    board?: Board;

}