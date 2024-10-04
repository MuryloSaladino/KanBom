import AppDataSource from "../data-source";
import Notification from "../entities/Notification.entity";
import Participant from "../entities/Participant.entity";
import Project from "../entities/Project.entity";
import ProjectInvite from "../entities/ProjectInvite.entity";
import User from "../entities/User.entity";
import { Role, stringToRole } from "../enums/Role";
import AppError from "../errors";
import { TInviteToProject, TParticipantUpdate } from "../types/projects.types";

export async function inviteParticipantService(projectId:string, email:string, { role }:TInviteToProject) {
    const userRepo = AppDataSource.getRepository(User);
    const projectRepo = AppDataSource.getRepository(Project);
    const inviteRepo = AppDataSource.getRepository(ProjectInvite)

    const user = await userRepo.findOneBy({ email });
    if(!user) throw new AppError("User not found", 404);

    const project = await projectRepo.findOneBy({ id: projectId });
    if(!project) throw new AppError("Team not found", 404);

    await inviteRepo.save({ user, project, role: stringToRole(role) })
    await AppDataSource
        .getRepository(Notification)
        .save({ user, content: JSON.stringify({
            message: `You have been invited to work in ${project.name} project!`,
            actions: [{ title: "accept", url: `/participants/invite/${project.id}` }]
    })})
}

export async function acceptProjectInvitationService(projectId:string, userId:string) {

    const inviteRepo = AppDataSource.getRepository(ProjectInvite);
    const participantRepo = AppDataSource.getRepository(Participant);

    const invite = await inviteRepo.findOneBy({ userId, projectId });
    if(!invite) throw new AppError("You don't have an invite to enter that project")

    await participantRepo.save(invite);
    await inviteRepo.remove(invite);
}

export async function getProjectParticipantsService(projectId:string) {
    return await AppDataSource.getRepository(Participant).find({
        where: { projectId },
        relations: { user: { details: true } }
    });
}

export async function updateParticipantService(projectId:string, userId:string, payload:TParticipantUpdate) {
    const repo = AppDataSource.getRepository(Participant)
    
    const participant = await repo.findOneBy({ userId, projectId });
    if(!participant) throw new AppError("Participant not found", 404);

    if(payload.role) {
        participant.role = stringToRole(payload.role)
    }
    return await repo.save(participant)
}

export async function removeParticipantService(projectId:string, userId:string) {
    const repo = AppDataSource.getRepository(Participant)
    
    const participant = await repo.findOneBy({ userId, projectId });
    if(!participant) throw new AppError("Participant not found", 404);
    
    if(participant.role == Role.OWNER) {
        const ownerCount = await repo.countBy({ projectId, role: Role.OWNER })
        if(ownerCount == 1)
            throw new AppError("You must pass along the ownership before leaving the team");
    }
    await repo.softDelete(participant)
}
