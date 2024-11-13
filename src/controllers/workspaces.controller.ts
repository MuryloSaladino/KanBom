import { Request, Response } from "express";
import WorkspacesService from "../services/workspaces.services";
import { Controller, HttpMethod, Middlewares, Route } from "../decorators/api.decorators";
import authenticate from "../middlewares/authenticate.middleware";
import { authorizeMember, authorizeWorkspaceOwner } from "../middlewares/workspaces.middlewares";
import validateBody from "../middlewares/validateBody.middleware";
import { WorkspaceSchema } from "../schemas/workspaces.schemas";
import MemebersService from "../services/members.services";

@Controller("/workspaces")
@Middlewares([authenticate])
export default class WorkspacesController {

    private service = new WorkspacesService();
    private membersService = new MemebersService();

    @HttpMethod("post")
    @Middlewares([validateBody(WorkspaceSchema)])
    public create = async (req:Request, res:Response) => {
        const workspace = await this.service.create({
            ownerId: res.locals.userId, 
            ...req.body
        });
        await this.membersService.create({
            userId: res.locals.userId,
            workspaceId: workspace.id
        });
        return res.status(201).json(workspace);
    }

    @HttpMethod("get")
    @Route("/:workspaceId")
    @Middlewares([authorizeMember])
    public get = async (req:Request, res:Response) => {
        const workspace = await this.service.findById(req.params.workspaceId);
        return res.status(200).json(workspace);
    }

    @HttpMethod("get")
    @Route("/users/:userId")
    public getByUser = async (req:Request, res:Response) => {
        const workspaces = await this.service.findAll({
            where: { members: { userId: req.params.userId } },
            relations: { boards: true }
        });
        return res.status(200).json(workspaces);
    }

    @HttpMethod("put")
    @Route("/:workspaceId")
    @Middlewares([authorizeWorkspaceOwner, validateBody(WorkspaceSchema)])
    public update = async (req:Request, res:Response) => {
        const workspace = await this.service.update(req.params.workspaceId, req.body);
        return res.status(200).json(workspace);
    }

    @HttpMethod("delete")
    @Route("/:workspaceId")
    @Middlewares([authorizeWorkspaceOwner])
    public delete = async (req:Request, res:Response) => {
        await this.service.delete(req.params.workspaceId);
        return res.status(204).send();
    }
}
