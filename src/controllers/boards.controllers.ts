import { Request, Response } from "express";
import BoardsService, { createBoardService, deleteBoardService, updateBoardRoleService, updateBoardService } from "../services/boards.services";
import { Controller, HttpMethod, Middlewares, Route } from "../decorators/api.decorators";
import authenticate from "../middlewares/authenticate.middleware";
import validateBody from "../middlewares/validateBody.middleware";
import { BoardSchema } from "../schemas/boards.schemas";
import { authorizeByBoardRole } from "../middlewares/boards.middlewares";

@Controller("/boards")
export default class BoardsController {

    private service = new BoardsService();

    @HttpMethod("post")
    @Route("/workspaces/:workspaceId")
    @Middlewares([authenticate, validateBody(BoardSchema)])
    public create = async(req:Request, res:Response) => {
        const board = await this.service.create({ 
            userId: res.locals.userId, 
            workspaceId: req.params.workspaceId, 
            ...req.body
        });
        return res.status(201).json(board);
    }

    @HttpMethod("put")
    @Route("/:boardId")
    @Middlewares([authenticate, authorizeByBoardRole(["Editor", "Owner"])])
    public update = async (req:Request, res:Response) => {
        const board = await this.service.update(req.params.boardId, req.body);
        return res.status(200).json(board);
    }

    @HttpMethod("put")
    @Route("/:boardId/users/:userId")
    @Middlewares([authenticate, authorizeByBoardRole(["Editor", "Owner"])])
    public updateRole = async (req:Request, res:Response) => {
        const role = await this.service.update(req.params.boardId, req.body);
        return res.status(200).json(role);
    }

    @HttpMethod("delete")
    @Route("/:boardId")
    @Middlewares([authenticate, authorizeByBoardRole(["Owner"])])
    public delete = async (req:Request, res:Response) => {
        await deleteBoardService(req.params.boardId);
        return res.status(204).send();
    }
}
