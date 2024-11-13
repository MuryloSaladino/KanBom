import { Request, Response } from "express";
import UsersService from "../services/users.services";
import validateBody from "../middlewares/validateBody.middleware";
import { UserSchema } from "../schemas/users.schemas";
import authenticate from "../middlewares/authenticate.middleware";
import { Controller, HttpMethod, RouteMiddlewares } from "../decorators/api.decorators";

@Controller("/users")
export default class UsersController {
    
    private service = new UsersService();

    @HttpMethod("post")
    @RouteMiddlewares([validateBody(UserSchema)])
    public create = async (req:Request, res:Response) => {
        const user = await this.service.create(req.body);
        return res.status(201).json({ ...user, password: undefined })
    }

    @HttpMethod("get")
    @RouteMiddlewares([authenticate])
    public getUserByJWT = async (_req:Request, res:Response) => {
        const user = await this.service
            .findById(res.locals.userId, { details: true });
        return res.status(201).json(user)
    }

    @HttpMethod("put")
    @RouteMiddlewares([authenticate])
    public updateUserByJWT = async (req:Request, res:Response) => {
        const user = await this.service.update(res.locals.userId, req.body);
        return res.status(200).json({ ...user, password: undefined })
    }

    @HttpMethod("delete")
    @RouteMiddlewares([authenticate])
    public deleteUserByJWT = async (_req:Request, res:Response) => {
        await this.service.delete(res.locals.userId);
        return res.status(204).send();
    }
}