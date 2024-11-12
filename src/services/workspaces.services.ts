import Workspace from "../entities/Workspace.entity";
import BaseService from "../common/base.services";

export default class WorkspacesService extends BaseService<Workspace> {

    public constructor() { super(Workspace) }
}