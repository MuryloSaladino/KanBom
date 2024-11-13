import { Request, Response } from "express";
import NotificationsService from "../services/notifications.services";
import { Controller, HttpMethod, Route, Middlewares } from "../decorators/api.decorators";
import authenticate from "../middlewares/authenticate.middleware";

@Controller("/notifications")
@Middlewares([authenticate])
export default class NotificationsController {

    private service = new NotificationsService();

    @HttpMethod("get")
    public getByJWT = async (_req:Request, res:Response) => {
        const notifications = await this.service
            .findAll({ where: { userId: res.locals.userId } });
        return res.status(200).json(notifications);
    }

    @HttpMethod("delete")
    @Route("/:notificationId")
    public delete = async (req:Request, res:Response) => {
        await this.service.delete(req.params.notificationId);
        return res.status(204).send();
    }
}