import { NextFunction, Request, Response } from "express";
import AppError from "../errors";

export async function authorizeOwnUser(req:Request, res:Response, next:NextFunction) {
    if(req.params.userId != res.locals.userId)
        throw new AppError("You don't have authorization for that", 403);
    next()
}
