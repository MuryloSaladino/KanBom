import { Request, Response } from "express";
import { Controller, HttpMethod, Middlewares, Route } from "../decorators/api.decorators";
import authenticate from "../middlewares/authenticate.middleware";
import validateBody from "../middlewares/validateBody.middleware";
import { CardSchema } from "../schemas/card.schema";
import CardsService from "../services/cards.services";

@Controller("/cards")
@Middlewares([authenticate])
export default class CardsController {

    private service = new CardsService();

    @HttpMethod("post")
    @Route("/card-lists/:cardListId")
    @Middlewares([validateBody(CardSchema)])
    public create = async (req:Request, res:Response) => {
        const card = await this.service.create({
            cardListId: req.params.cardListId,
            ...req.body
        });
        return res.status(201).json(card);
    }

    
}