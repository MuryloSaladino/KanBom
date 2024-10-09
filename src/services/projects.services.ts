import AppDataSource from "../data-source";
import BoardRole from "../entities/BoardRole.entity";
import Board from "../entities/Board.entity";
import AppError from "../errors";
import { TProjectCreation, TProjectUpdate } from "../types/projects.types";

export async function createProjectService(userId:string, payload:TProjectCreation) {
    
    const projectRepo = AppDataSource.getRepository(Board);
    const participantRepo = AppDataSource.getRepository(BoardRole);

    const projectCreation = projectRepo.create(payload);
    const project = await projectRepo.save(projectCreation);
    
    const creator = participantRepo.create({
        role: "Owner",
        board: project, 
        userId, 
    });
    await participantRepo.save(creator);

    return project;
}

export async function getProjectsByUserService(userId:string) {
    return AppDataSource.getRepository(Board).find({
        where: { participants: { userId } }
    });
}

export async function updateProjectService(projectId:string, payload:TProjectUpdate) {
    
    const repo = AppDataSource.getRepository(Board);

    const project = await repo.findOneBy({ id: projectId });
    if(!project) throw new AppError("Project not found", 404);

    return await repo.save({ ...project, ...payload })
}

export async function deleteProjectService(projectId:string) {
    const repo = AppDataSource.getRepository(Board);

    const project = await repo.findOneBy({ id: projectId });
    if(!project) throw new AppError("Project not found", 404);

    await repo.softRemove(project);
}
