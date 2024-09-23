import AppDataSource from "../data-source";
import Member from "../entities/Member.entity";
import Team from "../entities/Team.entity";
import User from "../entities/User.entity";
import AppError from "../errors";
import { TTeamCreation, TTeamUpdate } from "../types/teams.types";

export async function createTeamService(userId:string, payload:TTeamCreation): Promise<Team> {
    
    const teamRepo = AppDataSource.getRepository(Team);
    const userRepo = AppDataSource.getRepository(User);

    const owner = await userRepo.findOneBy({ id: userId });
    if(!owner) throw new AppError("User not found", 404);

    const team = teamRepo.create({ ...payload, owner });
    return await teamRepo.save(team);
}

export async function updateTeamService(teamId:string, payload:TTeamUpdate) {

    const repo = AppDataSource.getRepository(Team);

    const team = await repo.findOneBy({ id: teamId });
    if(!team) throw new AppError("Team not found", 404);

    return await repo.save({ ...team, ...payload });
}

export async function getTeamMembersService(teamId:string) {
    
    const repo = AppDataSource.getRepository(Team);

    const team = await repo.findOne({ where: { id: teamId }, relations: { members: true } });
    if(!team) throw new AppError("Team not found", 404);

    return await AppDataSource
        .getRepository(User)
        .createQueryBuilder()
        .select()
        .innerJoin(Member, "members")
        .innerJoin(Team, "teams")
        .where("teams.id = :teamId", { teamId })
        .getMany();
}

export async function getUserTeamsService(userId:string) {
    
}
