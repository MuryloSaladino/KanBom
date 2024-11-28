import User from "../entities/User.entity";
import BaseService from "../common/base.services";
import FilesService from "./files.services";
import AppError from "../errors";

export default class UsersService extends BaseService<User> {

    private fileService = new FilesService()

    public constructor() { super(User) }

    public async updatePhotoId(userId: string, fileId: string) {
        const user = await this.repo.findOne({ where: { id: userId }, relations: { details: true } })
        if(!user) throw new AppError("User not found", 404)

        const file = await this.fileService.findById(fileId)
        user.details!.picture = file
        return await this.repo.save(user)
    }
}
