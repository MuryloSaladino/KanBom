import { Entity, JoinColumn, ManyToOne, PrimaryColumn, RelationId } from "typeorm";
import User from "./User.entity";
import Team from "./Team.entity";
import NoIdBaseEntity from "./common/NoIdBaseEntity.entity";

@Entity("members")
export default class Member extends NoIdBaseEntity {

    @PrimaryColumn()
    userId?: string;

    @PrimaryColumn()
    teamId?: string;

    @ManyToOne(() => User, (user) => user.memberIn, { cascade: true })
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Team, (team) => team.members, { cascade: true })
    @JoinColumn({ name: "teamId" })
    team?: Team;
}