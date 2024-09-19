import { Entity, ManyToOne } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import User from "./User.entity";
import Team from "./Team.entity";

@Entity("members")
export default class Member extends BaseEntity {

    @ManyToOne(() => User, { cascade: true })
    user?: User;

    @ManyToOne(() => Team, { cascade: true })
    team?: Team
}