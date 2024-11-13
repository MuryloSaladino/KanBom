import { Request, Response } from "express";
import BoardsService from "../services/boards.services";
import { Controller, HttpMethod, Middlewares, Route } from "../decorators/api.decorators";
import authenticate from "../middlewares/authenticate.middleware";
import validateBody from "../middlewares/validateBody.middleware";
import { BoardSchema } from "../schemas/boards.schemas";
import { authorizeByBoardRole } from "../middlewares/boards.middlewares";
import { authorizeMemberByBoard } from "../middlewares/workspaces.middlewares";

@Controller("/boards")
@Middlewares([authenticate])
export default class BoardsController {

    private service = new BoardsService();

    @HttpMethod("post")
    @Route("/workspaces/:workspaceId")
    @Middlewares([validateBody(BoardSchema)])
    public create = async(req:Request, res:Response) => {
        const board = await this.service.create({ 
            workspaceId: req.params.workspaceId, 
            ...req.body
        });
        await this.service.createRole(board.id!, res.locals.userId, { role: "Owner" })
        return res.status(201).json(board);
    }

    @HttpMethod("get")
    @Route("/:boardId")
    @Middlewares([authorizeMemberByBoard])
    public get = async (req:Request, res:Response) => {
        const board = await this.service.findOne({
            where: { id: req.params.boardId }
        });
        await this.service.createRoleIfNull(board.id!, res.locals.userId)
        return res.status(200).json(board);
    }

    @HttpMethod("get")
    @Route("/:boardId/users")
    @Middlewares([authorizeByBoardRole(["Reader", "Editor", "Owner"])])
    public getParticipants = async (req:Request, res:Response) => {
        const board = await this.service.findOne({
            where: { id: req.params.boardId },
            relations: { participants: { user: { details: true } } }
        });
        return res.status(200).json(board.participants);
    }

    @HttpMethod("put")
    @Route("/:boardId")
    @Middlewares([authorizeByBoardRole(["Editor", "Owner"])])
    public update = async (req:Request, res:Response) => {
        const board = await this.service.update(req.params.boardId, req.body);
        return res.status(200).json(board);
    }

    @HttpMethod("put")
    @Route("/:boardId/users/:userId")
    @Middlewares([authorizeByBoardRole(["Editor", "Owner"])])
    public updateRole = async (req:Request, res:Response) => {
        const role = await this.service.updateRole(req.params.boardId, req.params.userId, req.body);
        return res.status(200).json(role);
    }

    @HttpMethod("delete")
    @Route("/:boardId")
    @Middlewares([authorizeByBoardRole(["Owner"])])
    public delete = async (req:Request, res:Response) => {
        await this.service.delete(req.params.boardId);
        return res.status(204).send();
    }
}
