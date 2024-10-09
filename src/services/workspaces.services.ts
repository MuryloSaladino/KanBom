import AppDataSource from "../data-source";
import Member from "../entities/Member.entity";
import Workspace from "../entities/Workspace.entity";
import User from "../entities/User.entity";
import AppError from "../errors";
import { TWorkspaceCreation, TWorkspaceUpdate } from "../types/workspaces.types";

export async function createWorkspaceService(userId:string, payload:TWorkspaceCreation) {
    
    const workspaceRepo = AppDataSource.getRepository(Workspace);
    const userRepo = AppDataSource.getRepository(User);
    const memberRepo = AppDataSource.getRepository(Member);

    const owner = await userRepo.findOneBy({ id: userId });
    if(!owner) throw new AppError("User not found", 404);

    const workspaceCreation = workspaceRepo.create({ ...payload, owner });
    const workspace = await workspaceRepo.save(workspaceCreation);

    const firstMember = memberRepo.create({ user: owner, team: workspace });
    await memberRepo.save(firstMember);

    return workspace;
}

export async function getWorkspaceService(workspaceId:string) {

    const repo = AppDataSource.getRepository(Workspace);

    const found = await repo.findOne({
        where: { id: workspaceId },
        relations: { members: { user: { details: true } } }
    });
    if(!found) throw new AppError("Workspace not found", 404);
    
    return found;
}

export async function getWorkspacesByUserService(userId:string) {
    return await AppDataSource.getRepository(Workspace).find({
        where: { members: { userId } },
        relations: { boards: true }
    })
}

export async function updateWorkspaceService(workspaceId:string, payload:TWorkspaceUpdate) {

    const repo = AppDataSource.getRepository(Workspace);

    const workspace = await repo.findOneBy({ id: workspaceId });
    if(!workspace) throw new AppError("Team not found", 404);

    return await repo.save({ ...workspace, ...payload });
}

export async function deleteWorkspaceService(workspaceId:string) {
    
    const repo = AppDataSource.getRepository(Workspace);

    const workspace = await repo.findOneBy({ id: workspaceId });
    if(!workspace) throw new AppError("Team not found", 404);

    await repo.softRemove(workspace);
}
