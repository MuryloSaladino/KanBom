import AppDataSource from "../data-source";
import Participant from "../entities/Participant.entity";
import Project from "../entities/Project.entity";
import User from "../entities/User.entity";
import { stringToRole } from "../enums/Role";
import AppError from "../errors";

export async function createProjectService(name: string, thumbnail: string): Promise<Project> {
    const projectRepo = AppDataSource.getRepository(Project);

    const project = projectRepo.create({ name: name, thumbnail: thumbnail });

    return await projectRepo.save(project);
}

export async function addUserToProjectService(userId: string, projectId: string, roleString: string) {
    const userRepo = AppDataSource.getRepository(User);
    const participantRepo = AppDataSource.getRepository(Participant);
    const projectRepo = AppDataSource.getRepository(Project);

    const user = await userRepo.findOneBy({ id: userId });
    if (!user) throw new AppError("User not found", 404);

    const project = await projectRepo.findOneBy({ id: projectId });
    if (!project) throw new AppError("Project not found", 404);

    const role = stringToRole(roleString);

    const participant = participantRepo.create
        ({
            user: user,
            project: project,
            role: role
        })

    return await participantRepo.save(participant);
}

export async function deleteProjectService(id: string): Promise<void> {
    const repo = AppDataSource.getRepository(Project);

    if (!await repo.exists({ where: { id } }))
        throw new AppError("Project not found", 404);

    //verificar token:
    /*
        - pegar o id do usuário (req.locals.userId)
        - pegar o id do projeto atual - recebe na função
        - Procurar no projeto participantes com esse id
        - Verificar se o Role é "Owner"
            - não tem participante => 403 - unauthorized
            - não é owner => 403 => unauthorized
        - Soft Delete 
    */
    await repo.softDelete({ id });
}