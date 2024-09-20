import { sign } from "jsonwebtoken";
import AppDataSource from "../data-source";
import Team from "../entities/Team.entity";
import User from "../entities/User.entity";
import AppError from "../errors";
import { TTeamCreation } from "../types/teams.types";
import Notification from "../entities/Notification.entity";

export async function createTeamService(userId:string, payload:TTeamCreation): Promise<Team> {
    
    const teamRepo = AppDataSource.getRepository(Team);
    const userRepo = AppDataSource.getRepository(User);

    const owner = await userRepo.findOneBy({ id: userId });
    if(!owner) throw new AppError("User not found", 404);

    const team = teamRepo.create({ ...payload, owner });
    return await teamRepo.save(team);
}

export async function addToTeamService(userId:string, teamId:string) {
    
    const notificationRepo = AppDataSource.getRepository(Notification);
    const userRepo = AppDataSource.getRepository(User);
    const teamRepo = AppDataSource.getRepository(Team);

    const user = await userRepo.findOneBy({ id: userId });
    if(!user) throw new AppError("User not found", 404);

    const team = await teamRepo.findOneBy({ id: teamId });
    if(!team) throw new AppError("Team not found", 404);

    const token = sign(
        { userId, teamId },
        String(process.env.SECRET_KEY),
        {  }
    )

    const notification = notificationRepo.create({
        action: `/api/teams/invite/${token}`,
        content: `You have been invited to work with ${team.name}!`
    })

    await notificationRepo.save(notification);
}
