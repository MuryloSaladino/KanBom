import AppDataSource from "../data-source";
import BoardRole from "../entities/BoardRole.entity";
import Board from "../entities/Board.entity";
import AppError from "../errors";
import { IBoardRolePayload } from "../types/boards.types";
import BaseService from "../common/base.services";

export default class BoardsService extends BaseService<Board> {

    private roleRepo = AppDataSource.getRepository(BoardRole)

    public constructor() { super(Board) }


    public async createRole(boardId:string, userId:string, payload:IBoardRolePayload) {
        return await this.roleRepo.save({ userId, boardId, ...payload })
    }

    public async createRoleIfNull(boardId:string, userId:string, payload:IBoardRolePayload = { role: "Reader" }) {
        const role = await this.roleRepo.findOneBy({ userId, boardId }) 
        return role || await this.roleRepo.save({ userId, boardId, ...payload })
    }

    public async updateRole(boardId:string, userId:string, payload:IBoardRolePayload) {
        const boardRole = await this.roleRepo.findOneBy({ userId, boardId });
        if(!boardRole) throw new AppError("User is not in that board", 400);

        return await this.roleRepo.save({ ...boardRole, ...payload })
    }
}
