import { Request, Response } from "express";
import WorkspacesService from "../services/workspaces.services";
import { Controller, HttpMethod, Middlewares, Route } from "../decorators/api.decorators";
import authenticate from "../middlewares/authenticate.middleware";
import { authorizeMember, authorizeWorkspaceOwner } from "../middlewares/workspaces.middlewares";
import validateBody from "../middlewares/validateBody.middleware";
import { WorkspaceSchema } from "../schemas/workspaces.schemas";

@Controller("/workspaces")
export default class WorkspacesController {

    private service = new WorkspacesService();

    @HttpMethod("post")
    @Middlewares([authenticate, validateBody(WorkspaceSchema)])
    create() {
        return async (req:Request, res:Response) => {
            const workspace = await this.service.create({
                userId: res.locals.userId, 
                ...req.body
            });
            return res.status(201).json(workspace);
        }
    }

    @HttpMethod("get")
    @Route("/:workspaceId")
    @Middlewares([authenticate, authorizeMember])
    get() {
        return async (req:Request, res:Response) => {
            const workspace = await this.service.findById(req.params.workspaceId);
            return res.status(200).json(workspace);
        }
    }

    @HttpMethod("get")
    @Route("/users/:userId")
    @Middlewares([authenticate])
    getByUser() {
        return async (req:Request, res:Response) => {
            const workspaces = await this.service.findAll({
                where: { members: { userId: req.params.userId } },
                relations: { boards: true }
            });
            return res.status(200).json(workspaces);
        }
    }

    @HttpMethod("put")
    @Route("/:workspaceId")
    @Middlewares([authenticate, authorizeWorkspaceOwner, validateBody(WorkspaceSchema)])
    update() {
        return async (req:Request, res:Response) => {
            const workspace = await this.service.update(req.params.workspaceId, req.body);
            return res.status(200).json(workspace);
        }
    }

    @HttpMethod("delete")
    @Route("/:workspaceId")
    @Middlewares([authenticate, authorizeWorkspaceOwner])
    delete() {
        return async (req:Request, res:Response) => {
            await this.service.delete(req.params.workspaceId);
            return res.status(204).send();
        }
    }
}
