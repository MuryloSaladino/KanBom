import AppDataSource from "../data-source";
import Participant from "../entities/Participant.entity";
import Project from "../entities/Project.entity";
import User from "../entities/User.entity";
import { stringToRole } from "../enums/Role";
import AppError from "../errors";

export async function createProjectService( name: string, thumbnail: string ) : Promise<Project>
{
    const projectRepo = AppDataSource.getRepository(Project);

    const project = projectRepo.create({ name: name, thumbnail: thumbnail});

    return await projectRepo.save(project); 
}

export async function addUserToProject(userId: string, projectId: string, roleString: string)
{
    const userRepo = AppDataSource.getRepository(User);
    const participantRepo = AppDataSource.getRepository(Participant);
    const projectRepo = AppDataSource.getRepository(Project);

    const user = await userRepo.findOneBy({ id: userId });
    if(!user) throw new AppError("User not found", 404);

    const project = await projectRepo.findOneBy({ id: projectId });
    if(!project) throw new AppError("Project not found", 404);

    const role = stringToRole(roleString);

    const participant = participantRepo.create
    ({ 
        user: user, 
        project: project, 
        role: role 
    })

    return await participantRepo.save(participant);
}