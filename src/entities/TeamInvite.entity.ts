import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User.entity";
import Team from "./Team.entity";

@Entity("team_invites")
export default class TeamInvite {
   
    @PrimaryColumn()
    userId?: string;

    @PrimaryColumn()
    teamId?: string;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Team, { onDelete: "CASCADE" })
    @JoinColumn({ name: "teamId" })
    team?: Team;
}