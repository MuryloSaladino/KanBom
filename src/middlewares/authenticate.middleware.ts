import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors";

export default async function authenticate(req:Request, res:Response, next:NextFunction) {
    
    const auth = req.headers.authorization;
    if(!auth) throw new AppError("Missing bearer token", 401);
    
    const [_bearer, token] = auth.split(" ");

    verify(
        token,
        String(process.env.SECRET_KEY),
        (err:any, decoded:any) => {
            if(err) throw new AppError(err.message, 401)
            res.locals.userId = decoded.sub
        }
    )
    return next()
}