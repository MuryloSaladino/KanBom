import AppDataSource from "../data-source";
import Participant from "../entities/Participant.entity";
import Project from "../entities/Project.entity";
import User from "../entities/User.entity";
import { Role } from "../enums/Role";
import AppError from "../errors";
import { TProjectCreation } from "../types/projects.types";

export async function createProjectService(userId:string, payload:TProjectCreation) {
    
    const projectRepo = AppDataSource.getRepository(Project);
    const userRepo = AppDataSource.getRepository(User);
    const participantRepo = AppDataSource.getRepository(Participant);

    const user = await userRepo.findOneBy({ id: userId });
    if(!user) throw new AppError("User not found", 404);

    const projectCreation = projectRepo.create(payload);
    const project = await projectRepo.save(projectCreation);
    
    const firstParticipant = participantRepo.create({
        project, user, role: Role.OWNER
    });
    await participantRepo.save(firstParticipant);

    return project;
}

export async function getProjectsByUserService(userId:string) {
    const query = await AppDataSource.getRepository(Project)
        .createQueryBuilder("p")
        .innerJoin(User, "u")
        .innerJoinAndSelect("participants", "pa")
        .where("u.id = :userId", { userId })
        .select("p.name", "name")
        .addSelect("p.thumbnail", "thumbnail")
        .addSelect("pa.role", "role")
        .getRawMany()
    return query;
}
