import { Request, Response } from "express";
import UsersService from "../services/users.services";
import validateBody from "../middlewares/validateBody.middleware";
import { createUserSchema } from "../schemas/users.schemas";
import authenticate from "../middlewares/authenticate.middleware";
import { Controller, HttpMethod, Middlewares } from "../decorators/api.decorators";

@Controller("/users")
export default class UsersController {
    
    private service = new UsersService();

    @HttpMethod("post")
    @Middlewares([validateBody(createUserSchema)])
    create() {
        return async (req:Request, res:Response) => {
            const user = await this.service.create(req.body);
            return res.status(201).json({ ...user, password: undefined })
        }
    }

    @HttpMethod("get")
    @Middlewares([authenticate])
    getUserByJWT() {
        return async (req:Request, res:Response) => {
            const user = await this.service.findById(res.locals.userId, { details: true });
            return res.status(201).json(user)
        }
    }

    @HttpMethod("patch")
    @Middlewares([authenticate])
    updateUserByJWT() {
        return async (req:Request, res:Response) => {
            const user = await this.service.update(res.locals.userId, req.body);
            return res.status(200).json({ ...user, password: undefined })
        }
    }

    @HttpMethod("delete")
    @Middlewares([authenticate])
    deleteUserByJWT() {
        return async (req:Request, res:Response) => {
            await this.service.delete(res.locals.userId);
            return res.status(204).send();
        }
    }
}