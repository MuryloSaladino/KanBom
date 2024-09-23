import Team from "../entities/Team.entity";

export type TTeamCreation = Pick<Team, "name">;

export type TTeamUpdate = Partial<TTeamCreation>;
