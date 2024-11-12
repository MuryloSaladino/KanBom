import AppDataSource from "../data-source";
import BoardRole from "../entities/BoardRole.entity";
import Board from "../entities/Board.entity";
import AppError from "../errors";
import { IBoardRolePayload } from "../types/boards.types";
import BaseService from "../common/base.services";

export async function updateBoardRoleService(boardId:string, userId:string, payload:IBoardRolePayload) {
    const repo = AppDataSource.getRepository(BoardRole)
    
    const boardRole = await repo.findOneBy({ userId, boardId });
    if(!boardRole) throw new AppError("User is not in that board", 400);

    return await repo.save({ ...boardRole, ...payload })
}

export default class BoardsService extends BaseService<Board> {

    public constructor() { super(Board) }

    public async updateRole(boardId:string, userId:string, payload:IBoardRolePayload) {

    }

}
