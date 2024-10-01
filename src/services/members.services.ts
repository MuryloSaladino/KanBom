import { sign, verify } from "jsonwebtoken";
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
    await notificationRepo.save({ user, content: `You have been invited to work with ${team.name}!` })
}

export async function acceptTeamInvitationService(token:string) {
    verify(
        token,
        String(process.env.SECRET_KEY),
        async (err:any, decoded:any) => {
            if(err) throw new AppError(err.message, 401);
            
            const { teamId, email } = decoded;
            if(!teamId || !email) throw new AppError("Invalid jwt", 401);

            const userRepo = AppDataSource.getRepository(User);
            const teamRepo = AppDataSource.getRepository(Team);

            const user = await userRepo.findOneBy({ email });
            const team = await teamRepo.findOneBy({ id: teamId });
            if(!user || !team) throw new AppError("That invitation is not valid anymore.");

            const memberRepo = AppDataSource.getRepository(Member);
            await memberRepo.save({ team, user });
        }
    )
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
