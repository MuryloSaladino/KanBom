import AppDataSource from "../data-source";
import BoardRole from "../entities/BoardRole.entity";
import Board from "../entities/Board.entity";
import AppError from "../errors";
import { TParticipantUpdate, TProjectCreation, TProjectUpdate } from "../types/projects.types";

export async function createBoardService(userId:string, payload:TProjectCreation) {
    
    const boardRepo = AppDataSource.getRepository(Board);
    const roleRepo = AppDataSource.getRepository(BoardRole);

    const boardCreation = boardRepo.create(payload);
    const board = await boardRepo.save(boardCreation);
    
    const creatorRole = roleRepo.create({ board, userId, role: "Owner" });
    await roleRepo.save(creatorRole);

    return board;
}

export async function updateBoardService(boardId:string, payload:TProjectUpdate) {
    
    const repo = AppDataSource.getRepository(Board);

    const board = await repo.findOneBy({ id: boardId });
    if(!board) throw new AppError("Board not found", 404);

    return await repo.save({ ...board, ...payload })
}

export async function deleteBoardService(projectId:string) {
    const repo = AppDataSource.getRepository(Board);

    const board = await repo.findOneBy({ id: projectId });
    if(!board) throw new AppError("Board not found", 404);

    await repo.softRemove(board);
}

export async function updateBoardRoleService(boardId:string, userId:string, payload:TParticipantUpdate) {
    const repo = AppDataSource.getRepository(BoardRole)
    
    const boardRole = await repo.findOneBy({ userId, boardId });
    if(!boardRole) throw new AppError("User is not in that board", 400);

    return await repo.save({ ...boardRole, ...payload })
}
