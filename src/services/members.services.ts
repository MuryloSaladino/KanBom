import AppDataSource from "../data-source";
import Workspace from "../entities/Workspace.entity";
import AppError from "../errors";
import Member from "../entities/Member.entity";
import WorkspaceInvite from "../entities/WorkspaceInvite.entity";
import BaseService from "../common/base.services";
import UsersService from "./users.services";
import WorkspacesService from "./workspaces.services";
import NotificationsService from "./notifications.services";

export default class MemebersService extends BaseService<Member> {

    private usersService = new UsersService();
    private workspacesService = new WorkspacesService();
    private notificationsService = new NotificationsService();


    public constructor() { super(Member) }

    async inviteMember(email:string, workspaceId:string) {
        const user = await this.usersService.findOne({ where: { email } });
        const workspace = await this.workspacesService.findById(workspaceId);
        await AppDataSource.getRepository(WorkspaceInvite).save({ user, workspace })
        
        await this.notificationsService.create({ user, content: JSON.stringify({
            message: `You have been invited to work at ${workspace.name}!`,
            actions: [{ title: "accept", url: `/workspaces/${workspace.id}/members` }]
        })})
    }

    async acceptInvite(workspaceId:string, userId:string) {
        const inviteRepo = AppDataSource.getRepository(WorkspaceInvite);
    
        const invite = await inviteRepo.findOneBy({ workspaceId, userId });
        if(!invite) throw new AppError("You don't have an invite to enter that workspace");
    
        await this.repo.upsert({ workspaceId, userId }, ["workspaceId", "userId"]);
        await inviteRepo.remove(invite);
    }

    async deleteByFks(workspaceId:string, userId:string) {

        const workspace = await AppDataSource
            .getRepository(Workspace)
            .findOneBy({ id: workspaceId });
        if(!workspace) throw new AppError("Workspace not found", 404);
    
        if(workspace.ownerId == userId)
            throw new AppError("You can't leave the workspace before passing along the ownership");
    
        await this.repo.softRemove({ workspaceId, userId });
    }
}