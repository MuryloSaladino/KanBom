import { Request, Response } from "express";
import { Controller, HttpMethod, Middlewares, Route } from "../decorators/api.decorators";
import authenticate from "../middlewares/authenticate.middleware";
import validateBody from "../middlewares/validateBody.middleware";
import { CardSchema } from "../schemas/card.schema";
import CardsService from "../services/cards.services";
import { authorizeByCardAndBoardRole, authorizeByCardListAndBoardRole } from "../middlewares/cards.middlewares";
import { authorizeMemberByBoard } from "../middlewares/workspaces.middlewares";

@Controller("/cards")
@Middlewares([authenticate])
export default class CardsController {

    private service = new CardsService();

    @HttpMethod("post")
    @Route("/card-lists/:cardListId")
    @Middlewares([authorizeByCardListAndBoardRole(["Editor", "Owner"]), validateBody(CardSchema)])
    public create = async (req:Request, res:Response) => {
        const card = await this.service.create({
            cardListId: req.params.cardListId,
            ...req.body
        });
        return res.status(201).json(card);
    }

    @HttpMethod("get")
    @Route("/:cardId")
    @Middlewares([authorizeByCardAndBoardRole(["Reader", "Editor", "Owner"])])
    public getAllDetails = async (req:Request, res:Response) => {
        const card = await this.service.findOne({
            where: { id: req.params.cardId },
            relations: { 
                comments: true, 
                labels: { label: true }, 
                participations: { user: true },
                logs: true,
            }
        });
        return res.status(200).json(card);
    }

    @HttpMethod("put")
    @Route("/:cardId")
    @Middlewares([authorizeByCardAndBoardRole(["Editor", "Owner"]), validateBody(CardSchema)])
    public update = async (req:Request, res:Response) => {
        const card = await this.service.update(req.params.cardId, req.body)
        return res.status(200).json(card);
    }

    @HttpMethod("delete")
    @Route("/:cardId")
    @Middlewares([authorizeByCardAndBoardRole(["Editor", "Owner"])])
    public delete = async (req:Request, res:Response) => {
        await this.service.delete(req.params.cardId)
        return res.status(204).send();
    }

    @HttpMethod("post")
    @Route("/:cardId/users/:userId")
    @Middlewares([authorizeByCardAndBoardRole(["Editor", "Owner"])])
    public addParticipant = async (req:Request, res:Response) => {
        await this.service.addParticipant(req.params.cardId, req.params.userId);
        return res.status(204).send();
    }

    @HttpMethod("delete")
    @Route("/:cardId/users/:userId")
    @Middlewares([authorizeByCardAndBoardRole(["Editor", "Owner"])])
    public removeParticipant = async (req:Request, res:Response) => {
        await this.service.removeParticipant(req.params.cardId, req.params.userId);
        return res.status(204).send();
    }
}