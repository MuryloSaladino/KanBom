import { Entity, ManyToOne, RelationId } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import User from "./User.entity";
import Team from "./Team.entity";

@Entity("members")
export default class Member extends BaseEntity {

    @ManyToOne(() => User, (user) => user.isMemberIn, { cascade: true })
    user?: User;

    @RelationId((member:Member) => member.user)
    userId?: string;

    @ManyToOne(() => Team, (team) => team.members, { cascade: true })
    team?: Team;

    @RelationId((member:Member) => member.team)
    teamId?: string;
}