import { Entity, ManyToOne } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import User from "./User.entity";
import Team from "./Team.entity";

@Entity("team_invite")
export default class TeamInvite extends BaseEntity {

    @ManyToOne(() => User)
    user?: User;

    @ManyToOne(() => Team)
    team?: Team;
}