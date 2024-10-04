import AppDataSource from "../data-source";
import Participant from "../entities/Participant.entity";
import Project from "../entities/Project.entity";
import AppError from "../errors";
import { TProjectCreation, TProjectUpdate } from "../types/projects.types";

export async function createProjectService(userId:string, payload:TProjectCreation) {
    
    const projectRepo = AppDataSource.getRepository(Project);
    const participantRepo = AppDataSource.getRepository(Participant);

    const projectCreation = projectRepo.create(payload);
    const project = await projectRepo.save(projectCreation);
    
    const creator = participantRepo.create({
        role: "Owner",
        project, 
        userId, 
    });
    await participantRepo.save(creator);

    return project;
}

export async function getProjectsByUserService(userId:string) {
    return AppDataSource.getRepository(Project).find({
        where: { participants: { userId } }
    });
}

export async function updateProjectService(projectId:string, payload:TProjectUpdate) {
    
    const repo = AppDataSource.getRepository(Project);

    const project = await repo.findOneBy({ id: projectId });
    if(!project) throw new AppError("Project not found", 404);

    return await repo.save({ ...project, ...payload })
}

export async function deleteProjectService(projectId:string) {
    const repo = AppDataSource.getRepository(Project);

    const project = await repo.findOneBy({ id: projectId });
    if(!project) throw new AppError("Project not found", 404);

    await repo.softRemove(project);
}
