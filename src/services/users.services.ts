import User from "../entities/User.entity";
import BaseService from "../common/base.services";

export default class UsersService extends BaseService<User> {

    public constructor() { super(User) }
}
