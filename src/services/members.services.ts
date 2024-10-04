import AppDataSource from "../data-source";
import Team from "../entities/Team.entity";
import User from "../entities/User.entity";
import AppError from "../errors";
import Notification from "../entities/Notification.entity";
import Member from "../entities/Member.entity";
import TeamInvite from "../entities/TeamInvite.entity";

export async function inviteMemberService(email:string, teamId:string) {
    const userRepo = AppDataSource.getRepository(User);
    const teamRepo = AppDataSource.getRepository(Team);
    const inviteRepo = AppDataSource.getRepository(TeamInvite);

    const user = await userRepo.findOneBy({ email });
    if(!user) throw new AppError("User not found", 404);

    const team = await teamRepo.findOneBy({ id: teamId });
    if(!team) throw new AppError("Team not found", 404);

    await inviteRepo.save({ user, team })
    await AppDataSource
        .getRepository(Notification)
        .save({ user, content: JSON.stringify({
            message: `You have been invited to work with ${team.name}!`,
            actions: [{ title: "accept", url: `/members/invite/${team.id}` }]
    })})
}

export async function acceptTeamInvitationService(teamId:string, userId:string) {
    const inviteRepo = AppDataSource.getRepository(TeamInvite);
    const memberRepo = AppDataSource.getRepository(Member);

    const invite = await inviteRepo.findOneBy({ teamId, userId });
    if(!invite) throw new AppError("You don't have an invite to enter that team");

    await memberRepo.upsert({ teamId, userId }, ["teamId", "userId"]);
    await inviteRepo.remove(invite);
}

export async function getTeamMembersService(teamId:string) {
    return await AppDataSource.getRepository(User).find({
        where: { memberIn: { teamId } },
        relations: { details: true }
    });
}

export async function removeMemberService(teamId:string, userId:string) {

    const team = await AppDataSource
        .getRepository(Team)
        .findOneBy({ id: teamId });
    if(!team) throw new AppError("Team not found", 404);

    if(team.ownerId == userId)
        throw new AppError("You can't leave the team before passing along the ownership");

    await AppDataSource
        .getRepository(Member)
        .softRemove({ teamId, userId });
}
