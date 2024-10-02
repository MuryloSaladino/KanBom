import AppDataSource from "../data-source";
import Notification from "../entities/Notification.entity";
import Participant from "../entities/Participant.entity";
import Project from "../entities/Project.entity";
import ProjectInvite from "../entities/ProjectInvite.entity";
import User from "../entities/User.entity";
import { stringToRole } from "../enums/Role";
import AppError from "../errors";
import { TInviteToProject } from "../types/projects.types";

export async function inviteToProjectService(projectId:string, email:string, { role }:TInviteToProject) {
    
    const notificationRepo = AppDataSource.getRepository(Notification);
    const userRepo = AppDataSource.getRepository(User);
    const projectRepo = AppDataSource.getRepository(Project);
    const inviteRepo = AppDataSource.getRepository(ProjectInvite)

    const user = await userRepo.findOneBy({ email });
    if(!user) throw new AppError("User not found", 404);

    const project = await projectRepo.findOneBy({ id: projectId });
    if(!project) throw new AppError("Team not found", 404);

    await inviteRepo.save({ user, project, role: stringToRole(role) })
    await notificationRepo.save({ user, content: JSON.stringify({
        message: `You have been invited to work in ${project.name} project!`,
        actions: [{ title: "accept", url: `/participants/invite/${project.id}` }]
    })})
}

export async function acceptProjectInvitationService(projectId:string, userId:string) {

    const inviteRepo = AppDataSource.getRepository(ProjectInvite);
    const participantRepo = AppDataSource.getRepository(Participant);

    const invite = await inviteRepo
        .createQueryBuilder("i")
        .where("i.userId = :userId", { userId })
        .andWhere("i.projectId = :projectId", { projectId })
        .getOne()
    if(!invite) 
        throw new AppError("You don't have an invite to enter that project")

    await participantRepo.save(invite)
    await inviteRepo.delete({ ...invite })
}

export async function getProjectParticipantsService(projectId:string) {
    console.log("p: ", projectId);
    
    return await AppDataSource
        .getRepository(Participant)
        .createQueryBuilder("pa")
        .innerJoinAndSelect("projects", "p", "pa.projectId = p.id")
        .innerJoinAndSelect("users", "u", "pa.userId = u.id")
        .innerJoinAndSelect("user_details", "ud", "ud.id = u.detailsId")
        .where("p.id = :projectId", { projectId })
        .select("pa.role", "role")
        .addSelect("u.email", "email")
        .addSelect("ud.profilePicture", "profilePicture")
        .getRawMany()
}
