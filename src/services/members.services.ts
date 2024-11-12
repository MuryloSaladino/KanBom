import AppDataSource from "../data-source";
import Workspace from "../entities/Workspace.entity";
import User from "../entities/User.entity";
import AppError from "../errors";
import Notification from "../entities/Notification.entity";
import Member from "../entities/Member.entity";
import WorkspaceInvite from "../entities/WorkspaceInvite.entity";
import BaseService from "../common/base.services";

export async function inviteMemberService(email:string, workspaceId:string) {
    const userRepo = AppDataSource.getRepository(User);
    const workspaceRepo = AppDataSource.getRepository(Workspace);
    const inviteRepo = AppDataSource.getRepository(WorkspaceInvite);

    const user = await userRepo.findOneBy({ email });
    if(!user) throw new AppError("User not found", 404);

    const workspace = await workspaceRepo.findOneBy({ id: workspaceId });
    if(!workspace) throw new AppError("Workspace not found", 404);

    await inviteRepo.save({ user, workspace })
    await AppDataSource
        .getRepository(Notification)
        .save({ user, content: JSON.stringify({
            message: `You have been invited to work at ${workspace.name}!`,
            actions: [{ title: "accept", url: `/workspaces/${workspace.id}/members` }]
    })})
}

export async function acceptWorkspaceInviteService(workspaceId:string, userId:string) {
    const inviteRepo = AppDataSource.getRepository(WorkspaceInvite);
    const memberRepo = AppDataSource.getRepository(Member);

    const invite = await inviteRepo.findOneBy({ workspaceId, userId });
    if(!invite) throw new AppError("You don't have an invite to enter that workspace");

    await memberRepo.upsert({ workspaceId, userId }, ["workspaceId", "userId"]);
    await inviteRepo.remove(invite);
}

export async function getWorkspaceMembersService(workspaceId:string) {
    return await AppDataSource.getRepository(User).find({
        where: { memberIn: { workspaceId } },
        relations: { details: true }
    });
}

export async function removeMemberService(workspaceId:string, userId:string) {

    const workspace = await AppDataSource
        .getRepository(Workspace)
        .findOneBy({ id: workspaceId });
    if(!workspace) throw new AppError("Workspace not found", 404);

    if(workspace.ownerId == userId)
        throw new AppError("You can't leave the workspace before passing along the ownership");

    await AppDataSource
        .getRepository(Member)
        .softRemove({ workspaceId, userId });
}

export default class MemebersService extends BaseService<Member> {

    public constructor() { super(Member) }
}