import { Request, Response } from "express";
import { Controller, HttpMethod } from "../decorators/api.decorators";
import LoginService from "../services/login.services";

@Controller("/login")
export default class LoginController {

    private service = new LoginService();

    @HttpMethod("post")
    login() {
        return async (req:Request, res:Response) => {
            const response = await this.service.login(req.body);
            return res.status(200).json(response);
        }
    }
}