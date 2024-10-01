import AppDataSource from "../data-source";
import Team from "../entities/Team.entity";
import User from "../entities/User.entity";
import AppError from "../errors";
import Notification from "../entities/Notification.entity";
import Member from "../entities/Member.entity";
import TeamInvite from "../entities/TeamInvite.entity";

export async function inviteMemberService(email:string, teamId:string) {
    
    const notificationRepo = AppDataSource.getRepository(Notification);
    const userRepo = AppDataSource.getRepository(User);
    const teamRepo = AppDataSource.getRepository(Team);
    const inviteRepo = AppDataSource.getRepository(TeamInvite)

    const user = await userRepo.findOneBy({ email });
    if(!user) throw new AppError("User not found", 404);

    const team = await teamRepo.findOneBy({ id: teamId });
    if(!team) throw new AppError("Team not found", 404);

    await inviteRepo.save({ user, team })
    await notificationRepo.save({ user, content: JSON.stringify({
        message: `You have been invited to work with ${team.name}!`,
        actions: [{ title: "accept", url: `/members/invite/${team.id}` }]
    })})
}

export async function acceptTeamInvitationService(teamId:string, userId:string) {

    const query = await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(TeamInvite)
        .where("userId = :userId", { userId })    
        .andWhere("teamId = :teamId", { teamId })
        .execute()
    if(query.affected && query.affected == 0) 
        throw new AppError("You don't have an invite to enter that team")

    await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Member)
        .values([{ user: userId, team: teamId }])
        .orIgnore()
        .execute();
}

export async function getTeamMembersService(teamId:string) {
    
    const repo = AppDataSource.getRepository(Team);

    const team = await repo.findOne({ where: { id: teamId }, relations: { members: true } });
    if(!team) throw new AppError("Team not found", 404);

    const query = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("u")
        .leftJoinAndSelect("u.details", "ud")
        .innerJoin("members", "m", "m.userId = u.id")
        .innerJoin("teams", "t", "m.teamId = t.id")
        .where("t.id = :teamId", { teamId })
        .getMany();
    return query.map(user => user.hideFields())
}

export async function removeMemberService(teamId:string, userId:string) {

    const teamRepo = AppDataSource.getRepository(Team);

    const team = await teamRepo.findOneBy({ id: teamId });
    if(!team) throw new AppError("Team not found", 404);

    if(team.ownerId == userId)
        throw new AppError("You can't leave the team before passing along the ownership");

    await AppDataSource.getRepository(Member)
        .createQueryBuilder("t")
        .where("m.teamId = :teamId", { teamId })
        .andWhere("m.userId = :userId", { userId })
        .delete()
        .execute();
}
