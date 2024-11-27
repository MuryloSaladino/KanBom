import BaseService from "../common/base.services";
import FileEntity from "../entities/File.entity";

export default class FilesService extends BaseService<FileEntity> {

    public constructor() { super(FileEntity) }
}