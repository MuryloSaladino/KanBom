import BaseService from "../common/base.services";
import UserDetails from "../entities/UserDetails.entity";

export default class UserDetailsService extends BaseService<UserDetails> {

    public constructor() { super(UserDetails) }
}