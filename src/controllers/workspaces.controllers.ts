import { Request, Response } from "express";
import WorkspacesService from "../services/workspaces.services";
import { Controller, HttpMethod, RouteMiddlewares, Route, ControllerMiddlewares } from "../decorators/api.decorators";
import authenticate from "../middlewares/authenticate.middleware";
import { authorizeMember, authorizeWorkspaceOwner } from "../middlewares/workspaces.middlewares";
import validateBody from "../middlewares/validateBody.middleware";
import { WorkspaceSchema } from "../schemas/workspaces.schemas";

@Controller("/workspaces")
@ControllerMiddlewares([authenticate])
export default class WorkspacesController {

    private service = new WorkspacesService();

    @HttpMethod("post")
    @RouteMiddlewares([validateBody(WorkspaceSchema)])
    public create = async (req:Request, res:Response) => {
        const workspace = await this.service.create({
            userId: res.locals.userId, 
            ...req.body
        });
        return res.status(201).json(workspace);
    }

    @HttpMethod("get")
    @Route("/:workspaceId")
    @RouteMiddlewares([authorizeMember])
    public get = async (req:Request, res:Response) => {
        const workspace = await this.service.findById(req.params.workspaceId);
        return res.status(200).json(workspace);
    }

    @HttpMethod("get")
    @Route("/users/:userId")
    @RouteMiddlewares([authenticate])
    public getByUser = async (req:Request, res:Response) => {
        const workspaces = await this.service.findAll({
            where: { members: { userId: req.params.userId } },
            relations: { boards: true }
        });
        return res.status(200).json(workspaces);
    }

    @HttpMethod("put")
    @Route("/:workspaceId")
    @RouteMiddlewares([authorizeWorkspaceOwner, validateBody(WorkspaceSchema)])
    public update = async (req:Request, res:Response) => {
        const workspace = await this.service.update(req.params.workspaceId, req.body);
        return res.status(200).json(workspace);
    }

    @HttpMethod("delete")
    @Route("/:workspaceId")
    @RouteMiddlewares([authorizeWorkspaceOwner])
    public delete = async (req:Request, res:Response) => {
        await this.service.delete(req.params.workspaceId);
        return res.status(204).send();
    }
}
